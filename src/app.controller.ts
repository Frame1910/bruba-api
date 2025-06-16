import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const packageJson = require('../../package.json');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): string {
    return 'OK';
  }

  @Get('info')
  getAppInfo(): { name: string; version: string } {
    return {
      name: packageJson.name,
      version: packageJson.version,
    };
  }
}
