import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. 회원가입
  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // 2. 로그인
  @Post('login')
  loginUser(@Body() createUserDto: Omit<CreateUserDto, 'passwordCheck'>) {
    return this.authService.login(createUserDto);
  }

  // 3. 토큰 재발급
  @Post('token/access')
  async rotateAccessToken(@Request() req) {
    console.log(req);
    return {
      accessToken: await this.authService.issueToken(req.user, false),
      refreshToken: await this.authService.issueToken(req.user, true),
    };
  }
}
