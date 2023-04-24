import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor'
import { SvgoExecutor } from './commands/svgo/svgo.executor'
import { ConvertExecutor } from './commands/convert/convert.executor'
import { LoggerService } from './logger/logger.service'
import { PromptService } from './core/prompt/prompt.service'

enum ECommands {
  ffmpeg = 'ffmpeg',
  svgo = 'svgo',
  convert = 'convert'
}

export class App {
  public async run() {
    const answer = await new PromptService().select<keyof typeof ECommands>(
      'What command do you want to execute?',
      [ECommands.ffmpeg, ECommands.svgo, ECommands.convert]
    )

    switch (answer) {
      case 'ffmpeg':
        return new FfmpegExecutor(LoggerService.getInstance()).execute()
      case 'svgo':
        return new SvgoExecutor(LoggerService.getInstance()).execute()
      case 'convert':
        return new ConvertExecutor(LoggerService.getInstance()).execute() // inkscape app CLI error
      default:
        return LoggerService.getInstance().error('Such command does not exist!')
    }
  }
}

new App().run()
