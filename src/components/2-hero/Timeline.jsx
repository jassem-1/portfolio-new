import { motion } from "framer-motion";

const timelineData = [
  { date: "Sep 2022", text: "Ensi", endDate: "Jun 2025" },
  { date: "Dec 2022", text: "Freelance", endDate: "-current" },
  { date: "Dec 2022", text: "Chain Industries", endDate: "-current" },
  { date: "Jul 2023", text: "Esprit (intern)", endDate: "Aug 2023" },
  { date: "Jul 2024", text: "Algosama (intern)", endDate: "Aug 2024" },
  { date: "Aug 2024", text: "StableLabs", endDate: "Sep 2024" },
  { date: "Feb 2025", text: "Itgrow (pfe)", endDate: "Jul 2025" },
];

const Timeline = () => {
  return (
    <div className="relative flex flex-col items-center w-full max-w-xs py-4">
      {/* Vertical Line */}
      <motion.div
        className="absolute w-[2px] bg-gray-400/50"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
      />
      {/* Timeline Items */}
      {timelineData.map((item, index) => {
        const isLeft = index % 2 === 0; // Alternate left and right
        return (
          <div
            key={index}
            className="relative flex w-full my-2"
            style={{ minHeight: "50px" }}
          >
            {/* Horizontal Deviation Line */}
            <motion.div
              className="absolute h-[2px] bg-gray-400/50"
              initial={{ width: 0 }}
              animate={{ width: isLeft ? "60px" : "60px" }}
              transition={{ delay: 1 + index * 0.3, duration: 0.3 }}
              style={{
                top: "12px", // Align with text
                left: isLeft ? "calc(50% - 60px)" : "50%",
              }}
            />
            {/* Text (Date, Event, End Date) */}
            <motion.div
              className={`flex flex-col ${
                isLeft ? "items-end pr-6" : "items-start pl-6"
              } w-full mt-2`}
              initial={{ opacity: 0, x: isLeft ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + index * 0.3, duration: 0.3 }}
              style={{
                marginLeft: isLeft ? "0" : "20px",
                marginRight: isLeft ? "20px" : "0",
              }}
            >
              <p className="text-xs text-gray-100/60">{item.text}</p>
              <p className="text-[8px] text-gray-400/50">
                {item.date}-{item.endDate}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
