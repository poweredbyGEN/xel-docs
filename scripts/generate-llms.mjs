import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const docsDir = path.resolve('src/content/docs');
const publicDir = path.resolve('public');

const orderedDocs = [
  ['The Idea', 'index.mdx'],
  ['FAQ', 'faq.mdx'],
  ['Whitepaper', 'whitepaper.md'],
  ['How It Works', 'how-it-works.mdx'],
  ['Endowments and Creator Earnings', 'endowments-and-creator-earnings.mdx'],
  ['If XEL Disappears', 'if-xel-disappears.mdx'],
  ['Concepts', 'concepts.mdx'],
  ['Building', 'building.mdx'],
  ['Architecture', 'architecture.mdx'],
  ['Reference', 'reference.mdx'],
  ['Running Infrastructure', 'running-infrastructure.mdx'],
  ['Resources', 'resources.mdx'],
];

function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

function clean(content) {
  return stripFrontmatter(content)
    .replace(/^import\s+.*?;\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function firstParagraph(markdown) {
  return clean(markdown)
    .split(/\n{2,}/)
    .find((block) => !block.startsWith('#')) || '';
}

await mkdir(publicDir, { recursive: true });

const loaded = [];
for (const [title, filename] of orderedDocs) {
  const filePath = path.join(docsDir, filename);
  const content = await readFile(filePath, 'utf8');
  loaded.push({ title, filename, content: clean(content) });
}

const summary = [
  '# XEL Docs for LLMs',
  '',
  'XEL is a protocol and product surface for Living Characters: owned, private, self-funding characters that can survive any single operator.',
  '',
  'Canonical URLs:',
  '- Docs: https://docs.xel.xyz/',
  '- Whitepaper: https://docs.xel.xyz/whitepaper/',
  '- Full LLM context: https://docs.xel.xyz/llms-full.txt',
  '- OpenAPI: https://docs.xel.xyz/openapi.yaml',
  '- Sitemap: https://docs.xel.xyz/sitemap-index.xml',
  '',
  'Recommended reading order:',
  ...loaded.map((doc) => `- ${doc.title}: https://docs.xel.xyz/${doc.filename === 'index.mdx' ? '' : doc.filename.replace(/\.(mdx|md)$/, '/')}`),
  '',
  'Section summaries:',
  ...loaded.map((doc) => `\n## ${doc.title}\n\n${firstParagraph(doc.content)}`),
  '',
].join('\n');

const full = [
  '# XEL Full LLM Context',
  '',
  'This file concatenates the primary XEL docs pages in navigation order for AI agents and search systems.',
  '',
  ...loaded.map((doc) => `\n\n---\n\n${doc.content}`),
  '',
].join('\n');

await writeFile(path.join(publicDir, 'llms.txt'), summary);
await writeFile(path.join(publicDir, 'llms-full.txt'), full);

console.log('wrote public/llms.txt');
console.log('wrote public/llms-full.txt');
