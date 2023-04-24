import { ICommandExecutor } from '../../core/executor/command.executor.interface'

export interface IConvertInput {
  path: string
  width: number
  height: number
  outputName: string
  outputFormat: string
}

export interface ICommandConvert extends ICommandExecutor {
  output: string
}
