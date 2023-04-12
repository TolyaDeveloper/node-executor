import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor'
import { LoggerService } from './logger/logger.service'
import { PromptService } from './core/prompt/prompt.service'

enum ECommands {
  ffmpeg = 'ffmpeg'
}

export class App {
  public async run() {
    const answer = await new PromptService().select<keyof typeof ECommands>(
      'What command do you want to execute?',
      [ECommands.ffmpeg]
    )

    switch (answer) {
      case 'ffmpeg':
        return new FfmpegExecutor(LoggerService.getInstance()).execute()
      default:
        return LoggerService.getInstance().error('Such command does not exist!')
    }
  }
}

new App().run()
