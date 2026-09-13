export type SkillCategory = "frontend" | "backend" | "tools" | "cloud";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** 0-1, used only for the hero graph's node emphasis, not shown as a numeric "rating". */
  weight: number;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}
