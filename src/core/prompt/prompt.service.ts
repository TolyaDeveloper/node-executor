import inquirer from 'inquirer'

import { InputType } from './prompt.service.interface'

export class PromptService {
  public async input<T>(message: string, type: InputType = 'input') {
    const { result } = await inquirer.prompt<{ result: T }>([
      { type, name: 'result', message }
    ])

    return result
  }
}
