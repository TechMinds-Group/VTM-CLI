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
    let pathWithName = './'

    if (name.length > 0 && name !== '.') pathWithName += `${name}/`

    pathWithName = pathWithName.replace('//', '/')

    const zip = new AdmZip(path.join(__dirname, '../templates/basic.zip'))
    zip.extractAllTo(pathWithName, true)

    this.fileSystem.write(
      `${pathWithName}config.yml`,
      yaml.dump(configAdapter(rest))
    )

    await renamePackage(name)
  }
}

module.exports = (toolbox: GluegunToolbox) => new ProjectCreate(toolbox)
