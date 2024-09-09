import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProperty, PropertyResponse } from './app.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Property') private readonly propertyModel: Model<IProperty>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getProperties(
    searchQuery?: string,
    room?: number,
    propertyType?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PropertyResponse> {
    let success: boolean = false;
    let message: string = 'Data not found.';

    if (isNaN(page) || page < 1) {
      throw new BadRequestException('Invalid page number');
    }

    if (isNaN(limit) || limit < 1) {
      throw new BadRequestException('Invalid limit');
    }

    const query: any = {};

    if (searchQuery) {
      query.$or = [
        { title: new RegExp(searchQuery, 'i') },
        { description: new RegExp(searchQuery, 'i') },
      ];
    }

    if (room) {
      query.rooms = room;
    }

    if (propertyType) {
      query.type = propertyType;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.propertyModel.find(query).skip(skip).limit(limit).exec(),
      this.propertyModel.countDocuments(query).exec(),
    ]);

    if (total) {
      success = true;
      message = 'Data found successfully.';
    }

    return {
      settings: {
        success,
        message,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data,
    };
  }
}
