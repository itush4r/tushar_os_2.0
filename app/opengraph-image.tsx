/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Tushar — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#e8e8e8",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#7f77dd",
            fontSize: "20px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          tushar · full stack engineer
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: "92px",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#e8e8e8",
          }}
        >
          Building production AI interfaces that ship.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "32px",
            color: "#888",
            fontSize: "26px",
          }}
        >
          Travelxp · AI Flight Quote CMS · BH4i
        </div>
      </div>
    ),
    { ...size },
  );
}
