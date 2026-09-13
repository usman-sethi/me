"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { type ReactNode, useRef } from "react";

import { useIsTouchDevice, usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Wraps a single real interactive element (a <Link> or <button>) and nudges
 * it a few pixels toward the cursor on hover. The child keeps its own href,
 * focus order, and click handling — this only offsets its rendered position,
 * so keyboard and screen-reader users see identical behavior to a plain link.
 */
export function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.4 });

  if (isTouch || prefersReducedMotion) {
    return <>{children}</>;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.3);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.3);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </m.div>
  );
}
