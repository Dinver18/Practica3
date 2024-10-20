/* eslint-disable prettier/prettier */
// src/settings.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Directory } from './directories/directory.entity';

// Cargar variables de entorno desde el archivo .env
config();

function getEnv(variable: string, defaultValue: any): any {
  return process.env[variable] || defaultValue;
}

// Configuración de la base de datos
export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: getEnv('DATABASE_HOST', 'localhost'),
  port: Number(getEnv('DATABASE_PORT', 5432)),
  username: getEnv('DATABASE_USERNAME', 'postgres'),
  password: getEnv('DATABASE_PASSWORD', 'yeniree0813'),
  database: getEnv('DATABASE_NAME', 'pract2'),
  entities: [Directory],
  autoLoadEntities: true,
  logging: true, // Habilita el registro de consultas SQL en la consola
  synchronize: true,
  keepConnectionAlive: true,
};

export const PAGE_LIMIT = Number(getEnv('PAGE_LIMIT', 10));
