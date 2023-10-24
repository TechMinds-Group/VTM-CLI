export interface ITemplateConfig {
  name: string
  path: string
  external?: boolean
}

export const templateOverwrite: ITemplateConfig[] = [
  {
    name: 'appStyled.ts.ejs',
    path: 'styles/app.css',
  },
  {
    name: 'index.ts.ejs',
    path: 'styles/index.css',
  },
  {
    name: 'home.ts.ejs',
    path: 'pages/Home/Home.tsx',
  },
  {
    name: 'app.ts.ejs',
    path: 'App.tsx',
  },
  {
    name: 'main.ts.ejs',
    path: 'main.tsx',
  },
  {
    name: 'logos.ts.ejs',
    path: 'constants/logos.ts',
  },
  {
    name: 'mui5.png',
    path: '../public/assets/mui5.png',
    external: true,
  },
]