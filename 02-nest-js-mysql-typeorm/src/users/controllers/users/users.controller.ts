import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/users/update-user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  PatchUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchUserDto: UpdateUserDto,
  ) {
    return this.userService.patchUser(id, patchUserDto);
  }

  @Delete(':id')
  DeleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
