import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() body: { inviteCode: string },
  ): Promise<{ access_token: string }> {
    const { inviteCode } = body;
    return this.authService.signIn(inviteCode);
  }
}
