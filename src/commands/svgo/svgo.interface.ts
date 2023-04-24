import { ICommandExecutor } from '../../core/executor/command.executor.interface'

export interface ISvgoInput {
  path: string
  additional: string[]
}

export type ICommandSvgo = ICommandExecutor
