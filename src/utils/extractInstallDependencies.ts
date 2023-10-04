import { IConfigAdapter } from '../adapters/configAdapter'
import { dependenciesConfig } from '../controls/dependenciesConfig'
import { formatString } from './formatString'

interface IDependencies {
  prod: string[]
  dev: string[]
}

export function extractInstallDependencies(config: IConfigAdapter) {
  let dependencies: IDependencies = {
    prod: [],
    dev: [],
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

      break

    default:
      Object.keys(config.styled).forEach((value) => {
        // if (
        //   // @ts-ignore
        //   !dependenciesConfig[config.styled[value]] &&
        //   formatString(config.styled[value]) !== 'none'
        // ) {
        //   throw new Error(
        //     `The ${value} contains an invalid value, see valid options in the documentation: https://github.com/TechMinds-Group/VTM-CLI`
        //   )
        // }

        if (formatString(config.styled[value]) !== 'none') {
          dependencies += `${
            // @ts-ignore
            dependenciesConfig[formatString(config.styled[value])]
          } `
        }
      })
      break
  }

  console.log(dependencies)

  return dependencies.trim()
}
