"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Every animated component in this project imports `m` (not `motion`) from
 * "motion/react" and relies on this provider having loaded the "domAnimation"
 * feature set (~17KB gzipped) once, app-wide, instead of each component
 * pulling in its own copy of the full animation engine.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
