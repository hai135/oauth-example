import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodo {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    completed!: string;
}
