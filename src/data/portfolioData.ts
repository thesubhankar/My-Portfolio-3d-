export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  toolkit: string[];
  bullets: string[];
  links: {
    live?: string;
    code: string;
  };
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education' | 'certification';
  title: string;
  organization: string;
  subtitle?: string;
  period: string;
  bullets?: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: 'SUBHANKAR GIRI',
  firstName: 'Subhankar',
  role: 'DATA ANALYST & DATA SCIENTIST',
  location: 'Odisha, India',
  cityLine: 'Based in Odisha, India',
  email: 'thesubhankar.giri992@gmail.com',
  github: 'https://github.com/thesubhankar',
  linkedin: 'https://linkedin.com/in/subhankar-giri-2a4b0a295',
  website: 'https://thesubhankar.netlify.app',
  resumeUrl: '/resume.pdf',
  headshotUrl: '/headshot.png',
  bio: 'Computer Science undergraduate engineering end-to-end data pipelines, predictive models, and visual analytics dashboards. Transforming raw tabular data into automated decisions and verified insights.',
  heroStats: [
    { value: '5+', label: 'Deployed ML & Data Projects' },
    { value: '40+', label: 'GitHub Contributions' },
    { value: '4+', label: 'AI & Data Science Certifications' },
  ],
  workStats: [
    { value: '5+', label: 'Deployed Systems' },
    { value: '100%', label: 'Data Integrity Focused' },
    { value: '40+', label: 'Public Commits' },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'data-cleaning-studio',
    title: 'Automated Data Cleaning & Preprocessing Studio',
    category: 'Machine Learning & Preprocessing Pipeline',
    toolkit: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    bullets: [
      'Engineered an automated data audit and cleaning pipeline deployed as an interactive Streamlit web application.',
      'Implemented intelligent missing value imputation (median/mode), duplicate elimination, and robust IQR outlier detection.',
      'Built real-time before/after data validation analytics and dynamic CSV/Excel export functionality for processed tabular datasets.',
    ],
    links: {
      live: 'https://thesubhankar.netlify.app',
      code: 'https://github.com/thesubhankar',
    },
  },
  {
    id: 'eda-dashboard',
    title: 'Exploratory Data Analysis (EDA) & Analytics Dashboard',
    category: 'Visual Analytics & Business Intelligence',
    toolkit: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
    bullets: [
      'Developed an interactive visual analytics dashboard featuring dynamic demographic filters, KPI metrics, and cohort tracking.',
      'Created advanced statistical distributions using Plotly (KDE histograms, boxplots, OLS regression trendlines, and correlation matrices).',
      'Automated data storytelling to extract key performance drivers and enabled custom export of filtered datasets and summary reports.',
    ],
    links: {
      live: 'https://thesubhankar.netlify.app',
      code: 'https://github.com/thesubhankar',
    },
  },
  {
    id: 'student-management-system',
    title: 'Student Management System',
    category: 'Database Management & Desktop Application',
    toolkit: ['Python', 'SQLite3', 'Tkinter', 'PIL (Pillow)'],
    bullets: [
      'Developed a desktop database management application featuring multi-role authentication (Admin and Student portals) and interactive Tkinter GUI.',
      'Implemented robust CRUD operations, unique student ID validation, secure password authentication, and profile image storage using SQLite.',
      'Designed an automated digital student ID card generator displaying student metadata and dynamic profile picture rendering.',
    ],
    links: {
      code: 'https://github.com/thesubhankar',
    },
  },
];

export const STACK_TOOLS: string[] = [
  'Python',
  'SQL',
  'Pandas',
  'NumPy',
  'Scikit-learn',
  'TensorFlow',
  'Keras',
  'Matplotlib',
  'Seaborn',
  'Power BI',
  'MySQL',
  'PostgreSQL',
  'Streamlit',
  'Plotly',
  'SQLite3',
  'Microsoft Excel',
  'Jupyter Notebook',
  'Anaconda',
  'VS Code',
  'Git',
  'GitHub',
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'pythonsoft',
    type: 'experience',
    title: 'Full Stack Data Science Intern / Trainee',
    organization: 'PythonSoft LLP',
    subtitle: 'Python Data Ecosystem, Relational Databases (SQL), Advanced EDA & Supervised ML',
    period: '2026',
    bullets: [
      'Executed complete Data Science pipelines using Python, Pandas, and NumPy for automated data manipulation, feature extraction, and tabular cleaning.',
      'Authored complex SQL queries for relational data extraction, aggregation, and designed interactive business intelligence dashboards using Power BI.',
      'Trained, evaluated, and validated predictive Machine Learning models with Scikit-learn, adhering to version control and deployment standards on Git/GitHub.',
    ],
  },
  {
    id: 'incodevision',
    type: 'experience',
    title: 'Data Science Virtual Intern',
    organization: 'IncodeVision (Virtual)',
    subtitle: 'Automated Preprocessing Pipelines, Exploratory Data Analytics & Cloud Deployment',
    period: '2026',
    bullets: [
      'Developed and deployed production-grade automated data cleaning pipelines and audit tools on Streamlit Cloud for universal tabular dataset processing.',
      'Conducted in-depth Exploratory Data Analysis (EDA) on student performance data, uncovering statistical correlations, demographic trends, and predictive drivers.',
      'Created interactive visual analytical interfaces using Plotly, Matplotlib, and Seaborn to communicate actionable data-driven insights effectively.',
    ],
  },
  {
    id: 'btech',
    type: 'education',
    title: 'Bachelor of Technology (B.Tech) – Computer Science and Engineering',
    organization: 'KMBB College of Engineering & Technology, Khurda',
    subtitle: 'Biju Patnaik University of Technology (BPUT) | Odisha, India',
    period: '2023 – 2027',
    bullets: [
      'Core coursework: Data Structures, Algorithms, Database Management Systems, Object Oriented Programming, Mathematics for Data Science.',
    ],
  },
  {
    id: 'cert-pythonsoft',
    type: 'certification',
    title: 'Full Stack Data Science Certification',
    organization: 'PythonSoft LLP (pythonsoft.org)',
    period: '2026',
  },
  {
    id: 'cert-google-llm',
    type: 'certification',
    title: 'Introduction to Large Language Models',
    organization: 'Google Cloud (Simplilearn)',
    period: '2026',
  },
  {
    id: 'cert-google-encoder',
    type: 'certification',
    title: 'Encoder-Decoder Architecture',
    organization: 'Google Cloud (Simplilearn)',
    period: '2026',
  },
  {
    id: 'cert-google-genai',
    type: 'certification',
    title: 'Introduction to Generative AI',
    organization: 'Google Cloud (Coursera)',
    period: '2025',
  },
  {
    id: 'higher-secondary',
    type: 'education',
    title: 'Higher Secondary Education (+2)',
    organization: 'Dr. Harekrishna Mahatab Higher Secondary School, Kupari',
    subtitle: 'Council of Higher Secondary Education (CHSE), Odisha',
    period: '2021 – 2023',
  },
  {
    id: 'matriculation',
    type: 'education',
    title: 'Matriculation (10th)',
    organization: 'Sakuntala Nodal High School, Jirital',
    subtitle: 'Board of Secondary Education (BSE), Odisha',
    period: '2020 – 2021',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming & Databases',
    skills: ['Python', 'SQL', 'MySQL', 'PostgreSQL (Basics)', 'SQLite3'],
  },
  {
    title: 'Data Science & Modeling',
    skills: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Exploratory Data Analysis (EDA)',
      'Regression',
      'Classification',
      'Clustering',
    ],
  },
  {
    title: 'Deep Learning & Modern AI',
    skills: [
      'TensorFlow',
      'Keras',
      'Neural Networks',
      'CNN',
      'Large Language Models (LLMs)',
      'Encoder-Decoder Architecture',
      'Generative AI',
    ],
  },
  {
    title: 'Visual Analytics & Tools',
    skills: [
      'Power BI',
      'Plotly',
      'Matplotlib',
      'Seaborn',
      'Streamlit',
      'Microsoft Excel',
      'Jupyter Notebook',
      'Anaconda',
      'VS Code',
      'Git',
      'GitHub',
    ],
  },
];

export const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: 'Data Integrity First',
    description:
      'Clean inputs yield dependable predictions. Outlier mitigation (IQR), missing value imputation, and automated audit checks are non-negotiable prerequisites before training any model.',
  },
  {
    number: '02',
    title: 'Actionable Insights Over Vanity Metrics',
    description:
      'A model or dashboard is only valuable if it drives decision-making. I prioritize interpretable metrics, statistical significance, and tangible business impact over opaque complexity.',
  },
  {
    number: '03',
    title: 'Engineered For Reproducibility & Automation',
    description:
      'Repetitive data wrangling belongs in reusable code pipelines, not manual spreadsheets. I engineer reproducible Python workflows and interactive applications for friction-free data operations.',
  },
  {
    number: '04',
    title: 'Continuous Mastery & Applied AI',
    description:
      'Committed to disciplined version control, open-source best practices, and actively bridging classical statistical models with modern transformer and neural architectures.',
  },
];
