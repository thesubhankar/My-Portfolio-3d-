// 9 Categorical Skills Toolkit
export const technologyCategories = [
  {
    id: "programming",
    title: "Programming",
    icon: "SiPython",
    color: "#00f0ff",
    skills: [
      { name: "Python", icon: "SiPython", level: "Core Language" },
    ]
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    icon: "SiPandas",
    color: "#ff007f",
    skills: [
      { name: "Pandas", icon: "SiPandas", level: "Data Wrangling" },
      { name: "NumPy", icon: "SiNumpy", level: "Numerical Arrays" },
      { name: "Exploratory Data Analysis (EDA)", icon: "TbReportAnalytics", level: "Pattern Discovery" }
    ]
  },
  {
    id: "visualization",
    title: "Data Visualization",
    icon: "TbLayoutDashboard",
    color: "#9d4edd",
    skills: [
      { name: "Matplotlib", icon: "TbChartLine", level: "Plotting Engine" },
      { name: "Seaborn", icon: "TbChartDots", level: "Statistical Graphics" },
      { name: "Power BI", icon: "TbLayoutDashboard", level: "Executive Dashboards" },
      { name: "Tableau", icon: "TbChartBar", level: "Visual Storytelling" }
    ]
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    icon: "SiScikitlearn",
    color: "#00f0ff",
    skills: [
      { name: "Scikit-learn", icon: "SiScikitlearn", level: "ML Framework" },
      { name: "Regression", icon: "TbChartLine", level: "Continuous Target" },
      { name: "Classification", icon: "TbBinaryTree", level: "Categorical Target" },
      { name: "Clustering", icon: "TbCircleDot", level: "Unsupervised K-Means" }
    ]
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    icon: "SiTensorflow",
    color: "#ff007f",
    skills: [
      { name: "TensorFlow", icon: "SiTensorflow", level: "Deep Framework" },
      { name: "Keras", icon: "SiKeras", level: "Neural API" },
      { name: "Neural Networks", icon: "TbBrain", level: "Deep Architectures" },
      { name: "CNN", icon: "TbLayersIntersect", level: "Computer Vision" }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    icon: "SiPostgresql",
    color: "#9d4edd",
    skills: [
      { name: "SQL", icon: "TbDatabase", level: "Query Optimization" },
      { name: "MySQL", icon: "SiMysql", level: "Relational DB" },
      { name: "SQLite", icon: "SiSqlite", level: "Lightweight DB" },
      { name: "PostgreSQL", icon: "SiPostgresql", level: "Advanced RDBMS" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Ecosystem",
    icon: "SiJupyter",
    color: "#00f0ff",
    skills: [
      { name: "Microsoft Excel", icon: "FaFileExcel", level: "Formulas & Pivot" },
      { name: "Jupyter Notebook", icon: "SiJupyter", level: "Interactive Computing" },
      { name: "Anaconda", icon: "SiAnaconda", level: "Env Management" },
      { name: "VS Code", icon: "VscCode", level: "Primary IDE" }
    ]
  },
  {
    id: "version-control",
    title: "Version Control",
    icon: "SiGit",
    color: "#ff007f",
    skills: [
      { name: "Git", icon: "SiGit", level: "Branching & VCS" },
      { name: "GitHub", icon: "SiGithub", level: "Repo Collaboration" }
    ]
  },
  {
    id: "deployment",
    title: "Deployment & Serving",
    icon: "SiFastapi",
    color: "#9d4edd",
    skills: [
      { name: "Flask", icon: "SiFlask", level: "Micro Web Framework" },
      { name: "FastAPI", icon: "SiFastapi", level: "Asynchronous APIs" },
      { name: "Streamlit", icon: "SiStreamlit", level: "Rapid ML Apps" }
    ]
  }
];

// Production Codebase Projects
export const initialProjects = [
  {
    id: "thiranex-portal",
    title: "Thiranex Data Science Unified Portal",
    category: "Full Stack Data Science",
    description: "An enterprise 4-in-1 interactive Data Science platform featuring automated data cleaning, predictive ML modeling, statistical workforce EDA, and a customer churn AI simulator with financial ROI calculation.",
    image: "/projects/thrianex image/thumblain.webp",
    images: [
      "/projects/thrianex image/thumblain.webp",
      "/projects/thrianex image/task1_data_cleaning.webp",
      "/projects/thrianex image/task2_store_sales_ml.webp",
      "/projects/thrianex image/task3_workforce_eda.webp",
      "/projects/thrianex image/task4_retail_churn_ai.webp"
    ],
    technologies: ["Python", "Streamlit", "Pandas", "Scikit-learn", "Plotly", "Seaborn"],
    github: "https://github.com/thesubhankar/thiranex-internship",
    live: "https://thiranex-internship-njtpmctjcmcphu6hywitxa.streamlit.app/",
    featured: true,
    createdAt: "2024-12-15"
  },
  {
    id: "employee-attrition",
    title: "Employee Attrition & Workforce Analytics",
    category: "Machine Learning & EDA",
    description: "Predictive analytics pipeline identifying high-risk employee turnover factors. Features comprehensive demographic segmentation, correlation heatmaps, and a tuned Random Forest classification model.",
    image: "/projects/employee/emp_slide1.webp",
    images: [
      "/projects/employee/emp_slide1.webp",
      "/projects/employee/emp_slide2.webp",
      "/projects/employee/emp_slide3.webp"
    ],
    technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
    github: "https://github.com/thesubhankar",
    live: "https://incodevision-task-2-eda-dashboad.streamlit.app/",
    featured: true,
    createdAt: "2024-11-20"
  },
  {
    id: "movie-recommender",
    title: "AI-Powered Movie Recommender System",
    category: "AI & Recommendation Systems",
    description: "High-performance recommendation engine combining cosine similarity on vectorized metadata (genres, cast, crew, keywords) with collaborative filtering for accurate personalized suggestions.",
    image: "/projects/movie/movie_slide1.webp",
    images: [
      "/projects/movie/movie_slide1.webp",
      "/projects/movie/movie_slide2.webp",
      "/projects/movie/movie_slide3.webp"
    ],
    technologies: ["Python", "Streamlit", "Scikit-learn", "NLP", "Pandas"],
    github: "https://github.com/thesubhankar",
    live: "",
    featured: false,
    createdAt: "2024-10-10"
  },
  {
    id: "supply-chain-logistics",
    title: "Supply Chain & Logistics Delay Optimizer",
    category: "Predictive Analytics",
    description: "End-to-end supply chain operational dashboard forecasting shipment delays, identifying bottleneck fulfillment nodes, and optimizing multi-modal inventory transit schedules.",
    image: "/projects/supplychain/supply_slide1.webp",
    images: [
      "/projects/supplychain/supply_slide1.webp",
      "/projects/supplychain/supply_slide2.webp",
      "/projects/supplychain/supply_slide3.webp"
    ],
    technologies: ["Python", "Power BI", "Pandas", "NumPy", "XGBoost"],
    github: "https://github.com/thesubhankar",
    live: "",
    featured: false,
    createdAt: "2024-09-05"
  },
  {
    id: "data-cleaning-studio",
    title: "IncodeVision Data Cleaning Studio",
    category: "Data Engineering",
    description: "Interactive data preparation platform enabling automated missing value imputation, outlier detection, data type casting, and standardizing raw datasets into analytics-ready CSVs.",
    image: "/projects/thrianex image/task1_data_cleaning.webp",
    images: [
      "/projects/thrianex image/task1_data_cleaning.webp"
    ],
    technologies: ["Python", "Streamlit", "Pandas", "NumPy"],
    github: "https://github.com/thesubhankar",
    live: "https://incodevision-task-1-datacleaningstudio.streamlit.app/",
    featured: true,
    createdAt: "2024-08-15"
  },
  {
    id: "student-management",
    title: "Student Database & Analytics Management System",
    category: "Database Systems",
    description: "Relational database application utilizing SQL schemas and a desktop interface for student performance tracking, course enrollment records, and historical academic metric calculation.",
    image: "/projects/thrianex image/task3_workforce_eda.webp",
    images: [
      "/projects/thrianex image/task3_workforce_eda.webp"
    ],
    technologies: ["Python", "SQL", "MySQL", "Database Design"],
    github: "https://github.com/thesubhankar/student-managment-system",
    live: "",
    featured: false,
    createdAt: "2024-07-01"
  }
];

// Verified Certifications
export const initialCertificates = [
  {
    id: "cert-fsds",
    title: "Full Stack Data Science & AIML",
    organization: "PythonSoft LLP",
    date: "2024",
    image: "/images/favicon-32x32.png",
    pdfUrl: "/certificates/1-FullStack DataScience(PS).pdf",
    credentialUrl: "https://drive.google.com/file/d/1cl2VigQ5hxvn8Rvf95aB_rDKcxp-DC7W/view?usp=drive_link",
    description: "Intensive program covering end-to-end Data Science, machine learning, deep learning, statistical analysis, and production deployment.",
    skills: ["Python", "Machine Learning", "EDA", "Deep Learning", "SQL"]
  },
  {
    id: "cert-python-30d",
    title: "30 Days Python Micro Course",
    organization: "SkillCourse",
    date: "2024",
    image: "/images/favicon-32x32.png",
    pdfUrl: "/certificates/2-python 30 day micro course.pdf",
    credentialUrl: "https://drive.google.com/file/d/1_8l84tbuG8lmW_nmikiv928YXy97ercc/view?usp=drive_link",
    description: "Deep-dive mastery in Python core algorithms, object-oriented programming (OOP), data structures, algorithmic efficiency, and automation.",
    skills: ["Python OOP", "Data Structures", "Algorithms"]
  },
  {
    id: "cert-cloud-llm",
    title: "Cloud LLM & Generative Architecture",
    organization: "Coursera / Google Cloud",
    date: "2024",
    image: "/images/favicon-32x32.png",
    pdfUrl: "/certificates/10.2-Cloud LLM.pdf",
    credentialUrl: "https://github.com/thesubhankar",
    description: "Large Language Model concepts, fine-tuning methodologies, prompt engineering, and scalable cloud-based AI inference workflows.",
    skills: ["LLMs", "GenAI", "Cloud AI"]
  },
  {
    id: "cert-encoder-decoder",
    title: "Encoder-Decoder & Attention Mechanisms",
    organization: "Coursera / DeepLearning.AI",
    date: "2024",
    image: "/images/favicon-32x32.png",
    pdfUrl: "/certificates/10.1-encoder-decoder.pdf",
    credentialUrl: "https://github.com/thesubhankar",
    description: "Deep neural sequence modeling, self-attention calculations, transformer backbones, and neural translation architectures.",
    skills: ["Transformers", "Attention", "Deep Learning"]
  },
  {
    id: "cert-genai",
    title: "Generative AI Foundations",
    organization: "Coursera",
    date: "2024",
    image: "/images/favicon-32x32.png",
    pdfUrl: "/certificates/10.3-Generative AI (corsera).pdf",
    credentialUrl: "https://github.com/thesubhankar",
    description: "Theoretical and applied grounding in generative diffusion models, generative adversarial networks (GANs), and transformer transformers.",
    skills: ["Generative AI", "Neural Networks"]
  },
  {
    id: "cert-iot",
    title: "IoT Systems & Data Streaming",
    organization: "Coursera",
    date: "2023",
    image: "/images/favicon-32x32.png",
    pdfUrl: "/certificates/10.4-IOT (corsera).pdf",
    credentialUrl: "https://github.com/thesubhankar",
    description: "Sensor telemetry collection, IoT data ingestion pipelines, edge processing, and embedded device connectivity.",
    skills: ["IoT", "Telemetry", "Data Ingestion"]
  }
];

// Key Milestones & Quantified Accomplishments
export const initialAchievements = [
  {
    id: "ach-projects",
    title: "15+ Production & Research Projects Completed",
    organization: "Personal & Academic Portfolio",
    date: "2024",
    description: "Designed, engineered, and deployed end-to-end applications spanning full-stack data science, predictive analytics, recommendation systems, and data cleaning studios.",
    tag: "Deployment",
    icon: "project"
  },
  {
    id: "ach-certs",
    title: "8+ Industry & Academic Accreditations",
    organization: "Google Cloud, Coursera & PythonSoft",
    date: "2024",
    description: "Earned recognized certifications in Full Stack Data Science, Machine Learning, Cloud LLM Architectures, and Generative Artificial Intelligence.",
    tag: "Certification",
    icon: "cert"
  },
  {
    id: "ach-hours",
    title: "1,200+ Hours of Hands-on Algorithmic Scripting",
    organization: "Independent Development & LeetCode",
    date: "2023 - Present",
    description: "Rigorous dedication to programming Python, optimizing SQL queries, crafting Pandas data pipelines, and implementing classical ML algorithms.",
    tag: "Dedication",
    icon: "code"
  },
  {
    id: "ach-contributions",
    title: "50+ Open Source Commits & Repositories",
    organization: "GitHub Community (@thesubhankar)",
    date: "2024",
    description: "Actively contributing to open-source Python analytics tools, sharing reproducible notebooks, and providing documented code for aspiring data practitioners.",
    tag: "Open Source",
    icon: "github"
  }
];
