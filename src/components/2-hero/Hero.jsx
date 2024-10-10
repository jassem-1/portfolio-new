import Lottie from "lottie-react";
import "./hero.css";
import devAnimation from "../../animation/dev.json";
import circleAnimation from "../../animation/circle.json"; // Import the circle animation
import { useRef } from "react";
import { motion } from "framer-motion";
import me from "../../assets/images/me.jpg";
import NeonButton from "../button/MovingBorders";
import Navbar from "../../components/1-header/Navbar";
import { ReactTyped } from "react-typed";

const Hero = () => {
  const lottieRef = useRef();

  return (
    <section id="up" className="hero flex flex-col items-center min-h-screen pt-4">
      <Navbar />

      <div id="up" className="flex pt-24 z-40">
        <div className="left-section flex flex-col gap-6 items-start justify-start ">
          <div className="flex items-end gap-6 mb-4  relative"> {/* Make this relative */}
            <Lottie
              lottieRef={lottieRef}
              animationData={circleAnimation} // Use the imported variable here
              style={{ width: 250, height: 250 }}
              loop
              autoplay
              className="absolute -top-[75px] -right-[70px] z-0" // Add absolute positioning and z-index
            />
            <motion.img
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1.1)" }}
              transition={{ damping: 6, type: "spring", stiffness: 100 }}
              src={me}
              className="avatar   z-10" // Ensure the avatar has a higher z-index
              alt=""
            />
          </div>
          <ReactTyped
            strings={["Full Stack Web Developer"]}
            className="title text-2xl md:text-4xl"
            typeSpeed={10}
            startDelay={500}
          />

          <p className="sub-title text-xl md:text-2xl">
            I'm Jassem Souey, a passionate fullstack developer specialized in building scalable,
            user-centric applications, with a focus on frontend development.
          </p>

          <div className="all-icons flex">
            <div className="icon icon-twitter"></div>
            <div className="icon icon-instagram"></div>
            <div className="icon icon-github"></div>
            <div className="icon icon-linkedin"></div>
          </div>
        </div>

        <div className="right-section animation ">
          <Lottie
            lottieRef={lottieRef}
            className=""
            onLoadedImages={() => {
              // @ts-ignore
              // https://lottiereact.com/
              lottieRef.current.setSpeed(0.5);
            }}
            animationData={devAnimation}
          />
        </div>
      </div>

      <a 
        className="mt-6"
        href="/cv-jassem.pdf" // Path to the PDF file
        download="resume.pdf" // This triggers the file download with a custom file name
      >
        <NeonButton />
      </a>
    </section>
  );
};

export default Hero;  