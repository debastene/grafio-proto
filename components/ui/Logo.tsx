type Props = {
  className?: string;
  withRing?: boolean;
};

/**
 * Grafio compass mark — 12-point star inside a thin ring,
 * with a hollow donut center and a small dot in the middle.
 * Uses currentColor so it inherits text color (silver/white/cyan).
 */
export default function Logo({ className = "w-9 h-9 text-silver", withRing = true }: Props) {
  // 12 long spikes alternating around the circle
  const points: string[] = [];
  const cx = 250;
  const cy = 250;
  const longR = 215;
  const innerR = 70;
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const nextInner = ((i + 0.5) * 30 - 90) * (Math.PI / 180);
    points.push(`${cx + longR * Math.cos(angle)},${cy + longR * Math.sin(angle)}`);
    points.push(`${cx + innerR * Math.cos(nextInner)},${cy + innerR * Math.sin(nextInner)}`);
  }

  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Grafio logo"
    >
      <defs>
        <mask id="grafio-mark">
          <rect width="500" height="500" fill="black" />
          {withRing && (
            <>
              <circle cx="250" cy="250" r="240" fill="white" />
              <circle cx="250" cy="250" r="226" fill="black" />
            </>
          )}
          <polygon points={points.join(" ")} fill="white" />
          <circle cx="250" cy="250" r="56" fill="black" />
          <circle cx="250" cy="250" r="22" fill="white" />
        </mask>
      </defs>
      <rect width="500" height="500" fill="currentColor" mask="url(#grafio-mark)" />
    </svg>
  );
}
