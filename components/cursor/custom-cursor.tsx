"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useIsTouchDevice, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";

/**
 * A small dot that trails the pointer and expands slightly over interactive
 * elements. It is purely decorative: `pointer-events: none` means it can
 * never intercept a click, and the browser's native cursor is left on, so
 * removing this component (or it failing to render) changes nothing about
 * how the site can be used — see PART 47 of the build notes.
 */
export function CustomCursor() {
  const mounted = useMounted();
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!isVisible) setIsVisible(true);

      const target = event.target as HTMLElement | null;
      setIsHoveringInteractive(Boolean(target?.closest("a, button, [data-cursor='hover']")));
    }

    function handlePointerLeaveWindow() {
      setIsVisible(false);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeaveWindow);
    };
  }, [isTouch, prefersReducedMotion, isVisible, x, y]);

  if (!mounted || isTouch || prefersReducedMotion) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden rounded-full border border-primary mix-blend-difference md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        width: isHoveringInteractive ? 40 : 16,
        height: isHoveringInteractive ? 40 : 16,
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    />
  );
}
