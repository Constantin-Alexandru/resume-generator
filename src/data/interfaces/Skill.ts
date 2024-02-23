export default interface Skill {
  skill: string;
  category: string;
}

export function createSkill(skill: string, category: string): Skill {
  return { skill, category };
}

export function getSkillIndex(skills: Skill[], skill: Skill): number {
  return skills.indexOf(skill);
}
