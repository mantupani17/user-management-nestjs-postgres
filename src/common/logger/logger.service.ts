// src/logger/winston-logger.service.ts
import { Injectable } from '@nestjs/common'
import { LoggerService } from '@nestjs/common'
import * as winston from 'winston'
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private readonly logger: winston.Logger

  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Default logging level
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            nestWinstonModuleUtilities.format.nestLike(), // NestJS-like format
            winston.format.colorize(),
          ),
        }),
      ],
    })
  }

  log(message: string) {
    this.logger.info(message)
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace)
  }

  warn(message: string) {
    this.logger.warn(message)
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  verbose(message: string) {
    this.logger.verbose(message)
  }
}
