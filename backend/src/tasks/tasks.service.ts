import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    ) { }

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const task = new this.taskModel({
            ...createTaskDto,
            userId,
        });
        return task.save();
    }

    async findAll(userId: string): Promise<Task[]> {
        return this.taskModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string, userId: string): Promise<Task> {
        const task = await this.taskModel.findById(id).exec();

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (task.userId.toString() !== userId) {
            throw new ForbiddenException('You do not have permission to access this task');
        }

        return task;
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
        // First verify ownership
        await this.findOne(id, userId);

        // Then update and return the updated document
        const updatedTask = await this.taskModel
            .findByIdAndUpdate(id, updateTaskDto, { new: true })
            .exec();

        return updatedTask;
    }

    async remove(id: string, userId: string): Promise<void> {
        // First verify ownership
        await this.findOne(id, userId);

        // Then delete
        await this.taskModel.findByIdAndDelete(id).exec();
    }
}
