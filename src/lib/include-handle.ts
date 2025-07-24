import { PipelineStage, Types } from 'mongoose';

export function includeHandle(
  inc: any,
  inclocalField: string,
  incforeignField: string,
  id?: string,
  slug?: string,
) {
  // const arrayColl = ['courses', 'course_categories'];
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
      localField: inclocalField,
      foreignField: incforeignField,
      as: inc as string,
    },
  });

  return pipeline;
}

export enum Collections {
  courses = 'courses',
  courseCategories = 'course_categories',
  courseIntroduction = 'course_introduction',
}

export function checkCollections(value: unknown): value is Collections {
  return Object.values(Collections).includes(value as Collections);
}
