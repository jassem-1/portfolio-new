import blockExplorerImg from "../../../src/assets/images/block.png";
import noMoreWarImg from "../../../src/assets/images/nomore.png";
import rewardFactoryImg from "../../../src/assets/images/Capture d’écran 2024-08-20 204208.png";
import royalEscalierImg from "../../../src/assets/images/royal.png";
import etherscanCloneImg from "../../../src/assets/images/ether.png";
import ecommerceHomeImg from "../../../src/assets/images/ecomm.jpg";
import teamManagementImg from "../../../src/assets/images/taskmanager.png";
import staticCryptoImg from "../../../src/assets/images/static.png";
import eLearningPlatformImg from "../../../src/assets/images/lms.png";
import personalPortfolioImg from "../../../src/assets/images/porftoliojass.png";
import footballWeeklyImg from "../../../src/assets/images/football.jpg";
import imen from "../../../src/assets/images/imen.png";
import amine from "../../../src/assets/images/amine.png";
import markitup from "../../../src/assets/images/markitup.png";
import donkey from "../../assets/images/golden-donkey.png";
import esprit from "../../../src/assets/images/esprit.png";
import flow from "../../../src/assets/images/flow.png";
interface ProjectData {
  title: string;
  description: string;
  tags: ReadonlyArray<string>; // Use readonly array
  imageUrl: string;
  url?: string; // Ensure all project objects have this
  videoUrl?: string; // Ensure all project objects have this
}

export const projectsData: ProjectData[] = [
  {
    title: "DeFi Platform",
    description:
      "This React app is a DeFi and wellness platform that integrates cryptocurrency management (swapping, coin tracking, wallet management), subscription plans (for coin analyses and community features) and much more. It uses Web3 technologies, Redux for state management, and Tailwind CSS for responsive design",
    tags: ["React.js", "Tailwind CSS", "Framer Motion"],
    imageUrl: flow, // Replace with an appropriate image URL or import
    videoUrl:
      "https://res.cloudinary.com/dbhrjqj53/video/upload/v1747390651/recording-25_EPHRSgK5_odbso5.mp4",
  },
  {
    title: "Golden Donkey ($GDK) - MemeCoin",
    description:
      "I built the frontend for Golden Donkey ($GDK), creating a unique, dynamic interface with custom animations and a smooth, engaging user experience. I focused on making the platform visually striking and highly interactive, ensuring seamless blockchain integration",
    tags: ["React.js", "Tailwind CSS", "Framer Motion"],
    imageUrl: donkey, // Replace with an appropriate image URL or import
    url: "https://www.goldendonkey.io/",
  },
  {
    title: "Custom Web Application for Amine Chebbi",
    description:
      "The app streamlines user requests for joining VIP groups, asking trading questions, and requesting educational resources. It features a custom admin dashboard that allows Amine to efficiently manage, filter, and track requests in real-time, improving operational workflows.",
    tags: [
      "React.js",
      "Tailwind CSS",
      "Firebase Firestore",
      "Firebase Authentication",
      "i18n",
    ],
    imageUrl: amine, // Replace with an appropriate image URL or import
    url: "https://chebbitrade.com/",
  },
  {
    title: "MarkItUp - Client Collaboration Tool",
    description:
      "MarkItUp simplifies client collaboration by allowing secure access to project updates, where clients can annotate visuals and provide feedback directly. It streamlines communication and bridges the gap between presentations and actionable feedback.",
    tags: [
      "React.js",
      "Tailwind CSS",
      "Annotation Features",
      "Client Collaboration",
    ],
    imageUrl: markitup, // Replace with an appropriate image URL or import
    videoUrl:
      "https://res.cloudinary.com/dbhrjqj53/video/upload/v1736163770/markitup_fw9ijx.mp4", // Link to the demonstration video
  },
  {
    title: "Block Explorer Tokens",
    description:
      "A crypto dashboard displaying account details like net worth, holdings, recent transactions, and token data (prices, top holders, trading charts). Built using web3 libraries like Coinbase, Moralis, and Alchemy.",
    tags: ["React", "Tailwind CSS", "Chainbase", "Moralis"],
    imageUrl: blockExplorerImg,
    videoUrl:
      "https://res.cloudinary.com/dbhrjqj53/video/upload/v1728657309/kqkekfkoftusvaj9vfsi.mp4", // Cloudinary video if URL is not provided
  },
  {
    title: "No More War",
    description:
      "A charitable platform where users can donate cryptocurrency to various causes. NoMoreWar ensures transparency by allowing the community to vote on which charities receive donations, empowering users to make an impact with their contributions.",
    tags: ["React", "Tailwind CSS"],
    imageUrl: noMoreWarImg,
    url: "https://nomorewar.io/", // Add the URL if available
  },

  {
    title: "Football Weekly",
    description:
      "A football web app that provides the latest news, team rankings, goal stats, and match predictions. Users can stay updated on their favorite teams, track performance stats, and view data-driven predictions for upcoming matches.",
    tags: ["React", "Tailwind CSS"],
    imageUrl: footballWeeklyImg,
    url: "https://res.cloudinary.com/dbhrjqj53/video/upload/v1728733084/recording-_9__wfgb0h.mp4", // Cloudinary video if URL is not provided
  },
  {
    title: "EtherScan Clone",
    description:
      "A block explorer featuring Ether and gas prices, user authentication via Supabase, and wallet login. It includes search functionality for addresses, transactions, and tokens, plus details like Ether balance, token transfers, and supply data. Built with Next.js, Tailwind CSS, and Etherscan API, focusing on performance and clean design.",
    tags: ["Next.js", "Chainbase", "Moralis", "Wagmi", "Ethers"],
    imageUrl: etherscanCloneImg,
    url: "https://ethers-clone-jassem.netlify.app/", // Add the URL if available
  },

  {
    title: "Ecommerce Home Page",
    description:
      "A sleek homepage for an e-commerce site featuring modern animations and sliding carousels, built with Tailwind CSS and Framer Motion for a dynamic user experience.",
    tags: ["React", "Tailwind CSS"],
    imageUrl: ecommerceHomeImg,
    videoUrl:
      "https://res.cloudinary.com/dbhrjqj53/video/upload/v1728656591/qvj4pkzzhckqgkdj6bzo.mp4", // Cloudinary video if URL is not provided
  },
  {
    title: "Royal Escalier",
    description:
      "A web app for a stairs company showcasing their projects with Framer Motion animations. It includes an admin page for managing projects add, edit, or delete powered by Firebase.",
    tags: ["React", "Tailwind CSS", "Firebase", "Framer Motion"],
    imageUrl: royalEscalierImg,
    videoUrl:
      "https://res.cloudinary.com/dbojnwz4o/video/upload/v1733572626/z7ozliuqim0vmemzougv.mp4", // Add the URL if available
  },
  {
    title: "Task Management",
    description:
      "A full-stack team management app built with React, Node.js, and MongoDB.",
    tags: ["React", "Node.js", "MongoDB"],
    imageUrl: teamManagementImg,
    url: "https://github.com/jassem-1/task-manager-front",
  },
  {
    title: "Static Crypto-Related Interface",
    description:
      "A static interface for crypto-related projects built with React and CSS.",
    tags: ["React", "CSS"],
    imageUrl: staticCryptoImg,
    url: "https://belguith-dashboard.vercel.app/", // Add the URL if available
  },
  {
    title: "E-learning Platform",
    description:
      "A Learning Management System (LMS) where users can browse, purchase, and track courses. Teachers can create, manage, and reorder chapters with drag-and-drop. ",
    tags: ["Next.js 13", "Prisma", "Stripe", "Clerk", "Mux", "UploadThing"],
    imageUrl: eLearningPlatformImg,
    url: "https://github.com/jassem-1/pcd", // Add the URL if available
  },
  {
    title: "ESPRIT  Management System",
    description:
      "An RDI management system for ESPRIT, built with Spring Boot and React, enabling project tracking, team management, and real-time collaboration, with dynamic reports and a user-friendly interface using Material UI and Tailwind CSS.",
    tags: ["Spring Boot", "React", "Material UI", "Recharts"],
    imageUrl: esprit,
    videoUrl:
      "https://res.cloudinary.com/dbhrjqj53/video/upload/v1728823338/espritTech_1_scwqk4.mp4", // Cloudinary video if URL is not provided
  },
  {
    title: "Personal Portfolio",
    description:
      "This site showcases my journey as a web developer, highlighting two years of freelancing, internships, and academic projects.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    imageUrl: personalPortfolioImg,
    url: "https://jassem-portfolio.netlify.app/", // Add the URL if available
  },
  {
    title: "Imen Cherif webpage",
    description:
      "A Webpage showcasing Imen Cherif’s journey as a singer-songwriter, model, and actress including a portfolio of projects, events , music video gallery, and real-time social media stats. Built with modern UI/UX for a seamless fan experience.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    imageUrl: imen,
    url: "https://imencherifofficiel.com/", // Add the URL if available
  },
  {
    title: "Reward factrory",
    description:
      "A landing page for a crypto-related project with complex animations.",
    tags: ["React", "Tailwind CSS"],
    imageUrl: rewardFactoryImg,
    url: "https://rewardfactory.io/", // Add the URL if available
  },
] as const;
