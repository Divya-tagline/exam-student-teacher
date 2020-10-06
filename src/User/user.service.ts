import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { User } from '../types/user';
const saltRounds = 10;
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hash = bcrypt.hashSync(userDTO.password, saltRounds);
    userDTO.password = hash;
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async find() {
    return await this.userModel.find(); //
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userModel
      .findOne({ username })
      .select('username password seller created address');
    // console.log("user=>" + user);
    if (!user) {
      throw new HttpException(
        'Invalid credentials not found user',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const comparepassworn = await bcrypt.compare(password, user.password);
    if (comparepassworn) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException(
        'Invalid credentials not match password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async addtoken(token, user) {
    return await this.userModel.findByIdAndUpdate(user._id, { token: token });
  }
}
