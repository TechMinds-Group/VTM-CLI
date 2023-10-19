import * as fs from 'fs'
import * as path from 'path'

export default async function renamePackage(
  projectName: string
): Promise<void> {
  const packageJsonPath = path.join(process.cwd(), projectName, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found for project "${projectName}"`)
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  packageJson.name = projectName
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}
