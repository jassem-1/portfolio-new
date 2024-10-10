import blockExplorerImg from "../../../src/assets/images/block.png";
import noMoreWarImg from "../../../src/assets/images/nomore.png";
import rewardFactoryImg from "../../../src/assets/images/Capture d’écran 2024-08-20 204208.png";
import royalEscalierImg from "../../../src/assets/images/royal.png";
import etherscanCloneImg from "../../../src/assets/images/ether.png";
import ecommerceHomeImg from "../../../src/assets/images/ecomm.jpg";
import teamManagementImg from "../../../src/assets/images/taskmanager.png";
import staticCryptoImg from "../../../src/assets/images/static.png";
import eLearningPlatformImg from "../../../src/assets/images/lms.png";
import personalPortfolioImg from "../../../src/assets/images/portfolio.png";
import footballWeeklyImg from "../../../src/assets/images/football.jpg";

export const projectsData = [
  {
    title: "Block Explorer Tokens",
    description: "A crypto dashboard displaying account details like net worth, holdings, recent transactions, and token data (prices, top holders, trading charts). Built using web3 libraries like Coinbase, Moralis, and Alchemy.",
    tags: ["React", "Tailwind CSS" , "Chainbase","Moralis"],
    imageUrl: blockExplorerImg,
  },
  {
    title: "No More War",
    description: "A charitable platform where users can donate cryptocurrency to various causes. NoMoreWar ensures transparency by allowing the community to vote on which charities receive donations, empowering users to make an impact with their contributions.",
    tags: ["React", "Tailwind CSS" ],
    imageUrl: noMoreWarImg,
  },
  
  {
    title: "Football Weekly",
    description: "A personal portfolio showcasing projects built with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS"],
    imageUrl: footballWeeklyImg,
  },
  {
    title: "EtherScan Clone",
    description: "A block explorer featuring Ether and gas prices, user authentication via Supabase, and wallet login. It includes search functionality for addresses, transactions, and tokens, plus details like Ether balance, token transfers, and supply data. Built with Next.js, Tailwind CSS, and Etherscan API, focusing on performance and clean design.",
    tags: ["Next.js","Chainbase","Moralis","Wagmi","Ethers"],
    imageUrl: etherscanCloneImg,
  },

  
 
  {
    title: "Ecommerce Home Page",
    description: "A sleek homepage for an e-commerce site featuring modern animations and sliding carousels, built with Tailwind CSS and Framer Motion for a dynamic user experience.",
    tags: ["React","Tailwind CSS"],
    imageUrl: ecommerceHomeImg,
  },
  {
    title: "Royal Escalier",
    description: "A web app for a stairs company showcasing their projects with Framer Motion animations. It includes an admin page for managing projects add, edit, or delete powered by Firebase.",
    tags: ["React",  "Tailwind CSS","Firebase", "Framer Motion"],
    imageUrl: royalEscalierImg,
  },
  {
    title: "Team Management",
    description: "A full-stack team management app built with React, Node.js, and MongoDB.",
    tags: ["React", "Node.js", "MongoDB"],
    imageUrl: teamManagementImg,
  },
  {
    title: "Static Crypto-Related Interface",
    description: "A static interface for crypto-related projects built with React and CSS.",
    tags: ["React", "CSS"],
    imageUrl: staticCryptoImg,
  },
  {
    title: "E-learning Platform",
    description: "An online learning platform built with Next.js.",
    tags: ["Next.js","Prisma","Mux"],
    imageUrl: eLearningPlatformImg,
  },
  {
    title: "Personal Portfolio",
    description: "A personal portfolio showcasing projects built with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS","Framer Motion"],
    imageUrl: personalPortfolioImg,
  },
  {
    title: "Football Weekly",
    description: "A personal portfolio showcasing projects built with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS"],
    imageUrl: footballWeeklyImg,
  },
] as const;
