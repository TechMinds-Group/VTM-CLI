import { IConfigProject, defaultConfig } from '../constants/defaultConfig'

export function validateFieldsConfig(config: Partial<IConfigProject>): void {
  const fields: string[] = Object.keys(config)
  const fieldsRequired: string[] = Object.keys(defaultConfig)

  fields.forEach((value: string) => {
    if (value === '' || !fieldsRequired.includes(value)) {
      throw new Error(`${value} é um campo inválido`)
    }
  })
}
