export interface ISelectOption {
  name: string
  choices: string[]
  message: string
  errorMessage?: string
}

interface ICustomOptions {
  cssFramework: ISelectOption
  cssStyled: ISelectOption
}

export const customOptions: ICustomOptions = {
  cssFramework: {
    name: 'cssFramework',
    choices: ['None', 'Chakra UI', 'Material UI'],
    message: 'Choose a CSS framework:',
    errorMessage: 'Invalid CSS framework selected.',
  },
  cssStyled: {
    name: 'cssStyled',
    choices: ['None', 'Sass', 'Styled Components', 'Emotion'],
    message: 'Choose a CSS Styled:',
    errorMessage: 'Invalid CSS styled selected.',
  },
}
