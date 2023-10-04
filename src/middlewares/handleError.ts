export function handleError(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  descriptor.value = async function (toolbox: any) {
    try {
      await originalMethod.call(this, toolbox)
    } catch (err) {
      toolbox.print.error(err.message)
      process.exit(1)
    }
  }
  return descriptor
}
