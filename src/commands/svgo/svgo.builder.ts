export class SvgoBuilder {
  private inputPath: string
  private options: string[] = []

  public input(inputPath: string): this {
    this.inputPath = inputPath

    return this
  }

  public setArguments = (args: string[]) => {
    args.forEach(arg => {
      this.options.push(`--${arg}`)
    })

    return this
  }

  public output(): string[] {
    if (!this.inputPath) {
      throw new Error('Input path is not set!')
    }

    const args: string[] = [...this.options, this.inputPath]

    return args
  }
}
