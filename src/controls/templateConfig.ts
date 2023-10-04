interface ITemplateConfig {
  name: string
  path: string
}

export const templateConfig: ITemplateConfig[] = [
  {
    name: 'App',
    path: 'styles/App.css',
  },
  {
    name: 'Index',
    path: 'styles/Index.css',
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
