import { ChildProcessWithoutNullStreams, spawn } from 'child_process'

import { CommandExecutor } from '../../core/executor/command.executor'
import { ICommandFfmpeg, IFfmpegInput } from './ffmpeg.interface'
import { ILoggerService } from '../../logger/logger.service.interface'
import { FilesService } from '../../core/files/files.service'
import { PromptService } from '../../core/prompt/prompt.service'
import { FfmpegBuilder } from './ffmpeg.builder'
import { StreamHandler } from '../../core/handlers/stream.handler'

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService: FilesService = new FilesService()
  private promptService: PromptService = new PromptService()

  constructor(logger: ILoggerService) {
    super(logger)
  }

  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>('Width', 'number')
    const height = await this.promptService.input<number>('Height', 'number')
    const path = await this.promptService.input<string>('Path to file')
    const outputName = await this.promptService.input<string>('Output name')
    const outputFormat = await this.promptService.input<string>('Output format')

    return { width, height, path, outputName, outputFormat }
  }

  protected build({
    width,
    height,
    path,
    outputName,
    outputFormat
  }: IFfmpegInput): ICommandFfmpeg {
    const output = this.fileService.getFilePath(path, outputName, outputFormat)
    const args = new FfmpegBuilder()
      .input(path)
      .setVideoSize(width, height)
      .output(output)

    return { command: 'ffmpeg', args, output }
  }

  protected spawn({
    args,
    command,
    output
  }: ICommandFfmpeg): ChildProcessWithoutNullStreams {
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
