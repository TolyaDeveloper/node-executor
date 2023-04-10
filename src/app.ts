import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor'
import { LoggerService } from './logger/logger.service'

export class App {
  public async run() {
    new FfmpegExecutor(LoggerService.getInstance()).execute()
  }
}

new App().run()
