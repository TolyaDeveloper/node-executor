import { ChildProcessWithoutNullStreams } from 'child_process'

import { ILoggerService } from '../../logger/logger.service.interface'

export class StreamHandler {
  constructor(private logger: ILoggerService) {}

  handleStream(stream: ChildProcessWithoutNullStreams) {
    stream.stdout.on('data', (data: any) => {
      this.logger.log(data.toString())
    })

    stream.stderr.on('data', (data: any) => {
      this.logger.error(data.toString())
    })

    stream.on('close', () => {
      this.logger.end()
    })
  }
}
