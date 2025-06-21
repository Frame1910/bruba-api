import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.metadata.findMany();
  }

  async getByEvent(event: string) {
    return this.prisma.metadata.findUnique({
      where: { event },
    });
  }
}
