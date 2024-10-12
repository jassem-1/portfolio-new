import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import nextJs from '../assets/technologyStack/next-js.webp';
import expo from '../assets/technologyStack/expo.webp';
import prisma from '../assets/technologyStack/prisma.webp';
import expressJs from '../assets/technologyStack/express-js.webp';
import javascript from '../assets/technologyStack/jsjs-removebg-preview.png';
import reactJs from '../assets/technologyStack/reactjs.png';
import tailwind from '../assets/technologyStack/tailwind.png';
import typescript from '../assets/technologyStack/ts.svg';
import mongodb from '../assets/technologyStack/mongodb.png';
import springboot from '../assets/technologyStack/springboot.svg';
import { InfiniteMovingCards } from "./infinite-moving-cards";
import yourImage from '../assets/images/avatar.png'; // Import your image here

const technologyStack = [
    { name: 'Next JS', image: nextJs, officialSite: 'https://nextjs.org/' },
    { name: 'Prisma', image: prisma, officialSite: 'https://www.prisma.io/' },
    { name: "Express JS", image: expressJs, officialSite: 'https://expressjs.com/' },
    { name: "Javascript", image: javascript, officialSite: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: "React JS", image: reactJs, officialSite: 'https://reactjs.org/' },
    { name: "Tailwind CSS", image: tailwind, officialSite: 'https://tailwindcss.com/' },
    { name: "Typescript", image: typescript, officialSite: 'https://www.typescriptlang.org/' },
    { name: "MongoDB", image: mongodb, officialSite: 'https://www.mongodb.com/' },
    { name: "Springboot", image: springboot, officialSite: 'https://spring.io/projects/spring-boot' },
    { name: 'Next JS', image: nextJs, officialSite: 'https://nextjs.org/' },
    { name: 'Prisma', image: prisma, officialSite: 'https://www.prisma.io/' },
    { name: "Express JS", image: expressJs, officialSite: 'https://expressjs.com/' },
    { name: "Javascript", image: javascript, officialSite: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: "React JS", image: reactJs, officialSite: 'https://reactjs.org/' },
    { name: "Tailwind CSS", image: tailwind, officialSite: 'https://tailwindcss.com/' },
    { name: "Typescript", image: typescript, officialSite: 'https://www.typescriptlang.org/' },
    { name: "MongoDB", image: mongodb, officialSite: 'https://www.mongodb.com/' },
    { name: "Springboot", image: springboot, officialSite: 'https://spring.io/projects/spring-boot' }
];

export default function SectionTechnologyStack() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section ref={ref} className={`my-[12px] min-h-screen gap-y-20 pt-8 w-full flex flex-col justify-center items-center relative`}>
            <div className='text-center'>
                <motion.h2 
                    style={{color:"var(--title)"}}
                    initial={{ y: 100, opacity: 0 }} 
                    animate={inView ? { y: 0, opacity: 1 } : {}} 
                    transition={{ duration: 0.5 }} 
                    className="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl font-montserrat"
                >
                    Technology Stack
                </motion.h2>
                <motion.p 
                    style={{color:"var(--subtitle)"}}
                    initial={{ y: 100, opacity: 0 }} 
                    animate={inView ? { y: 0, opacity: 1 } : {}} 
                    transition={{ duration: 0.7 }} 
                    className={`text-base font-medium md:text-lg lg:text-xl text-accent max-w-[960px] mx-auto`}
                >
                    I am committed to delivering exceptional results for my client. That's why I continuously update and use the best technologies, ensuring not only optimal performance but also beautiful design, intuitive user experience, and robust functionality in my products.
                </motion.p>
            </div>

            {/* Infinite Slider */}
            <div className="flex items-center  w-full justify-start  relative z-10">
                {technologyStack.length > 0 && (
                   <InfiniteMovingCards 
                   items={technologyStack.map((tech) => ({ name: tech.name, image: tech.image }))}  // Pass both name and image
                   direction="right" 
                   speed="normal" 
                   pauseOnHover={true}
               />
               
                )}
            </div>
            <div className="flex items-center  w-full justify-start relative z-10">
                {technologyStack.length > 0 && (
                    <InfiniteMovingCards
                    items={technologyStack.map((tech) => ({ name: tech.name, image: tech.image }))}  // Pass both name and image
                    direction="left" 
                    speed="normal" 
                    pauseOnHover={true}
                />
                
                )}
            </div>
            

            {/* Your Image Overlapping the Infinite Slider */}
            <div className="absolute bottom-0 inset-0 z-20 flex justify-center 
            items-end mt-56 pointer-events-none">
                <img 
                    src={yourImage} 
                    alt="Your Picture" 
                    className="relative w-52 md:w-96 h-auto object-cover shadow-lg" 
                    style={{ zIndex: 20 }}  // Ensure it is above the slider
                />
            </div>
        </section>
    );
}
