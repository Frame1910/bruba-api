import { Injectable } from '@nestjs/common';
import { Invite, Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InviteService {
  constructor(private prisma: PrismaService) {}

  async invite(
    inviteWhereUniqueInput: Prisma.InviteWhereUniqueInput,
  ): Promise<Invite | null> {
    return this.prisma.invite.findUnique({
      where: inviteWhereUniqueInput,
    });
  }

  async invites(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InviteWhereUniqueInput;
    where?: Prisma.InviteWhereInput;
    orderBy?: Prisma.InviteOrderByWithRelationInput;
  }): Promise<Invite[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.invite.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createInvite(data: Prisma.InviteCreateInput): Promise<Invite> {
    return this.prisma.invite.create({
      data,
    });
  }

  async updateInvite(params: {
    where: Prisma.InviteWhereUniqueInput;
    data: Prisma.InviteUpdateInput;
  }): Promise<Invite> {
    const { where, data } = params;
    return this.prisma.invite.update({
      data,
      where,
    });
  }

  async deleteInvite(where: Prisma.InviteWhereUniqueInput): Promise<Invite> {
    return this.prisma.invite.delete({
      where,
    });
  }

  async invitees(code: string) {
    return this.prisma.invite.findUnique({
      where: { code },
      include: {
        UserInvite: {
          include: { user: true },
        },
      },
    });
  }

  async inviteStats() {
    const total = await this.prisma.userInvite.aggregate({
      _count: true,
    });

    const accepted = await this.prisma.userInvite.aggregate({
      where: {
        status: 'ACCEPTED',
      },
      _count: true,
    });

    const pending = await this.prisma.userInvite.aggregate({
      where: {
        status: 'PENDING',
      },
      _count: true,
    });

    const declined = await this.prisma.userInvite.aggregate({
      where: {
        status: 'DECLINED',
      },
      _count: true,
    });

    return {
      total: total._count,
      accepted: accepted._count,
      pending: pending._count,
      declined: declined._count,
    };
  }
}
