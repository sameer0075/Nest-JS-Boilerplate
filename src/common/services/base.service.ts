import { Repository } from 'typeorm';

export class BaseService<T> {
  private repo;
  constructor(repo: Repository<T>) {
    this.repo = repo;
  }

  async findAll(opts?): Promise<T[]> {
    return this.repo.find(opts);
  }

  async findOne(opts?): Promise<T> {
    return this.repo.findOne(opts);
  }

  async save(data: any): Promise<T> {
    return this.repo.save(data);
  }

  async update(id: any, data: any): Promise<any> {
    return this.repo.update(id, data);
  }

  async delete(id: any): Promise<any> {
    return this.repo.delete(id);
  }

  async softDelete(id: any): Promise<any> {
    return this.repo.softDelete(id);
  }
}