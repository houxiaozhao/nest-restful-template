import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import Sha256 = require('crypto-js/hmac-sha256');
import rand = require('csprng');
import { InjectModel } from 'src/common/transformers/model.transformer';
import { ConfigService } from 'nestjs-config';
import { User } from './user.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: Model<any>,
    private readonly config: ConfigService,
  ) {}
  async create(payload: { username: string; password: string; salt?: string }) {
    const salt = rand(256, 36);
    payload.password = Sha256(
      payload.password + salt,
      this.config.get('secret'),
    ).toString();
    payload.salt = salt;
    return this.userModel.create(payload);
  }
  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
}
