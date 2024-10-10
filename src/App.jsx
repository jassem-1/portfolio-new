import Hero from "./components/2-hero/Hero";
import Contact from "./components/4-contact/Contact";
import Footer from "./components/5-footer/Footer";
import { useEffect, useState } from "react";
import "./index.css"; // This imports Tailwind styles
import SectionTechnologyStack from "./components/TechnologyStack";
import ProjectSection from "./components/3-main/Main";
import Approach from "./components/experience/Approach";
import Navbar from "./components/1-header/Navbar";

function App() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setshowScrollBTN(true);
      } else {
        setshowScrollBTN(false);
      }
    });
  }, []);

  const [showScrollBTN, setshowScrollBTN] = useState(false);
  return (
    <div  className="container">
      <div id="up">
      <Hero />
      </div>
      <div className="divider" />
      <div id="projects">
        <ProjectSection />
      </div>{" "}
      <div className="divider" />
      <div id="techstack">
        <SectionTechnologyStack />
      </div>
      <div className="divider" />
      <div id="experience">
        <Approach />
      </div>
     
      <div className="divider" />
      <div id="contact">
        <Contact />
      </div>{" "}
      <div className="divider" />
      <Footer />
      <a
        style={{ opacity: showScrollBTN ? 1 : 0, transition: "1s" }}
        href="#up"
      >
        <button className="icon-keyboard_arrow_up scroll2Top"></button>
      </a>
    </div>
  );
}

export default App;
