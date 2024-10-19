import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { Directory } from './directory.entity';

@Controller()
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Get('/status')
  getStatus(): string {
    return this.directoriesService.getStatus();
  }

  @Get('/directories')
  async getAll(@Query('page') page: number) {
    page = Number(page) || 1; // Asegurarse de que `page` sea un número y tenga un valor predeterminado de 1
    return this.directoriesService.getAll(page);
  }

  @Post('/directories')
  async create(
    @Body() createDirectoryDto: { name: string; emails: string[] },
  ): Promise<Directory> {
    return this.directoriesService.create(createDirectoryDto);
  }
}
