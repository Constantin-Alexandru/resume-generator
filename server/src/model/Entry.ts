import mongoose, { Schema } from 'mongoose';

export interface EntryInterface {
  name: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  skills: Array<string>;
  section: string;
}

export interface EntryModel extends EntryInterface, Document {}

const EntrySchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: false },
    description: { type: String, require: true },
    skills: { type: Array<String>, require: true },
    section: { type: Schema.Types.ObjectId, require: true, ref: 'Section' },
  },
  { versionKey: false }
);

export default mongoose.model<EntryModel>('Entry', EntrySchema);
