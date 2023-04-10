import { ChildProcessWithoutNullStreams } from 'child_process'

import { ILoggerService } from '../../logger/logger.service.interface'
import { ICommandExecutor } from './command.executor.interface'

export abstract class CommandExecutor<Input> {
  constructor(private logger: ILoggerService) {}

  public async execute() {
    const input = await this.prompt()
    const command = this.build(input)
    const stream = this.spawn(command)

    this.processStream(stream, this.logger)
  }

  protected abstract prompt(): Promise<Input>
  protected abstract build(input: Input): ICommandExecutor
  protected abstract spawn(
    command: ICommandExecutor
  ): ChildProcessWithoutNullStreams
  protected abstract processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: ILoggerService
  ): void
}
