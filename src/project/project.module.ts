import { Module } from '@nestjs/common';
import { ServiceService } from './service/service.service';
import { ControllerController } from './controller/controller.controller';

@Module({
  providers: [ServiceService],
  controllers: [ControllerController]
})
export class ProjectModule {}
