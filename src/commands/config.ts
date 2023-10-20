import { GluegunCommand } from 'gluegun'
import { IConfigAdapter } from '../adapters/configAdapter'
import { getConfigAdapter } from '../helpers/getConfigAdapter'

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

    const configAdapter: IConfigAdapter = await getConfigAdapter(first)

    await createProject({ name: '', ...configAdapter.styled })
    await overwriteConfig(first)

    await installDependencies({
      projectName: first,
      config: configAdapter,
    })

    print.success('Project configured')
  },
}

module.exports = command
