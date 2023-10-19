import { GluegunToolbox } from 'gluegun'
import { removeProject } from '../helpers/removeProject'

export function handleError(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  descriptor.value = async function (toolbox: GluegunToolbox) {
    try {
      await originalMethod.call(this, toolbox)
    } catch (err) {
      toolbox.print.error(err.message)

      if (err.message !== 'A folder with that name already exists')
        removeProject(`${process.cwd()}/${toolbox.parameters.first}`)

      process.exit(1)
    }
  }
  return descriptor
}
