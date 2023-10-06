import { IConfigAdapter } from '../adapters/configAdapter'
import { dependenciesConfig } from '../controls/dependenciesConfig'
import { formatString } from './formatString'

interface IDependencies {
  prod: object
  dev: object
}

export function extractInstallDependencies(config: IConfigAdapter) {
  let dependencies: IDependencies = {
    prod: {},
    dev: {},
  }

  switch (formatString(config.styled.cssFramework)) {
    case `materialui`:
      if (
        // @ts-ignore
        !dependenciesConfig.materialui[formatString(config.styled.cssStyled)]
      ) {
        throw new Error(
          `To use Material Ui, you need to specify a valid cssStyled`
        )
      }

      Object.keys(config.styled).forEach((value) => {
        const { data, dev } =
          dependenciesConfig.materialui[formatString(config.styled[value])]
        const typeDep = dev ? 'dev' : 'prod'

        dependencies[typeDep] = { ...dependencies[typeDep], ...(data as any) }
      })

      break

    default:
      Object.keys(config.styled).forEach((value) => {
        if (formatString(config.styled[value]) !== 'none') {
          const { data, dev } =
            dependenciesConfig[formatString(config.styled[value])]
          const typeDep = dev ? 'dev' : 'prod'

          dependencies[typeDep] = { ...dependencies[typeDep], ...(data as any) }
        }
      })
      break
  }

  return dependencies
}
