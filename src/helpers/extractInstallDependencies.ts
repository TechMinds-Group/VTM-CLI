import { IConfigAdapter } from '../adapters/configAdapter'
import { dependenciesConfig } from '../constants/dependenciesConfig'
import { formatString } from './formatString'

interface IDependencies {
  prod: object
  dev: object
}

function processDependencies(config: any, dependencies: any) {
  for (const value of Object.keys(config)) {
    const configValue = config[value]

    if (configValue === 'none') {
      continue
    }

    if (typeof configValue === 'object') {
      processDependencies(configValue, dependencies)
    }

    if (typeof configValue === 'string') {
      let data
      let dev

      if (config.cssFramework !== 'none' && value !== 'cssStyled') {
        if (value === 'cssFramework') {
          ;({ data, dev } =
            dependenciesConfig[formatString(configValue)][
              formatString(config.cssStyled)
            ])
        } else {
          ;({ data, dev } = dependenciesConfig[formatString(configValue)])
        }
      }

      if (config.cssFramework === 'none' && value === 'cssStyled') {
        ;({ data, dev } = dependenciesConfig[formatString(configValue)])
      }

      if (data) {
        const typeDep = dev ? 'dev' : 'prod'
        dependencies[typeDep] = {
          ...dependencies[typeDep],
          ...(data as any),
        }
      }
    }
  }
}

export function extractInstallDependencies(config: IConfigAdapter) {
  let dependencies: IDependencies = {
    prod: {},
    dev: {},
  }

  processDependencies(config, dependencies)

  return dependencies
}
