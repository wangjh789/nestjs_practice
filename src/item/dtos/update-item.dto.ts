import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";
import { Genre } from "../models/genre.enum";

export class UpdateItemDto {

    @IsString()
    @IsOptional()
    @MaxLength(30)
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    description: string;

    @IsOptional()
    @Matches(`^${Object.values(Genre).join('|')}$`, 'i')
    genre: Genre;
}