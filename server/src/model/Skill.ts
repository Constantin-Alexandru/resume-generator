import mongoose, { Schema } from 'mongoose';

export interface SkillInterface {
  name: string;
  type: string;
}

export interface SkillModel extends SkillInterface, Document {}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, require: true, unique: true },
    type: { type: String, require: true },
  },
  { versionKey: false }
);

export default mongoose.model<SkillModel>('Skill', SkillSchema);
