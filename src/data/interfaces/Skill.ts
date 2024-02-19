export default interface Skill {
  skill: string;
  category: string;
}

export function createSkill(skill: string, category: string): Skill {
  return { skill, category };
}
