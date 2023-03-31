import { ILoggerService } from './logger.service.interface'

export class LoggerService implements ILoggerService {
  private static instance: LoggerService

  private constructor() {}

  public static getInstance() {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService()
    }

    return LoggerService.instance
  }

  public log(...args: any[]): void {
    console.log(args)
  }

  public warn(...args: any[]): void {
    console.log(args)
  }

  public error(...args: any[]): void {
    console.log(args)
  }

  public end(): void {
    console.log('Done')
  }
}
