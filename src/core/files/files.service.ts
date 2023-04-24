import { dirname, isAbsolute, join } from 'path'
import { stat, unlink } from 'fs/promises'

export class FilesService {
  private async isExists(path: string) {
    try {
      await stat(path)

      return true
    } catch {
      return false
    }
  }

  public getFilePath(path: string, name: string, ext: string): string {
    if (!isAbsolute(path)) {
      path = join(__dirname, path)
    }

    return join(dirname(path), name + '.' + ext)
  }

  public async deleteFileIfExists(path: string) {
    if (await this.isExists(path)) {
      await unlink(path)
    }
  }
}
