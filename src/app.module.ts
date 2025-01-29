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

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    InviteController,
    UserInviteController,
  ],
  providers: [
    AppService,
    PrismaService,
    UserService,
    InviteService,
    UserInviteService,
  ],
})
export class AppModule {}
