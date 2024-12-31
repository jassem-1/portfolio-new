import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../../assets/images/jslogo.png";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState("About");
  const [toggle, setToggle] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  let scrollTimeout;

  const navLinks = [
    { id: "up", title: "About" },
    { id: "projects", title: "Projects" },
    { id: "techstack", title: "TechStack" },
    { id: "experience", title: "Experience" },
    { id: "contact", title: "Contact" },
    { id: "markitup", title: "MarkItUp" }, // New Link
  ];
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('up');
      const aboutSectionTop = aboutSection?.getBoundingClientRect().top;

      // Check if the user is in the "About" section
      if (aboutSectionTop && aboutSectionTop >= 0 && aboutSectionTop <= window.innerHeight) {
        setIsVisible(true); // Always show navbar in the "About" section
      } else {
        // Show the navbar briefly when scrolling starts outside the "About" section
        setIsVisible(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsVisible(false); // Hide navbar after 2 seconds of scrolling
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleNavClick = (e, title) => {
    e.preventDefault();
    setActive(title);
  
    if (title === "MarkItUp") {
      navigate("/markitup");
    } else {
      const section = document.getElementById(title === "About" ? "up" : title.toLowerCase());
      if (section) {
        const navbarHeight = document.querySelector('nav').offsetHeight;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: sectionTop, behavior: 'smooth' });
      }
    }
  };
  

  return (
    <nav className={`w-full max-w-[300px] sm:max-w-[500px] md:max-w-[700px] z-50 xl:max-w-[850px] flex p-6 rounded-xl 
      justify-between bg-black items-center h-10 fixed transition-transform duration-500
      hover:translate-y-0 hover:opacity-100`}
    >
      <div className="flex items-center gap-x-4">
        <ul className="list-none md:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
          <li
          key={nav.id}
          className={`font-poppins font-normal cursor-pointer md:text-sm xl:text-[16px] relative ${
            active === nav.title ? "text-white" : "text-gray-400"
          } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
          onClick={(e) => handleNavClick(e, nav.title)} // Update onClick handler
        >
          <a href={`#${nav.id}`} className="flex items-center">
            {nav.title}
            {nav.title === "MarkItUp" && (
              <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded-full uppercase">
                New
              </span>
            )}
          </a>
        </li>
        
          ))}
        </ul>
      </div>
      <img src={logo} alt="logo" className="sm:w-[44px] sm:h-[52px] w-8 h-10" />

      <div className="md:hidden flex flex-1 justify-end items-center">
        {toggle ? (
          <FaTimes
            className="w-[18px] h-[18px] text-white cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        ) : (
          <FaBars
            className="w-[18px] h-[18px] text-white cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        )}
        <div
          className={`${
            toggle ? "open" : ""
          } p-6 bg-black-gradient absolute transition ease-in-out duration-700 bg-black top-7 
          pt-3 sm:top-11 z-50 -right-4 mx-4 my-2 w-full  
           rounded-b-xl mobile-wrapper`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={(e) => {
                  handleNavClick(e, nav.title); // Update onClick handler
                  setToggle(false); // Close menu on selection
                }}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
