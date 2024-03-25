import { Module } from '@nestjs/common';
import { ImageGeneratorModule } from './image-generator/image-generator.module';

@Module({
  imports: [ImageGeneratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
