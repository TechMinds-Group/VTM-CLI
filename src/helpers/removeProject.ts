import * as fs from 'fs'
import * as path from 'path'

export function removeProject(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        removeProject(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(directoryPath)
  }
}
