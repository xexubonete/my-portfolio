import type { YearsTemplate } from '@/lib/experience'

/** A label with its emoji kept apart; the design renders labels without it. */
type Labelled = { emoji: string; label: string }

type Content = {
  meta: { title: string; description: string }
  a11y: {
    skip: string
    mainNav: string
    toggleTheme: string
    switchLanguage: string
    external: string
    openCv: string
    cvPreview: string
  }
  nav: { brand: string; home: string }
  intro: {
    eyebrow: string
    /** The name, one line per word, so the surname can be set in orange. */
    name: [string, string]
    /** The first sentence, set as the lead. */
    lead: string
    /** The rest of the introduction, flowed in columns. */
    paragraphs: string[]
    photoAlt: string
  }
  /** The title block under the name: the fields of a drawing's corner box. */
  titleBlock: {
    role: string
    based: string
    basedValue: string
    experience: string
    status: string
    available: string
  }
  /** Headline items of the stack, looping on the tape. */
  tape: string[]
  experience: {
    title: YearsTemplate
    pageTitle: YearsTemplate
    /** The bare figure: "+4 years". */
    years: YearsTemplate
    sectionTitle: string
    pageLead: string
    roles: string
    viewMore: string
    stack: string
    eyebrow: string
    back: string
  }
  skills: {
    title: string
    groups: (Labelled & { items: string[] })[]
  }
  projects: { title: string; here: string; all: string }
  about: { title: string; paragraphs: string[] }
  goals: {
    title: string
    meta: string
    intro: string
    items: (Labelled & { text: string })[]
  }
  softSkills: { title: string; items: string[] }
  languages: { title: string; items: { name: string; level: string }[] }
  study: { title: string }
  profile: { title: string; meta: string }
  quote: { text: string; accent: string; author: string }
  cv: { title: string; caption: string; download: string }
  contact: {
    title: string
    meta: string
    items: (Labelled & { href: string; detail: string })[]
    photoAlt: string
  }
  footer: { builtWith: string }
  notFound: {
    eyebrow: string
    code: string
    title: string
    body: string
    back: string
    photoAlt: string
  }
}

const frameworks = (microservices: string) => [
  'C#',
  'SQL',
  '.NET',
  '.NET Core 3.1',
  '.NET Framework 4.8',
  'REST APIs',
  'gRPC',
  'RabbitMQ',
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
const databases = [
  'PostgreSQL',
  'SQL Server',
  'Azure Cosmos DB',
  'Stored Procedures',
]
const devops = [
  'Azure',
  'Azure Blob Storage',
  'Azure DevOps',
  'Pipelines',
  'CI/CD',
  'Jenkins',
  'Git',
  'GitHub',
]
const tools = ['Postman', 'Bruno', 'Team Explorer']

const quote = {
  text: 'The only way to go fast, is to go well.',
  accent: 'go well.',
  author: 'Robert C. Martin',
}

const tape = [
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
  'SQL Server',
  'PostgreSQL',
  'Azure Cosmos DB',
  'Claude',
  'GitHub Copilot',
]

const PHONE = 'tel:+34722243881'
const PHONE_TEXT = '+34 722 243 881'
const MAIL = 'mailto:xexubonete@gmail.com'
const MAIL_TEXT = 'xexubonete@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/jesus-bonete-sanchez/'
const LINKEDIN_TEXT = 'jesus-bonete-sanchez'
const GITHUB = 'https://github.com/xexubonete'
const GITHUB_TEXT = 'xexubonete'

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
      switchLanguage: 'Idioma',
      external: '(se abre en una pestaña nueva)',
      openCv: 'Abrir el CV',
      cvPreview: 'Vista previa del CV',
    },
    nav: { brand: 'dotnet developer', home: 'Inicio' },
    intro: {
      eyebrow: 'bienvenido',
      name: ['Jesús', 'Bonete'],
      lead: 'Hola, soy <b>Jesús Bonete</b>, desarrollador backend enfocado en crear aplicaciones eficientes y escalables.',
      paragraphs: [
        'Me especializo en servicios robustos y seguros, optimización de bases de datos e integración impecable con el frontend desde el servidor. La IA es el núcleo de mi forma de trabajar: la integro en mi día a día para desarrollar más rápido, automatizar tareas repetitivas y elevar la calidad del código sin sacrificar buenas prácticas.',
        'Saco el máximo partido de LLMs, agentes y asistentes como Claude o GitHub Copilot para acelerar cada fase, de la arquitectura al despliegue, tomando mejores decisiones en menos tiempo. Cuido el código limpio, la arquitectura sólida y el crecimiento en cada proyecto. Apasionado de la tecnología, siempre busco nuevos retos.',
      ],
      photoAlt: 'memoji de Jesús Bonete',
    },
    titleBlock: {
      role: 'Puesto',
      based: 'Ubicación',
      basedValue: 'Elda, Alicante, España',
      experience: 'Experiencia',
      status: 'Estado',
      available: 'Disponible',
    },
    tape,
    experience: {
      title: { plus: 'Experiencia (+{n}a)', exact: 'Experiencia ({n}a)' },
      pageTitle: {
        plus: 'Experiencia laboral (+{n} años)',
        exact: 'Experiencia laboral ({n} años)',
      },
      years: { plus: '+{n} años', exact: '{n} años' },
      sectionTitle: 'Experiencia',
      pageLead: 'Experiencia laboral',
      roles: 'puestos',
      viewMore: 'Ver más',
      stack: 'Stack:',
      eyebrow: '01 — Experiencia',
      back: 'Volver al inicio',
    },
    skills: {
      title: 'Stack',
      groups: [
        {
          emoji: '📚',
          label: 'Frameworks y librerías',
          items: frameworks('Microservicios'),
        },
        { emoji: '🧑‍🎨', label: 'Patrones de diseño', items: patterns },
        { emoji: '📊', label: 'Bases de datos', items: databases },
        { emoji: '☁️', label: 'DevOps y Cloud', items: devops },
        { emoji: '🧰', label: 'Herramientas', items: tools },
      ],
    },
    projects: {
      title: 'Proyectos',
      here: 'estás aquí',
      all: 'Todos los repos',
    },
    about: {
      title: 'Sobre mí',
      paragraphs: [
        'Mas allá de la programación, me apasiona entrenar🏋️‍♂️ y llevar una vida saludable🍏.',
        'Otra afición que practico es jugar a airsoft🎖️ los fines de semana.',
      ],
    },
    goals: {
      title: 'Objetivos',
      meta: 'IA en el backend',
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
    profile: { title: 'Perfil', meta: 'sobre mí · idiomas' },
    quote,
    cv: {
      title: 'CV',
      caption: 'Vista previa de mi CV — haz clic para verlo y descargarlo',
      download: 'Ver y descargar CV',
    },
    contact: {
      title: 'Contacto',
      meta: 'hablemos',
      items: [
        { emoji: '🤙', label: 'Llámame', href: PHONE, detail: PHONE_TEXT },
        { emoji: '📧', label: 'Escríbeme', href: MAIL, detail: MAIL_TEXT },
        {
          emoji: '👔',
          label: 'LinkedIn',
          href: LINKEDIN,
          detail: LINKEDIN_TEXT,
        },
        { emoji: '🎖️', label: 'GitHub', href: GITHUB, detail: GITHUB_TEXT },
      ],
      photoAlt: 'memoji de Jesús relajado',
    },
    footer: { builtWith: 'Hecho con Astro' },
    notFound: {
      eyebrow: 'error',
      code: '404',
      title: 'Página no encontrada',
      body: 'Lo sentimos, no encontramos la página que buscas.',
      back: 'Volver al inicio',
      photoAlt: 'memoji de Jesús relajado',
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
      mainNav: 'Primary',
      toggleTheme: 'Toggle theme',
      switchLanguage: 'Language',
      external: '(opens in a new tab)',
      openCv: 'Open the CV',
      cvPreview: 'CV preview',
    },
    nav: { brand: 'dotnet developer', home: 'Home' },
    intro: {
      eyebrow: 'welcome',
      name: ['Jesús', 'Bonete'],
      lead: "Hi, I'm <b>Jesús Bonete</b>, a backend dev focused on building efficient and scalable applications.",
      paragraphs: [
        'I specialize in robust, secure services, database optimization and seamless integration with the frontend from the server side. AI is at the core of how I work: I weave it into my daily workflow to build faster, automate repetitive tasks and raise code quality without compromising best practices.',
        "I make the most of LLMs, agents and assistants like Claude or GitHub Copilot to speed up every phase, from architecture to deployment, making better decisions in less time. I care about clean code, solid architecture and growing with every project. Passionate about technology, I'm always after new challenges.",
      ],
      photoAlt: 'memoji of Jesús Bonete',
    },
    titleBlock: {
      role: 'Role',
      based: 'Based',
      basedValue: 'Elda, Alicante, Spain',
      experience: 'Experience',
      status: 'Status',
      available: 'Available',
    },
    tape,
    experience: {
      title: { plus: 'Experience (+{n}yr)', exact: 'Experience ({n}yr)' },
      pageTitle: {
        plus: 'Work experience (+{n} years)',
        exact: 'Work experience ({n} years)',
      },
      years: { plus: '+{n} years', exact: '{n} years' },
      sectionTitle: 'Experience',
      pageLead: 'Work experience',
      roles: 'roles',
      viewMore: 'View more',
      stack: 'Stack:',
      eyebrow: '01 — Experience',
      back: 'Back home',
    },
    skills: {
      title: 'Stack',
      groups: [
        {
          emoji: '📚',
          label: 'Frameworks and libraries',
          items: frameworks('Microservices'),
        },
        { emoji: '🧑‍🎨', label: 'Design patterns', items: patterns },
        { emoji: '📊', label: 'Databases', items: databases },
        { emoji: '☁️', label: 'DevOps and Cloud', items: devops },
        { emoji: '🧰', label: 'Tools', items: tools },
      ],
    },
    projects: {
      title: 'Projects',
      here: 'you are here',
      all: 'All repositories',
    },
    about: {
      title: 'About me',
      paragraphs: [
        "Beyond coding, I'm passionate about the gym 🏋️‍♂️ and living a healthy lifestyle 🍏.",
        'Another hobby of mine is playing airsoft 🎖️ on weekends.',
      ],
    },
    goals: {
      title: 'Goals',
      meta: 'AI in the backend',
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
    profile: { title: 'Profile', meta: 'about · languages' },
    quote,
    cv: {
      title: 'CV',
      caption: 'Preview of my resume — click to view and download',
      download: 'View & download CV',
    },
    contact: {
      title: 'Contact',
      meta: "let's talk",
      items: [
        { emoji: '🤙', label: 'Call me', href: PHONE, detail: PHONE_TEXT },
        { emoji: '📧', label: 'Email me', href: MAIL, detail: MAIL_TEXT },
        {
          emoji: '👔',
          label: 'LinkedIn',
          href: LINKEDIN,
          detail: LINKEDIN_TEXT,
        },
        { emoji: '🎖️', label: 'GitHub', href: GITHUB, detail: GITHUB_TEXT },
      ],
      photoAlt: 'memoji of Jesús taking it easy',
    },
    footer: { builtWith: 'Built with Astro' },
    notFound: {
      eyebrow: 'error',
      code: '404',
      title: 'Page not found',
      body: "Sorry, we couldn't find the page you're looking for.",
      back: 'Go back home',
      photoAlt: 'memoji of Jesús taking it easy',
    },
  },
}
