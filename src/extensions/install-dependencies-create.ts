import * as fs from 'fs'
import { GluegunPrint } from 'gluegun'
import {
  GluegunParameters,
  GluegunToolbox,
  Toolbox,
} from 'gluegun/build/types/domain/toolbox'
import * as shell from 'shelljs'
import { IConfigAdapter } from '../adapters/configAdapter'
import { extractInstallDependencies } from '../utils/extractInstallDependencies'

interface IInstallDependencies {
  projectName: string
  config: IConfigAdapter
}

class InstallDependencies {
  private parameters: GluegunParameters
  private print: GluegunPrint

  constructor(toolbox: Toolbox) {
    this.parameters = toolbox.parameters
    this.print = toolbox.print
  }

  async installDependencies({ projectName, config }: IInstallDependencies) {
    const i = this.parameters.options.i || this.parameters.options.install

    if (!i) {
      return
    }

    const packageJsonPath = `${projectName}/package.json`
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`No package.json found in ${projectName}`)
    }

    const extractDependencies = extractInstallDependencies(config)

    this.print.info('Installing dependencies...')

    await shell.cd(projectName).exec(`npm install`)
    await shell.cd(projectName).exec(extractDependencies)
  }

  apply(toolbox: GluegunToolbox) {
    toolbox.installDependencies = this.installDependencies.bind(this)
  }
}

module.exports = (toolbox: GluegunToolbox) =>
  new InstallDependencies(toolbox).apply(toolbox)
