// data/mockCandidates.ts - COMPLETE FIXED VERSION
// data/mockCandidates.ts - COMPLETE FIXED VERSION
import type { Candidate, CandidateDetail } from '../types/candidate';

// Basic candidate data for grid view
export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Aarav Patel',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Senior React Developer',
    currentCompany: 'TechCorp Solutions',
    experience: 5,
    location: 'Ahmedabad, Gujarat',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'MongoDB'],
    availability: 'immediate',
    matchPercentage: 92,
    isContactUnlocked: false
  },
  {
    id: '2',
    name: 'Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'UX/UI Designer',
    currentCompany: 'DesignStudio Inc',
    experience: 4,
    location: 'Mumbai, Maharashtra',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframing'],
    availability: '2 weeks',
    matchPercentage: 87,
    isContactUnlocked: false
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Full Stack Developer',
    currentCompany: 'StartupXYZ',
    experience: 3,
    location: 'Bangalore, Karnataka',
    skills: ['JavaScript', 'Python', 'Django', 'React', 'PostgreSQL'],
    availability: '1 month',
    matchPercentage: 78,
    isContactUnlocked: false
  },
  {
    id: '4',
    name: 'Neha Gupta',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Product Manager',
    currentCompany: 'ProductLabs',
    experience: 6,
    location: 'Delhi, India',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Stories', 'Roadmapping'],
    availability: 'immediate',
    matchPercentage: 95,
    isContactUnlocked: false
  },
  {
    id: '5',
    name: 'Siddharth Joshi',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'DevOps Engineer',
    currentCompany: 'CloudTech Systems',
    experience: 4,
    location: 'Hyderabad, Telangana',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
    availability: '2 weeks',
    matchPercentage: 83,
    isContactUnlocked: false
  },
  {
    id: '6',
    name: 'Ananya Singh',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Frontend Developer',
    currentCompany: 'WebCraft Digital',
    experience: 2,
    location: 'Pune, Maharashtra',
    skills: ['React', 'Vue.js', 'CSS3', 'SASS', 'Webpack'],
    availability: 'immediate',
    matchPercentage: 71,
    isContactUnlocked: false
  }
];

// Detailed candidate data for modal view
export const mockCandidatesDetail: CandidateDetail[] = [
  {
    id: '1',
    name: 'Aarav Patel',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Senior React Developer',
    currentCompany: 'TechCorp Solutions',
    experience: 5,
    location: 'Ahmedabad, Gujarat',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'MongoDB'],
    availability: 'immediate',
    matchPercentage: 92,
    isContactUnlocked: false,
    strengths: [
      'Strong expertise in React ecosystem',
      'Excellent problem-solving skills',
      'Great team collaboration',
      'Fast learner and adaptable'
    ],
    areasToProbe: [
      'Experience with micro-frontends',
      'Team leadership experience',
      'Open source contributions'
    ],
    aiVerdict: 'Excellent match for senior frontend roles. Strong technical skills and great cultural fit.',
    careerTimeline: [
      { year: '2023-Present', role: 'Senior React Developer', company: 'TechCorp Solutions' },
      { year: '2021-2023', role: 'React Developer', company: 'WebTech Innovations' },
      { year: '2019-2021', role: 'Frontend Developer', company: 'StartupGrid' },
      { year: '2018-2019', role: 'Junior Developer', company: 'CodeCraft Studio' }
    ],
    workExperience: [
      {
        company: 'TechCorp Solutions',
        role: 'Senior React Developer',
        duration: '2 years',
        description: 'Led frontend development for enterprise SaaS product. Improved performance by 40% and mentored 3 junior developers.'
      },
      {
        company: 'WebTech Innovations',
        role: 'React Developer',
        duration: '2 years',
        description: 'Developed responsive web applications using React, Redux, and TypeScript. Collaborated with UX team on design system.'
      }
    ],
    about: 'Passionate frontend developer with 5+ years of experience building scalable web applications. Strong advocate for clean code and best practices. Enjoy mentoring junior developers and contributing to open source projects.',
    email: 'aarav.patel@example.com',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'UX/UI Designer',
    currentCompany: 'DesignStudio Inc',
    experience: 4,
    location: 'Mumbai, Maharashtra',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframing'],
    availability: '2 weeks',
    matchPercentage: 87,
    isContactUnlocked: false,
    strengths: [
      'Excellent user research skills',
      'Strong visual design sense',
      'Great collaboration with developers'
    ],
    areasToProbe: [
      'Design system experience',
      'Mobile app design portfolio',
      'Animation and micro-interactions'
    ],
    aiVerdict: 'Strong UX designer with good research background. Great for product-focused design roles.',
    careerTimeline: [
      { year: '2022-Present', role: 'Senior UX Designer', company: 'DesignStudio Inc' },
      { year: '2020-2022', role: 'UI/UX Designer', company: 'CreativeMinds' },
      { year: '2019-2020', role: 'Junior Designer', company: 'DesignHub' }
    ],
    workExperience: [
      {
        company: 'DesignStudio Inc',
        role: 'Senior UX Designer',
        duration: '2 years',
        description: 'Led design for mobile and web applications. Conducted user research and created design systems used by 10+ products.'
      }
    ],
    about: 'User-centered designer with passion for creating intuitive and beautiful digital experiences. Strong background in user research and interaction design.',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43211'
  }
];