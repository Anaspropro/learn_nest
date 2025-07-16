/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

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
      return this.users.filter(user => user.role === role);
    }
    return this.users;
  }

  findOne(id: string) {
    const user =  this.users.find(user => user.id === +id);
    return user
  }
  create(user: { name: string; email: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number,updateUser: { name?: string; email?: string; role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updateUser };
      }
      return user;
    });
    return this.findOne(id.toString());
  }

  delete(id: number) {
    const removedUser = this.findOne(id.toString());
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
  }
}
