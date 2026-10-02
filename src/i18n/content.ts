import type { YearsTemplate } from '@/lib/experience'

/** A label with its emoji kept apart, so the emoji can be hidden from readers. */
type Labelled = { emoji: string; label: string }

type Content = {
  meta: { title: string; description: string }
  a11y: {
    skip: string
    mainNav: string
    toggleTheme: string
    switchLanguage: string
    external: string
  }
  /** Name of the other language, shown in the language switch. */
  nav: {
    brand: string
    home: string
    experience: string
    skills: string
    projects: string
    about: string
    contact: string
  }
  intro: {
    eyebrow: string
    name: string
    paragraphs: string[]
    photoAlt: string
  }
  lastRole: { title: string; available: string }
  experience: {
    title: YearsTemplate
    pageTitle: YearsTemplate
    viewMore: string
    stack: string
  }
  skills: {
    title: string
    groups: (Labelled & { items: string[] })[]
  }
  projects: { title: string; here: string }
  about: { title: string; paragraphs: string[] }
  goals: {
    title: string
    intro: string
    items: (Labelled & { text: string })[]
  }
  softSkills: { title: string; items: string[] }
  languages: { title: string; items: { name: string; level: string }[] }
  study: { title: string }
  quote: { text: string; author: string }
  cv: { title: string; caption: string; download: string }
  contact: {
    title: string
    items: (Labelled & { href: string })[]
    photoAlt: string
  }
  notFound: { code: string; title: string; body: string; back: string }
}

const frameworks = (microservices: string) => [
  'C#',
  'SQL',
  '.NET',
  '.NET Core 3.1',
  '.NET Framework 4.8',
  'REST APIs',
  'gRPC',
  microservices,
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
]
const patterns = [
  'Clean Architecture',
  'DDD Domain-Driven Design',
  'CQRS',
  'MediatR pattern',
  'Repository',
  'Unit of Work',
]
const databases = ['PostgreSQL', 'MSSQL', 'CosmoDB', 'Stored Procedures']
const devops = [
  'Azure',
  'Azure Blob Storage',
  'Azure DevOps',
  'Pipelines',
  'CI/CD',
  'Jenkins',
  'Git',
]
const tools = ['Postman', 'Bruno', 'Team Explorer']

const quote = {
  text: 'The only way to go fast, is to go well.',
  author: 'Robert C. Martin',
}

const PHONE = 'tel:+34722243881'
const MAIL = 'mailto:xexubonete@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/jesus-bonete-sanchez/'
const GITHUB = 'https://github.com/xexubonete'

export const CONTENT: Record<'es' | 'en', Content> = {
  es: {
    meta: {
      title: 'Jesús Bonete - Portfolio',
      description:
        'Jesús Bonete - Portfolio, Proyectos, CV, Sobre Mí, Contacto, Disponible, Experiencia, Estudios',
    },
    a11y: {
      skip: 'Saltar al contenido',
      mainNav: 'Principal',
      toggleTheme: 'Cambiar tema',
      switchLanguage: 'Cambiar idioma',
      external: '(se abre en una pestaña nueva)',
    },
    nav: {
      brand: 'dotnet developer',
      home: 'Inicio',
      experience: 'Experiencia',
      skills: 'Habilidades',
      projects: 'Proyectos',
      about: 'Sobre mí',
      contact: 'Contacto',
    },
    intro: {
      eyebrow: 'bienvenido',
      name: 'Jesús Bonete',
      paragraphs: [
        'Hola, soy <strong>Jesús Bonete</strong>, desarrollador backend enfocado en crear aplicaciones eficientes y escalables. Me especializo en servicios robustos y seguros, optimización de bases de datos e integración impecable con el frontend desde el servidor. La IA es el núcleo de mi forma de trabajar: la integro en mi día a día para desarrollar más rápido, automatizar tareas repetitivas y elevar la calidad del código sin sacrificar buenas prácticas. Saco el máximo partido de LLMs, agentes y asistentes como Claude o GitHub Copilot para acelerar cada fase, de la arquitectura al despliegue, tomando mejores decisiones en menos tiempo.',
        'Cuido el código limpio, la arquitectura sólida y el crecimiento en cada proyecto. Apasionado de la tecnología, siempre busco nuevos retos.',
      ],
      photoAlt: 'memoji de Jesús Bonete',
    },
    lastRole: { title: 'Último trabajo', available: 'Disponible' },
    experience: {
      title: { plus: 'Experiencia (+{n}a)', exact: 'Experiencia ({n}a)' },
      pageTitle: {
        plus: 'Experiencia laboral (+{n} años)',
        exact: 'Experiencia laboral ({n} años)',
      },
      viewMore: 'Ver más',
      stack: 'Stack:',
    },
    skills: {
      title: 'Habilidades',
      groups: [
        {
          emoji: '📚',
          label: 'Frameworks y librerías:',
          items: frameworks('Microservicios'),
        },
        { emoji: '🧑‍🎨', label: 'Patrones de diseño:', items: patterns },
        { emoji: '📊', label: 'Bases de datos:', items: databases },
        { emoji: '☁️', label: 'DevOps y Cloud:', items: devops },
        { emoji: '🧰', label: 'Herramientas:', items: tools },
      ],
    },
    projects: { title: 'Proyectos', here: 'Estás aquí' },
    about: {
      title: 'Sobre mí',
      paragraphs: [
        'Mas allá de la programación, me apasiona entrenar🏋️‍♂️ y llevar una vida saludable🍏.',
        'Otra afición que practico es jugar a airsoft🎖️ los fines de semana.',
      ],
    },
    goals: {
      title: 'Objetivos',
      intro:
        'Quiero especializarme en integrar la IA en el backend, dominando:',
      items: [
        {
          emoji: '🤖',
          label: 'Integración de LLMs',
          text: 'Conectar modelos como Claude o GPT a servicios y APIs backend de forma segura y eficiente.',
        },
        {
          emoji: '🧠',
          label: 'RAG y bases vectoriales',
          text: 'Búsqueda semántica con embeddings y bases de datos vectoriales para dar contexto propio a los modelos.',
        },
        {
          emoji: '🛠️',
          label: 'Agentes y tool calling',
          text: 'Orquestar agentes que invocan herramientas y APIs (function calling, MCP) para automatizar flujos.',
        },
        {
          emoji: '📊',
          label: 'Evaluación y observabilidad',
          text: 'Medir calidad, latencia y coste de los LLMs con evals y trazas para llevar la IA a producción con garantías.',
        },
      ],
    },
    softSkills: {
      title: 'Soft skills',
      items: [
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
    languages: {
      title: 'Idiomas',
      items: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'B2' },
      ],
    },
    study: { title: 'Aprendizaje' },
    quote,
    cv: {
      title: 'CV',
      caption: 'Vista previa de mi CV — haz clic para verlo y descargarlo',
      download: 'Ver y descargar CV',
    },
    contact: {
      title: 'Contacto',
      items: [
        { emoji: '🤙', label: 'Llámame', href: PHONE },
        { emoji: '📧', label: 'Escríbeme', href: MAIL },
        { emoji: '👔', label: 'LinkedIn', href: LINKEDIN },
        { emoji: '🎖️', label: 'Github', href: GITHUB },
      ],
      photoAlt: 'memoji de Jesús tomándoselo con calma',
    },
    notFound: {
      code: '404',
      title: 'Página no encontrada',
      body: 'Lo sentimos, no hemos encontrado la página que buscas.',
      back: 'Volver al inicio',
    },
  },
  en: {
    meta: {
      title: 'Jesús Bonete - Portfolio',
      description:
        'Jesús Bonete - Portfolio, Projects, CV, About Me, Contact, Available, Experience, Study',
    },
    a11y: {
      skip: 'Skip to content',
      mainNav: 'Main',
      toggleTheme: 'Toggle theme',
      switchLanguage: 'Switch language',
      external: '(opens in a new tab)',
    },
    nav: {
      brand: 'dotnet developer',
      home: 'Home',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      about: 'About me',
      contact: 'Contact',
    },
    intro: {
      eyebrow: 'welcome',
      name: 'Jesús Bonete',
      paragraphs: [
        "Hi, I'm <strong>Jesús Bonete</strong>, a backend dev focused on building efficient and scalable applications. I specialize in robust, secure services, database optimization and seamless integration with the frontend from the server side. AI is at the core of how I work: I weave it into my daily workflow to build faster, automate repetitive tasks and raise code quality without compromising best practices. I make the most of LLMs, agents and assistants like Claude or GitHub Copilot to speed up every phase, from architecture to deployment, making better decisions in less time.",
        "I care about clean code, solid architecture and growing with every project. Passionate about technology, I'm always after new challenges.",
      ],
      photoAlt: 'memoji of Jesús Bonete',
    },
    lastRole: { title: 'Last role', available: 'Available' },
    experience: {
      title: { plus: 'Experience (+{n}yr)', exact: 'Experience ({n}yr)' },
      pageTitle: {
        plus: 'Work experience (+{n} years)',
        exact: 'Work experience ({n} years)',
      },
      viewMore: 'View More',
      stack: 'Stack:',
    },
    skills: {
      title: 'Skills',
      groups: [
        {
          emoji: '📚',
          label: 'Frameworks and Libraries:',
          items: frameworks('Microservices'),
        },
        { emoji: '🧑‍🎨', label: 'Design Patterns:', items: patterns },
        { emoji: '📊', label: 'Databases:', items: databases },
        { emoji: '☁️', label: 'DevOps and Cloud:', items: devops },
        { emoji: '🧰', label: 'Tools:', items: tools },
      ],
    },
    projects: { title: 'Projects', here: 'You are here' },
    about: {
      title: 'About me',
      paragraphs: [
        "Beyond coding, I'm passionate about the gym 🏋️‍♂️ and living a healthy lifestyle 🍏.",
        'Another hobby of mine is playing airsoft 🎖️ on weekends.',
      ],
    },
    goals: {
      title: 'Goals',
      intro:
        'I want to specialize in integrating AI into the backend, mastering:',
      items: [
        {
          emoji: '🤖',
          label: 'LLM integration',
          text: 'Connecting models like Claude or GPT to backend services and APIs securely and efficiently.',
        },
        {
          emoji: '🧠',
          label: 'RAG & vector databases',
          text: 'Semantic search with embeddings and vector databases to ground models with your own data.',
        },
        {
          emoji: '🛠️',
          label: 'Agents & tool calling',
          text: 'Orchestrating agents that call tools and APIs (function calling, MCP) to automate workflows.',
        },
        {
          emoji: '📊',
          label: 'Evals & observability',
          text: 'Measuring quality, latency and cost of LLMs with evals and tracing to ship AI to production with confidence.',
        },
      ],
    },
    softSkills: {
      title: 'Soft skills',
      items: [
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
    languages: {
      title: 'Languages',
      items: [
        { name: 'Spanish', level: 'Native' },
        { name: 'English', level: 'B2' },
      ],
    },
    study: { title: 'Study' },
    quote,
    cv: {
      title: 'CV',
      caption: 'Preview of my resume — click to view and download',
      download: 'View & download CV',
    },
    contact: {
      title: 'Contact',
      items: [
        { emoji: '🤙', label: 'Call me', href: PHONE },
        { emoji: '📧', label: 'Email me', href: MAIL },
        { emoji: '👔', label: 'LinkedIn', href: LINKEDIN },
        { emoji: '🎖️', label: 'Github', href: GITHUB },
      ],
      photoAlt: 'memoji of Jesús taking it easy',
    },
    notFound: {
      code: '404',
      title: 'Page not found',
      body: "Sorry, we couldn't find the page you're looking for.",
      back: 'Go back home',
    },
  },
}
