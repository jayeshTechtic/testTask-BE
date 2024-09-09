import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IProperty } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('properties')
  async getProperties(
    @Query('searchQuery') searchQuery?: string,
    @Query('room') room?: string,
    @Query('propertyType') propertyType?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<{
    success: boolean;
    message: string;
    data: IProperty[];
    pagination: any;
  }> {
    try {
      const roomNumber = room ? parseInt(room, 10) : undefined;
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      const result: any = await this.appService.getProperties(
        searchQuery,
        roomNumber,
        propertyType,
        pageNumber,
        limitNumber,
      );

      return result;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch properties',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
