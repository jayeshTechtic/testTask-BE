import { Schema } from 'mongoose';

export const PropertySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  rooms: { type: Number, required: true },
  image: { type: String, required: true },
});
