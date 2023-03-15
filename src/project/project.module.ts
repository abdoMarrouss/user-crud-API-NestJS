import { Module } from '@nestjs/common';
import { ProjectService } from './service/project.service';
import { ProjectController } from './controller/project.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "./schema/project.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema
      },
    ])
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
