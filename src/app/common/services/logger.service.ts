import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  constructor(private logger: NGXLogger) {}

  trace(message: string, data?: any) {
    this.logger.trace(message, data);
  }
  debug(message: string, data?: any) {
    this.logger.debug(message, data);
  }
  info(message: string, data?: any) {
    this.logger.info(message, data);
  }
  log(message: string, data?: any) {
    this.logger.log(message, data);
  }
  warn(message: string, data?: any) {
    this.logger.warn(message, data);
  }
  error(message: string, data?: any) {
    this.logger.error(message, data);
  }
  fatal(message: string, data?: any) {
    this.logger.fatal(message, data);
  }
}
