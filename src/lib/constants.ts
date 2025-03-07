import type { Site, Page } from './types'

export const loaderAnimation = [
  '.loader',
  { opacity: [1, 0], pointerEvents: 'none' },
  { easing: 'ease-out' },
]

export const LINKS = {
  github: 'https://github.com/xexubonete',
  linkedin: 'https://www.linkedin.com/in/jesus-bonete-sanchez/',
  mail: 'mailto:xexubonete@gmail.com',
  instagram: 'https://www.instagram.com/xexubonete/',
}

// Global
export const SITE: Site = {
  TITLE: 'Astro Sphere',
  DESCRIPTION:
    'Welcome to Astro Sphere, a portfolio and blog for designers and developers.',
  AUTHOR: 'Mark Horn',
}

// Work Page
export const WORK: Page = {
  TITLE: 'Work experience (+2 years)',
  DESCRIPTION: 'Places I have worked.',
}

// Blog Page
export const BLOG: Page = {
  TITLE: 'Blog',
  DESCRIPTION: 'Writing on topics I am passionate about.',
}

// Projects Page
export const PROJECTS: Page = {
  TITLE: 'Projects',
  DESCRIPTION: 'Recent projects I have worked on.',
}

// Search Page
export const SEARCH: Page = {
  TITLE: 'Search',
  DESCRIPTION: 'Search all posts and projects by keyword.',
}

// Study Page
export const STUDIES = [
  {
    title: 'Web Developer',
    institution: 'DAW',
    link: 'https://todofp.es/que-estudiar/loe/informatica-comunicaciones/des-aplicaciones-web.html',
    date: '2020 - 2022',
  },
  {
    title: '...',
    institution: 'Dometrain',
    link: 'https://dometrain.com/',
  },
  {
    title: '...',
    institution: 'Udemy',
    link: 'https://www.udemy.com/',
  },
  {
    title: '...',
    institution: 'Self-taught',
  },
  {
    title: '...',
    institution: 'Books',
  },
]

export const EXPERIENCE = [
  {
    company: 'SAVIA',
    link: 'https://www.savia.net/',
    location: 'Madrid, Spain',
    position: '.NET Developer',
    start: '2024',
    end: 'Current',
    tasks: [    
      'Analysis and research of potential improvements',
      'Development of enhancements and new features',
      'Optimization of database query performance',
      'Bug fixing and backend issue resolution',
      'Creation of various types of tests',
      'Adherence to best practices',
      'Experience with .NET 8.0',
      'Experience with .NET Framework 4.8',
      'Experience with REST APIs',
      'Experience with Dapper and Entity Framework for data access',
      'Experience with Automapper',
      'Experience with MediatR pattern',
      'Experience with Hangfire and SignalR',
      'Experience with SQL and MSSQL',
      'Proficiency in Git',
      'Proficiency in Azure DevOps'
    ],
  },
  {
    company: 'NTT DATA',
    link: 'https://es.nttdata.com/',
    location: 'Alicante, Spain',
    position: '.NET Developer',
    start: '2022',
    end: '2023',
    tasks: [
      'Solo maintenance of corrective service.',
      'Direct communication with the client.',
      'Analysis, coding, and deployment of fixes.',
      'Testing and validation of functionalities across the application.',
      'Proposal of new features.',
      'Use of API REST.',
      'Experience with .NET Core 3.1.',
      'Experience with Entity Framework 3.1.',
      'Experience with Azure DevOps.',
      'Experience with Git.',
    ],
  },
  {
    company: 'NTT DATA',
    link: 'https://es.nttdata.com/',
    location: 'Alicante, Spain',
    position: 'Junior Developer',
    start: '2022',
    end: '2023',
    tasks: [
      'Creating APIs in .NET C#.',
      'Experience with .NET Framework 6.0.',
      'Experience with .NET Core 6.0.',
      'Postman requests.',
      'Experience with GitHub.',
      'Development of ASP classic applications.',
      'Development of SQL database scripts.',
      'Experience with MSSQL Server.',
      'Deployment using Jenkins.',
      'Experience with Git.',
    ],
  },
]
