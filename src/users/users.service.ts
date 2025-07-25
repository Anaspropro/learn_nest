/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { 
      'id': 1,
      'name': 'John Doe', 
      'email': 'johndoe@gmail.com', 
      'role': 'INTERN' 
    },
    { 
      'id': 2,
      'name': 'Jane Smith', 
      'email': 'janesmith@gmail.com', 
      'role': 'ENGINEER' 
    },
    { 
      'id': 3,
      'name': 'Alice Johnson', 
      'email': 'alicejohnson@gmail.com', 
      'role': 'ADMIN' 
    },
    { 
      'id': 4,
      'name': 'Bob Brown', 
      'email': 'bobbrown@gmail.com', 
      'role': 'INTERN' 
    },
    { 
      'id': 5,
      'name': 'Charlie White', 
      'email': 'charliewhite@gmail.com', 
      'role': 'ENGINEER' 
    },
  ]


  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roleArray = this.users.filter(user => user.role === role);
      if (roleArray.length === 0) {
        throw new NotFoundException(`No users found with role: ${role}`);
      }
      return roleArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user =  this.users.find(user => user.id === id);

    if(!user) throw new NotFoundException('User Not Found!!!')

    return user
  }

  create(createUserDto : CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
  }
}
