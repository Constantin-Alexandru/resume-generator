import mongoose, { Schema } from 'mongoose';

export interface SectionInterface {
  name: string;
}

export interface SectionModel extends SectionInterface, Document {}

const SectionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

export default mongoose.model<SectionModel>('Section', SectionSchema);
