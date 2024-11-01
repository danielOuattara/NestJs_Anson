import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe');
    console.log('value : ', value);
    console.log('metadata :', metadata);

    const isNumeric = (string: string) => /^[+-]?\d+(\.\d+)?$/.test(string);

    if (isNumeric(value.age)) {
      return { ...value, age: parseInt(value.age) };
    }
    throw new HttpException('age must be a number', HttpStatus.BAD_REQUEST);
  }
}
