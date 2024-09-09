import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertySchema } from './app.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://techticjayeshbambhaniya:jHBTbKLPIqXVq0y6@testtask.umjdk.mongodb.net/?retryWrites=true&w=majority&appName=testtask',
    ),
    MongooseModule.forFeature([{ name: 'Property', schema: PropertySchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
