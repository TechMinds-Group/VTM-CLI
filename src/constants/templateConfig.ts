interface ITemplateConfig {
  name: string
  path: string
}

export const templateConfig: ITemplateConfig[] = [
  {
    name: 'app',
    path: 'styles/app.css',
  },
  {
    name: 'index',
    path: 'styles/index.css',
  },
  {
    name: 'Home',
    path: 'pages/Home/Home.tsx',
  },
  {
    name: 'Main',
    path: 'main.tsx',
  },
]
