import { Schema, model, Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  description: string;
  type: string;
  rooms: number;
  image: string;
}

const propertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  rooms: { type: Number, required: true },
  image: { type: String, required: true },
});

const Property = model<IProperty>("Property", propertySchema);

export default Property;
