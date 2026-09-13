import { AboutPreview } from "@/components/about/about-preview";
import { JourneyTimeline } from "@/components/about/journey-timeline";
import { ContactCta } from "@/components/contact/contact-cta";
import { Hero } from "@/components/hero/hero";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SkillsGrid } from "@/components/skills/skills-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SkillsGrid />
      <FeaturedProjects />
      <JourneyTimeline />
      <ContactCta />
    </>
  );
}
