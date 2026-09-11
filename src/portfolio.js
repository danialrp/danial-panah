import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

// Splash Screen: off for the build-time prerenderer, and off when the page arrives
// prerendered (production), so the first paint is the real content.
const isPrerender =
  typeof navigator !== "undefined" && /Prerender/.test(navigator.userAgent);
const isPrerenderedPage =
  typeof document !== "undefined" &&
  document.getElementById("root") &&
  document.getElementById("root").hasChildNodes();
const splashScreen = {
  enabled: !isPrerender && !isPrerenderedPage,
  animation: splashAnimation,
  duration: 1500
};

// Summary And Greeting Section
const illustration = {
  animated: true
};

const greeting = {
  username: "danial panah",
  title: "Danial Panah",
  subTitle: emoji(
    "Senior AI / Machine Learning Engineer building LLM applications, agentic systems, RAG and MLOps on 10+ years of backend engineering. 🚀"
  ),
  resumeLink: "/DanialPanah.pdf",
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
    "Senior AI / Machine Learning Engineer building LLM applications, agentic systems, RAG pipelines and the MLOps behind them",
  skills: [
    emoji(
      "⚡ Build LLM applications and agentic, tool-calling systems that run in production, with evals, guardrails and hard cost controls"
    ),
    emoji(
      "⚡ Design RAG pipelines and fine-tune open-weight models (LoRA/QLoRA), from chunking and embeddings to reranking and semantic caching"
    ),
    emoji(
      "⚡ Ship and operate models on AWS and Azure with Docker, Kubernetes, CI/CD and monitoring for latency, cost and error rate"
    )
  ],
  softwareSkills: [
    {skillName: "Python", iconKey: "python"},
    {skillName: "PyTorch", iconKey: "pytorch"},
    {skillName: "LangChain", iconKey: "langchain"},
    {skillName: "Hugging Face", iconKey: "huggingface"},
    {skillName: "Anthropic Claude", iconKey: "anthropic"},
    {skillName: "OpenAI", iconKey: "openai"},
    {skillName: "FastAPI", iconKey: "fastapi"},
    {skillName: "PostgreSQL / pgvector", iconKey: "postgresql"},
    {skillName: "Redis", iconKey: "redis"},
    {skillName: "NATS JetStream", iconKey: "nats"},
    {skillName: "Docker", iconKey: "docker"},
    {skillName: "Kubernetes", iconKey: "kubernetes"},
    {skillName: "AWS", iconKey: "aws"},
    {skillName: "Azure", iconKey: "azure"},
    {skillName: "MLflow", iconKey: "mlflow"},
    {skillName: "Go", iconKey: "go"},
    {skillName: "TypeScript", iconKey: "typescript"}
  ],
  display: true
};

// Education Section
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Azad University, Science and Research Branch",
      logo: require("./assets/images/azadLogo.png"),
      subHeader: "M.Sc. Computer Software Engineering",
      duration: "2015",
      desc: "Postgraduate work in software engineering and systems architecture.",
      descBullets: []
    },
    {
      schoolName: "Azad University",
      logo: require("./assets/images/azadLogo.png"),
      subHeader: "B.Sc. Computer Engineering",
      duration: "2010",
      desc: "Computer engineering, algorithms, data structures and software development.",
      descBullets: []
    }
  ]
};

// Skill Progress Bars
const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "LLM Applications & Agentic Systems",
      progressPercentage: "90%"
    },
    {
      Stack: "RAG, Embeddings & Vector Search",
      progressPercentage: "85%"
    },
    {
      Stack: "ML & Fine-Tuning (PyTorch, LoRA/QLoRA)",
      progressPercentage: "80%"
    },
    {
      Stack: "MLOps & Cloud (Docker, Kubernetes, AWS, Azure)",
      progressPercentage: "85%"
    },
    {
      Stack: "Backend & Distributed Systems (Go, Python)",
      progressPercentage: "95%"
    }
  ],
  displayCodersrank: false
};

// Work Experience Section
const workExperiences = {
  display: true,
  experience: [
    {
      role: "Senior Backend Engineer",
      company: "CryHub",
      companylogo: require("./assets/images/companies/cryhubLogo.png"),
      date: "Jan 2026 – Aug 2026",
      desc: "LLM-driven anomaly detection on real-time crypto market data, on top of an event-driven microservices platform I owned end to end.",
      descBullets: [
        "Designed and shipped the LLM-driven anomaly and pattern detection pipeline on real-time crypto market data, built on the Anthropic Claude API; it replaced manual review.",
        "Owned the platform architecture end to end: a 4-service event-driven pipeline on an 8-stream NATS JetStream topology, built for high-throughput real-time data (Go, Redis, TimescaleDB).",
        "Built the pub/sub WebSocket layer that manages concurrent client connections and broadcasts market events.",
        "Split Redis across 4 databases (caching, aggregation state, rate limiting, connection tracking) and persisted time-series data in TimescaleDB.",
        "Containerized the full stack for dev/prod parity; day-to-day development in Claude Code and Cursor."
      ]
    },
    {
      role: "Senior Backend Engineer",
      company: "Subke GmbH",
      companylogo: require("./assets/images/companies/subkeLogo.png"),
      date: "Jan 2023 – Jan 2026",
      desc: "Multi-tenant enterprise CRM and logistics platform for a Hamburg logistics company, delivered remotely.",
      descBullets: [
        "Delivered a multi-tenant enterprise CRM and logistics platform: 30+ domain service classes across 72+ migrations. Paired AI-assisted development (ChatGPT, Cursor) with code written by hand, which sped up delivery without loosening architecture standards.",
        "Ran RBAC off a database-driven runtime model and moved JTL ERP synchronization and 14+ scheduled jobs to asynchronous queued background processing.",
        "Built a real-time messaging hub with IMAP/SMTP processing, an auto-routing rules engine and live notifications.",
        "Shipped QR-code parcel tracking and multi-language localization, and wrote the automated deployment commands for staging and production."
      ]
    },
    {
      role: "Lead Backend Developer",
      company: "The Bolt",
      companylogo: require("./assets/images/companies/theBoltLogo.png"),
      date: "Jan 2022 – Jul 2022",
      desc: "Backend lead for a London agency shipping full-stack applications to clients in automotive, clinical and industrial sectors.",
      descBullets: [
        "Led backend architecture across 5+ concurrent client projects, among them a vehicle sales CRM, a clinical services platform and an industrial packaging system.",
        "Set code-quality standards and delivery timelines for the team shipping those full-stack applications.",
        "Delivered the AutoASX vehicle sales CRM with client and dealer panels, search across thousands of vehicles, financial calculators and live vehicle data from external APIs."
      ]
    },
    {
      role: "Senior Laravel Developer",
      company: "Matter of Software",
      companylogo: require("./assets/images/companies/matterLogo.png"),
      date: "May 2021 – Sep 2021",
      desc: "Logistics and asset-management software for UK clients.",
      descBullets: [
        "Extended an existing asset management platform with RFID scanner integration and a REST API layer for mobile connectivity.",
        "Built a logistics platform that tracks reusable containers through inventory, warehousing, washing and repair."
      ]
    },
    {
      role: "Backend Developer & DevOps",
      company: "Kappa London",
      companylogo: require("./assets/images/companies/kappaLogo.png"),
      date: "Apr 2020 – May 2021",
      desc: "E-commerce, healthcare and social platforms for UK clients, plus deployment and server operations.",
      descBullets: [
        "Delivered the award-winning Bryant Dental e-commerce platform (Awwwards Honorable Mention 2018, Dental Industry Awards Best Website 2019).",
        "Built a social network for Oxford University with appointments, direct chat, and video/voice calls.",
        "Shipped an NHS-compliant dentistry management platform that handles appointments, diagnoses, financials and communications."
      ]
    },
    {
      role: "Laravel Developer, Project Manager & DevOps",
      company: "Teknet Ltd",
      companylogo: require("./assets/images/companies/teknetLogo.png"),
      date: "Jun 2018 – Jan 2020",
      desc: "Enterprise project management and scheduling systems for UK clients, from architecture to deployment.",
      descBullets: [
        "Led backend architecture for an enterprise project management system with CRM, accounting, GPS, scheduling and stock management modules.",
        "Launched an online scheduling and reservation system with PayPal payments and invoicing."
      ]
    }
  ]
};

// Open Source Section
const openSource = {
  showGithubProfile: "false",
  // Pinned repos are hidden until the GitHub pins point at AI work; the activity chart still shows.
  showRepos: false,
  display: true
};

// Big Projects Section
const bigProjects = {
  title: "Notable Projects",
  subtitle: "Production AI systems and the platforms underneath them",
  projects: [
    {
      image: require("./assets/images/projects/cryhubLogo.png"),
      projectName: "CryHub: LLM Anomaly Detection on Live Market Data",
      projectDesc:
        "LLM-driven pipeline that detects anomalies and patterns in real-time crypto market data and replaced manual review. Built on the Anthropic Claude API over a 4-service event-driven platform: Go, NATS JetStream (8 streams), Redis, TimescaleDB, WebSockets.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://cryhub.io"
        }
      ]
    },
    {
      image: require("./assets/images/projects/copilotLogo.png"),
      projectName: "AI Job-Application Co-Pilot",
      projectDesc:
        "Self-built platform that drafts tailored resumes and screening answers from a structured profile; a human reviews and submits every application. OpenRouter multi-tier routing, pgvector semantic cache, Chrome extension.",
      footerLink: []
    },
    {
      image: require("./assets/images/projects/subkeLogo.png"),
      projectName: "Subke CRM & Logistics Platform",
      projectDesc:
        "Multi-tenant enterprise CRM and logistics system: database-driven runtime RBAC, real-time messaging hub, QR-code parcel tracking, JTL ERP integration, 30+ domain service classes across 72+ migrations. Delivered with AI-assisted development alongside hand-written code.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.subke.com/en/"
        }
      ]
    },
    {
      image: require("./assets/images/projects/bryantLogo.png"),
      projectName: "Bryant Dental",
      projectDesc:
        "Award-winning e-commerce platform for a UK dental equipment manufacturer, with a product configurator, quote engine and content management. Awwwards Honorable Mention 2018, Dental Industry Awards Best Website 2019.",
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
  title: emoji("Achievements 🏆"),
  subtitle: "Recognised work from across my career.",
  achievementsCards: [
    {
      title: "Awwwards Honorable Mention",
      subtitle:
        "Bryant Dental received an Awwwards Honorable Mention in 2018 for web design and development.",
      image: require("./assets/images/achievements/awwwardsLogo.png"),
      imageAlt: "Awwwards Logo",
      footerLink: []
    },
    {
      title: "Dental Industry Awards, Best Website 2019",
      subtitle: "Bryant Dental won Best Website at the Dental Industry Awards 2019.",
      image: require("./assets/images/achievements/dentalAwardsLogo.png"),
      imageAlt: "Dental Industry Awards Logo",
      footerLink: []
    }
  ],
  display: true
};

// Blogs Section: disabled
const blogSection = {
  display: false
};

// Talks Section: disabled
const talkSection = {
  display: false
};

// Podcast Section: disabled
const podcastSection = {
  display: false
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Download the current CV",
  display: true
};

// Contact Section
const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Open to remote AI/ML engineering roles and contract work. Email is the fastest way to reach me.",
  email_address: "me@danialrp.com"
};

// Twitter: disabled
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
