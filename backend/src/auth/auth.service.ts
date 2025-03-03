import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  async signup(signupDto: SignupDto) {
    this.logger.log(
      `User signup attempt with email: ${signupDto.email}`,
      'AuthService',
    );

    // Create a new user
    const user = await this.usersService.create(signupDto);

    // Generate JWT token
    const payload: JwtPayload = { sub: user._id.toString(), email: user.email };
    const token = this.jwtService.sign(payload);

    this.logger.log(
      `User signup successful for email: ${signupDto.email}`,
      'AuthService',
    );

    return {
      user,
      accessToken: token,
    };
  }

  async signin(signinDto: SigninDto) {
    this.logger.log(
      `User signin attempt with email: ${signinDto.email}`,
      'AuthService',
    );

    try {
      // Find user by email
      const user = await this.usersService.findByEmail(signinDto.email);

      // Validate password
      const isPasswordValid = await user.comparePassword(signinDto.password);
      if (!isPasswordValid) {
        this.logger.warn(
          `Invalid password for user: ${signinDto.email}`,
          'AuthService',
        );
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token
      const payload: JwtPayload = {
        sub: user._id.toString(),
        email: user.email,
      };
      const token = this.jwtService.sign(payload);

      this.logger.log(
        `User signin successful for email: ${signinDto.email}`,
        'AuthService',
      );

      return {
        user,
        accessToken: token,
      };
    } catch (error) {
      this.logger.error(
        `Signin failed for email: ${signinDto.email}`,
        error.stack,
        'AuthService',
      );
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
