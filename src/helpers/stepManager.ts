import { ISelectOption, customOptions } from '../constants/customOptions'
import { IConfigProject } from '../constants/defaultConfig'

function filterOptions(step: string, removeOptions: string[]) {
  // @ts-ignore
  if (!customOptions[step]) throw new Error('invalid Step')

  // @ts-ignore
  return customOptions[step].choices.filter(
    (choice: string) => !removeOptions.includes(choice)
  )
}

function getNewStep(step: string): string | undefined {
  const currentPosition = Object.keys(customOptions)
  return currentPosition[currentPosition.indexOf(step) + 1]
}

async function getNextOptions(
  previousOptions: Partial<IConfigProject>,
  step: string
): Promise<ISelectOption | undefined> {
  if (step === 'cssStyled') {
    switch (previousOptions.cssFramework?.toLowerCase()) {
      case 'material ui':
        return {
          ...customOptions[step],
          choices: filterOptions(step, ['Sass', 'None', 'Styled Components']),
        }
      case 'chakra ui':
        return {
          ...customOptions[step],
          choices: filterOptions(step, ['Emotion']),
        }
      default:
        return {
          ...customOptions[step],
          choices: filterOptions(step, ['Emotion']),
        }
    }
  }
  // @ts-ignore
  return customOptions[step]
}

export async function processStep(
  currentStep: string | undefined,
  customConfig: Partial<IConfigProject>,
  selectOption: (object: ISelectOption) => Promise<string>
): Promise<IConfigProject> {
  if (!currentStep) {
    return customConfig as IConfigProject
  }

  const stepOption = await getNextOptions(customConfig, currentStep)
  if (!stepOption) {
    return customConfig as IConfigProject
  }

  const option = await selectOption(stepOption)
  customConfig = {
    ...customConfig,
    [currentStep]: option,
  }

  return processStep(getNewStep(currentStep), customConfig, selectOption)
}
