import { 
  HiOutlineHome, 
  HiOutlineUser, 
  HiOutlineCode, 
  HiOutlineBriefcase, 
  HiOutlineAcademicCap, 
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineMail
} from 'react-icons/hi';
import { FaAward, FaGithubAlt, FaGithub, FaLinkedinIn, FaKaggle } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

// Section Navigation Index
export const navItems = [
  { id: 'home', number: '1', label: 'Home', icon: HiOutlineHome, comment: 'system.init()' },
  { id: 'about', number: '2', label: 'About', icon: HiOutlineUser, comment: 'subhankar.get_biography()' },
  { id: 'skills', number: '3', label: 'Skills', icon: HiOutlineCode, comment: 'skills_df.describe()' },
  { id: 'projects', number: '4', label: 'Projects', icon: HiOutlineBriefcase, comment: 'portfolio.get_projects()' },
  { id: 'certifications', number: '5', label: 'Certifications', icon: FaAward, comment: 'credentials.verify_all()' },
  { id: 'education', number: '6', label: 'Education', icon: HiOutlineAcademicCap, comment: 'education.get_timeline()' },
  { id: 'experience', number: '7', label: 'Experience', icon: HiOutlineBriefcase, comment: 'experience.display_history()' },
  { id: 'achievements', number: '8', label: 'Achievements', icon: HiOutlineSparkles, comment: 'metrics.compute_milestones()' },
  { id: 'github', number: '9', label: 'Github Analytics', icon: FaGithubAlt, comment: 'github.sync_telemetry()' },
  { id: 'resume', number: '10', label: 'Resume / CV', icon: HiOutlineDocumentText, comment: 'resume.load_document()' },
  { id: 'contact', number: '11', label: 'Contact', icon: HiOutlineMail, comment: 'contact.send_message()' },
];

// Verified Social Channels
export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/thesubhankar",
    icon: FaGithub,
    username: "@thesubhankar",
    color: "#ffffff"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/subhankar-giri-2a4b0a295",
    icon: FaLinkedinIn,
    username: "subhankar-giri-2a4b0a295",
    color: "#0a66c2"
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/subhaknar/",
    icon: SiLeetcode,
    username: "subhaknar",
    color: "#ffa116"
  },
  {
    name: "Kaggle",
    url: "https://www.kaggle.com/thesubhankar",
    icon: FaKaggle,
    username: "thesubhankar",
    color: "#20beff"
  }
];

// Profile Overview & Meta
export const portfolioData = {
  name: "Subhankar Giri",
  role: "Data Scientist & Data Analyst",
  tagline: "Empowering Decisions with Data-Driven Insights",
  shortIntro: "A passionate Data Science & Data Analysis specialist dedicated to uncovering hidden patterns, training high-precision predictive models, and building production-grade analytical platforms that solve complex business problems.",
  status: "Available for Opportunities",
  statusSub: "Python 3 | idle · Notebook Ready",
  location: "Odisha, India",
  email: "thesubhankar.giri992@gmail.com",
  phone: "+91 89848 44103",
  resumePath: "/resume.pdf",
  stats: [
    { label: "Completed Projects", value: "15+", sub: "Production Codebases" },
    { label: "Certifications", value: "8+", sub: "Google, Coursera & PS" },
    { label: "Hands-on Coding", value: "1200+", sub: "Hours Scripting & ML" },
    { label: "Open Source", value: "50+", sub: "Commits & Repos" },
  ],
  bioHighlights: [
    {
      title: "Data Science & Predictive ML",
      desc: "Specialized in developing supervised/unsupervised machine learning models (Regression, Random Forest, XGBoost, Clustering) with end-to-end evaluation and deployment.",
      icon: "brain"
    },
    {
      title: "Statistical EDA & Analytics",
      desc: "Transforming messy, heterogeneous datasets into clear narrative reports and interactive dashboards using Pandas, NumPy, Power BI, and Seaborn.",
      icon: "chart"
    },
    {
      title: "Production Architecture",
      desc: "Deploying interactive machine learning applications via Streamlit, FastAPI, and modular Python pipelines designed for scalability and performance.",
      icon: "server"
    },
    {
      title: "Clean Data Engineering",
      desc: "Building automated data cleaning studios, ETL scripts, and SQL schema pipelines that eliminate processing anomalies and standardize data quality.",
      icon: "database"
    }
  ],
  emailjs: {
    serviceId: "service_9rn9xvv",
    templateId: "template_ybsw8ls",
    publicKey: "B05y6CTcLvojnMeB-"
  }
};

// Academic Journey
export const educationData = [
  {
    id: "edu-btech",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "KMBB College of Engineering and Technology",
    affiliation: "Affiliated with Biju Patnaik University of Technology (BPUT), Odisha",
    duration: "2023 - 2027",
    status: "In Progress",
    description: "Rigorous curriculum focused on Data Structures, Algorithms, Relational Database Management Systems, Discrete Mathematics, Artificial Intelligence, and Applied Machine Learning.",
    highlights: ["Data Structures & Algorithms", "Database Engineering", "Machine Learning", "Software Architecture"]
  },
  {
    id: "edu-higher-secondary",
    degree: "Higher Secondary (+2 Science)",
    institution: "Dr. Harekrushna Mahatab College, Kupari",
    affiliation: "Council of Higher Secondary Education (CHSE), Odisha",
    duration: "2021 - 2023",
    status: "Completed (64% Aggregate)",
    description: "Specialized in the Science stream with intensive coursework in Physics, Chemistry, Mathematics, and foundational Computer Science concepts.",
    highlights: ["Advanced Mathematics", "Physics", "Computer Science Foundations"]
  },
  {
    id: "edu-secondary",
    degree: "Secondary School Examination (10th Standard)",
    institution: "State High School",
    affiliation: "Board of Secondary Education (BSE), Odisha",
    duration: "2021",
    status: "Completed",
    description: "Strong foundational education in Mathematics, Science, English, and analytical problem-solving.",
    highlights: ["Analytical Thinking", "Science & Mathematics"]
  }
];

// Work History & Experience
export const experienceData = [
  {
    id: "exp-tech-solutions",
    role: "Data Science Intern",
    organization: "Tech Solutions Inc. (Remote)",
    duration: "Dec 2024 - Mar 2025",
    type: "Internship",
    location: "Remote",
    responsibilities: [
      "Engineered automated ETL pipelines parsing high-velocity JSON web-traffic and activity datasets.",
      "Reduced processing anomalies by 18% through rigorous schema validation and outlier cleaning rules in Pandas.",
      "Developed live stakeholder KPI dashboards monitoring operational conversion rates and feature performance.",
      "Collaborated with engineering teams to optimize feature pipelines for low-latency downstream ML models."
    ],
    technologies: ["Python", "Pandas", "SQL", "Streamlit", "Matplotlib", "Git"]
  },
  {
    id: "exp-freelance",
    role: "Freelance Data Analyst",
    organization: "Client Contracts (Upwork / Fiverr)",
    duration: "2023 - Present",
    type: "Freelance & Consulting",
    location: "Remote",
    responsibilities: [
      "Transformed unstructured business Excel spreadsheets into automated, interactive Power BI executive dashboards.",
      "Constructed normalized relational SQL schemas and tuned query indices for fast analytics over 100K+ transaction rows.",
      "Formulated statistical hypothesis testing and customer retention analyses driving direct business efficiency gains.",
      "Delivered comprehensive data story presentations translating statistical results into practical strategic recommendations."
    ],
    technologies: ["Power BI", "SQL", "Excel", "Python", "NumPy", "Seaborn"]
  }
];
