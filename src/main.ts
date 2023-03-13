import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Get, Post } from "@nestjs/common";


const corsOptions = {
  origin: [
    'http://localhost:4200'],

  methodes:  [Get, Post],
  credentials: true,
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  await app.listen(3000);


}
bootstrap();
