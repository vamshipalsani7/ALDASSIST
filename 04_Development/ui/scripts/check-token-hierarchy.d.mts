/** Type declarations for the token-hierarchy checker's pure, importable helpers (D-2026-023 §B.14). */
export type Tier = 'component' | 'semantic' | 'foundation' | 'unknown';
export type ConsumptionVerdict = 'ok' | 'component→foundation' | 'component→semantic' | 'component→unknown';
export interface DefinitionVerdict {
  verdict: 'allowed' | 'hardfail';
  kind?: 'semantic' | 'foundation-sanctioned';
  family?: string;
  reason?: string;
}
export function tierOf(v: string): Tier;
export const PERMITTED_FOUNDATION_FAMILIES: Set<string>;
export function foundationFamilyOf(name: string): string | undefined;
export function classifyConsumptionRef(name: string): ConsumptionVerdict;
export function classifyDefinition(target: string | null): DefinitionVerdict;
export function antiLeakSelfTest(): string[];
