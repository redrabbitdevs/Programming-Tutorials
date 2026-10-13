import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** One entry per programming language in the catalogue (700+ eventually). */
const languages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/languages' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'lowercase letters, digits and hyphens only'),
    name: z.string(),
    tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    paradigm: z.array(z.string()).min(1),
    firstAppeared: z.number().int().optional(),
    latestVersion: z.string().optional(),
    latestVersionDate: z.coerce.date().optional(),
    wikipedia: z.string().nullish(),
    summary: z.string(),
    status: z.enum(['planned', 'in-progress', 'complete']),
    // Per-language level blurbs, e.g. levels: { advanced: { blurb: '...' } }.
    levels: z
      .partialRecord(z.enum(['beginner', 'intermediate', 'advanced', 'expert']), z.object({ blurb: z.string() }))
      .optional(),
  }),
});

/**
 * One entry per lesson, stored at
 *   src/content/lessons/<language>/<level>/<NN-name>.mdx
 * `language` is a language slug, or "fundamentals" for the shared track.
 */
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons' }),
  schema: z.object({
    language: z.string(),
    level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
    module: z.string(),
    order: z.number().int().nonnegative(),
    title: z.string(),
    description: z.string(),
    minVersion: z.string().optional(),
    objectives: z.array(z.string()).min(1),
    estimatedMinutes: z.number().int().positive(),
    /** Ids of shared lessons, e.g. "fundamentals/beginner/variables". */
    fundamentals: z.array(z.string()).default([]),
  }),
});

export const collections = { languages, lessons };
