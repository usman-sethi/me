"use client";

import { useMemo, useState } from "react";

function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) return null;
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

function relativeLuminance([r, g, b]: [number, number, number]) {
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hexA: string, hexB: string): number | null {
  const rgbA = hexToRgb(hexA);
  const rgbB = hexToRgb(hexB);
  if (!rgbA || !rgbB) return null;
  const [l1, l2] = [relativeLuminance(rgbA), relativeLuminance(rgbB)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

function verdict(ratio: number, threshold: number) {
  return ratio >= threshold;
}

export function ContrastChecker() {
  const [foreground, setForeground] = useState("#0b0d10");
  const [background, setBackground] = useState("#f6f8fa");

  const ratio = useMemo(() => contrastRatio(foreground, background), [foreground, background]);

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-small font-medium text-ink">Text color</span>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="color"
              value={foreground}
              onChange={(event) => setForeground(event.target.value)}
              className="h-9 w-9 rounded border border-border"
              aria-label="Pick text color"
            />
            <input
              type="text"
              value={foreground}
              onChange={(event) => setForeground(event.target.value)}
              className="w-full rounded-md border border-border bg-paper px-3 py-2 font-mono text-small text-ink"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-small font-medium text-ink">Background color</span>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="color"
              value={background}
              onChange={(event) => setBackground(event.target.value)}
              className="h-9 w-9 rounded border border-border"
              aria-label="Pick background color"
            />
            <input
              type="text"
              value={background}
              onChange={(event) => setBackground(event.target.value)}
              className="w-full rounded-md border border-border bg-paper px-3 py-2 font-mono text-small text-ink"
            />
          </div>
        </label>
      </div>

      <div
        className="mt-6 flex items-center justify-center rounded-md border border-border py-10 text-h3 font-display"
        style={{ backgroundColor: background, color: foreground }}
      >
        Sample text
      </div>

      <div className="mt-6" aria-live="polite">
        {ratio === null ? (
          <p className="text-small text-danger">Enter two valid hex colors (e.g. #2451f2).</p>
        ) : (
          <>
            <p className="font-mono text-body-lg text-ink">{ratio.toFixed(2)}:1</p>
            <ul className="mt-3 flex flex-wrap gap-3 text-small">
              {[
                { label: "AA — normal text", threshold: 4.5 },
                { label: "AA — large text", threshold: 3 },
                { label: "AAA — normal text", threshold: 7 },
              ].map((rule) => (
                <li
                  key={rule.label}
                  className={
                    verdict(ratio, rule.threshold)
                      ? "text-secondary"
                      : "text-danger"
                  }
                >
                  {rule.label}: {verdict(ratio, rule.threshold) ? "Pass" : "Fail"}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default ContrastChecker;
