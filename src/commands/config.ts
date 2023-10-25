import { GluegunCommand } from 'gluegun'
import { IConfigAdapter } from '../adapters/configAdapter'
import { getConfigAdapter } from '../helpers/getConfigAdapter'
import { PathSingleton } from '../helpers/pathSingleton'

const command: GluegunCommand = {
  name: 'config',
  description: 'Configure your project',
  run: async (toolbox) => {
    const {
      print,
      parameters: { first = './' },
      createProject,
      overwriteConfig,
      installDependencies,
    } = toolbox

    const pathSingleton = PathSingleton.getInstance()
    pathSingleton.addData(first)

    const configAdapter: IConfigAdapter = await getConfigAdapter()

    await createProject({
      name: pathSingleton.getName(),
      ...configAdapter.styled,
    })

    await overwriteConfig()
    await installDependencies()

    print.success('Project configured')
  },
}

module.exports = command
