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
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { MetadataController } from './metadata/metadata.controller';
import { MetadataService } from './metadata/metadata.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    InviteController,
    UserInviteController,
    AuthController,
    MetadataController,
  ],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    UserService,
    InviteService,
    UserInviteService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    MetadataService,
  ],
})
export class AppModule {}
