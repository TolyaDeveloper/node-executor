import { PromptService } from './core/prompt/prompt.service'

export class App {
  public async run() {
    const res = await new PromptService().input<string>('Number', 'password')

    console.log(res)
  }
}

new App().run()
