import { IConfigAdapter } from '../adapters/configAdapter'

function transformToLowerCase(input: any): any {
  if (typeof input === 'string') {
    return input.toLowerCase().replace(/\s/g, '')
  } else if (typeof input === 'object') {
    if (Array.isArray(input)) {
      return input.map(transformToLowerCase)
    } else {
      const result: any = {}
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          result[key] = transformToLowerCase(input[key])
        }
      }
      return result
    }
  } else {
    return input
  }
}

export function tratamentConfigs(config: IConfigAdapter): IConfigAdapter {
  const transformedConfig = JSON.parse(JSON.stringify(config))

  return transformToLowerCase(transformedConfig)
}
