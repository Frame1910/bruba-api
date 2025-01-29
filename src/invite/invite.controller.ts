import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InviteService } from './invite.service';
import { Prisma } from '@prisma/client';
import { UserInviteService } from '../user_invite/user_invite.service';

@Controller('invites')
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly userInviteService: UserInviteService,
  ) {}

  @Post('create')
  async createInvite(
    @Body()
    body: {
      invite: Prisma.InviteCreateInput;
      userInvites?: { userId: string; isPlusOne: boolean }[];
    },
  ) {
    const invite = await this.inviteService.createInvite(body.invite);
    if (body.userInvites) {
      const fullInvites: Prisma.UserInviteCreateManyInput[] =
        body.userInvites.map((userInvite) => ({
          ...userInvite,
          inviteCode: invite.code,
        }));
      const userInvites =
        await this.userInviteService.createManyUserInvite(fullInvites);
      return {
        ...invite,
        invitees: userInvites,
      };
    }
    return invite;
  }

  @Patch(':code')
  async updateInvite(
    @Body()
    inviteBody: Prisma.InviteUpdateInput,
    @Param('code') code: string,
  ) {
    return this.inviteService.updateInvite({
      where: { code: code },
      data: inviteBody,
    });
  }

  @Delete(':code')
  async deleteInvite(@Param('code') code: string) {
    return this.inviteService.deleteInvite({ code: code });
  }

  @Get()
  async getInvites() {
    return this.inviteService.invites({});
  }

  @Get(':code')
  async getInvite(@Param('code') code: string) {
    return this.inviteService.invite({ code: code });
  }
}
