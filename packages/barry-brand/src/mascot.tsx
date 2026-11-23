import type { CSSProperties } from "react";
import { barryBrand } from "./index.js";
import "./mascot.css";

export const BARRY_EXPRESSIONS = [
  "idle",
  "thinking",
  "working",
  "talking",
  "success",
  "confused",
  "error",
  "waiting",
] as const;

export type BarryExpression = (typeof BARRY_EXPRESSIONS)[number];

type Face = {
  eyes: "happy" | "asymmetric" | "focused" | "attentive" | "concerned" | "relaxed";
  mouth: "smile" | "neutral" | "large-smile" | "uncertain" | "frown" | "talking";
};

type EyePaths = readonly [left: string, right: string];

const eyePaths: Record<Face["eyes"], EyePaths> = {
  happy: ["M31 52 Q36 44 41 52", "M59 52 Q64 44 69 52"],
  asymmetric: ["M31 52 Q35 42 41 49", "M59 50 Q64 55 69 49"],
  focused: ["M31 50 L41 52", "M59 52 L69 50"],
  attentive: ["M31 50 Q36 42 41 50 Q36 57 31 50 Z", "M59 50 Q64 42 69 50 Q64 57 59 50 Z"],
  concerned: ["M31 50 Q36 42 41 49", "M59 49 Q64 42 69 50"],
  relaxed: ["M31 51 Q36 48 41 51", "M59 51 Q64 48 69 51"],
};

const mouthPaths: Record<Face["mouth"], string> = {
  smile: "M50 66 V69 M43 68 Q50 75 57 68",
  neutral: "M44 69 Q50 70 56 69",
  "large-smile": "M41 67 Q50 78 59 67",
  uncertain: "M44 70 Q47 67 50 70 Q53 73 56 70",
  frown: "M43 72 Q50 68 57 72",
  talking: "M50 66 V69 M43 68 Q50 75 57 68",
};

export const BARRY_EXPRESSION_CONFIG: Record<BarryExpression, Face> = {
  idle: { eyes: "happy", mouth: "smile" },
  thinking: { eyes: "asymmetric", mouth: "neutral" },
  working: { eyes: "focused", mouth: "neutral" },
  talking: { eyes: "attentive", mouth: "talking" },
  success: { eyes: "happy", mouth: "large-smile" },
  confused: { eyes: "asymmetric", mouth: "uncertain" },
  error: { eyes: "concerned", mouth: "frown" },
  waiting: { eyes: "relaxed", mouth: "neutral" },
};

export function BarryMascot({
  expression,
  size = 120,
  label,
  motion = true,
  className,
}: {
  expression: BarryExpression;
  size?: number;
  label?: string;
  motion?: boolean;
  className?: string;
}) {
  const face = BARRY_EXPRESSION_CONFIG[expression];
  const classNames = ["barry-mascot", motion ? "barry-mascot--motion" : "", className]
    .filter(Boolean)
    .join(" ");
  const style = {
    "--barry-chocolate": barryBrand.colors.chocolate,
    "--barry-cream": barryBrand.colors.cream,
  } as CSSProperties;

  return (
    <svg
      className={classNames}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-expression={expression}
      data-motion={motion}
      data-eyes={face.eyes}
      data-mouth={face.mouth}
      style={style}
    >
      <rect className="barry-mascot__background" width="100" height="100" rx="24" />
      <path
        className="barry-mascot__head"
        d="M18 48 C13 44 14 35 18 31 C21 24 30 23 36 29 C43 27 57 27 64 29 C70 23 79 24 82 31 C86 35 87 44 82 48 C88 61 84 78 72 84 C61 90 39 90 28 84 C16 78 12 61 18 48 Z"
      />
      <g
        className="barry-mascot__eyes"
        fill="none"
        stroke="var(--barry-cream)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.4"
      >
        <path className="barry-mascot__eye barry-mascot__eye--left" d={eyePaths[face.eyes][0]} />
        <path className="barry-mascot__eye barry-mascot__eye--right" d={eyePaths[face.eyes][1]} />
        <circle className="barry-mascot__pupil" cx="36" cy="50" r="1.5" />
        <circle className="barry-mascot__pupil" cx="64" cy="50" r="1.5" />
      </g>
      <ellipse className="barry-mascot__muzzle" cx="50" cy="65" rx="15" ry="12" />
      <path className="barry-mascot__nose" d="M45 61 Q50 59 55 61 Q54 65 50 66 Q46 65 45 61 Z" />
      <path className="barry-mascot__mouth" d={mouthPaths[face.mouth]} />
      <ellipse className="barry-mascot__talk-mouth" cx="50" cy="70.5" rx="3.5" ry="4" />
    </svg>
  );
}
