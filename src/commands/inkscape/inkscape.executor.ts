import { ChildProcessWithoutNullStreams, spawn } from 'child_process'

import { CommandExecutor } from '../../core/executor/command.executor'
import { ICommandInkscape, IInkscapeInput } from './inkscape.interface'
import { ILoggerService } from '../../logger/logger.service.interface'
import { PromptService } from '../../core/prompt/prompt.service'
import { InkscapeBuilder } from './inkscape.builder'
import { StreamHandler } from '../../core/handlers/stream.handler'
import { FilesService } from '../../core/files/files.service'

export class InkscapeExecutor extends CommandExecutor<IInkscapeInput> {
  private fileService: FilesService = new FilesService()
  private promptService: PromptService = new PromptService()

  constructor(logger: ILoggerService) {
    super(logger)
  }

  protected async prompt(): Promise<IInkscapeInput> {
    const path = await this.promptService.input<string>('Path', 'input')
    const width = await this.promptService.input<number>('Width', 'number')
    const height = await this.promptService.input<number>('Height', 'number')
    const outputName = await this.promptService.input<string>('Output name')
    const outputFormat = await this.promptService.input<string>('Output format')

    return { path, width, height, outputName, outputFormat }
  }

  protected build({
    height,
    outputFormat,
    outputName,
    path,
    width
  }: IInkscapeInput): ICommandInkscape {
    const output = this.fileService.getFilePath(path, outputName, outputFormat)
    const args = new InkscapeBuilder()
      .setImageSize(width, height)
      .input(path)
      .output(output)

    return { command: 'inkscape', args, output }
  }

  protected spawn({
    args,
    command,
    output
  }: ICommandInkscape): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output)

    return spawn(command, args)
  }

  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: ILoggerService
  ): void {
    const handler = new StreamHandler(logger)

    handler.handleStream(stream)
  }
}
