import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  Prisma,
  RelationType,
  Status,
  DietaryRestriction,
} from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body()
    user_body: {
      id?: string;
      firstName: string;
      lastName: string;
      mobile?: string | null;
      email?: string | null;
      status: string;
      relation: string;
      dietary?: string[];
    },
  ) {
    const user = {
      id: user_body.id,
      firstName: user_body.firstName,
      lastName: user_body.lastName,
      mobile: user_body.mobile,
      email: user_body.email,
      status: user_body.status as Status,
      relation: user_body.relation as RelationType,
      dietary: user_body.dietary.map(
        (dietary) => dietary as DietaryRestriction,
      ),
    };
    return this.userService.createUser(user);
  }

  @Patch(':id')
  async updateUser(
    @Body()
    user_body: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ) {
    return this.userService.updateUser({
      where: { id: id },
      data: user_body,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({ id: id });
  }

  @Get()
  async getUsers() {
    return this.userService.users({});
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.user({ id: id });
  }
}
