import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle(process.env.PROJECT_NAME)
    .setDescription('API description')
    .setVersion(process.env.API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
  console.log(`Project Name -> ${process.env.PROJECT_NAME}`);
  console.log('The server was started -> http://localhost:3000');
  console.log('Admin panel -> http://localhost:3000/admin');
  console.log('API docs -> http://localhost:3000/swagger');
}

bootstrap();
