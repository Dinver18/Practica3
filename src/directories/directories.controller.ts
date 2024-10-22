/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query, Param, Put, Delete, Patch } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { Directory } from './directory.entity';
import { createDirectoryDto } from './createDirectoryDto';
import { updateDirectoryDto } from './updateDirectoryDto';
import { DeleteResult } from 'typeorm';

@Controller()
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) { }

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
    @Body() createDirectoryDto: createDirectoryDto,
  ): Promise<Directory> {
    return this.directoriesService.create(createDirectoryDto);
  }

  @Get('/directories/:id')
  async getOne(@Param('id') id: string): Promise<Directory> {
    return this.directoriesService.getById(+id)
  }

  @Put('/directories/:id')
  async updateDirectory(
    @Param('id') id: string,
    @Body() updateDirectoryDto: updateDirectoryDto
  ): Promise<Directory> {
    console.log(updateDirectoryDto)
    return this.directoriesService.updateDirectory(+id, updateDirectoryDto)
  }

  @Delete('/directories/:id')
  async deleteDirectory(
    @Param('id') id: string
  ): Promise<DeleteResult> {
    console.log(id)
    return this.directoriesService.deleteById(+id)
  }

  @Patch('/directories/:id')
  async updatePartialDirectory(
    @Param('id') id: string,
    @Body() updateDirectoryDto: updateDirectoryDto
  ): Promise<Directory> {
    return this.directoriesService.updateDirectory(+id, updateDirectoryDto)
  }
}
