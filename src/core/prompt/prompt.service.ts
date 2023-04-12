import inquirer from 'inquirer'

import { InputType } from './prompt.service.interface'

export class PromptService {
  public async input<T>(message: string, type: InputType = 'input') {
    const { result } = await inquirer.prompt<{ result: T }>([
      { type, name: 'result', message }
    ])

    return result
  }

  public async select<T>(message: string, choices: string[]) {
    const { result } = await inquirer.prompt<{ result: T }>([
      { type: 'list', name: 'result', message, choices }
    ])

    return result
  }
}
