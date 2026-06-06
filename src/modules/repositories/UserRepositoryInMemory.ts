import { User } from '../entides/User';
import { UserRepository } from './UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findByName(name: string): Promise<User[]> {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index >= 0) this.users[index] = user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }
}