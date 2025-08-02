import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseCategoriesModule } from './modules/course-categories/course-categories.module';
import { LoggerMiddleware } from './middeware/logger/logger.middleware';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseIntroductionModule } from './modules/course-introduction/course-introduction.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LessonVideosModule } from './modules/lesson-videos/lesson-videos.module';
import { UserCoursesModule } from './modules/user-courses/user-courses.module';
import { UserLessonProgressModule } from './modules/user-lesson-progress/user-lesson-progress.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { LessonQuestionChoiceModule } from './modules/lesson-question-choice/lesson-question-choice.module';
import { LessonPronounceModule } from './modules/lesson-pronounce/lesson-pronounce.module';
import { LessonQuestionFinalModule } from './modules/lesson-question-final/lesson-question-final.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
    AuthModule,
    CoursesModule,
    CourseCategoriesModule,
    CourseIntroductionModule,
    UserCoursesModule,
    UserAccountsModule,
    UserLessonProgressModule,
    LessonsModule,
    LessonVideosModule,
    LessonPronounceModule,
    LessonQuestionFinalModule,
    LessonQuestionChoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
