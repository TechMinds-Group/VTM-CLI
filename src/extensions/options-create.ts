import { GluegunToolbox, GluegunPrompt, GluegunSystem } from 'gluegun'
import { ISelectOption } from '../controls/customOptions'

class OptionsCreate {
  private prompt: GluegunPrompt
  private system: GluegunSystem

  constructor(toolbox: GluegunToolbox) {
    this.prompt = toolbox.prompt
    this.system = toolbox.system

    toolbox.typeProject = this.typeProject.bind(this)
    toolbox.openVsCode = this.openVsCode.bind(this)
    toolbox.selectOption = this.selectOption.bind(this)
  }

  async typeProject(): Promise<string> {
    const projectType = await this.prompt.ask({
      type: 'select',
      name: 'projectType',
      message: 'Choose project type:',
      choices: ['Basic', 'Custom'],
    })

    if (
      !projectType ||
      !['Basic', 'Custom'].includes(projectType.projectType)
    ) {
      throw new Error('Invalid project type selected')
    }

    return projectType.projectType
  }

  async openVsCode(): Promise<void> {
    const open = await this.prompt.confirm(
      'Do you want to open the project with Visual Studio Code?',
      false
    )

    if (!open) {
      return
    }

    await this.system.exec('code .')
  }

  async selectOption({
    name,
    choices,
    message,
    errorMessage,
  }: ISelectOption): Promise<string> {
    const select = await this.prompt.ask({
      type: 'select',
      choices: [...choices],
      name,
      message,
    })

    if (!select || !choices.includes(select[name])) {
      throw new Error(errorMessage)
    }

    return select[name]
  }
}

module.exports = (toolbox: GluegunToolbox) => new OptionsCreate(toolbox)
