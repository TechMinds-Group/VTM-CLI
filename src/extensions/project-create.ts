import * as AdmZip from 'adm-zip'
import { GluegunFilesystem } from 'gluegun'
import { GluegunToolbox } from 'gluegun/build/types/domain/toolbox'
import * as yaml from 'js-yaml'
import * as path from 'path'
import { configAdapter } from '../adapters/configAdapter'
import { IConfigProject } from '../constants/defaultConfig'
import renamePackage from '../helpers/renamePackage'

class ProjectCreate {
  private readonly fileSystem: GluegunFilesystem

  constructor(toolbox: GluegunToolbox) {
    this.fileSystem = toolbox.filesystem
    toolbox.createProject = this.create.bind(this)
  }

  async create(config: IConfigProject): Promise<void> {
    const { name, ...rest } = config

    const zip = new AdmZip(path.join(__dirname, '../templates/basic.zip'))
    zip.extractAllTo(`./${name}`, true)

    this.fileSystem.write(
      `./${name}/config.yml`,
      yaml.dump(configAdapter(rest))
    )

    await renamePackage(name as string)
  }
}

module.exports = (toolbox: GluegunToolbox) => new ProjectCreate(toolbox)
