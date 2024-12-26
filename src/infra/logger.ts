export interface Logger {
  info(message: string, meta: unknown): void
  error(message: string, meta: unknown): void
}

export class ConsoleLogger implements Logger {
  info(message: string, meta: unknown): void {
    console.info(message, meta)
  }

  error(message: string, meta: unknown): void {
    console.error(message, meta)
  }
}

class LoggerFactory {
  static createLogger(type: 'console'): Logger {
    switch (type) {
      case 'console':
        return new ConsoleLogger()
      default:
        throw new Error('Invalid logger type.')
    }
  }
}

export const log = LoggerFactory.createLogger('console')
