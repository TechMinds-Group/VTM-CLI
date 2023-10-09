import { IConfigProject } from '../constants/defaultConfig'
import { formatString } from './formatString'

export function formatPasteName(configs: Partial<IConfigProject>): string {
  const partsToConcatenate: string[] = []

  if (configs.cssFramework && formatString(configs.cssFramework) !== 'none') {
    partsToConcatenate.push(formatString(configs.cssFramework))
  }

  if (configs.cssStyled) {
    partsToConcatenate.push(formatString(configs.cssStyled))
  }

  const concatenatedName = partsToConcatenate
    .join('-')
    .toLowerCase()
    .replace(' ', '')
  return concatenatedName
}
