import { GluegunFilesystem, GluegunTemplate, GluegunToolbox } from 'gluegun'
import { extensionsOptions } from '../constants/extensionsOptions'
import { templateConfig } from '../constants/templateConfig'
import { extractInstallDependencies } from '../helpers/extractInstallDependencies'
import { formatPasteName } from '../helpers/formatPasteName'
import { formatString } from '../helpers/formatString'
import { getConfigAdapter } from '../helpers/getConfigAdapter'
import * as pathDirectory from 'path'

class OverwriteConfig {
  private readonly template: GluegunTemplate
  private readonly fileSystem: GluegunFilesystem

  constructor(toolbox: GluegunToolbox) {
    this.template = toolbox.template
    this.fileSystem = toolbox.filesystem

    toolbox.overwriteConfig = this.overwrite.bind(this)
  }

  async overwrite(path = './') {
    const config = await getConfigAdapter(path)
    const pathTemplates: string = formatPasteName(config.styled)
    const absolutePath = pathDirectory.join(
      __dirname,
      `../templates/${pathTemplates}`
    )

    if (!this.fileSystem.exists(absolutePath))
      throw new Error('Configuration not implemented')

    await this.addDependencies(path)

    for (const iterator of templateConfig) {
      const nameFile = `${iterator.name.toLowerCase()}.ts.ejs`
      const templatePath = `${pathTemplates}/${nameFile}`
      const targetPath = `${path}src/${iterator.path}`

      if (!this.fileSystem.exists(`${absolutePath}/${nameFile}`)) return

      await this.template.generate({
        template: `./${templatePath}`,
        target: targetPath,
      })

      let extensionArray: string[] = iterator.path.split('.')
      let extension = extensionArray[extensionArray.length - 1]

      if (extension === 'css') {
        this.fileSystem.renameAsync(
          targetPath,
          `${iterator.name}.${
            extensionsOptions[formatString(config.styled.cssStyled)]
          }`,
          {
            overwrite: true,
          }
        )
      }
    }
  }

  private async addDependencies(path = './') {
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

    const config = await getConfigAdapter(path)
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
}

module.exports = (toolbox: GluegunToolbox) => new OverwriteConfig(toolbox)
