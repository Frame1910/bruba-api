import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserInviteService } from './user_invite.service';
import { Prisma } from '@prisma/client';

@Controller('user-invites')
export class UserInviteController {
  constructor(private readonly userInviteService: UserInviteService) {}

  @Post(':inviteCode')
  async addUsersToInvite(
    @Param('inviteCode') inviteCode: string,
    @Body() userInvites: { userId: string; isPlusOne: boolean }[],
  ) {
    const fullInvites: Prisma.UserInviteCreateManyInput[] = userInvites.map(
      (userInvite) => {
        return {
          inviteCode: inviteCode,
          ...userInvite,
        };
      },
    );
    return this.userInviteService.createManyUserInvite(fullInvites);
  }

  @Post(':inviteCode/plus-one')
  async addPlusOne(
    @Param('inviteCode') inviteCode: string,
    @Body() plusOne: { userId: string; isPlusOne: boolean },
  ) {
    const currentInvites = await this.userInviteService.userInvites({
      where: {
        inviteCode: inviteCode,
      },
    });
    const numNonPlusOnes = currentInvites.filter(
      (invite) => !invite.isPlusOne,
    ).length;

    if (numNonPlusOnes + 1 === currentInvites.length) {
      throw new HttpException(
        'Cannot have more than 1 plus one.',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.userInviteService.createUserInvite({
      invite: {
        connect: {
          code: inviteCode,
        },
      },
      user: {
        connect: {
          id: plusOne.userId,
        },
      },
      isPlusOne: plusOne.isPlusOne,
    });
  }

  @Get(':inviteCode')
  async getUserInvites(@Param('inviteCode') inviteCode: string) {
    return this.userInviteService.userInvites({
      where: {
        inviteCode: inviteCode,
      },
    });
  }
}
