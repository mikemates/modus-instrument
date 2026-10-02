import {
  AskPalette, BenchmarkBars, Button, CapabilityMatrix, Card, ChapterRail, EmptyState, ErrorState, Figure, Icons, InsightCard,
  Label, Logo, OpportunityCard, RoiModel, SegmentedTabs, ServiceBlueprint, Skeleton, StatTile, Switch, TextField, ThemeToggle, TopBar, ValueStream,
} from '../index';
import * as s from '../data/sample';

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-8">
      <div className="flex flex-col gap-2.5 border-t border-hairline pt-8">
        <Label>{eyebrow}</Label>
        <h2 className="m-0 text-display-m text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function App() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <TopBar
        className="sticky top-0 z-10"
        context="Prepared for [Prospect] · Commercial claims POV"
        sections={[{ label: 'Brief', current: true }, { label: 'Insights' }, { label: 'Maps' }, { label: 'Benchmarks' }, { label: 'Opportunities' }]}
        actions={
          <>
            <ThemeToggle />
            <AskPalette items={s.askItems} answer={s.askAnswer} />
            <Button size="sm">Share</Button>
          </>
        }
      />

      <main className="mx-auto flex max-w-[1440px] flex-col gap-24 px-4 pb-24 pt-10 sm:px-8 lg:px-16">
        {/* Hero: A's shared-border panel on B's paper */}
        <Card as="section" className="mi-dots grid grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6 border-b border-hairline bg-panel/80 p-6 sm:p-10 lg:border-b-0 lg:border-r">
            <div className="flex justify-between"><Label>Fig 1.0 — POV headline</Label><Label>Illustrative data</Label></div>
            <h1 className="m-0 text-[clamp(40px,5vw,64px)] font-normal leading-[1.03] tracking-[-0.04em] text-ink">
              Claims start fast and finish slow. <span className="text-ink-3">21 of 22 days are waiting, not work.</span>
            </h1>
            <p className="m-0 max-w-[620px] text-body-l text-ink-2">
              Twelve adjuster interviews and five ride-alongs point to the same pattern: the first hour of a claim is quick; the next three weeks are queues — documents, reserves and an approval step nobody owns.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button iconEnd={<Icons.ArrowRight />}>Start the walkthrough</Button>
              <Button variant="secondary">Export brief</Button>
              <Button variant="ghost" iconEnd={<Icons.ArrowRight />}>Copy share link</Button>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 bg-panel p-6 sm:p-10">
            <StatTile size="xl" label="Lead time · FNOL → payment" value="22.4" unit="days" />
            <div className="grid grid-cols-2 border-t border-hairline">
              <StatTile size="m" label="Flow efficiency" value="6.2%" className="border-r border-hairline pr-4 pt-4" />
              <StatTile size="m" label="Hand-offs" value="11" className="pl-4 pt-4" />
            </div>
            <StatTile size="m" label="Against peers" value="+9.6 d" delta={{ text: 'slower than the peer median', direction: 'down', good: false }} />
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start"><ChapterRail chapters={s.chapters} /></aside>
          <div className="flex min-w-0 flex-col gap-24">
            <Section id="heard" eyebrow="01 · What we heard" title="Three insights carry the story">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SegmentedTabs label="Content type" items={[{ value: 'insights', label: 'Insights' }, { value: 'maps', label: 'Maps' }, { value: 'opps', label: 'Opportunities' }]} />
                <TextField label="Search insights" hideLabel search placeholder="Search insights" className="w-60" />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {s.insights.map((it, i) => <InsightCard key={it.id} insight={it} selected={i === 2} selectedNote="Added to the brief · slide 4" />)}
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="flex flex-col gap-2.5"><Label>Loading · after 400ms</Label><Skeleton /></div>
                <div className="flex flex-col gap-2.5"><Label>Empty · filters return nothing</Label>
                  <EmptyState title="No insights match these filters." description="Nothing is tagged Field adjuster in the Payment stage yet. Try another stage, or clear the filters." actions={<><Button size="sm">Clear filters</Button><Button size="sm" variant="secondary">Browse all 24</Button></>} />
                </div>
                <div className="flex flex-col gap-2.5"><Label>Error · evidence failed to load</Label>
                  <ErrorState what="Couldn’t load interview excerpts" title="The quotes for these insights didn’t arrive." detail="The research library timed out. Your filters and selections are kept — nothing was lost." actions={<><Button size="sm">Try again</Button><Button size="sm" variant="secondary">Show without quotes</Button></>} />
                </div>
              </div>
            </Section>

            <Section id="today" eyebrow="02 · How it works today" title="Service blueprint, commercial property claim">
              <Figure title="Five phases, four lanes" fig="Fig 2.1 · illustrative"><ServiceBlueprint phases={s.blueprintPhases} lanes={s.blueprintLanes} /></Figure>
            </Section>

            <Section id="leaks" eyebrow="03 · Where value leaks" title="Value stream, first notice to payment">
              <Figure title="Seven steps, one queue that matters" fig="Fig 3.1 · median"><ValueStream steps={s.valueStream} /></Figure>
            </Section>

            <Section id="compare" eyebrow="04 · How you compare" title="Capability and speed against peers">
              <div className="grid grid-cols-1 gap-10 2xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <CapabilityMatrix caption={s.matrix.caption} players={s.matrix.players} rows={s.matrix.rows} />
                <div className="flex flex-col gap-7">
                  <BenchmarkBars title={s.benchmark.title} source={s.benchmark.source} items={s.benchmark.items} max={25} />
                  <div className="flex flex-col gap-2.5 rounded-panel bg-raised p-5">
                    <Label>What this says</Label>
                    <p className="m-0 text-statement text-ink">[Prospect] pays 9.6 days slower than the peer median — and almost all of the gap is queue time, not work.</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="build" eyebrow="05 · What to build" title="Three opportunities, two kinds">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {s.opportunities.map((op) => <OpportunityCard key={op.id} opportunity={op} />)}
              </div>
              <div className="flex flex-col gap-2.5 pt-6">
                <Label>OPP-01 · Model · drag the assumptions</Label>
                <h3 className="m-0 text-title text-ink">What straight-through processing could be worth</h3>
              </div>
              <RoiModel defaults={s.roiDefaults} />
            </Section>

            <Section id="controls" eyebrow="Kit" title="Controls and states">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <Label>Buttons</Label>
                  <div className="flex flex-wrap gap-3"><Button>Default</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button disabled>Disabled · needs data</Button></div>
                  <div className="flex flex-wrap gap-3"><Button size="sm">Small</Button><Button size="lg">Large</Button></div>
                </div>
                <div className="flex flex-col gap-4">
                  <Label>Fields and switches</Label>
                  <TextField label="Prospect name" placeholder="e.g. [Prospect]" description="Shown in the top bar and on exports." />
                  <TextField label="Workshop date" defaultValue="Oct 32" error="Enter a real date, like Oct 14. Nothing else was changed." />
                  <div className="flex flex-wrap gap-6"><Switch label="Presenter mode" defaultChecked /><Switch label="Site motion" defaultChecked /></div>
                </div>
              </div>
              <AskPalette inline items={s.askItems} answer={s.askAnswer} defaultQuery="approval" />
            </Section>
          </div>
        </div>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 px-4 py-6 text-xs text-ink-2 sm:px-8 lg:px-16">
          <span className="flex items-center gap-2.5"><Logo variant="glyph" className="h-4" />Modus Instrument 0.1 · Confidential — prepared for [Prospect]</span>
          <span>Sample content — figures are illustrative</span>
        </div>
      </footer>
    </div>
  );
}
