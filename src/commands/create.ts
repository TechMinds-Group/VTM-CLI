import { GluegunCommand } from 'gluegun'
import { configCustom } from '../utils/configCustom'
import { IConfigProject, defaultConfig } from '../controls/defaultConfig'
import { configAdapter } from '../adapters/configAdapter'
import { handleError } from '../middlewares/handleError'

class CreateCommand implements GluegunCommand {
  name = 'create'
  description = 'Create a new Vite project boilerplate'

  @handleError
  async run(toolbox) {
    const {
      print: { info, success, error },
      parameters: { first: projectName },
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

    let config: IConfigProject = { ...defaultConfig, name: projectName }

    info(`Creating a new Vite project with name: ${projectName}`)

    const projectTypeString = await typeProject()

    if (projectTypeString === 'Custom') {
      config = await configCustom({ projectName, selectOption })
    }

    await createProject(config)

    if (projectTypeString === 'Custom') {
      await overwriteConfig(`./${config.name}/`)
    }

    await installDependencies({ projectName, config: configAdapter(config) })
    await openVsCode()

    success('Project created successfully!')
  }
}

module.exports = new CreateCommand()
