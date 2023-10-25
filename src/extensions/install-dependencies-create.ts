import * as fs from 'fs'
import { GluegunPrint } from 'gluegun'
import {
  GluegunParameters,
  GluegunToolbox,
  Toolbox,
} from 'gluegun/build/types/domain/toolbox'
import * as shell from 'shelljs'
import { PathSingleton } from '../helpers/pathSingleton'

class InstallDependencies {
  private readonly parameters: GluegunParameters
  private readonly print: GluegunPrint
  private readonly pathSingleton: PathSingleton

  constructor(toolbox: Toolbox, pathSingleton: PathSingleton) {
    this.pathSingleton = pathSingleton
    this.parameters = toolbox.parameters
    this.print = toolbox.print
    toolbox.installDependencies = this.installDependencies.bind(this)
  }

  async installDependencies() {
    const projectName = this.pathSingleton.getName()
    const i = this.parameters.options.i || this.parameters.options.install

    if (!i) {
      return
    }

    const packageJsonPath = `${projectName}/package.json`.replace('//', '/')
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`No package.json found in ${projectName}`)
    }

    this.print.info('Installing dependencies...')

    await shell.cd(projectName).exec(`npm install`)
  }
}

module.exports = (toolbox: GluegunToolbox) =>
  new InstallDependencies(toolbox, PathSingleton.getInstance())
