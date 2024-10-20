/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';
import { Directory } from './directory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Directory])],
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
})
export class DirectoriesModule {}
