import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_FULL = '/root/mac/Downloads/xel-docs-full.md';
const DEFAULT_FAQ = '/root/mac/Downloads/xel-docs-faq.md';

const fullSource = process.argv[2] || process.env.XEL_DOCS_FULL_SOURCE || DEFAULT_FULL;
const faqSource = process.argv[3] || process.env.XEL_DOCS_FAQ_SOURCE || DEFAULT_FAQ;
const outDir = path.resolve('src/content/docs');

const pages = [
  {
    section: '1. THE IDEA',
    slug: 'index',
    title: 'The Idea',
    description: 'What XEL is and why it exists.',
  },
  {
    section: '2. HOW IT WORKS',
    slug: 'how-it-works',
    title: 'How It Works',
    description: 'How a Living Character exists, remembers, thinks, earns, and lasts.',
  },
  {
    section: '3. ENDOWMENTS AND CREATOR EARNINGS',
    slug: 'endowments-and-creator-earnings',
    title: 'Endowments and Creator Earnings',
    description: 'How a character sustains itself and how creators earn from characters people value.',
  },
  {
    section: '4. IF XEL DISAPPEARS',
    slug: 'if-xel-disappears',
    title: 'If XEL Disappears',
    description: 'What survives if the company disappears, what does not, and why.',
  },
  {
    section: '5. CONCEPTS',
    slug: 'concepts',
    title: 'Concepts',
    description: 'The core XEL vocabulary and mental model.',
  },
  {
    section: '6. BUILDING',
    slug: 'building',
    title: 'Building',
    description: 'Create, fund, publish, manage, and integrate a Living Character.',
  },
  {
    section: '7. ARCHITECTURE',
    slug: 'architecture',
    title: 'Architecture',
    description: 'The deeper system architecture behind XEL.',
  },
  {
    section: '8. REFERENCE',
    slug: 'reference',
    title: 'Reference',
    description: 'Canonical schemas, modules, invariants, events, and API surfaces.',
  },
  {
    section: '9. RUNNING INFRASTRUCTURE',
    slug: 'running-infrastructure',
    title: 'Running Infrastructure',
    description: 'How providers, keepers, portals, and settlement infrastructure plug into XEL.',
  },
  {
    section: '10. RESOURCES',
    slug: 'resources',
    title: 'Resources',
    description: 'Links to FAQ, glossary, whitepaper, specs, security, changelog, and community.',
  },
];

function escapeFrontmatter(value) {
  return String(value).replace(/"/g, '\\"');
}

function stripPreamble(markdown) {
  return markdown.replace(/^# docs\.xel\.xyz[\s\S]*?(?=\n# 1\. THE IDEA\n)/, '');
}

function splitSections(markdown) {
  const matches = [...markdown.matchAll(/^#\s+(.+)$/gm)];
  const sections = new Map();

  for (let i = 0; i < matches.length; i += 1) {
    const title = matches[i][1].trim();
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : markdown.length;
    sections.set(title, markdown.slice(start, end).trim());
  }

  return sections;
}

function normalizeBody(body, pageTitle) {
  return body
    .replace(/^#\s+.+$/m, `# ${pageTitle}`)
    .replace(/\n-{3,}\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function withFrontmatter({ title, description }, body) {
  return `---\ntitle: "${escapeFrontmatter(title)}"\ndescription: "${escapeFrontmatter(description)}"\n---\n\n${body}\n`;
}

function normalizeFaq(markdown) {
  const body = markdown
    .replace(/^#\s+FAQ\s*$/m, '# FAQ')
    .replace(/\n-{3,}\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return withFrontmatter(
    {
      title: 'FAQ',
      description: 'Common questions about XEL ownership, permanence, funding, building, privacy, and providers.',
    },
    body,
  );
}

await mkdir(outDir, { recursive: true });

const full = stripPreamble(await readFile(fullSource, 'utf8'));
const sections = splitSections(full);

for (const page of pages) {
  const raw = sections.get(page.section);
  if (!raw) {
    throw new Error(`Missing section "${page.section}" in ${fullSource}`);
  }

  const body = normalizeBody(raw, page.title);
  const target = path.join(outDir, `${page.slug}.mdx`);
  await writeFile(target, withFrontmatter(page, body));
  console.log(`wrote ${target}`);
}

const faq = await readFile(faqSource, 'utf8');
await writeFile(path.join(outDir, 'faq.mdx'), normalizeFaq(faq));
console.log(`wrote ${path.join(outDir, 'faq.mdx')}`);
