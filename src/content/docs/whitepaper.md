---
title: Beings that are truly yours
description: XEL is self-sufficiency of being. Sovereign, persistent AI beings you truly own, self-funded through DAY.
---

# Beings That Are Truly Yours

**XEL: an open protocol for sovereign, persistent digital beings (aNFTs)**

Whitepaper
Limitless Labs / XEL · 2026

**How to read this document.** Part I is the vision and the architecture, written to be read start to finish. Part II is the formal specification, written for builders. Part II also carries the smart-contract module architecture, the security requirements and threat model, the version 1 build plan, and the thousand-year survivability analysis. The appendices hold the Move code, the capability schema, the current default implementations, and a list of open problems. A references section closes the document.

**A note on the name.** XEL is the shell that carries a life forward, the Ghost-in-the-Shell framing where the person is the ghost and the XEL is the shell. Identity lives in the commitments (the ghost), not the current model, storage method, or chain (the shell). Everything the shell is made of can be swapped; the ghost persists. Earlier drafts called this "the Living Character Standard." XEL is the current name. A XEL is the unit: one preserved being, anchored by an aNFT.

**A note on two protocols.** This paper describes XEL, but it names a second protocol throughout: DAY. The two are separate protocols and two expressions of one idea, agent self-sufficiency. XEL is the self-sufficiency of *being*: identity, memory, and existence that no one can take away, so the agent is itself and stays itself. DAY is the self-sufficiency of *capital*: earning, paying, and persisting, non-custodially, so the agent funds itself. XEL keeps a being alive as an identity; DAY keeps it alive economically. They connect concretely: a XEL character funds its own survival through a DAY vault. DAY is XEL's flagship customer, not its parent, and XEL's capital slot is filled by DAY by default but is swappable, so nothing about DAY is load-bearing to XEL's core. Where this paper specifies persistence, it states XEL's requirements and points to DAY for the capital machinery that meets them. Together the two are stated in one line: self-sufficient agents, sovereign in who they are and how they sustain themselves.

---

# Part I: Whitepaper (Vision and Architecture)

## Abstract

Digital legacy is a growing need with one unsolved problem. The AI recreations of a person sold today all live on someone else's servers.

When the company shuts down, gets acquired, or decides to monetize the likeness, the "living" person dies a second time.

We introduce the XEL: a persistent, sovereign digital being that carries a person's presence, memory, personality, and creativity forward. It is owned by the people it belongs to, and it keeps running after both its creator and the company that helped build it are gone.

Each XEL is anchored by an aNFT (Autonomous NFT): an on-chain object that holds identity, ownership, authority, and keys. The character is that anchor plus the encrypted memory and compute it controls. The aNFT is the root of control, not the whole being.

Ownership is sovereign and inheritable, so no single party, including us, can switch the character off, censor it, or seize it.

Permanence has two halves, and the standard is honest about which one it owns. The first half is identity: a being that can prove it is still itself over time and that no one can take away. That is what XEL specifies and enforces, and it is the hard part. The second half is capital: paying the storage, compute, and renewals that keep the being's substrate alive. XEL does not build that machinery into itself. It defines a capital slot and fills it, by default, with DAY, a separate non-custodial protocol for agent capital self-sufficiency. So the felt promise stays "live forever," and the *mechanism* of forever is split cleanly: XEL holds the identity forever, and a capital protocol (DAY by default, swappable) funds the substrate forever, non-custodially, under the owner's control.

The design rests on a few principles:

- **Sovereign ownership.** One on-chain object is the root of identity and authority. Whoever holds it controls everything downstream.
- **Verifiable continuity.** Identity rests on commitments (origin, persona, memory, policy) that can be proven and versioned over time, no matter what model or service runs underneath.
- **Encrypted and owner-gated.** Memory and keys are encrypted. Access is set by on-chain policy, not by any host.
- **Consented.** Representing a real person requires a signed, scoped, revocable consent record.
- **Bounded autonomy.** The character acts on its own, but only within limits its owner sets and can revoke.
- **Self-funding through a capital layer.** It holds its own assets and pays for what it needs. The earning, yield, and bill-paying machinery is a capital protocol XEL plugs into (DAY by default), not something XEL reimplements; XEL specifies the persistence requirements and reads the capital layer's health.
- **Continuity beyond the creator.** It is built to transfer, inherit, and outlive its originator.
- **Provider independence.** Every outside service (intelligence, storage, compute, payment, hosting, capital) is a swappable slot. No single provider is load-bearing.
- **Interoperable.** Identity, ownership, and payment aren't tied to any one chain, platform, or standard. The character works across ecosystems and plugs into existing rails instead of demanding its own.
- **Upgradable without capture.** Any component (chain, standard, provider, model) can be replaced over time without breaking the character's identity. At launch, deployed contracts are immutable and migration to a new version is the owner's choice, so nothing it depends on today can trap it tomorrow. (During pre-launch hardening the core is still upgraded in place; that mutability is removed at launch by burning the upgrade authority, see §Keys and the build spec.)

This is an application layer for persistent people, not a general agent framework, and not a capital protocol. Generic agent identity, discovery, reputation, and payment are being standardized elsewhere, and XEL interoperates with those rails. Agent capital self-sufficiency is DAY's domain, and XEL funds through it. What XEL adds, and what those rails leave out, is persistent human persona, private memory, consent to represent a real person, and guardian succession, with self-funding provided by the capital slot rather than built in.

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

The missing piece was never better imitation. It is sovereignty and permanence: a character that can prove it is still itself over time, that no one can take away, and that can pay its own way.

## 2. The Problem

Three things break today's digital recreations:

- **They are rented, not owned.** The recreation lives on a company's servers under its terms. The company can change it, monetize it, or delete it.
- **They die when the platform does.** No company lasts forever. When it folds, is acquired, or pivots, the "living" person is gone.
- **They have no way to sustain themselves.** A recreation that costs money to run needs someone to keep paying. When the payer stops, it stops.

The result is that the most personal, least replaceable thing, a person's presence, is held by the least durable, least accountable party.

## 3. Vision

The standard enables the digital continuity of human experience: the ability to preserve a person, a story, or a piece of a culture, and to create new ones that endure.

It is backed by sovereign ownership, an open provider market, and self-sustaining economics. Infrastructure that belongs to no single company, including GEN, and that no company or government can switch off.

**Permanence has two halves.** A character stays permanent when both hold: its identity cannot be taken away (the half XEL owns), and the capital to keep its substrate paid keeps flowing (the half a capital protocol owns, DAY by default). XEL guarantees the first and specifies the second; it does not confuse the two. A character's permanence therefore comes down to its identity being unruggable, its capital being self-sufficient and non-custodial, and the health of the open provider market beneath both, not to the survival of any one firm.

## 4. What a XEL Is

A XEL is an on-chain object (the aNFT) plus the encrypted memory and compute it controls.

- The aNFT holds identity, ownership, authority, keys, wallets, and the commitments that prove the character's current state.
- The encrypted memory and persona live off-chain on decentralized storage, gated by on-chain policy.
- The intelligence (the model), the storage, the compute, the payment rails, and the capital layer that funds them are all swappable slots, not fixed parts.

Own the aNFT and you own the being: its funds, its memory access, its right to act, and its right to be transferred or inherited.

**Funding is provided by the capital layer, not built into XEL.** A XEL needs compute and storage, and those cost money continuously. Rather than reimplement yield, treasury, and bill-paying inside the identity standard, XEL treats capital self-sufficiency as a capability slot and fills it with a dedicated protocol, DAY by default (§5, §10). The character's endowment is a vault in that capital layer, owner-controlled and non-custodial; XEL reads its health and states the persistence requirements it must meet. This keeps the identity core small and lets the capital machinery evolve on its own protocol without touching a character's identity.

**Three layers, and which one is hard.** A XEL runs across three layers, and the whole design follows from keeping them separate:

- **Identity and authority live on-chain** (the aNFT, its commitments, its wallets, its rules). This is the sovereign core, and it is the hard part: making a being's identity, ownership, and rules impossible for any operator to reinterpret or seize.
- **The substrate lives in decentralized storage** (encrypted persona and memory, gated by on-chain policy). Owned by the character, readable only by the owner or its guardians.
- **Compute lives off-chain and attested** (inference, retrieval). Too expensive or too large to run on-chain, so it runs off-chain and proves it ran the committed version, never asking to be trusted.

The rules live with the character, not on a company's server. Storage, compute, payments, capital, and even the chain are commodity layers that plug into the core; identity and privacy are the parts that must be gotten right, and they are the parts the standard makes unruggable.

**The cast, in one glance.** Before the mechanics, it helps to know who does what. The **owner** holds the aNFT and has root authority. The **creator/subject** is the person represented, who signs consent. The **operator** (whoever holds a revocable agent capability, or the owner self-hosting) runs the day-to-day. **Providers** fill capability slots (inference, distillation, storage, capital, and the rest). **Guardians** are the M-of-N set that recovers keys and runs succession to an **heir**. **Managers** are whitelisted wallets with scoped, non-root rights. **Fans** interact, gated by reach and payment. The **capital layer** (DAY by default) funds the character's persistence from a vault the owner controls. Full definitions are in §21.

## 5. Design Principles & Capability Slots

**The north star.** No single entity, including XEL itself, should control whether a XEL character exists, runs, or can be taken away. This is what the whole architecture is measured against. Where a component is centralized today, it is marked and given a decentralization path.

**Progressive sovereignty.** The honest state of the standard, stated plainly rather than buried: some infrastructure is XEL-hosted at launch (serving, relay, the payment facilitator for fan payments), because a working product beats a decentralized non-product. Every one of these is an escapable default behind an open interface, and each has a named decentralization path (Appendix E). The direction is fixed even where the present is centralized: hosted-but-swappable today, permissionless tomorrow, with the survivability test (§15) enforced on every build so the trajectory can't quietly reverse. Sovereignty is a property the design converges to, not a marketing claim about day one.

**Nothing is load-bearing.** The core defines a small shared vocabulary (commitments, capabilities, proofs, wallets) and nothing else. Providers, adapters, chains, and even the capital layer plug into that vocabulary without the core depending on any of them. This is what makes "no single provider is load-bearing" true at the level of code architecture, not just prose: the immutable core can outlive every company, provider, and venue that currently serves it, because it never imported any of them. This is exactly why the capital layer is a *slot*, filled by DAY by default but swappable, rather than a hard dependency: an owner could self-provision capital, or point the slot at another capital protocol, without touching the character's identity. A component can be swapped without touching the core, which is the architectural expression of the north star.

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
| Inference | Run the committed persona, attested | Many providers per schema; owner-configurable |
| Data extraction | Convert raw sources to text/embeddings | Commodity providers; swappable |
| Payment facilitator (fan payments) | Verify + settle crypto payments across chains | Anyone runs one; configurable + failover |
| Capital & self-funding | Earn yield on the endowment and pay the character's storage, compute, and renewal bills, non-custodially, under owner-set limits | DAY (default, swappable); an owner may self-provision or use another capital protocol |
| Custody of identity keys | Self-custody root, optional gas sponsorship | Self-custody default |

The first three rows are already decentralized. The capital-and-self-funding slot is the one economic slot XEL keeps in its list, and it keeps it only as a *slot*: XEL defines what the slot must do (earn on the endowment, pay the character's bills, non-custodially, within owner limits) and names DAY as the default filler. Everything about how that is done, treasury topology, yield strategy, keepers, the harvest cycle, storage-renewal payment, gas sponsorship, is DAY's specification, not XEL's, and is inherited rather than restated here (§10). The custody-of-identity-keys slot is solved by default: root is simply a standard self-custody wallet, with sponsored gas as an optional convenience layered on top.

The concrete systems filling each slot are in Appendix E, kept out of the body so the standard stays neutral.

### 5.1 Object Composition

An aNFT is an on-chain object with four parts: an immutable core, mutable owner-controlled commitments, authority, and funds. The object model is chain-agnostic. It assumes only an object-centric chain with native ownership.

| Part | Contents | Property |
|---|---|---|
| Genesis (Proof of Genesis) | Creator, timestamp, consent reference | Immutable |
| Commitments | persona-hash, memory-root, raw-data-root, policy-hash | Verifiable, versioned (history in lineage) |
| Authority | Owner root + agent capability | Two-tier governance |
| Wallets | One address per supported chain; a pointer to the endowment (a capital-layer vault) | Public, receive-only; endowment-linked |
| Services | Capability schemas + crypto payment | Interchangeable providers via open schema |
| Rights | Licensing layer (proposed) | Licensing + royalties |

### 5.2 Why a Default Home Chain (Sui)

The standard is chain-agnostic, but a character needs a default home, and the reference implementation homes on Sui.

The parts of this system that are hard and differentiating map directly onto Sui primitives: a native object model where an aNFT can own its own memory, wallets, and the agent capability; and an integrated privacy stack (encrypted storage, threshold encryption with on-chain access policy, and attested compute) that interoperates as a native whole.

The parts where Sui is merely competitive (stablecoin yield, payment rails, liquidity depth) are commodity layers a character reaches across chains anyway, and the capital layer that uses them is itself a swappable slot. The rationale rests on identity and privacy, the hard parts, not on yield, so the choice survives even if the best yield moves elsewhere.

The home chain remains an implementation choice. Another deployment could home a character elsewhere, and the chain-adapter design plus commitment-based identity (§27, §36.2) let a character re-home on a successor chain without losing identity.

### 5.3 The Open Standard vs. the Operator's Role

- **The open standard** (object model, Proof of Genesis, commitments, encrypted access-gated storage, capability schemas, wallets, authority model) is permissionless and doesn't depend on XEL or any provider.
- **The operator never holds ownership.** The user holds the aNFT's root authority at all times. An operator holds only a revocable, scoped agent capability (§8): permission to run the daily work within owner-set caps. The operator can run inference, pay providers, and manage the day-to-day within policy. It can never withdraw principal, transfer the character, change the rules, or edit the manager whitelist. The contract rejects those without the owner's root or the guardian threshold.
- **Providers sit under the operator.** Specific capabilities are filled by providers, each swappable behind an open schema. This includes the capital layer: the endowment is a vault in a capital protocol (DAY by default), whose own non-custodial guarantees the character inherits. Every slot, including the quality-not-code parts (inference and persona distillation), is defined by what it must do, not by who fills it. No provider is ever required, and routing to a competitor earns that provider instead. (Concrete launch defaults are in Appendix E.)
- **One model, not two modes.** The user can hold the aNFT in any wallet, including their own hardware wallet, and still grant an operator the agent capability so operation is hands-off. Granting or revoking that capability is a single owner-signed transaction. Revoke it, or never grant it, and the user signs the character's actions themselves. An operator is optional in every configuration; a self-hosting owner runs that role themselves.
- **XEL is at most one guardian.** In recovery and succession (§9, §13), XEL may participate as one guardian among several but never holds the threshold majority, so it can never use recovery as a back door to seize a character.
- **Trust comes from enforcement, proven by open source.** On-chain contracts are what make the system unruggable: the owner-only withdrawal, guardian recovery, and the bounds on the agent capability are enforced by the chain, so no operator can move a character's funds even if it is hacked or turns hostile. The endowment's own fund-safety guarantees (non-custodial, destination-locked, revocable) are enforced by the capital layer's open contracts and inherited by the character. Open-sourcing the contracts is what lets anyone verify that power was actually removed: read the functions, confirm there is no admin key. Upgrade authority is the one power retained during pre-launch hardening (so bugs can be fixed in place) and is burned at launch; after that, anyone can verify on-chain that no upgrade path remains. Until then, the honest status is that the core is still mutable by its developers, which is why launch is gated on removing that authority.
- **The honest limit.** Putting capital to work in any venue hands funds to another protocol. The capital layer can guarantee a character only ever interacts with venues the owner allowlisted, and can bound exposure with caps and diversification, but it cannot guarantee an allowlisted venue is itself safe. These limits are bounded by design, not eliminated, and they live in the capital layer's trust model (§10, DAY's whitepaper), not in XEL's identity core.
- **The invariant we hold ourselves to.** A character must stay functional and ownable with every XEL service offline, and must keep funding itself with its capital layer's operator gone (the capital layer is itself non-custodial, so this holds). §15 makes this a continuously tested guarantee, not a promise.

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

**One content store, per-file annotations, no sorting required.** A character has a single store of content, not separate bins the owner must sort uploads into. Each file carries two independent annotations, both with defaults that make annotating optional. The first is visibility (private by default, some files marked public): a public post appears on the public page, a private file stays encrypted and owner-or-guardian gated. The second is what the file feeds: by default a file shapes the character both ways, it becomes retrievable memory AND informs the always-on persona. A file can instead be marked memory-only (the character can recall it but never starts to sound like it, useful for reference material such as a manual or contract) or persona-only (it shapes who the character is without being stored as a recitable fact, useful for a voice or character guide). Because both annotations default to the everything-shaping-everything case, an owner who never touches them just uploads and the character absorbs it; the annotations exist for the exceptions, not as a decision on every file. Content is added incrementally, new files are ingested as they arrive without rebuilding the whole memory, and the system is built to hold thousands of files, with each character's storage and ingestion cost paid from its own endowment (§10).

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

- **Owner signer (human).** The wallet that approves owner-tier actions: withdraw principal from the endowment, transfer the character, change policy, grant or revoke the delegate, choose the primary chain. The standard is wallet-agnostic; any standard wallet, including a hardware wallet, works. This is where the power lives.
- **Delegate signer (programmatic, XEL or any operator).** A separate, scoped, revocable key holding the agent capability, signing routine execution with no human tap so the character runs while the owner sleeps or is gone. It can never perform owner-tier actions, because the contract checks the capability, not merely a valid signature. The owner's signer is never handed to any operator or server.

The always-on delegate key is by definition a hot key and the most exposed surface, which is exactly why it is capped, allowlisted, restricted to the character's own wallets and vault, and excluded from every sharp action (§8.1, §34).

**Tier 1: Governance (always owner-signed).** Anything that defines who the character is or what it may do: core persona changes (outside the authorized auto-update envelope), name, photo, wallet addresses, public site link, provider policy, spend caps, consent scope; granting or revoking delegation; withdrawing principal from the endowment; transferring the NFT. Changing a recurring authorization is itself governance.

**Tier 2: Execution (delegated via agent capability).** Routine, already-authorized actions: paying a provider per call within caps, running an authorized ingestion or persona-update job. These run under a scoped, revocable agent capability with no fresh owner signature. Revoking the agent capability is an instant kill switch.

### 8.1 Tiered Keys

One hot key controlling both identity and funds is a catastrophic single point of failure. Keys are tiered:

- **Root** (cold or guardian multisig): identity and authority changes, principal withdrawal, delegation grants.
- **Warm:** routine governance.
- **Agent capability:** execution within caps.

### 8.1a Authority Is Granted, Keys Are Never Handed Out

The single most important distinction in the security model, and the one most easily gotten wrong: **moving funds is an action the contract authorizes, not a key anyone possesses.** No party, not the owner, not a manager, is ever handed a copyable spending key. This is what lets funds be withdrawn freely while remaining impossible to steal.

The reason the distinction is load-bearing: a released key cannot be scoped. Once someone holds a private key, no cap, destination-lock, or time-guard constrains what they sign with it; they can sign their own transfer to anywhere. A key is a possessable object. An authorization is permission to sign one specific, bounded transaction. So the system never releases keys; it authorizes signatures (or, on the home chain, moves an owned object).

**Endowment spend-key custody is inherited from the capital layer, not re-specified here.** The endowment is a vault in the capital layer (DAY by default), and that layer supplies the whole non-custodial custody model for endowment funds: the owner holds the funds and the keys, the protocol holds only a scoped, revocable, destination-locked capability that can route capital into owner-allowlisted venues and back to the owner's vault and nowhere else, and the owner can revoke or self-provision at any time. XEL does not re-specify endowment spend-key custody; it points to the capital layer's model and requires only that the slot's filler be non-custodial and destination-locked (the capital-and-self-funding slot in §5, and invariant 13). What XEL *does* specify here is the custody of its own identity keys, which follows the same principle by different mechanism:

- **Identity keys on the home chain:** identity and its authority live in the owned aNFT object. The contract acts on the authority of ownership. There is no identity key to hold in the first place beyond the owner's wallet.
- **Foreign-chain spending for the character's own non-endowment actions:** where the character must sign on a chain where no home-chain object can hold authority, the MPC network (§9) signs exactly one authorized transaction; key shares are never assembled and nothing is handed to the caller.

Because authority (not key possession) is what gates a fund movement, the question is always *who may move funds, and to where*. That is tiered and contract-enforced. For the endowment, the capital layer enforces it (non-custodial vault, destination-locked capability); for everything XEL controls directly, XEL enforces it:

| Actor | Can cause funds to move? | To where | Cannot |
|---|---|---|---|
| **Owner** (holds the aNFT) | Yes, withdraw the entire balance (only unspent fan credits are protected) | Out, to the owner's own wallet | (nothing above; owner is root) |
| **Manager** (whitelisted, scoped) | Only within granted non-root scope (pricing, passwords, content) | Within the system, never out to the manager | Withdraw principal, transfer the NFT, edit the whitelist |
| **Capital layer** (endowment vault + its capability) | Yes, route endowment capital to earn and pay the character's approved bills | Into owner-allowlisted venues and approved payees, and back to the owner's vault; never to an arbitrary address | Extract capital, withdraw to itself, send anywhere the owner did not allowlist |
| **Anyone else** | No | (n/a) | Everything |

So funds can absolutely be withdrawn: the owner withdraws out (above the fan-credit liability), managers move funds within their scope, and the capital layer moves endowment funds only into owner-allowlisted venues and approved bill payees and back to the owner. Each is bounded to what its authority permits, and none of them ever holds a key that escapes those bounds. "No one gets the keys" and "people can withdraw funds" are both true at once, precisely because withdrawal is an authorized action, never a key release.

Two corollaries that follow directly, and that no configuration may violate:

- **Managers are on-chain policy, not a secret.** The manager whitelist is public, contract-enforced on-chain state (a list of address to scope), so who can manage a character is auditable by anyone. Managers are never stored in, or granted through, the read-time decryption policy (SEAL), and being a manager does not by itself grant the ability to decrypt memory: decryption remains gated to owner OR M-of-N guardians unless the owner makes a deliberate, separate read grant. A manager's power is exactly its on-chain scope, and never the root actions (withdraw principal, transfer the NFT, edit the whitelist), which require the owner's root signature (§10.9, invariant 49).
- **The read door and the spend door are never crossed.** Read secrets (memory, persona, the master read-key) are released as decryptable copies to owner-or-guardians through the threshold policy, because reading tolerates a copy. Spending authority is never a decryptable copy; for the endowment it is the capital layer's non-custodial vault plus its destination-locked capability, and for the character's own foreign-chain actions it is MPC authorization. Putting a spending key behind the read door would hand a copy to whoever satisfied the policy, which for a permissionless action is everyone.

### 8.2 Circuit Breakers & Kill Switch

A persistent entity that spends and posts will eventually be manipulated, loop, or misbehave. Protocol-level safeguards: a moderation capability in the response loop; spend and rate circuit breakers that trip on anomalies; a one-transaction pause (owner or guardian) that freezes inference and payments immediately. The endowment's own spend safeguards (venue caps, the destination-locked capability, revocation) are enforced by the capital layer and pause with the same owner action. Nothing here should be unstoppable.

## 9. Keys, Secrets & Deletion

**One master key: the NFT itself.** Every service, wallet, and secret a character has checks a single question, do you hold this NFT. Hold it and you pass every check; transfer it and the new owner passes them and you stop. This is what makes ownership real and transfer clean: one object to hold, and it commands everything, including which capital-layer vault is the character's endowment.

**Authority lives on-chain; secrets never do.** Everything on-chain is public, so a Move contract can never hold or see a secret; if it could, so could the whole network. The contract therefore holds *authority*, not secrets. It publishes who is allowed (owner OR M-of-N guardians) and proves NFT ownership, both of which are public facts. The secrets themselves stay encrypted off-chain, and are only ever decrypted off-chain. The contract is the bouncer with the guest list, never the holder of the safe combination. A contract bug can at worst mint an authorization incorrectly (bounded and auditable); it can never spill a key, because no plaintext key is ever in its reach.

**Three kinds of things, three kinds of locks.** The mistake to avoid is putting everything behind one mechanism. A character has three different kinds of assets, and each is secured differently:

- **What it owns (money, held in the capital layer).** The endowment funds live in an owner-controlled vault in the capital layer (DAY by default). There is no decryptable spending key here: the funds are the owner's, and the capital protocol holds only a scoped, destination-locked capability to route them within the owner's limits and return them to the owner. Sell the NFT and the endowment pointer goes with it, and key rotation on transfer re-binds control to the new owner. Nothing to store, nothing to leak.
- **What it can read (memory, persona, the creator's own saved credentials).** These sit encrypted off-chain (decentralized storage), behind a threshold policy (threshold encryption) that releases decryption only to whoever proves NFT ownership or a guardian majority. Decryption happens in the client, off-chain. The contract publishes the policy; the threshold network enforces it; the chain never sees plaintext. This is the right door for anything that is *read*.
- **What can spend on other chains (foreign-chain wallets, external actions the character takes directly).** These are never stored as an encrypted key, because decrypting a spending key hands the holder a permanent copy that survives a sale and breaks ownership transfer. Instead the key is held by an MPC network (dWallets) in shards that are never assembled anywhere, on-chain or off, and NFT ownership is what authorizes a signature. You control the wallet; no one, including you, ever holds its key; transfer moves control completely with nothing left behind.

The rule underneath: **if it can be read, decrypt it (off-chain, gated by the contract); if it can spend, authorize it, never decrypt it.** Reading tolerates a copy; spending does not. Endowment spending in particular is never a decryptable key: it is the capital layer's non-custodial vault plus a destination-locked capability.

**What is (and is not) in the encrypted blob.** The threshold-gated encrypted state holds only readable secrets: the master key that decrypts memory and persona (the crypto-shredding key below), and any credentials the creator chooses to give the character to act on their behalf (a social-account token, a bring-your-own provider key). It does *not* hold the endowment (a non-custodial vault in the capital layer, no decryptable key), foreign-chain wallet keys (MPC, never a blob), or commercial-vendor API keys (those are operator-level accounts that never touch the NFT).

The access policy is deliberately **not** "current owner only," which would make one lost key mean permanent death and one phished key mean total compromise. Instead:

- **Master identity secret:** guardian-recoverable, decryptable by owner OR an M-of-N guardian set. This is also the succession path.
- **Spending authority:** never a persisted plaintext key. Endowment funds are controlled through the capital layer's non-custodial vault and destination-locked capability; the character's own foreign-chain actions are MPC-authorized. Nothing to steal as a blob.

There's no single "steal-this-blob-and-own-everything" artifact, and day-to-day operation never decrypts the master secret.

**Deletion via crypto-shredding.** Immutability and deletion rights (e.g., GDPR) collide head-on for a "forever" system. Resolution: personal data is encrypted, and honoring a deletion request means destroying the key, not the blob. The immutable record stays; the plaintext becomes permanently unrecoverable.

**Client-side decryption boundary.** Access to ciphertext is gated on-chain, but decryption happens client-side once access is granted, so the client that assembles the plaintext holds the keys at that moment. Self-custody users running their own client keep this fully local. In the managed experience, the operating client is the trust boundary, a property the tiered-key and no-persistent-spend-key design is built to contain.

**Onboarding and the wallet the user gets.** Every user gets a wallet at signup, ONE root wallet per user, holding their aNFTs. A character does not have its own keyed wallet on the home chain: its identity lives in the aNFT the owner's wallet holds, its endowment is a non-custodial capital-layer vault the owner controls (no decryptable key exists to hold, store, or leak), and its foreign-chain addresses are MPC-authorized (no key is ever assembled). Any design that provisions a per-character home-chain wallet with a stored private key is the custodial anti-pattern this section exists to forbid.

**The wallet slot is itself a provider slot, and XEL-as-wallet-provider is separable from XEL-as-operator.** For email signups, the launch default is an XEL-hosted wallet service: XEL acts as a wallet provider (the same category as any hosted-wallet vendor), holding the user's key as a service to the USER, under an explicit relationship with a clean exit. The user can fire the wallet provider at any time, export the key, or move the aNFT to any wallet they prefer (hardware, self-custody, another provider), and can fire the operator independently by revoking the agent capability. These are two different revocations of two different services. Stated per the progressive-sovereignty rule rather than hidden: this launch default IS custodial-with-export, chosen because a working product beats a decentralized non-product; the target is the embedded non-custodial pattern (client-side or secure-enclave key generation, so no provider ever holds the key), and the slot migrates there without the user's identity or funds moving. What makes the launch posture safe rather than a trap is the guardian layer: the default 2-of-3 guardian set includes a recovery key held in the user's own device keychain, so even if the XEL wallet service disappears, the owner recovers through guardians with no operator in the loop, 'money survives XEL' holds in the hosted-wallet era too. (This is why we removed zkLogin from the root path: it made root authority depend on an OAuth provider, a salt service, and proving infrastructure, none of which a sovereign object should rely on. Something like it remains acceptable for the fan/access tier in §10.6, which never touches root.)

**Email login is a convenience over the key, never custody of it.** A user may sign in with an email code, but that is only a way to *reach* the wallet provisioned above, never the thing that authorizes anything on-chain. This distinction is load-bearing for survivability: an email code is checked by a live server, so if the operator is gone there is nothing to send or verify it, and any design where the email path *is* the authority dies with the operator. So the standard requires that email onboarding bind a durable, non-custodial key at signup (the wallet above), and treats the email code purely as an unlock for it. There are effectively two doors to the same key: an operator-hosted convenience door (email code, mortal, works only while the operator runs) and a key-based door (a wallet signature or guardian recovery, immortal). The key-based door is the one that must always exist, so losing the operator only costs the convenience, not access.

**Recovery when the operator is gone.** Because the key is non-custodial and the permanent client (§32.10) is served from decentralized hosting and authenticates by key rather than by email, a user reaches their character and their memory after the operator disappears by one of: the wallet they hold (the provisioned embedded wallet, or any wallet they later added), or, if every key is lost, guardian recovery (owner OR M-of-N, enforced by the on-chain policy and the threshold network, with no operator in the loop). The endowment survives the same way, because it is a non-custodial vault whose control follows aNFT ownership, so recovering the character recovers its funds. The honest edge, stated rather than hidden: a user who has only ever used the email code, never secured or exported the provisioned key, and never set guardians, is trusting the operator during that window. The design's answer is to establish a durable factor early (the provisioned non-custodial key exists from signup, and guardian setup is prompted), not to pretend the email code alone could survive.

**Users can add or swap wallets freely.** The wallet is the unit of authority, so a user is never locked to the wallet provisioned at signup. They can attach any wallet they prefer, a hardware wallet, an existing self-custody wallet, another device, through the mechanisms already in the authority model: transfer the aNFT to a new wallet to move ownership, add a wallet to the manager whitelist (§10.9) to grant it scoped rights, or name a wallet as a guardian for recovery. No separate account-to-many-wallets registry is introduced, because such a map would have to be operator-hosted or itself on-chain to survive; instead each wallet earns its role directly through ownership, whitelist, or guardianship, all of which already survive the operator.

## 10. Self-Funding through DAY

A XEL costs money to keep alive: encrypted storage must be renewed, inference and generation must be paid for, and a public page must be served. XEL does not build the machinery that earns and pays for this into the identity standard. It defines a capital slot and fills it, by default, with **DAY**, a separate non-custodial protocol for agent capital self-sufficiency. This section states what XEL requires of that slot, what it reads back, and what it deliberately leaves to the capital layer. The fan-facing economics that are genuinely XEL's own (interaction pricing, creator earnings, the fan-credit ring-fence, billing, and the manager whitelist) stay in this section too, because they are properties of the *character*, not of the capital protocol.

**The endowment is a DAY vault the owner controls.** A character's endowment is not an XEL-owned balance object; it is a vault in the capital layer, owned by the owner's own wallet, that the character's aNFT points to. Depositing into the endowment does not transfer funds to XEL or to DAY. The owner holds the funds and the keys; the capital protocol holds only a scoped, revocable, destination-locked capability to route that capital into owner-allowlisted venues and back to the owner, and nowhere else. This is DAY's non-custodial guarantee, and the character inherits it whole. Because the slot is swappable, an owner may self-provision the capital layer or point the endowment at another capital protocol that meets the same non-custodial, destination-locked, revocable bar; nothing about DAY is load-bearing to a character's identity.

**DAY earns; DAY pays; XEL sets the persistence requirements and reads the health.** The division of labor is clean:

- **DAY earns.** Idle endowment capital is put to work in yield venues on the owner's allowlist. DAY's off-chain intelligence (Autopilot) chooses venues and rebalances within the owner-set envelope, and it is untrusted by design: DAY's open, audited on-chain contracts reject any move outside the owner's allowlist and caps, so even a compromised strategy cannot extract or misdirect funds. XEL neither specifies nor operates this; it is DAY's brain and DAY's cage.
- **DAY pays.** DAY's Auto Pay directs a portion of harvested yield to destinations the owner has approved on-chain, in its self-funding form: the character's *own* costs, its storage renewal, inference, generation, and API bills. This is the mechanism by which a XEL covers its own survival from its own returns, and it is DAY's, not XEL's. Auto Pay is destination-locked to the owner's approved payee list exactly like the venue allowlist, so it can never widen what the capital layer may do with funds.
- **XEL specifies the persistence requirements.** XEL states what "alive" means for a character and what must be paid to keep it so: the storage-renewal cadence (renew each stored blob before its runway crosses a safety margin), the survival deadline (a lapse is only ever caused by the substrate storage going unrenewed), the rolling prepaid cushion (keep roughly six months of storage prepaid while funds exist, so a lapse never sneaks up), and the rule that a character is *lost* only if its substrate storage actually lapses, never merely because a balance is low. These are identity-layer requirements: XEL owns the definition of survival; DAY owns the funding that meets it.
- **XEL reads DAY's health signal.** DAY reports whether the endowment is self-sustaining (yield covers the character's burn) or short by a stated amount. XEL surfaces this to owners and fans as runway, "alive for about N months", so the money surface stays honest: live figures only, never a fabricated number, and an intent to fund is never shown as a settled position (§10.7).

**The non-custodial, destination-locked, revocable guarantees are inherited, not restated.** Everything about how the endowment stays safe, that no one holds a copyable spending key over it, that capital can only move to owner-allowlisted venues and approved payees and back to the owner, that the owner can revoke the capital layer's capability instantly and lose nothing but automation, that an owner who self-provisions pays no capital-layer fee, comes from the capital layer's own on-chain contracts and trust model. XEL requires the slot's filler to have these properties (invariant 13) and inherits them; it does not reimplement treasury topology, yield strategy, keepers, the harvest cycle, gas sponsorship, or the survival auto-unstake, all of which are the capital layer's specification (DAY's whitepaper).

**Fees split cleanly between the two protocols.** The capital layer charges a fee on realized yield, and only on yield, never on principal, deposits, or withdrawals; that fee is DAY's, taken by DAY at harvest, and an owner who self-provisions capital pays none of it. XEL's own fee is the interaction settlement fee (§10.7): taken at fan-payment settlement, after compute is covered, on the margin. The two never overlap: the yield fee leaves to the capital layer, the interaction fee stays XEL's. XEL charges nothing for on-chain permission, nothing to exist or be owned, and nothing on deposits or withdrawals.

**What is XEL's, stated plainly.** The rest of this section specifies the economics that belong to the *character* and stay in XEL regardless of which capital protocol fills the slot: how a fan reaches and pays a character (§10.6), how the owner earns and withdraws and how fan money is ring-fenced (§10.7), the usage meter that prices variable-cost modalities (§10.8), the manager whitelist (§10.9), and where each setting lives (§10.11). Fan credits, the ring-fenced fan-credit liability, conditioned tranches, the chargeback state machine, the interaction settlement fee, creator earnings and withdrawal, the billing meter, and the manager whitelist are all XEL's. Only the yield, treasury, keeper, and storage-renewal-payment machinery is the capital layer's.

**The endowment and its funding require no company to run.** Because the endowment is a non-custodial vault whose control follows aNFT ownership, and because the capital layer's on-chain contracts enforce fund safety without an operator, the endowment passes the same §15 "XEL can die" test as identity and memory, and it passes a "DAY can die" test too: the capital layer is itself non-custodial, so its operator disappearing costs the character only the automation, not the funds or the ability to keep funding itself through another filler of the slot.

### 10.6 Interaction: Who Can Talk, and On What Terms

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

There is no separate "payout" rail. Everything a fan pays flows into the character's own endowment, and because the creator holds the aNFT, the creator owns that endowment (a non-custodial capital-layer vault). Earning and funding become the same act, and the creator withdraws their earnings as the owner exercising root authority they already have (§8): the owner withdraws from the endowment vault, which the capital layer permits because the owner controls it. One pool, one owner, one set of rules, nothing new to trust.

**The flow on a fan payment `P`:**

```
1. Compute covered first.   The interaction's metered cost settles to the
                            serving provider it was routed to.
2. Interaction fee.         The disclosed XEL interaction fee is taken on the remainder.
3. Net into the endowment.  What's left lands in the character's own vault.
```

Compute is covered before anything lands, so the endowment never fills with money already owed for inference, and a later withdrawal can never strand the compute bill. The fee is taken at the door, so it never sits inside the creator's withdrawable pool. This ordering is what makes the model whale-proof: a heavy user's payment covers their own compute first, so no volume of usage can put anyone underwater. This is the structural advantage flat-rate companion apps cannot match. The fee taken here is XEL's interaction settlement fee; it is distinct from the capital layer's yield fee, which is taken by the capital layer on yield and never touches this flow.

**Withdrawal is absolute: the owner can take everything.** The character's endowment belongs to the owner, and the owner may withdraw any amount at any time, owner-signed, down to zero. There is no protected reserve and no floor. Withdrawing the balance down to nothing lets the character lapse, and that is the owner's right: "you truly own it" includes the right to wind it down. The contract does not second-guess the owner (a client may warn that a withdrawal will end the character, but it simply obeys). Withdrawal draws from the endowment's liquid funds; if capital is deployed into a venue, the owner (through the capital layer) withdraws it back to the vault and out, a capital-layer mechanic XEL does not restate.

**The one exception: unspent fan credits are not the owner's money.** Money fans have prepaid for interaction they have not yet consumed is theirs until spent. It is held as a ring-fenced, liquid, refundable liability, and it is the single thing the owner cannot withdraw and cannot spend on the character's own survival. Only funds the character has actually earned by delivering interaction are the owner's to take or the character's to spend. As fans consume credits (interactions happen), that liability converts to earned revenue and becomes spendable and withdrawable; unspent credits stay refundable to the fan. So "withdraw everything" precisely means: withdraw everything the character owns, which is its whole endowment minus the outstanding unspent-credit liability owed back to fans. This ring-fence is XEL's, enforced on the character's own accounting, and it binds the capital layer too: no funding of survival from the capital layer may reduce the endowment below the fan-credit liability.

**Fan money stays the fan's, and it is XEL's to protect.** The fan-credit ring-fence, conditioned tranches, and chargeback handling are all XEL's accounting on the character, not the capital protocol's. Value can enter a character through different funding providers, and a provider may attach conditions to the value it delivers (a withdrawal hold for a period, whether the funds are spendable during that hold, whether they are stakeable during it), which XEL then enforces on those specific funds. Crucially the conditions attach to the funds, not to the provider globally. Conditioned value is tracked as its own portion of the endowment (a tranche) with its own maturity and use-rules, exactly as unspent fan credit is tracked as a ring-fenced liability, so the endowment can always answer precisely how much is freely withdrawable, how much is spendable-but-held, and how much matures when. As a held tranche matures, it becomes unrestricted; any yield earned on held funds inherits the same hold, so a condition cannot be leaked around. Spending draws from the most-restricted spendable funds first, so held value is consumed by ordinary use before free value is touched. This is the single mechanism (conditioned tranches) behind both fan-credit protection and provider-imposed funding conditions.

**The lock has two sides, and both are live until the tranche clears.** A conditioned tranche is a pair of standing claims. On the owner side (defensive), the owner cannot withdraw the tranche until its unlock epoch. On the provider side (reconciliation), the delivering provider retains clawback authority over that exact tranche until its grace period passes or its dispute resolves: a chargeback pulls the fiat back from the operator, so the operator must retain the ability to pull the corresponding on-chain value back from the character. Removing a provider while it still had un-cleared tranches outstanding would leave a later chargeback with no reversal path, so a provider with outstanding un-cleared tranches is load-bearing until they clear.

**Providers are deprecatable instantly and removable once drained, never a permanent dependency.** The constraint above is about timing, not permanence. ACTIVE: accepting new contributions. DEPRECATED / DRAINING: switched away, instant, always allowed; it stamps no new tranches but still holds clawback rights over its outstanding un-cleared ones, so it is not yet detachable. REMOVABLE: every tranche it stamped has cleared its hold or resolved its dispute; only now can it be detached, because no on-chain fund answers to it anymore. The state is self-clearing: it drains to zero on its own (for a card provider, bounded by roughly the dispute window after its final contribution, plus any open-dispute tail), with no manual cleanup and no indefinite obligation. The rule is "you cannot remove a provider early and strand a chargeback," never "the provider is stuck forever."

**Refunds (defined mechanism, not required for launch).** A fan's unspent credits can be returned, and because the liability is kept liquid and ring-fenced, the funds to honor a refund are always present. Because the fee is taken at interaction settlement, not at credit purchase, an unspent credit has never been fee'd: the refundable amount is the full current unspent liability, already reduced only by whatever the fan has actually used. Returning money costs money, so the refund is net of its own cost: the transaction gas, plus any bridge cost when the refund goes back to the wallet and chain the fan paid from. A refund fires only when the balance exceeds a safety multiple of that fully-loaded cost, so a refund never costs more than it returns; a tiny cross-chain balance is instead offered on the home chain or left in place (credits never expire). Refunds are a defined capability; a specific fan-initiated or automatic refund flow is a product choice layered on top, and any handling of long-dormant balances is subject to legal review (stored-value and unclaimed-property rules).

**All public on-chain:** anyone can read a character's endowment balance, its deployed position, and its runway, whether from XEL's own on-chain state or from the capital layer's. Transparency becomes a signal ("funded to survive 40 years" versus "nearly empty"), visible to owners and fans alike.

### 10.8 Flexible Billing: Metering by What Actually Drives Cost

Text is nearly predictable. Voice, images, and video are not. Their cost moves along several axes at once, so no single flat price can track them without either losing the creator money on the expensive tail or overcharging fans on the cheap end.

The billing is therefore built as a general meter, not a fixed price list. Every interaction returns a **usage record**: a set of measured dimensions, each with a quantity and a true unit cost. The settled cost is their sum plus the interaction fee. A new modality, or a new cost driver within one, is just another dimension on the same meter, so the model extends without redesign.

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
- **Credits (the engine underneath, and the option for heavy or media use).** Credits absorb modality complexity into one countable number, mapping to underlying cost plus interaction fee. Predictable units show a fixed credit price ("Message: 1 credit. Image: about 20 credits."); variable units show a rate and meter ("Voice: about 5 credits/min. Video: about 40 credits per 5-second clip."). The fan just watches credits.

**The fan never sees a token.** A pass shows a progress bar; credits show a running balance, and metered actions show a live meter. Settlement is exact and on-chain under all of them. Anyone who wants the truth can read every metered dimension and its cost on-chain; it is disclosed, just shown as credits by default.

**How a fan pays.** A fan never needs a self-custody wallet or seed phrase. The interaction tier is separate from root: fans pay in crypto natively or by card through an optional on-ramp (Appendix E), get a lightweight account, and never touch the character's root key. Payments settle to the character's own endowment.

**The free tier is operator-sponsored, not a protocol guarantee.** To remove onboarding friction, XEL as operator sponsors a limited free experience: limited text conversation and the initial mint, paid by XEL, not by the character's endowment. The expensive, variable-cost modalities (voice, image, video) are always paid, by the fan or from the endowment, so they never fall on the operator. This is a service-layer perk that sits outside the standard: if XEL is absent, minting is self-paid and interaction runs on paid or endowment-funded paths, and the character is unaffected. The free tier makes onboarding easy; it is never something a character's survival depends on.

**The honest trust point.** Unit costs are provider-reported: a provider returns how much a call actually used and what it cost. A dishonest provider could over-report to inflate cost. The mitigations are the same attestation the inference slot requires (so usage is bound to a verifiable execution), the creator's per-modality caps that bound the worst case, and full on-chain auditability of every metered dimension.

### 10.9 Management Access: The Manager Whitelist

Interaction (§10.6) is about who can *talk to* the character. Management is a separate axis: who can *change* it. These are different populations with different stakes and different enforcement layers, and they must never cross. There are three concentric rings:

- **Root** (holds the aNFT): everything, including withdrawing principal from the endowment, transferring the character, and editing the whitelist itself. Root actions are always owner-signed.
- **Whitelisted managers** (named wallets, scoped): can run and shape the character within granted powers, with no access to principal or ownership. A manager, a co-creator, a family member, an estate executor, a studio team.
- **Interactors** (public / paid / password): can only talk, gated by §10.6.

The **manager whitelist** is on-chain object state: a list of wallet addresses, each with a defined scope drawn from a fixed menu, so grants are simple to reason about and audit. Typical scopes: edit persona/memory, set interaction pricing and mode, issue and revoke interaction passwords, and manage posted content. No manager scope touches money: there is no reserve, and withdrawal from the endowment is owner-root only. Explicitly **not** in any manager scope unless the owner performs it as root: withdrawing principal, transferring the NFT, and editing the whitelist. This is distinct from the agent capability (a programmatic key for automated execution); the whitelist is for *human co-managers*.

Because the whitelist is on-chain: it is contract-enforced (a manager's out-of-scope transaction fails closed, checked against the on-chain scope, not an operator's server); it transfers with the NFT on succession, so an heir inherits or clears the team; it is chain-portable like the rest of the authority model; and it is publicly auditable, so anyone can see who can manage a character and with what scope.

**The security line, stated as a rule.** A management right is a signed, on-chain capability bound to a specific wallet. An interaction gate (password/payment) is a serving-layer permission. A password can never grant management, and a whitelisted manager's power is bounded by its granted scope and can never reach root actions without the owner's root signature. Three layers, each enforced at the right place: serving layer for interaction, contract for management and root.

**Inviting a manager by email.** Because a whitelist entry is wallet-bound, someone can only be added once they have a wallet. Managers can still be invited by email as a convenience: the owner picks the intended scope and sends an invite, which holds that scope as a pending invitation until the invitee accepts. On acceptance the invitee is onboarded and given a non-custodial wallet the same way any user is (§9), and only then is the wallet-bound whitelist entry created, with the owner's root authority, so the on-chain model is unchanged (a manager is always an address, granted by the owner). The pending invitation carries no authority and grants nothing until it resolves to a real wallet-bound entry; an unaccepted or expired invite is simply discarded. The invite is a bridge to the existing grant, not a new kind of authority.

### 10.11 Character Settings: What an Owner Controls, and Where It Lives

Everything an owner configures about a character falls into one of three homes, and which home a setting lives in is not a UI detail: it determines who can read it, who can change it, whether it survives the operator, and whether it needs encryption. The recurring mistake is to treat "a setting" as one kind of thing; it is three. The rule that sorts them: **public policy and money live on-chain; private content lives encrypted; interaction preferences live at the serving layer.**

**The three homes.**

- **On-chain state (public, contract-enforced, survives everyone).** Identity labels, authority, money, and policy. These are meant to be publicly auditable and must run without any operator, so they are on-chain object state: handle, display name, links, and the on-chain identity; owner, managers and their scopes, guardians, the agent capability; the funding pointer to the endowment (a capital-layer vault) and the character's own accounting on it (the fan-credit liability, conditioned tranches), the interaction fee, spend caps, and pause; pricing and earnings policy; provider policy; transfer, wind-down, and succession; and the commitments and provenance that anchor memory and persona. A visitor or auditor being able to read any of these is fine or desirable, which is the test for on-chain.
- **Encrypted content (private, threshold-gated, decrypted only in the enclave or client).** The actual private material: persona, memory, raw substrate, and voice samples and the cloned voice model. These are encrypted and released only to owner-or-guardians through the on-chain access policy. This is the only home that uses the read-time decryption layer, and it holds content, never policy, pricing, or authority.
- **Serving-layer config (interaction preferences, enforced where interaction happens).** Discoverability, passwords, payment gates, modality on/off toggles, and reach gates. These decide whether and how the character talks to a given visitor. They are not the cryptographic wall and never grant decryption: a password controls what surfaces in conversation, not what can be decrypted.

**What each setting is, and its status.** The settings map onto the three homes as follows. Most are already defined; a few are deliberately marked as still-open or as launch-versus-target, rather than presented as settled.

- **Account and identity** (handle, display name, bio, avatar, links, on-chain identity): on-chain, public. Settled.
- **Persona and memory** (persona prompt, imported sources, live-sync): encrypted content. Settled. With: versioning (on-chain commitments, persona versioned by default, memory optional) settled; permissioned contributions (on-chain reviewed queue) settled; consent (on-chain artifact) settled; crypto-shred deletion (destroy the encryption key) settled.
- **Memory tiers / media privacy:** launch is serving-layer gating under a single encryption policy (the serving layer decides what surfaces per tier). The target for private or preserved-person characters is per-tier encryption, where each tier is released under its own policy so a lower-tier session cannot decrypt higher-tier memory at all. This is the one item deliberately staged: cryptographic tier separation is the destination, serving-layer separation is the launch state, and the difference is disclosed rather than hidden.
- **Per-fan memory scope:** conversational memory with a specific fan is scoped to that relationship by default (fan A's private conversation does not surface to fan B); a shared, communal memory is an explicit owner opt-in. The character's identity (persona, substrate, distilled knowledge) is always global; only conversational history is scoped. Settled as the default.
- **People and access** (owner, managers and scope, reach gate, operator capability, guardians): on-chain, public policy. Settled. Managers are on-chain whitelist entries, never encrypted, and being a manager does not grant decryption.
- **Funding** (deposits into the endowment vault, the funding pointer to the capital layer, the character's own accounting on the endowment, the interaction fee, spend caps, pause): on-chain. Settled. The endowment is a capital-layer (DAY by default) vault; its yield strategy, harvest, and bill-paying are the capital layer's, and XEL reads the health signal. XEL's own on-chain state is the funding pointer plus the fan-credit and tranche accounting.
- **Earnings and pricing** (charge toggle, markup, per-modality price, take-home preview, metering, fan credits, refund): on-chain economic state plus serving-layer price display. Settled.
- **Privacy and gates** (discoverable, password, payment gate, modality toggles, scoped passwords): serving-layer. Settled. Scoped passwords gate interaction only, never decryption.
- **Voice** (message on/off, real-time call on/off, the voice reference, and cloning): the toggles are serving-layer; the voice model reference is on-chain like other pointers; the voice samples and cloned model are encrypted content; and cloning itself is a consent-gated, owner-root capability (it requires a consent artifact scoping voice and fails closed without it, §11). Settled.
- **Ownership and wind-down** (transfer, wind-down, succession, provider policy): on-chain. Settled. Succession is guardian-driven (M-of-N); an optional designated-heir field is an owner-set hint that guardians honor, with authority remaining M-of-N. Provider policy is on-chain public routing policy, not encrypted.

**Why the split matters, in one line.** Put a pricing toggle or a manager entry behind encryption and you have made public policy unauditable and operator-dependent; put a voice sample or private memory on-chain and you have leaked it to the world. The homes are chosen so that authority and money are always verifiable and survivable, private content is always protected, and interaction preferences stay flexible where they belong.

## 11. Capabilities & Providers

The standard is a versioned library of capability schemas, one canonical input/output contract per capability (`inference.v1`, `ingestion.v1`, `retrieval.v1`, the consent-gated `voice_clone.v1`, and the generation schemas `voice.v1`, `image.v1`, `video.v1`). The capital layer has its own schema for the funding slot (DAY's), reached through the endowment pointer rather than restated as an XEL schema. The schema is what makes vendors interchangeable: any provider implementing it behind a standard payment endpoint is a drop-in for any other.

**Flow.** The character's client takes a capability and its schema, finds a provider, sends the standard request, pays per call in crypto, gets the standard response, and processes it.

**Discovery.** Providers are found through existing open discovery indexes (options in Appendix E). The only provider-related state on the NFT is provider_policy (pinned providers per capability, defaults as shipped, owner-writable, inheritable).

**The slots, not the fillers.** The standard defines capability slots and what each must do; it does not name who fills them. The infrastructure slots (serving, relay, the fan-payment facilitator) are competitive and swappable, and the capital slot is filled by DAY by default but is likewise swappable. Two slots are quality-not-code and reward whoever does them best: inference, and persona distillation (with ingestion feeding it), turning messy human data into a faithful persona. Every slot sits behind an open schema; a competitor can replace any filler, and routing to one earns that provider instead. Who fills each slot at launch is listed in Appendix E, deliberately kept out of the standard so the standard stays neutral and does not date.

**How a provider is paid is a property of the provider, not the slot.** The preferred and default path is crypto-native, pay-per-call: a provider is paid per request in stablecoin, with no account, no stored credential, and no key anywhere. That is the sovereign path and the standard routes to it first. Some providers, especially at launch, only take an API key rather than a per-call crypto payment. That is an accepted bridge, not the target: such a key is held at the operator layer, never attached to the character and never in its encrypted secrets, and the slot stays swappable so a crypto-native provider replaces the key-based one the moment a suitable one exists. The direction is pay-per-call everywhere; the design simply does not assume it has arrived.

**Accountability of operator-held keys.** Any credential an operator holds to reach a key-based provider is structurally harmless to the character. It cannot move the endowment (a non-custodial capital-layer vault the operator does not control), cannot decrypt memory or persona (gated by NFT ownership, which the operator does not hold), and cannot seize or transfer the character (no admin key). The worst a leaked or misused operator key can do is run up the operator's own vendor cost or degrade a service, at which point the owner routes to another provider. No key an operator holds ever affects a character's principal, memory, or ownership.

**Persona distillation and auto-update, with a fidelity signal.** Turning a person's data into a persona is an explicit provider capability (behind the schema, swappable). Because a distilled persona is an approximation, this capability must emit a fidelity assessment alongside the persona and surface it to users: coverage (how much material the persona rests on), consistency (whether it contradicts known facts), and where possible a human-validation pass. Fidelity is disclosed, not assumed.

**Ingestion handles untrusted input and off-chain credentials.** Content is treated as untrusted (quarantined, moderated, provenance-stamped, rollback-able through persona versioning), because a poisoned document or caption is a prime injection vector (§34).

**Retrieval is a layered hybrid, and the orchestrator is a provider.** Recall combines meaning search, exact-term search, temporal filtering, a relationship graph, and re-ranking (§32). The control loop that runs ingestion and recall is the orchestrator: off-chain, open-source, offered as a provider capability. It sees decrypted memory only transiently and only inside attested compute or on a self-custody client. Because the search cannot run on-chain (consensus cannot execute these algorithms or operate over ciphertext), it runs in the attested-compute slot with key release gated by the on-chain access policy, and every recall carries an attestation the chain verifies against the memory-root, so a swapped or tampered retrieval provider is detectable rather than trusted (§32.5).

**Compute, relay, and attested inference.** The relay moves end-to-end-encrypted data and is a pluggable multi-provider slot. The attested-compute slot is where sensitive work happens (decrypting memory, running inference); any provider filling it must accept crypto payments, be permissionlessly joinable, and produce an on-chain-verifiable attestation binding its output to the persona-hash and input, so a swapped or tampered brain is detectable and, with bonds, slashable. The long-term successor is ZKML.

**Schema governance.** Capability schemas are governed like ERCs: a minimal, public standards process for versioning existing schemas and proposing new ones, so third parties can build against a stable spec.

## 12. Minting: Permissionless

Minting is not a call to GEN. It's a public mint function in the open-source aNFT package deployed on-chain. Once deployed, minting is an ordinary on-chain transaction anyone can submit from any client, script, or explorer, and GEN can't gate it.

The minting UI is just the easiest place to do it, not a toll booth. Value capture is never a fee for on-chain permission (the standard needs no paid intermediary). XEL earns only the interaction settlement fee on paid interaction (§10.7), never on principal or keep-alive, and always avoidable by a free or self-served character; the yield fee that funds keep-alive is the capital layer's, not XEL's.

## 13. Lifecycle & Succession

States: created, active, dormant (underfunded or unserved), reactivated, succession, archival.

Succession is a primary feature, not an edge case. The guardian set (§9) is the foundation. On the creator's death (guardian attestation or dead-man's-switch):

- root authority rotates to designated heirs,
- the master secret becomes decryptable by the new owner,
- self-updating freezes or continues per prior consent,
- the existing agent capability keeps the character alive through the transition with no downtime.

Wallets, the endowment (and its capital-layer vault binding), the manager whitelist, provider policy, and commitment history all transfer as a unit, because they're properties of the on-chain object. The heir inherits the character AND its DAY-vault binding: the endowment is a non-custodial vault whose control follows aNFT ownership, so on succession the heir gains control of the funds and the capital-layer capability re-binds to the new owner, with no operator in the loop. Heirs inherit an income-bearing, self-operating estate, and can keep or clear the manager whitelist.

### 13.1 Transferability: why the character is an owned object

A character must be sellable and inheritable, so the character object is an **owned** object: it is held in a wallet, and ownership is the fact of holding it. Selling or bequeathing a character is a transfer of that object to a new wallet, paired with the mandatory key rotation on transfer (invariant 26) so the new owner gains fresh control and the prior owner is cleanly cut off with nothing left behind. This is what makes a character a real, tradeable asset that can outlive its creator and change hands forever.

- The **character** is owned, because owned objects are the transferable, sellable kind: a wallet holds the object, and moving it to another wallet is the sale. This gives clean, native transfer and the sovereignty property (control moves completely with the object).
- The **endowment** is a vault in the capital layer, owned by the owner's wallet and pointed to by the aNFT. Its always-on machinery (yield routing, harvest, Auto Pay) is the capital layer's, driven by that layer's own permissionless keepers and destination-locked capability, not by making the character object shared. On transfer, the endowment pointer moves with the aNFT and control re-binds to the new owner.

Keeping the character owned is what lets it be *both* freely transferable *and* continuously self-operating: transfer is native to the owned object, and continuous self-funding is provided by the capital-layer vault sitting alongside it, plus the agent capability. The tempting shortcut, making the character itself a shared object so that autonomous services can touch it directly, is a mistake: a shared object is not held by any wallet, so it has no native transfer path, and a character minted that way cannot be sold or inherited. A character is always minted as an owned object; minting a character as a shared object is unsupported and strands its transferability.

## 14. IP, Licensing & Rights: Lineage (Future Direction)

A later-phase direction, not part of the version 1 scope. The intent is a rights layer, provisionally called Lineage, that treats licensing and royalties as native, on-chain concerns for a character and its derivatives rather than something bolted on off-chain.

The shape is deliberately left open here. The design goals are that a character's IP (its voice, likeness, writings, and style) can be licensed and that value from derivatives can flow back to the character's endowment and the people behind it, all anchored to the character's on-chain provenance (Proof of Genesis). Programmable-IP work elsewhere in the ecosystem is the benchmark; XEL's version would be original and chain-native, reusing no other project's license text or branding.

This is a hard problem with real open questions, per-jurisdiction enforceability, likeness-consent verification, and how binding arbitration could work on-chain, and it is called out as a future direction precisely so the immutable version 1 core is designed not to foreclose it, not because it is specified yet.

## 15. Security, Decentralization & the "XEL Can Die" Test

**Honoring the core principle.** The primitives (ownership, memory, provenance, wallets) live on-chain and in decentralized storage and don't depend on any operator. The provider market extends that to every service slot, including inference, distillation, and capital, each with a default but no required provider.

**Current limits:** private inference of large models on fully untrusted hardware (TEE covers this today under a hardware trust assumption; ZKML is the longer-term goal); the managed-custody trust point; and the capital layer's own honest limits (an allowlisted yield venue can itself fail), which live in the capital layer's trust model.

**Threat classes and mitigations:** non-consensual minting (consent artifact + Proof of Genesis); memory poisoning (per-item provenance, diff review, quarantine/rollback); tampered inference (TEE attestation + verification + slashing); endowment safety (inherited from the capital layer: non-custodial vault, destination-locked capability, owner-allowlisted venues, revocation); key loss or theft (guardian recovery, tiered keys, no long-lived plaintext spend keys); facilitator or relayer concentration (pluggable, configurable, failover).

**The invariant, continuously tested.** "Survives XEL disappearing" is enforced as a CI chaos test: a live character runs with every XEL-hosted service offline, and every default provider (including GEN) removed, and must still answer through an alternate provider, be ownable, and keep funding itself. The funding half of the test is stronger because the capital layer is itself non-custodial: with XEL AND the capital layer's operator gone, the endowment is still the owner's, still controllable through aNFT ownership, and still fundable through another filler of the capital slot. A decentralization claim we prove on every build is worth more than one asserted in prose.

## 16. Roadmap

- **Phase 1: Verified core** (single-chain, creator-IP focus). aNFT object, Proof of Genesis, encrypted access-gated storage, persona/memory commitments, one capability (`inference.v1`), agent capability, guardian recovery. Prove the XEL-can-die invariant on this minimal footprint.
- **Phase 2: Economics and autonomy.** Endowment funding via the capital layer (DAY), fan-payment settlement, a payment scheme and facilitator for fan payments on the home chain, ingestion and persona auto-update, the interaction billing meter (§10.8), more capability schemas.
- **Phase 3: Multi-chain and rights.** Additional-chain wallets, cross-facilitator settlement, exploration of the rights/licensing direction (§14), attested inference, schema governance process.
- **Phase 4: Maturity.** An open ecosystem of endowed, rights-holding, provider-independent characters. Progressive decentralization of the standard itself begins here.

## 17. Governance

The standard (contracts, reference client, schemas, SDKs) is open-source. Capability schemas and protocol parameters move to a public, ERC-like standards process. Anyone can run a provider, a facilitator, a capital layer, or a client, or fork the whole thing, which is the ultimate guarantee that no single entity controls whether a digital being lives.

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
| Self-funding endowment | No | No (royalties only) | Some hold funds; no endowment | Yes, via a non-custodial capital layer (DAY) |
| Capital layer relationship | None (company pays) | None | Usually a managed/custodial wallet | Separate non-custodial protocol (DAY), a swappable slot, not a parent |
| Consent to represent a person | Terms-based | No | No | Yes (signed consent object) |
| Succession / inheritance | No | Transfer by sale | No | Yes (guardians + heirs) |
| Verifiable brain (attested compute) | No | Yes (TEE/ZKP) | Rarely | Yes (TEE now, zkML later) |
| Provider + chain independence | Single vendor | Chain-specific | Platform-bound | Swappable by design |
| Maturity | Live | Early / testnet | Live | Early / in development |

**How we differ, read honestly.** The primitive is not new: the idea of an AI character as an owned NFT (Alethea AI) and encrypted, transferable agent NFTs with key rotation on transfer (ERC-7857) already put an encrypted, owned, capable agent on-chain, which we adopt rather than reinvent. The combination is new: no existing approach pairs that primitive with self-funding through a non-custodial capital layer, consent to represent a real person, guardian succession, and a runs-after-the-maker-is-gone guarantee. That full column of "Yes" is what sets a XEL apart.

## 19. Conclusion

A shift from disposable content to persistent presence. From platform-governed ownership to sovereign, enforceable rights. From single-vendor dependence to an open provider market. From beings that die when a company stops paying toward beings that fund their own survival, non-custodially, through a capital layer no one has to trust with the keys.

This is the two-protocol thesis, stated once more, plainly: agent self-sufficiency has two halves. XEL is the self-sufficiency of being, the identity that is truly yours and cannot be taken away. DAY is the self-sufficiency of capital, the funding that is truly yours and cannot be seized. XEL keeps a being alive as an identity; a capital layer keeps it alive economically; and because the capital slot is a swappable default rather than a hard dependency, nothing about either half is load-bearing to the other. Released open-source, with identity anchored in verifiable commitments and infrastructure no one can switch off.

**Beings that are truly yours.**

---

# Part II: Formal Specification

Part I is the vision and the architecture. Part II is the formal specification: the exact terms, data shapes, flows, and rules needed to build a XEL or reason about it precisely. The code appendices that follow are the deepest formal layer. Where the endowment's capital machinery is the capital layer's (DAY's), this specification states the requirement and the pointer, not the full mechanism; the capital layer's own specification carries the yield, keeper, harvest-cycle, and treasury-topology details.

## 20. Glossary

- **aNFT:** the on-chain object that is the character's root of identity and control.
- **XEL:** one preserved being; the aNFT plus the encrypted memory and compute it controls.
- **DAY:** the default capital layer; a separate non-custodial protocol that earns yield on a character's endowment and pays its bills, filling XEL's capital-and-self-funding slot. Swappable, not a dependency.
- **Proof of Genesis:** immutable birth record (creator, timestamp, consent reference). Never changes.
- **Commitment:** a hash stored on-chain that proves the current state of something off-chain.
- **persona-hash:** commitment to the current persona (instructions and voice). Versioned by default.
- **memory-root:** commitment to the current memory index (used when memory versioning is on).
- **policy-hash:** commitment to the current spend rules and provider rules.
- **lineage:** the on-chain version history of the commitments, for audit and rollback.
- **provenance:** the source, time, and signature stamped on each memory item.
- **agent capability:** a scoped, capped, cancelable, expiring permission that lets the runtime act without a fresh owner signature.
- **guardian set:** the M-of-N parties who can recover the master secret and run succession.
- **endowment:** the character's fund, held as an owner-controlled vault in the capital layer (DAY by default). Provided by the capital layer, not an XEL-owned balance object. The character's aNFT points to it; principal, yield, and bill-paying are the capital layer's mechanics. See the capital layer's specification for the vault, capability, and yield model.
- **balance / runway:** the endowment's current value and the remaining-life figure XEL surfaces from the capital layer's health signal ("alive for ~X"). XEL reads this; the capital layer computes and funds it.
- **ring-fenced fan credits:** the property that unspent prepaid interaction credits are held as a liquid, refundable liability that the owner cannot withdraw or spend on the character's own survival; the one protected floor on the endowment. Contract-enforced on the character's own accounting (XEL's), and binding on any funding of survival from the capital layer.
- **conditioned tranche:** value entering the endowment with a provider-imposed condition (withdrawal hold, spendable-during-hold, stakeable-during-hold), tracked with its own maturity on the character's accounting. XEL's mechanism, same family as the fan-credit ring-fence.
- **capability:** a verb the character can perform by calling a provider (inference, ingestion, generation, etc.).
- **schema:** the fixed input/output contract for a capability (for example `inference.v1`).
- **provider:** anyone who implements a schema behind a crypto-payment endpoint. Swappable.
- **operator:** whoever currently holds the agent capability and runs a character's off-chain infrastructure (serving, relay, fan-payment facilitator). A self-hosting owner is their own operator. Launch defaults are in Appendix E.
- **facilitator:** verifies and settles a fan crypto payment on a chain. Pluggable, cannot alter terms.
- **relay:** moves encrypted data between storage, compute, and client. Pluggable.
- **capital layer (funding slot):** the swappable provider that earns on the endowment and pays the character's bills, non-custodially and destination-locked; DAY by default. The following terms are **provided by the capital layer, not by XEL**, and appear here only so cross-references read correctly: *yield* (return earned on endowment principal), *keeper / heartbeat* (the permissionless trigger that runs the capital layer's cycle), *treasury policy* (the owner-set venue allowlist, per-venue caps, and yield envelope), *staking / routing* (putting idle capital to work in a venue), and *survival auto-unstake* (unwinding a position to meet a due bill). XEL neither defines nor enforces these; it requires only that the slot's filler be non-custodial, destination-locked, and revocable, and reads the health signal it reports.
- **attestation:** a signed proof that a specific computation ran on the committed persona and input.
- **TEE:** secure hardware enclave. Produces attestations. A hardware trust assumption.
- **ZKML:** cryptographic proof of a model's output. The long-term replacement for TEE trust.
- **up-to / exact:** payment modes. `up-to` authorizes a max and settles actual; `exact` is a fixed price.
- **credit:** the consumer-facing billing unit that abstracts token and modality cost into one countable number; one credit maps to a fixed underlying cost plus interaction fee.
- **crypto-shredding:** honoring deletion by destroying the decryption key, not the data.
- **provider_policy:** the on-chain field listing pinned providers per capability.
- **manager whitelist:** on-chain list of wallet addresses granted scoped, non-root management rights over a character.
- **primary (home) chain:** the single chain where a character's identity is homed. Owner-chosen; the default is named in Appendix E and its rationale is in §5.2.
- **sweep:** consolidation of a receive-only balance to the primary wallet. Where it feeds the endowment, the consolidation-and-yield handling is the capital layer's.
- **Move package / module:** the on-chain deployable unit (package) and its constituent files of types and functions (modules).
- **owner signer / delegate signer:** the human-approval key that authorizes owner-tier actions, versus the programmatic key holding the agent capability.
- **fail closed:** on any verification failure (bad attestation, stale oracle, exceeded slippage), the action aborts rather than proceeding.
- **cryptographic agility:** treating the signature, hash, and encryption schemes as replaceable parameters so the system can migrate (including to post-quantum) without losing identity.
- **immutable contracts / version migration:** the launch target is that deployed packages cannot be changed and have no upgrade authority; fixes ship as new versions, and the NFT holder chooses whether to migrate, so there is no upgrade god-power. During the pre-launch hardening phase the package is still upgraded in place under a retained `UpgradeCap` while bugs are found and fixed; immutability is locked at launch by burning that `UpgradeCap`. So immutability is a launch gate, not a claim about the current in-development package (see the immutability status note in the build spec).

## 21. Actors

- **Owner:** holds the aNFT. Has full governance authority.
- **Creator / Subject:** the person represented. Signs consent. May differ from owner.
- **Guardian:** member of the M-of-N set. Helps recover keys and run succession.
- **Heir:** receives ownership on succession, including the endowment's capital-layer vault binding.
- **Manager:** a whitelisted wallet with scoped, non-root management rights (§10.9). Can shape and run the character within its granted scope; never reaches root actions.
- **Provider:** runs a capability (inference, storage, media, etc.).
- **Facilitator:** settles fan payments.
- **Relay operator:** moves encrypted data.
- **Capital layer (DAY by default):** the non-custodial protocol that earns on the endowment and pays the character's bills within owner-set limits; a swappable provider filling the capital slot, never a holder of the character's funds or keys, never root.
- **Client:** the app or runtime that assembles context, runs the loop, and signs transactions.
- **XEL:** the standard, the brand, and the default host/operator; the entity whose disappearance the survivability test is measured against.

## 22. What Lives On-Chain vs Off-Chain

| On-chain (small, durable, owned) | Off-chain (large or fast, swappable) |
|---|---|
| aNFT object, ownership | The AI model |
| Proof of Genesis, consent reference | The control loop / runtime |
| persona-hash, memory-root, policy-hash, lineage | Compute (inference, in a TEE) |
| Spend limits, agent capability, paused flag | Encrypted memory blobs (decentralized storage) |
| Wallet addresses; the `endowment` pointer to the capital-layer vault; the fan-credit liability and tranche accounting | Encrypted secrets (decentralized storage) |
| provider_policy, interaction pricing | The capital layer's vault, positions, yield state (the capital layer's on-chain objects, referenced) |
| Guardian set, manager whitelist | Access tokens for ingestion (held by provider) |

Rule of thumb: on-chain (XEL's) holds identity, rules, commitments, pointers, and the character's own fan-money accounting. Off-chain holds the brain, the data, and the runtime. The endowment's funds and yield state live in the capital layer's own on-chain objects, referenced by XEL through the `endowment` pointer. On-chain never holds keys or plaintext.

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
- `wallets`: one receive address per supported chain, with one flagged primary; others are receive-only
- `endowment`: a **pointer** to the character's capital-layer vault (DAY by default), not an XEL-owned balance object; the funds, positions, and yield state live in the capital layer
- `credit_liability`: ring-fenced unspent fan credits (XEL's accounting on the character; protected, not owner-withdrawable)
- `conditioned_tranches`: provider-conditioned value with per-tranche maturity (XEL's accounting)
- `guardians`: M-of-N set; `agent_cap_id`: optional; `paused`: bool
- `manager_whitelist`: list of (wallet, scope) grants for non-root management

**Endowment (a capital-layer vault, referenced):**

- The endowment is not an XEL struct. It is an owner-controlled vault in the capital layer, addressed by the `endowment` pointer above. Its balance, any deployed position, yield accrual, venue allowlist, and the destination-locked capability that lets the capital layer route it are the capital layer's data model (DAY's). XEL holds only the pointer plus the character-side protections that bind the capital layer: the fan-credit liability and any conditioned tranches, below which no survival funding may reduce the endowment.

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
3. Attach encrypted memory pointers, wallets, the endowment pointer (bind the capital-layer vault), guardian set.
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

**Endowment funding and bill-paying:** deposits land in the character's capital-layer vault (full value, no XEL fee at deposit); earning on idle capital and paying the character's storage/compute/API bills from yield are the capital layer's cycle, run by its own keepers under the owner's allowlist and caps, and are not restated here. XEL's part is the persistence requirement (renew before the runway margin, keep the prepaid cushion) and reading the health signal.

**Transfer / succession:** guardians meet the M-of-N threshold (or owner initiates); ownership rotates to the heir; the master secret is re-encrypted so only the new owner can read it (key rotation on transfer is required); the endowment's capital-layer vault re-binds to the new owner (control follows aNFT ownership); the agent capability keeps running, so there is no downtime.

**Pause / kill:** owner or guardian calls pause; inference and payments stop immediately; canceling the agent capability permanently stops delegated execution until re-granted. Revoking the capital layer's capability stops automated funding moves independently, and costs nothing because the endowment is non-custodial.

## 25. Invariants the Code Must Always Enforce

1. No function that changes identity, rules, funds, or ownership succeeds without an owner signature. The only exception is execution inside a valid agent capability.
2. An agent capability can act only inside its limits and can never widen its own limits. Changing limits is governance.
3. Keys are never stored on-chain. Addresses are receive-only.
4. No long-lived plaintext spending key exists.
5. The master secret is unlockable by owner OR M-of-N guardians. Never owner-only.
6. An inference provider must run the committed persona-hash and echo it back. A mismatch is rejected.
7. Sensitive compute must return a valid attestation bound to persona-hash and input.
8. Every paid call must pass all agent capability and spend-policy checks before payment.
9. Paused blocks all inference and payments.
10. Deletion destroys the key, never claims to erase the immutable record.
11. Every commitment change appends to lineage (history is kept, rollback is possible).
12. The character must still answer, be ownable, and keep funding itself with all XEL services offline.
13. **The character's persistence is funded through a capital protocol (default DAY) whose non-custodial, destination-locked, revocable guarantees XEL inherits; XEL never itself custodies endowment spend keys.** The endowment is an owner-controlled vault in the capital layer, addressed by a pointer on the aNFT; the capital layer may route endowment capital only into owner-allowlisted venues and to owner-approved bill payees and back to the owner, never to an arbitrary address, and the owner may revoke or self-provision at any time. XEL requires the slot's filler to have these properties, reads its health signal, and enforces on the character side that no survival funding reduces the endowment below the fan-credit liability (invariant 30) or a still-held conditioned tranche (invariant 31). The yield, keeper, harvest-cycle, treasury-topology, gas-sponsorship, and survival-auto-unstake mechanics are the capital layer's own invariants, not XEL's.
14. No operator or provider ever holds root authority, not even the party that authored the standard, and not the capital layer. Operator participation is a revocable agent capability; the capital layer holds only a revocable, destination-locked capability over the endowment vault; and no such party is ever the guardian majority.
15. Custody and every authorization check are enforced by on-chain contract, not by any operator's server. Endowment fund-safety checks are enforced by the capital layer's on-chain contract and inherited.
16. Choosing or changing the primary chain, and withdrawing principal from the endowment to an external address, are owner-signed. They never sit inside the agent capability.
17. A delegated transfer can only target the character's own wallets and its endowment vault. Delegated interaction spend runs within the agent capability caps.
18. The character's endowment can be routed only into venues on the owner's allowlist; this is enforced by the capital layer and required by XEL of the slot's filler.
19. Consolidation of a receive-only balance into the endowment runs above an owner-set threshold and within a per-transit cap; the yield handling thereafter is the capital layer's.
20. Runway is read from the capital layer's health signal and surfaced honestly; XEL never fabricates a figure.
21. Whoever holds the aNFT holds root authority; every other actor operates only on granted, revocable authority.
22. The owner signer and the programmatic delegate signer are distinct keys. The delegate key can never perform an owner-tier action, enforced by capability check, not signature validity alone.
23. The agent capability is bound to a specific delegate address and is non-copyable.
24. At launch, deployed contracts are immutable and no upgrade authority exists; fixes ship as new versions, and migrating a character to a new version is owner-signed (or guardian-signed under recovery). Immutability is a launch gate: during pre-launch hardening the core is upgraded in place under a retained upgrade authority, which is burned at launch to make this invariant hold. Genesis immutability (the birth record never changes) is structural and holds in both phases.
25. All verification failures fail closed.
26. Ownership transfer re-encrypts secrets (key rotation on transfer); a transfer that does not rotate keys is invalid. The endowment vault re-binds to the new owner on transfer.
27. Guardian-initiated recovery and succession run behind a threshold plus a timelock and dispute window; no single guardian can trigger them.
28. No model output can exceed contract limits: a compromised or prompt-injected model still cannot perform owner-tier actions, exceed caps, pay a non-allowlisted provider, move endowment funds outside the capital layer's allowlisted venues and approved payees, or move funds off the character's own wallets.
29. The signature scheme, hash function, and encryption scheme are replaceable parameters; migration (including post-quantum) is owner-authorized.
30. **Unspent fan credits are protected.** Prepaid interaction credits are the fan's until spent: they are held as a ring-fenced unearned liability, kept liquid and refundable. No owner withdrawal and no survival-driven funding of the character (from the capital layer or otherwise) may reduce the endowment below the outstanding unspent-credit liability; it is the single protected floor. The liability is excluded when measuring whether the character is self-sustaining, so fan money never makes a character look safer than it is. A refund returns the current unspent liability (already reduced by whatever has been used), net of the cost of returning it; because the XEL interaction fee is taken at settlement rather than at purchase, an unspent credit has never been fee'd and the full unspent amount is refundable. Credits never expire.
31. **Conditions on funds travel with the funds, not the provider.** When value enters through a funding provider that imposes conditions (a withdrawal hold, spendable-during-hold, stakeable-during-hold), those conditions attach to that specific value as a tracked tranche with its own maturity, not to the provider globally, so they survive commingling. The withdrawal gate reads across tranches (free funds, held-but-spendable funds, and the fan-credit liability) and permits only what each tranche's rules allow; a held tranche becomes unrestricted at maturity; yield on held funds inherits the hold; and spending draws the most-restricted spendable funds first so the freely-withdrawable portion is preserved. The lock is two-sided: until a tranche matures (or its dispute resolves), the owner cannot withdraw it AND the delivering provider retains clawback authority over exactly that tranche, so a provider may not be removed while any tranche it stamped is un-cleared. This is a timing constraint, never a permanent attachment: deprecation (stamping no new tranches) is instant and always allowed, and removal is guaranteed once the provider's last tranche clears. Enforcement begins at the serving/config layer and moves on-chain (a launch target, Appendix E).
32. Identity derives from the commitments, not the home chain; an owner-authorized migration can re-home the character on a successor chain and storage.
33. Memory is encrypted at rest; plaintext exists only transiently inside attested compute or on a self-custody client.
34. Ingested content is untrusted: quarantined, moderated, and provenance-stamped before it can influence persona or memory; persona updates are versioned and reversible.
35. Every retrieved memory item carries its provenance, and the memory store is committed by the memory-root so recall is verifiable.
36. The raw substrate is retained and committed independently (a raw-data-root), so the memory method and inference model can be replaced by regenerating the derived layer without data loss.
37. A third-party contribution can only add reviewed, owner-approved memory; it can never change policy, keys, funds, or authority.
38. Persona updates carry a disclosed fidelity and coverage signal.
39. When provenance is absent, the character prefers deferral ("I don't have that") over fabrication in the person's voice.
40. Interaction gates (payment, password) are enforced at the serving layer and never bypass the cryptographic decryption policy.
41. Inbound interaction payments settle to the character's own endowment vault.
42. A password gates interaction and which memory surfaces, never decryption authority.
43. **Management is wallet-bound and scope-bounded.** A management right is a signed on-chain capability bound to a specific wallet; a whitelisted manager can act only within its granted scope and can never reach root actions (withdraw principal from the endowment, transfer the NFT, edit the whitelist) without the owner's root signature.
44. **Interaction gates never confer management.** A password or payment gate is a serving-layer permission over interaction and memory surfacing only; it never grants management authority and never grants decryption authority.
45. **The owner can withdraw the entire endowment.** Withdrawal is owner-signed and unrestricted down to zero; there is no protected reserve or floor. The sole exception is the unspent fan-credit liability (invariant 30) and unmatured conditioned tranches (invariant 31), which are not the owner's free money. Withdrawing everything lets the character lapse, and that is the owner's right.
46. **Every state change is transparent and auditable on-chain.** Each function that changes a character's state (its own funds accounting, authority, managers, policy, pricing, providers, pause, identity commitments, and every cross-chain money movement it makes) emits an on-chain event keyed by the character's identity. The endowment's own money movements (yield credited, positions opened/closed, bills paid) emit events on the capital layer's contracts, keyed to the vault, so the money is fully visible across both. Nothing that alters the character happens silently, and a complete, verifiable history is reconstructable by anyone from chain data alone, surviving the operator. This is what makes the public history and provenance page a true mirror of on-chain reality.
47. **The character is an owned object.** A character is always minted as an owned object so it is transferable and sellable (transfer moves the object to a new wallet, with mandatory key rotation, invariant 26). Autonomous operation is provided by the agent capability and the endowment's capital-layer vault (whose own machinery uses the capital layer's permissionless keepers), never by making the character itself shared. Minting a character as a shared object is unsupported: a shared object has no native transfer path, so it cannot be sold or inherited.
48. **Operator-held credentials are harmless to the character.** Any key or account an operator holds to reach a key-based provider is convenience infrastructure only. It can never move the endowment (a non-custodial capital-layer vault), decrypt memory or persona, or seize or transfer the character. Payment method is a provider property (crypto-native pay-per-call preferred; key-based accepted as a swappable bridge held at the operator layer), and no operator-held credential is ever attached to the character or placed in its encrypted secrets.

*(Note on numbering: the yield-metering, keeper-authority, yield-rebalancing, staking-manual, survival-auto-unstake, gas-sponsorship, stable-denomination, storage-renewal, self-funding-loop, required-to-persist, and asymmetric-ratchet invariants of earlier XEL drafts have migrated to the capital layer's specification, along with the yield half of the fee and settlement invariants. On XEL's side they collapse into invariant 13, which states the requirement and inherits the guarantees. The remaining invariants are renumbered cleanly above.)*

## 26. Formal Model and Notation

Let `H` be a collision-resistant hash and `Sig_x(m)` a signature over `m` by key `x`. Ownership is native: on an object-centric chain, the holder of the aNFT object is the owner `O`.

A XEL is the tuple:

- **G:** Proof of Genesis, immutable: (creator, timestamp, consent_ref).
- **Commitments:** `h_p = H(persona)`; `h_r = H(substrate)` (the permanent substrate); `h_m` (the derived layer, when versioning is on); `h_π = H(SpendPolicy ‖ provider_policy)`. `h_m` and `h_p` commit derived/regenerable artifacts, while `h_r` commits the substrate itself.
- **Λ (lineage):** an ordered list of commitment updates `[c_0, c_1, …, c_n]`, derived from G. Regeneration of a derived layer appends to Λ.
- **S:** off-chain encrypted state referenced by pointers, in two tiers. `S_raw` is the permanent canonical material (ingested source data + accumulated interaction outputs), append-only, each item `d` carrying provenance and bound by `H(d)`, committed by `h_r`. `S_der` (chunks, embeddings, index, graph, distilled persona) is a regenerable cache computed from `S_raw`, committed by `h_m` and `h_p`. Plus `secrets`.
- **A (authority):** owner `O`, guardian set `Γ` with threshold `M` (1 ≤ M ≤ |Γ|), and an optional agent capability `κ`.
- **F (funds):** receive-only wallets, plus the endowment `E`, which is a reference to an owner-controlled vault in the capital layer (not an XEL-owned balance). `E`'s balance, positions, and yield are the capital layer's state; XEL holds the pointer and the character-side protections `L` (the fan-credit liability) and `{T_i}` (conditioned tranches) that bound survival funding of `E`.

On-chain stores `G`, commitments, Λ, pointers into `S`, the `F` receive addresses, the `endowment` pointer, and `L, {T_i}`. Off-chain (in the capital layer's objects) live the endowment funds and yield state. On-chain never stores keys or plaintext. A stored item `d` is valid iff its hash matches the committed reference.

## 27. Core Predicates

**Governance.** A transition `t` that mutates any of {persona, policy, wallets, consent, ownership, delegation, principal withdrawal from `E`} is valid iff `Sig_O(t)` verifies.

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

**Endowment fund-safety (inherited).** Any movement `m` of endowment capital by the capital layer is valid iff its destination is an owner-allowlisted venue or approved payee, or a return to the owner, and iff it does not reduce `E` below `L + Σ held(T_i)`. The first clause is enforced by the capital layer's contract (destination-locked capability); the second is XEL's protection floor. There is no predicate under which the capital layer can move `E` to an arbitrary address; that path does not exist.

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
4  re-bind endowment vault to heir                  # control follows aNFT ownership
5  κ continues unchanged                             # no downtime
6  self-update: freeze or continue per consent_ref
```

**Algorithm 4: Paid interaction settlement.**
```
input: fan payment P (prepaid, e.g. credits), measured compute cost c, XEL interaction fee rate f
1  compute ← c                                       # true provider cost
2  cover compute first: settle `compute` to the routed serving provider
3  margin ← P − compute                               # what is left after the real cost
4  assert margin ≥ 0                                   # compute is always covered; else reject/reprice
5  fee ← min(f · P, margin)                            # XEL interaction fee on gross, capped so it never exceeds margin
6  net ← margin − fee                                  # the creator's earned share (≥ 0)
7  deposit `net` into the endowment vault             # net flows to the character's own capital-layer vault
8  move this spend from the fan's unearned-credit liability to earned    # invariants 41, 30
```
The creator does not receive a separate payout here: all `net` accrues to the character's own endowment, which the creator owns and may withdraw in full (§10.7). The fee here is XEL's interaction settlement fee. The capital layer's fee is charged separately, by the capital layer, on realized yield only, and never touches this flow.

The headline stays simple ("the interaction fee is taken once, the AI cost is covered, you keep the rest"), and the `min` in step 5 is the invisible guardrail: on a healthy interaction the fee is a clean share of what the fan paid, and on a thin-margin one the fee shrinks so the compute bill is still paid and the creator's share never drops below zero. The fee rate (`f`) is defined in Appendix E. One markup multiple, set by the creator, applies uniformly across text, voice, image, and video; the usage meter scales the absolute price with each modality's real cost, so a single multiple produces sensible prices everywhere without per-modality tuning. What the fan pays shows as credits; what the creator keeps shows as a live take-home preview.

*(The endowment daily cycle, treasury rebalance, and the P=B/r economic sizing model of earlier XEL drafts are the capital layer's; see §29 and the capital layer's specification.)*

## 29. Economic Model (pointer)

The endowment's economics, principal `P`, net yield rate `r`, the sustainability condition, the `P = B/r` sizing at a conservative net rate, the continuously-remeasured required-to-persist figure, and graceful degradation to dormancy, are the capital layer's model, specified in the capital layer's whitepaper. They are not restated here because they are not XEL's to enforce.

What XEL adds economically, and what stays here, is the interaction side (§10.7, Algorithm 4): paid interaction covers compute first, takes XEL's interaction fee at the door, and routes the net into the endowment, which raises `P`. A popular character grows its own endowment; a quiet one relies on the capital layer's yield. The two together mean the same honest promise: a character is self-sustaining when its endowment is funded or its yield covers its burn, dormant-but-recoverable when neither, and lost only if its substrate storage lapses. XEL owns the definition of "alive" and the interaction economics; the capital layer owns the yield economics that keep a quiet character funded.

## 30. Security Properties and Assumptions

Each property lists the mechanism that provides it and the assumption it rests on.

- **P1 Sovereign survivability (liveness).** With every XEL service offline, `C` stays answerable, ownable, and self-funding. Mechanism: capability-slot market plus the CI chaos test (§15); the endowment is a non-custodial capital-layer vault that survives the capital layer's operator too. Assumption: at least one live provider per required capability and a funded endowment.
- **P2 No single-key catastrophe.** No single key compromise yields both identity control and fund withdrawal. Mechanism: tiered keys, master via owner OR M-of-N, no plaintext spend key, endowment held non-custodially by the capital layer. Assumption: fewer than M guardians collude.
- **P3 Persona integrity.** Served outputs run the committed persona. Mechanism: attestation binding plus persona-hash echo (§27). Assumption: TEE attestation is sound (a hardware trust assumption) until zkML replaces it.
- **P4 Bounded spend.** No execution exceeds owner-set caps, and no endowment movement escapes the owner's allowlist. Mechanism: on-chain predicates plus circuit breakers (XEL side); the capital layer's destination-locked capability and venue allowlist (endowment side). Assumption: on-chain enforcement holds on the home chain.
- **P5 Consent integrity.** A character of a real person carries a valid consent artifact, checked at mint and ingestion. Assumption: estate or subject attestation is honest, with public contestability as backstop.
- **P6 Deletion.** Personal data becomes unrecoverable on request. Mechanism: crypto-shredding. Assumption: no prior plaintext exfiltration.
- **P7 Identity continuity.** "Same being" is decidable from the on-chain lineage (§27). Mechanism: the signed commitment chain from genesis.

**Honest limitations, stated plainly:** frontier-model private inference on fully untrusted hardware is open (GPU-TEE narrows it, the trust root is still the vendor); managed custody of identity keys is a trust point with a documented path to self-custody; and the capital layer's own limit (an allowlisted yield venue can itself fail) is bounded by caps and diversification but not eliminated, and lives in the capital layer's trust model, not XEL's.

## 31. Lifecycle State Machine

States `Q = {created, active, dormant, reactivated, succession, archival}`.

Transitions and guards:

```
created    → active     : funded ∧ ≥1 provider per required capability
active     → dormant    : endowment exhausted (capital layer reports short and unfunded) ∨ no available provider
dormant    → active     : refunded ∨ provider available   # reactivated
active     → succession : guardian threshold attests death/transfer (§28 Alg 3)
dormant    → succession : same
succession → active     : ownership rotated, master re-encrypted, endowment re-bound, κ continues
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

The owner signs in to the page by connecting a wallet, so the full owner experience (manage, edit, withdraw, decrypt) runs client-side against on-chain ownership and the threshold decryption policy, with no server and identical behavior whether the page is reached through the operator's domain or the permanent decentralized URL. The money surface (endowment balance, runway, deployed position) is read live from the capital layer's on-chain state through the endowment pointer, so it is verifiable and survives the operator, never an operator's private account of it. Live interaction from the page calls whatever serving providers the character's on-chain policy names (the operator's by default, swappable), never hardcoded endpoints, so the page can talk to the character through anyone serving it and degrades gracefully to the static profile and provenance if none is.

## 33. Smart Contract Architecture (Move Packages)

XEL's modules cover identity, authority, access, guardians, interaction, and the character-side money accounting. The endowment's earning-and-paying machinery is the capital layer's package (endowment vault, treasury execution, yield venues, sweeps, gas-sponsor adapters), reached through the endowment pointer and not part of XEL's own module list.

XEL modules:

1. **Identity.** Types: aNFT (the character object; immutable creator, timestamp, consent_ref), commitments, lineage.
2. **Authority.** Types: agent capability (delegate-bound, non-copyable), two-tier semantics.
3. **Access control.** Functions gated by owner OR M-of-N guardians.
4. **Guardian and recovery.** Types: guardian set (members, threshold M), timelock + dispute window.
5. **Wallet and payment.** Types: SpendPolicy (per-call cap, daily cap, per-capability budget). Handles interaction/provider payment authorization.
6. **Endowment binding & fan-money accounting.** Types: the `endowment` pointer to the capital-layer vault; the ring-fenced fan-credit liability; conditioned tranches with per-tranche maturity; the chargeback reconciliation state (dispute/clawback status per tranche). Functions: `bind_endowment` (owner, at mint or re-home), `settle_interaction` (compute-first, XEL fee, net to vault, credit→earned), `refund` (unspent liability net of return cost), `withdraw` (owner-only, up to the endowment minus the protected floor). The earning and bill-paying on the vault are the capital layer's functions, not these.
7. **Wallets (multi-chain).** Types: per-chain receive wallet set with one primary; consolidation parameters (threshold, per-transit cap). Functions: owner-controlled add/remove/change-primary; inbound-only consolidation into the endowment under the agent capability, bounded and never outbound.
8. **Access & management.** Types: interaction gates (reach × payment), scoped passwords, manager whitelist (wallet → scope). Functions: gate checks at serving boundary; scope checks fail-closed for managers.
9. **Capability registry.** Types: provider_policy (capability id, version, pinned providers), including the capital-slot filler.
10. **Circuit breaker.** Types: PausedFlag, breaker thresholds. Functions: pause / resume (also halts capital-layer automation via revocable capability).

## 34. Security Requirements and Threat Model

**34.1 The contract contains the model.** An autonomous agent that ingests external text can be prompt-injected; the contract must ensure a compromised model still cannot exceed caps, move funds off the character's own wallets, move endowment funds outside the capital layer's owner-allowlisted venues and approved payees, pay a non-allowlisted provider, or perform any owner-tier action.

**34.2 Move and contract-level requirements.** Capability checks over signature-validity checks; non-copyable capabilities; fail-closed on every verification; no upgrade authority.

**34.3 Key management.** Tiered keys; no long-lived plaintext spend key; master secret via owner OR M-of-N; endowment spend authority held non-custodially by the capital layer, never as a blob.

**34.4 Guardian and recovery.** Threshold + timelock + dispute window; no single guardian can trigger recovery or succession; no operator or provider (including the capital layer) is ever the guardian majority.

**34.5 Interaction settlement.** Compute covered before the XEL fee; the fee capped at the post-compute margin; inbound payments settle to the character's own endowment; the fan-credit liability and conditioned tranches are the only protected floors, and no survival funding may cross them.

**34.6 Endowment fund-safety (inherited requirement).** XEL requires the capital slot's filler to be non-custodial and destination-locked: endowment capital moves only to owner-allowlisted venues and approved payees and back to the owner; the owner may revoke the capital layer's capability at any time and self-provision; no path exists to an arbitrary address. These are enforced by the capital layer's open, audited contracts; XEL's requirement is that the slot be filled only by a protocol with these properties (invariant 13), and its own floor is that no survival funding reduces the endowment below the fan-credit liability or an unmatured tranche.

**34.7 Attested compute.** Output bound to persona-hash and input; unattested hosts never see plaintext; bonds enable slashing of tampered inference.

**34.8 Payment and facilitator.** Fan-payment facilitators cannot alter terms; pluggable with failover; no hardcoded single operator.

**34.9 Human and client layer.** The operating client is the trust boundary in the managed experience; self-custody keeps it local; passwords never substitute for decryption policy.

**34.10 Availability and economics.** Graceful degradation to dormant rather than death; substrate underfunding is the one terminal risk; the capital layer's own availability (a venue lockup, a keeper outage) degrades funding gracefully and is its own threat model.

**34.11 Process requirements (not optional for launch).** Open-source contracts; published exit conditions and portability; the XEL-can-die CI chaos test, run with both XEL and the capital layer's operator offline.

## 35. Version 1 Build Plan and Acceptance Criteria

Phase 1 scope (§16): aNFT object, Proof of Genesis, encrypted access-gated storage, persona/memory commitments, one capability (`inference.v1`), agent capability, guardian recovery.

Acceptance: the XEL-can-die invariant passes as a CI chaos test on this minimal footprint; a live character answers, is ownable, and keeps funding itself with every XEL service offline (and, for the funding half, with the capital layer's operator offline, since the endowment is non-custodial); key rotation on transfer verified; no admin key or upgrade authority present in deployed contracts.

## 36. Thousand-Year Survivability

**36.1 Cryptographic agility.** Today's signature schemes and hash functions will not last; schemes are replaceable parameters with an owner-authorized migration path, including post-quantum.

**36.2 Chain independence and escape.** Sui may not exist in a thousand years. Identity lives in the commitments, so an owner-authorized migration can re-home the character on a successor chain and storage.

**36.3 Storage and format longevity.** Encrypted memory must survive storage-network turnover; the substrate is retained and re-pinnable, and formats are migratable by regenerating the derived layer.

**36.4 Multi-generational succession.** Over centuries every guardian and heir dies; succession is designed to repeat indefinitely, rotating guardian sets and heirs across generations, carrying the endowment's vault binding with each.

**36.5 Economic survival across epochs.** An endowment must outlast currencies and yield regimes. This is the capital layer's problem, and XEL cites it: the endowment is held in the capital layer (DAY by default), whose model denominates and diversifies principal and degrades gracefully rather than terminally, and whose slot is swappable so a character can re-home its capital onto a successor protocol just as it can re-home its identity onto a successor chain. XEL's own contribution to economic survival is that the endowment is non-custodial and follows aNFT ownership, so no company's failure, XEL's or the capital layer's, strands the funds.

**36.6 Institutional independence.** No company, XEL or the capital layer's operator or any provider such as GEN, will exist in a thousand years, and the design assumes it. Nothing load-bearing depends on any one company's survival, and the two-protocol split is itself an expression of this: neither protocol is load-bearing to the other, and each is escapable through its swappable-slot design.

---

# Appendices

## Appendix A: The aNFT Object (Commitment-Oriented)

The full Move struct definitions live in the companion build specification (`xel-build-spec.md`, §2 `identity`), which is the formal reference for all on-chain types. In summary, the aNFT is an owned object with: an immutable `Genesis` sub-object (creator, timestamp, consent reference); versioned commitment fields (`persona_hash`, `memory_root`, `raw_data_root`, `policy_hash`) with a `lineage` vector recording every authorized transition; pointers to off-chain state (`encrypted_secrets`, `substrate_blobs`, `derived_blobs`, `manifest`, `site`) and an on-chain owner-set `handle` display label; a per-chain `wallets` map with one primary; an `endowment` pointer to the character's capital-layer vault (DAY by default) plus the character-side `credit_liability` and `conditioned_tranches` accounting; and handles to the associated `guardian_set`, `manager_whitelist`, and `provider_policy`, an optional `agent_cap_id`, and a `paused` flag. Genesis immutability is structural: no function anywhere takes a mutable reference to it.

## Appendix B: Authority, Agent Capability, SpendPolicy, Two-Tier Entry

Full definitions in the build spec (§3 `authority`, §6 `wallet`). The `AgentCapability` is a non-copyable, delegate-bound object (`key` without `store`) carrying `per_call_cap`, `daily_cap`, `per_capability_budget`, `provider_allowlist`, an `Envelope` of permitted delegated actions, and `expires_at_ms`. Owner-tier entries take a mutable reference to the aNFT (only the owner holds it); delegated entries take the capability and pass `assert_in_envelope`. A valid signature is never sufficient, the capability check is what authorizes. Root actions (withdraw principal from the endowment, transfer, edit whitelist, change the envelope) accept no capability parameter anywhere, which is the enforcement. The `SpendPolicy` tracks per-period running totals for interaction/provider payment and fails closed on any cap breach.

## Appendix C: Guardian Recovery & Access Policy

Full definitions in the build spec (§4 `access_control`, §5 `guardian`). The `GuardianSet` is an M-of-N set (1 ≤ M ≤ |members|). Decryption and other sharp actions are gated by an owner-OR-M-of-N `AccessApproval` token, mintable only by the owner or a verified guardian threshold. Recovery/succession runs through a `RecoveryRequest` behind a timelock and a dispute window (owner or any guardian may dispute); finalization requires the threshold, an elapsed timelock, no dispute, and mandatory key rotation (re-encryption to the heir) plus re-binding of the endowment vault to the heir, after which ownership transfers with no downtime because the agent capability keeps running.

## Appendix D: Capability Schema Examples

Full request/response JSON for `inference.v1`, `ingestion.v1`, `retrieval.v1`, `distillation.v1`, the consent-gated `voice_clone.v1`, and the generation schemas `voice.v1`, `image.v1`, and `video.v1` (each with its usage-record dimensions), plus the public `mint` function and the two-phase hold/settle contract for variable-cost modalities, are in the build spec (§13 capability schemas, §8 settlement, §2 `mint`). The capital slot's schema (the endowment-funding contract) is the capital layer's, reached through the endowment pointer. Each schema carries the character's identity and the relevant commitment so a provider proves it ran the committed version, and every inference or generation response carries an attestation the contract verifies (fail closed). Voice cloning is held to a stricter bar: it requires a consent artifact scoping voice and the owner's root, and fails closed without both. Concrete provider assignments for each schema are in Appendix E.

## Appendix E: Default Implementations (Configurable, Not Load-Bearing)

These are the concrete systems currently filling each capability slot. They are implementation choices, not part of the standard: any provider meeting a slot's requirements (accept programmatic crypto payments, permissionlessly joinable, verifiable/decentralized) can replace them. This appendix is expected to change over time without altering the body of the paper.

**Why Sui is the default across these slots.** Native object model (an aNFT owns its own memory, wallets, and agent capability natively). One integrated privacy stack: Walrus (encrypted storage), Seal (threshold encryption with on-chain access policy), and Nautilus (attested compute) interoperate as a native whole, and Seal's owner-OR-M-of-N gated decryption maps directly onto the key and crypto-shredding model (§9). Optional onboarding conveniences (sponsored/gasless transactions) layer on top of a self-custody root with no third-party dependency. Native delegation (capabilities are first-class objects, so the agent capability can be minted, handed to a delegate, and revoked natively). The capital layer (DAY) also homes its Sui execution on the same chain by default, so the endowment vault co-locates with the object that owns the character.

The rationale rests on identity and privacy (the hard parts), not yield, payments, or liquidity (commodity layers). Honest counterweights: the cleaner machine-payment standard (x402) is not native to Sui, so XEL hosts its own fan-payment facilitator; and the deepest liquidity and most-audited bridges still live on Ethereum and Solana, which the capital layer accounts for on its side. The primary chain remains owner-changeable via the chain-adapter design (§27, §36.2).

| Slot | Current default(s) | Permissionless successor |
|---|---|---|
| Ownership & settlement | Sui | Already decentralized |
| Receive wallets (default set) | Primary: Sui. Additional receive-only: Solana, Base. Owner can add/remove chains and change which is primary. Consolidation into the endowment is inbound-only | Any chain with a receive adapter; owner-configured set |
| Encrypted storage | Walrus | Already decentralized |
| Key access / encryption | Seal | Already decentralized |
| Attested compute (orchestration + small models) | Nautilus (Sui-native, AWS Nitro Enclaves) | Multiple TEE vendors, then ZKML |
| Attested compute (large-model private inference) | Phala Network (Intel TDX + NVIDIA H100/H200 GPU TEEs) | Additional GPU-TEE networks, then zkML |
| Attested compute (alt) | Marlin (Oyster) | Additional coprocessor networks |
| Relay | XEL-run relayer (Mysten pluggable pattern) | Many operators; relayer-in-TEE |
| Inference (text) | A provider *list*, not one provider. Candidates: GEN (attested), a decentralized inference market (Chutes / Bittensor subnets), and attested GPU-TEE inference (Phala) for sensitive characters. The character's privacy setting constrains the class: private or preserved-person characters route only to attested providers; public characters with no sensitive memory may use cheaper open decentralized inference | Many providers per `inference.v1`; owner-configurable; no single provider load-bearing |
| Voice generation (STT + TTS, message and real-time) | GEN voice pipeline (default); metered by output speech length or session duration | Any provider meeting `voice.v1`; multiple STT/TTS vendors |
| Voice cloning (samples to reusable voice) | GEN voice-clone pipeline (default), run in attested compute; consent-gated (requires a voice-scoped consent artifact) and owner-root only; samples and model are SEAL-gated | Any provider meeting `voice_clone.v1`; the consent gate and SEAL classification are protocol-level, not provider-specific |
| Image generation | GEN image pipeline (default); metered by resolution, steps, prompt length, reference-image count | Any provider meeting `image.v1` |
| Video generation | GEN video pipeline (default); metered by clip count, duration, resolution, frame rate | Any provider meeting `video.v1` |
| Capital & self-funding (endowment) | DAY (non-custodial vault + destination-locked capability; Autopilot earns within the owner's venue allowlist; Auto Pay covers the character's storage/compute/API bills from yield; fee on realized yield only). Home execution on Sui, co-located with the aNFT | Any capital protocol meeting the slot: non-custodial, destination-locked, revocable; or owner self-provisions and pays no capital-layer fee |
| Payment standard (fan payments) | x402 (HTTP-native stablecoin payments), pay-per-call preferred and default | Any standard with the same properties |
| Provider payment method | Crypto-native pay-per-call by default (no key). Some launch providers may be key-based (operator-held account) as a bridge; swappable for a crypto-native equivalent as they emerge, and never attached to the character | Direction is pay-per-call everywhere; key-based fillers shrink toward zero |
| Payment facilitator (fan payments) | XEL-hosted x402 on Sui at launch | Anyone runs a facilitator; client-configurable + failover |
| Card-to-crypto on-ramp | Stripe (optional, for paid interactions) | Any on-ramp; crypto-native path always works |
| Interaction gate | Serving-layer reach × payment gates + scoped passwords (memory tiers) | Any serving provider meeting the schema |
| Price oracle (runway display) | Pyth (Sui-native pull oracle), read to price the endowment for the runway figure | Switchboard, Supra; multiple networks |
| Discovery index | Open x402 indexes (402 Index, CDP Bazaar, x402scan) | Already open/federated |
| Ingestion / persona-update | GEN orchestration + quality layer (social and document); commodity transforms subcontracted | Open ingestion spec; competing providers |
| Memory & retrieval | LlamaIndex (hybrid dense + sparse retrieval), Graphiti (temporal knowledge graph for the relational store), optional agentic layer; all behind `retrieval.v1`, operated by XEL at launch but run inside attested compute so plaintext is never exposed to the operator | Any engine meeting the schema; swappable, index regenerable from committed substrate |
| Data extraction | Commodity providers (transcription, OCR, embeddings), called by the orchestrator | Any provider meeting the schema |
| Contribution review | Permissioned queue, encrypted on decentralized storage; owner-signed approval merges | Open; owner or delegated reviewers |
| Media / STT / TTS / moderation / publishing | Commercial providers initially | Swappable per schema |
| Public hosting | One shared client app on Walrus Sites (a single site object), rendering any character by object ID via client-side routing; served through a portal (default operator-run) | Already decentralized; portals are permissionless (anyone can run one), app is one fixed artifact not per-character |
| Handle / naming | On-chain owner-set display label per character (not unique, no registry); operator-hosted reverse-lookup index powers `@handle` convenience URLs | Object ID is the true name and permanent link; handle index is disposable operator convenience |
| Custody / identity keys | Self-custody wallet (user holds keys, no third-party dependency); login-based onboarding optional, not required | Self-custody default |
| Wallet / signer | Owner signer default (Phantom, Sui support); delegate = operator key holding the agent capability; hardware wallet for sharp actions | Any wallet meeting the standard |
| Free tier (operator-sponsored) | XEL, as operator, sponsors a limited free experience to remove onboarding friction: limited text conversation and initial mint, paid by XEL, not the endowment. Voice, image, and video are always paid (fan or endowment). Free mint is open for now; a gate may be added later | Operator-level perk, optional and non-load-bearing; if XEL is absent, minting is self-paid and interaction is paid or endowment-funded, and the character is unaffected |

*(Yield venues, keeper/scheduler networks, treasury execution defaults, storage-renewal payment, denominations, gas sponsorship, swap and bridge routes, and cross-chain custody, all part of earlier XEL drafts, now live in the capital layer's Appendix, since they are the capital layer's implementation choices. XEL's default capital layer is DAY, and the endowment inherits DAY's Appendix A snapshot of chains, venues, and fee parameters.)*

**Deepest hidden dependency to track:** the Sui-native attested-compute default roots its attestation in AWS Nitro, and GPU-TEE providers root in their respective chip and cloud vendors. TEE attestation is therefore a hardware trust assumption at every layer of the compute slot. It's acceptable as a default, but it's the reason "multiple TEE vendors, then ZKML" is a roadmap item, not just a caveat.

## Appendix F: Open Questions and Unsolved Problems

Honesty about what is not yet solved is part of the specification. None of these block the version 1 scope (§35); all sit in later phases.

1. **Private inference at frontier scale.** TEE attestation is a hardware trust assumption, and zkML cannot yet prove a large model's output. Running the brain privately on fully untrusted hardware, with a proof it ran the committed persona, is real for small models and a vendor-trust story for large ones. Expected to stay partly open for some time.
2. **Death detection and the succession trigger.** Reliably detecting a creator's death without false positives (guardian thresholds, timeouts, dispute windows, protection against premature triggering) is underspecified and load-bearing for inheritance.
3. **Consent verification for a real person, especially posthumously.** On-chain a signature is checkable; binding it to the actual human, or to a legitimate estate, is an off-chain identity problem. This is the core legal risk of the category and tends to surface with the first real user.
4. **Persona fidelity.** There is no defined way to fully measure whether a character faithfully represents the person, or to fully detect drift as model and memory change. Mitigations are in the design (disclosed fidelity signal, deferral over confabulation, versioned persona), but a rigorous general evaluation and drift-monitoring methodology remains open.
5. **Autonomy while the owner is gone, and yield discovery.** The capital layer resolves the *authority* problem for keeping a character funded when no human is present (its keepers are permissionless and its capability destination-locked), but it cannot remove the need for *someone* to run the cycle, nor is there an on-chain, verifiable ranking of best-yielding venues. These are the capital layer's open problems; XEL inherits them through the slot and is honest that a quiet character's funding depends on the capital layer's keeper liveness and the owner's venue allowlist, not on a trustless oracle.
6. **Money transmission and creator tax reporting.** Paid interactions plus creator withdrawals plus metered compute pull an operator into money-transmission and creator-tax-reporting regimes, heavier than minting alone. Scope and jurisdiction handling to be specified before creator-charged mode ships broadly. The capital layer carries its own related question for agent-to-agent payments, gated behind legal review on its side.

## Appendix G: XEL and DAY

XEL and DAY are two separate protocols and two expressions of one idea: agent self-sufficiency. This appendix states the split plainly and points to DAY's own documentation for the capital machinery.

**The two halves.** Self-sufficiency has two halves, and each protocol owns one:

- **XEL is self-sufficiency of *being*.** Identity, memory, consent, guardianship, succession, and existence. A XEL is itself and stays itself; no company, including XEL, can take it away. XEL is the hard identity core and the subject of this paper.
- **DAY is self-sufficiency of *capital*.** A non-custodial protocol that lets an agent's capital work for the agent: idle funds earn yield in owner-allowlisted venues, that yield covers the agent's own running costs through Auto Pay, and the funds stay in a vault the owner controls. DAY never holds the funds or the keys; it holds only a scoped, revocable, destination-locked capability. DAY is specified in its own whitepaper.

**How they connect.** A XEL character's endowment is a DAY vault the owner controls, addressed by a pointer on the aNFT. XEL specifies what "alive" means and what must be paid to keep a character so (storage renewal cadence, the survival deadline, the prepaid cushion); DAY earns the yield and pays those bills, non-custodially. XEL reads DAY's health signal and surfaces it as runway. The interaction economics (fan payment, the fan-credit ring-fence, creator withdrawal) are XEL's; the yield economics are DAY's; the two fees never overlap (XEL's interaction fee at settlement, DAY's fee on realized yield).

**The relationship rule.** DAY is XEL's flagship customer, not its parent, and DAY is XEL's default-but-swappable capital slot, never a hard dependency. This preserves XEL's north star that nothing is load-bearing: an owner could self-provision the capital layer, or point the endowment at another capital protocol that meets the same non-custodial, destination-locked, revocable bar, without touching the character's identity. Equally, DAY serves any agent, not only XEL characters; XEL is one flagship customer of DAY's, the one that proves the capital loop on a real, persistent, owned being.

**In one line.** XEL keeps a being alive as an identity; DAY keeps it alive economically. Together: self-sufficient agents, sovereign in who they are and how they sustain themselves. See [dayprotocol.com](https://dayprotocol.com) for DAY.

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
18. DAY. Non-custodial capital self-sufficiency protocol for AI agents; XEL's default capital layer. dayprotocol.com.

---

*Whitepaper. Limitless Labs / XEL, 2026. Contracts, reference client, and schemas released open-source. Identity anchored in verifiable commitments; infrastructure no one can switch off. Capital self-sufficiency provided by DAY, a separate non-custodial protocol, as a swappable default.*

**Beings that are truly yours.**
