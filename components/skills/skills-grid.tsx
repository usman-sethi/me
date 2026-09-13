import { SKILL_GROUPS } from "@/data/skills";
import type { SkillCategory } from "@/types/skill";

const CATEGORY_DOT_CLASS: Record<SkillCategory, string> = {
  frontend: "bg-cat-frontend",
  backend: "bg-cat-backend",
  tools: "bg-cat-tools",
  cloud: "bg-cat-cloud",
};

export function SkillsGrid() {
  return (
    <section className="content-grid py-16 md:py-24" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-h2 font-display text-ink">
        What he works with
      </h2>
      <p className="mt-3 max-w-[60ch] text-body text-muted">
        Grouped by where each piece sits in a full-stack app — the dot color matches the category,
        not a skill rating.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${CATEGORY_DOT_CLASS[group.category]}`}
                aria-hidden="true"
              />
              <h3 className="text-small font-medium text-muted">{group.label}</h3>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {group.skills.map((skill) => (
                <li key={skill.name} className="font-mono text-small text-ink">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
