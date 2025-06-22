import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InviteService } from 'src/invite/invite.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private inviteService: InviteService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    inviteCode: string,
  ): Promise<{ access_token: string; ttl: number }> {
    const invite = await this.inviteService.invite({ code: inviteCode });
    if (!invite) {
      throw new UnauthorizedException('Invalid invite code');
    }

    const payload = { sub: invite.code };
    return {
      access_token: await this.jwtService.signAsync(payload),
      ttl: 120, // Token Time To Live in seconds
    };
  }
}
