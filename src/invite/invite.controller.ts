import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
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

  @Patch(':code/update-status')
  async updateInviteStatus(
    @Param('code') code: string,
    @Body() body: { userId; status: string }[],
  ) {
    return this.userInviteService.updateManyUserInvite(body, code);
  }

  @Patch(':code/update-sports-carnival-status')
  async updateSportsCarnivalStatus(
    @Param('code') code: string,
    @Body() body: { userId; scstatus: string }[],
  ) {
    return this.userInviteService.updateManyUserSportsCarnival(body, code);
  }

  @Patch(':code/update-invite')
  async updateInvite(
    @Param('code') code: string,
    @Body() body: Prisma.InviteUpdateInput,
  ) {
    return this.inviteService.updateInvite({
      where: { code: code },
      data: body
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
  async getInvite(@Res() res, @Param('code') code: string) {
    console.log('Code:', code);
    const invite = await this.inviteService.invite({ code: code });
    if (invite) {
      console.log('Invite found:', invite);
      return res.status(200).send(invite);
    } else {
      console.log('Invite not found');
      return res.status(404).send('Invite not found');
    }
  }

  @Get(':code/invitees')
  async getInvitees(@Param('code') code: string) {
    return this.inviteService.invitees(code);
  }
}
