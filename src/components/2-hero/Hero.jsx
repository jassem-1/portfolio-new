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
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import GitHubContributions from "./Github";

const Hero = () => {
  const handleClick = () => {
    // Check if the user is on a mobile device
    const isMobile = /Mobi/i.test(navigator.userAgent);
    const phoneNumber = "+216 55392530";

    if (isMobile) {
      // For mobile devices, initiate a call
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // For desktop devices, open WhatsApp
      window.open(
        `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`,
        "_blank"
      );
    }
  };
  const lottieRef = useRef();

  return (
    <section
      id="up"
      className="hero flex flex-col items-center min-h-screen pt-4"
    >
      <Navbar />

      <div id="up" className="flex pt-24 z-40 pl-4">
        <div className="left-section flex flex-col gap-6 items-start justify-start pt-8 ">
          <div className="flex items-end gap-6 mb-8  relative">
            {" "}
            {/* Make this relative */}
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

          <p className="sub-title text-base sm:text-xl md:text-2xl">
            I'm{" "}
            <span className="text-gray-100 font-semibold">Jassem Souey</span> ,
            a passionate fullstack developer specialized in building scalable,
            user-centric applications, with a focus on frontend development.
          </p>
          <div className="all-icons flex">
            {/* GitHub Icon */}
            <a
              href="https://github.com/jassem-1" // Replace with your GitHub URL
              target="_blank" // Opens link in a new tab
              rel="noopener noreferrer" // Security measure for external links
            >
              <div className="icon-github"></div>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/jassem-souey-16b951278/" // Replace with your LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon-linkedin"></div>
            </a>
            <a
              href="https://www.facebook.com/jassem.souey123/" // Replace with your LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <FaFacebook />
            </a>
          </div>
          <div className="border border-gray-600 p-2 rounded-full mt-3">
            <a
              href="#"
              onClick={handleClick}
              className="flex gap-2 text-gray-400 items-center border border-gray-200"
            >
              <FaPhoneAlt />
              <span className="text-xl">+216 55392530</span>
              <FaWhatsapp className="text-xl" />
            </a>
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
        className="mt-2"
        href="/cv-pfe.pdf" // Path to the PDF file
        download="jassem-resume.pdf" // This triggers the file download with a custom file name
      >
        <NeonButton />
      </a>
      <GitHubContributions />
    </section>
  );
};

export default Hero;
