/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createDirectoryDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { each: true }) // Validar cada elemento del array
    emails: string[];

}