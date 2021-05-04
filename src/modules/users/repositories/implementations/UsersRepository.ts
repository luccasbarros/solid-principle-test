/* eslint-disable prettier/prettier */
import { response } from "express";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const userById = this.users.find((user: User) => {
      return user.id === id;
    });

    return userById;
  }

  findByEmail(email: string): User | undefined {
    const userByEmail = this.users.find((user: User) => {
      return user.email === email;
    });

    return userByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const objectCopy = { ...receivedUser };
    objectCopy.admin = true;
    objectCopy.updated_at = new Date();

    return objectCopy;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
