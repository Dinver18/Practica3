import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Directory } from './directory.entity';
import { PAGE_LIMIT } from '../senttings';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>,
  ) {}

  getStatus(): string {
    return 'pong';
  }

  async getAll(page: number): Promise<any> {
    const limit = PAGE_LIMIT;
    const startIndex = (page - 1) * limit;

    const [results, totalItems] = await this.directoryRepository.findAndCount({
      skip: startIndex,
      take: limit,
    });

    const totalPages = Math.ceil(totalItems / limit);
    const nextPage =
      page < totalPages
        ? `http://localhost:3000/directories?page=${page + 1}`
        : null;
    const previousPage =
      page > 1 ? `http://localhost:3000/directories?page=${page - 1}` : null;

    return {
      count: totalItems,
      next: nextPage,
      previous: previousPage,
      results,
    };
  }

  async create(createDirectoryDto: {
    name: string;
    emails: string[];
  }): Promise<Directory> {
    const directory = this.directoryRepository.create(createDirectoryDto);
    return this.directoryRepository.save(directory);
  }
}
