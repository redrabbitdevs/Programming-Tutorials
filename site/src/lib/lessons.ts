import { getCollection, type CollectionEntry } from 'astro:content';
import { url } from './url';

export type Lesson = CollectionEntry<'lessons'>;
export type Language = CollectionEntry<'languages'>;

export const LEVELS = [
  { id: 'beginner', label: 'Beginner', rank: 1, blurb: 'Read and write small programs with confidence.' },
  { id: 'intermediate', label: 'Intermediate', rank: 2, blurb: 'Structure larger programs and use the standard library well.' },
  { id: 'advanced', label: 'Advanced', rank: 3, blurb: 'Concurrency, performance, the type system and tooling.' },
  { id: 'expert', label: 'Expert', rank: 4, blurb: 'Internals, design trade-offs and the corners of the spec.' },
] as const;

export type LevelId = (typeof LEVELS)[number]['id'];

export const levelInfo = (id: LevelId) => LEVELS.find((l) => l.id === id)!;

/** "python/beginner/00-welcome" -> "beginner/welcome" (language prefix and NN- prefixes removed). */
export function lessonSlug(entry: Lesson): string {
  return entry.id
    .split('/')
    .slice(1)
    .map((seg) => seg.replace(/^\d+-/, ''))
    .join('/');
}

export function lessonHref(entry: Lesson): string {
  return url(`/learn/${entry.data.language}/${lessonSlug(entry)}/`);
}

export function languageHref(slug: string): string {
  return url(`/learn/${slug}/`);
}

export function sortLessons(list: Lesson[]): Lesson[] {
  const rank = (l: Lesson) => levelInfo(l.data.level).rank;
  return [...list].sort(
    (a, b) => rank(a) - rank(b) || a.data.order - b.data.order || a.id.localeCompare(b.id),
  );
}

export async function getLessonsFor(language: string): Promise<Lesson[]> {
  const all = await getCollection('lessons', (l) => l.data.language === language);
  return sortLessons(all);
}

export interface ModuleGroup {
  name: string;
  lessons: Lesson[];
}
export interface LevelGroup {
  level: (typeof LEVELS)[number];
  modules: ModuleGroup[];
}

/** Level -> module -> lessons, in reading order. Every level is present, even if empty. */
export function groupLessons(sorted: Lesson[]): LevelGroup[] {
  return LEVELS.map((level) => {
    const modules: ModuleGroup[] = [];
    for (const lesson of sorted.filter((l) => l.data.level === level.id)) {
      let m = modules.find((x) => x.name === lesson.data.module);
      if (!m) modules.push((m = { name: lesson.data.module, lessons: [] }));
      m.lessons.push(lesson);
    }
    return { level, modules };
  });
}

export async function resolveFundamentals(ids: string[]): Promise<{ id: string; lesson?: Lesson }[]> {
  const all = await getCollection('lessons', (l) => l.data.language === 'fundamentals');
  return ids.map((id) => {
    const lesson = all.find((l) => l.id === id);

    return { id, lesson };
  });
}

export const STATUS_LABEL = {
  planned: 'Planned',
  'in-progress': 'In progress',
  complete: 'Complete',
} as const;

export const TIER_INFO = {
  1: { title: 'Tier 1', note: 'Full curriculum, beginner to expert' },
  2: { title: 'Tier 2', note: 'Full curriculum, written after Tier 1' },
  3: { title: 'Tier 3', note: 'Reference page: history, syntax sample and a path in' },
} as const;
