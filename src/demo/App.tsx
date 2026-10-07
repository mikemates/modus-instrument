import {
  AskPalette, BenchmarkBars, Button, CapabilityMatrix, Card, ChapterClose, ChapterRail, EmptyState, ErrorState, Figure, GoLink, Icons, InsightCard,
  Label, LinkButton, Logo, ModeSwitch, OpportunityCard, RoiModel, SegmentedTabs, ServiceBlueprint, Skeleton, Switch, Tag, TextField, TopBar, ValueStream,
} from '../index';
import * as s from '../data/sample';
import { LeadTime } from './LeadTime';

/** A section of the walkthrough: a hairline, then its claim at display-m in one tone. No eyebrow: the chapter rail
    already numbers and names it. */
function Section({ id, claim, intro, children }: { id: string; claim: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-8">
      <div className="flex flex-col gap-4 border-t border-hairline pt-8">
        <h2 className="m-0 max-w-[24ch] text-display-m text-ink">{claim}</h2>
        {intro ? <p className="m-0 mi-measure text-body-l text-ink-2">{intro}</p> : null}
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
            <ModeSwitch />
            <AskPalette items={s.askItems} answer={s.askAnswer} />
            <Button size="sm">Share</Button>
          </>
        }
      />

      <main className="mi-frame flex flex-col gap-24 pb-24 pt-10">
        {/* Hero: A's shared-border panel on B's paper */}
        <Card as="section" className="mi-dots grid grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6 border-b border-hairline bg-panel/80 p-6 sm:p-10 lg:border-b-0 lg:border-r">
            <div className="flex justify-end"><Label>Illustrative data</Label></div>
            <h1 className="m-0 font-display text-[length:var(--layout-hero)] font-normal leading-[1.03] tracking-[-0.02em] text-ink">
              Claims start fast and finish slow. <span className="text-ink-3">21 of 22 days are waiting, not work.</span>
            </h1>
            <p className="m-0 mi-measure text-body-l text-ink-2">
              Twelve adjuster interviews and five ride-alongs point to the same pattern: the first hour of a claim is quick; the next three weeks are queues — documents, reserves and an approval step nobody owns.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button iconEnd={<Icons.ArrowRight />}>Start the walkthrough</Button>
              <Button variant="secondary">Export brief</Button>
              <Button variant="ghost" iconEnd={<Icons.ArrowRight />}>Copy share link</Button>
            </div>
          </div>
          {/* What we heard, drawn: the lead time to scale from the value stream, work in violet. */}
          <div className="flex flex-col justify-center gap-5 bg-panel p-6 sm:p-10"><LeadTime steps={s.valueStream} /></div>
        </Card>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[var(--layout-rail)_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start"><ChapterRail chapters={s.chapters} /></aside>
          <div className="flex min-w-0 flex-col gap-24">
            <Section id="heard" claim="Simple claims wait behind complex ones.">
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

            <Section id="today" claim="Most of a claim happens out of the policyholder’s sight.">
              <Figure title="One commercial property claim, from first notice to payment" tag={<Tag>Illustrative</Tag>}><ServiceBlueprint phases={s.blueprintPhases} lanes={s.blueprintLanes} /></Figure>
            </Section>

            <Section id="leaks" claim="Investigation waits eight days for six hours of work.">
              <Figure title="First notice to payment, step by step" tag={<Tag>Illustrative</Tag>} caption="Median days per step"><ValueStream steps={s.valueStream} /></Figure>
            </Section>

            <Section id="compare" claim="Peers pay in 12.8 days; [Prospect] takes 22.4.">
              <div className="grid grid-cols-1 gap-10 2xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <CapabilityMatrix caption={s.matrix.caption} players={s.matrix.players} rows={s.matrix.rows} />
                <div className="flex flex-col gap-7">
                  <BenchmarkBars title={s.benchmark.title} source={s.benchmark.source} items={s.benchmark.items} max={25} />
                  <div className="rounded-panel bg-raised p-5">
                    <p className="m-0 text-statement text-ink">[Prospect] pays 9.6 days slower than the peer median — and almost all of the gap is queue time, not work.</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="build" claim="Start with the claims that shouldn’t wait at all.">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {s.opportunities.map((op) => <OpportunityCard key={op.id} opportunity={op} />)}
              </div>
              <div className="flex flex-col gap-2.5 pt-6">
                <Label>OPP-01 · Model · drag the assumptions</Label>
                <h3 className="m-0 text-title text-ink">What straight-through processing could be worth</h3>
              </div>
              <RoiModel defaults={s.roiDefaults} />
              <ChapterClose question="Which of these should the workshop test first?" action={<LinkButton href="#build" size="lg">Book the readout</LinkButton>} next={<GoLink href="#controls">See the kit</GoLink>} />
            </Section>

            <Section id="controls" claim="Controls and states">
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
        <div className="mi-frame flex flex-wrap justify-between gap-3 py-6 text-ink-2">
          <span className="flex items-center gap-2.5"><Logo variant="glyph" className="h-4" />Modus Instrument 0.1 · Confidential — prepared for [Prospect]</span>
          <span>Sample content — figures are illustrative</span>
        </div>
      </footer>
    </div>
  );
}
