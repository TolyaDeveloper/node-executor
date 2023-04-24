export class ConvertBuilder {
  private inputPath: string
  private options: string[] = []

  constructor() {}

  public input(inputPath: string): this {
    this.inputPath = inputPath

    return this
  }

  setImageSize(width: number, height: number): this {
    this.options.push(`-size ${width}x${height}`)

    return this
  }

  public output(outputPath: string): string[] {
    if (!this.inputPath) {
      throw new Error('Input path is not set!')
    }

    const args: string[] = [...this.options, this.inputPath, outputPath]

    return args
  }
}
