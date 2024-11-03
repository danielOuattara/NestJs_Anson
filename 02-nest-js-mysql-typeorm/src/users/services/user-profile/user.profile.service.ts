import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { UserProfileEntity } from 'src/typeorm/entities/user.profile.entity';
import { TypeCreateUserProfile } from 'src/users/types/user-profile.types';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private userProfileRepository: Repository<UserProfileEntity>,
  ) {}

  //-----
  async createUserProfile(
    id: number,
    userProfileDetails: TypeCreateUserProfile,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newUserProfile = this.userProfileRepository.create({
      ...userProfileDetails,
    });

    const savedUserProfile =
      await this.userProfileRepository.save(newUserProfile);

    user.user_profile = savedUserProfile;
    return await this.userRepository.save(user);
  }

  //-----
  async getUserProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['user_profile'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // async patchUser(id: number, userDetails: TypeUpdateUser) {
  //   await this.userProfileRepository.update({ id }, userDetails);
  //   return this.fetchUsers();
  // }

  // async deleteUser(id: number) {
  //   await this.userProfileRepository.delete({ id });
  // }
}
