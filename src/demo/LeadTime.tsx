/* The demo hero's drawing: the lead time to scale from the value stream, each block a step, work in violet. */
import type { ValueStep } from '../patterns/Maps';

export function LeadTime({ steps }: { steps: ValueStep[] }) {
  const total = steps.reduce((n, s) => n + s.waitDays + s.processDays, 0);
  const work = steps.reduce((n, s) => n + s.processDays, 0);
  const W = 340, gap = 2, H = 24, y = 18;
  const span = W - gap * (steps.length - 1);
  let x = 0;
  const segs = steps.map((s) => {
    const w = ((s.waitDays + s.processDays) / total) * span;
    const seg = { s, x, w, workW: Math.max(1.5, (s.processDays / total) * span) };
    x += w + gap;
    return seg;
  });
  const lead = segs.find((g) => g.s.bottleneck)!;
  const fmt = (d: number) => d.toFixed(1);
  const spoken = `Lead time ${fmt(total)} days across ${steps.length} steps, drawn to scale. Work takes ${fmt(work)} days in all; the rest is waiting. ${lead.s.name} waits ${lead.s.waitDays} days for ${lead.s.processTime} of work.`;
  return (
    <div className="flex flex-col gap-4">
      <p className="m-0 text-ui-m font-semibold text-ink">{fmt(total)} days from first notice to payment</p>
      <svg viewBox={`0 0 ${W} 64`} className="block h-auto w-full" role="img" aria-label={spoken}>
        {segs.map((g) => (
          <g key={g.s.name}>
            <rect x={g.x} y={y} width={g.w} height={H} rx={3} fill="var(--color-mark)" opacity={g.s.bottleneck ? 1 : 0.55} />
            <rect x={g.x + g.w - g.workW} y={y} width={g.workW} height={H} rx={1.5} fill="var(--color-signal)" />
          </g>
        ))}
        <text x={0} y={10} fontSize="11" fill="var(--color-ink-3)">{steps[0].name}</text>
        <text x={W} y={10} fontSize="11" textAnchor="end" fill="var(--color-ink-3)">{steps[steps.length - 1].name}</text>
        <text x={lead.x + lead.w / 2} y={y + H + 16} fontSize="11" fontWeight="600" textAnchor="middle" fill="var(--color-ink-2)">{lead.s.name}: {lead.s.waitDays} days waiting</text>
      </svg>
      <p className="m-0 text-caption text-ink-3">Each block is a step, drawn to scale. Violet is work: {fmt(work)} days in all. The rest is waiting.</p>
    </div>
  );
}
