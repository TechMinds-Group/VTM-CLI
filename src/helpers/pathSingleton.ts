import { IPathSingleton } from '../interfaces/IPathSingleton'

export class PathSingleton implements IPathSingleton {
  private static instance: PathSingleton
  private name: string = './'

  private constructor() {}

  public static getInstance(): PathSingleton {
    if (!PathSingleton.instance) {
      PathSingleton.instance = new PathSingleton()
    }
    return PathSingleton.instance
  }

  public addData(pathName: string): void {
    this.name = pathName
  }

  public getName(): string {
    return this.name
  }
  public getGlobalRoute(): string {
    return `${process.cwd()}/${this.name}`
  }
}
