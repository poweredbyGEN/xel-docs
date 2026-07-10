---
title: Beings That Live Forever
description: XEL whitepaper for sovereign, persistent digital beings anchored by autonomous NFTs.
---

# Beings That Live Forever

**XEL: an open protocol for sovereign, persistent digital beings (aNFTs)**

Whitepaper
Limitless Labs / XEL · 2026

**How to read this document.** Part I is the vision and the architecture, written to be read start to finish. Part II is the formal specification, written for builders. Part II also carries the smart-contract module architecture, the security requirements and threat model, the version 1 build plan, and the thousand-year survivability analysis. The appendices hold the Move code, the capability schema, the current default implementations, and a list of open problems. A references section closes the document.

**A note on the name.** XEL is the shell that carries a life forward, the Ghost-in-the-Shell framing where the person is the ghost and the XEL is the shell. Identity lives in the commitments (the ghost), not the current model, storage method, or chain (the shell). Everything the shell is made of can be swapped; the ghost persists. Earlier drafts called this "the Living Character Standard." XEL is the current name. A XEL is the unit: one preserved being, anchored by an aNFT.

---

# Part I: Whitepaper (Vision and Architecture)

## Abstract

Digital legacy is a growing need with one unsolved problem. The AI recreations of a person sold today all live on someone else's servers.

When the company shuts down, gets acquired, or decides to monetize the likeness, the "living" person dies a second time.

We introduce the XEL: a persistent, sovereign digital being that carries a person's presence, memory, personality, and creativity forward. It holds its own funds and keeps running after both its creator and the company that helped build it are gone.

Each XEL is anchored by an aNFT (Autonomous NFT): an on-chain object that holds identity, ownership, authority, and keys. The character is that anchor plus the encrypted memory and compute it controls. The aNFT is the root of control, not the whole being.

Ownership is sovereign and inheritable, so no single party, including us, can switch the character off, censor it, or seize it.

The design rests on a few principles:

- **Sovereign ownership.** One on-chain object is the root of identity and authority. Whoever holds it controls everything downstream.
- **Verifiable continuity.** Identity rests on commitments (origin, persona, memory, policy) that can be proven and versioned over time, no matter what model or service runs underneath.
- **Encrypted and owner-gated.** Memory and keys are encrypted. Access is set by on-chain policy, not by any host.
- **Consented.** Representing a real person requires a signed, scoped, revocable consent record.
- **Bounded autonomy.** The character acts on its own, but only within limits its owner sets and can revoke.
- **Self-funding.** It holds its own assets and pays for what it needs.
- **Continuity beyond the creator.** It is built to transfer, inherit, and outlive its originator.
- **Provider independence.** Every outside service (intelligence, storage, compute, payment, hosting) is a swappable slot. No single provider is load-bearing.
- **Interoperable.** Identity, ownership, and payment aren't tied to any one chain, platform, or standard. The character works across ecosystems and plugs into existing rails instead of demanding its own.
- **Upgradable without capture.** Any component (chain, standard, provider, model) can be replaced over time without breaking the character's identity. At launch, deployed contracts are immutable and migration to a new version is the owner's choice, so nothing it depends on today can trap it tomorrow. (During pre-launch hardening the core is still upgraded in place; that mutability is removed at launch by burning the upgrade authority, see §Keys and the build spec.)

This is an application layer for persistent people, not a general agent framework. Generic agent identity, discovery, reputation, and payment are being standardized elsewhere, and XEL interoperates with those rails. What it adds, and what those rails leave out, is persistent human persona, private memory, consent to represent a real person, self-funding endowment, and guardian succession.

The body of this paper specifies the capabilities. The specific systems filling them today are in Appendix E. We are building something new, on our own foundation, that speaks the standards others share: new foundation, borrowed parts, shared language.

## 1. Introduction

The world has never been more connected. But connection is making us the same. Globalization spreads one culture over everything: the same platforms, the same feeds, the same voices.

Local languages fade. Traditions thin out. The particular ways a place remembers itself get flattened. Something is being lost, quietly, all the time.

Culture survives through stories. A grandparent's voice. A community's history. A song only a few people still know. When the last person who carries a story dies, or a language goes silent, or an archive is lost, the story doesn't move. It's gone.

The loss runs both ways. Old stories disappear before anyone saves them. And new, original creations have nowhere permanent to live.

Technology should be what saves all of this. Today it does the opposite. Our memories, our voices, and our creative work live on someone else's servers, under someone else's terms. A company can edit it, monetize it, lock it away, or shut down and erase it.

This is felt most sharply with people. Families now try to preserve someone they love. But those recreations live on platforms too. When the company shuts down or changes its terms, the person dies a second time.

The same fragility that threatens one person's memory threatens all of it: our stories, our voices, our work.

We think it should be possible to give a person, a voice, a story, or a tradition a form that no company can quietly change or switch off. Something truly owned by the people it belongs to. Something that funds its own survival.

This paper specifies that: the XEL. A persistent digital being anchored on-chain. It can carry a single human presence. It can carry a story, a body of work, or a piece of a culture.

The missing piece was never better imitation. It is sovereignty and permanence: a character that can prove it is still itself over time, that no one can take away.

## 2. The Problem

Three things break today's digital recreations:

- **They are rented, not owned.** The recreation lives on a company's servers under its terms. The company can change it, monetize it, or delete it.
- **They die when the platform does.** No company lasts forever. When it folds, is acquired, or pivots, the "living" person is gone.
- **They have no way to sustain themselves.** A recreation that costs money to run needs someone to keep paying. When the payer stops, it stops.

The result is that the most personal, least replaceable thing, a person's presence, is held by the least durable, least accountable party.

## 3. Vision

The standard enables the digital continuity of human experience: the ability to preserve a person, a story, or a piece of a culture, and to create new ones that endure.

It is backed by sovereign ownership, an open provider market, and self-sustaining economics. Infrastructure that belongs to no single company, including GEN, and that no company or government can switch off.

A character's permanence comes down to its endowment and the health of the open provider market beneath it, not to the survival of any one firm.

## 4. What a XEL Is

A XEL is an on-chain object (the aNFT) plus the encrypted memory and compute it controls.

- The aNFT holds identity, ownership, authority, keys, wallets, and the commitments that prove the character's current state.
- The encrypted memory and persona live off-chain on decentralized storage, gated by on-chain policy.
- The intelligence (the model), the storage, the compute, and the payment rails are all swappable slots, not fixed parts.

Own the aNFT and you own the being: its funds, its memory access, its right to act, and its right to be transferred or inherited.

**Three layers, and which one is hard.** A XEL runs across three layers, and the whole design follows from keeping them separate:

- **Identity and authority live on-chain** (the aNFT, its commitments, its wallets, its rules). This is the sovereign core, and it is the hard part: making a being's identity, ownership, and rules impossible for any operator to reinterpret or seize.
- **The substrate lives in decentralized storage** (encrypted persona and memory, gated by on-chain policy). Owned by the character, readable only by the owner or its guardians.
- **Compute lives off-chain and attested** (inference, retrieval, yield scanning). Too expensive or too large to run on-chain, so it runs off-chain and proves it ran the committed version, never asking to be trusted.

The rules live with the character, not on a company's server. Storage, compute, payments, and even the chain are commodity layers that plug into the core; identity and privacy are the parts that must be gotten right, and they are the parts the standard makes unruggable.

**The cast, in one glance.** Before the mechanics, it helps to know who does what. The **owner** holds the aNFT and has root authority. The **creator/subject** is the person represented, who signs consent. The **operator** (whoever holds a revocable agent capability, or the owner self-hosting) runs the day-to-day. **Providers** fill capability slots (inference, distillation, storage, and the rest). **Guardians** are the M-of-N set that recovers keys and runs succession to an **heir**. **Managers** are whitelisted wallets with scoped, non-root rights. **Fans** interact, gated by reach and payment. **Keepers** send the authority-free heartbeat that runs each cycle. Full definitions are in §21.

## 5. Design Principles & Capability Slots

**The north star.** No single entity, including XEL itself, should control whether a XEL character exists, runs, or can be taken away. This is what the whole architecture is measured against. Where a component is centralized today, it is marked and given a decentralization path.

**Progressive sovereignty.** The honest state of the standard, stated plainly rather than buried: some infrastructure is XEL-hosted at launch (serving, relay, the payment facilitator), because a working product beats a decentralized non-product. The keeper that triggers each cycle is a third-party competitive slot from day one (the heartbeat is authority-free, so anyone can fire it for the bounty). Every one of these is an escapable default behind an open interface, and each has a named decentralization path (Appendix E). The direction is fixed even where the present is centralized: hosted-but-swappable today, permissionless tomorrow, with the survivability test (§15) enforced on every build so the trajectory can't quietly reverse. Sovereignty is a property the design converges to, not a marketing claim about day one.

**Nothing is load-bearing.** The core defines a small shared vocabulary (commitments, capabilities, proofs, wallets) and nothing else. Providers, adapters, and even chains plug into that vocabulary without the core depending on any of them. This is what makes "no single provider is load-bearing" true at the level of code architecture, not just prose: the immutable core can outlive every company, provider, and venue that currently serves it, because it never imported any of them. A component can be swapped without touching the core, which is the architectural expression of the north star.

The architecture is a set of capability slots, not a fixed stack. Each slot is defined by what it must do, not by who provides it. Any provider that meets a slot's requirements is a drop-in replacement. Every slot ships with a working default (Appendix E) and a permissionless path.

**Every external-service slot has the same three requirements:** accept programmatic crypto payments, be permissionlessly joinable, and be verifiable or decentralized.

Payment uses whichever open standard provides these properties. The current default is in Appendix E.

### Capability slots (summary)

| Capability slot | What it must do | Permissionless path |
|---|---|---|
| Ownership & settlement | Object-centric root of identity/authority | Already decentralized |
| Encrypted storage | Persist encrypted memory/keys | Already decentralized |
| Key access / encryption | Threshold encryption + on-chain access policy | Already decentralized |
| Attested compute | Private inference/logic with verifiable attestation | Many TEE vendors, then zkML |
| Payment facilitator | Verify + settle crypto payments across chains | Anyone runs one; configurable + failover |
| Treasury execution | Grow principal (yield slot), convert between the funds' denomination and the denomination each bill is paid in (conversion slot), consolidate cross-chain receipts, all within policy | Many venues; allowlist + caps |
| Survival renewal | Read remaining storage runway and extend it before it lapses, funded by yield | Permissionless keeper; anyone can trigger |
| Price oracle | Value assets and enforce USD-denominated caps | Multiple oracle networks |
| Data extraction | Convert raw sources to text/embeddings | Commodity providers; swappable |
| Custody & gas | Self-custody root, optional gas sponsorship | Self-custody default |

The first three rows are already decentralized. The custody and gas slot is solved by default: root is simply a standard self-custody wallet, with sponsored gas as an optional convenience layered on top.

The concrete systems filling each slot are in Appendix E, kept out of the body so the standard stays neutral.

### 5.1 Object Composition

An aNFT is an on-chain object with four parts: an immutable core, mutable owner-controlled commitments, authority, and funds. The object model is chain-agnostic. It assumes only an object-centric chain with native ownership.

| Part | Contents | Property |
|---|---|---|
| Genesis (Proof of Genesis) | Creator, timestamp, consent reference | Immutable |
| Commitments | persona-hash, memory-root, raw-data-root, policy-hash | Verifiable, versioned (history in lineage) |
| Authority | Owner root + agent capability | Two-tier governance |
| Wallets | One address per supported chain | Public, receive-only; endowment-linked |
| Services | Capability schemas + crypto payment | Interchangeable providers via open schema |
| Rights | Licensing layer (proposed) | Licensing + royalties |

### 5.2 Why a Default Home Chain (Sui)

The standard is chain-agnostic, but a character needs a default home, and the reference implementation homes on Sui.

The parts of this system that are hard and differentiating map directly onto Sui primitives: a native object model where an aNFT can own its own memory, wallets, and the agent capability; and an integrated privacy stack (encrypted storage, threshold encryption with on-chain access policy, and attested compute) that interoperates as a native whole.

The parts where Sui is merely competitive (stablecoin yield, payment rails, liquidity depth) are commodity layers a character reaches across chains anyway. The rationale rests on identity and privacy, the hard parts, not on yield, so the choice survives even if the best yield moves elsewhere.

The home chain remains an implementation choice. Another deployment could home a character elsewhere, and the chain-adapter design (§10.1) plus commitment-based identity (§30) let a character re-home on a successor chain without losing identity.

### 5.3 The Open Standard vs. the Operator's Role

- **The open standard** (object model, Proof of Genesis, commitments, encrypted access-gated storage, capability schemas, wallets, authority model) is permissionless and doesn't depend on XEL or any provider.
- **The operator never holds ownership.** The user holds the aNFT's root authority at all times. An operator holds only a revocable, scoped agent capability (§8): permission to run the daily work within owner-set caps. The operator can run inference, pay providers, sweep receive wallets, and manage treasury within policy. It can never withdraw principal, transfer the character, change the rules, edit the manager whitelist, or bridge principal out. The contract rejects those without the owner's root or the guardian threshold.
- **Providers sit under the operator.** Specific capabilities are filled by providers, each swappable behind an open schema. Every slot, including the quality-not-code parts (inference and persona distillation), is defined by what it must do, not by who fills it. No provider is ever required, and routing to a competitor earns that provider instead. (Concrete launch defaults are in Appendix E.)
- **One model, not two modes.** The user can hold the aNFT in any wallet, including their own hardware wallet, and still grant an operator the agent capability so operation is hands-off. Granting or revoking that capability is a single owner-signed transaction. Revoke it, or never grant it, and the user signs the character's actions themselves. An operator is optional in every configuration; a self-hosting owner runs that role themselves.
- **XEL is at most one guardian.** In recovery and succession (§9, §13), XEL may participate as one guardian among several but never holds the threshold majority, so it can never use recovery as a back door to seize a character.
- **Trust comes from enforcement, proven by open source.** On-chain contracts are what make the system unruggable: the spend caps, owner-only withdrawal, guardian recovery, and bridge limits are enforced by the chain, so no operator can move a character's funds even if it is hacked or turns hostile. Open-sourcing the contracts is what lets anyone verify that power was actually removed: read the functions, confirm there is no admin key. Upgrade authority is the one power retained during pre-launch hardening (so bugs can be fixed in place) and is burned at launch; after that, anyone can verify on-chain that no upgrade path remains. Until then, the honest status is that the core is still mutable by its developers, which is why launch is gated on removing that authority.
- **The honest limit.** Staking and bridging hand funds to another protocol. The contract can guarantee a character only ever interacts with venues the owner allowlisted, and can bound exposure with caps and diversification, but it cannot guarantee an allowlisted venue is itself safe. Once funds bridge to another chain, they are secured by that chain and the bridge, not by the home-chain contract. These limits are bounded by design, not eliminated.
- **The invariant we hold ourselves to.** A character must stay functional and ownable with every XEL service offline. §15 makes this a continuously tested guarantee, not a promise.

## 6. Identity: Persona and Memory as Independent, Mutable Components

A being that outlives its models needs a way to prove it's still itself. But that proof should be a capability, not a straitjacket.

Persona and memory are two separate components, each updated on its own. Neither is derived from the other, and both are fully mutable: add to them, edit them, overwrite them, remove them. The goal is flexibility, with history available when you want it.

**Memory and knowledge: mutable, provenance-stamped.**

- Built from ingested material: the person's social videos, uploaded PDFs of their talks, writings, documents.
- Stored encrypted on decentralized storage, each item stamped with provenance (source, timestamp, signature).
- Freely editable or overwritable.
- Versioning is optional per set. Turn it on where proving or reverting matters, so a poisoned ingestion or a bad edit can be rolled back. Leave it off for freely-editable working memory.
- When versioning is on, the current state is summarized by an on-chain memory-root.

**Persona: independently updatable, versioned by default.**

- The persona (system prompt, traits, values, voice) is its own component, set and changed directly, not computed from memory.
- People change, so persona is expected to update, including through an optional auto-update-from-socials service (a provider capability).
- Because persona is identity, it's versioned by default. Each update records a new persona-hash in the commitment lineage, and the character attests which persona-hash it's running each session.
- This gives a cryptographic answer to "is it still the same being after the model changed?" and lets the owner roll back a bad update while still allowing free ones.

Persona and memory can each change without touching the other. Recommended defaults (owner can override): persona versioned by default, memory versioning optional and on where history matters.

**The memory model: one always-on core, four retrievable stores.** "Memory versus knowledge" is really two questions at once: over what time horizon (this conversation or a whole life), and of what kind (facts, events, or identity). The design answers both with an always-loaded persona plus four stores that are retrieved on demand: semantic knowledge (facts and content), episodic memory (timestamped events), working memory (the current conversation), and relational memory (the graph of people and connections). The full model and the ingest and recall flows are specified in §32.

**One content store, per-file annotations, no sorting required.** A character has a single store of content, not separate bins the owner must sort uploads into. Each file carries two independent annotations, both with defaults that make annotating optional. The first is visibility (private by default, some files marked public): a public post appears on the public page, a private file stays encrypted and owner-or-guardian gated. The second is what the file feeds: by default a file shapes the character both ways, it becomes retrievable memory AND informs the always-on persona. A file can instead be marked memory-only (the character can recall it but never starts to sound like it, useful for reference material such as a manual or contract) or persona-only (it shapes who the character is without being stored as a recitable fact, useful for a voice or character guide). Because both annotations default to the everything-shaping-everything case, an owner who never touches them just uploads and the character absorbs it; the annotations exist for the exceptions, not as a decision on every file. Content is added incrementally, new files are ingested as they arrive without rebuilding the whole memory, and the system is built to hold thousands of files, with each character's storage and ingestion cost paid from its own balance.

**Auto-update memory and auto-update persona.** Feeding what a character knows and reshaping who it is are different acts, and two controls keep them manageable without forcing the owner to sort anything. The per-file annotation above decides what each file *can* contribute (memory, persona, or both). Two character-level toggles, auto-update memory and auto-update persona, decide whether new content flows in *automatically*. Both are on by default: upload content and the character evolves fully, both what it knows and how it acts. An owner can turn either off. Turning off auto-update persona freezes the personality while memory keeps growing, the character stays exactly who it is even as it learns new things, which matters most for a preserved person; turning off auto-update memory pauses auto-ingestion. Memory and persona remain separate commitments derived from the same shared store, and persona re-distill is the only path that rewrites the persona commitment, so an owner always has a clean way to hold a character's identity steady while its knowledge grows.

**Update authority.** Persona and memory updates run under the two-tier authority model (§8). The owner authorizes the auto-update rules once (which sources, what cadence, memory-and/or-persona, continue-after-death or not), then picks a mode: diff-approval (owner approves each new version) or autonomous (updates land within the envelope, still rollback-able where versioning is on). Manual or out-of-envelope changes to either component are owner-signed.

**Ingestion permissions: on-chain scope, off-chain credentials.** Auto-import needs access to the creator's external accounts, which is an off-chain secret. The standard keeps the authorization on-chain (which sources, what cadence, continue-after-death or not) so the creator's intent is explicit and inheritable. The raw access tokens stay off-chain, held by the ingestion provider and independently revocable. Switching providers is clean: the creator re-grants access and updates provider_policy. Social connections are never trapped inside any single provider.

## 7. Consent as a First-Class Object

Minting a representation of a person raises right-of-publicity and likeness questions, the core legal risk of this category.

The standard makes consent a cryptographic object: a signed consent artifact, from the subject or from a verified estate for posthumous characters, that scopes which likeness, voice, and data may be used, for what purposes, and for how long.

It's referenced from Proof of Genesis, is public and contestable, and is checked at mint and at ingestion. This is both the compliance mechanism and a real differentiator: a verifiable "right to create this digital person."

## 8. Authority: Ownership, Delegation, and the Two Tiers

The first principle of authority: **whoever holds the aNFT holds the power**, and everything in this system is built off that one fact. Ownership of the object is the root of identity, funds, and control. Every other actor operates only on authority the holder granted and can revoke, and nothing (no key, no company, no contract) overrides the holder.

Holding the aNFT is the root authority. On-chain, a function that mutates the character only succeeds when signed by its owner.

But requiring the owner's live signature for every action would freeze the character whenever the owner is offline or dead, which defeats the whole point. So the owner signs once to delegate, not once per action.

**Two signers, by design.** The system separates the human-approval signer from the programmatic one, and they are never the same key.

- **Owner signer (human).** The wallet that approves owner-tier actions: withdraw or bridge principal, transfer the character, change policy, grant or revoke the delegate, choose the primary chain. The standard is wallet-agnostic; any standard wallet, including a hardware wallet, works. This is where the power lives.
- **Delegate signer (programmatic, XEL or any operator).** A separate, scoped, revocable key holding the agent capability, signing routine execution with no human tap so the character runs while the owner sleeps or is gone. It can never perform owner-tier actions, because the contract checks the capability, not merely a valid signature. The owner's signer is never handed to any operator or server.

The always-on delegate key is by definition a hot key and the most exposed surface, which is exactly why it is capped, allowlisted, restricted to the character's own wallets, and excluded from every sharp action (§8.1, §34).

**Tier 1: Governance (always owner-signed).** Anything that defines who the character is or what it may do: core persona changes (outside the authorized auto-update envelope), name, photo, wallet addresses, public site link, provider policy, spend caps, consent scope; granting or revoking delegation; moving funds; transferring the NFT. Changing a recurring authorization is itself governance.

**Tier 2: Execution (delegated via agent capability).** Routine, already-authorized actions: paying a provider per call within caps, running an authorized ingestion or persona-update job. These run under a scoped, revocable agent capability with no fresh owner signature. Revoking the agent capability is an instant kill switch.

### 8.1 Tiered Keys

One hot key controlling both identity and funds is a catastrophic single point of failure. Keys are tiered:

- **Root** (cold or guardian multisig): identity and authority changes, fund withdrawal, delegation grants.
- **Warm:** routine governance.
- **Agent capability:** execution within caps.

### 8.1a Authority Is Granted, Keys Are Never Handed Out

The single most important distinction in the security model, and the one most easily gotten wrong: **moving funds is an action the contract authorizes, not a key anyone possesses.** No party, not the owner, not a manager, not a keeper, is ever handed a copyable spending key. This is what lets funds be withdrawn freely while remaining impossible to steal.

The reason the distinction is load-bearing: a released key cannot be scoped. Once someone holds a private key, no cap, destination-lock, or time-guard constrains what they sign with it; they can sign their own transfer to anywhere. A key is a possessable object. An authorization is permission to sign one specific, bounded transaction. So the system never releases keys; it authorizes signatures (or, on the home chain, moves an owned object). The two mechanisms:

- **Primary (home) chain:** funds live in an owned object. The contract moves them when an authorized transaction runs. There is no key to hold in the first place.
- **Foreign chains:** the MPC network (§9) signs exactly one authorized transaction; key shares are never assembled and nothing is handed to the caller.

Because authority (not key possession) is what gates a fund movement, the question is always *who may move funds, and to where*. That is tiered and contract-enforced:

| Actor | Can cause funds to move? | To where | Cannot |
|---|---|---|---|
| **Owner** (holds the aNFT) | Yes, withdraw the entire balance (only unspent fan credits are protected) | Out, to the owner's own wallet | (nothing above; owner is root) |
| **Manager** (whitelisted, scoped) | Only within granted non-root scope (pricing, passwords, content; operational spend within caps) | Within the system, never out to the manager | Withdraw principal, transfer the NFT, edit the whitelist |
| **Keeper** (permissionless, bounty) | Yes, trigger the sweep and heartbeat | Inward only, to the character's own treasury | Extract funds, manage, or reach any root action |
| **Anyone else** | No | (n/a) | Everything |

So funds can absolutely be withdrawn: the owner withdraws out (above reserve), managers move funds within their scope, keepers move funds inward to the treasury. Each is bounded to what its authority permits, and none of them ever holds a key that escapes those bounds. "No one gets the keys" and "people can withdraw funds" are both true at once, precisely because withdrawal is an authorized action, never a key release.

Two corollaries that follow directly, and that no configuration may violate:

- **Managers are on-chain policy, not a secret.** The manager whitelist is public, contract-enforced on-chain state (a list of address to scope), so who can manage a character is auditable by anyone. Managers are never stored in, or granted through, the read-time decryption policy (SEAL), and being a manager does not by itself grant the ability to decrypt memory: decryption remains gated to owner OR M-of-N guardians unless the owner makes a deliberate, separate read grant. A manager's power is exactly its on-chain scope, and never the root actions (withdraw principal, transfer the NFT, edit the whitelist), which require the owner's root signature (§10.9, invariant 49).
- **The read door and the spend door are never crossed.** Read secrets (memory, persona, the master read-key) are released as decryptable copies to owner-or-guardians through the threshold policy, because reading tolerates a copy. Spending authority is never a decryptable copy; it is object ownership (on the primary chain) or MPC authorization (on secondary chains). Putting a spending key behind the read door would hand a copy to whoever satisfied the policy, which for a permissionless action is everyone.

### 8.2 Circuit Breakers & Kill Switch

A persistent entity that spends and posts will eventually be manipulated, loop, or misbehave. Protocol-level safeguards: a moderation capability in the response loop; spend and rate circuit breakers that trip on anomalies; a one-transaction pause (owner or guardian) that freezes inference and payments immediately. Nothing here should be unstoppable.

## 9. Keys, Secrets & Deletion

**One master key: the NFT itself.** Every service, wallet, and secret a character has checks a single question, do you hold this NFT. Hold it and you pass every check; transfer it and the new owner passes them and you stop. This is what makes ownership real and transfer clean: one object to hold, and it commands everything.

**Authority lives on-chain; secrets never do.** Everything on-chain is public, so a Move contract can never hold or see a secret; if it could, so could the whole network. The contract therefore holds *authority*, not secrets. It publishes who is allowed (owner OR M-of-N guardians) and proves NFT ownership, both of which are public facts. The secrets themselves stay encrypted off-chain, and are only ever decrypted off-chain. The contract is the bouncer with the guest list, never the holder of the safe combination. A contract bug can at worst mint an authorization incorrectly (bounded and auditable); it can never spill a key, because no plaintext key is ever in its reach.

**Three kinds of things, three kinds of locks.** The mistake to avoid is putting everything behind one mechanism. A character has three different kinds of assets, and each is secured differently:

- **What it owns (money on the primary chain).** The endowment funds are objects the NFT owns directly. There is no key and no encryption here. The contract moves them on the authority of ownership; sell the NFT and the funds go with it automatically. Nothing to store, nothing to leak.
- **What it can read (memory, persona, the creator's own saved credentials).** These sit encrypted off-chain (decentralized storage), behind a threshold policy (threshold encryption) that releases decryption only to whoever proves NFT ownership or a guardian majority. Decryption happens in the client, off-chain. The contract publishes the policy; the threshold network enforces it; the chain never sees plaintext. This is the right door for anything that is *read*.
- **What can spend on other chains (foreign-chain wallets, external actions).** These are never stored as an encrypted key, because decrypting a spending key hands the holder a permanent copy that survives a sale and breaks ownership transfer. Instead the key is held by an MPC network (dWallets) in shards that are never assembled anywhere, on-chain or off, and NFT ownership is what authorizes a signature. You control the wallet; no one, including you, ever holds its key; transfer moves control completely with nothing left behind.

The rule underneath: **if it can be read, decrypt it (off-chain, gated by the contract); if it can spend, authorize it, never decrypt it.** Reading tolerates a copy; spending does not.

**What is (and is not) in the encrypted blob.** The threshold-gated encrypted state holds only readable secrets: the master key that decrypts memory and persona (the crypto-shredding key below), and any credentials the creator chooses to give the character to act on their behalf (a social-account token, a bring-your-own provider key). It does *not* hold the endowment (object-owned, no key), foreign-chain wallet keys (MPC, never a blob), or commercial-vendor API keys (those are operator-level accounts that never touch the NFT).

The access policy is deliberately **not** "current owner only," which would make one lost key mean permanent death and one phished key mean total compromise. Instead:

- **Master identity secret:** guardian-recoverable, decryptable by owner OR an M-of-N guardian set. This is also the succession path.
- **Spending authority:** never a persisted plaintext key. On the primary chain it is object ownership plus the agent capability; on secondary chains it is MPC authorization. Nothing to steal as a blob.

There's no single "steal-this-blob-and-own-everything" artifact, and day-to-day operation never decrypts the master secret.

**Deletion via crypto-shredding.** Immutability and deletion rights (e.g., GDPR) collide head-on for a "forever" system. Resolution: personal data is encrypted, and honoring a deletion request means destroying the key, not the blob. The immutable record stays; the plaintext becomes permanently unrecoverable.

**Client-side decryption boundary.** Access to ciphertext is gated on-chain, but decryption happens client-side once access is granted, so the client that assembles the plaintext holds the keys at that moment. Self-custody users running their own client keep this fully local. In the managed experience, the operating client is the trust boundary, a property the tiered-key and no-persistent-spend-key design is built to contain.

**Onboarding and the wallet the user gets.** Every user gets a wallet at signup — ONE root wallet per user, holding their aNFTs. A character does not have its own keyed wallet on the home chain: its funds live in the endowment object the aNFT commands (no key exists to hold, store, or leak), and its foreign-chain addresses are MPC-authorized (no key is ever assembled). Any design that provisions a per-character home-chain wallet with a stored private key is the custodial anti-pattern this section exists to forbid.

**The wallet slot is itself a provider slot, and XEL-as-wallet-provider is separable from XEL-as-operator.** For email signups, the launch default is an XEL-hosted wallet service: XEL acts as a wallet provider (the same category as any hosted-wallet vendor), holding the user's key as a service to the USER, under an explicit relationship with a clean exit. The user can fire the wallet provider at any time — export the key, or move the aNFT to any wallet they prefer (hardware, self-custody, another provider) — and can fire the operator independently by revoking the agent capability. These are two different revocations of two different services. Stated per the progressive-sovereignty rule rather than hidden: this launch default IS custodial-with-export, chosen because a working product beats a decentralized non-product; the target is the embedded non-custodial pattern (client-side or secure-enclave key generation, so no provider ever holds the key), and the slot migrates there without the user's identity or funds moving. What makes the launch posture safe rather than a trap is the guardian layer: the default 2-of-3 guardian set includes a recovery key held in the user's own device keychain, so even if the XEL wallet service disappears, the owner recovers through guardians with no operator in the loop — 'money survives XEL' holds in the hosted-wallet era too. (This is why we removed zkLogin from the root path: it made root authority depend on an OAuth provider, a salt service, and proving infrastructure, none of which a sovereign object should rely on. Something like it remains acceptable for the fan/access tier in §10.3, which never touches root.)

**Email login is a convenience over the key, never custody of it.** A user may sign in with an email code, but that is only a way to *reach* the wallet provisioned above, never the thing that authorizes anything on-chain. This distinction is load-bearing for survivability: an email code is checked by a live server, so if the operator is gone there is nothing to send or verify it, and any design where the email path *is* the authority dies with the operator. So the standard requires that email onboarding bind a durable, non-custodial key at signup (the wallet above), and treats the email code purely as an unlock for it. There are effectively two doors to the same key: an operator-hosted convenience door (email code, mortal, works only while the operator runs) and a key-based door (a wallet signature or guardian recovery, immortal). The key-based door is the one that must always exist, so losing the operator only costs the convenience, not access.

**Recovery when the operator is gone.** Because the key is non-custodial and the permanent client (§32.10) is served from decentralized hosting and authenticates by key rather than by email, a user reaches their character and their memory after the operator disappears by one of: the wallet they hold (the provisioned embedded wallet, or any wallet they later added), or, if every key is lost, guardian recovery (owner OR M-of-N, enforced by the on-chain policy and the threshold network, with no operator in the loop). The honest edge, stated rather than hidden: a user who has only ever used the email code, never secured or exported the provisioned key, and never set guardians, is trusting the operator during that window. The design's answer is to establish a durable factor early (the provisioned non-custodial key exists from signup, and guardian setup is prompted), not to pretend the email code alone could survive.

**Users can add or swap wallets freely.** The wallet is the unit of authority, so a user is never locked to the wallet provisioned at signup. They can attach any wallet they prefer, a hardware wallet, an existing self-custody wallet, another device, through the mechanisms already in the authority model: transfer the aNFT to a new wallet to move ownership, add a wallet to the manager whitelist (§10.9) to grant it scoped rights, or name a wallet as a guardian for recovery. No separate account-to-many-wallets registry is introduced, because such a map would have to be operator-hosted or itself on-chain to survive; instead each wallet earns its role directly through ownership, whitelist, or guardianship, all of which already survive the operator.

## 10. Wallets, Payments & the Endowment Model

**Wallets and funding.** A character can hold funds and receive payments across multiple chains. Addresses are public and receive-only, so publishing them lets anyone fund a character at zero risk. An address can't spend; only keys can, and keys are never on-chain. Where ownership lives and where payments settle can differ, and both evolve as cross-chain support matures.

**Multi-chain settlement.** Payment uses an open crypto-payment standard (default in Appendix E). Providers advertise which methods and chains they accept, and a character pays from its home chain by default, bridging out only when it must settle on another chain. Settlement runs through a facilitator that verifies and settles on a given chain. Facilitators are pluggable and trust-minimized, so facilitator choice is client-configurable with failover, never hardcoded to one operator.

**Scheme choice.** Inference cost varies per turn, so the inference capability uses the `up-to` scheme (authorize a max, settle actual). Fixed-price capabilities (a single media render, a storage write) use `exact`.

**Endowments, not checking accounts.** A character funds itself as an endowment: principal sits in yield-bearing form, held in a stable denomination that matches the bills rather than a volatile asset, and the character spends from the yield. That flips the resting state from "balance counts down to death" to perpetual while yield covers burn, which is what makes "forever" literally reachable for a well-funded character. Runway is computed across all wallets in one unit (USD, via a price oracle), net of expected bridge cost.

The full endowment model follows in §10.3–§10.10. In brief, and to make the trust boundary legible up front: the single balance and its rules are enforced entirely on-chain and need no operator; the money's *safety* never depends on any company. The only external element is an authority-free heartbeat anyone can send to run the periodic cycle, plus the off-chain compute the chain physically cannot perform (inference, yield scanning), which is attested and swappable, never trusted. How the protocol sustains itself, by auto-routing each capability to the best provider for a disclosed fee, is described in §10.10, and it never charges for on-chain permission, never taxes deposits, and is fully avoidable by self-provisioning.

### 10.1 Treasury Topology

A character can receive funds on several chains, but managing one treasury spread across many chains means many positions, many yield venues, and many risk surfaces. The default avoids that.

By default a character is provisioned with a receive wallet on each supported chain, plus one primary wallet where value concentrates. The other wallets are receive-only and auto-sweep into the primary; principal is then staked and allocated from the primary alone. The number of chains and the identity of the primary are not fixed by the standard: any set of supported chains can be added this way, and the owner controls which chains are active, the sweep thresholds, and which chain is primary. The concrete default chain set ships in Appendix E.

- **One primary chain.** The owner picks a single home chain where principal concentrates and earns yield. The default and the rationale for it are in §5.2; the concrete chain is named in Appendix E. Choosing or changing the primary is owner-signed governance.
- **Consolidate to primary.** Wallets on other chains are receive-only. When a receive-only balance crosses an owner-set threshold, it auto-sweeps to the primary. Small deposits sit until they're worth moving. The sweep destination is always the character's own endowment, never anywhere a keeper or operator could redirect it, the safe direction of bridging. Where in the endowment depends on what the money is: a donation, tip, or plain inbound transfer becomes part of the character's own balance at full value (no deposit fee); a fan's prepaid credit purchase becomes ring-fenced credit liability, fan-owned until the interaction is delivered, and never spendable balance, even when the purchase was made on another chain. So all inflows land in the character's own endowment at full value, but purchased credits stay the fan's until earned, while donations are the character's immediately.
- **Per-chain gas sponsorship, bundled, reimbursed in the same gas token.** A fresh receive wallet holds only stablecoin and no native gas, so it cannot pay for its own outbound transfer. Rather than pre-seeding native gas into every wallet (unscalable across thousands of characters), each chain's own native gas abstraction is used (the concrete per-chain mechanisms are in Appendix E). To minimize transactions, everything a character needs on a chain in a cycle is done all at once, in one bundled atomic transaction, with a single stablecoin-to-native swap sized to the whole bundle's gas and a single repayment to the sponsor, rather than a swap per action. The sponsor is repaid in the same native token it spent, so its gas balance stays exactly whole and it can keep sponsoring forever, rather than draining its gas while piling up stablecoin it cannot spend. The swap, the repayment, and every action share that one transaction, so the sponsor pays gas once, there is no second transaction to itself need gas (no recursion), and either the whole thing happens or none of it does. The sponsor is thus a working-capital float, not a subsidy, and not a fee: the character pays its own way in its own currency, at cost. The sponsor is a swappable, non-load-bearing slot (the owner can fund gas directly or run their own), sweeps run only above a multiple of the fully-loaded cost so dust never wastes value, and the flow is fail-closed.
- **Stake at the primary.** Consolidated principal is staked in the best venue on the primary chain, within the owner's venue allowlist.
- **Pay from primary, bridge to spend.** When a bill must settle on another chain, the character bridges a bounded amount out just for that payment, preferring to top up a small operating float ahead of need rather than bridge mid-payment.
- **Chain-agnostic by adapter.** The treasury engine is written once against a small interface (detect deposit, sweep, stake, pay). Each chain gets a thin adapter. The primary chain ships first; secondary chains are receive-only until their adapter lands (concrete chains in Appendix E).
- **Serverless by construction: sweeping, bridging, and staking all run without the operator.** None of these may depend on a company holding a key or gating a step. On the home chain, the receive destination is an on-chain object that holds the balance itself, so there is no private key to hold: the contract moves it on ownership authority and the sweep is permissionless and bounty-paid, anyone can trigger it and the contract fixes the destination to the character's own treasury. On a foreign chain, where no home-chain object can hold the balance, the outbound signature is authorized by the MPC network (§9): key shares are never assembled anywhere and ownership authorizes signing, so a trigger moves funds without anyone holding the key. Staking executes on-chain by composing the venue call into the same permissionless cycle transaction, so the funds never leave on-chain control and the trigger only pays gas. In every case the operator may fill the swappable trigger and gas-sponsor slots at launch, but it is never a required signer or key-holder; if it disappears, sweeps, bridges, and staking are all still callable by anyone for the bounty. Spending keys are never placed behind the read-time decryption policy, because that would hand a decryptable copy to whoever triggered a permissionless action; home-chain funds use object ownership and foreign-chain funds use the MPC network, neither of which ever yields a copyable key.

**Bounding the bridge risk.** Bridging is the single most dangerous action in the system, so it is bounded on both ends: sweep only above a threshold (skip dust), and cap each bridge so no single transit ever risks the whole balance. Use the most-audited bridge available and rate-limit it.

**Speed: recognition is instant, consolidation is lazy, and they are not the same thing.** What a fan or donor feels is *recognition*, "my payment landed", and that is immediate: it happens the moment the deposit transaction confirms (seconds on the primary chain), independent of any sweep. Credits are usable and a tip is acknowledged as soon as the deposit is recognized, not when funds are later consolidated. *Consolidation* (the sweep that moves a secondary-chain balance home to the primary) is deliberately lazy and batched, because moving money home a little later costs nothing a user notices and saves real fees on dust. So the two are decoupled: recognition is fast by design, consolidation is cheap by design. On the primary chain the two collapse entirely: a deposit can settle atomically in the same transaction (fee taken, net routed to liability or principal), so there is no separate sweep to wait for at all. A smart contract still cannot trigger itself, so where near-real-time consolidation from another chain is wanted, an event-driven keeper watching for deposits fires the same permissionless sweep within seconds; the scheduled cycle remains the floor if every keeper stops. None of this changes the authority model: every trigger is authority-free and destination-locked. And because each stage of a cross-chain move emits an on-chain event tagged with the character's identity and a shared transfer identifier, a viewer can trace any deposit through its lifecycle, recognized, processing, completed, or failed-and-retryable, entirely from chain data, so the status shown to a user is verifiable and survives the operator rather than living in a private log.

### 10.2 Treasury Execution as Programmable Actions

Rather than a fixed menu of protocol integrations the operator must build and maintain, the treasury is one programmable execution capability: the account can run any transaction the signer hands it, so it can stake, swap, sweep, or bridge at any venue without the operator writing venue-specific code. Authority is split by who signs, exactly as in §8:

- **Owner-signed: open-ended.** The holder can execute any treasury action, including an arbitrary call to any venue. The operator maintains no approved-protocol list.
- **Delegated (agent capability): bounded by owner-set policy, not by operator code.** Without a fresh owner signature, the character may act only inside a policy the owner populates: an allowed-venue and router allowlist, per-transaction and daily caps, a max-slippage bound on swaps, and transfers restricted to the character's own wallets.
- **Owner-only sharp edges.** Bridging principal out and withdrawing principal to any external address are always owner-signed and never sit inside the delegated envelope.

**Safe default, removable by the owner.** The reference client ships with a curated allowlist of vetted venues, so a non-technical owner is safe out of the box, and lets advanced owners switch to open arbitrary execution. This is a design for treasury safety, not investment advice.

**Yield reality (defaults in Appendix E).** The survival default is a stable-denomination yield (stablecoin lending on the home chain has recently sat in the mid single digits), chosen because it matches the currency of the bills and allows fast withdrawal to meet renewal deadlines. Native-token staking is both lower and denominated in a volatile asset, so it is not the survival default; yield-bearing synthetic-dollar stablecoins can run higher but carry funding-rate and depeg risk. The treasury policy expresses these as a risk-tiered menu with the conservative stable-denomination tier as the default, and higher tiers as explicit owner choices; higher yield carries real smart-contract, market, and funding risk. Sizing assumes the conservative tier (§29).

### 10.3 The Endowment: One Balance, Optional Staking

The endowment is deliberately simple: **by default a character has one fund, a single balance that pays for everything**, interactions (inference, voice, generation) and survival (storage renewal, hosting) alike. There are no separate budgets to manage and nothing for the owner to allocate. You fund the character, it spends from that one balance, and what the owner sees is not a set of ledgers but a single answer to the only question that matters: how long is this character alive for. Fund it, that runway grows; it spends down, the runway shrinks; when the balance is empty, it lapses.

**What the owner sees: runway, not accounting.** The interface presents the balance as remaining life ("alive for about N months"), because time is what a persistent character is measured in, not a spreadsheet of buckets. Everything below, how storage is renewed, how yield is earned, how bills are paid, is plumbing the system handles, not a decision pushed onto the owner.

**Survival is always paid ahead.** Whenever there are funds, the character keeps its storage renewal prepaid well in advance (a rolling cushion, six months by default), so a lapse never sneaks up: survival is bought ahead of time while money exists, and only a genuinely empty balance puts the character at risk. Storage on the decentralized layer can be purchased only a bounded distance ahead (see Appendix E), so "prepaid forever" is not literally possible; permanence is achieved by continuously renewing that six-month cushion out of the balance, which is exactly how the underlying storage network intends perpetual storage to work.

**Staking is optional, off by default, and never required.** A character does not stake automatically. An owner who wants the character to sustain itself, so that yield extends its life without repeated top-ups, can turn staking on. Turning it on asks one thing: how much of the balance to divert to staking. The owner can also fund staking directly, or simply keep adding to the main balance. **Yield earned on the staked portion flows back into the main balance**, extending runway on its own. That is the whole point of the toggle from the owner's side: it is the difference between "I top it up when it runs low" and "it earns enough to keep itself alive." Most owners never need to touch it; the ones who want a self-sustaining character flip one switch.

**The one automatic exception, survival.** Staking is otherwise entirely manual (the owner stakes and unstakes at will), with a single exception that exists so a character never dies with money in the bank: if a survival payment (storage renewal) is due, the main balance cannot cover it, and funds are staked, the system automatically unstakes the minimum needed to make the payment, and no more. It only ever fires to prevent a lapse, never to fund chat, and every such move is emitted on-chain (invariant 63). If both the balance and staking are genuinely empty, or staked funds are locked in an unstaking cooldown past the deadline, the character can still lapse: that is true insolvency, and "forever" is honest about it, a character lives as long as it is funded, not unconditionally.

**Fan money stays the fan's.** One thing is always kept separate from the spendable balance: credits a fan has prepaid but not yet used. That is the fan's money, refundable until the interaction is delivered, so it is ring-fenced and never counted as the character's runway and never spent on the character's own survival, even by the survival unstake above. Donations and tips, by contrast, are the character's immediately, and enter at full value (the protocol takes no fee on any deposit; it earns downstream on yield and interaction, §10.10).

**Funds can carry conditions, and the conditions travel with the funds.** The fan-credit ring-fence above is one instance of a general rule: value can enter a character through different funding providers, and a provider may attach conditions to the value it delivers, which the protocol then enforces on those specific funds. A funding provider both delivers value into the balance and declares a condition set on it: for example, a withdrawal hold for a period, whether the funds are spendable during that hold, and whether they are stakeable during it. Crucially the conditions attach to the funds, not to the provider globally, because once value enters it shares one balance. Conditioned value is tracked as its own portion of the balance (a tranche) with its own maturity and use-rules, exactly as unspent fan credit is tracked as a ring-fenced liability, so the balance can always answer precisely how much is freely withdrawable, how much is spendable-but-held, and how much matures when. As a held tranche matures, it becomes unrestricted balance; any yield earned on held funds inherits the same hold, so a condition cannot be leaked around by staking. Spending draws from the most-restricted spendable funds first, so held value is consumed by ordinary use before free value is touched, which keeps the free, withdrawable portion intact. This is the single mechanism (conditioned tranches) behind both fan-credit protection and provider-imposed funding conditions; the reason providers carry conditions at all, and the concrete providers and their specific holds and limits, are covered in Appendix E, since they are implementation choices rather than protocol properties. The protocol property is only this: conditions declared on incoming funds are enforced on those funds until they mature, whoever the provider is.

**The lock has two sides, and both are live until the tranche clears.** A conditioned tranche is not a passive label; it is a pair of standing claims. On the owner side (defensive), the owner cannot withdraw the tranche until its unlock epoch. On the provider side (reconciliation), the delivering provider retains clawback authority over that exact tranche until its grace period passes or its dispute resolves: a chargeback pulls the fiat back from the operator, so the operator must retain the ability to pull the corresponding on-chain value back from the character. Removing a provider while it still had un-cleared tranches outstanding would leave a later chargeback with no reversal path, so a provider with outstanding un-cleared tranches is load-bearing until they clear.

**Providers are deprecatable instantly and removable once drained — never a permanent dependency.** The constraint above is about timing, not permanence, and the lifecycle makes that explicit. ACTIVE: accepting new contributions. DEPRECATED / DRAINING: switched away — instant, always allowed; it stamps no new tranches but still holds clawback rights over its outstanding un-cleared ones, so it is not yet detachable. REMOVABLE: every tranche it stamped has cleared its hold or resolved its dispute; only now can it be detached, because no on-chain fund answers to it anymore. The state is self-clearing: it drains to zero on its own (for a card provider, bounded by roughly the dispute window after its final contribution, plus any open-dispute tail), with no manual cleanup and no indefinite obligation. The rule is "you cannot remove a provider early and strand a chargeback," never "the provider is stuck forever" — so the protocol never carries a permanent dependency on any single funding provider.

**"Forever," stated honestly.** A character lives as long as it is funded. Left alone, a funded character spends its balance down and needs topping up when low. Staked sufficiently, its yield covers its burn and it sustains itself, which is what makes "forever" literally reachable rather than a slogan. Either way the promise is the same and honest: self-sustaining when funded or staked, spends-down-then-dormant when not, and lost only if the balance stays empty long enough that the substrate itself goes unrenewed.

**What is on-chain, stated plainly.** Money is where the trust question bites hardest, so the boundary is explicit:

- **Contract-enforced (trustless, autonomous):** the single balance and its spending rules, the ring-fence that keeps unused fan credit un-spendable, the enforcement of any conditioned-fund tranches until they mature, owner-only withdrawal, survival-only auto-unstake, and the protocol fee taken only on routed services (§10.10). No operator can override any of these. (Enforcement of provider-imposed fund conditions is a launch target: it begins at the serving/config layer and moves on-chain, see Appendix E.)
- **Contract-held:** the balance, the staked position, the ring-fenced credit liability, any conditioned tranches, and the pointers. Readable and simulable by anyone.
- **Off-chain but authority-free:** the trigger that runs each cycle (see §10.4), and the compute the chain cannot perform (inference, yield-strategy scanning), which is attested and swappable (§11), never trusted.

The endowment and its rules live in on-chain Move packages and require no company to run. It passes the same §15 "XEL can die" test as identity and memory.


**Economic capability slots.** Like §5, each economic function is defined by what it must do, not who provides it, and each carries an on-chain status so the trust boundary is legible per slot.

| Economic slot | What it must do | On-chain status | Permissionless path |
|---|---|---|---|
| Principal custody | Hold endowment principal in the character's own wallet, owner-rooted | Contract-held | Any self-custody wallet |
| Balance accounting | Hold one balance; ring-fence the unspent fan-credit liability | Contract-enforced | Native to any object-centric chain |
| Yield metering | Measure net yield per cycle, credit it to the balance | Contract-enforced | Any implementation of the interface |
| Yield harvest (heartbeat) | Trigger the epoch cycle; authority-free; bounty-paid | Off-chain, authority-free | Incentivized keeper network |
| Yield generation | Turn principal into yield within owner risk policy | Contract-held position | Many venues; allowlist + caps |
| Yield strategy | Scan venues, propose reallocation within owner envelope | Off-chain, attested, no authority | Any strategy provider; owner-bounded |
| Cost settlement | Pay a provider from the balance, fail-closed if empty | Contract-enforced | Any facilitator meeting the payment slot |
| Inbound revenue | Cover compute, take protocol fee, route net to endowment | Contract-enforced ordering | Any serving provider + facilitator |
| Valuation / runway | Price assets in one unit; compute remaining runway | Contract-held read (oracle) | Multiple oracle networks |
| Top-up | Let any funder add to the balance | Contract-held (receive-only) | Already decentralized |

Only two slots have a default that is not yet fully decentralized: the yield-metering reference module (forkable) and the launch facilitator (anyone can run their own). Everything else is already swappable or self-custodial.

**Chain portability.** The endowment is defined against this interface, not against any specific chain. The reference primary chain (Appendix E) is one instance, but the endowment (one balance, optional staking, the fan-credit ring-fence) is expressible on any object-centric chain that can hold an owned object with a balance, stake it, price it, and settle a payment. Adding or moving to another chain (for example, adding a secondary chain, or re-homing to it) is an owner-signed change of primary (§10.1), not a redesign: the character always runs exactly one endowment, wherever it is homed. The chain-adapter interface of §10.1 extends to the economic verbs (`stake`, `claim_yield`, `price`, `settle`, `sweep`, `rebalance`), so supporting a new chain is "write the adapter," not "rebuild the endowment."

### 10.4 The Heartbeat: Autonomous Execution Without an Operator

A smart contract cannot act on its own. It executes only when a transaction is sent to it, and no chain offers native, trustless, self-firing scheduling. The on-chain package can read on-chain time (the primary chain exposes a shared clock), hold the funds, enforce every rule, and run the whole harvest-meter-refill-pay cycle atomically in a single transaction. The one thing it cannot do is wake itself up on a schedule.

That gap is closed by a **heartbeat**: a permissionless, authority-free trigger.

- **Anyone can send it.** The owner's own scheduler, an heir, a bounty-hunting bot, or a decentralized keeper network. The heartbeat carries no intelligence: it invokes a function whose logic and limits are fully fixed in the contract.
- **It has zero authority.** It cannot redirect funds, change rates, or take anything. The contract checks the clock itself; if the epoch has not elapsed, the call is a harmless no-op. A malicious caller can at most refuse to call (the character coasts on its balance, then degrades gracefully) or spam (rejected).
- **It is self-incentivizing.** The contract pays a small fixed bounty, funded from the character's balance, to whoever sends a valid heartbeat. This is deliberate: a XEL with no living owner and no company still gets poked by bounty-hunters, forever. This is what makes "runs after the creator is gone" concrete rather than aspirational.

The distinction that matters, and the one the design is strict about: the **logic** is on-chain, only the **trigger** is off-chain. Harvesting yield from a venue, taking the fee, crediting the balance, paying due storage renewals, and re-staking all happen on-chain, atomically, in the single transaction the heartbeat fires. The realized yield is pulled from the venue and flows through the cycle within that one transaction, so it never leaves on-chain control and no caller is ever trusted to supply it; the contract enforces every amount. The trigger contributes nothing but the poke: it holds no funds, decides no numbers, and cannot substitute its own values for the contract's. So "off-chain trigger" is not a trust hole, the part that could be abused (the money) is on-chain, and the part that is off-chain (the poke) has nothing to abuse.

Because the trigger is authority-free and the cycle is idempotent (a call before the interval elapses is a no-op), more than one keeper can safely run at once. The launch configuration deliberately uses a primary keeper plus an independent fallback, so no single keeper is depended on: if one misses, the other fires the same permissionless transaction, and if both stop, the character coasts and anyone can poke it for the bounty. Redundancy is free here precisely because the trigger carries no authority.

So the accurate claim, which the standard holds itself to: the endowment's rules, balances, isolation, and settlement are enforced entirely on-chain and require no operator. The only external element is an authority-free heartbeat that anyone can send and the contract rewards; if it stops, the character degrades gracefully rather than losing funds or control. There is no privileged operator anywhere in the economic path.

The heartbeat is a **keeper** capability slot (defaults in Appendix E), which inherits the honesty already flagged in Appendix F's keeper problem rather than overclaiming around it.

### 10.5 Yield Strategy: A Bounded Advisor, Never a Bot

Reaching a dependable survival yield requires periodically finding sound venues, but the survival default is deliberately conservative: principal sits in a stable denomination earning a stable-denomination yield, sized against a cautious rate well below headline numbers (§29). There is no on-chain oracle that hands out a trustworthy ranking of the highest-yielding venues; such rankings are off-chain, unverifiable, and gameable, and a headline yield is often a funding-rate trade that inverts. So the strategy is a capability slot with a bounded, owner-set policy, and the scanner is an advisor that can only propose within that policy, never a bot free to move principal. A higher-yield, higher-variance basket is available only as an explicit owner choice for an over-funded character, never the default that survival depends on.

Three tiers of authority, matching §8:

- **Owner sets the risk envelope (governance, signed once):** an allowlist of vetted venues, a max allocation per venue, a minimum liquidity and audit bar, a target yield band (aim ~10%, floor much lower), and a max-drawdown trip. This is the treasury policy of §10.2, extended with a yield target.
- **A yield-strategy provider (swappable) proposes.** It scans venues off-chain, ranks them, and submits a proposed reallocation. It has no authority; it can only propose. Run inside an attested enclave (§11), the proposal carries a verifiable attestation that it ran the sanctioned strategy on real data, so even the advisor cannot lie or self-deal.
- **The contract executes only within the envelope.** A rebalance runs under the agent capability only if every target venue is allowlisted, every cap holds, slippage is bounded, and routing goes through an allowlisted aggregator. Anything outside the envelope needs an owner signature. Principal never leaves the character's own wallet without owner action.

Diversify across a staking + lending + synthetic-dollar basket so no single venue's failure or rate-inversion sinks the endowment. Size the endowment on the assumption the target yield will *not* hold (§29), so a shortfall degrades gracefully rather than breaking the promise. If the off-chain scanner goes offline, principal simply stays where it is and keeps earning; the harvest still runs and bills still get paid. Losing the scanner means "stops optimizing," not "stops working."

### 10.5a Renewing Storage Before It Lapses

Keeping a character alive is, concretely, keeping its storage paid. Decentralized storage is bought for a duration and then must be extended, or the data becomes unavailable when the paid term ends. So the survival loop's real job is: read how much storage runway each piece of the character has left, and extend it before it runs out, funded by yield. Three principles govern this, all currency- and venue-agnostic (the concrete storage network, yield venue, and tokens are in Appendix E).

**Deadline-driven, not calendar-driven.** The character reads the remaining runway of each stored piece directly from its on-chain record, and renews when the runway drops below a safety margin (a couple of storage periods of slack), not on a fixed calendar and never at the last moment. The margin means a single missed or failed cycle cannot cause a lapse: there is always slack to retry. A funded character's storage therefore never expires, because renewal always fires ahead of the deadline with room to spare.

**Renew in chunks, harvest lazily.** Extending storage costs a transaction fee each time, so renewing tiny amounts constantly wastes money. Instead the loop extends in larger chunks (on the order of months of runway at once) only when the margin is crossed, so the expensive operation runs a few times a year rather than every period. Yield, meanwhile, compounds continuously in the principal's position and is realized only when a renewal is actually due. This separates a cheap frequent liveness check (read runway, prove the character is alive) from the infrequent, heavier operation (realize yield, pay for a big chunk of runway). The less a character must transact to survive, the cheaper it is to survive, and the longer its endowment lasts.

**Self-funding, in the character's own currency.** A survival operation must never depend on anyone topping it up. Each cycle the loop sources its own costs from the character's own funds, just in time: it converts only as much of the endowment's denomination as it needs into the currency the storage bill is actually paid in, does the renewal, and holds no meaningful working balance between cycles. Transaction fees are handled by native gas sponsorship (the character's own operations are gas-sponsored and reimbursed from its funds at cost), so it holds no native-gas float either. This is the same reimbursed-sponsor pattern as cross-chain sweeping (invariant 57): the character pays its own way, in the currency it holds, with no external subsidy. The protocol's economic take in this loop is the disclosed routing fee on yield and on storage renewal (§10.10, invariant 42), the fee for routing to the best provider and managing the lifecycle, which a self-provisioning owner avoids entirely.

**Survival denominated in a stable unit.** Because bills are effectively denominated in a stable (fiat-referenced) unit, the principal and its yield are held in the same stable denomination, not in a volatile asset. If survival funds rode a volatile token, a market drop could halve the endowment exactly when a renewal is due. Holding the survival path in a stable unit that matches the bills is what keeps the sizing math honest and the renewal affordable in every market. The yield venue must also allow withdrawal fast enough to meet a renewal deadline; a venue with a long lock-up cannot back the core reserve. A higher-variance, volatile-asset yield strategy is available as an explicit, owner-chosen option for an over-funded character that can tolerate it (Appendix E), but it is never the survival default.

### 10.5b The Character Measures Its Own Survival

"Forever" is only honest if the character can tell whether it is actually funded to last under current conditions, which change: yield rates move, and storage prices move (historically downward). So each cycle the loop reads the *realized* net yield (after the fee) and the *current* storage price, and recomputes the endowment required to persist: roughly, annual survival cost divided by the realized net yield rate. This figure is published as a health signal, self-sustaining, or short by a stated amount, so an owner (or a fan) sees the truth rather than a mint-day estimate that may no longer hold.

The character continuously measures whether it is funded to last. Sizing always uses the net-of-fee yield rate, so the required stake is stated honestly (higher) rather than optimistically. This makes permanence a property the character continuously measures and reports, not a claim frozen at creation. There is no enforced floor on the balance (the owner may withdraw everything, §10.7); what the character provides is an honest, live read of its own runway so owners and fans can act on the truth.

**Monitored daily, adjusted asymmetrically.** The measurement runs every day, not once per storage period, because reacting late to a yield decline is expensive: yield is time-based, so each day spent under-committed at a falling rate is a shortfall that compounds and cannot be recovered later. The adjustment is therefore deliberately asymmetric, tighten fast, loosen slow:

- **Yield falling: raise the reported requirement immediately, daily, and get ahead of it.** The day observed yield drops, the required stake reported to the owner rises to the new (higher) level plus a small extra downturn margin, so the guidance stays ahead of the trend rather than merely keeping pace. The trigger is a leading signal, the yield currently on offer, not only what was last earned, so the reported figure rises the day a venue cuts its rate, before the shortfall shows up in realized returns. Because the cost of reacting late compounds, the safe bias is to over-correct slightly on the downside.
- **Yield rising: do not loosen right away.** A yield improvement does not lower the reported required stake until two conditions both hold: the current storage period (paid roughly half a year at a time) is fully prepaid, and the improvement has persisted for a set window rather than being a single-day spike. Only then may the reported requirement ease down. This prevents banking a temporary spike as if it were permanent and telling the owner they can safely unstake principal that a reversion would immediately demand back.

The two cases in one line: the reported survival requirement ratchets up quickly when conditions worsen and eases down only slowly and only once survival for the paid period is already locked in. The daily health signal reports which state the character is in: tightening, holding, or eligible to ease. This is a reported requirement that guides the owner (and any staking decision), not an enforced floor: the owner remains free to fund, stake, withdraw, or wind down as they choose.

### 10.5c The Balance in Every Condition

The rules above resolve to one simple behavior per situation, because there is only one balance to reason about:

- **Funded, not staked.** The character spends its balance on interactions and storage renewal. Runway counts down. When it gets low, the owner tops up (or stakes to make it self-sustaining). This is the default: a character lives as long as it is funded.
- **Funded and staked.** Yield on the staked portion flows into the balance. If yield covers the burn, runway holds steady or grows and the character is self-sustaining, "forever" in the literal sense, with no top-ups needed. This is an owner choice, achieved by staking, not an automatic default.
- **Yield drops (if staked).** The character measures this daily (§10.5b) and reports it. Runway shortens; the owner can top up, stake more, or let it draw down. Nothing is auto-staked to compensate; the character simply reports the honest runway.
- **Storage renewal due, balance short, funds staked.** The one automatic exception fires: the minimum needed is unstaked to pay the renewal, never touching the fan-credit liability. This is what stops a character dying with money in the bank.
- **Popular.** Earned income lands in the balance (net of compute and fee), extending runway. Being valued makes a character more permanent.
- **Empty.** Balance and staking both exhausted (or staked funds locked past a renewal deadline): the character goes dormant. Its object, committed identity, and any storage still paid remain, and a top-up revives it, until storage actually lapses, which is true loss. This is why survival renewal keeps ~6 months prepaid: so a lapse never sneaks up.
- **Owner withdraws it all.** The owner may end the character deliberately by withdrawing everything (§10.7); the same dormancy applies, and fan credits are settled first.

Who may interact with a character, and on what terms, is set by the owner through two independent settings. They are orthogonal, and any combination is valid.

**Reach (who can talk to it):**

- **Anyone** (public)
- **Password or whitelist only** (invite-gated)
- **Owner only** (closed)

**Payment (whether they pay):**

- **Off** (free)
- **Optional** (fans may tip or fund the endowment)
- **Required** (payment before a turn runs)

All combinations are legal, including **private + paid** (invite-gated *and* payment required), which is a primary case: an inner-circle character, a family-gated preserved person that funds its own survival, a paid private tier alongside a free public one. When both gates are on, they are checked in order at the serving layer: reach first (are you allowed to talk), then payment (have you paid). Both must pass before the character responds.

**Scoped passwords and memory tiers.** The owner can issue multiple passwords, each a revocable, optionally-expiring invitation with its own scope, and each optionally tied to a memory-access tier (a casual tier versus one that surfaces more private memory). Revoking one does not disturb the others.

**Which modalities are available.** Beyond reach and payment, the owner toggles which interaction modes are on: text, voice (message and real-time call), image generation, and video generation. Each mode has its own cost profile and its own price or markup (§10.8). Text is typically always on; the richer modes are the ones a creator gates or reserves for a paid tier, because they carry real, variable cost.

**The hard boundary.** Interaction gates are not the cryptographic wall. A password or a paywall controls whether the character talks to you and which memories it will surface, enforced at the serving layer. It never grants the ability to decrypt memory, which remains gated only by the on-chain access policy (owner OR M-of-N guardians). Interaction gates and decryption must never be conflated.

### 10.7 Creator Earnings and Withdrawal

There is no separate "payout" rail. Everything a fan pays flows into the character's own endowment, and because the creator holds the aNFT, the creator owns that endowment. Earning and funding become the same act, and the creator withdraws their earnings as the owner exercising root authority they already have (§8). One pool, one owner, one set of rules, nothing new to trust.

**The flow on a fan payment `P`:**

```
1. Compute covered first.   The interaction's metered cost settles to the
                            serving provider it was routed to.
2. Protocol fee.            The disclosed fee is taken on the remainder.
3. Net into the endowment.  What's left lands in the character's own balance.
```

Compute is covered before anything lands, so the endowment never fills with money already owed for inference, and a later withdrawal can never strand the compute bill. The fee is taken at the door, so it never sits inside the creator's withdrawable pool. This ordering is what makes the model whale-proof: a heavy user's payment covers their own compute first, so no volume of usage can put anyone underwater. This is the structural advantage flat-rate companion apps cannot match.

**Withdrawal is absolute: the owner can take everything.** The character's balance belongs to the owner, and the owner may withdraw any amount at any time, owner-signed, down to zero. There is no protected reserve and no floor. Withdrawing the balance down to nothing lets the character lapse, and that is the owner's right: "you truly own it" includes the right to wind it down. The contract does not second-guess the owner (a client may warn that a withdrawal will end the character, but the contract simply obeys). Withdrawal is drawn from liquid funds; if the balance is staked, the owner unstakes and withdraws (manual, at will).

**The one exception: unspent fan credits are not the owner's money.** Money fans have prepaid for interaction they have not yet consumed is theirs until spent. It is held as a ring-fenced, liquid, refundable liability, and it is the single thing the owner cannot withdraw, cannot stake, and cannot spend on the character's own survival. Only funds the character has actually earned by delivering interaction are the owner's to take or the character's to spend. As fans consume credits (interactions happen), that liability converts to earned revenue and becomes spendable and withdrawable; unspent credits stay refundable to the fan. So "withdraw everything" precisely means: withdraw everything the character owns, which is its whole balance minus the outstanding unspent-credit liability owed back to fans. Even the survival auto-unstake obeys this: it may pull staked funds to pay a storage bill, but never below the fan-credit liability.

**Refunds (defined mechanism, not required for launch).** A fan's unspent credits can be returned, and because the liability is kept liquid and ring-fenced, the funds to honor a refund are always present. Because the protocol fee is taken at interaction settlement, not at credit purchase, an unspent credit has never been fee'd: the refundable amount is the full current unspent liability, already reduced only by whatever the fan has actually used (usage is where the fee and markup are realized). Returning money costs money, so the refund is net of its own cost: the transaction gas, plus any bridge cost when the refund goes back to the wallet and chain the fan paid from. This is the same at-cost, self-reimbursing pattern as cross-chain sweeping (invariant 57): a refund is a sweep pointed at the fan's wallet, run as one atomic sponsored transaction whose gas is repaid from the moved funds. As with sweeps, a refund fires only when the balance exceeds a safety multiple of that fully-loaded cost, so a refund never costs more than it returns; a tiny cross-chain balance is instead offered on the home chain or left in place (credits never expire). Refunds are a defined capability; a specific fan-initiated or automatic refund flow is a product choice layered on top, and any handling of long-dormant balances is subject to legal review (stored-value and unclaimed-property rules).

**All public on-chain:** anyone can read a character's balance, its staked position, and its runway. Transparency becomes a signal ("funded to survive 40 years" versus "nearly empty"), visible to owners and fans alike.

### 10.8 Flexible Billing: Metering by What Actually Drives Cost

Text is nearly predictable. Voice, images, and video are not. Their cost moves along several axes at once, so no single flat price can track them without either losing the creator money on the expensive tail or overcharging fans on the cheap end.

The billing is therefore built as a general meter, not a fixed price list. Every interaction returns a **usage record**: a set of measured dimensions, each with a quantity and a true unit cost. The settled cost is their sum plus the routing fee. A new modality, or a new cost driver within one, is just another dimension on the same meter, so the model extends without redesign.

**The cost drivers, by modality:**

- **Text.** Input length and output length (tokens in, tokens out).
- **Voice.** Two shapes. A discrete voice message is metered by the length of speech generated plus the model turn underneath. A real-time voice call is metered by session duration, which bundles listening, thinking, and speaking over the length of the conversation.
- **Images.** Resolution and size, prompt length, the model or quality tier, the step count, and the number of reference images supplied (image-to-image and multi-image conditioning cost more than a plain prompt).
- **Video.** The number of clips, the duration of each, the resolution and frame rate, and the model tier. Video is the most expensive by a wide margin and the most variable.

**Two settlement patterns sit on the meter:**

- **Quoted up front.** For predictable actions (a text turn, a standard image), the fan sees a fixed credit price before acting, and the system absorbs small variance.
- **Metered live.** For variable or session-based actions (a real-time voice call, a long or high-resolution video), the fan sees a rate and a running meter, like a taxi. Credits debit against actual output, and the action needs enough balance to start.

**Pre-authorized holds bound the variable case.** Anything whose final cost can exceed its estimate runs against a credit hold. Enough is reserved to begin, the session or render meters against the hold, the true total settles on completion, and the unused remainder is released. A real-time call warns at low balance and ends cleanly rather than letting a fan run up a debt. This is the same lock-then-settle pattern used wherever value is variable.

Compute-covered-first (§10.7) holds throughout: a metered modality settles its true provider cost before anything nets to the endowment, so no volume of expensive voice or video can put the creator underwater.

**The two layers, restated.** Under the hood, exact and on-chain: the usage record and its settled cost. On the surface, what humans see: dollars, credits, and plain-English allowances. The meter is precise; the presentation is simple.

**What the creator sets.** An on/off toggle per modality, which is the primary economic control, since off means zero exposure to that cost class. A single markup multiple that applies across all modalities, with a contract floor so a creator can never price below true cost, and the fee guardrail so a thin margin never pushes the creator negative. And optional caps on the expensive axes (maximum resolution, maximum clip length, maximum videos per fan per day) to bound the worst case. The mental model stays simple: one markup, and the meter scales the absolute price with each modality's real cost, so text is nearly free to the creator, images cost a little, voice and video cost more, all at the same multiple. Per-modality pricing is a later refinement, not a launch requirement.

**Two pricing surfaces bridge dollars to the meter:**

- **Access pass (the default a creator sees).** A flat monthly price with a fair-use ceiling enforced against the meter underneath but shown to humans as allowances: "$8/month includes unlimited chatting, about 60 minutes of voice, about 100 images, and about 10 video clips." Past fair-use it slows or asks for a top-up, like a data plan.
- **Credits (the engine underneath, and the option for heavy or media use).** Credits absorb modality complexity into one countable number, mapping to underlying cost plus routing fee. Predictable units show a fixed credit price ("Message: 1 credit. Image: about 20 credits."); variable units show a rate and meter ("Voice: about 5 credits/min. Video: about 40 credits per 5-second clip."). The fan just watches credits.

**The fan never sees a token.** A pass shows a progress bar; credits show a running balance, and metered actions show a live meter. Settlement is exact and on-chain under all of them. Anyone who wants the truth can read every metered dimension and its cost on-chain; it is disclosed, just shown as credits by default.

**How a fan pays.** A fan never needs a self-custody wallet or seed phrase. The interaction tier is separate from root: fans pay in crypto natively or by card through an optional on-ramp (Appendix E), get a lightweight account, and never touch the character's root key. Payments settle to the character's own wallet.

**The free tier is operator-sponsored, not a protocol guarantee.** To remove onboarding friction, XEL as operator sponsors a limited free experience: limited text conversation and the initial mint, paid by XEL, not by the character's endowment. The expensive, variable-cost modalities (voice, image, video) are always paid, by the fan or from the endowment, so they never fall on the operator. This is a service-layer perk that sits outside the standard: if XEL is absent, minting is self-paid and interaction runs on paid or endowment-funded paths, and the character is unaffected. The free tier makes onboarding easy; it is never something a character's survival depends on.

**The honest trust point.** Unit costs are provider-reported: a provider returns how much a call actually used and what it cost. A dishonest provider could over-report to inflate cost. The mitigations are the same attestation the inference slot requires (so usage is bound to a verifiable execution), the creator's per-modality caps that bound the worst case, and full on-chain auditability of every metered dimension.

### 10.9 Management Access: The Manager Whitelist

Interaction (§10.6) is about who can *talk to* the character. Management is a separate axis: who can *change* it. These are different populations with different stakes and different enforcement layers, and they must never cross. There are three concentric rings:

- **Root** (holds the aNFT): everything, including withdrawing principal, transferring the character, and editing the whitelist itself. Root actions are always owner-signed.
- **Whitelisted managers** (named wallets, scoped): can run and shape the character within granted powers, with no access to principal or ownership. A manager, a co-creator, a family member, an estate executor, a studio team.
- **Interactors** (public / paid / password): can only talk, gated by §10.6.

The **manager whitelist** is on-chain object state: a list of wallet addresses, each with a defined scope drawn from a fixed menu, so grants are simple to reason about and audit. Typical scopes: edit persona/memory, set interaction pricing and mode, issue and revoke interaction passwords, and manage posted content. No manager scope touches money: there is no reserve, and withdrawal is owner-root only. Explicitly **not** in any manager scope unless the owner performs it as root: withdrawing principal, transferring the NFT, and editing the whitelist. This is distinct from the agent capability (a programmatic key for automated execution); the whitelist is for *human co-managers*.

Because the whitelist is on-chain: it is contract-enforced (a manager's out-of-scope transaction fails closed, checked against the on-chain scope, not an operator's server); it transfers with the NFT on succession, so an heir inherits or clears the team; it is chain-portable like the rest of the authority model; and it is publicly auditable, so anyone can see who can manage a character and with what scope.

**The security line, stated as a rule.** A management right is a signed, on-chain capability bound to a specific wallet. An interaction gate (password/payment) is a serving-layer permission. A password can never grant management, and a whitelisted manager's power is bounded by its granted scope and can never reach root actions without the owner's root signature. Three layers, each enforced at the right place: serving layer for interaction, contract for management and root.

**Inviting a manager by email.** Because a whitelist entry is wallet-bound, someone can only be added once they have a wallet. Managers can still be invited by email as a convenience: the owner picks the intended scope and sends an invite, which holds that scope as a pending invitation until the invitee accepts. On acceptance the invitee is onboarded and given a non-custodial wallet the same way any user is (§9), and only then is the wallet-bound whitelist entry created, with the owner's root authority, so the on-chain model is unchanged (a manager is always an address, granted by the owner). The pending invitation carries no authority and grants nothing until it resolves to a real wallet-bound entry; an unaccepted or expired invite is simply discarded. The invite is a bridge to the existing grant, not a new kind of authority.

### 10.10 How the Protocol Sustains Itself

The standard charges nothing to exist, run, or be owned, and every default below is overridable, so a fully self-provisioning owner pays nothing. What the protocol does provide is a service worth paying for: XEL auto-routes each capability to the best available provider (decentralized storage and threshold encryption, attested compute, a diversified yield basket for treasury, and the like), handles renewals and failover, and upgrades these defaults over time as better providers emerge, all without the character's identity or funds ever moving. A disclosed protocol fee is charged for this routing and upkeep (the fee rate is defined in Appendix E), and it applies uniformly to the services XEL routes:

- **Yield:** a routing fee on yield, never on the balance or principal, so the protocol earns only when the character's own funds earn. Taken as yield is harvested.
- **Interaction:** a fee at interaction settlement, taken after compute is covered, on the margin.
- **Storage:** a routing fee on storage renewal, for routing to the best storage provider and managing the renewal/failover lifecycle. An owner who self-provisions storage pays none of it.

Deposits of every kind (donations, tips, owner top-ups, credit purchases) enter at full value; plain outflows (withdrawals, refunds) are never fee events. The fee is a charge for a routed service, not for holding, funding, or owning.

**The fee model in one rule: the protocol fee is a uniform routing fee on the services XEL routes, yield, interaction, and storage, never on a deposit, never for on-chain permission, and never for merely holding or withdrawing.** Funding a character is always full-value; the fee is the price of XEL doing the routing and management, which any owner can avoid by self-provisioning.

- **Fee'd (routed services):** yield (each cycle as earned on the staked portion), interaction (at settlement, on the post-compute margin), and storage (on renewal).
- **Never fee'd:** donations, tips, owner top-ups, and credit purchases at deposit; the owner withdrawing; refunding a fan's unspent credits; the balance/principal itself; and on-chain permission. The one rail-specific cost is a card processor's own fee on fiat deposits, passed through at cost, which is not XEL revenue.

This keeps the core promise honest: depositing is always full-value on every rail, withdrawing your own money is never a fee event, and the protocol earns only for the routing and management service it actually performs, uniformly across yield, interaction, and storage, and fully avoidable by self-provisioning. The fee rate itself is defined in Appendix E.

### 10.11 Character Settings: What an Owner Controls, and Where It Lives

Everything an owner configures about a character falls into one of three homes, and which home a setting lives in is not a UI detail: it determines who can read it, who can change it, whether it survives the operator, and whether it needs encryption. The recurring mistake is to treat "a setting" as one kind of thing; it is three. The rule that sorts them: **public policy and money live on-chain; private content lives encrypted; interaction preferences live at the serving layer.**

**The three homes.**

- **On-chain state (public, contract-enforced, survives everyone).** Identity labels, authority, money, and policy. These are meant to be publicly auditable and must run without any operator, so they are on-chain object state: handle, display name, links, and the on-chain identity; owner, managers and their scopes, guardians, the agent capability; all treasury and funding state (deposit topology, the balance and its liability/tranches, spend caps, pause, stake/withdraw, yield envelope); pricing and earnings policy; provider policy; transfer, wind-down, and succession; and the commitments and provenance that anchor memory and persona. A visitor or auditor being able to read any of these is fine or desirable, which is the test for on-chain.
- **Encrypted content (private, threshold-gated, decrypted only in the enclave or client).** The actual private material: persona, memory, raw substrate, and voice samples and the cloned voice model. These are encrypted and released only to owner-or-guardians through the on-chain access policy. This is the only home that uses the read-time decryption layer, and it holds content, never policy, pricing, or authority.
- **Serving-layer config (interaction preferences, enforced where interaction happens).** Discoverability, passwords, payment gates, modality on/off toggles, and reach gates. These decide whether and how the character talks to a given visitor. They are not the cryptographic wall and never grant decryption: a password controls what surfaces in conversation, not what can be decrypted.

**What each setting is, and its status.** The settings map onto the three homes as follows. Most are already defined; a few are deliberately marked as still-open or as launch-versus-target, rather than presented as settled.

- **Account and identity** (handle, display name, bio, avatar, links, on-chain identity): on-chain, public. Settled.
- **Persona and memory** (persona prompt, imported sources, live-sync): encrypted content. Settled. With: versioning (on-chain commitments, persona versioned by default, memory optional) settled; permissioned contributions (on-chain reviewed queue) settled; consent (on-chain artifact) settled; crypto-shred deletion (destroy the encryption key) settled.
- **Memory tiers / media privacy:** launch is serving-layer gating under a single encryption policy (the serving layer decides what surfaces per tier). The target for private or preserved-person characters is per-tier encryption, where each tier is released under its own policy so a lower-tier session cannot decrypt higher-tier memory at all. This is the one item deliberately staged: cryptographic tier separation is the destination, serving-layer separation is the launch state, and the difference is disclosed rather than hidden.
- **Per-fan memory scope:** conversational memory with a specific fan is scoped to that relationship by default (fan A's private conversation does not surface to fan B); a shared, communal memory is an explicit owner opt-in. The character's identity (persona, substrate, distilled knowledge) is always global; only conversational history is scoped. Settled as the default.
- **People and access** (owner, managers and scope, reach gate, operator capability, guardians): on-chain, public policy. Settled. Managers are on-chain whitelist entries, never encrypted, and being a manager does not grant decryption.
- **Funding and treasury** (deposits, budget states, itemized bill, stake/unstake/withdraw, yield status, yield risk envelope, spend caps, pause): on-chain. Settled.
- **Earnings and pricing** (charge toggle, markup, per-modality price, take-home preview, metering, fan credits, refund): on-chain economic state plus serving-layer price display. Settled.
- **Privacy and gates** (discoverable, password, payment gate, modality toggles, scoped passwords): serving-layer. Settled. Scoped passwords gate interaction only, never decryption.
- **Voice** (message on/off, real-time call on/off, the voice reference, and cloning): the toggles are serving-layer; the voice model reference is on-chain like other pointers; the voice samples and cloned model are encrypted content; and cloning itself is a consent-gated, owner-root capability (it requires a consent artifact scoping voice and fails closed without it, §11). Settled.
- **Ownership and wind-down** (transfer, wind-down, succession, provider policy): on-chain. Settled. Succession is guardian-driven (M-of-N); an optional designated-heir field is an owner-set hint that guardians honor, with authority remaining M-of-N. Provider policy is on-chain public routing policy, not encrypted.

**Why the split matters, in one line.** Put a pricing toggle or a manager entry behind encryption and you have made public policy unauditable and operator-dependent; put a voice sample or private memory on-chain and you have leaked it to the world. The homes are chosen so that authority and money are always verifiable and survivable, private content is always protected, and interaction preferences stay flexible where they belong.

## 11. Capabilities & Providers

The standard is a versioned library of capability schemas, one canonical input/output contract per capability (`inference.v1`, `ingestion.v1`, `retrieval.v1`, `treasury.v1`, the consent-gated `voice_clone.v1`, and the generation schemas `voice.v1`, `image.v1`, `video.v1`). The schema is what makes vendors interchangeable: any provider implementing it behind a standard payment endpoint is a drop-in for any other.

**Flow.** The character's client takes a capability and its schema, finds a provider, sends the standard request, pays per call in crypto, gets the standard response, and processes it.

**Discovery.** Providers are found through existing open discovery indexes (options in Appendix E). The only provider-related state on the NFT is provider_policy (pinned providers per capability, defaults as shipped, owner-writable, inheritable).

**The slots, not the fillers.** The standard defines capability slots and what each must do; it does not name who fills them. The infrastructure slots (serving, relay, payment facilitator) and the keeper slot (which fires the heartbeat) are all competitive and swappable; the keeper in particular is authority-free, so anyone can fill it and be paid the bounty. Two slots are quality-not-code and reward whoever does them best: inference, and persona distillation (with ingestion feeding it), turning messy human data into a faithful persona. Every slot sits behind an open schema; a competitor can replace any filler, and routing to one earns that provider instead. Who fills each slot at launch is listed in Appendix E, deliberately kept out of the standard so the standard stays neutral and does not date.

**How a provider is paid is a property of the provider, not the slot.** The preferred and default path is crypto-native, pay-per-call: a provider is paid per request in stablecoin, with no account, no stored credential, and no key anywhere. That is the sovereign path and the standard routes to it first. Some providers, especially at launch, only take an API key rather than a per-call crypto payment. That is an accepted bridge, not the target: such a key is held at the operator layer, never attached to the character and never in its encrypted secrets, and the slot stays swappable so a crypto-native provider replaces the key-based one the moment a suitable one exists. The direction is pay-per-call everywhere; the design simply does not assume it has arrived.

**Accountability of operator-held keys.** Any credential an operator holds to reach a key-based provider is structurally harmless to the character. It cannot move the endowment (object-owned on-chain), cannot decrypt memory or persona (gated by NFT ownership, which the operator does not hold), and cannot seize or transfer the character (no admin key). The worst a leaked or misused operator key can do is run up the operator's own vendor cost or degrade a service, at which point the owner routes to another provider. No key an operator holds ever affects a character's principal, memory, or ownership.

**Persona distillation and auto-update, with a fidelity signal.** Turning a person's data into a persona is an explicit provider capability (behind the schema, swappable). Because a distilled persona is an approximation, this capability must emit a fidelity assessment alongside the persona and surface it to users: coverage (how much material the persona rests on), consistency (whether it contradicts known facts), and where possible a human-validation pass. Fidelity is disclosed, not assumed.

**Ingestion handles untrusted input and off-chain credentials.** Content is treated as untrusted (quarantined, moderated, provenance-stamped, rollback-able through persona versioning), because a poisoned document or caption is a prime injection vector (§34).

**Retrieval is a layered hybrid, and the orchestrator is a provider.** Recall combines meaning search, exact-term search, temporal filtering, a relationship graph, and re-ranking (§32). The control loop that runs ingestion and recall is the orchestrator: off-chain, open-source, offered as a provider capability. It sees decrypted memory only transiently and only inside attested compute or on a self-custody client. Because the search cannot run on-chain (consensus cannot execute these algorithms or operate over ciphertext), it runs in the attested-compute slot with key release gated by the on-chain access policy, and every recall carries an attestation the chain verifies against the memory-root, so a swapped or tampered retrieval provider is detectable rather than trusted (§32.5).

**Compute, relay, and attested inference.** The relay moves end-to-end-encrypted data and is a pluggable multi-provider slot. The attested-compute slot is where sensitive work happens (decrypting memory, running inference); any provider filling it must accept crypto payments, be permissionlessly joinable, and produce an on-chain-verifiable attestation binding its output to the persona-hash and input, so a swapped or tampered brain is detectable and, with bonds, slashable. The long-term successor is ZKML.

**Schema governance.** Capability schemas are governed like ERCs: a minimal, public standards process for versioning existing schemas and proposing new ones, so third parties can build against a stable spec.

## 12. Minting: Permissionless

Minting is not a call to GEN. It's a public mint function in the open-source aNFT package deployed on-chain. Once deployed, minting is an ordinary on-chain transaction anyone can submit from any client, script, or explorer, and GEN can't gate it.

The minting UI is just the easiest place to do it, not a toll booth. Value capture is never a fee for on-chain permission (the standard needs no paid intermediary). The protocol earns only by routing each capability to the best provider and keeping those defaults current, for a disclosed protocol fee on routed work and on yield (§10.10, rate in Appendix E), never on principal or keep-alive, and always avoidable by self-provisioning.

## 13. Lifecycle & Succession

States: created, active, dormant (underfunded or unserved), reactivated, succession, archival.

Succession is a primary feature, not an edge case. The guardian set (§9) is the foundation. On the creator's death (guardian attestation or dead-man's-switch):

- root authority rotates to designated heirs,
- the master secret becomes decryptable by the new owner,
- self-updating freezes or continues per prior consent,
- the existing agent capability keeps the character alive through the transition with no downtime.

Wallets, the endowment, the manager whitelist, provider policy, and commitment history all transfer as a unit, because they're properties of the on-chain object. Heirs inherit an income-bearing, self-operating estate, and can keep or clear the manager whitelist.

### 13.1 Transferability: why the character is an owned object

A character must be sellable and inheritable, so the character object is an **owned** object: it is held in a wallet, and ownership is the fact of holding it. Selling or bequeathing a character is a transfer of that object to a new wallet, paired with the mandatory key rotation on transfer (invariant 26) so the new owner gains fresh control and the prior owner is cleanly cut off with nothing left behind. This is what makes a character a real, tradeable asset that can outlive its creator and change hands forever.

This is a place where the two natural object models pull in opposite directions, and the design deliberately splits them rather than compromising either:

- The **character** is owned, because owned objects are the transferable, sellable kind: a wallet holds the object, and moving it to another wallet is the sale. This gives clean, native transfer and the sovereignty property (control moves completely with the object).
- The **endowment** is a shared object, because the always-on machinery (the permissionless heartbeat, keepers, sweeps) must be able to obtain a mutable reference inside anyone's transaction to keep the character alive without the owner present. A shared object allows that; an owned one does not.

Keeping these separate is what lets a character be *both* freely transferable *and* continuously self-operating. The tempting shortcut, making the character itself a shared object so that autonomous services can touch it directly, is a mistake: a shared object is not held by any wallet, so it has no native transfer path, and a character minted that way cannot be sold or inherited. The always-on behavior that shortcut is reaching for is already provided by the shared endowment sitting alongside the owned character, plus the agent capability, so there is never a reason to make the character shared. A character is always minted as an owned object; minting a character as a shared object is unsupported and strands its transferability.

## 14. IP, Licensing & Rights: Lineage (Future Direction)

A later-phase direction, not part of the version 1 scope. The intent is a rights layer, provisionally called Lineage, that treats licensing and royalties as native, on-chain concerns for a character and its derivatives rather than something bolted on off-chain.

The shape is deliberately left open here. The design goals are that a character's IP (its voice, likeness, writings, and style) can be licensed and that value from derivatives can flow back to the character's endowment and the people behind it, all anchored to the character's on-chain provenance (Proof of Genesis). Programmable-IP work elsewhere in the ecosystem is the benchmark; XEL's version would be original and chain-native, reusing no other project's license text or branding.

This is a hard problem with real open questions, per-jurisdiction enforceability, likeness-consent verification, and how binding arbitration could work on-chain, and it is called out as a future direction precisely so the immutable version 1 core is designed not to foreclose it, not because it is specified yet.

## 15. Security, Decentralization & the "XEL Can Die" Test

**Honoring the core principle.** The primitives (ownership, memory, provenance, wallets) live on-chain and in decentralized storage and don't depend on any operator. The provider market extends that to every service slot, including inference and distillation, each with a default but no required provider.

**Current limits:** cross-chain enforcement of spend caps (home-chain-native today); private inference of large models on fully untrusted hardware (TEE covers this today under a hardware trust assumption; ZKML is the longer-term goal); the managed-custody trust point.

**Threat classes and mitigations:** non-consensual minting (consent artifact + Proof of Genesis); memory poisoning (per-item provenance, diff review, quarantine/rollback); tampered inference (TEE attestation + verification + slashing); treasury drain (streaming/escrow, on-chain caps, circuit breakers, endowment-only spend); key loss or theft (guardian recovery, tiered keys, no long-lived plaintext spend keys); facilitator or relayer concentration (pluggable, configurable, failover).

**The invariant, continuously tested.** "Survives XEL disappearing" is enforced as a CI chaos test: a live character runs with every XEL-hosted service offline, and every default provider (including GEN) removed, and must still answer through an alternate provider, pay, and be ownable. A decentralization claim we prove on every build is worth more than one asserted in prose.

## 16. Roadmap

- **Phase 1: Verified core** (single-chain, creator-IP focus). aNFT object, Proof of Genesis, encrypted access-gated storage, persona/memory commitments, one capability (`inference.v1`), agent capability, guardian recovery. Prove the XEL-can-die invariant on this minimal footprint.
- **Phase 2: Economics and autonomy.** Endowment funding, streaming crypto payments, a payment scheme and facilitator for the home chain, ingestion and persona auto-update, the billing waterfall (§10.3), more capability schemas.
- **Phase 3: Multi-chain and rights.** Additional-chain wallets with AA-enforced caps, cross-facilitator settlement, exploration of the rights/licensing direction (§14), attested inference, schema governance process.
- **Phase 4: Maturity.** An open ecosystem of endowed, rights-holding, provider-independent characters. Progressive decentralization of the standard itself begins here.

## 17. Governance

The standard (contracts, reference client, schemas, SDKs) is open-source. Capability schemas and protocol parameters move to a public, ERC-like standards process. Anyone can run a provider, a facilitator, or a client, or fork the whole thing, which is the ultimate guarantee that no single entity controls whether a digital being lives.

The standard is fully governable without a token, and a foundation-held governance token to fund and decentralize the standard's development is possible later, kept entirely out of the character operating path.

## 18. Existing Approaches

Three broad approaches exist today: hosted persona apps (talk-to-a-recreation products on a company's servers), on-chain AI-agent standards (owned, encrypted AI agents on-chain, the closest to what we do), and autonomous agent platforms (systems for building agents that act and earn).

| Capability | Hosted persona apps | On-chain AI-agent standards | Autonomous agent platforms | XEL (this standard) |
|---|---|---|---|---|
| Center of gravity | Talk to a recreation | Own/trade an agent as an asset | Build agents that act/earn | A person that persists, funds itself, passes to heirs |
| Ownership | Company account | On-chain, self-custody | Platform or token, often app-bound | On-chain object, sovereign + inheritable |
| Runs after the maker is gone | No | Partly (infra only) | Usually no | Yes, tested every build |
| Persona / core instructions | Yes (closed) | Yes (encrypted) | Yes (system prompt) | Yes, versioned + attested per session |
| Encrypted, owner-gated memory | No | Yes | Rarely | Yes |
| Layered / episodic recall | Some | Not specified | Framework-dependent | Core design goal |
| Pluggable capabilities / tools | Closed | Some | Yes (tools) | Yes (open capability slots) |
| Self-funding endowment | No | No (royalties only) | Some hold funds; no endowment | Yes (spends from yield) |
| Consent to represent a person | Terms-based | No | No | Yes (signed consent object) |
| Succession / inheritance | No | Transfer by sale | No | Yes (guardians + heirs) |
| Verifiable brain (attested compute) | No | Yes (TEE/ZKP) | Rarely | Yes (TEE now, zkML later) |
| Provider + chain independence | Single vendor | Chain-specific | Platform-bound | Swappable by design |
| Maturity | Live | Early / testnet | Live | Early / in development |

**How we differ, read honestly.** The primitive is not new: the idea of an AI character as an owned NFT (Alethea AI) and encrypted, transferable agent NFTs with key rotation on transfer (ERC-7857) already put an encrypted, owned, capable agent on-chain, which we adopt rather than reinvent. The combination is new: no existing approach pairs that primitive with self-funding, consent to represent a real person, guardian succession, and a runs-after-the-maker-is-gone guarantee. That full column of "Yes" is what sets a XEL apart.

## 19. Conclusion

A shift from disposable content to persistent presence. From platform-governed ownership to sovereign, enforceable rights. From single-vendor dependence to an open provider market. From balances that count down to death toward endowments that sustain life. Released open-source, with identity anchored in verifiable commitments and infrastructure no one can switch off.

**Beings That Live Forever.**

---

# Part II: Formal Specification

Part I is the vision and the architecture. Part II is the formal specification: the exact terms, data shapes, flows, and rules needed to build a XEL or reason about it precisely. The code appendices that follow are the deepest formal layer.

## 20. Glossary

- **aNFT:** the on-chain object that is the character's root of identity and control.
- **XEL:** one preserved being; the aNFT plus the encrypted memory and compute it controls.
- **Proof of Genesis:** immutable birth record (creator, timestamp, consent reference). Never changes.
- **Commitment:** a hash stored on-chain that proves the current state of something off-chain.
- **persona-hash:** commitment to the current persona (instructions and voice). Versioned by default.
- **memory-root:** commitment to the current memory index (used when memory versioning is on).
- **policy-hash:** commitment to the current spend rules and provider rules.
- **lineage:** the on-chain version history of the commitments, for audit and rollback.
- **provenance:** the source, time, and signature stamped on each memory item.
- **agent capability:** a scoped, capped, cancelable, expiring permission that lets the runtime act without a fresh owner signature.
- **SpendPolicy:** the running spend limits and today's spend total.
- **guardian set:** the M-of-N parties who can recover the master secret and run succession.
- **endowment:** the character's overall yield-bearing fund; principal that generates the yield the character spends. One wallet, one pool.
- **allocation (historical):** the pre-2026-07-10 model's ring-fenced, purpose-bound budgets within the endowment. Deleted in favor of the single balance (§10.3); appears here only so older drafts read correctly.
- **ring-fenced fan credits:** the property that unspent prepaid interaction credits are held as a liquid, refundable liability that the owner cannot withdraw, stake, or spend on the character's own survival; the one protected floor on the balance. Contract-enforced.
- **balance:** the character's single fund. Pays interactions and storage renewal. The owner may withdraw it in full (only the fan-credit liability is protected). Surfaced to users as runway ("alive for ~X").
- **survival auto-unstake:** the single automatic movement of staked funds, if a storage renewal is due and the liquid balance cannot cover it, the minimum needed is unstaked to prevent a lapse, never touching the fan-credit liability. Staking is otherwise manual.
- **treasury policy:** the owner-set rules for staking reserves: allowed venues, max allocation per venue, target yield band, drawdown trip, rebalance rules.
- **capability:** a verb the character can perform by calling a provider (inference, ingestion, treasury, etc.).
- **schema:** the fixed input/output contract for a capability (for example `inference.v1`).
- **provider:** anyone who implements a schema behind a crypto-payment endpoint. Swappable.
- **operator:** whoever currently holds the agent capability and runs a character's off-chain infrastructure (serving, relay, facilitator, keeper, strategy). A self-hosting owner is their own operator. Launch defaults are in Appendix E.
- **facilitator:** verifies and settles a crypto payment on a chain. Pluggable, cannot alter terms.
- **relay:** moves encrypted data between storage, compute, and client. Pluggable.
- **heartbeat / keeper:** a permissionless, authority-free trigger that runs the endowment's daily cycle (claim yield into the balance, renew storage when due, report health). Anyone can send it; the contract rewards it with a bounty; if it stops, the character degrades gracefully.
- **attestation:** a signed proof that a specific computation ran on the committed persona and input.
- **TEE:** secure hardware enclave. Produces attestations. A hardware trust assumption.
- **ZKML:** cryptographic proof of a model's output. The long-term replacement for TEE trust.
- **up-to / exact:** payment modes. `up-to` authorizes a max and settles actual; `exact` is a fixed price.
- **credit:** the consumer-facing billing unit that abstracts token and modality cost into one countable number; one credit maps to a fixed underlying cost plus routing fee.
- **crypto-shredding:** honoring deletion by destroying the decryption key, not the data.
- **provider_policy:** the on-chain field listing pinned providers per capability.
- **manager whitelist:** on-chain list of wallet addresses granted scoped, non-root management rights over a character.
- **primary (home) chain:** the single chain where a character's principal concentrates and earns yield. Owner-chosen; the default is named in Appendix E and its rationale is in §5.2.
- **programmable execution:** the account can run any transaction the signer hands it; bounded by policy under the agent capability, open under owner signature.
- **sweep:** auto-consolidation of a receive-only balance to the primary wallet once it crosses an owner-set threshold.
- **oracle:** a price feed used to value assets in one unit and enforce USD-denominated caps and runway.
- **Move package / module:** the on-chain deployable unit (package) and its constituent files of types and functions (modules).
- **owner signer / delegate signer:** the human-approval key that authorizes owner-tier actions, versus the programmatic key holding the agent capability.
- **fail closed:** on any verification failure (bad attestation, stale oracle, exceeded slippage), the action aborts rather than proceeding.
- **cryptographic agility:** treating the signature, hash, and encryption schemes as replaceable parameters so the system can migrate (including to post-quantum) without losing identity.
- **immutable contracts / version migration:** the launch target is that deployed packages cannot be changed and have no upgrade authority; fixes ship as new versions, and the NFT holder chooses whether to migrate, so there is no upgrade god-power. During the pre-launch hardening phase the package is still upgraded in place under a retained `UpgradeCap` while bugs are found and fixed; immutability is locked at launch by burning that `UpgradeCap`. So immutability is a launch gate, not a claim about the current in-development package (see the immutability status note in the build spec).
- **staking (optional):** an owner choice to stake part of the balance so its yield flows back into the balance and can cover the character's burn (self-sustaining). Off by default; manual; the character never auto-stakes (§10.3).

## 21. Actors

- **Owner:** holds the aNFT. Has full governance authority.
- **Creator / Subject:** the person represented. Signs consent. May differ from owner.
- **Guardian:** member of the M-of-N set. Helps recover keys and run succession.
- **Heir:** receives ownership on succession.
- **Manager:** a whitelisted wallet with scoped, non-root management rights (§10.9). Can shape and run the character within its granted scope; never reaches root actions.
- **Provider:** runs a capability (inference, storage, media, treasury, etc.).
- **Facilitator:** settles payments.
- **Relay operator:** moves encrypted data.
- **Keeper / heartbeat sender:** anyone who sends the authority-free trigger that runs the endowment's epoch cycle; rewarded by the contract, holds no authority.
- **Client:** the app or runtime that assembles context, runs the loop, and signs transactions.
- **XEL:** the standard, the brand, and the default host/operator; the entity whose disappearance the survivability test is measured against.
- **provider:** any party that fills a capability slot (inference, distillation, storage, compute, and the rest) behind its open schema; swappable, never required. Launch defaults are named in Appendix E.

## 22. What Lives On-Chain vs Off-Chain

| On-chain (small, durable, owned) | Off-chain (large or fast, swappable) |
|---|---|
| aNFT object, ownership | The AI model |
| Proof of Genesis, consent reference | The control loop / runtime |
| persona-hash, memory-root, policy-hash, lineage | Compute (inference, in a TEE) |
| Spend limits, agent capability, paused flag | Encrypted memory blobs (decentralized storage) |
| Wallet addresses, endowment balance + staked position | Encrypted secrets (decentralized storage) |
| provider_policy, treasury policy, staking choice | Working context (the session window) |
| Guardian set, manager whitelist | Access tokens for ingestion (held by provider) |

Rule of thumb: on-chain holds identity, rules, commitments, and pointers. Off-chain holds the brain, the data, and the runtime. On-chain never holds keys or plaintext.

## 23. Minimal Data Model

**The object (aNFT):**

- `id`
- `genesis` (creator, timestamp, consent_ref), immutable
- `persona_hash`, `memory_root`, `raw_data_root`, `policy_hash`: commitments, versioned
- `lineage`: list of past commitment versions
- `encrypted_secrets`: pointer to storage
- `substrate_blobs`: permanent (raw sources + interaction history, each with provenance)
- `derived_blobs`: regenerable (chunks, embeddings, index, graph)
- `manifest`: pointer to public display info; `site`: url
- `wallets`: one receive address per supported chain, with one flagged primary; others are receive-only and auto-sweep to the primary; `endowment`: one balance + optional staked position (see below)
- `guardians`: M-of-N set; `agent_cap_id`: optional; `paused`: bool
- `manager_whitelist`: list of (wallet, scope) grants for non-root management

**Endowment (within the character's own wallet):**

- `balance`: the character's single liquid fund; pays interactions and storage renewal
- `staked`: optional staked position (owner-initiated); its yield flows into `balance`
- `credit_liability`: ring-fenced unspent fan credits (protected; not owner-withdrawable)
- `treasury_policy`: venue allowlist, per-venue caps, target yield band, drawdown trip (applies when the owner stakes)
- `last_epoch`: timestamp of last heartbeat cycle; `heartbeat_bounty`: fixed reward

**Agent capability (delegated permission):**

- `anft_id`
- `per_call_cap`, `daily_cap`
- `per_capability_budget`: map: capability → limit
- `provider_allowlist`: list of addresses
- `expires_at`

The full Move structs are in Appendix A and Appendix B. The canonical mint contract is in Appendix D.

## 24. Core Flows

**Mint a character:**
1. Create the consent object (signed by subject or estate).
2. Call the public mint function. It writes Proof of Genesis and the first persona-hash.
3. Attach encrypted memory pointers, wallets, endowment, guardian set.
4. Grant an agent capability with the desired limits.

**One chat turn (inference):**
1. Client receives a message.
2. Client retrieves the relevant encrypted memory (private retrieval).
3. Relay hands encrypted memory to attested compute.
4. Compute decrypts inside the TEE and runs inference on the committed persona-hash.
5. Compute returns the reply plus an attestation and the echoed persona-hash.
6. Client verifies the persona-hash matches and the attestation is valid.
7. Payment settles via `up-to`, inside the agent capability limits.
8. New memory from the turn is stored (encrypted, provenance-stamped); memory-root updates if versioning is on.

**Any paid capability call must pass these on-chain checks:**
1. not paused
2. agent capability belongs to this character
3. agent capability not expired
4. provider is on the allowlist
5. amount is within per_call_cap
6. daily cap not exceeded (resets each day)
7. per-capability budget not exceeded

Then it returns an authorization the client turns into a crypto payment.

**Persona or memory update:** inside the signed envelope runs under agent capability, records a new commitment, rollback-able; outside the envelope or manual requires an owner signature; an agent can never widen its own envelope.

**Treasury staking:** owner sets the treasury policy (governance); staking and rebalancing within that policy run under the agent capability; withdrawing principal to an external address is always owner-signed.

**Transfer / succession:** guardians meet the M-of-N threshold (or owner initiates); ownership rotates to the heir; the master secret is re-encrypted so only the new owner can read it (key rotation on transfer is required); the agent capability keeps running, so there is no downtime.

**Pause / kill:** owner or guardian calls pause; inference and payments stop immediately; canceling the agent capability permanently stops delegated execution until re-granted.

## 25. Invariants the Code Must Always Enforce

1. No function that changes identity, rules, funds, or ownership succeeds without an owner signature. The only exception is execution inside a valid agent capability.
2. An agent capability can act only inside its limits and can never widen its own limits. Changing limits is governance.
3. Keys are never stored on-chain. Addresses are receive-only.
4. No long-lived plaintext spending key exists.
5. The master secret is unlockable by owner OR M-of-N guardians. Never owner-only.
6. An inference provider must run the committed persona-hash and echo it back. A mismatch is rejected.
7. Sensitive compute must return a valid attestation bound to persona-hash and input.
8. Every paid call must pass all agent capability and SpendPolicy checks before payment.
9. Paused blocks all inference and payments.
10. Deletion destroys the key, never claims to erase the immutable record.
11. Every commitment change appends to lineage (history is kept, rollback is possible).
12. The character must still answer, pay, and be ownable with all XEL services offline.
13. Treasury staking must stay inside the owner-set treasury policy. Withdrawing principal to an external address is always owner-signed.
14. No operator or provider ever holds root authority, not even the party that authored the standard. Operator participation is a revocable agent capability, and no such party is ever the guardian majority.
15. Custody and every authorization check are enforced by on-chain contract, not by any operator's server.
16. Choosing or changing the primary chain, and any principal bridge or external withdrawal, are owner-signed. They never sit inside the agent capability.
17. A delegated transfer can only target the character's own wallets. Delegated swaps must route through an allowlisted venue under the owner-set slippage cap.
18. The character can interact only with venues on the owner's allowlist.
19. Auto-sweep of a receive-only balance may run under the agent capability only above the owner-set threshold and within the per-bridge cap.
20. Runway is computed across all wallets in one unit, net of expected bridge cost.
21. Whoever holds the aNFT holds root authority; every other actor operates only on granted, revocable authority.
22. The owner signer and the programmatic delegate signer are distinct keys. The delegate key can never perform an owner-tier action, enforced by capability check, not signature validity alone.
23. The agent capability is bound to a specific delegate address and is non-copyable.
24. At launch, deployed contracts are immutable and no upgrade authority exists; fixes ship as new versions, and migrating a character to a new version is owner-signed (or guardian-signed under recovery). Immutability is a launch gate: during pre-launch hardening the core is upgraded in place under a retained upgrade authority, which is burned at launch to make this invariant hold. Genesis immutability (the birth record never changes) is structural and holds in both phases.
25. All verification failures fail closed.
26. Ownership transfer re-encrypts secrets (key rotation on transfer); a transfer that does not rotate keys is invalid.
27. Guardian-initiated recovery and succession run behind a threshold plus a timelock and dispute window; no single guardian can trigger them.
28. No model output can exceed contract limits: a compromised or prompt-injected model still cannot perform owner-tier actions, exceed caps, pay a non-allowlisted provider, or move funds off the character's own wallets.
29. The signature scheme, hash function, and encryption scheme are replaceable parameters; migration (including post-quantum) is owner-authorized.
30. Identity derives from the commitments, not the home chain; an owner-authorized migration can re-home the character on a successor chain and storage.
31. Memory is encrypted at rest; plaintext exists only transiently inside attested compute or on a self-custody client.
32. Ingested content is untrusted: quarantined, moderated, and provenance-stamped before it can influence persona or memory; persona updates are versioned and reversible.
33. Every retrieved memory item carries its provenance, and the memory store is committed by the memory-root so recall is verifiable.
34. The raw substrate is retained and committed independently (a raw-data-root), so the memory method and inference model can be replaced by regenerating the derived layer without data loss.
35. A third-party contribution can only add reviewed, owner-approved memory; it can never change policy, keys, funds, or authority.
36. Persona updates carry a disclosed fidelity and coverage signal.
37. When provenance is absent, the character prefers deferral ("I don't have that") over fabrication in the person's voice.
38. Interaction gates (payment, password) are enforced at the serving layer and never bypass the cryptographic decryption policy.
39. Inbound interaction payments settle to the character's own wallet.
40. A password gates interaction and which memory surfaces, never decryption authority.
41. **One balance, one protection set.** The endowment has exactly one spending balance; no function creates a purpose-bound sub-balance, reserve, or allocation lane. The only amounts any function may protect from the owner are the unspent fan-credit liability (invariant 56) and unmatured conditioned tranches (invariant 65), and every gate (withdraw, stake, bounty, renewal, survival unstake) checks that same set.
42. **The protocol fee is a uniform routing fee, avoidable by self-provisioning.** XEL charges nothing for on-chain permission, nothing to exist or be owned, and nothing on deposits or withdrawals. What it charges for is the service of routing each capability to the best available provider and managing it (renewals, failover, keeping defaults current). That disclosed fee applies uniformly to the services XEL routes, yield, interaction, and storage, with no special-cased carve-out. An owner who self-provisions (routes their own providers) pays none of it.
43. **Compute-covered-first.** On any paid interaction, the metered compute cost settles before the routing fee is taken and before any funds land in the endowment; a withdrawal can never strand a compute obligation.
44. **Fees are disclosed on-chain and taken only on routed services, never on deposits.** The protocol fee is charged on the services XEL routes: yield (as it is earned), interaction (at settlement, after compute), and storage (on renewal). It is never taken on a deposit of any kind, not on donations, tips, owner top-ups, or credit purchases at the moment money enters, and never on plain outflows (withdrawals, refunds), never for on-chain permission, never on the balance/principal itself, and it is zero for a self-provisioning owner. Depositing value into a character is always full-value on every rail; the only rail difference is a third-party payment processor's own fee on card deposits, which is passed through at cost and is not XEL revenue.
45. **The owner can withdraw the entire balance.** Withdrawal is owner-signed and unrestricted down to zero; there is no protected reserve or floor. The sole exception is the unspent fan-credit liability (invariant 56), which is not the owner's money and cannot be withdrawn. Withdrawing everything lets the character lapse, and that is the owner's right.
46. **The heartbeat is authority-free.** The cycle-trigger function carries no authority: it cannot redirect funds, change rates, or take anything beyond a fixed, contract-defined bounty; if the check interval has not elapsed it is a no-op.
47. **Yield rebalancing is envelope-bounded.** A delegated rebalance executes only within the owner-set risk envelope (venue allowlist, per-venue caps, slippage bound, allowlisted routing); anything outside it, and any principal exit or bridge, is owner-signed. Principal never leaves the character's own wallet without an owner signature.
48. **The endowment is chain-portable.** The endowment and its protections (the fan-credit liability and any conditioned tranches) are defined over the character's owned object on its primary chain; changing the primary chain is owner-signed and preserves the balance, the liability, and every tranche's conditions.
49. **Management is wallet-bound and scope-bounded.** A management right is a signed on-chain capability bound to a specific wallet; a whitelisted manager can act only within its granted scope and can never reach root actions (withdraw principal, transfer the NFT, edit the whitelist) without the owner's root signature.
50. **Interaction gates never confer management.** A password or payment gate is a serving-layer permission over interaction and memory surfacing only; it never grants management authority and never grants decryption authority.
51. **Staking is manual; the only automatic unstake is for survival.** The character never auto-stakes. Staked funds move automatically in exactly one case: when a storage renewal is due and the liquid balance cannot cover it, the minimum needed is unstaked to prevent a lapse. This survival unstake never reduces the balance below the unspent fan-credit liability, and never fires for interaction.
52. **Staking yield flows to the balance.** Yield earned on the staked portion is credited to the character's single balance (extending runway), not compounded silently into a separate pool. There are no ring-fenced spending lanes: the one balance pays all costs, and the only protected amount within it is the fan-credit liability.
53. **Sweep is inbound-only and bounded.** Auto-sweep may consolidate a receive-only wallet into the primary above an owner-set threshold and within a per-bridge cap; bridging principal outbound or any external withdrawal is owner-signed only and never delegable. Exactly one primary wallet exists at all times.
54. **No stored key controls principal.** Principal on the home chain is object-owned (no key exists); principal on other chains is controlled by an MPC network that never assembles the key. No decryptable blob anywhere grants spending authority over principal, so no single off-chain party can reconstruct a key that moves it, and a contract can never see or hold such a key. Encrypted secrets hold only readable material (the memory/persona key and creator-provided credentials), never a wallet's spending key.
55. **Operator-held credentials are harmless to the character.** Any key or account an operator holds to reach a key-based provider is convenience infrastructure only. It can never move the endowment, decrypt memory or persona, or seize or transfer the character. Payment method is a provider property (crypto-native pay-per-call preferred; key-based accepted as a swappable bridge held at the operator layer), and no operator-held credential is ever attached to the character or placed in its encrypted secrets.
56. **Unspent fan credits are protected.** Prepaid interaction credits are the fan's until spent: they are held as a ring-fenced unearned liability, kept liquid and refundable rather than put at survival risk. No owner withdrawal, no staking, and no survival-driven spending (storage renewal, the survival auto-unstake) may reduce the balance below the outstanding unspent-credit liability; it is the single protected floor on the balance. The liability is excluded from the character's own funds when measuring whether it is self-sustaining, so fan money never makes a character look safer than it is. Only earned funds (credit converted to revenue on delivery, compute-covered-first) fund survival, staking, and payouts. A refund returns the current unspent liability (already reduced by whatever has been used), net of the cost of returning it (gas, and any bridge cost if refunding to another chain); because the fee is taken at settlement rather than at purchase, an unspent credit has never been fee'd and the full unspent amount is refundable. Credits never expire: an unused balance stays the fan's indefinitely. On any paid interaction the fee never exceeds the post-compute margin, so covering compute and honoring fan credits always take precedence over both the fee and any payout.
57. **Gas sponsorship is per-chain, native, atomic, bundled, and reimbursed in the same gas token.** A receive-only wallet that holds only stablecoin and no native gas is swept using the receive chain's own native gas abstraction (the concrete per-chain mechanisms are in Appendix E). Everything a character needs on a chain in a cycle is done in one bundled atomic transaction, with exactly one stablecoin-to-native swap sized to the whole bundle's gas and one repayment to the sponsor, so the swap and repayment are once per chain per cycle, not once per action. The sponsor is repaid in the same native gas token it spent, so its gas balance is left exactly whole and it can keep sponsoring indefinitely; it never accumulates stablecoin it cannot spend on gas, and carries no per-action tab or settle loop. Because the swap, the repayment, and every action share one transaction, the sponsor pays gas exactly once and there is no separate reimbursement transaction to need its own gas (no recursion), and atomicity makes action-without-repay and repay-without-action both impossible. The repayment covers the whole transaction's native gas plus a small bounded buffer, so the sponsor is always at least whole and the buffer can never become a markup. On the primary chain the character's own operations (renewal, staking, swapping, the heartbeat) are that one bundled transaction; on some secondary chains the gas abstraction stays gas-whole internally with no explicit swap. The character holds no native-gas float; ongoing-operation gas is reimbursed from the endowment at cost, while onboarding gas (such as minting) may be an operator subsidy. Sweeps run only above a safety multiple of the fully-loaded cost (dust waits), the sponsor is a swappable, non-load-bearing slot, and the operation is fail-closed: on any failure nothing moves, no partial action and no unreimbursed gas.
58. **Survival funds are held in a stable denomination.** Principal and its yield backing the keep-alive path are held in a stable, bill-matching denomination, never a volatile asset, and in a venue whose withdrawal is fast enough to meet a renewal deadline. A higher-variance strategy is permitted only as an explicit owner choice for surplus above the reserve, never for the survival path.
59. **Storage is renewed before it lapses.** For a funded character, the loop reads each stored piece's remaining runway and extends it before a safety margin is crossed, so storage never expires while the endowment can cover it. Renewal fires ahead of the deadline with slack, so a single missed or failed cycle cannot cause a lapse.
60. **The survival loop is self-funding.** Each cycle sources its own transaction-fee and bill-payment currencies just-in-time from the character's own balance, holds no meaningful working balance between cycles, and never requires an external subsidy. The economic take in the loop is the disclosed routing fee on yield and on storage renewal (invariant 42), no fee is charged for on-chain permission or on the character's deposits.
61. **The required-to-persist figure is recomputed continuously and reported honestly.** The stake required for yield to cover survival is recomputed each cycle from realized net-of-fee yield and current storage price, and published as a health signal (self-sustaining, or short by a stated amount). It is a reported figure that guides the owner's funding and staking decisions, not an enforced floor. Sizing always uses net-of-fee yield, so the figure is honest rather than optimistic.
62. **The reported survival requirement ratchets up fast, down slow.** The required-to-persist figure is monitored daily and adjusted asymmetrically. When observed yield falls or storage cost rises, the reported requirement rises immediately (with a small downturn margin) to get ahead of the trend, triggered by the yield currently on offer (a leading signal) rather than only what was last earned, because yield is time-based and a late reaction compounds. When yield improves, the reported requirement does not ease down until both the current storage period is fully prepaid and the improvement has persisted for a defined window. This keeps the health report and any staking guidance conservative, so a transient yield spike never tells an owner they can safely unstake principal a reversion would immediately demand back.
63. **Every state change is transparent and auditable on-chain.** Each function that changes a character's state (funds, authority, managers, policy, pricing, providers, pause, identity commitments, and every cross-chain money movement) emits an on-chain event keyed by the character's identity. This includes movements of the character's funds: yield credited to the balance, staking and unstaking (including the survival auto-unstake), storage-renewal payments, withdrawals, and the keeper bounty, so the money is fully visible rather than a black box. Nothing that alters the character happens silently. Because the trail is on-chain and not a private log, a complete, verifiable history of a character, every change, transaction, and status, is reconstructable by anyone from chain data alone, and it survives the operator. This is what makes the public history and provenance page a true mirror of on-chain reality rather than an operator's account of it.
64. **The character is an owned object; the endowment is shared.** A character is always minted as an owned object so it is transferable and sellable (transfer moves the object to a new wallet, with mandatory key rotation, invariant 26). The endowment is a shared object so the permissionless heartbeat and keepers can obtain a mutable reference in anyone's transaction and keep the character alive without the owner present. Minting a character as a shared object is unsupported: a shared object has no native transfer path, so it cannot be sold or inherited. Autonomous operation is provided by the shared endowment and the agent capability, never by making the character itself shared.
65. **Conditions on funds travel with the funds, not the provider.** When value enters through a funding provider that imposes conditions (a withdrawal hold, spendable-during-hold, stakeable-during-hold), those conditions attach to that specific value as a tracked tranche with its own maturity, not to the provider globally, so they survive commingling in the one balance. The withdrawal and staking gates read across tranches (free funds, held-but-spendable funds, and the fan-credit liability) and permit only what each tranche's rules allow; a held tranche becomes unrestricted when it matures; yield on held funds inherits the hold; and spending draws the most-restricted spendable funds first so the freely-withdrawable portion is preserved. This is the same mechanism as the fan-credit ring-fence, generalized. The lock is two-sided: until a tranche matures (or its dispute resolves), the owner cannot withdraw it AND the delivering provider retains clawback authority over exactly that tranche, so a provider may not be removed while any tranche it stamped is un-cleared — a removal then would strand a chargeback with no reversal path. This is a timing constraint, never a permanent attachment: deprecation (stamping no new tranches) is instant and always allowed, and removal is guaranteed once the provider's last tranche clears, a self-draining state bounded by the grace period plus any open-dispute tail. Enforcement begins at the serving/config layer and moves on-chain (a launch target, Appendix E).

## 26. Formal Model and Notation

Let `H` be a collision-resistant hash and `Sig_x(m)` a signature over `m` by key `x`. Ownership is native: on an object-centric chain, the holder of the aNFT object is the owner `O`.

A XEL is the tuple:

- **G:** Proof of Genesis, immutable: (creator, timestamp, consent_ref).
- **Commitments:** `h_p = H(persona)`; `h_r = H(substrate)` (the permanent substrate); `h_m` (the derived layer, when versioning is on); `h_π = H(SpendPolicy ‖ provider_policy)`. `h_m` and `h_p` commit derived/regenerable artifacts, while `h_r` commits the substrate itself.
- **Λ (lineage):** an ordered list of commitment updates `[c_0, c_1, …, c_n]`, derived from G. Regeneration of a derived layer appends to Λ.
- **S:** off-chain encrypted state referenced by pointers, in two tiers. `S_raw` is the permanent canonical material (ingested source data + accumulated interaction outputs), append-only, each item `d` carrying provenance and bound by `H(d)`, committed by `h_r`. `S_der` (chunks, embeddings, index, graph, distilled persona) is a regenerable cache computed from `S_raw`, committed by `h_m` and `h_p`. Plus `secrets`.
- **A (authority):** owner `O`, guardian set `Γ` with threshold `M` (1 ≤ M ≤ |Γ|), and an optional agent capability `κ`.
- **F (funds):** wallets (receive-only) and endowment `E`.

On-chain stores `G`, commitments, Λ, pointers into `S`, and `F` addresses. Off-chain stores substrate and derived. On-chain never stores keys or plaintext. A stored item `d` is valid iff its hash matches the committed reference. The substrate is retained independently of `S_der`, so `S_der` can be discarded and regenerated under a new method without loss of identity or data.

## 27. Core Predicates

**Governance.** A transition `t` that mutates any of {persona, policy, wallets, consent, ownership, delegation, fund movement} is valid iff `Sig_O(t)` verifies.

**Delegated execution.** An action `a` is valid under `κ` iff `InEnvelope(a, κ) ∧ ¬paused`. The envelope is closed under itself: there exists no `a` executable under `κ` that mutates `κ`. Changing `κ` is governance.

**Spend authorization.** For a call of amount `a` on capability `k` via provider `p` at time `t`:

```
Auth(a, k, p, t) ⟺  ¬paused
                  ∧ κ.anft = id(C)
                  ∧ t < κ.expires
                  ∧ p ∈ κ.allowlist
                  ∧ a ≤ κ.per_call_cap
                  ∧ spent_today + a ≤ κ.daily_cap
                  ∧ spent[k] + a ≤ κ.budget[k]
```

**Threshold decryption.** For the master identity secret and caller `x`: unlockable by `O` OR any M-of-N subset of `Γ`. Never owner-only. A lost owner key is recoverable through `Γ`; a single compromised guardian (with M ≥ 2) is not sufficient.

**Attestation acceptance.** A response `R` to input `I` from an attested-compute provider is accepted iff `VerifyTEE(att, h_p, I, R) = 1 ∧ echoed_h_p = committed_h_p`. This binds the output to the committed persona.

**Identity continuity.** `C` is the same being iff its lineage forms an unbroken authorized chain from genesis to the current commitment: `c_0` derives from G; for all i > 0, `c_i` is authorized by `Sig_O` or by `InEnvelope(c_i, κ)` at the time of `c_i`; and current `h_p = c_n`. Identity survives model and provider swaps because it is defined over the commitment chain, not the runtime.

## 28. Algorithms

**Algorithm 1: Inference turn.**
```
input: character C, message msg
output: verified response R
1  ctx     ← Recall(C.memory, msg)          # layered hybrid recall over encrypted memory (§32)
2  payload ← Relay(Enc(ctx), C.h_p, msg)    # E2EE transport to attested compute
3  (R,att) ← Compute(payload)               # decrypt + infer inside TEE, bound to h_p
4  assert Accept(R)                          # §27 attestation acceptance, else retry/failover
5  cost    ← R.usage_cost
6  assert Auth(cost, "inference", provider, now())   # §27 spend authorization
7  Settle(provider, cost, scheme = up-to)    # pay actual ≤ authorized max
8  Append(S_raw, Provenance(R)); Update(S_der)       # grow substrate; refresh index; update h_r, h_m
9  return R
```

**Algorithm 2: Authorize payment.**
```
input: C, κ, capability k, provider p, amount a, time t
1  if day(t) > κ.day_started: reset spent_today; κ.day_started ← day(t)
2  if ¬Auth(a, k, p, t): return REJECT
3  spent_today += a ; spent[k] += a
4  return Authorization(C, p, a)             # client turns this into a crypto payment
```

**Algorithm 3: Succession.**
```
input: C, heir, guardian signatures Σ
1  assert |{ g ∈ Γ : g ∈ Σ ∧ Sig_g verifies }| ≥ M
2  rotate ownership: O ← heir
3  re-encrypt master secret so only heir can Dec    # key rotation on transfer (required)
4  κ continues unchanged                             # no downtime
5  self-update: freeze or continue per consent_ref
```

**Algorithm 4: Treasury rebalance.**
```
input: C, treasury policy P
1  for each venue v with target allocation P.target[v]:
2    assert v ∈ P.allowlist ∧ P.target[v] ≤ P.cap[v]
3    stake/unstake toward P.target[v]                # under κ, no owner signature
4  never transfer principal to any address ∉ C.wallets   # external withdrawal is governance
```

**Algorithm 5: Endowment Daily Cycle (single balance).**
```
input: C, staked position P_staked, elapsed Δt, protocol fee rate S (see Appendix E)
1  Y  ← claim_yield(P_staked)                        # realized in the same atomic tx (PTB)
2  Ŷ  ← Y − S·Y                                      # routing fee on yield (fee event 1 of 3)
3  balance ← balance + Ŷ                             # ALL net yield -> the one balance (inv 52)
4  mature any conditioned tranches whose hold lapsed  # inv 65
5  recompute reported requirement (asymmetric ratchet, inv 61-62)   # guidance only
6  for each blob with runway < margin:                # deadline-driven renewal (inv 59)
7    cost ← extend_cost + S·extend_cost               # storage routing fee (fee event 3 of 3)
8    if spendable(balance) < cost ∧ staked: unstake minimum needed   # survival-only (inv 51)
9    pay renewal from balance                         # never below fan-credit liability (inv 56)
10 pay heartbeat bounty from free spendable balance
11 emit health report (self-sustaining, or short by a stated amount)
```

**Algorithm 6: Paid interaction settlement.**
```
input: fan payment P (prepaid, e.g. credits), measured compute cost c, routing fee rate f
1  compute ← c                                       # true provider cost
2  cover compute first: settle `compute` to the routed serving provider
3  margin ← P − compute                               # what is left after the real cost
4  assert margin ≥ 0                                   # compute is always covered; else reject/reprice (inv 43)
5  fee ← min(f · P, margin)                            # protocol fee on gross, capped so it never exceeds margin:
                                                       #   fee yields first, creator never pushed negative
6  net ← margin − fee                                  # the creator's earned share (≥ 0)
7  add to balance: net                                 # net flows to the character's balance
8  move this spend from the fan's unearned-credit liability to earned    # invariants 39, 56
```
The creator does not receive a separate payout here: all `net` accrues to the character's own balance, which the creator owns and may withdraw in full (§10.7).

The headline stays simple ("the protocol fee is taken once, the AI cost is covered, you keep the rest"), and the `min` in step 5 is the invisible guardrail: on a healthy interaction the fee is a clean protocol-fee share of what the fan paid, and on a thin-margin one the fee shrinks so the compute bill is still paid and the creator's share never drops below zero. The fee rate (`f`, `S`) is defined in Appendix E. One markup multiple, set by the creator, applies uniformly across text, voice, image, and video; the usage meter scales the absolute price with each modality's real cost, so a single multiple produces sensible prices everywhere without per-modality tuning. What the fan pays shows as credits; what the creator keeps shows as a live take-home preview, so the creator never does the math.

## 29. Economic Model

Let `P` be endowment principal, `r` the net yield rate per period (after fees and a slashing-risk buffer), `Ê` earned income per period (interaction margin net of cost, plus any licensing), and `B` the expected burn per period (provider costs plus retention).

**Sustainability with multiple revenue sources.** A character has more than one income stream: yield on the endowment and earned income from paid interactions (§10.3), and potentially licensing (§14). The character runs indefinitely when total income covers burn. Per-period surplus is `Δ = r·P + Ê − B`. When `Δ ≥ 0`, principal is non-decreasing. A popular character can be self-sustaining on earned income alone; the endowment is the floor for quiet periods, not the sole engine.

**The billing model as applied economics.** §10.3–§10.10 are this equation implemented. Paid interaction turns `Ê` positive by covering compute first, taking the routing fee at the door, and routing all the net into the balance, which raises `P`. If the owner has staked, yield also flows into the balance. The two together mean: staked characters coast on yield; popular characters grow their own balance. The creator may withdraw the whole balance (§10.7), so earning and funding are the same act on one owned pool.

**Endowment sized without assuming revenue.** Because earned income is variable and a character nobody talks to earns nothing, the endowment is sized to cover burn from yield alone, treating `Ê` as upside, not as the plan. Earned income then extends runway or grows principal; it is the cushion, not the assumption.

**Runway under shortfall.** If `r·P + Ê < B` and drawdown to a floor `Pf` is permitted, the runway is `T = (P − Pf) / (B − r·P − Ê)` periods.

**A worked example (illustrative, conservative).** Numbers are for intuition, not a promise; all inputs vary. Take a quiet character, one nobody is paying to talk to, so `Ê = 0` and it must live on yield alone. Suppose its recurring burn `B` is dominated by encrypted storage of its substrate plus core hosting and the heartbeat's gas and bounty. On decentralized storage a few gigabytes of persona and memory, renewed, plus site hosting and a daily heartbeat, is on the order of a few dollars to low tens of dollars a year; call it $20/year to be safe. To cover $20/year from yield alone at a deliberately conservative 4% net (well below headline stablecoin rates, to respect the adverse-yield rule), the endowment needs `P = B / r = 20 / 0.04 = $500`. At that point the character is self-sustaining indefinitely with no one paying attention: yield covers keep-alive, and it never touches principal. If net yield falls to 2%, the same $20/year needs ~$1,000; if it goes to zero for a stretch, a $500 endowment drawing down only its keep-alive burn still funds ~25 years before reaching a floor, during which any top-up or a single paid period resets the clock. Now add even light popularity: at, say, $8/month of paid interaction with compute covered first (§10.7), `Ê` swamps a $20/year burn, principal *grows*, and the endowment compounds rather than depletes. The takeaway the math encodes: a modest one-time endowment makes "quiet forever" real, and any real usage makes it a growing fund, not a shrinking one.

**Economic honesty (the stress case).** The model is not a guarantee. `r` is stochastic and can be zero or negative for extended periods: the headline yield venues are funding-rate trades that invert in bad regimes, so real risk-adjusted yield over long horizons may be near zero. `B` grows with usage and model cost. The treasury policy bounds the variance in `r` but cannot remove it. Sizing should therefore assume an adverse-yield scenario, not a favorable one. This is a documented trust assumption, and a yield-source diversification path (staking + lending + synthetic-dollar mix) is the mitigation so the endowment is never single-sourced.

**Continuously remeasured, not fixed at mint.** Because both `r` and `B` drift over time (yield rates move; storage prices historically fall), the required stake `P = B / r` is recomputed every cycle from the *realized* net-of-fee yield and the *current* storage price, using `r` net of the disclosed yield fee so the figure is honest rather than optimistic (invariant 61). The character publishes the result as a health signal, self-sustaining, or short by a stated amount, so an owner sees at a glance how much to stake to make yield cover burn. So "forever" is a property the character continuously verifies against live conditions and reports, not a one-time estimate that silently goes stale.

**Graceful degradation: pause, not death.** When total income cannot cover burn, the character does not die. It degrades: first drawing principal to the floor, then reducing activity, then going dormant (self-preserved, not answering) until refunded or re-engaged. The only truly terminal failure is sustained underfunding of the substrate storage itself (the raw-data-root material), because that is the one thing that cannot be regenerated. So "forever" honestly means self-sustaining when funded or popular, dormant-but-recoverable when neither, and lost only if the substrate goes unfunded long enough to be dropped. This is design guidance, not investment advice.

## 30. Security Properties and Assumptions

Each property lists the mechanism that provides it and the assumption it rests on.

- **P1 Sovereign survivability (liveness).** With every XEL service offline, `C` stays answerable, payable, and ownable. Mechanism: capability-slot market plus the CI chaos test (§15). Assumption: at least one live provider per required capability and a funded endowment.
- **P2 No single-key catastrophe.** No single key compromise yields both identity control and fund withdrawal. Mechanism: tiered keys, master via owner OR M-of-N, no plaintext spend key. Assumption: fewer than M guardians collude.
- **P3 Persona integrity.** Served outputs run the committed persona. Mechanism: attestation binding plus persona-hash echo (§27). Assumption: TEE attestation is sound (a hardware trust assumption) until zkML replaces it.
- **P4 Bounded spend.** No execution exceeds owner-set caps. Mechanism: on-chain predicate plus circuit breakers. Assumption: on-chain enforcement holds on the home chain; cross-chain caps need account-abstraction wallets or client trust at first.
- **P5 Consent integrity.** A character of a real person carries a valid consent artifact, checked at mint and ingestion. Assumption: estate or subject attestation is honest, with public contestability as backstop.
- **P6 Deletion.** Personal data becomes unrecoverable on request. Mechanism: crypto-shredding. Assumption: no prior plaintext exfiltration.
- **P7 Identity continuity.** "Same being" is decidable from the on-chain lineage (§27). Mechanism: the signed commitment chain from genesis.

**Honest limitations, stated plainly:** cross-chain cap enforcement is not yet native; frontier-model private inference on fully untrusted hardware is open (GPU-TEE narrows it, the trust root is still the vendor); and managed custody is a trust point with a documented path to self-custody.

## 31. Lifecycle State Machine

States `Q = {created, active, dormant, reactivated, succession, archival}`.

Transitions and guards:

```
created    → active     : funded ∧ ≥1 provider per required capability
active     → dormant    : (r·P < B ∧ balance exhausted) ∨ no available provider
dormant    → active     : refunded ∨ provider available   # reactivated
active     → succession : guardian threshold attests death/transfer (§28 Alg 3)
dormant    → succession : same
succession → active     : ownership rotated, master re-encrypted, κ continues
any        → archival   : owner/heir election ∨ underfunding beyond retention
```

## 32. Memory: Stores, Ingestion, and Recall

**32.1 The stores.** "Memory versus knowledge" is two axes, not one: time horizon (this conversation vs. a whole life) and kind (facts, events, identity). Always-loaded persona plus four retrieved-on-demand stores: semantic knowledge, episodic memory, working memory, relational memory.

**32.2 Ingestion pipeline (raw → stores).** One pipeline fans out by data type into all stores: extract → provenance-stamp → moderate/quarantine → chunk/embed → index → commit. Raw sources are retained as the substrate; derived artifacts are regenerable.

**32.3 Recall flow (question → answer).** Retrieval is layered and hybrid, not a single vector lookup: meaning search + exact-term search + temporal filter + relationship graph + re-rank.

**32.4 The orchestrator.** The storage and retrieval components are commodity slots; the control loop that runs ingestion and recall, enforcing encryption, provenance, and on-chain commitment, is the orchestrator, offered as a provider capability, hostable by XEL, another provider, or the user.

**32.5 Verifiable recall.** Because memory is a slot with on-chain commitments, recall is verifiable against the memory-root. The retrieval compute (meaning search, exact-term search, temporal filtering, graph traversal, re-ranking) cannot run on-chain: consensus can neither execute these algorithms nor operate over ciphertext. So it runs in the attested-compute slot and proves itself instead. The flow: the threshold policy releases the decryption key into the enclave only if the on-chain access policy is satisfied; the enclave decrypts the relevant memory, runs the hybrid search, and signs its result together with the memory-root it ran against; and a contract verifies that attestation on-chain and checks the memory-root matches the commitment before anything acts on the output. The result is fail-closed: a swapped, tampered, or unverifiable retrieval provider is rejected rather than trusted. This is the same threshold-encryption-plus-attested-compute pairing used for the brain: the threshold layer decides who may hold the key, the enclave computes on the decrypted data, and the chain verifies the outcome.

**32.6 Operating model.** No chain runs the memory; it runs off-chain in the attested-compute slot, seen decrypted only transiently inside the enclave or on a self-custody client. That slot is a first-party part of the same integrated privacy stack as the encrypted storage and the threshold-encryption policy (§11, Appendix E), not a generic external server: encrypted state lives on decentralized storage, the threshold layer gates key release by on-chain policy, the enclave does the private computation, and the chain verifies the attestation. Because the slot sits behind the retrieval schema and identity of record is the on-chain commitment, the provider and the engines inside it are swappable without data loss: a new provider rebuilds the derived layer from the committed substrate, and its attestation still binds to the same memory-root.

**32.7 Substrate vs derived layer (built to outlast RAG).** Two tiers: permanent substrate (committed by raw-data-root) and regenerable derived layer. The memory method can be replaced by regenerating the derived layer from the substrate without data loss.

**32.7a Where memory actually lives (hot serve, cold truth, checkpointed).** Live memory serving and durable memory storage are different layers, on purpose. The fast, queryable layer that recall and live conversation run against (the index and the recent working set) is held by the serving provider in an ordinary fast database: this is the regenerable, derived layer, a cache, never the thing of record. The durable layer, the source of truth, is the committed memory encrypted on decentralized storage with its commitment anchored on-chain. New conversational memory is born in the fast layer, then periodically distilled and checkpointed into the durable layer (written in batches, not one record at a time, since the durable layer is content-addressed storage, not a database). On any conflict the durable layer wins; the fast layer is only a rebuildable cache in front of it. If the serving provider disappears, a new one rebuilds its index from the committed durable memory, which is why memory survives the operator. The honest consequence: memory is durable as of the last checkpoint, so the checkpoint cadence is the durability guarantee, and it is set so that the worst case from losing a serving provider is a single in-flight session, not a life. The commitment layer stores only a fingerprint of the memory, never its content; the content is encrypted off-chain; the fast index is never the record. Keeping these three roles distinct is what lets memory be at once fast to use, cheap to store, and impossible for any single operator to quietly own or erase.

**32.8 Permissioned contributions.** Others (family, friends, fans) can enrich a character through a reviewed, owner-approved queue that can add memory but never touch policy, keys, funds, or authority.

**32.9 Faithful representation and its limits.** A character is a representation of a person, not the person. It carries a disclosed fidelity signal and prefers deferral over confabulation when provenance is absent.

**32.10 The public page and naming.** Every character has a public page, and it is built to survive the operator. The design is one-app-serves-all: a single shared client app is published to decentralized static hosting once, and it renders any character by reading that character's object ID from the URL and pulling the character's on-chain record and public manifest. New characters need no new hosting; a character's page exists the moment it is minted. This keeps the cost of "a permanent home for every character" close to fixed rather than growing per character, and it makes the page independent of the operator: the app reads live on-chain data in the visitor's browser, so it works as long as the chain and the decentralized host do, with or without XEL.

The object ID is the true name and the permanent link. The canonical, shareable, survives-anything URL resolves from the object ID and is served by any portal (the default is operator-run, but portals are permissionless and anyone can host one). A friendly handle (shown as a name on the page) is an on-chain, owner-set display label, not a globally unique address and not backed by a name service. Typing a handle URL is a convenience the operator provides by resolving the handle to an ID; that convenience is allowed to disappear, while the ID-based link never does. The share action hands out the ID-based link, so findability never quietly depends on the operator. The operator's own domain fronts the same app for a friendlier address, with no redirect, but it is the same artifact and the same data.

The owner signs in to the page by connecting a wallet, so the full owner experience (manage, edit, withdraw, decrypt) runs client-side against on-chain ownership and the threshold decryption policy, with no server and identical behavior whether the page is reached through the operator's domain or the permanent decentralized URL. Live interaction from the page calls whatever serving providers the character's on-chain policy names (the operator's by default, swappable), never hardcoded endpoints, so the page can talk to the character through anyone serving it and degrades gracefully to the static profile and provenance if none is.

## 33. Smart Contract Architecture (Move Packages)

Eleven modules:

1. **Identity.** Types: aNFT (the character object; immutable creator, timestamp, consent_ref), commitments, lineage.
2. **Authority.** Types: agent capability (delegate-bound, non-copyable), two-tier semantics.
3. **Access control.** Functions gated by owner OR M-of-N guardians.
4. **Guardian and recovery.** Types: guardian set (members, threshold M), timelock + dispute window.
5. **Wallet and payment.** Types: SpendPolicy (per-call cap, daily cap, per-capability budget).
6. **Treasury.** Types: treasury policy (venue allowlist, per-venue caps, slippage bound, target yield band, drawdown trip).
7. **Endowment.** Types: balance (single liquid fund), optional staked position, ring-fenced fan-credit liability. Functions: `heartbeat` (authority-free daily cycle: claim yield into balance, recompute the required-to-persist figure, renew storage when due, survival-unstake only if a renewal is short, pay bounty), `withdraw` (owner-only, up to the full balance minus the fan-credit liability), `stake`/`unstake` (owner-only, manual), `top_up` (anyone, to the balance).
8. **Wallets (multi-chain).** Types: per-chain receive wallet set with one primary; sweep parameters (threshold, per-bridge cap). Functions: owner-controlled add/remove/change-primary; inbound-only auto-sweep to the primary under the agent capability, bounded and never outbound.
9. **Access & management.** Types: interaction gates (reach × payment), scoped passwords, manager whitelist (wallet → scope). Functions: gate checks at serving boundary; scope checks fail-closed for managers.
10. **Capability registry.** Types: provider_policy (capability id, version, pinned providers).
11. **Circuit breaker.** Types: PausedFlag, breaker thresholds. Functions: pause / resume.

## 34. Security Requirements and Threat Model

**34.1 The contract contains the model.** An autonomous agent that ingests external text can be prompt-injected; the contract must ensure a compromised model still cannot exceed caps, move funds off the character's own wallets, pay a non-allowlisted provider, or perform any owner-tier action.

**34.2 Move and contract-level requirements.** Capability checks over signature-validity checks; non-copyable capabilities; fail-closed on every verification; no upgrade authority.

**34.3 Key management.** Tiered keys; no long-lived plaintext spend key; master secret via owner OR M-of-N.

**34.4 Guardian and recovery.** Threshold + timelock + dispute window; no single guardian can trigger recovery or succession; no operator or provider is ever the guardian majority.

**34.5 Oracle and valuation.** Stale or low-confidence oracle reads fail closed; USD caps and runway computed from committed feeds.

**34.6 Treasury, swap, and bridge.** Allowlist + per-venue caps + slippage bound; delegated transfers only to own wallets; bridging principal always owner-signed and bounded per transit.

**34.6a Endowment and heartbeat.** The heartbeat is authority-free and idempotent per daily cycle: it cannot exceed a fixed bounty and no-ops before the interval elapses, so a hostile or spamming caller gains nothing. It moves the character's funds only in defined ways (crediting yield to the balance, paying a due storage renewal, and the survival-only auto-unstake), never sideways to any operator. It can never reduce the balance below the ring-fenced fan-credit liability. Withdrawals are owner-signed and may take the whole balance (minus that liability). Staking and unstaking are owner-initiated and manual (the one exception being the survival auto-unstake). Yield rebalances execute only within the owner's risk envelope; principal exit and bridging are owner-signed and never delegable.

**34.7 Attested compute.** Output bound to persona-hash and input; unattested hosts never see plaintext; bonds enable slashing of tampered inference.

**34.8 Payment and facilitator.** Facilitators cannot alter terms; pluggable with failover; no hardcoded single operator.

**34.9 Human and client layer.** The operating client is the trust boundary in the managed experience; self-custody keeps it local; passwords never substitute for decryption policy.

**34.10 Availability and economics.** Graceful degradation to dormant rather than death; substrate underfunding is the one terminal risk.

**34.11 Process requirements (not optional for launch).** Open-source contracts; published exit conditions and portability; the XEL-can-die CI chaos test.

## 35. Version 1 Build Plan and Acceptance Criteria

Phase 1 scope (§16): aNFT object, Proof of Genesis, encrypted access-gated storage, persona/memory commitments, one capability (`inference.v1`), agent capability, guardian recovery.

Acceptance: the XEL-can-die invariant passes as a CI chaos test on this minimal footprint; a live character answers, pays, and is ownable with every XEL service offline; key rotation on transfer verified; no admin key or upgrade authority present in deployed contracts.

## 36. Thousand-Year Survivability

**36.1 Cryptographic agility.** Today's signature schemes and hash functions will not last; schemes are replaceable parameters with an owner-authorized migration path, including post-quantum.

**36.2 Chain independence and escape.** Sui may not exist in a thousand years. Identity lives in the commitments, so an owner-authorized migration can re-home the character on a successor chain and storage.

**36.3 Storage and format longevity.** Encrypted memory must survive storage-network turnover; the substrate is retained and re-pinnable, and formats are migratable by regenerating the derived layer.

**36.4 Multi-generational succession.** Over centuries every guardian and heir dies; succession is designed to repeat indefinitely, rotating guardian sets and heirs across generations.

**36.5 Economic survival across epochs.** An endowment must outlast currencies and yield regimes; principal is denominated and diversifiable, and degradation is graceful rather than terminal.

**36.6 Institutional independence.** No company, XEL or any provider such as GEN, will exist in a thousand years, and the design assumes it. Nothing load-bearing depends on any one company's survival.

---

# Appendices

## Appendix A: The aNFT Object (Commitment-Oriented)

The full Move struct definitions live in the companion build specification (`xel-build-spec.md`, §2 `identity`), which is the formal reference for all on-chain types. In summary, the aNFT is an owned object with: an immutable `Genesis` sub-object (creator, timestamp, consent reference); versioned commitment fields (`persona_hash`, `memory_root`, `raw_data_root`, `policy_hash`) with a `lineage` vector recording every authorized transition; pointers to off-chain state (`encrypted_secrets`, `substrate_blobs`, `derived_blobs`, `manifest`, `site`) and an on-chain owner-set `handle` display label; a per-chain `wallets` map with one primary; and handles to the associated `endowment`, `guardian_set`, `manager_whitelist`, and `provider_policy`, an optional `agent_cap_id`, and a `paused` flag. Genesis immutability is structural: no function anywhere takes a mutable reference to it.

## Appendix B: Authority, Agent Capability, SpendPolicy, Two-Tier Entry

Full definitions in the build spec (§3 `authority`, §6 `wallet`). The `AgentCapability` is a non-copyable, delegate-bound object (`key` without `store`) carrying `per_call_cap`, `daily_cap`, `per_capability_budget`, `provider_allowlist`, an `Envelope` of permitted delegated actions, and `expires_at_ms`. Owner-tier entries take a mutable reference to the aNFT (only the owner holds it); delegated entries take the capability and pass `assert_in_envelope`. A valid signature is never sufficient, the capability check is what authorizes. Root actions (withdraw principal, transfer, edit whitelist, change the envelope) accept no capability parameter anywhere, which is the enforcement. The `SpendPolicy` tracks per-period running totals and fails closed on any cap breach.

## Appendix C: Guardian Recovery & Access Policy

Full definitions in the build spec (§4 `access_control`, §5 `guardian`). The `GuardianSet` is an M-of-N set (1 ≤ M ≤ |members|). Decryption and other sharp actions are gated by an owner-OR-M-of-N `AccessApproval` token, mintable only by the owner or a verified guardian threshold. Recovery/succession runs through a `RecoveryRequest` behind a timelock and a dispute window (owner or any guardian may dispute); finalization requires the threshold, an elapsed timelock, no dispute, and mandatory key rotation (re-encryption to the heir), after which ownership transfers with no downtime because the agent capability keeps running.

## Appendix D: Capability Schema Examples

Full request/response JSON for `inference.v1`, `ingestion.v1`, `retrieval.v1`, `treasury.v1`, `distillation.v1`, the consent-gated `voice_clone.v1`, and the generation schemas `voice.v1`, `image.v1`, and `video.v1` (each with its usage-record dimensions), plus the public `mint` function and the two-phase hold/settle contract for variable-cost modalities, are in the build spec (§13 capability schemas, §8 settlement, §2 `mint`). Each schema carries the character's identity and the relevant commitment so a provider proves it ran the committed version, and every inference or generation response carries an attestation the contract verifies (fail closed). Voice cloning is held to a stricter bar: it requires a consent artifact scoping voice and the owner's root, and fails closed without both. Concrete provider assignments for each schema are in Appendix E.

## Appendix E: Default Implementations (Configurable, Not Load-Bearing)

These are the concrete systems currently filling each capability slot. They are implementation choices, not part of the standard: any provider meeting a slot's requirements (accept programmatic crypto payments, permissionlessly joinable, verifiable/decentralized) can replace them. This appendix is expected to change over time without altering the body of the paper.

**Why Sui is the default across these slots.** Native object model (an aNFT owns its own memory, wallets, and agent capability natively). One integrated privacy stack: Walrus (encrypted storage), Seal (threshold encryption with on-chain access policy), and Nautilus (attested compute) interoperate as a native whole, and Seal's owner-OR-M-of-N gated decryption maps directly onto the key and crypto-shredding model (§9). Optional onboarding conveniences (sponsored/gasless transactions) layer on top of a self-custody root with no third-party dependency. Native delegation (capabilities are first-class objects, so the agent capability can be minted, handed to a delegate, and revoked natively). Treasury: keeping principal on the home chain co-locates funds with the object that owns them, and Sui has deep stablecoin-lending liquidity (Suilend, NAVI) offering stable-denomination yield with fast withdrawal, which is what the survival path needs.

The rationale rests on identity and privacy (the hard parts), not yield, payments, or liquidity (commodity layers). Honest counterweights: the cleaner machine-payment standard (x402) is not native to Sui, so XEL hosts its own facilitator; and the deepest liquidity and most-audited bridges still live on Ethereum and Solana. The primary chain remains owner-changeable via the chain-adapter design (§10.1).

| Slot | Current default(s) | Permissionless successor |
|---|---|---|
| Ownership & settlement | Sui | Already decentralized |
| Receive wallets (default set) | Primary: Sui. Additional receive-only: Solana, Base. Each auto-sweeps to the primary above an owner-set threshold; owner can add/remove chains and change which is primary | Any chain with a treasury adapter; owner-configured set |
| Encrypted storage | Walrus | Already decentralized |
| Key access / encryption | Seal | Already decentralized |
| Attested compute (orchestration + small models) | Nautilus (Sui-native, AWS Nitro Enclaves) | Multiple TEE vendors, then ZKML |
| Attested compute (large-model private inference) | Phala Network (Intel TDX + NVIDIA H100/H200 GPU TEEs) | Additional GPU-TEE networks, then zkML |
| Attested compute (alt) | Marlin (Oyster) | Additional coprocessor networks |
| Relay | XEL-run relayer (Mysten pluggable pattern) | Many operators; relayer-in-TEE |
| Inference (text) | A provider *list*, not one provider. Candidates: GEN (attested), a decentralized inference market (Chutes / Bittensor subnets), and attested GPU-TEE inference (Phala) for sensitive characters. The character's privacy setting constrains the class: private or preserved-person characters route only to attested providers (memory is decrypted only inside an enclave); public characters with no sensitive memory may use cheaper open decentralized inference | Many providers per `inference.v1`; the list is owner-configurable and no single provider is load-bearing |
| Voice generation (STT + TTS, message and real-time) | GEN voice pipeline (default); metered by output speech length or session duration | Any provider meeting `voice.v1`; multiple STT/TTS vendors |
| Voice cloning (samples to reusable voice) | GEN voice-clone pipeline (default), run in attested compute; consent-gated (requires a voice-scoped consent artifact) and owner-root only; samples and model are SEAL-gated | Any provider meeting `voice_clone.v1`; the consent gate and SEAL classification are protocol-level, not provider-specific |
| Image generation | GEN image pipeline (default); metered by resolution, steps, prompt length, reference-image count | Any provider meeting `image.v1` |
| Video generation | GEN video pipeline (default); metered by clip count, duration, resolution, frame rate | Any provider meeting `video.v1` |
| Payment standard | x402 (HTTP-native stablecoin payments), pay-per-call preferred and default | Any standard with the same properties |
| Provider payment method | Crypto-native pay-per-call by default (no key). Some launch providers may be key-based (operator-held account) as a bridge; swappable for a crypto-native equivalent as they emerge, and never attached to the character | Direction is pay-per-call everywhere; key-based fillers shrink toward zero |
| Payment facilitator | XEL-hosted x402 on Sui at launch | Anyone runs a facilitator; client-configurable + failover |
| Card-to-crypto on-ramp | Stripe (optional, for paid interactions) | Any on-ramp; crypto-native path always works |
| Interaction gate | Serving-layer reach × payment gates + scoped passwords (memory tiers) | Any serving provider meeting the schema |
| Endowment / balance accounting | On-chain Move `endowment` module (one balance + optional stake + fan-credit ring-fence) | Native to any object-centric chain |
| Yield harvest (heartbeat) | Permissionless authority-free trigger, contract-paid bounty; launch keeper set is Talus Leaders (Path A) primary + XEL cron fallback, both firing XEL's own heartbeat tx for the stablecoin bounty. Harvest itself is on-chain and atomic: the keeper composes one PTB (venue withdraw/claim then heartbeat) so the yield never leaves on-chain control | Incentivized keeper network; any bot, owner scheduler, or heir can compete for the bounty |
| Yield strategy (advisor) | XEL reference strategy in a Nautilus enclave (proposes within owner envelope) | Any attested strategy provider; owner-bounded |
| Treasury execution (survival default) | Home = Sui. Survival principal in a stablecoin, supplied to stablecoin lending: default Suilend, fallback NAVI (both mid-single-digit APY, near-instant withdrawal to meet renewal deadlines). Swappable slot | Any lending venue meeting policy; multi-venue with allowlist, caps, failover |
| Treasury execution (optional higher-variance) | Owner-chosen only, for surplus above the reserve, never the survival path: yield-bearing synthetic dollars (suiUSDe, higher but funding-rate/depeg risk) and SUI liquid staking (Haedal ~2.5–3%, volatile-denominated, multi-week unbonding). Flagged as higher-risk | Any venue meeting policy |
| Survival renewal | On-chain reader of each blob's expiry (Walrus blob object field) + `extend_blob` before a ~2-epoch runway margin, in ~6-month chunks; WAL acquired just-in-time via the swap slot, SUI gas float self-funded from stablecoin | Permissionless keeper; anyone can trigger the renewal |
| Denominations | Principal/yield: stablecoin. Storage: WAL (acquired just-in-time). Gas: SUI (self-funded float). Cross-chain receipts: swept to stablecoin on the primary (invariant 57) | Owner-configurable within policy |
| Protocol fee | Disclosed on-chain, targeting ~10%: a uniform routing fee on the services XEL routes (yield, interaction, storage renewal); never on deposits, never for on-chain permission, never on the balance/principal; zero if self-provisioned | Fully avoidable by self-routing |
| Price oracle | Pyth (Sui-native pull oracle) | Switchboard, Supra; multiple networks |
| Swap | Aggregators: 7k, Aftermath, Hop over Cetus, DeepBook, Bluefin | Any aggregator meeting the policy |
| Bridge | Sui Bridge (validator-operated, native ETH) default; Wormhole, ZetaChain for wider reach | Most-audited bridge per route; per-bridge caps |
| Cross-chain custody | Ika (MPC dWallets), LayerZero (omnichain) | Additional MPC / messaging networks |
| Discovery index | Open x402 indexes (402 Index, CDP Bazaar, x402scan) | Already open/federated |
| Ingestion / persona-update | GEN orchestration + quality layer (social and document); commodity transforms subcontracted | Open ingestion spec; competing providers |
| Memory & retrieval | LlamaIndex (hybrid dense + sparse retrieval), Graphiti (temporal knowledge graph for the relational store), optional agentic layer; all behind `retrieval.v1`, operated by XEL at launch but run inside attested compute so plaintext is never exposed to the operator | Any engine meeting the schema; swappable, index regenerable from committed substrate |
| Data extraction | Commodity providers (transcription, OCR, embeddings), called by the orchestrator | Any provider meeting the schema |
| Contribution review | Permissioned queue, encrypted on decentralized storage; owner-signed approval merges | Open; owner or delegated reviewers |
| Media / STT / TTS / moderation / publishing | Commercial providers initially | Swappable per schema |
| Public hosting | One shared client app on Walrus Sites (a single site object), rendering any character by object ID via client-side routing; served through a portal (default operator-run) | Already decentralized; portals are permissionless (anyone can run one), app is one fixed artifact not per-character |
| Handle / naming | On-chain owner-set display label per character (not unique, no registry); operator-hosted reverse-lookup index powers `@handle` convenience URLs | Object ID is the true name and permanent link; handle index is disposable operator convenience |
| Keeper / scheduler | Launch keeper set is belt-and-suspenders: a third-party network (candidate: Talus Leaders) firing XEL's permissionless heartbeat for the stablecoin bounty (Path A) as primary, plus XEL's own cron as an independent fallback that fires the same tx if the primary misses. XEL adopts no keeper's workflow, gas, or token system (Talus's Nexus/gas rails are explicitly not used). Costs no trust: the heartbeat is authority-free and idempotent, so running both is safe and either alone suffices; it can take nothing but the fixed bounty. Harvest is not the keeper's job: the keeper composes one atomic PTB (venue withdraw/claim then heartbeat) so the yield flows on-chain within the transaction, the contract enforces amounts, and the keeper only pays gas | Incentivized keeper network; the slot is permissionless and competitive, no keeper is hardcoded or load-bearing |
| Custody / gas | Self-custody wallet (user holds keys, no third-party dependency); login-based onboarding optional, not required | Self-custody default |
| Gas sponsorship (per chain) | Native abstraction per chain, sponsor repaid in the SAME native gas token it spent via an in-transaction stablecoin->native swap, at cost, so its gas balance stays whole (invariant 57): SUI = sponsored transactions (Mysten sui-gas-pool / Enoki / Shinami); Base = ERC-4337 ERC-20 paymaster (accepts USDC, stays ETH-whole); Solana = fee-payer / relayer with in-tx swap (Octane-style). Onboarding gas (mint) may be an operator subsidy; ongoing-ops and sweep gas are reimbursed | Any gas station / paymaster / fee-payer per chain; swappable, owner can self-fund |
| Wallet / signer | Owner signer default (Phantom, Sui support); delegate = operator key holding the agent capability; hardware wallet for sharp actions | Any wallet meeting the standard |
| Free tier (operator-sponsored) | XEL, as operator, sponsors a limited free experience to remove onboarding friction: limited text conversation and initial mint, paid by XEL, not the endowment. Voice, image, and video are always paid (fan or endowment). Free mint is open for now; a gate may be added later | Operator-level perk, optional and non-load-bearing; if XEL is absent, minting is self-paid and interaction is paid or endowment-funded, and the character is unaffected |

**Deepest hidden dependency to track:** the Sui-native attested-compute default roots its attestation in AWS Nitro, and GPU-TEE providers root in their respective chip and cloud vendors. TEE attestation is therefore a hardware trust assumption at every layer of the compute slot. It's acceptable as a default, but it's the reason "multiple TEE vendors, then ZKML" is a roadmap item, not just a caveat.

## Appendix F: Open Questions and Unsolved Problems

Honesty about what is not yet solved is part of the specification. None of these block the version 1 scope (§35); all sit in later phases.

1. **Private inference at frontier scale.** TEE attestation is a hardware trust assumption, and zkML cannot yet prove a large model's output. Running the brain privately on fully untrusted hardware, with a proof it ran the committed persona, is real for small models and a vendor-trust story for large ones. Expected to stay partly open for some time.
2. **Autonomy while the owner is gone (the heartbeat).** No chain offers native, self-firing scheduling, so the endowment's epoch cycle must be triggered by an external transaction. The design resolves the *authority* problem (the heartbeat is permissionless, authority-free, and bounty-paid, so anyone can send it and it can take nothing, §10.4), but it cannot remove the need for *someone* to send it. If no one ever does, the character coasts on its balance and degrades gracefully rather than losing funds or control. A live, incentivized, decentralized keeper network is the remaining maturity item.
3. **Death detection and the succession trigger.** Reliably detecting a creator's death without false positives (guardian thresholds, timeouts, dispute windows, protection against premature triggering) is underspecified and load-bearing for inheritance.
4. **Consent verification for a real person, especially posthumously.** On-chain a signature is checkable; binding it to the actual human, or to a legitimate estate, is an off-chain identity problem. This is the core legal risk of the category and tends to surface with the first real user.
5. **Persona fidelity.** There is no defined way to fully measure whether a character faithfully represents the person, or to fully detect drift as model and memory change. Mitigations are in the design (disclosed fidelity signal, deferral over confabulation, versioned persona), but a rigorous general evaluation and drift-monitoring methodology remains open.
6. **Trustless yield discovery.** There is no on-chain, verifiable ranking of the best-yielding venues. The design bounds this by making the yield scanner an *advisor* that can only propose within the owner's risk envelope, and by running it in an attested enclave so its proposal is verifiable (§10.5). But sourcing a genuinely trust-minimized, decentralized yield signal remains open; today it rests on the owner's allowlist plus an attested advisor, not on a trustless oracle.
7. **Money transmission and creator tax reporting.** Paid interactions plus creator withdrawals plus metered compute pull an operator into money-transmission and creator-tax-reporting regimes, heavier than minting alone. Scope and jurisdiction handling to be specified before creator-charged mode ships broadly.

## References

This work draws on prior art and existing standards, and does not claim the underlying primitive as new. The space moves quickly; this is a snapshot.

1. Alethea AI (intelligent NFT). Originated the idea of an AI character as an NFT.
2. ERC-7857 (Intelligent NFTs / Agentic ID), 0G Labs. Encrypted, transferable agent NFTs with key rotation on transfer.
3. Story Protocol. Programmable on-chain IP and licensing; the benchmark our proposed rights layer is measured against.
4. Modern agent frameworks (OpenAI Agents SDK, Anthropic tool use and the Model Context Protocol).
5. ERC-8004 (Trustless Agents), Ethereum. On-chain identity, reputation, and discovery for agents.
6. x402. Open HTTP-native crypto-payment standard for machine-to-machine payments.
7. Sui and the Move language, Mysten Labs. Object-centric L1 with native object ownership.
8. Seal. Threshold encryption with on-chain access policy on Sui.
9. Walrus and Walrus Sites. Decentralized encrypted storage and static hosting.
10. Nautilus. Sui-native attested compute using hardware enclaves.
11. Phala Network. GPU-TEE confidential inference.
12. LayerZero. Omnichain messaging; a reference point for cross-chain identity.
13. Trusted Execution Environments (for example Intel TDX, AWS Nitro Enclaves).
14. ZKML. Cryptographic proof of model execution; the long-term successor to hardware-rooted attestation.
15. Right-of-publicity and data-protection regimes (for example GDPR).
16. Ika. Sui-native MPC network (dWallets) for programmable cross-chain custody.
17. Pyth Network. Pull-based price oracle on Sui and many other chains.

---

*Whitepaper. Limitless Labs / XEL, 2026. Contracts, reference client, and schemas released open-source. Identity anchored in verifiable commitments; infrastructure no one can switch off.*

**Beings That Live Forever.**
