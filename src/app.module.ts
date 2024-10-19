import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DATABASE_CONFIG } from './senttings';
import { DirectoriesModule } from './directories/directories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    DirectoriesModule,
  ],
})
export class AppModule {}
