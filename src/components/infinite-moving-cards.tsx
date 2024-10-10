'use client';

import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
	items,
	name,
	direction = 'left',
	speed = 'fast',
	pauseOnHover = true,
	className,
}: {
	items: { name: string; image: string }[];	direction?: 'left' | 'right';
	speed?: 'fast' | 'normal' | 'slow';
	pauseOnHover?: boolean;
	className?: string;
	name?:string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);
  
	useEffect(() => {
		addAnimation();
	}, []);
  
	const [start, setStart] = useState(false);
	const [isHovered, setIsHovered] = useState(false); // State to track hover status
  
	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);
  
			// Duplicate the items to create a seamless scrolling effect
			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});
  
			getDirection();
			getSpeed();
			setStart(true);
		}
	}
  
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === 'left') {
				containerRef.current.style.setProperty('--animation-direction', 'forwards');
			} else {
				containerRef.current.style.setProperty('--animation-direction', 'reverse');
			}
		}
	};
  
	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === 'fast') {
				containerRef.current.style.setProperty('--animation-duration', '20s');
			} else if (speed === 'normal') {
				containerRef.current.style.setProperty('--animation-duration', '40s');
			} else {
				containerRef.current.style.setProperty('--animation-duration', '80s');
			}
		}
	};
  
	return (
		<div
		onMouseEnter={() => pauseOnHover && setIsHovered(true)} // Set hover state on enter
						onMouseLeave={() => pauseOnHover && setIsHovered(false)} // Reset hover state on leave
			ref={containerRef}
			className={`relative overflow-hidden z-20 ${className || ''}`}
			style={{
				'--animation-direction': 'forwards',
				'--animation-duration': '40s',
			} as React.CSSProperties}
		>
			<ul
				ref={scrollerRef}
				className={`flex min-w-full shrink-0 gap-6 py-2 w-max flex-nowrap ${start ? 'animate-scroll' : ''}`}
				style={{
					animationPlayState: isHovered ? 'paused' : start ? 'running' : 'paused', // Pause on hover
				}}
			>
				{items.map((item, idx) => (
					<li
						key={idx}
						className="relative rounded-2xl p-2 flex-shrink-0 md:h-52 md:w-52 w-32 h-32"
						
					>
						<img className="h-10/12 w-10/12 object-cover invert" src={item.image} alt={`Image ${idx + 1}`} />
						<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full
						 p-1 text-white transition-all duration-300
						 bg-opacity-50 opacity-0 bg-gradient-to-r from-[#A293FF] to-[#00F0FF] hover:opacity-100 rounded-xl">
                                        <p className='font-semibold text-center text-xl line-clamp-3'>
                                            {item.name}
                                        </p>
                                    </div>
					</li>
				))}
			</ul>
  
			<style>{`
				.animate-scroll {
					animation: scroll var(--animation-duration) linear infinite var(--animation-direction);
				}
  
				@keyframes scroll {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(-100%);
					}
				}
			`}</style>
		</div>
	);
};
