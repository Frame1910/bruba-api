import { Controller, Get, Param } from '@nestjs/common';
import { MetadataService } from './metadata.service';

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
