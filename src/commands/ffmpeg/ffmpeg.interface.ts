import { ICommandExecutor } from '../../core/executor/command.executor.interface'

export interface IFfmpegInput {
  width: number
  height: number
  path: string
  outputName: string
  outputFormat: string
}

export interface ICommandFfmpeg extends ICommandExecutor {
  output: string
}
