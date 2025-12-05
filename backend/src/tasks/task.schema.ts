import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

export enum Priority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}

@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    deadline: Date;

    @Prop({ required: true, enum: Priority, default: Priority.MEDIUM })
    priority: Priority;

    @Prop({ default: false })
    completed: boolean;

    @Prop()
    category: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
