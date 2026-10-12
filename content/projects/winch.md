---
description: 'How I set up WINCH’s business and carrier platforms, moved its back end into more than fifty domains, built generic engines for notifications, exports and security, and an integration engine for every outside platform.'
---

## Overview

WINCH is a Saudi logistics platform for moving goods and vehicles, renting trucks and storing goods. Businesses, carriers, drivers and WINCH's own teams each have an app or dashboard, all served by one back end. I joined in 2023 as a senior software engineer.

## The problem

When I joined, the back end ran WINCH's own operations, but four things were missing.

- **No business or carrier platform.** Neither had apps, dashboards or APIs of their own.
- **No structure that could grow.** Most code lived in one folder, so every change touched too much.
- **Core features solved again and again.** Each feature handled notifications, exports and security its own way.
- **No common way to integrate.** Each outside platform was wired in differently, with no record of the calls.

## The solution

::sketch-figure{name="winch/before-after" alt="Before: features such as orders, invoices, waybills and drivers wired directly to vendors in a tangle of lines. After: more than fifty domains behind contracts sit on four shared components (security, notifications, exports and integrations), and only those components reach the outside platforms."}
Features stopped talking to vendors directly; shared components do it for them.
::

**The business and carrier platforms.** Businesses and carriers now have their own APIs, apps and dashboards on the same back end.

**Domains that stay clean.** The team and I moved the back end into more than 50 domains, each behind a contract.

**Core features as generic engines.** Notifications, exports and security are each one engine that every feature uses.

**One engine for every integration.** Every outside platform is an app, configured in one place and recorded call by call.

## What I did

- Set up the business and carrier platforms and their APIs, and have written most of the business dashboard.
- Designed and built the notification system, the security domain, the integration engine and the foundation of the export system.
- Evolved the Domain-Driven Design structure and led the move of the legacy code into it, mentoring the team along the way.
- Proposed the shared UI package both dashboards use, led its extraction and maintain it.
- Set up the team's AI-assisted workflow: the rules, agents and skills that AI coding agents follow.
- Lead small teams that take features to production, and review the pull requests that keep the structure consistent.

## What it offers

::feature-grid
---
items:
  - icon: lucide:package
    title: Orders from request to delivery
    text: Create orders one by one or from a spreadsheet, and follow each in real time.
  - icon: lucide:receipt
    title: Clear pricing
    text: Quotations or fixed prices, with every trip's cost broken down.
  - icon: lucide:landmark
    title: Government paperwork built in
    text: Electronic waybills, driving authorisations and e-invoices to ZATCA's standard.
  - icon: lucide:truck
    title: Carrier operations
    text: Carriers assign drivers and vehicles and follow every trip.
  - icon: lucide:wallet
    title: Earnings and finance
    text: Statements, compensation requests, and wallet top-ups and withdrawals.
  - icon: lucide:plug
    title: An API for businesses
    text: Companies connect their ERP and other systems to WINCH.
---
::

## System design

::sketch-figure{name="winch/architecture" alt="Architecture: the business, carrier and driver apps and the control panel call one back end. It has an API for each app, domains behind contracts, and four shared components: security, notifications, exports and the integration engine. The engine connects to government services, payments, AI models and messaging through one pipeline. Behind it sit the database, queues and a scheduler, and a live tracking server."}
Every app talks to one back end, and only the integration engine talks to the outside world.
::

One back end serves every app through its own API, on top of the domains and four shared components. Queues and a scheduler run the heavy and recurring work.

### The business and carrier platforms

::sketch-figure{name="winch/frontend" alt="One front-end codebase with business, carrier and shared pages is built twice, into the business dashboard and the carrier dashboard, both served from a CDN. A shared UI package of inputs, tables, forms and cards feeds the codebase, and permissions decide every route, menu item and button."}
One codebase, two products, and a shared component library underneath.
::

Both dashboards share one codebase and UI package, so a fix or a new component reaches both products at once.

### Moving to Domain-Driven Design

::sketch-figure{name="winch/ddd" alt="Inside every domain: presentation, then a contract that is the only public door, a service that delegates, actions that do one job each, and models. Another domain calls the contract but never the models. Two charts show the legacy folder emptying over time while the number of domains grows."}
The legacy folder emptied while the product kept shipping.
::

Every domain has the same layers and a contract as its only public door, so one team can change a domain without breaking another. The team moved the legacy code domain by domain without pausing the product.

### Notifications, exports and security

Each is one engine that every feature uses: a new message is a template, a new export only describes its columns, and every kind of user signs in through the same security domain.

### The integration engine

::sketch-figure{name="winch/integration-engine" alt="The integration engine: domains and the payment and AI gateways call it. An app registry holds each app's switch, development mode, logging, encrypted settings and rate limits. Every call goes through one pipeline (app active, within limits, run and time it, record it) into a transaction ledger, over a shared HTTP transport. On top sit the apps for government services, payments, AI models, messaging, and maps and tracking."}
Every platform WINCH talks to is an app in one engine, and every call it makes is recorded.
::

The team writes each integration, such as ZATCA, as a small app with its own settings and limits. Every call is recorded, and an app can be switched off without changing code.

## AI in the engineering workflow

::sketch-figure{name="winch/ai-workflow" alt="An engineer asks a coding agent for a feature, a fix or a review. The agent loads a project guide first, then only the topic rules in play, then the guide for a layer when a file in it opens. Agents with one job each scaffold, review, audit, build UI and integrations, simplify and rename. The result is a change in the domain structure, formatted after every edit and reviewed against the rules. The engineering handbook teaches the same rules to people."}
Agents follow the same rules as the engineers, and load only the ones a task needs.
::

I set up the rules, agents and skills so the whole team can work with AI coding agents without losing the structure we built.

**What it changed**

- New features start in the right shape, because the scaffold follows the structure the team reviews against.
- Reviews focus on design and behaviour, because structure and formatting are checked first.
- New engineers learn the codebase from the same rules the agents follow.
