import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoMdEye } from "react-icons/io";
import CustomModal from "./modal-video/Modal";
import { useInView } from "react-intersection-observer";

const Project = ({ title, description, tags, imageUrl, url, videoUrl }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false); // Tracks if the modal has been in view

  // Intersection Observer hook for the modal
  const { ref: modalRef, inView: isModalInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (isModalOpen && isModalInView) {
      setHasBeenInView(true); // Modal has been in view
    }
    if (isModalOpen && !isModalInView && hasBeenInView) {
      setModalOpen(false); // Close modal when it goes out of view
    }
  }, [isModalInView, isModalOpen, hasBeenInView]);

  const handleProjectClick = () => {
    if (url) {
      window.open(url, "_blank"); // Open the URL in a new tab
    } else {
      setModalOpen(true); // Open modal to display video if no URL is provided
      setHasBeenInView(false); // Reset the view tracking when opening a modal
    }
  };

  return (
    <div>
      {/* Project Card */}
      <div className="group mb-3 sm:mb-8 last:mb-0 cursor-pointer" onClick={handleProjectClick}>
        <section className="bg-[#0b0e13] max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[18rem] transition sm:group-even:pl-8 dark:bg-white/10 dark:hover:bg-white/20">
          {/* Eye Icon with Tooltip */}
          <div className="absolute p-1/2 px-1 rounded-xl border-white border top-2 right-3 sm:opacity-100 opacity-0">
            <IoMdEye className="text-white" />
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute h-8 sm:right-28 transform translate-x-1/2 sm:top-2 right-24 bottom-[40%] mb-2 p-2 bg-zinc-800 z-50 text-white text-xs rounded-md">
            {url ? "Visit Website" : "Watch Video"}
          </div>

          <img
            src={imageUrl}
            alt={`Image of ${title}`}
            className="sm:absolute z-10 sm:top-10 sm:-right-40 sm:w-96 w-[28.25rem] rounded-lg shadow-2xl transition sm:group-hover:scale-[1.04] sm:group-hover:-translate-x-3 sm:group-hover:translate-y-3 sm:group-hover:-rotate-2 sm:group-even:group-hover:translate-x-3 sm:group-even:group-hover:translate-y-3 sm:group-even:group-hover:rotate-2 sm:group-even:right-[initial] group-even:-left-40"
          />

          <div className="pt-4 pb-4 px-5 sm:pl-6 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
            <div className="flex justify-between w-full">
              <h3 className="text-base xs:text-2xl text-white font-semibold">{title}</h3>
              <div className="sm:hidden px-1 rounded-xl border-white border py-1">
                <IoMdEye className="text-white" />
              </div>
            </div>
            <p className="my-2 xs:text-xs text-xs w-full leading-relaxed text-gray-400 dark:text-white/65">
              {description}
            </p>
            <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
              {tags.map((tag, index) => (
                <li
                  className="bg-[#27272a] bg-opacity-55 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Using the Custom Modal for Video */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          title={title}
        >
          <div ref={modalRef}>
            <video width="100%" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

Project.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  url: PropTypes.string,
  videoUrl: PropTypes.string,
};

export default Project;
