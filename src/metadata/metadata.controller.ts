import { Controller, Get, Param } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { Public } from 'src/auth/functions';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get()
  async getAll() {
    return this.metadataService.getAll();
  }

  @Get(':event')
  async getByEvent(@Param('event') event: string) {
    return this.metadataService.getByEvent(event);
  }
}
