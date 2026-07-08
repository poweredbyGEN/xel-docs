// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const SITE_URL = process.env.SITE_URL || 'https://docs.xel.xyz';

export default defineConfig({
	site: SITE_URL,
	integrations: [
		starlight({
			title: 'XEL Docs',
			favicon: '/favicon.svg',
			logo: {
				src: './src/assets/xel-logo.svg',
				replacesTitle: true,
			},
			head: [
				{
					tag: 'script',
					content: `if (!localStorage.getItem('starlight-theme')) { localStorage.setItem('starlight-theme', 'dark'); }`,
				},
				{
					tag: 'meta',
					attrs: {
						name: 'description',
						content:
							'Protocol documentation for XEL Living Characters, sovereign onchain identities with funding, memory, runtime, and provenance.',
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
						content: 'Build, mint, fund, and run Living Characters with XEL.',
					},
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
