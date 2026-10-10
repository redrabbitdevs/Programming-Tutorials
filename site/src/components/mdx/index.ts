import Since from './Since.astro';
import Callout from './Callout.astro';
import Exercise from './Exercise.astro';
import Solution from './Solution.astro';
import Tabs from './Tabs.astro';
import Tab from './Tab.astro';

/** Passed to <Content components={...}/> so lessons never need import lines. */
export const mdxComponents = { Since, Callout, Exercise, Solution, Tabs, Tab };
