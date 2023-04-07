export interface ILoggerService {
  log(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  end(): void
}
