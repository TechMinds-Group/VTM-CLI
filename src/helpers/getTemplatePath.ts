export function getTemplatePath(
  config: Record<string, string>,
  name: string = '',
  path: string
) {
  let templates: string = ''

  for (const key in config) {
    if (config[key] !== 'none') {
      templates = `${name}.${config[key]}.`
    }
  }

  const template = templates + 'ts.ejs'

  return { template, target: path }
}
