/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Directory } from './directory.entity';
import { PAGE_LIMIT } from '../senttings';
import { updateDirectoryDto } from './updateDirectoryDto';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>,
  ) { }

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

  async getById(id: number): Promise<Directory> {

    const directoy = await this.directoryRepository.findOne({ where: { id } });
    if (!directoy) {
      throw new NotFoundException(`Directoy with ID ${id} not found`);
    }
    return directoy;
  }

  async updateDirectory(id: number, data: updateDirectoryDto): Promise<Directory> {
    const directory = await this.directoryRepository.findOne({ where: { id } });

    const updatedDirectory = { ...directory, ...data };
    console.log(updatedDirectory)

    if (!directory) {
      throw new NotFoundException(`Directoy with ID ${id} not found`);
    }

    return await this.directoryRepository.save(updatedDirectory);
  }


  async deleteById(id: number) {
    const directory = await this.directoryRepository.findOne({ where: { id } });
    if (!directory) {
      throw new NotFoundException(`Directoy with ID ${id} not found`);
    }
    return this.directoryRepository.delete(id)
  }
}
