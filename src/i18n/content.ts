import type { YearsTemplate } from '@/lib/experience'

/** What every chapter opens with: its ordinal, its title and its argument. */
type Chapter = {
  /** "Chapter the First". */
  word: string
  title: string
  /** The one-line summary old novels put under a chapter title. */
  argument: string
}

/**
 * Running prose. Paragraphs are HTML (they carry links); the first one opens
 * with a drop cap and its first words, `leadIn`, are set in small capitals.
 */
type Prose = { leadIn: string; paragraphs: string[] }

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
    pager: string
  }
  nav: { brand: string; contents: string; cv: string; home: string }
  /** The title page, worded like the title page of an old printed account. */
  cover: {
    overline: string
    name: [string, string]
    /** What follows the name, around the years-of-service figure. */
    subtitle: [string, string]
    years: YearsTemplate
    status: string
    /** "At Elda, Alicante"; the year is added in Roman numerals. */
    imprint: string
    begin: string
    cv: string
    plateCaption: string
    photoAlt: string
  }
  epigraph: { text: string; author: string }
  contents: {
    title: string
    note: string
    keys: string
    /** The entry that leads to the detailed work page. */
    work: string
    /** What stands where that entry's page number would be. */
    workNote: string
  }
  author: Chapter &
    Prose & {
      sheet: {
        role: string
        based: string
        basedValue: string
        experience: string
        status: string
        available: string
      }
    }
  campaigns: Chapter & {
    leadIn: string
    /** `roles` indexes the experience list: those roles annotate the margin. */
    paragraphs: { text: string; roles: number[] }[]
    more: string
  }
  arms: Chapter & Prose & { groups: { label: string; items: string[] }[] }
  course: Chapter & Prose & { items: { label: string; text: string }[] }
  offDuty: Chapter &
    Prose & {
      languages: { title: string; items: { name: string; level: string }[] }
      softSkills: { title: string; items: string[] }
      projects: { title: string; here: string; all: string }
    }
  contact: Chapter &
    Prose & {
      items: { label: string; href: string; detail: string }[]
      colophon: string
      photoAlt: string
    }
  cv: Chapter &
    Prose & {
      view: string
      pdfEs: string
      pdfEn: string
      plateCaption: string
    }
  experience: {
    pageTitle: YearsTemplate
    /** The bare figure: "+4 years". */
    years: YearsTemplate
  }
  /** The work page: the campaigns again, this time with nothing left out. */
  work: Chapter & {
    /** Ordinals for the campaigns, oldest first: "First campaign", ... */
    ordinals: string[]
    stack: string
    back: string
  }
  footer: { builtWith: string }
  notFound: {
    word: string
    code: string
    title: string
    body: string
    back: string
    photoAlt: string
  }
}

/** A link out of the book: always a new tab, never a window.opener. */
const ext = (href: string, label: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`

const DAW =
  'https://todofp.es/que-estudiar/loe/informatica-comunicaciones/des-aplicaciones-web.html'
const DOMETRAIN = 'https://dometrain.com/'
const UDEMY = 'https://www.udemy.com/'

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

const quote = {
  text: 'The only way to go fast, is to go well.',
  author: 'Robert C. Martin',
}

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
      toggleTheme: 'Cambiar entre la luz del día y la de la vela',
      switchLanguage: 'Idioma',
      external: '(se abre en una pestaña nueva)',
      openCv: 'Abrir el CV',
      cvPreview: 'Vista previa del CV',
      pager: 'Pasar página',
    },
    nav: {
      brand: 'Jesús Bonete',
      contents: 'Índice',
      cv: 'CV',
      home: 'Portada',
    },
    cover: {
      overline: 'Relación verdadera de las campañas, armas y propósitos de',
      name: ['Jesús', 'Bonete'],
      subtitle: [
        'desarrollador backend, vecino de Elda, con ',
        ' al servicio de .NET',
      ],
      years: { plus: 'más de {n} años', exact: '{n} años' },
      status: 'Disponible para nueva campaña',
      imprint: 'En Elda, Alicante',
      begin: 'Comenzar la lectura',
      cv: 'Hoja de servicios · CV',
      plateCaption: 'El autor. Aguafuerte, a partir de un memoji.',
      photoAlt: 'Retrato grabado de Jesús Bonete, asomado tras un portátil',
    },
    epigraph: quote,
    contents: {
      title: 'Índice',
      note: 'De lo que en este libro se contiene',
      keys: 'Las flechas del teclado pasan página.',
      work: 'Las campañas, por extenso',
      workNote: 'tomo II',
    },
    author: {
      word: 'Capítulo primero',
      title: 'Del autor y de su oficio',
      argument:
        'Donde se presenta a Jesús Bonete, desarrollador backend, y se explica qué hace un hombre en una sala de máquinas.',
      leadIn: 'Jesús Bonete',
      paragraphs: [
        'Jesús Bonete es desarrollador backend. Dicho así no parece gran cosa, y quizá por eso conviene explicarlo. El backend es la sala de máquinas: el sitio donde nadie mira mientras todo funciona, y donde miran todos cuando deja de hacerlo. Él trabaja ahí. Construye servicios robustos y seguros, afina bases de datos hasta que responden a la primera y cuida que lo que sale del servidor encaje con el frontend sin costuras.',
        'No presume de velocidad. La practica, que es distinto. Tiene la inteligencia artificial por herramienta de diario —LLMs, agentes, asistentes como Claude o GitHub Copilot— y la usa de la arquitectura al despliegue: para ir más rápido, para quitarse de encima lo repetitivo y para subir la calidad del código sin faltar a las buenas prácticas, que es donde suelen torcerse estas cosas.',
        'Lo demás es oficio. Código limpio, arquitectura sólida y la costumbre de salir de cada proyecto sabiendo algo más que al entrar. Le apasiona la tecnología. Y busca, siempre, el siguiente reto.',
      ],
      sheet: {
        role: 'Oficio',
        based: 'Plaza',
        basedValue: 'Elda, Alicante, España',
        experience: 'Antigüedad',
        status: 'Estado',
        available: 'Disponible',
      },
    },
    campaigns: {
      word: 'Capítulo segundo',
      title: 'De las campañas',
      argument:
        'Donde se cuenta cómo entró de prácticas por Alicante y salió sénior por Barcelona, con lo que hubo en medio.',
      leadIn: 'Empezó en febrero',
      paragraphs: [
        {
          text: 'Empezó en febrero de 2022, en Alicante, de prácticas en NTT DATA. Tres meses y una API en .NET para una aplicación de parques eólicos. No era Lepanto, pero por algún sitio se empieza. Se quedó. De júnior le tocó lo que toca a los júniores: ASP clásico, scripts de SQL y los literales de idioma de una aplicación web del sector de combustibles. Trabajo sin gloria, de ese que enseña más que la gloria.',
          roles: [4, 3],
        },
        {
          text: 'A finales de 2023 le dieron un correctivo entero para él solo: el de una importante empresa de energías renovables. Solo quiere decir solo. Analizar, programar, desplegar, validar y, además, dar la cara ante el cliente. Aún le sobró para proponer evolutivos.',
          roles: [2],
        },
        {
          text: 'En mayo de 2024 pasó a Savia, de Berger-Levrault, en Madrid: recursos humanos para la administración pública. Año y medio largo de evolutivos y funcionalidades nuevas, de consultas a base de datos que tardaban y dejaron de tardar, de bugs, de tests de varias clases y de buenas prácticas. Allí empezó a trabajar con GitHub Copilot al lado.',
          roles: [1],
        },
        {
          text: 'Y en enero de 2026, Cafler, en Barcelona, ya de sénior: un sistema operativo con IA para el sector de la automoción y los servicios backend de un marketplace de servicios del automóvil. Microservicios, gRPC, y Claude y Copilot sobre la mesa de trabajo. Hasta septiembre de ese año.',
          roles: [0],
        },
      ],
      more: 'La relación completa, empresa por empresa',
    },
    arms: {
      word: 'Capítulo tercero',
      title: 'De las armas',
      argument:
        'Que trata de las herramientas con que trabaja, puestas en inventario como se hace con la pólvora.',
      leadIn: 'Un oficio',
      paragraphs: [
        'Un oficio se conoce por sus herramientas, y a un hombre por cómo las tiene. Estas son las suyas, puestas en lista. No están todas las que existen. Están las que ha usado.',
      ],
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
    course: {
      word: 'Capítulo cuarto',
      title: 'Del rumbo',
      argument:
        'Donde se declara adónde va: a meter la inteligencia artificial en el backend, y por qué orden.',
      leadIn: 'Tiene decidido',
      paragraphs: [
        'Tiene decidido el rumbo: especializarse en integrar la inteligencia artificial en el backend. No como adorno ni como moda, que de eso ya hay bastante, sino como oficio. Para eso se ha propuesto dominar cuatro cosas, y las dice por su orden.',
      ],
      items: [
        {
          label: 'Integración de LLMs',
          text: 'Conectar modelos como Claude o GPT a servicios y APIs backend. Con seguridad y con eficiencia, que la una sin la otra no sirve de nada.',
        },
        {
          label: 'RAG y bases vectoriales',
          text: 'Búsqueda semántica con embeddings y bases de datos vectoriales, para que los modelos hablen con contexto propio y no de oídas.',
        },
        {
          label: 'Agentes y tool calling',
          text: 'Orquestar agentes que invocan herramientas y APIs —function calling, MCP— hasta que los flujos de trabajo anden solos.',
        },
        {
          label: 'Evaluación y observabilidad',
          text: 'Medir calidad, latencia y coste de los LLMs con evals y trazas. A producción se va con garantías, o no se va.',
        },
      ],
    },
    offDuty: {
      word: 'Capítulo quinto',
      title: 'Del hombre fuera de filas',
      argument:
        'Que trata del gimnasio, del airsoft, de los idiomas y de otros papeles sueltos.',
      leadIn: 'Fuera del teclado',
      paragraphs: [
        'Fuera del teclado, entrena. Le apasionan el gimnasio y la vida sana, que es otra forma de disciplina y no sale en ningún repositorio. Los fines de semana juega al airsoft. Cada cual descansa como sabe.',
        `Estudió ${ext(DAW, 'Desarrollo de Aplicaciones Web')}, lo que llaman DAW, entre 2020 y 2022. El resto lo ha ido aprendiendo después y por su cuenta: en ${ext(DOMETRAIN, 'Dometrain')}, en ${ext(UDEMY, 'Udemy')} y en los libros. Sigue en ello.`,
      ],
      languages: {
        title: 'Idiomas',
        items: [
          { name: 'Español', level: 'Nativo' },
          { name: 'Inglés', level: 'B2' },
        ],
      },
      softSkills: {
        title: 'Prendas (hoy, soft skills)',
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
      projects: {
        title: 'Papeles sueltos, en GitHub',
        here: 'este mismo libro',
        all: 'Todos los repositorios',
      },
    },
    contact: {
      word: 'Capítulo sexto y último',
      title: 'De las señas',
      argument: 'Donde se dice cómo dar con él, que es a lo que venía usted.',
      leadIn: 'Está disponible',
      paragraphs: [
        'Está disponible. Si tiene usted un backend que levantar, o uno que enderezar, estas son sus señas. Escriba, llame o búsquelo donde se busca hoy a la gente. Contesta.',
      ],
      items: [
        { label: 'De viva voz', href: PHONE, detail: PHONE_TEXT },
        { label: 'Por escrito', href: MAIL, detail: MAIL_TEXT },
        { label: 'LinkedIn', href: LINKEDIN, detail: LINKEDIN_TEXT },
        { label: 'GitHub', href: GITHUB, detail: GITHUB_TEXT },
      ],
      colophon:
        'Se compuso este libro con Astro, en tipos Fell y Garamond. No lleva servidor y apenas lleva JavaScript.',
      photoAlt: 'Grabado de Jesús Bonete en reposo, con las manos abiertas',
    },
    cv: {
      word: 'Apéndice',
      title: 'Hoja de servicios',
      argument: 'Que es el currículum: una página, sin literatura.',
      leadIn: 'Lo anterior',
      paragraphs: [
        'Lo anterior es la novela. Esto es el expediente: una hoja, con sus fechas, sus empresas y sus herramientas, sin un adjetivo de más. Es lo que se manda a quien no tiene tiempo para capítulos, y hace bien en no tenerlo.',
      ],
      view: 'Abrir la hoja',
      pdfEs: 'PDF en español',
      pdfEn: 'PDF en inglés',
      plateCaption: 'La hoja de servicios, en facsímil.',
    },
    experience: {
      pageTitle: {
        plus: 'Experiencia laboral (+{n} años)',
        exact: 'Experiencia laboral ({n} años)',
      },
      years: { plus: '+{n} años', exact: '{n} años' },
    },
    work: {
      word: 'Relación por extenso',
      title: 'Las campañas',
      argument:
        'Donde se detalla, empresa por empresa, qué hizo, cuándo y con qué herramientas.',
      ordinals: [
        'Campaña primera',
        'Campaña segunda',
        'Campaña tercera',
        'Campaña cuarta',
        'Campaña quinta',
      ],
      stack: 'Armas y pertrechos',
      back: 'Volver al libro',
    },
    footer: { builtWith: 'Compuesto con Astro' },
    notFound: {
      word: 'Página arrancada',
      code: '404',
      title: 'Aquí falta una hoja',
      body: 'Esta página no existe. O existió y alguien la arrancó, que con los libros nunca se sabe. El resto del volumen sigue entero.',
      back: 'Volver a la portada',
      photoAlt: 'Grabado de Jesús Bonete en reposo, con las manos abiertas',
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
      toggleTheme: 'Switch between daylight and candlelight',
      switchLanguage: 'Language',
      external: '(opens in a new tab)',
      openCv: 'Open the CV',
      cvPreview: 'CV preview',
      pager: 'Turn the page',
    },
    nav: {
      brand: 'Jesús Bonete',
      contents: 'Contents',
      cv: 'CV',
      home: 'Title page',
    },
    cover: {
      overline: 'A true relation of the campaigns, arms and intentions of',
      name: ['Jesús', 'Bonete'],
      subtitle: [
        'backend developer, resident of Elda, with ',
        ' in the service of .NET',
      ],
      years: { plus: 'more than {n} years', exact: '{n} years' },
      status: 'Available for a new campaign',
      imprint: 'At Elda, Alicante',
      begin: 'Begin reading',
      cv: 'Service record · CV',
      plateCaption: 'The author. Etching, after a memoji.',
      photoAlt: 'Engraved portrait of Jesús Bonete, peering over a laptop',
    },
    epigraph: quote,
    contents: {
      title: 'Contents',
      note: 'Of what this book contains',
      keys: 'The arrow keys turn the page.',
      work: 'The campaigns, at length',
      workNote: 'vol. II',
    },
    author: {
      word: 'Chapter the First',
      title: 'Of the author and his trade',
      argument:
        'In which Jesús Bonete, backend developer, is introduced, and it is explained what a man does in an engine room.',
      leadIn: 'Jesús Bonete',
      paragraphs: [
        'Jesús Bonete is a backend developer. Put like that it does not sound like much, which is reason enough to explain it. The backend is the engine room: the place nobody looks at while everything works, and everybody looks at the moment it stops. That is where he works. He builds robust, secure services, tunes databases until they answer the first time, and sees that whatever leaves the server meets the frontend without a seam.',
        'He does not boast about speed. He practises it, which is another matter. Artificial intelligence is his everyday tool —LLMs, agents, assistants such as Claude or GitHub Copilot— and he uses it from architecture to deployment: to build faster, to get the repetitive work off his hands, and to raise the quality of the code without betraying good practice, which is where these things usually go wrong.',
        'The rest is craft. Clean code, solid architecture, and the habit of leaving every project knowing a little more than when he walked in. He is passionate about technology. And he is after, always, the next challenge.',
      ],
      sheet: {
        role: 'Trade',
        based: 'Station',
        basedValue: 'Elda, Alicante, Spain',
        experience: 'Service',
        status: 'Status',
        available: 'Available',
      },
    },
    campaigns: {
      word: 'Chapter the Second',
      title: 'Of the campaigns',
      argument:
        'In which it is told how he went in as an intern at Alicante and came out a senior by way of Barcelona, and what lay between.',
      leadIn: 'He started in February',
      paragraphs: [
        {
          text: 'He started in February 2022, in Alicante, as an intern at NTT DATA. Three months and one API in .NET for a wind-farm application. It was no Trafalgar, but one has to start somewhere. He stayed. As a junior he got what juniors get: classic ASP, SQL scripts and the language literals of a web application in the fuel sector. Work without glory, the kind that teaches more than glory does.',
          roles: [4, 3],
        },
        {
          text: 'At the end of 2023 they handed him a whole corrective service to keep alone: that of a leading renewable-energy company. Alone means alone. Analyse, code, deploy, validate and, on top of it, face the client. He still had enough left over to propose enhancements.',
          roles: [2],
        },
        {
          text: 'In May 2024 he moved to Savia, by Berger-Levrault, in Madrid: human resources for the public administration. A long year and a half of enhancements and new features, of database queries that were slow and stopped being slow, of bugs, of tests of several kinds and of good practice. It was there he began to work with GitHub Copilot at his side.',
          roles: [1],
        },
        {
          text: 'And in January 2026, Cafler, in Barcelona, now as a senior: an AI-powered operating system for the automotive industry and the backend services of a car-services marketplace. Microservices, gRPC, and Claude and Copilot on the workbench. Until September of that year.',
          roles: [0],
        },
      ],
      more: 'The full relation, company by company',
    },
    arms: {
      word: 'Chapter the Third',
      title: 'Of the arms',
      argument:
        'Which treats of the tools he works with, set down in an inventory, as one does with powder.',
      leadIn: 'A trade',
      paragraphs: [
        'A trade is known by its tools, and a man by the state he keeps them in. These are his, set down in a list. Not every tool there is. The ones he has used.',
      ],
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
    course: {
      word: 'Chapter the Fourth',
      title: 'Of the course',
      argument:
        'In which it is declared where he is bound: to bring artificial intelligence into the backend, and in what order.',
      leadIn: 'His course',
      paragraphs: [
        'His course is set: to specialise in bringing artificial intelligence into the backend. Not as ornament and not as fashion, of which there is plenty already, but as a trade. To that end he means to master four things, and he names them in their order.',
      ],
      items: [
        {
          label: 'LLM integration',
          text: 'Connecting models such as Claude or GPT to backend services and APIs. Securely and efficiently, since either one without the other is worth nothing.',
        },
        {
          label: 'RAG & vector databases',
          text: 'Semantic search with embeddings and vector databases, so that the models speak from a context of their own and not from hearsay.',
        },
        {
          label: 'Agents & tool calling',
          text: 'Orchestrating agents that call tools and APIs —function calling, MCP— until the workflows run by themselves.',
        },
        {
          label: 'Evals & observability',
          text: 'Measuring the quality, latency and cost of LLMs with evals and tracing. One ships AI to production with guarantees, or one does not ship.',
        },
      ],
    },
    offDuty: {
      word: 'Chapter the Fifth',
      title: 'Of the man off duty',
      argument:
        'Which treats of the gym, of airsoft, of languages and of other loose papers.',
      leadIn: 'Away from the keyboard',
      paragraphs: [
        'Away from the keyboard, he trains. He is passionate about the gym and a healthy life, which is another kind of discipline and shows up in no repository. On weekends he plays airsoft. Each man rests the way he knows how.',
        `He studied ${ext(DAW, 'Web Application Development')} —DAW, they call it— between 2020 and 2022. The rest he has learned since, and on his own account: at ${ext(DOMETRAIN, 'Dometrain')}, on ${ext(UDEMY, 'Udemy')} and from books. He is still at it.`,
      ],
      languages: {
        title: 'Languages',
        items: [
          { name: 'Spanish', level: 'Native' },
          { name: 'English', level: 'B2' },
        ],
      },
      softSkills: {
        title: 'Virtues (today, soft skills)',
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
      projects: {
        title: 'Loose papers, on GitHub',
        here: 'this very book',
        all: 'All repositories',
      },
    },
    contact: {
      word: 'Chapter the Sixth and last',
      title: 'Of his whereabouts',
      argument:
        'In which it is said how to find him, which is what you came for.',
      leadIn: 'He is available',
      paragraphs: [
        'He is available. If you have a backend to raise, or one to straighten out, this is where to find him. Write, call, or look for him where people are looked for these days. He answers.',
      ],
      items: [
        { label: 'By voice', href: PHONE, detail: PHONE_TEXT },
        { label: 'In writing', href: MAIL, detail: MAIL_TEXT },
        { label: 'LinkedIn', href: LINKEDIN, detail: LINKEDIN_TEXT },
        { label: 'GitHub', href: GITHUB, detail: GITHUB_TEXT },
      ],
      colophon:
        'This book was set with Astro, in Fell and Garamond types. It carries no server and hardly any JavaScript.',
      photoAlt: 'Engraving of Jesús Bonete at rest, palms open',
    },
    cv: {
      word: 'Appendix',
      title: 'Service record',
      argument: 'Which is the CV: one page, without literature.',
      leadIn: 'What came before',
      paragraphs: [
        'What came before is the novel. This is the file: one sheet, with its dates, its companies and its tools, and not an adjective to spare. It is what one sends to people with no time for chapters, and they are right not to have it.',
      ],
      view: 'Open the sheet',
      pdfEs: 'PDF in Spanish',
      pdfEn: 'PDF in English',
      plateCaption: 'The service record, in facsimile.',
    },
    experience: {
      pageTitle: {
        plus: 'Work experience (+{n} years)',
        exact: 'Work experience ({n} years)',
      },
      years: { plus: '+{n} years', exact: '{n} years' },
    },
    work: {
      word: 'The relation at length',
      title: 'The campaigns',
      argument:
        'In which it is set down, company by company, what he did, when, and with what tools.',
      ordinals: [
        'First campaign',
        'Second campaign',
        'Third campaign',
        'Fourth campaign',
        'Fifth campaign',
      ],
      stack: 'Arms and stores',
      back: 'Back to the book',
    },
    footer: { builtWith: 'Set with Astro' },
    notFound: {
      word: 'A page torn out',
      code: '404',
      title: 'A leaf is missing here',
      body: 'This page does not exist. Or it did, and someone tore it out; with books one never knows. The rest of the volume is intact.',
      back: 'Back to the title page',
      photoAlt: 'Engraving of Jesús Bonete at rest, palms open',
    },
  },
}
