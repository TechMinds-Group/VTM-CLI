import { GluegunFilesystem, GluegunTemplate, GluegunToolbox } from 'gluegun'
import { extensionsOptions } from '../controls/extensionsOptions'
import { templateConfig } from '../controls/templateConfig'
import { extractInstallDependencies } from '../utils/extractInstallDependencies'
import { formatPasteName } from '../utils/formatPasteName'
import { formatString } from '../utils/formatString'
import { getConfigAdapter } from '../utils/getConfigAdapter'

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

    for (const iterator of templateConfig) {
      const templatePath = `./${pathTemplates}/${iterator.name.toLowerCase()}.ts.ejs`
      const targetPath = `${path}src/${iterator.path}`

      await this.template.generate({
        template: templatePath,
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

    await this.addDependencies(path)
  }

  private async addDependencies(path = './') {
    const pathPackage = `${path}/package.json`
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
