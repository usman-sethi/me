export interface PlaygroundExperiment {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  /** Component key resolved to a dynamic import in the playground grid. */
  component: string;
}
