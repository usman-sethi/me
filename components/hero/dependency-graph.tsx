"use client";

import { m } from "motion/react";
import { useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface GraphNode {
  label: string;
}

const NODES: GraphNode[] = [
  { label: "React" },
  { label: "Next.js" },
  { label: "TypeScript" },
  { label: "Tailwind" },
  { label: "Node.js" },
  { label: "Express" },
  { label: "MongoDB" },
  { label: "Git" },
  { label: "AWS" },
];

// Real relationships, not decorative connections: Next.js is built on React,
// Express runs on Node, Express talks to MongoDB.
const EXTRA_EDGES: [number, number][] = [
  [0, 1],
  [4, 5],
  [5, 6],
];

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 155;

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export function DependencyGraph() {
  const [hovered, setHovered] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const positions = NODES.map((_, index) => nodePosition(index, NODES.length));

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Diagram of Usman's stack: React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, Git, and AWS, connected to him at the center."
      className="h-full w-full"
    >
      {/* Hub-and-spoke connections */}
      {positions.map((pos, index) => {
        const isDimmed = hovered !== null && hovered !== index;
        return (
          <m.line
            key={`spoke-${NODES[index].label}`}
            x1={CENTER}
            y1={CENTER}
            x2={pos.x}
            y2={pos.y}
            stroke="var(--border)"
            strokeWidth={hovered === index ? 1.5 : 1}
            initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: isDimmed ? 0.35 : 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: index * 0.04 }}
          />
        );
      })}

      {/* Real stack relationships */}
      {EXTRA_EDGES.map(([a, b]) => (
        <m.line
          key={`edge-${a}-${b}`}
          x1={positions[a].x}
          y1={positions[a].y}
          x2={positions[b].x}
          y2={positions[b].y}
          stroke="var(--secondary)"
          strokeWidth={1}
          strokeDasharray="3 4"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.5 }}
        />
      ))}

      {/* Center node — Usman */}
      <m.g
        initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx={CENTER} cy={CENTER} r={34} fill="var(--primary)" />
        <text
          x={CENTER}
          y={CENTER + 4}
          textAnchor="middle"
          className="fill-primary-foreground font-mono text-[11px]"
          aria-hidden="true"
        >
          usman
        </text>
      </m.g>

      {/* Stack nodes */}
      {positions.map((pos, index) => (
        <m.g
          key={NODES[index].label}
          initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: 0.15 + index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "default" }}
        >
          <circle
            cx={pos.x}
            cy={pos.y}
            r={hovered === index ? 26 : 22}
            fill="var(--surface)"
            stroke={hovered === index ? "var(--primary)" : "var(--border)"}
            strokeWidth={1.5}
          />
          <text
            x={pos.x}
            y={pos.y + SIZE * 0.11 * (pos.y > CENTER ? 1 : -1)}
            textAnchor="middle"
            className="fill-current font-mono text-[10px] text-muted"
            aria-hidden="true"
          >
            {NODES[index].label}
          </text>
        </m.g>
      ))}
    </svg>
  );
}
