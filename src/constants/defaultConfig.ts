export interface IConfigProject {
  name?: string
  cssFramework: string
  cssStyled: string
}

export const defaultConfig: IConfigProject = {
  name: 'basic',
  cssFramework: 'none',
  cssStyled: 'none',
}
