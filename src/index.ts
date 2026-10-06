/* Modus Instrument — public entry. Import components from here, never from deep paths. */
export { Button, LinkButton, GoLink, type ButtonProps, type LinkButtonProps, type GoLinkProps, type ButtonVariant, type ButtonSize } from './components/Button';
export { Label, Tag, Card, EvidenceMeter, EVIDENCE_LEVELS, StatTile, type EvidenceMeterProps, type StatTileProps } from './components/Primitives';
export { TextField, SegmentedTabs, Switch, Slider, ThemeToggle, ModeSwitch, setTheme, type TextFieldProps, type SegmentedTabsProps, type TabItem, type SwitchProps, type SliderProps, type ThemeId } from './components/Controls';
export { Skeleton, EmptyState, ErrorState, type EmptyStateProps, type ErrorStateProps } from './components/States';
export { AccordionList, RowMark, type AccordionItem } from './components/Accordion';
export { useFitSticky } from './lib/useFitSticky';
export { Logo, type LogoProps, type LogoVariant } from './components/Logo';
export * as Icons from './components/icons';
export { InsightCard, OpportunityCard, Figure, type Insight, type InsightCardProps, type Opportunity } from './patterns/Cards';
export { TopBar, ChapterRail, SectionRail, AskPalette, type TopBarProps, type Chapter, type AskItem, type AskAnswer, type AskPaletteProps } from './patterns/Navigation';
export { ChapterHeader, ChapterClose, keepDash } from './patterns/Chapters';
export { ValueStream, valueStreamSummary, ServiceBlueprint, type ValueStep, type ValueStreamProps, type BlueprintCell, type BlueprintLane, type ServiceBlueprintProps } from './patterns/Maps';
export { HarveyBall, CapabilityMatrix, BenchmarkBars, SCORE_NAMES, type CapabilityMatrixProps, type BenchmarkBarsProps } from './patterns/Benchmarks';
export { RoiModel, type RoiModelProps } from './patterns/RoiModel';
export { computeRoi, formatMoney, type RoiInputs, type RoiResult } from './patterns/roi';
export * as samples from './data/sample';
