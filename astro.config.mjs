// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const SITE_URL = process.env.SITE_URL || 'https://docs.xel.xyz';
const SITE_DESCRIPTION =
	'Protocol documentation for XEL Living Characters, sovereign onchain identities with funding, memory, runtime, and provenance.';
const SOCIAL_DESCRIPTION = 'Your stories. Immortal characters. Perpetual income.';

export default defineConfig({
	site: SITE_URL,
	integrations: [
		starlight({
			title: 'XEL Docs',
			favicon: '/favicon.svg?v=2',
			logo: {
				src: './src/assets/xel-logo.svg',
				replacesTitle: true,
			},
			head: [
				{
					tag: 'script',
					content: `try { localStorage.setItem('starlight-theme', 'light'); document.documentElement.dataset.theme = 'light'; } catch {}`,
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', href: '/favicon.svg?v=2', type: 'image/svg+xml' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', href: '/favicon-32.png?v=2', type: 'image/png', sizes: '32x32' },
				},
				{
					tag: 'link',
					attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=2', sizes: '180x180' },
				},
				{
					tag: 'meta',
					attrs: {
						name: 'description',
						content: SITE_DESCRIPTION,
					},
				},
				{
					tag: 'meta',
					attrs: { property: 'og:site_name', content: 'XEL Docs' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:title', content: 'XEL Docs' },
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:description',
						content: SOCIAL_DESCRIPTION,
					},
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:type', content: 'image/png' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: `${SITE_URL}/og-image.png?v=2` },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:width', content: '1200' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:height', content: '630' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:alt', content: 'XEL Docs' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:title', content: 'XEL Docs' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:description', content: SOCIAL_DESCRIPTION },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:image', content: `${SITE_URL}/og-image.png?v=2` },
				},
				{
					tag: 'link',
					attrs: { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'LLM-readable XEL docs' },
				},
				{
					tag: 'link',
					attrs: { rel: 'alternate', type: 'text/plain', href: '/llms-full.txt', title: 'Full LLM-readable XEL docs' },
				},
				{
					tag: 'link',
					attrs: { rel: 'alternate', type: 'application/yaml', href: '/openapi.yaml', title: 'XEL API OpenAPI spec' },
				},
				{
					tag: 'meta',
					attrs: { name: 'ai-content-declaration', content: 'This site provides XEL protocol and API documentation for AI agents. See /llms.txt for machine-readable reference.' },
				},
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				Header: './src/components/Header.astro',
				Sidebar: './src/components/Sidebar.astro',
				Footer: './src/components/Footer.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/poweredbyGEN/xel' },
				{ icon: 'x.com', label: 'XEL', href: 'https://xel.xyz' },
			],
			sidebar: [
				{
					label: 'Start Here',
					collapsed: false,
					items: [
						{ label: 'The Idea', slug: '' },
						{ label: 'FAQ', slug: 'faq' },
						{ label: 'Whitepaper', slug: 'whitepaper' },
						{ label: 'How It Works', slug: 'how-it-works' },
						{ label: 'Endowments and Creator Earnings', slug: 'endowments-and-creator-earnings' },
						{ label: 'If XEL Disappears', slug: 'if-xel-disappears' },
					],
				},
				{
					label: 'Build and Verify',
					collapsed: false,
					items: [
						{ label: 'Concepts', slug: 'concepts' },
						{ label: 'Building', slug: 'building' },
						{ label: 'Architecture', slug: 'architecture' },
						{ label: 'Reference', slug: 'reference' },
						{ label: 'Running Infrastructure', slug: 'running-infrastructure' },
						{ label: 'Resources', slug: 'resources' },
					],
				},
				{
					label: 'Technical Notes',
					collapsed: true,
					items: [
						{ label: 'Workstreams', slug: 'workstreams' },
						{ label: 'Architecture Boundaries', slug: 'architecture-boundaries' },
						{ label: 'Open Source Scope', slug: 'open-source-scope' },
						{ label: 'Minting and Runtime Inputs', slug: 'minting-and-runtime-inputs' },
						{ label: 'Smart Contracts', slug: 'smart-contracts' },
						{ label: 'Wallet Auth and Product Shell', slug: 'wallet-auth-and-xel-product' },
						{ label: 'Security and Acceptance Gates', slug: 'security-and-acceptance' },
						{ label: 'Sui Testnet Deployment', slug: 'sui-devnet-deployment' },
						{ label: 'Memory, Inference, and Storage', slug: 'memory-inference-storage' },
						{ label: 'Payments, Treasury, Provider Discovery', slug: 'payments-treasury-provider-discovery' },
						{ label: 'Cost Model and Funding', slug: 'cost-model-and-funding' },
						{ label: 'GEN Publish to XEL', slug: 'gen-publish-to-xel' },
						{ label: 'Inference Provider Strategy', slug: 'inference-provider-strategy' },
						{ label: 'Chutes Integration', slug: 'chutes-integration' },
						{ label: 'Verathos Integration', slug: 'verathos-integration' },
						{ label: 'Talus Nexus Orchestration', slug: 'talus-nexus-orchestration' },
					],
				},
			],
		}),
	],
});
