import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, ObjectId } from '@mikro-orm/mongodb';
import { wrap } from '@mikro-orm/core';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const { email, username } = userDto;
    if (!email && !username) {
      throw new HttpException('Not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const userByEmail = await this.userRepository.findOne({ email });
    if (userByEmail) {
      throw new HttpException(
        'Email are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      const newUser = new UserEntity();

      wrap(newUser).assign(userDto);
      await this.userRepository.persist(newUser).flush();

      return newUser;
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      _id: [new ObjectId(userId)],
    });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
