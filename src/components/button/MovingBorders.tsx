import { motion, useMotionValue, useTransform, useMotionTemplate, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

// MovingBorder Component
export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  // Animate the progress along the SVG path
  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-55%) translateY(-55%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

// NeonButton Component
function NeonButton() {
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="relative px-4 py-2 border-2 rounded-full border-[#00ffff]   overflow-hidden">
        {/* Neon Ball moving around the button */}
        <MovingBorder duration={4000} rx="50%" ry="50%">
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#00ffff", // Neon ball color
              borderRadius: "50%",
              boxShadow: "0 0 15px 5px rgba(0, 255, 255, 0.7)", // Neon glow effect
              filter: "blur(3px)",
            }}
          />
        </MovingBorder>

        {/* Button Text */}
        <button className="relative z-10 text-[#00ffff] text-lg py-1 px-3 w-full h-full rounded">
          resume
        </button>
      </div>
    </div>
  );
}

export default NeonButton;
