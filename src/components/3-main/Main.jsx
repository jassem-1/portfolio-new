import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { projectsData } from "./data";
import Project from "../../components/project";

export default function ProjectSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Allow the animation to trigger each time
  });

  // State to track how many projects are currently visible
  const [visibleProjects, setVisibleProjects] = useState(4);

  // Function to handle showing more projects
  const showMoreProjects = () => {
    setVisibleProjects(projectsData.length); // Show all projects
  };

  return (
    <section
      ref={ref}
      className="safe-x-padding mt-[38px] overflow-hidden pt-8 lg:min-h-screen pb-4"
    >
      <div className="text-center">
        <h2
          className={`mb-3  text-3xl md:text-5xl font-extrabold lg:text-6xl font-montserrat gradient-text ${
            inView ? "animate-fadeIn" : ""
          }`}
        >
          Explore Jassem&apos;s Projects
        </h2>
        <p
          className={`font-medium text-base md:text-lg lg:text-2xl text-accent max-w-[730px] mb-4 mx-auto ${
            inView ? "animate-fadeIn" : ""
          }`}
          style={{ animationDelay: "0.2s" }} // Delayed animation
        >
          Take a look at something I&apos;ve worked on
        </p>
      </div>

      <div className="mt-2 h-full w-full flex flex-col justify-center items-center">
        <div
          className={`grid grid-flow-row grid-cols-4 gap-6 2xl:grid-cols-8 ${
            inView ? "animate-fadeInUp" : ""
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <div
              key={index}
              className="2xl:col-span-4 col-span-8 shadow-md hover:shadow-2xl hover:scale-[1.01] rounded-2xl 
              transition-all duration-500 ease-in-out"
              style={{
                animation: inView ? `fadeInUp 0.5s ease-in-out ${index * 0.2}s forwards` : "",
              }} // Staggered animation
            >
              <Project
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
              />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {/* Show More Button */}
{visibleProjects < projectsData.length && (
  <div className="flex justify-center items-center">
    <div
      className="text-center mt-6 border w-40 border-gray-200 rounded-full"
      style={{
        animation: "scaleUpAndDown 1s ease-in-out infinite", // Apply the scale animation
      }}
    >
      <button
        onClick={showMoreProjects}
        className="text-gray-200 text-base py-1 px-3 rounded-full"
      >
        Show More
      </button>
    </div>
  </div>
)}

      </div>
    </section>
  );
}
