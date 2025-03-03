import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(
      `Creating new user with email: ${createUserDto.email}`,
      'UsersService',
    );

    // Check if user already exists
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      this.logger.warn(
        `User with email ${createUserDto.email} already exists`,
        'UsersService',
      );
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    this.logger.log(`Finding user by email: ${email}`, 'UsersService');

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      this.logger.warn(`User with email ${email} not found`, 'UsersService');
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    this.logger.log(`Finding user by id: ${id}`, 'UsersService');

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      this.logger.warn(`User with id ${id} not found`, 'UsersService');
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
