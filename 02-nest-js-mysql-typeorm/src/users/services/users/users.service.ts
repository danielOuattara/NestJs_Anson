import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { TypeCreateUser, TypeUpdateUser } from 'src/users/types/user.types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async fetchUsers() {
    return await this.userRepository.find({
      relations: ['user_profile', 'posts'],
    });
  }

  async createUser(userDetails: TypeCreateUser) {
    const newUser = this.userRepository.create({ ...userDetails });
    return await this.userRepository.save(newUser);
  }

  async patchUser(id: number, userDetails: TypeUpdateUser) {
    await this.userRepository.update({ id }, userDetails);
    return this.fetchUsers();
  }

  async deleteUser(id: number) {
    await this.userRepository.delete({ id });
  }
}
