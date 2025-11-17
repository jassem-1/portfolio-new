/* global gtag */
import "./hero.css";
import { FaWhatsapp } from "react-icons/fa6";
import { useEffect } from "react";
import GitHubContributions from "./Github";
import NeonButton from "../button/MovingBorders";
import Navbar from "../../components/1-header/Navbar";
import Timeline from "./Timeline";
import { GiDiploma } from "react-icons/gi";
import me from "../../assets/images/me.jpg";
// Function to initialize gtag if not already defined
const initializeGtag = () => {
  if (typeof window !== "undefined" && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }
};

const Hero = () => {
  // Initialize gtag on mount
  useEffect(() => {
    initializeGtag();
  }, []);

  const handleClick = () => {
    const phoneNumber = "+216 93372834";

    window.open(
      `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`,
      "_blank"
    );

    // Track phone/WhatsApp click with custom event name
    if (typeof gtag === "function") {
      gtag("event", "contact_phone_click", {
        event_category: "Contact",
        event_label: "WhatsApp",
        custom_parameter_1: phoneNumber,
      });
    }
  };

  const handleSocialClick = (platform) => {
    if (typeof gtag === "function") {
      gtag("event", `social_${platform.toLowerCase()}_click`, {
        event_category: "Social Media",
        event_label: platform,
        custom_parameter_1: "Hero Section",
      });
    }
  };

  const handleResumeDownload = () => {
    if (typeof gtag === "function") {
      gtag("event", "resume_download", {
        event_category: "Downloads",
        event_label: "Resume PDF",
        custom_parameter_1: "Hero Section",
      });
    }
  };

  return (
    <section
      id="up"
      className="hero flex flex-col items-center min-h-screen pt-4"
    >
      <Navbar />
      <div className="flex flex-col lg:flex-row w-full pt-40 min-h-screen justify-start">
        <div className="flex flex-col w-full items-start justify-center pt-4 z-40 gap-3 lg:gap-6">
          <div className="flex w-full items-center justify-between gap-6 max-w-md pr-8">
            <div className="flex flex-col items-start">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-gray-100">
                Jassem Souey
              </h1>
              <p className="text-lg sm:text-2xl mt-2">Full Stack Developer</p>
            </div>
            <img
              src={me}
              alt="Jassem Souey"
              className="rounded-full w-12 xs:w-20 h-12 xs:h-20 object-cover"
            />
          </div>
          <p className="text-sm sm:text-lg mt-2 text-start max-w-lg text-gray-400">
            Dedicated full-stack developer with over two years of experience,
            building innovative, scalable, and user-focused web applications
            with a passion for technological innovation and collaborative
            problem-solving.
          </p>
          <p className="flex items-center gap-2 text-xs xs:text-sm sm:text-lg mt-2 text-start max-w-lg text-gray-400">
            <GiDiploma className="text-xl xs:text-3xl text-white" />
            Holds an Engineering degree in Computer Sciences.
          </p>
          <div className="all-icons flex gap-4 mt-4 sm:scale-100 scale-75 sm:-ml-0 -ml-2">
            <a
              href="https://github.com/jassem-1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick("GitHub")}
            >
              <div className="icon-github"></div>
            </a>
            <a
              href="https://www.linkedin.com/in/jassem-souey-16b951278/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick("LinkedIn")}
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
              <span className="text-sm sm:text-xl">+216 93 372 834</span>
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
          <a
            className="mt-6"
            href="jassem-souey-resume"
            download="jassem-resume.pdf"
            onClick={handleResumeDownload}
          >
            <NeonButton />
          </a>
        </div>
        <div className="flex flex-col w-full pt-20 items-center justify-start">
          <Timeline />
        </div>
      </div>
      <GitHubContributions />
    </section>
  );
};

export default Hero;
