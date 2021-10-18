import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server')
  const port = serverConfig.port
  
  app.setGlobalPrefix('api') // npm run start:dev
  await app.listen(port); // http://1.247.55.89:33000/api

  Logger.log(`Application running on port ${port}`)
}
bootstrap();
