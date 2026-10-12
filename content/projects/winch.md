---
description: 'How I set up WINCH’s business and carrier platforms, moved its back end into more than fifty domains, built generic engines for notifications, exports and security, and an integration engine for every outside platform.'
---

## Overview

WINCH is a logistics platform in Saudi Arabia. Businesses use it to move dry, refrigerated and palletised goods and vehicles, to rent trucks with or without a driver and to store goods; carriers use it to run their fleets, trips and deliveries. It reaches people through a business app and dashboard, a carrier app and dashboard, a driver app and a control panel for WINCH's own teams, all served by one back end. I joined in 2023 as a senior software engineer.

## The problem

When I joined, the back end already ran WINCH's own operations, but four things were missing.

- **No business or carrier platform.** Businesses and carriers had no apps or dashboards of their own. They needed their own APIs, permissions and screens on top of the same orders, documents and money.
- **A structure that could grow.** Most of the code lived in one folder with blurred boundaries, so every change touched more than it should. It had to move into domains, and stay clean as the team and the product grew.
- **Core features solved again and again.** Notifications, exports and security were handled inside each feature, each in its own way, instead of by one engine everything could use.
- **No common way to integrate.** WINCH talks to many outside platforms: government services, payment gateways, messaging providers and AI models. Each was wired in differently, with no shared configuration and no record of what was sent and received.

## The solution

::sketch-figure{name="winch/before-after" alt="Before: features such as orders, invoices, waybills and drivers wired directly to vendors in a tangle of lines. After: more than fifty domains behind contracts sit on four shared components (security, notifications, exports and integrations), and only those components reach the outside platforms."}
Features stopped talking to vendors directly; shared components do it for them.
::

**The business and carrier platforms.** I set up the APIs behind the business app and dashboard and the carrier app and dashboard, and built the business dashboard itself, so businesses order and follow their shipments and carriers run their trips, drivers and earnings in tools made for them.

**Domains that stay clean.** Together with the team I moved the back end into more than 50 domains, each with a contract the others call, and I keep the structure consistent through the rules everyone follows and the reviews that check them.

**Core features as generic engines.** Notifications, exports and security each became one engine that every feature uses, so a new message, a new export or a new kind of user is a small addition instead of new plumbing.

**One engine for every integration.** Every outside platform is now an *app*: configured in one place, called through one pipeline and recorded call by call. The integrations themselves are written by the team; the engine makes each one small, predictable and safe to add.

## What I did

- Set up the business and carrier platforms: their APIs, and the business dashboard, which I set up in 2023 and have written most of since.
- Designed and built the notification system, the security domain and the foundation of the export system.
- Designed and built the integration engine and moved the existing integrations onto it, so the team now adds a platform by writing an app.
- Evolved the Domain-Driven Design structure the back end follows, with typed DTOs, contracts, services and actions, a panel per app and a shared kernel, and led the move of the legacy code into it, mentoring engineers along the way.
- Proposed the shared UI package both dashboards use, led its extraction and maintain it.
- Set up the team's AI-assisted workflow: the rules coding agents follow, the agents that scaffold, review and refactor, and the engineering handbook that teaches the same rules to people.
- Lead small teams that take features to production, and review the pull requests that keep the structure consistent.

## What it offers

::feature-grid
---
items:
  - icon: lucide:package
    title: Orders from request to delivery
    text: Businesses create orders one by one or in bulk from a spreadsheet, and follow each one in real time.
  - icon: lucide:receipt
    title: Clear pricing
    text: Quotations or fixed prices, with the cost of every trip broken down.
  - icon: lucide:folder-open
    title: Documents in one place
    text: Contracts, invoices, delivery notes and proofs of delivery, attached to the order they belong to.
  - icon: lucide:landmark
    title: Government paperwork built in
    text: Electronic waybills and driving authorisations issued from the dashboard, and e-invoices to ZATCA's standard.
  - icon: lucide:truck
    title: Carrier operations
    text: Carriers assign drivers and vehicles to orders and follow every trip's route, load and status.
  - icon: lucide:wallet
    title: Earnings and finance
    text: Statements, compensation requests, and wallet top-ups and withdrawals.
  - icon: lucide:plug
    title: An API for businesses
    text: Companies connect their own ERP and systems to WINCH through an API.
  - icon: lucide:key-round
    title: Team access
    text: Several users per company, each with the permissions of their role.
---
::

## System design

::sketch-figure{name="winch/architecture" alt="Architecture: the business, carrier and driver apps and the control panel call one back end. It has an API for each app, domains behind contracts, and four shared components: security, notifications, exports and the integration engine. The engine connects to government services, payments, AI models and messaging through one pipeline. Behind it sit the database, queues and a scheduler, and a live tracking server."}
Every app talks to one back end, and only the integration engine talks to the outside world.
::

One back end serves every app, with an API for each. Underneath are the domains and the four shared components. Queues carry the work nobody should wait for (notifications, exports and other heavy jobs), a scheduler runs the recurring tasks, and live tracking runs on its own real-time server.

### The business and carrier platforms

::sketch-figure{name="winch/frontend" alt="One front-end codebase with business, carrier and shared pages is built twice, into the business dashboard and the carrier dashboard, both served from a CDN. A shared UI package of inputs, tables, forms and cards feeds the codebase, and permissions decide every route, menu item and button."}
One codebase, two products, and a shared component library underneath.
::

Each platform has its own API and permissions on top of the same domains. The two dashboards share one front-end codebase and a shared UI package, so a fix or a new component reaches both products at once, and an open tab picks up a new release cleanly.

### Moving to Domain-Driven Design

::sketch-figure{name="winch/ddd" alt="Inside every domain: presentation, then a contract that is the only public door, a service that delegates, actions that do one job each, and models. Another domain calls the contract but never the models. Two charts show the legacy folder emptying over time while the number of domains grows."}
The legacy folder emptied while the product kept shipping.
::

Every domain has the same layers and a contract as its only public door, so one team can change a domain without breaking another. When I joined, only a few domains existed; the team moved the legacy code domain by domain without pausing the product, and the same rules keep new code in its place.

### Notifications, exports and security

**Notifications.** One call sends a message on any channel (push, in-app, email, SMS, WhatsApp or Telegram), in the user's language and by their preferences, and a broken message is stopped before it goes out. A new message is now a template, not new code.

**Exports.** Any list can be exported to Excel, PDF or ZIP in the background, and a new export only describes its columns. I built the foundation, and the team has grown it across the platform.

**Security.** One security domain serves every kind of user: login in steps with one-time codes, limits on sensitive actions, sessions that can be revoked, and support access that needs a code of its own.

### The integration engine

::sketch-figure{name="winch/integration-engine" alt="The integration engine: domains and the payment and AI gateways call it. An app registry holds each app's switch, development mode, logging, encrypted settings and rate limits. Every call goes through one pipeline (app active, within limits, run and time it, record it) into a transaction ledger, over a shared HTTP transport. On top sit the apps for government services, payments, AI models, messaging, and maps and tracking."}
Every platform WINCH talks to is an app in one engine, and every call it makes is recorded.
::

Every outside platform is an app in one engine, with its own settings, limits and a record of every call. For the team, adding a platform means writing a small, predictable app instead of new plumbing. For operations, every call can be traced, and an app can be switched off or limited without changing code.

## AI in the engineering workflow

::sketch-figure{name="winch/ai-workflow" alt="An engineer asks a coding agent for a feature, a fix or a review. The agent loads a project guide first, then only the topic rules in play, then the guide for a layer when a file in it opens. Agents with one job each scaffold, review, audit, build UI and integrations, simplify and rename. The result is a change in the domain structure, formatted after every edit and reviewed against the rules. The engineering handbook teaches the same rules to people."}
Agents follow the same rules as the engineers, and load only the ones a task needs.
::

My goal was to let the whole team work with AI coding agents without losing the structure we had built. I wrote the rules the agents follow, arranged so an agent reads only what a task needs, and set up agents that scaffold features, review changes and refactor code against those rules. The engineering handbook teaches the same rules to people.

**What it changed**

- New features start in the right shape, because the scaffold follows the same structure the team reviews against.
- Reviews can focus on design and behaviour, because structure and formatting are checked before a change is opened.
- New engineers learn the codebase from the same rules the agents use, so everyone works the same way from their first week.
- Moving legacy code into the domain structure became routine, repeatable work instead of a project of its own.
