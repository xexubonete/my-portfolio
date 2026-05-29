import type { Page } from './types'

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

// Work Page
export const WORK: Page = {
  TITLE: 'Work experience (+4 years)',
  DESCRIPTION: 'Places I have worked.',
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
    company: 'Cafler',
    link: 'https://cafler.com/',
    location: 'Barcelona, Spain',
    position: '.NET Backend Developer',
    start: '01/2026',
    end: 'Current',
    description:
      'AI-powered Operating System for the automotive industry and backend services for a car-services marketplace.',
    responsibilities: [
      'Design and development of backend services with microservices architecture and gRPC.',
      'AI-assisted development with Claude and GitHub Copilot PRO.',
    ],
    stack: [
      '.NET 10',
      '.NET 9',
      '.NET 8',
      'C#',
      'Clean Architecture',
      'CQRS',
      'MediatR',
      'Microservices',
      'gRPC',
      'Entity Framework',
      'Hangfire',
      'CosmoDB',
      'MSSQL',
      'Azure',
      'Azure Blob Storage',
      'Azure DevOps',
      'Git/GitHub',
      'Postman',
      'Bruno',
    ],
  },
  {
    company: 'Savia by Berger-Levrault',
    link: 'https://www.savia.net/',
    location: 'Madrid, Spain',
    position: '.NET Developer',
    start: '05/2024',
    end: '12/2025',
    description:
      'Web application for human-resources management in public administration.',
    responsibilities: [
      'Development of enhancements and new features; optimization of database query times.',
      'Bug fixing, creation of different types of tests and best practices.',
      'AI-assisted development with GitHub Copilot.',
    ],
    stack: [
      '.NET 8',
      '.NET Framework 4.8',
      'C#',
      'REST APIs',
      'Dapper',
      'Entity Framework',
      'AutoMapper',
      'MediatR',
      'Hangfire',
      'SignalR',
      'MSSQL',
      'Azure DevOps',
      'Git',
      'Postman',
    ],
  },
  {
    company: 'NTT DATA',
    link: 'https://es.nttdata.com/',
    location: 'Alicante, Spain',
    position: '.NET Developer',
    start: '12/2023',
    end: '05/2024',
    description:
      'Sole maintenance of the corrective service for a leading renewable-energy company.',
    responsibilities: [
      'Sole maintenance of the corrective service and direct communication with the client.',
      'Analysis, coding, deployment of fixes and validation of features.',
      'Proposal of new enhancements.',
    ],
    stack: [
      '.NET Core 3.1',
      'C#',
      'REST APIs',
      'Entity Framework',
      'Azure DevOps',
      'Git/GitHub',
      'Postman',
    ],
  },
  {
    company: 'NTT DATA',
    link: 'https://es.nttdata.com/',
    location: 'Alicante, Spain',
    position: 'Junior .NET Developer',
    start: '06/2022',
    end: '12/2023',
    description:
      'Maintenance of language literals in a web application in the fuel sector.',
    responsibilities: [
      'Development of classic ASP enhancements and SQL database scripts.',
    ],
    stack: [
      'Classic ASP',
      'SQL',
      'MSSQL',
      'Team Explorer',
      'Jenkins',
      'Postman',
    ],
  },
  {
    company: 'NTT DATA',
    link: 'https://es.nttdata.com/',
    location: 'Alicante, Spain',
    position: 'Backend Intern',
    start: '02/2022',
    end: '06/2022',
    description: 'Backend for a wind-farm application (3-month internship).',
    responsibilities: ['Design and implementation of an API in .NET C#.'],
    stack: [
      '.NET 6',
      'C#',
      'Entity Framework',
      'Azure DevOps',
      'Git/GitHub',
      'Postman',
    ],
  },
]
