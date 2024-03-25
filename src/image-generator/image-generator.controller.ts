import { Controller, Get, StreamableFile } from '@nestjs/common';
import { ImageGeneratorService } from './image-generator.service';

@Controller()
export class ImageGeneratorController {
  constructor(private readonly service: ImageGeneratorService) {}

  @Get()
  async getHello(): Promise<StreamableFile | null> {
    return await this.service.generate();
  }
}
