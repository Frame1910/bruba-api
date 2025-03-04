import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { InviteService } from './invite/invite.service';
import { UserController } from './user/user.controller';
import { InviteController } from './invite/invite.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, InviteController],
  providers: [AppService, PrismaService, UserService, InviteService],
})
export class AppModule {}
