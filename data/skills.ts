import type { SkillGroup } from "@/types/skill";

/**
 * `weight` only controls visual emphasis (node size in the hero graph, order
 * within a group) — it is not a proficiency rating or a public claim about
 * skill level. Primary stack items called out in the brief get weight 1;
 * supporting/foundational items get 0.6.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", category: "frontend", weight: 1 },
      { name: "Next.js", category: "frontend", weight: 1 },
      { name: "TypeScript", category: "frontend", weight: 1 },
      { name: "JavaScript", category: "frontend", weight: 1 },
      { name: "Tailwind CSS", category: "frontend", weight: 1 },
      { name: "HTML", category: "frontend", weight: 0.6 },
      { name: "CSS", category: "frontend", weight: 0.6 },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", category: "backend", weight: 1 },
      { name: "Express", category: "backend", weight: 1 },
      { name: "MongoDB", category: "backend", weight: 1 },
    ],
  },
  {
    category: "tools",
    label: "Tools",
    skills: [
      { name: "Git", category: "tools", weight: 1 },
      { name: "GitHub", category: "tools", weight: 1 },
      { name: "VS Code", category: "tools", weight: 0.6 },
    ],
  },
  {
    category: "cloud",
    label: "Cloud / Infrastructure",
    skills: [{ name: "AWS", category: "cloud", weight: 1 }],
  },
];

/** Flat list — used by the hero dependency graph and the project tech filters. */
export const ALL_SKILLS = SKILL_GROUPS.flatMap((group) => group.skills);
