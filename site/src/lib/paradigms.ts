/**
 * UI-side paradigm vocabulary for the language directory. The catalogue holds
 * well over a hundred raw paradigm strings; the filter shows only these groups.
 * Anything the rules do not recognise falls into "other", so the filter keeps
 * working whatever the data contains. "multi-paradigm" and "unclassified" carry
 * no information and are dropped.
 */
export interface ParadigmGroup {
  id: string;
  label: string;
}

export const PARADIGM_GROUPS: ParadigmGroup[] = [
  { id: 'imperative', label: 'Imperative' },
  { id: 'object-oriented', label: 'Object-oriented' },
  { id: 'functional', label: 'Functional' },
  { id: 'logic', label: 'Logic and declarative' },
  { id: 'scripting', label: 'Scripting' },
  { id: 'concurrent', label: 'Concurrent and distributed' },
  { id: 'array', label: 'Array and stack' },
  { id: 'meta', label: 'Metaprogramming and generic' },
  { id: 'systems', label: 'Systems' },
  { id: 'domain-specific', label: 'Domain-specific' },
  { id: 'educational', label: 'Educational' },
  { id: 'esoteric', label: 'Esoteric' },
  { id: 'other', label: 'Other' },
];

// Order matters: the first matching rule wins.
const RULES: [RegExp, string][] = [
  [/object|class-based|prototype|aspect|agent|actor/, 'object-oriented'],
  [/functional|lazy|lambda|applicative/, 'functional'],
  [/logic|constraint|declarative|rule|pattern|term.?rewrit|query|symbolic/, 'logic'],
  [/script/, 'scripting'],
  [/concurren|parallel|distribut|event|dataflow|synchronous|real-time|pipeline|reactive|task/, 'concurrent'],
  [/array|vector|tacit|function-level|stack|concatenative/, 'array'],
  [/meta|reflect|generic|macro|template/, 'meta'],
  [/system|compiled|low-level|infrastructure|safe/, 'systems'],
  [/domain|database|visual|simulation|workflow|text-oriented|markup|sql/, 'domain-specific'],
  [/educat|teaching|learning/, 'educational'],
  [/esoteric|joke|golf/, 'esoteric'],
  [/imperative|procedural|structured|modular|unstructured|block/, 'imperative'],
];

const IGNORED = /^(unclassified|multi-?paradigm)$/;

/** Group ids for a language's raw paradigm values. Never empty. */
export function paradigmGroups(raw: string[]): string[] {
  const out = new Set<string>();
  for (const value of raw) {
    const v = value.toLowerCase().trim();
    if (!v || IGNORED.test(v)) continue;
    out.add(RULES.find(([re]) => re.test(v))?.[1] ?? 'other');
  }
  if (out.size === 0) out.add('other');
  return [...out];
}

export const groupLabel = (id: string) => PARADIGM_GROUPS.find((g) => g.id === id)?.label ?? 'Other';
