export const SITE_CONFIG = {
  name: "Usman Sethi",
  role: "Full Stack Web Developer",
  shortBio:
    "Full Stack Web Developer building on the MERN stack, 3rd-semester student at the University of Peshawar.",
  // Production domain — make sure NEXT_PUBLIC_SITE_URL is set in .env.local
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usmansethi.ccsuop.com",
  education: {
    institution: "University of Peshawar",
    status: "3rd-semester student",
  },
  links: {
    github: "https://github.com/usman-sethi",
    linkedin: "https://www.linkedin.com/in/usman-sethi",
  },
  nav: [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/playground", label: "Playground" },
    { href: "/now", label: "Now" },
  ],
} as const;

export type SiteConfig = typeof SITE_CONFIG;
