import type { YearsTemplate } from '@/lib/experience'

/** What every room hangs on its wall: the title of the piece and one sentence. */
type Room = { title: string; line: string }

type Content = {
  meta: { title: string; description: string }
  a11y: {
    skip: string
    mainNav: string
    index: string
    switchLanguage: string
    external: string
    previous: string
    next: string
  }
  /** The fixed frame around the rooms. The light switch names what it does. */
  frame: { home: string; cv: string; lightsOff: string; lightsOn: string }
  entrance: Room & { based: string; available: string }
  cv: Room & { open: string; download: string; pdf: string }
  trade: Room & {
    /** The figure that stands in the room: "+4". */
    figure: YearsTemplate
    /** The same figure spelled out for the label: "+4 years". */
    years: YearsTemplate
    roles: string
    record: string
  }
  tooling: Room & { groups: { label: string; items: string[] }[] }
  projects: Room & { here: string; all: string }
  heading: Room & {
    /** The word that stands in the room: the initials of the subject. */
    word: string
    items: { label: string; text: string }[]
  }
  portrait: Room & {
    medium: string
    photoAlt: string
    study: string
    languages: { title: string; items: { name: string; level: string }[] }
    softSkills: { title: string; items: string[] }
  }
  contact: Room & {
    items: { label: string; href: string; detail: string }[]
    builtWith: string
  }
  /** The work page: one room per role, newest first. */
  work: {
    title: string
    pageTitle: YearsTemplate
    tasks: string
    stack: string
  }
  notFound: { code: string; title: string; line: string; back: string }
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
const databases = ['PostgreSQL', 'MSSQL', 'CosmoDB', 'Stored Procedures']
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
      index: 'Salas',
      switchLanguage: 'Idioma',
      external: '(se abre en una pestaña nueva)',
      previous: 'Sala anterior',
      next: 'Sala siguiente',
    },
    frame: {
      home: 'Inicio',
      cv: 'CV',
      lightsOff: 'Apagar la luz',
      lightsOn: 'Dar la luz',
    },
    entrance: {
      title: 'Entrada',
      line: 'Backend. Lo que nadie ve y aguanta todo lo demás.',
      based: 'Elda, Alicante, España',
      available: 'Disponible',
    },
    cv: {
      title: 'CV',
      line: 'Una hoja. Sin adjetivos.',
      open: 'Abrir el CV',
      download: 'Descargar el PDF',
      pdf: '/CV_Jesus_Bonete_ES.pdf',
    },
    trade: {
      title: 'Oficio',
      line: 'De becario a senior. Tres casas, un oficio.',
      figure: { plus: '+{n}', exact: '{n}' },
      years: { plus: '+{n} años', exact: '{n} años' },
      roles: 'puestos',
      record: 'Hoja de servicios',
    },
    tooling: {
      title: 'Herramienta',
      line: 'Código limpio. El otro se paga después, y con intereses.',
      groups: [
        {
          label: 'Frameworks y librerías',
          items: frameworks('Microservicios'),
        },
        { label: 'Patrones de diseño', items: patterns },
        { label: 'Bases de datos', items: databases },
        { label: 'DevOps y Cloud', items: devops },
        { label: 'Herramientas', items: tools },
      ],
    },
    projects: {
      title: 'Proyectos',
      line: 'Código a la vista. Que cada cual juzgue.',
      here: 'estás aquí',
      all: 'Todos los repos',
    },
    heading: {
      title: 'Rumbo',
      line: 'La IA ya trabaja conmigo: Claude, Copilot. Ahora toca meterla en el backend. Con evals, no con fe.',
      word: 'IA',
      items: [
        {
          label: 'Integración de LLMs',
          text: 'Conectar modelos como Claude o GPT a servicios y APIs backend de forma segura y eficiente.',
        },
        {
          label: 'RAG y bases vectoriales',
          text: 'Búsqueda semántica con embeddings y bases de datos vectoriales para dar contexto propio a los modelos.',
        },
        {
          label: 'Agentes y tool calling',
          text: 'Orquestar agentes que invocan herramientas y APIs (function calling, MCP) para automatizar flujos.',
        },
        {
          label: 'Evaluación y observabilidad',
          text: 'Medir calidad, latencia y coste de los LLMs con evals y trazas para llevar la IA a producción con garantías.',
        },
      ],
    },
    portrait: {
      title: 'Autorretrato',
      line: 'Hierro, vida sana y airsoft los fines de semana. Cada cual descansa como sabe.',
      medium: 'Píxel sobre pantalla',
      photoAlt: 'memoji de Jesús Bonete',
      study: 'Aprendizaje',
      languages: {
        title: 'Idiomas',
        items: [
          { name: 'Español', level: 'Nativo' },
          { name: 'Inglés', level: 'B2' },
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
    },
    contact: {
      title: 'Contacto',
      line: 'El teléfono funciona. El correo, también.',
      items: [
        { label: 'Llámame', href: PHONE, detail: PHONE_TEXT },
        { label: 'Escríbeme', href: MAIL, detail: MAIL_TEXT },
        { label: 'LinkedIn', href: LINKEDIN, detail: LINKEDIN_TEXT },
        { label: 'GitHub', href: GITHUB, detail: GITHUB_TEXT },
      ],
      builtWith: 'Hecho con Astro',
    },
    work: {
      title: 'Hoja de servicios',
      pageTitle: {
        plus: 'Experiencia laboral (+{n} años)',
        exact: 'Experiencia laboral ({n} años)',
      },
      tasks: 'Cometido',
      stack: 'Herramienta',
    },
    notFound: {
      code: '404',
      title: 'Página no encontrada',
      line: 'Puerta equivocada. Detrás no hay nada.',
      back: 'Volver a la entrada',
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
      index: 'Rooms',
      switchLanguage: 'Language',
      external: '(opens in a new tab)',
      previous: 'Previous room',
      next: 'Next room',
    },
    frame: {
      home: 'Home',
      cv: 'CV',
      lightsOff: 'Lights off',
      lightsOn: 'Lights on',
    },
    entrance: {
      title: 'Entrance',
      line: 'Backend. What nobody sees, holding up everything else.',
      based: 'Elda, Alicante, Spain',
      available: 'Available',
    },
    cv: {
      title: 'CV',
      line: 'One sheet. No adjectives.',
      open: 'Open the CV',
      download: 'Download the PDF',
      pdf: '/CV_Jesus_Bonete_EN.pdf',
    },
    trade: {
      title: 'Trade',
      line: 'Intern to senior. Three firms, one trade.',
      figure: { plus: '+{n}', exact: '{n}' },
      years: { plus: '+{n} years', exact: '{n} years' },
      roles: 'roles',
      record: 'Service record',
    },
    tooling: {
      title: 'Tooling',
      line: 'Clean code. The other kind gets paid for later, with interest.',
      groups: [
        {
          label: 'Frameworks and libraries',
          items: frameworks('Microservices'),
        },
        { label: 'Design patterns', items: patterns },
        { label: 'Databases', items: databases },
        { label: 'DevOps and Cloud', items: devops },
        { label: 'Tools', items: tools },
      ],
    },
    projects: {
      title: 'Projects',
      line: 'Code in plain sight. Judge for yourself.',
      here: 'you are here',
      all: 'All repositories',
    },
    heading: {
      title: 'Heading',
      line: 'AI already works beside me: Claude, Copilot. Next it goes into the backend. On evals, not on faith.',
      word: 'AI',
      items: [
        {
          label: 'LLM integration',
          text: 'Connecting models like Claude or GPT to backend services and APIs securely and efficiently.',
        },
        {
          label: 'RAG & vector databases',
          text: 'Semantic search with embeddings and vector databases to ground models with your own data.',
        },
        {
          label: 'Agents & tool calling',
          text: 'Orchestrating agents that call tools and APIs (function calling, MCP) to automate workflows.',
        },
        {
          label: 'Evals & observability',
          text: 'Measuring quality, latency and cost of LLMs with evals and tracing to ship AI to production with confidence.',
        },
      ],
    },
    portrait: {
      title: 'Self-portrait',
      line: 'Iron, clean living and airsoft at weekends. Everyone rests the way they know.',
      medium: 'Pixel on screen',
      photoAlt: 'memoji of Jesús Bonete',
      study: 'Study',
      languages: {
        title: 'Languages',
        items: [
          { name: 'Spanish', level: 'Native' },
          { name: 'English', level: 'B2' },
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
    },
    contact: {
      title: 'Contact',
      line: 'The phone works. So does the mail.',
      items: [
        { label: 'Call me', href: PHONE, detail: PHONE_TEXT },
        { label: 'Email me', href: MAIL, detail: MAIL_TEXT },
        { label: 'LinkedIn', href: LINKEDIN, detail: LINKEDIN_TEXT },
        { label: 'GitHub', href: GITHUB, detail: GITHUB_TEXT },
      ],
      builtWith: 'Built with Astro',
    },
    work: {
      title: 'Service record',
      pageTitle: {
        plus: 'Work experience (+{n} years)',
        exact: 'Work experience ({n} years)',
      },
      tasks: 'Duties',
      stack: 'Tooling',
    },
    notFound: {
      code: '404',
      title: 'Page not found',
      line: 'Wrong door. Nothing behind it.',
      back: 'Back to the entrance',
    },
  },
}
