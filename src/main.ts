import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
import { Logger, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server')
  const port = serverConfig.port
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //이상한 값 무시
    forbidNonWhitelisted: true, //이상한 값 붙은 요청을 거절
    transform: true, //자동 parse, url 은 string
  }
  ))
  app.enableCors();
  app.setGlobalPrefix('api') // npm run start:dev
  await app.listen(port); // http://1.247.55.89:33000/api

  Logger.log(`Application running on port ${port}`)
}
bootstrap();
