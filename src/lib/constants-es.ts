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
  // medium: 'https://ladvace.medium.com/',
  // discord: 'https://discordapp.com/users/163300027618295808',
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
  TITLE: 'Work',
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
    institution: 'Ministerio de Educación',
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
    institution: 'Youtube',
    link: 'https://www.youtube.com/',
  },
]
export const SPANISH = [
  {
    company: 'SAVIA',
    link: 'https://www.savia.net/',
    location: 'Madrid, España',
    position: '.NET Developer',
    start: '2023',
    end: 'Actual',
    tasks: [],
  },
  {
    company: 'NTT DATA',
    link: 'https://es.nttdata.com/',
    location: 'Alicante, España',
    position: '.NET Developer',
    start: '2022',
    end: '2023',
    tasks: [
      'Mantenimiento en solitario del servicio correctivo.',
      'Comunicación directa con cliente.',
      'Análisis, codificación y despliegue de correctivos.',
      'Testeo y validación de funcionalidades en toda la aplicación.',
      'Planteamiento de nuevos evolutivos.',
      'Uso API REST.',
      'Uso .NET Framework 3.1.',
      'Uso .NET Core 3.1.',
      'Uso Entity Framework 3.1.',
      'Manejo de Azure DevOps.',
      'Manejo de Git.',
    ],
  },
  {
    company: 'NTT DATA',
    link: 'https://es.nttdata.com/',
    location: 'Alicante, España',
    position: 'Junior Developer',
    start: '2022',
    end: '2023',
    tasks: [
      'Creación de API en .NET C#.',
      'Uso de .NET Framework 6.0.',
      'Uso de .NET Core 6.0.',
      'Uso de Entity Framework 6.0.',
      'Peticiones Postman.',
      'Manejo de GitHub.',
      'Desarrollo de evolutivos en ASP clásico.',
      'Desarrollo de scripts para bases de datos SQL.',
      'Uso de MSSQL Server.',
      'Despliegue con Jenkins.',
      'Uso de Git.',
    ],
  },
]
