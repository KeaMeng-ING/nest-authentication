import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { PassportLocalStrategy } from 'src/auth/guards/passport-local.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalStrategy)
  login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() request) {
    return request.user;
  }
}
