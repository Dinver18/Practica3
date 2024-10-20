/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from "class-validator";

export class updateDirectoryDto {
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail({}, { each: true })
    emails?: string[];
}