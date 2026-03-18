import {
  SiSpringboot,
  SiDocker,
  SiPostgresql,
  SiAmazonwebservices,
  SiReact,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import {
  gitHubLink,
  gitLinkForJobRadar,
  gitLinkForPortfolio,
  jobRadarLink,
  linkedInLink,
  portfolioLink,
  trackHireGithubLink,
  trackHireLiveLink,
  twitterLink,
} from '@/lib/static-links'
import jobRadarLight from '@/assets/light/Job-Radar.jpg'
import jobRadarDark from '@/assets/dark/Job-Radar.jpg'
import portfolioLight from '@/assets/light/portfolio.jpg'
import portfolioDark from '@/assets/dark/portfolio.jpg'
import trackHireAiLight from '@/assets/light/Track-Hire-AI.jpg'
import trackHireAiDark from '@/assets/dark/Track-Hire-AI.jpg'
export const RESUME = {
  name: 'Sai Teja Mukkera',
  about: 'Currently shipping with',
  currentTechStack: [
    {
      tech: 'Java',
      icon: <FaJava className="h-7 w-7" style={{ color: '#ED8B00' }} />,
    },
    {
      tech: 'Spring Boot',
      icon: <SiSpringboot className="h-6 w-6" style={{ color: '#6DB33F' }} />,
    },
    {
      tech: 'AWS',
      icon: (
        <SiAmazonwebservices className="h-7 w-7" style={{ color: '#FF9900' }} />
      ),
    },
    {
      tech: 'Docker',
      icon: <SiDocker className="h-7 w-7" style={{ color: '#2496ED' }} />,
    },
    {
      tech: 'PostgreSQL',
      icon: <SiPostgresql className="h-6 w-6" style={{ color: '#4169E1' }} />,
    },
    {
      tech: 'React',
      icon: <SiReact className="h-6 w-6" style={{ color: '#61DAFB' }} />,
    },
  ],
  summary:
    'Backend Software Engineer with 4+ years of experience building secure APIs and distributed systems with Java, Spring Boot, and AWS — handling 20K+ daily requests at scale.',
  location: 'Warrensburg, MO',
  email: 'saitejamukkera@gmail.com',
  github: gitHubLink,
  linkedin: linkedInLink,
  twitter: twitterLink,
  projects: [
    {
      title: 'TrackHire AI',
      description:
        'AI-powered job application platform enabling resume generation, tailored cover letters, and application tracking.',
      tech: [
        'Spring Boot',
        'PostgreSQL',
        'Flyway',
        'Docker',
        'Next.js',
        'Gemini API',
      ],
      link: trackHireLiveLink,
      github: trackHireGithubLink,
      image: { light: trackHireAiLight, dark: trackHireAiDark },
      featured: true,
    },
    {
      title: 'Job Radar',
      description:
        'Full-stack recruitment platform for job publishing, candidate workflows, and recruiter-side hiring management.',
      tech: ['Node.js', 'Express', 'React', 'MongoDB', 'Redux Toolkit'],
      link: jobRadarLink,
      github: gitLinkForJobRadar,
      image: { light: jobRadarLight, dark: jobRadarDark },
      featured: true,
    },
    {
      title: 'Portfolio Website',
      description:
        'Personal portfolio built with React, TypeScript, Tailwind CSS, and shadcn/ui.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vite'],
      link: portfolioLink,
      github: gitLinkForPortfolio,
      image: { light: portfolioLight, dark: portfolioDark },
      featured: false,
    },
  ],
  experience: [
    {
      company: 'Saayam For All Org',
      role: 'Software Engineer (Contract)',
      period: 'Jan 2026 – Present',
      description:
        'Building backend services with Java and Spring Boot for a nonprofit volunteer platform.',
      highlights: [
        'Implemented Redis caching for volunteer discovery and request listing endpoints',
        'Redesigned authentication endpoint replacing insecure GET params with validated POST bodies',
        'Proposed standardized API response wrappers reducing frontend API errors by 30%',
      ],
    },
    {
      company: 'Cognizant (Truist Financial)',
      role: 'Software Engineer',
      period: 'Apr 2021 – Dec 2023',
      description:
        'Enhanced Spring Boot microservices for digital banking handling 8K–12K daily API requests.',
      highlights: [
        'Redis caching reduced DB query load by 55%, improving P95 latency from 850ms to 500ms',
        'Built event-driven payment pipelines using Apache Kafka and Amazon SQS',
        'Increased automated test coverage from 65% to 90% with JUnit 5 and Mockito',
        'Optimized CI/CD pipelines reducing runtime from 18 to 12 minutes',
      ],
    },
    {
      company: 'Cognizant (UnitedHealth Group / Optum)',
      role: 'Associate Software Engineer',
      period: 'Feb 2020 – Mar 2021',
      description:
        'Built backend RESTful APIs using Java and Spring Boot for healthcare portal services handling 5K+ daily requests.',
      highlights: [
        'Built member profile and eligibility endpoints reducing response payload size by 70%',
        'Improved automated test coverage from 55% to 75% with JUnit 5 and Mockito',
        'Assisted in AWS EC2, RDS, and S3 deployments across production releases',
      ],
    },
  ],
  education: [
    {
      school: 'University of Central Missouri',
      degree: 'Master of Science in Computer Science (GPA: 4.0)',
      period: 'Jan 2024 – Dec 2025',
      location: 'Warrensburg, MO',
    },
    {
      school: 'Guru Nanak Institute of Technology',
      degree:
        'Bachelor of Technology in Electronics and Communication Engineering',
      period: 'Jul 2015 – Jul 2019',
      location: 'Hyderabad, India',
    },
  ],
  skills: {
    languages: ['Java', 'JavaScript', 'TypeScript', 'SQL', 'Python'],
    backend: [
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'Node.js',
      'Express',
      'Redis',
    ],
    data: [
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'Flyway',
      'Apache Kafka',
      'Amazon SQS',
    ],
    devops: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Git',
      'GitHub Actions',
      'Jenkins',
      'SonarQube',
    ],
    testing: ['JUnit 5', 'Mockito', 'Splunk', 'OpenTelemetry'],
    frontend: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
}
