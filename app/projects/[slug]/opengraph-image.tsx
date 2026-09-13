import { ImageResponse } from "next/og";

import { getProjectBySlug } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? "Project";
  const technologies = project?.technologies.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0A0B0E",
          color: "#F4F6F8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#8B93A1" }}>{SITE_CONFIG.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.15 }}>
            {title}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            {technologies.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#5B85FF",
                  border: "1px solid #232733",
                  borderRadius: 999,
                  padding: "8px 20px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
