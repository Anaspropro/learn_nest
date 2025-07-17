/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';


export class UpdateUserDto extends PartialType(CreateUserDto) {}