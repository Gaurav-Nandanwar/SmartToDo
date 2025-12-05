import { IsNotEmpty, IsString, IsDateString, IsEnum, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { Priority } from '../task.schema';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsDateString()
    @IsNotEmpty()
    deadline: string;

    @IsEnum(Priority)
    @IsNotEmpty()
    priority: Priority;

    @IsString()
    @IsOptional()
    category?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsOptional()
    date?: string;

    @IsDateString()
    @IsOptional()
    deadline?: string;

    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;

    @IsString()
    @IsOptional()
    category?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];
}
