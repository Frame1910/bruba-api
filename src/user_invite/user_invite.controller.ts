import {
  Body,
  Controller,
  Delete,
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

  @Get(':inviteCode/status')
  async getUserInvite(
    @Param('inviteCode') inviteCode: string,
  ) {
    const userInvite = await this.userInviteService.userInvites({
      where: {
        inviteCode: inviteCode,
      },
    });

    if (userInvite.length === 0) {
      throw new HttpException('User invite not found', HttpStatus.NOT_FOUND);
    }
    return {
      users: userInvite.map(invite => ({
        status: invite.status,
      })),
    };
  }

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

  @Delete(':inviteCode/:userId')
  async deleteUserInvite(@Param('inviteCode') inviteCode: string, @Param('userId') userId: string) {
    const userInvite = await this.userInviteService.userInvites({
      where: {
        inviteCode: inviteCode,
        userId: userId,
      },
    });

    if (userInvite.length === 0) {
      throw new HttpException('User invite not found', HttpStatus.NOT_FOUND);
    }

    return this.userInviteService.deleteUserInvite({
      userId: userId,
      userId_inviteCode: {
        userId: userId,
        inviteCode: inviteCode,
      }
    });
  }
}
