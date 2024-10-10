import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdHomeWork } from "react-icons/md";
import clickhere from "../../animation/clickhere.json"; // Import the circle animation

import { CanvasRevealEffect } from "./CanvasRevealEffect";
import Lottie from "lottie-react";
const experienceData = [
  {
    company: "CHAIN INDUSTRIES",
    position: "FRONT‑END DEVELOPER",
    dates: "Jan 2023 – Current",
    descriptions: [
      "Developed dynamic user interfaces for cryptocurrency and trading platforms with ReactJS and Next.js, converting Figma designs into SEO-friendly websites",
      "Applied Tailwind CSS for consistent, scalable design across devices and enhanced user experience with complex animations using Framer Motion.",
      "Utilized web3 libraries like Wagmi, Blocknative, and Moralis for token and block transaction fetching, as well as wallet connection."
    ]
  },
  {
    company: "STABLE LABS",
    position: "FRONT‑END DEVELOPER | REMOTE",
    dates: "1st Aug 2024 ‑ 15th Sept",
    descriptions: [
      "Contributed to building a cutting-edge platform providing seamless access to tokenized real-world financial assets",
      "Created intuitive and responsive user interfaces to enable global users to effortlessly interact with financial assets, fostering financial inclusion."
    ]
  },
  {
    company: "ESPRIT",
    position: "FULL‑STACK DEVELOPER INTERN",
    dates: "1st Jul 2023 ‑ 31st Aug 2023",
    descriptions: [
      "Developed full-stack solutions for team and project management with Spring and React, emphasizing user-friendly interfaces and data security.",
      "Implemented project creation, task assignment, and progress tracking with key performance indicators.",
      "Created features for team creation, role assignment, and performance evaluation to enhance efficiency and collaboration."
    ]
  },
  {
    company: "FREELANCE",
    position: "FULL‑STACK DEVELOPER",
    dates: "Dec 2022 ‑ Current | Remote",
    descriptions: [
      "Created dynamic, animated user interfaces using React, Next.js, Framer Motion, and Tailwind for various applications, portfolios, and landing pages.",
      "Translated Figma designs into functional websites and cloned existing sites for updates and improvements.",
      "Fixed backend issues in existing projects, including CRUD operations and other logic problems.",
      "Implemented role-based authentication in Next.js projects using NextAuth, including login and registration pages.",
      "Built a comprehensive Learning Management System using Next.js, Prisma, and Stripe, featuring course browsing, purchase functionality, and progress tracking."
    ]
  }
];

const Approach = () => {

  return (
    <section className="w-full flex flex-col justify-center items-center py-10">
     <h2 
                
                    className="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl font-montserrat"
                >
Experience                
</h2>
      {/* remove bg-white dark:bg-black */}
      <div className="pt-6 grid gap-4 w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
  {experienceData.map((experience, index) => (
    <Card
      key={index}
      title={experience.position}
      icon={<AceternityIcon order={experience.position} position={experience.dates} company={experience.company} />}
      descriptions={experience.descriptions} // Pass the descriptions array
    >
      <CanvasRevealEffect
        animationSpeed={index === 0 ? 5.1 : 3} // Example of dynamic animation speed
        containerClassName={index === 1 ? "bg-gray-800 rounded-3xl overflow-hidden" : 
          "bg-gray-800  rounded-3xl overflow-hidden"}
      />
    </Card>
  ))}
</div>

    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  // add this one for the desc
  descriptions, // update this to accept an array of descriptions
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  descriptions: string[]; // an array of descriptions
}) => {
  const [hovered, setHovered] = React.useState(false);
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // change h-[30rem] to h-[35rem], add rounded-3xl
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative  h-[25rem] md:h-[35rem] rounded-3xl "
      style={{
        //   add these two
        //   you can generate the color from here https://cssgradient.io/
        background: "rgb(4,16,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* change to h-10 w-10 , add opacity-30  */}
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-2">
        <div
          // add this for making it center
          // absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  
        group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {icon}
        </div>
       
        {descriptions.map((des, index) => (
    <p
      key={index}
      className="3xl:text-sm text-[11px]  opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 list-disc	font-semibold
       group-hover/canvas-card:text-white text-start group-hover/canvas-card:-translate-y-2 transition duration-200"
      style={{ color: "#ffffff" }}
    >
      <span className="text-xl font-semibold">.{" "}</span>{des}
    </p>
  ))}
      </div>
    </div>
  );
};
// add order prop for the Phase number change
const AceternityIcon = ({ order , position ,company}: { order: string , position:string ,company:string}) => {
  const lottieRef = useRef();

  return (
    <div className="flex flex-col items-center relative  justify-center gap-10 p-6 rounded-full">
       <Lottie
              lottieRef={lottieRef}
              animationData={clickhere} // Use the imported variable here
              style={{ width: 100, height: 100 }}
              loop
              autoplay
              className="opacity-100 sm:opacity-0 absolute -top-20 opacity-50 -right-14 z-0" // Add absolute positioning and z-index
            />
<button className="relative inline-flex items-center justify-center overflow-hidden rounded-full p-[4px] bg-gradient-to-r from-[#0d1c494f] via-[#134e4a5b] to-[#60a5fa57] shadow-lg transition-all hover:scale-105">
     
      <span
        className="inline-flex h-full w-full cursor-pointer items-center justify-center 
        rounded-full px-6 py-4 text-white backdrop-blur-md font-normal text-xl sm:text-2xl transition-all hover:scale-105"
      >
        {order}
      </span>
    </button>
  
    <div className="flex flex-col items-center   text-white">
      <p className="text-sm  font-medium">{position}</p>
      <div className="flex items-center gap-2 mt-4">
        <MdHomeWork className="text-white" size={24} />
        <span className="text-lg whitespace-nowrap font-semibold">{company}</span>
      </div>
    </div>
  </div>
  

   
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
