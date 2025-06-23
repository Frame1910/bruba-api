import { Controller, Get, Logger, Req } from '@nestjs/common';
import { AppService } from './app.service';
const packageJson = require('../../package.json');

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name, { timestamp: true });
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(@Req() req): string {
    this.logger.log(
      'Health check endpoint called, headers: ',
      JSON.stringify(req.headers),
    );
    return 'OK';
  }

  @Get('info')
  getAppInfo(@Req() req): { name: string; version: string } {
    this.logger.log(
      'App info endpoint called, headers: ',
      JSON.stringify(req.headers),
    );
    return {
      name: packageJson.name,
      version: packageJson.version,
    };
  }
}
