import { GluegunFilesystem, GluegunTemplate, GluegunToolbox } from 'gluegun'
import { extensionsOptions } from '../controls/extensionsOptions'
import { templateConfig } from '../controls/templateConfig'
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
    const config = getConfigAdapter(path)
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

    this.addDependencies(path)
  }

  private async addDependencies(path = './') {
    const packageJson = this.fileSystem.readAsync(`${path}/package.json`)

    console.log(JSON.parse(await packageJson).dependencies)
  }
}

module.exports = (toolbox: GluegunToolbox) => new OverwriteConfig(toolbox)
