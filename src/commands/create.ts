import { GluegunCommand, GluegunToolbox } from 'gluegun'
import { IConfigProject, defaultConfig } from '../constants/defaultConfig'
import { configCustom } from '../helpers/configCustom'
import { handleError } from '../middlewares/handleError'
import { PathSingleton } from '../helpers/pathSingleton'

class CreateCommand implements GluegunCommand {
  name = 'create'
  description = 'Create a new Vite project boilerplate'

  @handleError
  async run(toolbox: GluegunToolbox) {
    const {
      print: { info, success, error },
      parameters: { first: projectName },
      filesystem,
      createProject,
      overwriteConfig,
      installDependencies,
      typeProject,
      openVsCode,
      selectOption,
    } = toolbox

    if (!projectName) {
      error('Please provide a project name.')
      return
    }

    const pathSingleton = PathSingleton.getInstance()
    pathSingleton.addData(projectName)

    if (filesystem.exists(pathSingleton.getGlobalRoute())) {
      throw new Error('A folder with that name already exists')
    }

    let config: IConfigProject = {
      ...defaultConfig,
      name: pathSingleton.getName(),
    }

    info(`Creating a new Vite project with name: ${pathSingleton.getName()}`)

    const projectTypeString = await typeProject()

    if (projectTypeString === 'Custom') {
      config = await configCustom(selectOption)
    }

    await createProject(config)

    if (projectTypeString === 'Custom') {
      await overwriteConfig(`./${config.name}/`)
    }

    await installDependencies()
    await openVsCode()

    success('Project created successfully!')
  }
}

module.exports = new CreateCommand()
