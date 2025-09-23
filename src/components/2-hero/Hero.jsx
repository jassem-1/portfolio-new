import "./hero.css";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import GitHubContributions from "./Github";
import NeonButton from "../button/MovingBorders";
import Navbar from "../../components/1-header/Navbar";
import Timeline from "./Timeline";

const Hero = () => {
  const handleClick = () => {
    const isMobile = /Mobi/i.test(navigator.userAgent);
    const phoneNumber = "+216 55392530";

    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      window.open(
        `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`,
        "_blank"
      );
    }
  };

  return (
    <section
      id="up"
      className="hero flex flex-col items-center min-h-screen pt-4"
    >
      <Navbar />

      <div className=" flex flex-col lg:flex-row  w-full    pt-40 min-h-screen justify-start">
        <div className="flex flex-col w-full items-start   justify-center  pt-4 z-40 gap-3 lg:gap-6">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold  text-gray-100">
            Jassem Souey
          </h1>
          <p className="text-lg sm:text-2xl mt-2">Full Stack Developer</p>
          <p className="text-sm sm:text-lg mt-2 text-start max-w-md text-gray-400">
            Dedicated full-stack developer with over two years of experience,
            building innovative, scalable, and user-focused web applications
            with a passion for technological innovation and collaborative
            problem-solving.
          </p>
          <div className="all-icons flex gap-4 mt-4 sm:scale-100 scale-75 sm:-ml-0 -ml-2">
            <a
              href="https://github.com/jassem-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon-github"></div>
            </a>
            <a
              href="https://www.linkedin.com/in/jassem-souey-16b951278/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon-linkedin"></div>
            </a>
          </div>
          <div className="border border-gray-600 p-2 rounded-full mt-4">
            <a
              href="#"
              onClick={handleClick}
              className="flex gap-2 text-gray-400 items-center"
            >
              <span className="text-sm sm:text-xl">+216 55392530</span>
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
          <a
            className="mt-6"
            href="JassemSouey-resume.pdf"
            download="jassem-resume.pdf"
          >
            <NeonButton />
          </a>
        </div>
        <div className="flex flex-col w-full pt-20  items-center justify-start">
          <Timeline />
        </div>
      </div>

      <GitHubContributions />
    </section>
  );
};

export default Hero;
