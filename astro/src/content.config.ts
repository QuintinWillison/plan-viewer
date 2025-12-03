import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const plansPath = process.env.MARKDOWN_PLANS_PATH;

if (!plansPath) {
  throw new Error('Missing MARKDOWN_PLANS_PATH in environment.');
}

const plans = defineCollection({
  // The 'glob' loader allows us to look anywhere on the filesystem.
  // Replace the base path with the ABSOLUTE path to your plans folder.
  loader: glob({ 
    pattern: "**/*.md", 
    base: plansPath,
  }),
  schema: z.object({
    // This allows files without frontmatter (YAML headers) to load without errors
  }).optional() 
});

export const collections = { plans };
