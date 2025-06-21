import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { InviteService } from './invite/invite.service';
import { UserInviteService } from './user_invite/user_invite.service';
import { UserController } from './user/user.controller';
import { InviteController } from './invite/invite.controller';
import { UserInviteController } from './user_invite/user_invite.controller';
import { MetadataController } from './metadata/metadata.controller';
import { MetadataService } from './metadata/metadata.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    InviteController,
    UserInviteController,
    MetadataController,
  ],
  providers: [
    AppService,
    PrismaService,
    UserService,
    InviteService,
    UserInviteService,
    MetadataService
  ],
})
export class AppModule {}
