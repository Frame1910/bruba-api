import { Injectable } from '@nestjs/common';
import { UserInvite, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserInviteService {
  constructor(private prisma: PrismaService) {}

  async userInvite(
    userInviteWhereUniqueInput: Prisma.UserInviteWhereUniqueInput,
  ): Promise<UserInvite | null> {
    return this.prisma.userInvite.findUnique({
      where: userInviteWhereUniqueInput,
    });
  }

  async userInvites(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserInviteWhereUniqueInput;
    where?: Prisma.UserInviteWhereInput;
    orderBy?: Prisma.UserInviteOrderByWithRelationInput;
  }): Promise<UserInvite[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userInvite.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUserInvite(
    data: Prisma.UserInviteCreateInput,
  ): Promise<UserInvite> {
    return this.prisma.userInvite.create({
      data,
    });
  }

  async createManyUserInvite(data: Prisma.UserInviteCreateManyInput[]) {
    return this.prisma.userInvite.createMany({ data: data });
  }

  async updateUserInvite(params: {
    where: Prisma.UserInviteWhereUniqueInput;
    data: Prisma.UserInviteUpdateInput;
  }): Promise<UserInvite> {
    const { where, data } = params;
    return this.prisma.userInvite.update({
      data,
      where,
    });
  }

  async deleteUserInvite(
    where: Prisma.UserInviteWhereUniqueInput,
  ): Promise<UserInvite> {
    return this.prisma.userInvite.delete({
      where,
    });
  }
}
