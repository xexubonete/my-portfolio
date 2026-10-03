// Content for the mockups, per language.
//
// Everything that already lives in src/lib/constants*.ts is imported from
// there (Node strips the types), so the mockups always show the real
// experience, studies and links. The strings below are the ones that today
// live inside the bento components (intro, goals, labels…), transcribed
// verbatim; the 404 Spanish copy is the one addition, because the current
// 404 page is English only.

import {
  EXPERIENCE,
  STUDIES as STUDIES_EN,
  LINKS,
  WORK as WORK_EN,
} from '../src/lib/constants.ts'
import {
  SPANISH,
  STUDIES as STUDIES_ES,
  WORK as WORK_ES,
} from '../src/lib/constants-es.ts'

export { LINKS }

export const PROJECTS = [
  { label: 'pilot-api', href: 'https://github.com/xexubonete/pilot-api' },
  { label: 'mediator-api', href: 'https://github.com/xexubonete/mediator-api' },
  { label: 'dapper-api', href: 'https://github.com/xexubonete/dapper-api' },
  {
    label: 'my-portfolio',
    href: 'https://github.com/xexubonete/my-portfolio',
    live: true,
  },
]

const STACK = (lang) => [
  {
    label:
      lang === 'es' ? 'Frameworks y librerías' : 'Frameworks and libraries',
    items: [
      'C#',
      'SQL',
      '.NET',
      '.NET Core 3.1',
      '.NET Framework 4.8',
      'REST APIs',
      'gRPC',
      lang === 'es' ? 'Microservicios' : 'Microservices',
      'Dapper',
      'Entity Framework Core',
      'Entity Framework 6.0',
      'Hangfire',
      'MediatR',
      'AutoMapper',
      'FluentValidation',
      'SignalR',
      'xUnit / MSTest',
      'Serilog',
      'Swagger / OpenAPI',
      'Angular',
    ],
  },
  {
    label: lang === 'es' ? 'Patrones de diseño' : 'Design patterns',
    items: [
      'Clean Architecture',
      'DDD Domain-Driven Design',
      'CQRS',
      'MediatR pattern',
      'Repository',
      'Unit of Work',
    ],
  },
  {
    label: lang === 'es' ? 'Bases de datos' : 'Databases',
    items: ['PostgreSQL', 'MSSQL', 'CosmoDB', 'Stored Procedures'],
  },
  {
    label: lang === 'es' ? 'DevOps y Cloud' : 'DevOps and Cloud',
    items: [
      'Azure',
      'Azure Blob Storage',
      'Azure DevOps',
      'Pipelines',
      'CI/CD',
      'Jenkins',
      'Git',
    ],
  },
  {
    label: lang === 'es' ? 'Herramientas' : 'Tools',
    items: ['Postman', 'Bruno', 'Team Explorer'],
  },
]

/** The headline items that run on the tape between the hero and the sheet. */
export const TAPE = [
  'C#',
  '.NET 10',
  'gRPC',
  'CQRS',
  'Clean Architecture',
  'Microservices',
  'Entity Framework',
  'Dapper',
  'MediatR',
  'Hangfire',
  'Azure',
  'MSSQL',
  'PostgreSQL',
  'CosmoDB',
  'Claude',
  'GitHub Copilot',
]

/** Consecutive roles at the same company become one group (NTT DATA = 3). */
export function groupByCompany(roles) {
  const groups = []
  for (const role of roles) {
    const last = groups[groups.length - 1]
    if (last && last.company === role.company) last.roles.push(role)
    else
      groups.push({
        company: role.company,
        link: role.link,
        location: role.location,
        roles: [role],
      })
  }
  return groups
}

export const CONTENT = {
  en: {
    lang: 'en',
    other: 'es',
    pages: {
      home: 'home.html',
      work: 'work.html',
      cv: 'cv.html',
      notFound: '404.html',
    },
    titles: {
      home: 'Mockup — Home (/en)',
      work: 'Mockup — Work (/en/work)',
      cv: 'Mockup — CV (/en/cv)',
      notFound: 'Mockup — 404',
    },
    header: {
      label: 'dotnet developer',
      theme: 'Toggle theme',
      language: 'Language',
      nav: 'Primary',
    },
    footer: {
      copy: '© 2026 Jesús Bonete',
      built: 'Built with Astro',
    },
    hero: {
      eyebrow: 'welcome',
      name: ['Jesús', 'Bonete'],
      portraitAlt: 'memoji of Jesús Bonete',
      block: [
        ['Role', 'Senior .NET Developer'],
        ['Based', 'Elda, Alicante, Spain'],
        ['Experience', '+4 years'],
        ['Status', 'Available'],
      ],
      lead: "Hi, I'm <b>Jesús Bonete</b>, a backend dev focused on building efficient and scalable applications.",
      paragraphs: [
        'I specialize in robust, secure services, database optimization and seamless integration with the frontend from the server side. AI is at the core of how I work: I weave it into my daily workflow to build faster, automate repetitive tasks and raise code quality without compromising best practices.',
        "I make the most of LLMs, agents and assistants like Claude or GitHub Copilot to speed up every phase, from architecture to deployment, making better decisions in less time. I care about clean code, solid architecture and growing with every project. Passionate about technology, I'm always after new challenges.",
      ],
    },
    cv: {
      title: 'CV',
      caption: 'Preview of my resume — click to view and download',
      button: 'View & download CV',
      open: 'Open the CV',
      preview: 'CV preview',
    },
    experience: {
      num: '01',
      title: 'Experience',
      meta: '+4 years',
      more: 'View more',
      roles: EXPERIENCE,
      rolesWord: 'roles',
    },
    stack: {
      num: '02',
      title: 'Stack',
      groups: STACK('en'),
    },
    projects: {
      num: '03',
      title: 'Projects',
      here: 'you are here',
      all: 'All repositories',
    },
    goals: {
      num: '04',
      title: 'Goals',
      meta: 'AI in the backend',
      intro:
        'I want to specialize in integrating AI into the backend, mastering:',
      items: [
        [
          'LLM integration',
          'Connecting models like Claude or GPT to backend services and APIs securely and efficiently.',
        ],
        [
          'RAG &amp; vector databases',
          'Semantic search with embeddings and vector databases to ground models with your own data.',
        ],
        [
          'Agents &amp; tool calling',
          'Orchestrating agents that call tools and APIs (function calling, MCP) to automate workflows.',
        ],
        [
          'Evals &amp; observability',
          'Measuring quality, latency and cost of LLMs with evals and tracing to ship AI to production with confidence.',
        ],
      ],
    },
    profile: {
      num: '05',
      title: 'Profile',
      meta: 'about · languages',
      aboutTitle: 'About me',
      about: [
        "Beyond coding, I'm passionate about the gym 🏋️‍♂️ and living a healthy lifestyle 🍏.",
        'Another hobby of mine is playing airsoft 🎖️ on weekends.',
      ],
      studyTitle: 'Study',
      studies: STUDIES_EN,
      languagesTitle: 'Languages',
      languages: [
        ['Spanish', 'Native'],
        ['English', 'B2'],
      ],
      softTitle: 'Soft skills',
      soft: [
        'Self-learning',
        'Teamwork',
        'Problem solving',
        'Communication',
        'Adaptability',
        'Leadership',
        'Working under pressure',
        'Proactivity',
      ],
    },
    quote: {
      text: 'The only way to go fast, is to',
      accent: 'go well.',
      by: 'Robert C. Martin',
    },
    contact: {
      num: '06',
      title: 'Contact',
      meta: "let's talk",
      portraitAlt: 'memoji of Jesús taking it easy',
      links: [
        ['Call me', '+34 722 243 881', 'tel:+34722243881'],
        ['Email me', 'xexubonete@gmail.com', LINKS.mail],
        ['LinkedIn', 'jesus-bonete-sanchez', LINKS.linkedin],
        ['GitHub', 'xexubonete', LINKS.github],
      ],
    },
    work: {
      eyebrow: '01 — Experience',
      title: 'Work experience',
      years: '+4 years',
      description: WORK_EN.DESCRIPTION,
      pageTitle: WORK_EN.TITLE,
      back: 'Back home',
      roles: EXPERIENCE,
    },
    resume: {
      role: 'Senior .NET Developer',
      download: 'Download PDF',
      pdf: '/CV_Jesus_Bonete_EN.pdf',
      back: 'Back to site',
      location: 'Elda, Alicante, Spain',
      profileTitle: 'Profile',
      profile:
        'Senior .NET developer with <b>4+ years</b> of experience building robust and scalable services. Specialized in clean architectures, microservices and database optimization. AI is at the core of how I work: I integrate LLMs and assistants like Claude or GitHub Copilot into my daily workflow to build faster, automate tasks and raise code quality without compromising best practices.',
      contactTitle: 'Contact',
      dataTitle: 'Details',
      nat: 'Nationality',
      natValue: 'Spanish',
      license: 'Driving licence',
      langTitle: 'Languages',
      languages: [
        ['Spanish', 'Native'],
        ['English', 'B2'],
      ],
      skillsTitle: 'Skills',
      soft: [
        'Self-learning',
        'Working under pressure',
        'Problem solving',
        'Autonomy and proactivity',
        'Leadership',
        'Communication',
        'Teamwork',
        'Adaptability',
      ],
      expTitle: 'Experience',
      eduTitle: 'Education',
      eduName: 'Web Application Development (DAW)',
      eduPlace: 'Alicante, Spain',
      roles: EXPERIENCE,
    },
    notFound: {
      eyebrow: 'error',
      title: 'Page not found',
      text: "Sorry, we couldn't find the page you're looking for.",
      button: 'Go back home',
      alt: 'memoji of Jesús taking it easy',
    },
  },
  es: {
    lang: 'es',
    other: 'en',
    pages: {
      home: 'home-es.html',
      work: 'work-es.html',
      cv: 'cv-es.html',
      notFound: '404-es.html',
    },
    titles: {
      home: 'Maqueta — Inicio (/es)',
      work: 'Maqueta — Experiencia (/es/work)',
      cv: 'Maqueta — CV (/cv)',
      notFound: 'Maqueta — 404',
    },
    header: {
      label: 'dotnet developer',
      theme: 'Cambiar tema',
      language: 'Idioma',
      nav: 'Principal',
    },
    footer: {
      copy: '© 2026 Jesús Bonete',
      built: 'Hecho con Astro',
    },
    hero: {
      eyebrow: 'bienvenido',
      name: ['Jesús', 'Bonete'],
      portraitAlt: 'memoji de Jesús Bonete',
      block: [
        ['Puesto', 'Senior .NET Developer'],
        ['Ubicación', 'Elda, Alicante, España'],
        ['Experiencia', '+4 años'],
        ['Estado', 'Disponible'],
      ],
      lead: 'Hola, soy <b>Jesús Bonete</b>, desarrollador backend enfocado en crear aplicaciones eficientes y escalables.',
      paragraphs: [
        'Me especializo en servicios robustos y seguros, optimización de bases de datos e integración impecable con el frontend desde el servidor. La IA es el núcleo de mi forma de trabajar: la integro en mi día a día para desarrollar más rápido, automatizar tareas repetitivas y elevar la calidad del código sin sacrificar buenas prácticas.',
        'Saco el máximo partido de LLMs, agentes y asistentes como Claude o GitHub Copilot para acelerar cada fase, de la arquitectura al despliegue, tomando mejores decisiones en menos tiempo. Cuido el código limpio, la arquitectura sólida y el crecimiento en cada proyecto. Apasionado de la tecnología, siempre busco nuevos retos.',
      ],
    },
    cv: {
      title: 'CV',
      caption: 'Vista previa de mi CV — haz clic para verlo y descargarlo',
      button: 'Ver y descargar CV',
      open: 'Abrir el CV',
      preview: 'Vista previa del CV',
    },
    experience: {
      num: '01',
      title: 'Experiencia',
      meta: '+4 años',
      more: 'Ver más',
      roles: SPANISH,
      rolesWord: 'puestos',
    },
    stack: {
      num: '02',
      title: 'Stack',
      groups: STACK('es'),
    },
    projects: {
      num: '03',
      title: 'Proyectos',
      here: 'estás aquí',
      all: 'Todos los repos',
    },
    goals: {
      num: '04',
      title: 'Objetivos',
      meta: 'IA en el backend',
      intro:
        'Quiero especializarme en integrar la IA en el backend, dominando:',
      items: [
        [
          'Integración de LLMs',
          'Conectar modelos como Claude o GPT a servicios y APIs backend de forma segura y eficiente.',
        ],
        [
          'RAG y bases vectoriales',
          'Búsqueda semántica con embeddings y bases de datos vectoriales para dar contexto propio a los modelos.',
        ],
        [
          'Agentes y tool calling',
          'Orquestar agentes que invocan herramientas y APIs (function calling, MCP) para automatizar flujos.',
        ],
        [
          'Evaluación y observabilidad',
          'Medir calidad, latencia y coste de los LLMs con evals y trazas para llevar la IA a producción con garantías.',
        ],
      ],
    },
    profile: {
      num: '05',
      title: 'Perfil',
      meta: 'sobre mí · idiomas',
      aboutTitle: 'Sobre mí',
      about: [
        'Mas allá de la programación, me apasiona entrenar 🏋️‍♂️ y llevar una vida saludable 🍏.',
        'Otra afición que practico es jugar a airsoft 🎖️ los fines de semana.',
      ],
      studyTitle: 'Aprendizaje',
      studies: STUDIES_ES,
      languagesTitle: 'Idiomas',
      languages: [
        ['Español', 'Nativo'],
        ['Inglés', 'B2'],
      ],
      softTitle: 'Soft skills',
      soft: [
        'Autoaprendizaje',
        'Trabajo en equipo',
        'Resolución de problemas',
        'Comunicación',
        'Adaptabilidad',
        'Liderazgo',
        'Trabajo bajo presión',
        'Proactividad',
      ],
    },
    quote: {
      text: 'The only way to go fast, is to',
      accent: 'go well.',
      by: 'Robert C. Martin',
    },
    contact: {
      num: '06',
      title: 'Contacto',
      meta: 'hablemos',
      portraitAlt: 'memoji de Jesús relajado',
      links: [
        ['Llámame', '+34 722 243 881', 'tel:+34722243881'],
        ['Escríbeme', 'xexubonete@gmail.com', LINKS.mail],
        ['LinkedIn', 'jesus-bonete-sanchez', LINKS.linkedin],
        ['GitHub', 'xexubonete', LINKS.github],
      ],
    },
    work: {
      eyebrow: '01 — Experiencia',
      title: 'Experiencia laboral',
      years: '+4 años',
      description: WORK_ES.DESCRIPTION,
      pageTitle: WORK_ES.TITLE,
      back: 'Volver al inicio',
      roles: SPANISH,
    },
    resume: {
      role: 'Desarrollador .NET Senior',
      download: 'Descargar PDF',
      pdf: '/CV_Jesus_Bonete_ES.pdf',
      back: 'Volver a la web',
      location: 'Elda, Alicante, España',
      profileTitle: 'Perfil',
      profile:
        'Desarrollador .NET senior con <b>más de 4 años</b> de experiencia construyendo servicios robustos y escalables. Especializado en arquitecturas limpias, microservicios y optimización de bases de datos. La IA es el núcleo de mi forma de trabajar: integro LLMs y asistentes como Claude o GitHub Copilot en mi día a día para desarrollar más rápido, automatizar tareas y elevar la calidad del código sin sacrificar buenas prácticas.',
      contactTitle: 'Contacto',
      dataTitle: 'Datos',
      nat: 'Nacionalidad',
      natValue: 'Española',
      license: 'Permiso de conducir',
      langTitle: 'Idiomas',
      languages: [
        ['Español', 'Nativo'],
        ['Inglés', 'B2'],
      ],
      skillsTitle: 'Habilidades',
      soft: [
        'Autoaprendizaje',
        'Trabajo bajo presión',
        'Resolución de problemas',
        'Autonomía y proactividad',
        'Liderazgo',
        'Comunicación',
        'Trabajo en equipo',
        'Adaptabilidad',
      ],
      expTitle: 'Experiencia',
      eduTitle: 'Formación',
      eduName: 'Desarrollo de Aplicaciones Web (DAW)',
      eduPlace: 'Alicante, España',
      roles: SPANISH,
    },
    notFound: {
      eyebrow: 'error',
      title: 'Página no encontrada',
      text: 'Lo sentimos, no encontramos la página que buscas.',
      button: 'Volver al inicio',
      alt: 'memoji de Jesús relajado',
    },
  },
}
