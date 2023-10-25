import { GluegunFilesystem, GluegunTemplate, GluegunToolbox } from 'gluegun'
import { extensionsOptions } from '../constants/extensionsOptions'
import {
  ITemplateConfig,
  templateOverwrite,
} from '../constants/templateOverwrite'
import { extractInstallDependencies } from '../helpers/extractInstallDependencies'
import { formatPasteName } from '../helpers/formatPasteName'
import { formatString } from '../helpers/formatString'
import { getConfigAdapter } from '../helpers/getConfigAdapter'
import * as pathDirectory from 'path'
import { templateDelete } from '../constants/templateDelete'
import { IConfigAdapter } from '../adapters/configAdapter'
import { PathSingleton } from '../helpers/pathSingleton'

class OverwriteConfig {
  private readonly template: GluegunTemplate
  private readonly fileSystem: GluegunFilesystem
  private readonly pathSingleton: PathSingleton

  constructor(toolbox: GluegunToolbox, pathSingleton: PathSingleton) {
    this.template = toolbox.template
    this.fileSystem = toolbox.filesystem
    this.pathSingleton = pathSingleton

    toolbox.overwriteConfig = this.overwrite.bind(this)
  }

  async overwrite() {
    const path = this.pathSingleton.getGlobalRoute()
    const config = await getConfigAdapter()
    const pathTemplates: string = formatPasteName(config.styled)
    const absolutePath = pathDirectory.join(
      __dirname,
      `../templates/${pathTemplates}`
    )

    if (!this.fileSystem.exists(absolutePath))
      throw new Error('Configuration not implemented')

    await this.addDependencies()
    await this.deleteFiles(pathTemplates)

    for (const iterator of templateOverwrite) {
      const templatePath = `${pathTemplates}/${iterator.name}`
      const targetPath = `${path}/src/${iterator.path}`

      if (!this.fileSystem.exists(`${absolutePath}/${iterator.name}`)) continue

      if (iterator.external) {
        this.fileSystem.copyAsync(
          `${absolutePath}/${iterator.name}`,
          targetPath
        )
        continue
      }

      await this.template.generate({
        template: `./${templatePath}`,
        target: targetPath,
      })

      await this.overwriteExtension(iterator, config, targetPath)
    }
  }

  private async addDependencies() {
    const path = this.pathSingleton.getGlobalRoute()
    const pathPackage = `${path}/package.json`.replace('//', '/')
    const readPackage = await this.fileSystem.readAsync(pathPackage)

    if (!readPackage) {
      throw new Error(
        `O arquivo package.json em ${pathPackage} está vazio ou não existe.`
      )
    }

    let serializedPackage
    try {
      serializedPackage = JSON.parse(readPackage)
    } catch (error) {
      throw new Error(
        `Falha ao analisar o arquivo package.json em ${pathPackage}: ${error.message}`
      )
    }

    const config = await getConfigAdapter()
    const { prod, dev } = extractInstallDependencies(config)

    serializedPackage.dependencies = {
      ...(serializedPackage.dependencies || {}),
      ...prod,
    }

    serializedPackage.devDependencies = {
      ...(serializedPackage.devDependencies || {}),
      ...dev,
    }

    await this.fileSystem.writeAsync(
      pathPackage,
      JSON.stringify(serializedPackage, null, 2)
    )
  }

  private async overwriteExtension(
    iterator: ITemplateConfig,
    config: IConfigAdapter,
    targetPath: string
  ) {
    const extensionArray: string[] = iterator.path.split('.')
    const extension = extensionArray[extensionArray.length - 1]
    const nameFile = iterator.name.split('.')[0]

    if (extension === 'css') {
      this.fileSystem.renameAsync(
        targetPath,
        `${nameFile}.${
          extensionsOptions[formatString(config.styled.cssStyled)]
        }`,
        {
          overwrite: true,
        }
      )
    }
  }

  private async deleteFiles(config) {
    const files = templateDelete[config]
    const path = this.pathSingleton.getGlobalRoute()

    if (!files) return

    for (const iterator of files) {
      const targetPath = `${path}src/${iterator}`

      if (!this.fileSystem.exists(targetPath)) continue

      await this.fileSystem.removeAsync(targetPath)
    }

    return true
  }
}

module.exports = (toolbox: GluegunToolbox) =>
  new OverwriteConfig(toolbox, PathSingleton.getInstance())
