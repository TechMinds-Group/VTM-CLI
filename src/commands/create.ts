import { GluegunCommand, GluegunToolbox } from 'gluegun'
import { configCustom } from '../helpers/configCustom'
import { IConfigProject, defaultConfig } from '../constants/defaultConfig'
import { configAdapter } from '../adapters/configAdapter'
import { handleError } from '../middlewares/handleError'

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

    if (filesystem.exists(`${process.cwd()}/${projectName}`)) {
      throw new Error('A folder with that name already exists')
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
    await openVsCode(projectName)

    success('Project created successfully!')
  }
}

module.exports = new CreateCommand()
