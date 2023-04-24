import { ChildProcessWithoutNullStreams, spawn } from 'child_process'

import { CommandExecutor } from '../../core/executor/command.executor'
import { ICommandSvgo, ISvgoInput } from './svgo.interface'
import { ILoggerService } from '../../logger/logger.service.interface'
import { PromptService } from '../../core/prompt/prompt.service'
import { SvgoBuilder } from './svgo.builder'
import { StreamHandler } from '../../core/handlers/stream.handler'

export class SvgoExecutor extends CommandExecutor<ISvgoInput> {
  private promptService: PromptService = new PromptService()

  constructor(logger: ILoggerService) {
    super(logger)
  }

  protected async prompt(): Promise<ISvgoInput> {
    const path = await this.promptService.input<string>('Path to svg', 'input')
    const additional = await this.promptService.checkbox<string[]>(
      'Additional parameters',
      ['multipass']
    )

    return { additional, path }
  }

  protected build({ path, additional }: ISvgoInput): ICommandSvgo {
    const args = new SvgoBuilder().input(path).setArguments(additional).output()

    return { command: 'npx svgo', args }
  }

  protected spawn({
    args,
    command
  }: ICommandSvgo): ChildProcessWithoutNullStreams {
    return spawn(command, args, { shell: true })
  }

  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: ILoggerService
  ): void {
    const handler = new StreamHandler(logger)

    handler.handleStream(stream)
  }
}
