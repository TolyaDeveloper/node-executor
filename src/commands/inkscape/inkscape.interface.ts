import { ICommandExecutor } from '../../core/executor/command.executor.interface'

export interface IInkscapeInput {
  path: string
  width: number
  height: number
  outputName: string
  outputFormat: string
}

export interface ICommandInkscape extends ICommandExecutor {
  output: string
}
