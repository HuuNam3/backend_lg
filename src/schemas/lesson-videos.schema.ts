import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonVideosDocument = LessonVideos & Document;

@Schema({
  collection: 'lesson_videos',
  timestamps: true,
  versionKey: false,
})
export class LessonVideos {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LessonVideosSchema = SchemaFactory.createForClass(LessonVideos);
