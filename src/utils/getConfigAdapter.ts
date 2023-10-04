import * as fs from 'fs'
import * as yaml from 'js-yaml'
import { IConfigAdapter } from '../adapters/configAdapter'
import { tratamentConfigs } from './tratamentConfigs'
import { validateFieldsConfig } from './validateFieldsConfig'

export function getConfigAdapter(path: string): IConfigAdapter {
  const configContents = fs.readFileSync(`${path}config.yml`, 'utf-8')
  let config = yaml.load(configContents) as IConfigAdapter

  Object.keys(config).forEach((value) => {
    validateFieldsConfig(config[value])
  })

  config = tratamentConfigs(config)

  return config
}
