import fs from 'node:fs';

const source =
	process.env.WHITEPAPER_SOURCE ||
	'/root/mac/Downloads/people-that-live-forever-whitepaper.md';
const destination = 'src/content/docs/whitepaper.md';

const whitepaper = fs.readFileSync(source, 'utf8').trimEnd();
const frontmatter = `---
title: Beings that are truly yours
description: XEL is self-sufficiency of being. Sovereign, persistent AI beings you truly own, self-funded through DAY.
---

`;

fs.writeFileSync(destination, `${frontmatter}${whitepaper}\n`);
console.log(`Updated ${destination} from ${source}`);
