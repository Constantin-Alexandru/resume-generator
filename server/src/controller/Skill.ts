import Logging from '../libraries/Logging';
import Skill, { SkillInterface } from '../model/Skill';

export function createSkill(name: string, type: string) {
  const skill = new Skill({ name, type });

  skill.save().then().catch(Logging.error);
}

export async function getAllSkills(): Promise<Array<SkillInterface>> {
  return await Skill.find();
}
