import mongoose, { Schema } from 'mongoose';
import { Pair } from '../interfaces/Pair';

export interface PersonalInterface {
  name: string;
  contacts: Array<Pair>;
  _links: Array<Pair>;
}

export interface PersonalModel extends PersonalInterface, Document {}

const PersonalSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    contacts: { type: Array<Pair>, require: false },
    _links: { type: Array<Pair>, require: false },
  },
  { versionKey: false }
);

export default mongoose.model<PersonalModel>('Personal', PersonalSchema);
