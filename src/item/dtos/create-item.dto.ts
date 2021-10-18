import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";
import { Genre } from '../models/genre.enum'

export class CreateItemDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    description: string;

    @Matches(`^${Object.values(Genre).join('|')}$`, 'i')
    genre: Genre;

}