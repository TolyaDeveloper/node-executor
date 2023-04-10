import { ICommandExecutor } from '../../core/executor/command.executor.interface'

export interface IFfmpegInput {
  width: number
  height: number
  path: string
  name: string
}

export interface ICommandFfmpeg extends ICommandExecutor {
  output: string
}
