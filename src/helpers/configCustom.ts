import { ISelectOption } from '../constants/customOptions'
import { IConfigProject } from '../constants/defaultConfig'
import { PathSingleton } from './pathSingleton'
import { processStep } from './stepManager'

export async function configCustom(
  selectOption: (object: ISelectOption) => Promise<string>
): Promise<IConfigProject> {
  const projectName = PathSingleton.getInstance().getName()
  let customConfig: Partial<IConfigProject> = {
    name: projectName,
  }

  const initialStep = 'cssFramework'

  return processStep(initialStep, customConfig, selectOption)
}
