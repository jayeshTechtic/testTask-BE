import { Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  type: string;
  rooms: number;
  image: string;
}

export interface PropertyResponse {
  data: IProperty[];
  settings: {
    success?: boolean;
    message?: string;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
