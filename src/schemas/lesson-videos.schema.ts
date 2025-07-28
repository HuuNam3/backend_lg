import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonVideosDocument = LessonVideos & Document;

@Schema({
  collection: 'lesson_videos',
  timestamps: true,
  versionKey: false,
})
export class LessonVideos {
  @Prop()
  lesson_id: Types.ObjectId;

  @Prop()
  subtitle: string;

  @Prop()
  url: string;

  @Prop()
  title: string;

  @Prop()
  durations: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LessonVideosSchema = SchemaFactory.createForClass(LessonVideos);
