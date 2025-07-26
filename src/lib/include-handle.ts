import { PipelineStage, Types } from 'mongoose';

export function includeHandle(inc: any, id?: string, slug?: string) {
  const pipeline: PipelineStage[] = [];

  if (id) {
    pipeline.push({
      $match: {
        _id: new Types.ObjectId(id),
      },
    });
  }

  if (slug) {
    pipeline.push({
      $match: {
        slug: slug,
      },
    });
  }

  pipeline.push({
    $lookup: {
      from: inc as string,
      localField: '_id',
      foreignField: getForeignField(inc),
      as: inc as string,
    },
  });

  return pipeline;
}

export enum Collections {
  courses = 'courses',
  lessons = 'lessons',
  courseIntroduction = 'course_introduction',
  courseCategories = 'course_categories',
}

const foreignFieldMap: Record<Collections, string> = {
  [Collections.courses]: 'course_categories_id',
  [Collections.lessons]: 'course_id',
  [Collections.courseIntroduction]: 'course_id',
  [Collections.courseCategories]: '',
};

function getForeignField(collection: string): string {
  const field = foreignFieldMap[collection as Collections];
  return field;
}

export function checkCollections(value: unknown): value is Collections {
  return Object.values(Collections).includes(value as Collections);
}
