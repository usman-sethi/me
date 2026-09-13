"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const COLS = 14;
const ROWS = 8;
const RESTING_SCALE = 0.4;

export function CursorGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      const bounds = container!.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;

      // Mutate transforms directly instead of routing through React state,
      // which would re-render up to 112 nodes on every pointer-move event.
      for (const dot of dotsRef.current) {
        if (!dot) continue;
        const dotX = dot.offsetLeft + dot.offsetWidth / 2;
        const dotY = dot.offsetTop + dot.offsetHeight / 2;
        const distance = Math.hypot(pointerX - dotX, pointerY - dotY);
        const scale = Math.max(RESTING_SCALE, 1 - distance / 180);
        dot.style.transform = `scale(${scale})`;
      }
    }

    function handlePointerLeave() {
      for (const dot of dotsRef.current) {
        if (dot) dot.style.transform = `scale(${RESTING_SCALE})`;
      }
    }

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Decorative interactive grid of dots that scale based on distance to the cursor"
      className="grid aspect-[7/4] w-full gap-3 rounded-lg border border-border bg-surface p-6"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            dotsRef.current[index] = el;
          }}
          className="aspect-square rounded-full bg-primary"
          style={{
            transform: `scale(${prefersReducedMotion ? 0.7 : RESTING_SCALE})`,
            transition: "transform 80ms ease-out",
          }}
        />
      ))}
    </div>
  );
}

export default CursorGrid;
