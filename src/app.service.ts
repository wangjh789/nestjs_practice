import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { temp: string } {
    return { temp: "testing" };
  }
}
