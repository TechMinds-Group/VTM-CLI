import { IConfigProject } from '../constants/defaultConfig'

interface Generic {
  [key: string]: string
}

export interface IConfigAdapter {
  styled: Generic
}

export const configAdapter = (config: IConfigProject): IConfigAdapter => {
  return {
    styled: {
      cssFramework: config.cssFramework,
      cssStyled: config.cssStyled,
    },
  }
}
