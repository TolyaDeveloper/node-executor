export class InkscapeBuilder {
  private inputPath: string
  private options: string[] = []

  constructor() {}

  public input(inputPath: string): this {
    this.inputPath = inputPath

    return this
  }

  setImageSize(width: number, height: number): this {
    this.options.push(`--export-width=${width}`)
    this.options.push(`--export-height=${height}`)

    return this
  }

  public output(outputPath: string): string[] {
    if (!this.inputPath) {
      throw new Error('Input path is not set!')
    }

    const args: string[] = [
      this.inputPath,
      ...this.options,
      `--export-filename=${outputPath}`
    ]

    return args
  }
}
