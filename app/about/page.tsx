import type { Metadata } from "next";

import { JourneyTimeline } from "@/components/about/journey-timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { SKILL_GROUPS } from "@/data/skills";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";
import { personSchema, webPageSchema } from "@/lib/seo/schema";

const PAGE = {
  title: "About",
  description:
    "Usman Sethi is a full stack web developer and 3rd-semester student at the University of Peshawar, building on the MERN stack.",
  path: "/about",
};

export const metadata: Metadata = buildMetadata(PAGE);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema(PAGE)} />
      <JsonLd data={personSchema()} />

      <section className="content-grid py-16 md:py-24">
        <h1 className="text-h1 font-display text-ink">About</h1>

        <div className="mt-8 max-w-[68ch] text-body-lg text-muted">
          <p>
            Usman Sethi is a {SITE_CONFIG.education.status.toLowerCase()} at the{" "}
            {SITE_CONFIG.education.institution}. Coursework got him started; building things is
            what kept him going. Most of what he knows about full stack development came from
            picking a project, getting stuck, and working through it rather than from any single
            course.
          </p>
          <p className="mt-5">
            His stack right now is the MERN stack — React on the front end, Node.js and Express on
            the back end, MongoDB for data — plus TypeScript and Next.js, which he&apos;s been
            deliberately spending more time in recently. Tailwind CSS handles styling, and Git and
            GitHub are the default for every project, not an afterthought.
          </p>
          <p className="mt-5">
            He&apos;s not presenting himself as a finished product. Being early in a computer
            science degree means there&apos;s a lot still ahead — AWS and cloud infrastructure are
            the current frontier, and the plan is to keep closing that gap by building real,
            working things rather than only reading about them.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-h2 font-display text-ink">Current stack</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_GROUPS.map((group) => (
              <div key={group.category}>
                <h3 className="text-small font-medium text-muted">{group.label}</h3>
                <ul className="mt-3 flex flex-col gap-1.5 font-mono text-small text-ink">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>{skill.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JourneyTimeline />
    </>
  );
}
