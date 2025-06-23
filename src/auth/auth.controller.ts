import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './functions';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() body: { inviteCode: string },
  ): Promise<{ access_token: string; ttl: number }> {
    const { inviteCode } = body;
    return this.authService.signIn(inviteCode);
  }
}
