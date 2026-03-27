import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

// Splash Screen
const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 3600
};

// Summary And Greeting Section
const illustration = {
  animated: true
};

const greeting = {
  username: "danial panah",
  title: "Danial Panah",
  subTitle: emoji(
    "Senior Backend Engineer with production-grade experience in Go, Python and Laravel — building scalable APIs, real-time systems, ERP integrations, and crypto exchange platforms since 2015. 🚀"
  ),
  resumeLink: "/DanialPanah—SeniorBackendEngineer.pdf",
  displayGreeting: true
};

// Social Media Links
const socialMediaLinks = {
  github: "https://github.com/danialrp",
  linkedin: "https://www.linkedin.com/in/danialrp/",
  gmail: "me@danialrp.com",
  gitlab: "https://gitlab.com/danialrp",
  x: "https://x.com/DanialPanah",
  display: true
};

// Skills Section
const skillsSection = {
  title: "What I Do",
  subTitle:
    "SENIOR BACKEND ENGINEER SPECIALISING IN GOLANG, PYTHON, LARAVEL AND SCALABLE DISTRIBUTED SYSTEMS",
  skills: [
    emoji(
      "⚡ Architect and build production-grade REST APIs and backend systems using Go, Python and Laravel"
    ),
    emoji(
      "⚡ Design real-time event-driven microservices with WebSockets, NATS JetStream, and Redis queue systems"
    ),
    emoji(
      "⚡ Deliver multi-tenant SaaS platforms, ERP integrations, fintech payment pipelines, and crypto exchange backends"
    )
  ],
  softwareSkills: [
    {
      skillName: "Go",
      iconKey: "go"
    },
    {
      skillName: "Python",
      iconKey: "python"
    },
    {
      skillName: "Node.js",
      iconKey: "nodejs"
    },
    {
      skillName: "Laravel",
      iconKey: "laravel"
    },
    {
      skillName: "FastAPI",
      iconKey: "fastapi"
    },
    {
      skillName: "WebSocket",
      iconKey: "websocket"
    },
    {
      skillName: "Redis",
      iconKey: "redis"
    },
    {
      skillName: "NATS JetStream",
      iconKey: "nats"
    },
    {
      skillName: "PostgreSQL",
      iconKey: "postgresql"
    },
    {
      skillName: "Docker",
      iconKey: "docker"
    },
    {
      skillName: "PHP",
      iconKey: "php"
    },
    {
      skillName: "Vue.js",
      iconKey: "vuejs"
    },
    {
      skillName: "AWS",
      iconKey: "aws"
    },
    {
      skillName: "Git",
      iconKey: "git"
    }
  ],
  display: true
};

// Education Section
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Azad University — Science and Research Branch",
      logo: require("./assets/images/azadLogo.png"),
      subHeader: "M.Sc. Computer Software Engineering",
      duration: "Graduated 2015",
      desc: "Postgraduate research in software engineering, systems architecture, and advanced programming methodologies.",
      descBullets: []
    },
    {
      schoolName: "Azad University",
      logo: require("./assets/images/azadLogo.png"),
      subHeader: "B.Sc. Computer Engineering",
      duration: "Graduated 2010",
      desc: "Undergraduate foundation in computer engineering, algorithms, data structures, and software development.",
      descBullets: []
    }
  ]
};

// Skill Progress Bars
const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Backend Architecture / APIs / WebSockets",
      progressPercentage: "95%"
    },
    {
      Stack: "Go (Golang)",
      progressPercentage: "80%"
    },
    {
      Stack: "Python / Django / FastAPI",
      progressPercentage: "65%"
    },
    {
      Stack: "PHP / Laravel",
      progressPercentage: "90%"
    },
  ],
  displayCodersrank: false
};

// Work Experience Section
const workExperiences = {
  display: true,
  experience: [
    {
      role: "Senior Backend Developer",
      company: "Subke GmbH",
      companylogo: require("./assets/images/companies/subkeLogo.png"),
      date: "Jan 2023 – Mar 2026",
      desc: "Built a full-stack internal CRM and logistics management platform from scratch. Designed a DB-driven RBAC system, async ERP integration with JTL Webservice, real-time messaging hub, and parcel tracking with QR-code item management.",
      descBullets: [
        // "Laravel 10 / PHP 8.x, PostgreSQL (72+ migrations), Redis, Docker",
        "Multi-tenant architecture with DB-driven runtime RBAC across 30+ service classes",
        "Real-time features via Laravel Reverb (WebSockets) and Livewire 3",
        // "14+ automated background jobs via Laravel Horizon queue workers",
        // "JTL ERP integration via Guzzle — async company, user, and role data sync",
        "Full messaging hub: IMAP inbox polling, SMTP outbound, auto-routing rules engine"
      ]
    },
    {
      role: "Lead Backend Developer",
      company: "The Bolt",
      companylogo: require("./assets/images/companies/theBoltLogo.png"),
      date: "Jan 2022 – Jul 2022",
      desc: "Led backend team across 5+ simultaneous projects. Built and deployed Laravel applications including a vehicle sales CRM and multiple custom CMS platforms for UK clients.",
      descBullets: [
        "AutoASX: vehicle sales CRM with advanced search and financial calculators",
        "Clinical Services International, ESS Packaging, Efficient Frontiers, Record Financial Group — custom Laravel CMS platforms"
      ]
    },
    {
      role: "Senior Laravel Developer",
      company: "Matter of Software",
      companylogo: require("./assets/images/companies/matterLogo.png"),
      date: "May 2021 – Sep 2021",
      desc: "Developed and maintained Laravel web applications and RESTful APIs for UK logistics and asset management clients.",
      descBullets: [
        "RFID Asset Management: extended snipe-it with RFID scanner integration and RESTful API layer",
        "ORCA: logistics management platform for reusable container supply chain tracking"
      ]
    },
    {
      role: "PHP Laravel Developer & DevOps",
      company: "Kappa London",
      companylogo: require("./assets/images/companies/kappaLogo.png"),
      date: "Apr 2020 – May 2021",
      desc: "Built and maintained Laravel RESTful APIs, PHP e-commerce systems, and deployed applications on LEMP/LAMP stack servers.",
      descBullets: [
        "Bryant Dental: award-winning e-commerce (Awwwards HM 2018, Dental Industry Awards 2019)",
        "Bloomd: Oxford University social network with chat, video/voice calls, and mentor matching",
        "Nova AI: NHS-compliant centralised dentistry management platform"
      ]
    }
  ]
};

// Open Source Section
const openSource = {
  showGithubProfile: "true",
  display: true
};

// Big Projects Section
const bigProjects = {
  title: "Notable Projects",
  subtitle: "PRODUCTION SYSTEMS AND PLATFORMS BUILT ACROSS FINTECH, CRYPTO, LOGISTICS AND ENTERPRISE",
  projects: [
    {
      image: require("./assets/images/projects/cryhubLogo.png"),
      projectName: "CryHub — Real-Time Market Data Platform",
      projectDesc:
        "High-throughput event-driven microservices platform for real-time crypto market data ingestion and fan-out distribution. Built with Go, NATS JetStream, TimescaleDB, Redis, WebSocket. 4-service pipeline, 8-stream NATS topology, thread-safe pub/sub hub.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://cryhub.io"
        }
      ]
    },
    {
      image: require("./assets/images/projects/irbtcLogo.png"),
      projectName: "IRBTC — Cryptocurrency Exchange",
      projectDesc:
        "Production-grade crypto exchange backend handling fiat/crypto trading, KYC identity verification, and financial transaction processing. Built with Laravel 10, PostgreSQL, Redis, AWS S3. 90+ services, 28 contract-based interfaces, Huobi (HTX) integration.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://irbtc.com"
        }
      ]
    },
    {
      image: require("./assets/images/projects/subkeLogo.png"),
      projectName: "Subke CRM & Logistics Platform",
      projectDesc:
        "Full-stack internal CRM and logistics management system. Multi-tenant architecture with DB-driven RBAC, real-time messaging hub, parcel tracking, QR-code item management, JTL ERP integration, and 30+ domain service classes across 72+ DB migrations.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.subke.com/en/"
        }
      ]
    },
    {
      image: require("./assets/images/projects/bryantLogo.png"),
      projectName: "Bryant Dental — International",
      projectDesc:
        "Award-winning e-commerce platform for a UK dental equipment manufacturer, built with Laravel and React.js. Features a custom product configurator, quote engine, and content management system. Awwwards Honorable Mention 2018. Dental Industry Awards Best Website 2019.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://bryant.dental/"
        }
      ]
    }
  ],
  display: true
};

// Achievement Section
const achievementSection = {
  title: emoji("Achievements & Certifications 🏆"),
  subtitle: "Awards, certifications, and recognised work from across my career.",
  achievementsCards: [
    {
      title: "Awwwards Honorable Mention",
      subtitle:
        "Bryant Dental recognised with an Awwwards Honorable Mention in 2018 for outstanding web design and development.",
      image: require("./assets/images/achievements/awwwardsLogo.png"),
      imageAlt: "Awwwards Logo",
      footerLink: []
    },
    {
      title: "Dental Industry Awards — Best Website 2019",
      subtitle:
        "Bryant Dental won Best Website at the Dental Industry Awards 2019.",
      image: require("./assets/images/achievements/dentalAwardsLogo.png"),
      imageAlt: "Dental Industry Awards Logo",
      footerLink: []
    },
    {
      title: "Laravel Advanced Topics — Certification",
      subtitle:
        "Completed advanced Laravel 9.x certification covering architecture patterns, queue systems, and performance optimisation.",
      image: require("./assets/images/achievements/laravelLogo.png"),
      imageAlt: "Laravel Logo",
      footerLink: []
    }
  ],
  display: true
};

// Blogs Section — disabled
const blogSection = {
  display: false
};

// Talks Section — disabled
const talkSection = {
  display: false
};

// Podcast Section — disabled
const podcastSection = {
  display: false
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",
  display: true
};

// Contact Section
const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Available for backend engineering roles, technical consulting, and architecture discussions.",
  email_address: "me@danialrp.com"
};

// Twitter — disabled
const twitterDetails = {
  userName: "",
  display: false
};

const isHireable = true;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};