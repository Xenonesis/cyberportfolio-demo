// Content constants and data for the cybersecurity portfolio

import type {
  NavigationItem,
  SocialLink,
  Experience,
  Education,
  Skill,
  Service,
  Project,
  Testimonial,
  BlogPost,
  SiteConfig,
  DetailedSkill,
  SkillCategory,
  SkillsMatrixConfig,
  ProficiencyLevel,
  TimelineEvent,
  ResumeSummary,
  CareerTimelineConfig,
} from '@/types';

// Navigation configuration
export const NAVIGATION: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    href: '/',
  },
  {
    id: 'about',
    title: 'About',
    href: '/about',
  },
  {
    id: 'career-timeline',
    title: 'Career Timeline',
    href: '/career-timeline',
  },
  {
    id: 'skills',
    title: 'Skills',
    href: '/skills',
  },
  {
    id: 'services',
    title: 'Services',
    href: '/services',
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    href: '/case-studies',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    href: '/portfolio',
  },
  {
    id: 'blog',
    title: 'Blog',
    href: '/blog',
  },
  {
    id: 'certifications',
    title: 'Certifications',
    href: '/certifications',
  },
  {
    id: 'contact',
    title: 'Contact',
    href: '/contact',
  },
];

export const FOOTER_NAVIGATION: NavigationItem[] = [
  {
    id: 'company',
    title: 'Company',
    href: '#',
    children: [
      { id: 'about', title: 'About', href: '/about' },
      { id: 'career-timeline', title: 'Career Timeline', href: '/career-timeline' },
      { id: 'skills', title: 'Skills', href: '/skills' },
      { id: 'services', title: 'Services', href: '/services' },
      { id: 'case-studies', title: 'Case Studies', href: '/case-studies' },
      { id: 'portfolio', title: 'Portfolio', href: '/portfolio' },
      { id: 'blog', title: 'Blog', href: '/blog' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    href: '#',
    children: [
      { id: 'contact', title: 'Contact', href: '/contact' },
      { id: 'certifications', title: 'Certifications', href: '/certifications' },
      { id: 'privacy', title: 'Privacy Policy', href: '/privacy' },
      { id: 'terms', title: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    id: 'social',
    title: 'Social',
    href: '#',
    children: [
      { id: 'linkedin', title: 'LinkedIn', href: 'https://linkedin.com/in/aditya-cybersecurity' },
      { id: 'twitter', title: 'Twitter', href: 'https://twitter.com/aditya_cyber' },
      { id: 'github', title: 'GitHub', href: 'https://github.com/aditya-cybersecurity' },
      { id: 'medium', title: 'Medium', href: 'https://medium.com/@aditya-cybersecurity' },
    ],
  },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    title: 'LinkedIn',
    url: 'https://linkedin.com/in/aditya-cybersecurity',
    icon: 'linkedin',
    username: '@aditya-cybersecurity',
  },
  {
    id: 'twitter',
    title: 'Twitter',
    url: 'https://twitter.com/aditya_cyber',
    icon: 'twitter',
    username: '@aditya_cyber',
  },
  {
    id: 'github',
    title: 'GitHub',
    url: 'https://github.com/aditya-cybersecurity',
    icon: 'github',
    username: 'aditya-cybersecurity',
  },
  {
    id: 'medium',
    title: 'Medium',
    url: 'https://medium.com/@aditya-cybersecurity',
    icon: 'medium',
    username: '@aditya-cybersecurity',
  },
  {
    id: 'email',
    title: 'Email',
    url: 'mailto:aditya@cybersecurity.com',
    icon: 'email',
    username: 'aditya@cybersecurity.com',
  },
];

// Professional experience
export const EXPERIENCE: Experience[] = [
  {
    id: 'cybersecurity-developer-specialist',
    title: 'Cybersecurity Specialist & Full-Stack Developer',
    company: 'Freelance/Consulting',
    period: '2023 - Present',
    description:
      'Combining cybersecurity expertise with full-stack development to create secure, innovative solutions for startups and SMBs. Specialize in security-first development methodology and proactive threat mitigation.',
    technologies: [
      'Laravel/PHP',
      'Vulnerability Assessment',
      'Penetration Testing',
      'Cloud Security',
      'AI/ML Security',
      'Prompt Engineering',
    ],
    achievements: [
      'Developed secure web applications with zero critical vulnerabilities',
      'Implemented security-first development practices for 15+ clients',
      'Reduced security incidents by 80% through proactive measures',
      'Created custom security tools using AI/ML technologies',
    ],
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    company: 'Digital Defense Corp',
    period: '2022 - 2023',
    description:
      'Conducted comprehensive vulnerability assessments and penetration testing while integrating security into development workflows. Bridged gap between security and development teams.',
    technologies: [
      'Vulnerability Scanning',
      'Penetration Testing',
      'Risk Assessment',
      'Secure Development',
      'Incident Response',
      'Compliance',
    ],
    achievements: [
      'Discovered and remediated 50+ critical vulnerabilities',
      'Implemented secure code review processes',
      'Achieved 100% client satisfaction in security assessments',
    ],
  },
  {
    id: 'security-developer',
    title: 'Security-Focused Developer',
    company: 'TechInnovate Solutions',
    period: '2021 - 2022',
    description:
      'Developed web applications with integrated security measures. Focused on secure coding practices and threat modeling during development lifecycle.',
    technologies: [
      'Laravel/PHP',
      'JavaScript/TypeScript',
      'API Security',
      'Authentication Systems',
      'Database Security',
      'Security Testing',
    ],
    achievements: [
      'Built 20+ secure web applications with zero security breaches',
      'Implemented OAuth2 and JWT authentication systems',
      'Conducted security code reviews for development team',
    ],
  },
];

// Education
export const EDUCATION: Education[] = [
  {
    id: 'ms-cybersecurity',
    degree: 'M.S. in Cybersecurity',
    institution: 'National Institute of Technology',
    year: '2017',
    description:
      'Specialized in advanced cybersecurity concepts, cryptography, and network security. Thesis on "Advanced Threat Detection using Machine Learning".',
    honors: ['Dean\'s List', 'Cybersecurity Research Award'],
  },
  {
    id: 'bs-computer-science',
    degree: 'B.S. in Computer Science',
    institution: 'University of Technology',
    year: '2015',
    description:
      'Foundational studies in computer science with focus on networking and security. Graduated with honors.',
    honors: ['Summa Cum Laude', 'Best Student Award'],
  },
];

// Skills and expertise
export const SKILLS: Skill[] = [
  // Cybersecurity Specializations
  {
    id: 'vulnerability-assessment',
    name: 'Vulnerability Assessments & Penetration Testing',
    category: 'cybersecurity',
    level: 9,
    description:
      'Expert in identifying, analyzing, and exploiting security vulnerabilities to strengthen organizational defenses.',
  },
  {
    id: 'network-security',
    name: 'Network Security & Threat Analysis',
    category: 'cybersecurity',
    level: 9,
    description:
      'Designing and implementing secure network architectures with advanced threat detection capabilities.',
  },
  {
    id: 'cloud-security',
    name: 'Cloud Security Implementation',
    category: 'cybersecurity',
    level: 8,
    description:
      'Securing cloud environments (AWS, Azure, GCP) with Zero Trust principles and compliance frameworks.',
  },
  {
    id: 'incident-response',
    name: 'Incident Response & Risk Assessment',
    category: 'cybersecurity',
    level: 9,
    description:
      'Rapid response to security incidents with forensic analysis, containment, and comprehensive risk assessment.',
  },
  {
    id: 'ai-security',
    name: 'AI/ML Security & Prompt Engineering',
    category: 'cybersecurity',
    level: 8,
    description:
      'Specializing in AI security, prompt engineering, and protecting machine learning systems from adversarial attacks.',
  },

  // Development Expertise
  {
    id: 'secure-development',
    name: 'Secure Web Application Development',
    category: 'development',
    level: 8,
    description:
      'Full-stack development with Laravel/PHP, focusing on security-first principles and secure coding practices.',
  },
  {
    id: 'code-security',
    name: 'Code Security Review & Hardening',
    category: 'development',
    level: 9,
    description:
      'Comprehensive code review and security hardening to eliminate vulnerabilities in web applications.',
  },
  {
    id: 'security-integration',
    name: 'Security Integration in Development',
    category: 'development',
    level: 8,
    description:
      'Integrating security measures throughout the development lifecycle using DevSecOps principles.',
  },
  {
    id: 'api-security',
    name: 'API Security & Authentication',
    category: 'development',
    level: 8,
    description:
      'Designing and implementing secure API architectures with robust authentication and authorization.',
  },

  // Security Management
  {
    id: 'security-architecture',
    name: 'Security Architecture & Strategy',
    category: 'management',
    level: 9,
    description:
      'Designing comprehensive security architectures and strategic security roadmaps for organizations.',
  },
  {
    id: 'risk-management',
    name: 'Risk Management & Compliance',
    category: 'management',
    level: 8,
    description:
      'Assessing cybersecurity risks with business impact analysis and ensuring regulatory compliance.',
  },

  // Soft Skills
  {
    id: 'communication',
    name: 'Technical Communication',
    category: 'soft',
    level: 9,
    description:
      'Bridging the gap between technical security concepts and business stakeholders with clear communication.',
  },
  {
    id: 'problem-solving',
    name: 'Innovative Problem Solving',
    category: 'soft',
    level: 9,
    description:
      'Creative approach to solving complex security challenges and developing innovative protective solutions.',
  },
];

// Detailed skills matrix data with comprehensive cybersecurity and development tools
export const DETAILED_SKILLS: DetailedSkill[] = [
  // Cybersecurity Tools & Technologies - Vulnerability Assessment
  {
    id: 'nmap',
    name: 'Nmap',
    category: 'vulnerability-assessment',
    level: 9,
    proficiency: 95,
    yearsOfExperience: 8,
    icon: 'nmap',
    description: 'Network discovery and security auditing tool for comprehensive vulnerability assessment.',
    certificationLinks: ['https://nmap.org/book/man.html'],
    projectExamples: ['/content/projects/enterprise-security-overhaul.md'],
    isExpert: true,
  },
  {
    id: 'nessus',
    name: 'Nessus',
    category: 'vulnerability-assessment',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 6,
    icon: 'nessus',
    description: 'Professional vulnerability scanner for identifying security issues across networks.',
    certificationLinks: ['https://www.tenable.com/certifications/nessus-professional'],
    isAdvanced: true,
  },
  {
    id: 'openvas',
    name: 'OpenVAS',
    category: 'vulnerability-assessment',
    level: 7,
    proficiency: 75,
    yearsOfExperience: 5,
    icon: 'openvas',
    description: 'Open-source vulnerability scanner and manager for comprehensive security assessments.',
    isAdvanced: true,
  },
  {
    id: 'qualys',
    name: 'Qualys',
    category: 'vulnerability-assessment',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'qualys',
    description: 'Cloud-based security and compliance solutions for enterprise vulnerability management.',
    isIntermediate: true,
  },

  // Cybersecurity Tools & Technologies - Penetration Testing
  {
    id: 'metasploit',
    name: 'Metasploit',
    category: 'penetration-testing',
    level: 9,
    proficiency: 90,
    yearsOfExperience: 7,
    icon: 'metasploit',
    description: 'Penetration testing framework for developing, testing, and executing exploit code.',
    certificationLinks: ['https://www.rapid7.com/products/metasploit/metasploit-certified-specialist/'],
    isExpert: true,
  },
  {
    id: 'burp-suite',
    name: 'Burp Suite',
    category: 'penetration-testing',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 6,
    icon: 'burp-suite',
    description: 'Web security testing platform for identifying vulnerabilities in web applications.',
    isAdvanced: true,
  },
  {
    id: 'owasp-zap',
    name: 'OWASP ZAP',
    category: 'penetration-testing',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 5,
    icon: 'owasp-zap',
    description: 'Open-source web application security scanner for finding security vulnerabilities.',
    isAdvanced: true,
  },
  {
    id: 'kali-linux',
    name: 'Kali Linux',
    category: 'penetration-testing',
    level: 9,
    proficiency: 95,
    yearsOfExperience: 8,
    icon: 'kali-linux',
    description: 'Debian-based Linux distribution for penetration testing and digital forensics.',
    isExpert: true,
  },

  // Cybersecurity Tools & Technologies - Network Security
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'network-security',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 7,
    icon: 'wireshark',
    description: 'Network protocol analyzer for capturing and analyzing network traffic.',
    isAdvanced: true,
  },
  {
    id: 'snort',
    name: 'Snort',
    category: 'network-security',
    level: 7,
    proficiency: 75,
    yearsOfExperience: 5,
    icon: 'snort',
    description: 'Open-source network intrusion detection system for real-time traffic analysis.',
    isAdvanced: true,
  },
  {
    id: 'suricata',
    name: 'Suricata',
    category: 'network-security',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'suricata',
    description: 'High-performance network IDS, IPS, and network security monitoring engine.',
    isIntermediate: true,
  },
  {
    id: 'pfsense',
    name: 'pfSense',
    category: 'network-security',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'pfsense',
    description: 'Open-source firewall and router platform for network security and traffic management.',
    isIntermediate: true,
  },

  // Cybersecurity Tools & Technologies - Forensics
  {
    id: 'autopsy',
    name: 'Autopsy',
    category: 'forensics',
    level: 7,
    proficiency: 75,
    yearsOfExperience: 5,
    icon: 'autopsy',
    description: 'Digital forensics platform for analyzing hard drives and smart devices.',
    isAdvanced: true,
  },
  {
    id: 'ftk',
    name: 'FTK (Forensic Toolkit)',
    category: 'forensics',
    level: 6,
    proficiency: 65,
    yearsOfExperience: 3,
    icon: 'ftk',
    description: 'Comprehensive digital forensics solution for evidence analysis and investigation.',
    isIntermediate: true,
  },
  {
    id: 'volatility',
    name: 'Volatility',
    category: 'forensics',
    level: 6,
    proficiency: 60,
    yearsOfExperience: 3,
    icon: 'volatility',
    description: 'Memory forensics framework for analyzing volatile memory from computer systems.',
    isBeginner: true,
  },
  {
    id: 'osforensics',
    name: 'OSForensics',
    category: 'forensics',
    level: 6,
    proficiency: 60,
    yearsOfExperience: 3,
    icon: 'osforensics',
    description: 'Digital forensics tool for recovering data and analyzing computer evidence.',
    isBeginner: true,
  },

  // Cybersecurity Tools & Technologies - Cloud Security
  {
    id: 'aws-security-hub',
    name: 'AWS Security Hub',
    category: 'cloud-security',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 5,
    icon: 'aws',
    description: 'Comprehensive view of security state across AWS accounts and compliance status.',
    isAdvanced: true,
  },
  {
    id: 'azure-security-center',
    name: 'Azure Security Center',
    category: 'cloud-security',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 5,
    icon: 'azure',
    description: 'Unified security management and advanced threat protection for Azure resources.',
    isAdvanced: true,
  },
  {
    id: 'gcp-security',
    name: 'GCP Security Command Center',
    category: 'cloud-security',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'gcp',
    description: 'Cloud security posture management and data protection for Google Cloud Platform.',
    isIntermediate: true,
  },

  // Cybersecurity Tools & Technologies - SIEM
  {
    id: 'splunk',
    name: 'Splunk',
    category: 'siem',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 6,
    icon: 'splunk',
    description: 'Platform for searching, monitoring, and analyzing machine-generated data.',
    isAdvanced: true,
  },
  {
    id: 'elk-stack',
    name: 'ELK Stack (Elasticsearch, Logstash, Kibana)',
    category: 'siem',
    level: 7,
    proficiency: 75,
    yearsOfExperience: 5,
    icon: 'elk',
    description: 'Open-source log analysis platform for real-time data visualization and monitoring.',
    isAdvanced: true,
  },
  {
    id: 'graylog',
    name: 'Graylog',
    category: 'siem',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'graylog',
    description: 'Open-source log management platform for centralized logging and analysis.',
    isIntermediate: true,
  },
  {
    id: 'qradar',
    name: 'QRadar',
    category: 'siem',
    level: 6,
    proficiency: 65,
    yearsOfExperience: 3,
    icon: 'qradar',
    description: 'Enterprise security information and event management platform.',
    isIntermediate: true,
  },

  // Development & Programming - Languages
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    level: 9,
    proficiency: 95,
    yearsOfExperience: 10,
    icon: 'javascript',
    description: 'Versatile programming language for web development and application building.',
    isExpert: true,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 6,
    icon: 'typescript',
    description: 'Type-safe superset of JavaScript for building large-scale web applications.',
    isAdvanced: true,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 7,
    icon: 'python',
    description: 'High-level programming language for automation, data analysis, and security tools.',
    isAdvanced: true,
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'languages',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 8,
    icon: 'php',
    description: 'Server-side scripting language for web development and secure applications.',
    isAdvanced: true,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'languages',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 7,
    icon: 'sql',
    description: 'Structured Query Language for database management and security auditing.',
    isAdvanced: true,
  },

  // Development & Programming - Frameworks
  {
    id: 'react',
    name: 'React',
    category: 'frameworks',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 6,
    icon: 'react',
    description: 'JavaScript library for building user interfaces with component-based architecture.',
    isAdvanced: true,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frameworks',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 5,
    icon: 'nextjs',
    description: 'React framework for server-side rendering and static site generation.',
    isAdvanced: true,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'frameworks',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 7,
    icon: 'nodejs',
    description: 'JavaScript runtime for building scalable network applications and APIs.',
    isAdvanced: true,
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'frameworks',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 8,
    icon: 'laravel',
    description: 'PHP framework for web artisans with elegant syntax and security features.',
    isAdvanced: true,
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'frameworks',
    level: 7,
    proficiency: 75,
    yearsOfExperience: 6,
    icon: 'express',
    description: 'Minimalist web framework for Node.js with security middleware support.',
    isAdvanced: true,
  },

  // Development & Programming - Security Tools
  {
    id: 'snyk',
    name: 'Snyk',
    category: 'security-tools',
    level: 7,
    proficiency: 75,
    yearsOfExperience: 4,
    icon: 'snyk',
    description: 'Developer-first security platform for finding and fixing vulnerabilities.',
    isAdvanced: true,
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    category: 'security-tools',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'sonarqube',
    description: 'Platform for continuous inspection of code quality and security vulnerabilities.',
    isIntermediate: true,
  },
  {
    id: 'owasp-dependency-check',
    name: 'OWASP Dependency Check',
    category: 'security-tools',
    level: 6,
    proficiency: 65,
    yearsOfExperience: 3,
    icon: 'owasp',
    description: 'Tool for detecting publicly disclosed vulnerabilities in application dependencies.',
    isIntermediate: true,
  },

  // Development & Programming - DevOps
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 6,
    icon: 'docker',
    description: 'Platform for developing, shipping, and running applications in containers.',
    isAdvanced: true,
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'devops',
    level: 7,
    proficiency: 75,
    yearsOfExperience: 4,
    icon: 'kubernetes',
    description: 'Container orchestration platform for automating deployment and management.',
    isAdvanced: true,
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'devops',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 5,
    icon: 'jenkins',
    description: 'Open-source automation server for continuous integration and delivery.',
    isIntermediate: true,
  },
  {
    id: 'gitlab-ci',
    name: 'GitLab CI/CD',
    category: 'devops',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'gitlab',
    description: 'Integrated CI/CD platform for automated testing and deployment.',
    isIntermediate: true,
  },

  // Development & Programming - Cloud Platforms
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'cloud-platforms',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 6,
    icon: 'aws',
    description: 'Comprehensive cloud platform with extensive security services and compliance.',
    isAdvanced: true,
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'cloud-platforms',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 6,
    icon: 'azure',
    description: 'Cloud computing platform with integrated security and compliance features.',
    isAdvanced: true,
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud Platform',
    category: 'cloud-platforms',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'gcp',
    description: 'Cloud platform with advanced security analytics and machine learning services.',
    isIntermediate: true,
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    category: 'cloud-platforms',
    level: 6,
    proficiency: 65,
    yearsOfExperience: 3,
    icon: 'digitalocean',
    description: 'Cloud infrastructure provider with simple and scalable solutions.',
    isIntermediate: true,
  },

  // Development & Programming - Databases
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    level: 8,
    proficiency: 85,
    yearsOfExperience: 8,
    icon: 'mysql',
    description: 'Relational database management system with robust security features.',
    isAdvanced: true,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'databases',
    level: 8,
    proficiency: 80,
    yearsOfExperience: 7,
    icon: 'postgresql',
    description: 'Advanced open-source relational database with strong security controls.',
    isAdvanced: true,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    level: 7,
    proficiency: 75,
    yearsOfExperience: 5,
    icon: 'mongodb',
    description: 'NoSQL database with flexible schema and security features for modern applications.',
    isAdvanced: true,
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'databases',
    level: 7,
    proficiency: 70,
    yearsOfExperience: 4,
    icon: 'redis',
    description: 'In-memory data structure store with security considerations for caching.',
    isIntermediate: true,
  },
];

// Utility function to calculate category statistics
const calculateCategoryStats = (skills: DetailedSkill[]) => {
  const skillCount = skills.length;
  const averageProficiency = skillCount > 0
    ? Math.round(skills.reduce((sum, skill) => sum + skill.proficiency, 0) / skillCount)
    : 0;
  return { skillCount, averageProficiency };
};

// Skill categories for the matrix
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Tools & Technologies',
    description: 'Comprehensive security tools and technologies for threat detection and response',
    icon: 'shield',
    color: 'neon-green',
    skills: DETAILED_SKILLS.filter(skill =>
      ['vulnerability-assessment', 'penetration-testing', 'network-security', 'forensics', 'cloud-security', 'siem'].includes(skill.category)
    ),
    ...calculateCategoryStats(DETAILED_SKILLS.filter(skill =>
      ['vulnerability-assessment', 'penetration-testing', 'network-security', 'forensics', 'cloud-security', 'siem'].includes(skill.category)
    )),
  },
  {
    id: 'development',
    title: 'Development & Programming',
    description: 'Programming languages, frameworks, and development tools with security focus',
    icon: 'code',
    color: 'electric-cyan',
    skills: DETAILED_SKILLS.filter(skill =>
      ['languages', 'frameworks', 'security-tools', 'devops', 'cloud-platforms', 'databases'].includes(skill.category)
    ),
    ...calculateCategoryStats(DETAILED_SKILLS.filter(skill =>
      ['languages', 'frameworks', 'security-tools', 'devops', 'cloud-platforms', 'databases'].includes(skill.category)
    )),
  },
];

// Skills matrix configuration
export const SKILLS_MATRIX_CONFIG: SkillsMatrixConfig = {
  title: 'Cybersecurity & Development Skills Matrix',
  description: 'Comprehensive display of technical expertise across security and development domains',
  categories: SKILL_CATEGORIES,
  showProficiencyLevels: true,
  showYearsOfExperience: true,
  showCertifications: true,
  enableFiltering: true,
  enableSearch: true,
  animationSpeed: 0.6,
  responsiveBreakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
  },
};

// Proficiency level definitions
export const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  {
    level: 'expert',
    minPercentage: 90,
    maxPercentage: 100,
    color: 'neon-green',
    description: 'Mastery level with extensive experience and expertise',
    icon: 'star',
  },
  {
    level: 'advanced',
    minPercentage: 70,
    maxPercentage: 89,
    color: 'electric-cyan',
    description: 'Strong proficiency with regular usage and deep understanding',
    icon: 'rocket',
  },
  {
    level: 'intermediate',
    minPercentage: 50,
    maxPercentage: 69,
    color: 'light-gray',
    description: 'Solid understanding with practical experience and application',
    icon: 'gear',
  },
  {
    level: 'beginner',
    minPercentage: 30,
    maxPercentage: 49,
    color: 'security-gray',
    description: 'Basic knowledge with some project experience and learning',
    icon: 'book',
  },
  {
    level: 'familiar',
    minPercentage: 10,
    maxPercentage: 29,
    color: 'deep-navy',
    description: 'Awareness and theoretical understanding of the technology',
    icon: 'eye',
  },
];

// Certifications
export const CERTIFICATIONS = [
  {
    id: 'google-cybersecurity',
    title: 'Google Foundations of Cybersecurity',
    issuer: 'Google',
    date: '2023',
    status: 'completed',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/certificate/XXXXX',
    description: 'Foundational cybersecurity concepts and practices from Google.',
  },
  {
    id: 'cisco-threat-management',
    title: 'Cisco Cyber Threat Management',
    issuer: 'Cisco',
    date: '2024',
    status: 'in-progress',
    verificationUrl: '#',
    description: 'Advanced threat detection and response methodologies.',
  },
  {
    id: 'osforensics-triage',
    title: 'OSForensics Triage Certification',
    issuer: 'OSForensics',
    date: '2024',
    status: 'in-progress',
    verificationUrl: '#',
    description: 'Digital forensics and incident response techniques.',
  },
  {
    id: 'iso-27001',
    title: 'ISO 27001 Information Security Management',
    issuer: 'ISO',
    date: '2023',
    status: 'completed',
    verificationUrl: '#',
    description: 'International standard for information security management systems.',
  },
  {
    id: 'cisco-ethical-hacker',
    title: 'Cisco Ethical Hacker',
    issuer: 'Cisco',
    date: '2023',
    status: 'completed',
    verificationUrl: '#',
    description: 'Ethical hacking and penetration testing certification.',
  },
  {
    id: 'linkedin-prompt-engineering',
    title: 'LinkedIn Prompt Engineering for Generative AI',
    issuer: 'LinkedIn Learning',
    date: '2024',
    status: 'completed',
    verificationUrl: '#',
    description: 'Advanced prompt engineering techniques for AI security applications.',
  },
];

// Experience metrics and achievements
export const EXPERIENCE_METRICS = [
  {
    id: 'security-assessments',
    label: 'Security Assessments',
    value: '100+',
    description: 'Comprehensive security evaluations completed',
    icon: 'shield-check',
  },
  {
    id: 'clients-served',
    label: 'Clients Served',
    value: '50+',
    description: 'Startups and SMBs protected',
    icon: 'users',
  },
  {
    id: 'security-projects',
    label: 'Security Projects',
    value: '75+',
    description: 'End-to-end security implementations',
    icon: 'code',
  },
  {
    id: 'threat-prevented',
    label: 'Threats Prevented',
    value: '99.9%',
    description: 'Success rate in threat mitigation',
    icon: 'alert-circle',
  },
];

// Services offered
export const SERVICES: Service[] = [
  {
    id: 'security-assessment',
    title: 'Security Assessment',
    description:
      'Comprehensive evaluation of your organization\'s security posture including vulnerability scanning, penetration testing, and risk assessment.',
    icon: 'shield-check',
    features: [
      'External and internal vulnerability assessment',
      'Web application security testing',
      'Network security evaluation',
      'Social engineering assessment',
      'Detailed findings report with remediation guidance',
    ],
    duration: '2-4 weeks',
    price: 'Starting at $5,000',
  },
  {
    id: 'incident-response',
    title: 'Incident Response',
    description:
      'Rapid response to security incidents with forensic analysis, containment, and recovery planning.',
    icon: 'alert-circle',
    features: [
      '24/7 incident response hotline',
      'Digital forensics and evidence collection',
      'Threat containment and eradication',
      'Business continuity planning',
      'Post-incident review and improvement',
    ],
    duration: 'Immediate response',
    price: 'Custom pricing',
  },
  {
    id: 'security-consulting',
    title: 'Security Consulting',
    description:
      'Strategic security guidance including policy development, architecture design, and compliance planning.',
    icon: 'settings',
    features: [
      'Security strategy and roadmap development',
      'Policy and procedure creation',
      'Security architecture design',
      'Compliance assessment and planning',
      'Staff training and awareness programs',
    ],
    duration: '3-6 months',
    price: 'Starting at $10,000',
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    description:
      'Secure your cloud infrastructure with Zero Trust principles, proper configuration, and continuous monitoring.',
    icon: 'cloud',
    features: [
      'Cloud security assessment and hardening',
      'Zero Trust architecture implementation',
      'Identity and access management',
      'Data protection and encryption',
      'Continuous monitoring and alerting',
    ],
    duration: '4-8 weeks',
    price: 'Starting at $8,000',
  },
  {
    id: 'compliance',
    title: 'Compliance Services',
    description:
      'Achieve and maintain regulatory compliance with expert guidance and documentation support.',
    icon: 'file-text',
    features: [
      'Compliance gap analysis',
      'Policy and procedure development',
      'Audit preparation and support',
      'Employee training and awareness',
      'Continuous compliance monitoring',
    ],
    duration: '6-12 weeks',
    price: 'Starting at $7,500',
  },
  {
    id: 'security-training',
    title: 'Security Training',
    description:
      'Customized security awareness training for employees and specialized training for security teams.',
    icon: 'users',
    features: [
      'Security awareness training',
      'Phishing simulation campaigns',
      'Technical security training',
      'Incident response training',
      'Custom training materials',
    ],
    duration: 'Ongoing',
    price: 'Starting at $2,500/month',
  },
];

// Portfolio projects
export const PROJECTS: Project[] = [
  {
    id: 'enterprise-security-overhaul',
    title: 'Enterprise Security Overhaul',
    subtitle: 'Complete security transformation for Fortune 500 company',
    description:
      'Led a comprehensive security transformation for a Fortune 500 manufacturing company, implementing Zero Trust architecture and reducing security incidents by 75%.',
    image: '/images/projects/enterprise-security.jpg',
    technologies: [
      'Zero Trust Architecture',
      'SIEM',
      'Endpoint Detection',
      'Network Segmentation',
      'Identity Management',
    ],
    category: ['enterprise', 'zero-trust', 'incident-response'],
    liveUrl: 'https://case-study-enterprise-security.com',
    caseStudy: '/content/projects/enterprise-security-overhaul.md',
    challenges: [
      'Legacy systems with outdated security controls',
      'Lack of centralized security monitoring',
      'Insufficient employee security awareness',
      'Compliance requirements across multiple jurisdictions',
    ],
    solutions: [
      'Implemented Zero Trust network architecture',
      'Deployed enterprise SIEM solution',
      'Conducted comprehensive security awareness training',
      'Established centralized incident response team',
    ],
    results: [
      '75% reduction in security incidents',
      '50% improvement in threat detection time',
      'Achieved SOC 2 Type II compliance',
      'Saved $2M annually in potential breach costs',
    ],
  },
  {
    id: 'cloud-migration-security',
    title: 'Cloud Migration Security',
    subtitle: 'Secure cloud migration for healthcare provider',
    description:
      'Designed and implemented security controls for a healthcare provider migrating to AWS, ensuring HIPAA compliance and patient data protection.',
    image: '/images/projects/cloud-migration.jpg',
    technologies: [
      'AWS Security',
      'HIPAA Compliance',
      'Data Encryption',
      'Identity and Access Management',
      'Cloud Monitoring',
    ],
    category: ['cloud', 'healthcare', 'compliance'],
    caseStudy: '/content/projects/cloud-migration-security.md',
    challenges: [
      'HIPAA compliance requirements',
      'Patient data sensitivity',
      'Legacy on-premise applications',
      'Limited cloud security expertise',
    ],
    solutions: [
      'Implemented AWS security best practices',
      'Designed HIPAA-compliant data encryption',
      'Created secure identity federation',
      'Established continuous compliance monitoring',
    ],
    results: [
      'Achieved HIPAA compliance certification',
      'Zero data breaches during migration',
      '30% reduction in IT security costs',
      'Improved disaster recovery capabilities',
    ],
  },
  {
    id: 'financial-institution-penetration-test',
    title: 'Financial Institution Penetration Test',
    subtitle: 'Comprehensive security assessment for bank',
    description:
      'Conducted extensive penetration testing for a regional bank, identifying critical vulnerabilities and providing actionable remediation guidance.',
    image: '/images/projects/bank-security.jpg',
    technologies: [
      'Penetration Testing',
      'Vulnerability Assessment',
      'Social Engineering',
      'Web Application Security',
      'Network Security',
    ],
    category: ['financial', 'penetration-testing', 'vulnerability-assessment'],
    caseStudy: '/content/projects/financial-institution-penetration-test.md',
    challenges: [
      'Highly regulated environment',
      'Complex legacy systems',
      'Customer data protection requirements',
      'Need for minimal business disruption',
    ],
    solutions: [
      'Non-intrusive testing methodology',
      'Detailed vulnerability classification',
      'Prioritized remediation roadmap',
      'Executive-level reporting',
    ],
    results: [
      'Identified 15 critical vulnerabilities',
      'Provided 90-day remediation plan',
      'Improved security team capabilities',
      'Enhanced board-level security awareness',
    ],
  },
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ceo-manufacturing',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechManufacture Inc.',
    image: '/images/testimonials/sarah-johnson.jpg',
    content:
      'Aditya transformed our security posture completely. His expertise in Zero Trust architecture and incident response saved our company from potential catastrophic breaches. The 75% reduction in security incidents speaks volumes about his capabilities.',
    rating: 5,
  },
  {
    id: 'cto-healthcare',
    name: 'Dr. Michael Chen',
    role: 'CTO',
    company: 'HealthCare Plus',
    image: '/images/testimonials/michael-chen.jpg',
    content:
      'Working with Aditya on our cloud migration was exceptional. His deep understanding of HIPAA compliance and AWS security ensured our patient data remained protected throughout the transition. His strategic approach and attention to detail are unmatched.',
    rating: 5,
  },
  {
    id: 'security-director',
    name: 'Lisa Rodriguez',
    role: 'Security Director',
    company: 'Global Bank Corp.',
    image: '/images/testimonials/lisa-rodriguez.jpg',
    content:
      'Aditya\'s penetration testing revealed critical vulnerabilities we never knew existed. His comprehensive report and remediation guidance have significantly strengthened our security program. His professionalism and expertise are top-notch.',
    rating: 5,
  },
];

// Site configuration
export const SITE_CONFIG: SiteConfig = {
  name: 'Aditya Kumar Tiwari - Cybersecurity Expert',
  title: 'Cybersecurity Portfolio - Aditya Kumar Tiwari',
  description:
    'Expert cybersecurity consultant specializing in enterprise security, incident response, and cloud security solutions. Protecting organizations from evolving cyber threats.',
  url: 'https://aditya-cybersecurity.com',
  email: 'aditya@cybersecurity.com',
  phone: '+1 (555) 123-4567',
  address: 'New York, NY, USA',
  socials: SOCIAL_LINKS,
  navigation: NAVIGATION,
  footerNavigation: FOOTER_NAVIGATION,
};

// SEO configuration
export const SEO_CONFIG = {
  title: 'Aditya Kumar Tiwari - Cybersecurity Expert & Full-Stack Developer',
  description:
    'Bridging Security and Innovation. Cybersecurity Specialist & Full-Stack Developer combining security expertise with cutting-edge development to create innovative, secure solutions for modern businesses.',
  keywords: [
    'cybersecurity',
    'security consultant',
    'full-stack developer',
    'vulnerability assessment',
    'penetration testing',
    'network security',
    'cloud security',
    'incident response',
    'AI security',
    'prompt engineering',
    'secure development',
    'Laravel developer',
    'code security',
    'API security',
    'threat analysis',
    'risk assessment',
    'cybersecurity specialist',
    'security expert',
    'ethical hacker',
    'security architecture',
  ],
  image: '/images/og-image.jpg',
  url: 'https://aditya-cybersecurity.com',
};

// Career timeline events
export const CAREER_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'ms-cybersecurity-expected-2025',
    title: 'M.S. in Cybersecurity',
    subtitle: 'Advanced Threat Detection & Machine Learning',
    category: 'education',
    status: 'in-progress',
    startDate: '2023',
    current: true,
    description: 'Pursuing advanced studies in cybersecurity with focus on threat detection using machine learning algorithms. Researching advanced persistent threats and AI-powered security solutions.',
    achievements: [
      'Thesis on "Advanced Threat Detection using Machine Learning"',
      'Research published in cybersecurity journal',
      'Dean\'s List recognition',
      'Cybersecurity Research Award recipient'
    ],
    technologies: ['Machine Learning', 'Threat Intelligence', 'AI Security', 'Network Security'],
    icon: 'graduation-cap',
    color: 'neon-green',
    priority: 1
  },
  {
    id: 'bs-computer-science-2023',
    title: 'B.S. in Computer Science',
    subtitle: 'Foundations in Computing & Security',
    category: 'education',
    status: 'completed',
    startDate: '2019',
    endDate: '2023',
    description: 'Foundational studies in computer science with emphasis on networking and security principles. Graduated with honors and established strong technical foundation.',
    achievements: [
      'Summa Cum Laude graduation',
      'Best Student Award in Computer Science',
      'Completed security-focused capstone project',
      'Published research on network security'
    ],
    technologies: ['Programming', 'Networking', 'Database Systems', 'Security Fundamentals'],
    icon: 'graduation-cap',
    color: 'electric-cyan',
    priority: 2
  },
  {
    id: 'cybersecurity-specialist-developer-2023-present',
    title: 'Cybersecurity Specialist & Full-Stack Developer',
    subtitle: 'Freelance/Consulting',
    category: 'experience',
    status: 'in-progress',
    startDate: '2023',
    current: true,
    description: 'Combining cybersecurity expertise with full-stack development to create secure, innovative solutions for startups and SMBs. Specialize in security-first development methodology and proactive threat mitigation.',
    achievements: [
      'Developed secure web applications with zero critical vulnerabilities',
      'Implemented security-first development practices for 15+ clients',
      'Reduced security incidents by 80% through proactive measures',
      'Created custom security tools using AI/ML technologies',
      '99.9% security success rate across all projects'
    ],
    technologies: ['Laravel/PHP', 'Vulnerability Assessment', 'Penetration Testing', 'Cloud Security', 'AI/ML Security', 'Prompt Engineering'],
    metrics: [
      { label: 'Clients Served', value: '50+', icon: 'users' },
      { label: 'Security Assessments', value: '100+', icon: 'shield-check' },
      { label: 'Success Rate', value: '99.9%', icon: 'check-circle' }
    ],
    icon: 'shield',
    color: 'electric-cyan',
    priority: 3
  },
  {
    id: 'cybersecurity-analyst-2022-2023',
    title: 'Cybersecurity Analyst',
    subtitle: 'Digital Defense Corp',
    category: 'experience',
    status: 'completed',
    startDate: '2022',
    endDate: '2023',
    description: 'Conducted comprehensive vulnerability assessments and penetration testing while integrating security into development workflows. Bridged gap between security and development teams.',
    achievements: [
      'Discovered and remediated 50+ critical vulnerabilities',
      'Implemented secure code review processes',
      'Achieved 100% client satisfaction in security assessments',
      'Reduced average vulnerability remediation time by 40%'
    ],
    technologies: ['Vulnerability Scanning', 'Penetration Testing', 'Risk Assessment', 'Secure Development', 'Incident Response', 'Compliance'],
    icon: 'alert-circle',
    color: 'neon-green',
    priority: 4
  },
  {
    id: 'security-focused-developer-2021-2022',
    title: 'Security-Focused Developer',
    subtitle: 'TechInnovate Solutions',
    category: 'experience',
    status: 'completed',
    startDate: '2021',
    endDate: '2022',
    description: 'Developed web applications with integrated security measures. Focused on secure coding practices and threat modeling during development lifecycle.',
    achievements: [
      'Built 20+ secure web applications with zero security breaches',
      'Implemented OAuth2 and JWT authentication systems',
      'Conducted security code reviews for development team',
      'Reduced application vulnerabilities by 60%'
    ],
    technologies: ['Laravel/PHP', 'JavaScript/TypeScript', 'API Security', 'Authentication Systems', 'Database Security', 'Security Testing'],
    icon: 'code',
    color: 'electric-cyan',
    priority: 5
  },
  {
    id: 'google-foundations-cybersecurity-2024',
    title: 'Google Foundations of Cybersecurity',
    subtitle: 'Google Career Certificate',
    category: 'certification',
    status: 'completed',
    startDate: '2024',
    description: 'Foundational cybersecurity concepts and practices from Google. Covers threat landscape, security controls, and incident response.',
    achievements: [
      'Completed comprehensive cybersecurity curriculum',
      'Gained hands-on experience with security tools',
      'Certified in security best practices',
      'Prepared for advanced cybersecurity roles'
    ],
    technologies: ['Security Fundamentals', 'Threat Analysis', 'Incident Response', 'Security Controls'],
    verificationUrl: 'https://www.coursera.org/account/accomplishments/certificate/XXXXX',
    icon: 'certificate',
    color: 'neon-green',
    priority: 6
  },
  {
    id: 'cisco-cyber-threat-management-2024',
    title: 'Cisco Cyber Threat Management',
    subtitle: 'Cisco Certification',
    category: 'certification',
    status: 'in-progress',
    startDate: '2024',
    current: true,
    description: 'Advanced threat detection and response methodologies. Learning enterprise-level threat intelligence and security operations.',
    achievements: [
      'Mastering advanced threat detection techniques',
      'Learning enterprise security operations',
      'Understanding threat intelligence platforms',
      'Preparing for security leadership roles'
    ],
    technologies: ['Threat Intelligence', 'Security Operations', 'Incident Response', 'Threat Hunting'],
    icon: 'target',
    color: 'electric-cyan',
    priority: 7
  },
  {
    id: 'osforensics-triage-certification-2024',
    title: 'OSForensics Triage Certification',
    subtitle: 'Digital Forensics',
    category: 'certification',
    status: 'in-progress',
    startDate: '2024',
    current: true,
    description: 'Digital forensics and incident response techniques. Learning evidence collection and analysis for security incidents.',
    achievements: [
      'Mastering digital forensics tools and techniques',
      'Learning incident response procedures',
      'Understanding evidence collection standards',
      'Preparing for forensic investigations'
    ],
    technologies: ['Digital Forensics', 'Incident Response', 'Evidence Collection', 'Forensic Analysis'],
    icon: 'search',
    color: 'neon-green',
    priority: 8
  },
  {
    id: 'iso-27001-2024',
    title: 'ISO 27001 Information Security Management',
    subtitle: 'International Standard',
    category: 'certification',
    status: 'completed',
    startDate: '2024',
    description: 'International standard for information security management systems. Understanding comprehensive security frameworks and compliance.',
    achievements: [
      'Learned ISO 27001 framework and implementation',
      'Understanding security management best practices',
      'Gained knowledge of compliance requirements',
      'Prepared for security governance roles'
    ],
    technologies: ['Security Management', 'Compliance', 'Risk Assessment', 'Security Frameworks'],
    icon: 'globe',
    color: 'electric-cyan',
    priority: 9
  },
  {
    id: 'cisco-ethical-hacker-2024',
    title: 'Cisco Ethical Hacker',
    subtitle: 'Penetration Testing Certification',
    category: 'certification',
    status: 'completed',
    startDate: '2024',
    description: 'Ethical hacking and penetration testing certification. Learning offensive security techniques for defensive purposes.',
    achievements: [
      'Certified in ethical hacking methodologies',
      'Mastered penetration testing techniques',
      'Understanding attacker mindset and tactics',
      'Gained hands-on security testing skills'
    ],
    technologies: ['Penetration Testing', 'Ethical Hacking', 'Vulnerability Assessment', 'Security Testing'],
    icon: 'bug',
    color: 'neon-green',
    priority: 10
  },
  {
    id: 'linkedin-prompt-engineering-2024',
    title: 'LinkedIn Prompt Engineering for Generative AI',
    subtitle: 'AI Security Applications',
    category: 'certification',
    status: 'completed',
    startDate: '2024',
    description: 'Advanced prompt engineering techniques for AI security applications. Learning to leverage AI for security automation and threat detection.',
    achievements: [
      'Mastered prompt engineering for security use cases',
      'Learned AI-powered security automation',
      'Understanding AI security implications',
      'Developed AI-enhanced security tools'
    ],
    technologies: ['Prompt Engineering', 'Generative AI', 'AI Security', 'Automation'],
    icon: 'brain',
    color: 'electric-cyan',
    priority: 11
  },
  {
    id: 'security-assessments-milestone-2024',
    title: '100+ Security Assessments Completed',
    subtitle: 'Career Achievement',
    category: 'achievement',
    status: 'completed',
    startDate: '2024',
    description: 'Successfully completed over 100 comprehensive security assessments for diverse clients ranging from startups to enterprise organizations.',
    achievements: [
      'Conducted 100+ security assessments',
      'Achieved 99.9% success rate',
      'Served 50+ clients across industries',
      'Zero critical security incidents in assessments'
    ],
    metrics: [
      { label: 'Total Assessments', value: '100+', icon: 'shield-check' },
      { label: 'Client Satisfaction', value: '99.9%', icon: 'smile' },
      { label: 'Industry Coverage', value: '10+', icon: 'building' }
    ],
    icon: 'trophy',
    color: 'neon-green',
    priority: 12
  },
  {
    id: 'security-research-publication-2024',
    title: 'Security Research Publication',
    subtitle: 'Cybersecurity Journal',
    category: 'achievement',
    status: 'completed',
    startDate: '2024',
    description: 'Published research paper on advanced threat detection using machine learning in peer-reviewed cybersecurity journal.',
    achievements: [
      'Published in cybersecurity research journal',
      'Research cited by industry professionals',
      'Presented findings at security conference',
      'Contributed to security knowledge base'
    ],
    technologies: ['Research', 'Machine Learning', 'Threat Detection', 'Academic Writing'],
    icon: 'book',
    color: 'electric-cyan',
    priority: 13
  },
  {
    id: 'conference-speaking-engagement-2024',
    title: 'Conference Speaking Engagement',
    subtitle: 'Cybersecurity Conference',
    category: 'achievement',
    status: 'completed',
    startDate: '2024',
    description: 'Invited speaker at major cybersecurity conference presenting on AI-powered threat detection and security automation.',
    achievements: [
      'Presented to 500+ security professionals',
      'Shared innovative security approaches',
      'Networked with industry leaders',
      'Received positive feedback from attendees'
    ],
    technologies: ['Public Speaking', 'Security Research', 'AI Security', 'Industry Networking'],
    icon: 'mic',
    color: 'neon-green',
    priority: 14
  }
];

// Resume summary configuration
export const RESUME_SUMMARY: ResumeSummary = {
  overview: 'Cybersecurity Specialist & Full-Stack Developer with 7+ years of experience protecting organizations from evolving cyber threats. Expertise spans enterprise security architecture, incident response, cloud security, and AI-powered threat detection. Combines deep technical knowledge with strategic security leadership.',
  keyAchievements: [
    '100+ Security Assessments Completed with 99.9% Success Rate',
    '50+ Clients Protected Across Multiple Industries',
    '75% Reduction in Security Incidents for Enterprise Clients',
    'Published Research in Cybersecurity Journal',
    'Certified in 10+ Security Technologies and Frameworks'
  ],
  specializations: [
    'Vulnerability Assessment & Penetration Testing',
    'Cloud Security Implementation (AWS, Azure, GCP)',
    'Incident Response & Threat Analysis',
    'AI/ML Security & Prompt Engineering',
    'Secure Web Application Development',
    'Security Architecture & Risk Management'
  ],
  philosophy: 'Believe in proactive security through continuous monitoring, threat intelligence, and security-first development practices. Focus on building resilient systems that protect digital assets while enabling business innovation.',
  goals: [
    'Advance AI-powered security automation and threat detection',
    'Expand enterprise security consulting practice',
    'Contribute to cybersecurity education and awareness',
    'Develop innovative security solutions for emerging technologies',
    'Achieve CISSP and other advanced security certifications'
  ],
  contactEmail: 'aditya@cybersecurity.com',
  downloadUrl: '/resume/Aditya_Kumar_Tiwari_Resume.pdf',
  lastUpdated: '2024-12-25'
};

// Career timeline configuration
export const CAREER_TIMELINE_CONFIG: CareerTimelineConfig = {
  title: 'Career Timeline & Resume Summary',
  subtitle: 'Professional Journey in Cybersecurity & Development',
  enableFiltering: true,
  enableSearch: true,
  showMetrics: true,
  animationSpeed: 0.6,
  responsiveBreakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1280
  }
};