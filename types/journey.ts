export interface JourneyMilestone {
  id: string;
  /** Free-form period label, e.g. "2024" or "Semester 3" — never a fabricated exact date. */
  period: string;
  title: string;
  description: string;
  /** Used to render the git-log-style commit dot; not a claim of precise chronology. */
  current?: boolean;
}
