# Personal Portfolio

A modern, responsive portfolio website built with Astro, React, and Tailwind CSS. Features a bilingual interface (English/Spanish) and a dark/light theme toggle.

## 🚀 Features

- **Bilingual Support**: Automatically detects browser language and switches between English and Spanish
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern Stack**: Built with Astro, React, and Tailwind CSS
- **Performance Optimized**: Fast loading times and smooth animations
- **SEO Friendly**: Includes meta tags and proper SEO structure

## 🛠️ Tech Stack

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev/)
- [Motion](https://motion.dev/)

## 🏗️ Project Structure
```
├── LICENSE
├── README.md
├── astro.config.ts
├── components.json
├── dist
│   └── me_chillin.png
├── netlify.toml
├── node_modules
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── CV_orange.pdf
│   ├── View1.png
│   ├── View2.png
│   ├── me.png
│   └── me_chillin.png
├── src
│   ├── components
│   │   └── sections
│   ├── content
│   │   └── work
│   │       └── apple.md
│   ├── env.d.ts
│   ├── layouts
│   │   ├── BaseLayout.astro
│   │   ├── BottomLayout.astro
│   │   └── TopLayout.astro
│   ├── lib
│   │   ├── constants-es.ts
│   │   ├── constants.ts
│   │   ├── contentful.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── pages
│   │   ├── 404.astro
│   │   ├── Card.astro
│   │   ├── Container.astro
│   │   ├── ContentCard.astro
│   │   ├── Footer.astro
│   │   ├── HeadSEO.astro
│   │   ├── Header.astro
│   │   ├── ProjectCard.astro
│   │   ├── Pulse.astro
│   │   ├── ThemeToggle.astro
│   │   ├── en
│   │   │   ├── AboutMe.astro
│   │   │   ├── Available.astro
│   │   │   ├── CVCard.astro
│   │   │   ├── ContactsCard.astro
│   │   │   ├── ExperienceCard.astro
│   │   │   ├── GoalsCard.astro
│   │   │   ├── MyStack.astro
│   │   │   ├── Skills.astro
│   │   │   ├── StudyCard.astro
│   │   │   ├── WelcomeCard.astro
│   │   │   ├── index.astro
│   │   │   └── work.astro
│   │   ├── es
│   │   │   ├── AboutMe.astro
│   │   │   ├── Available.astro
│   │   │   ├── CVCard.astro
│   │   │   ├── ContactsCard.astro
│   │   │   ├── ExperienceCard.astro
│   │   │   ├── GoalsCard.astro
│   │   │   ├── MyStack.astro
│   │   │   ├── Skills.astro
│   │   │   ├── StudyCard.astro
│   │   │   ├── WelcomeCard.astro
│   │   │   ├── index.astro
│   │   │   └── work.astro
│   │   ├── index.astro
│   │   ├── portfolio.astro
│   │   └── ui
│   │       ├── _RedirectToggle.tsx
│   │       ├── _ThemeToggle.tsx
│   │       ├── _badge.tsx
│   │       ├── _button.tsx
│   │       ├── _card.tsx
│   │       └── _dropdown-menu.tsx
│   └── styles
│       ├── fonts.css
│       └── globals.css
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```
## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/xexubonete/portfolio.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

## 🎨 Customization

- Edit `src/lib/constants.ts` and `src/lib/constants-es.ts` to update your personal information
- Modify themes in `src/styles/globals.css`
- Update content in the respective language folders under `src/pages/`

## 📱 Components

- **WelcomeCard**: Main introduction section
- **Skills**: Technical skills showcase
- **Experience**: Work history
- **Contact**: Contact information
- **About**: Personal information
- **Goals**: Future objectives
- **CV**: Resume section

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/xexubonete/portfolio/issues).

## 📧 Contact

- Email: [xexubonete@gmail.com]

## 🙏 Acknowledgments

- Design inspired by modern portfolio trends
- Built with Astro's excellent documentation and community support

