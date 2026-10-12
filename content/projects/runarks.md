---
description: 'How Runarks reviews, runs and records every query against a production database: one door to the database, approvals based on measured effect, masking that follows the data, and an append-only log.'
---

## Overview

Runarks is my own SaaS for teams that need to read or fix data in production. Instead of sharing a database password, people raise a request with the statement and a reason, a colleague approves it, and they run it once. I founded it and build it on my own.

::project-shot{src="/projects/runarks/screens.webp" single bare alt="Three screens of Runarks with demo data. In front, the Requests list: each request with its title, labels, statement, connection, a status such as draft, awaiting approval, approved or failed, and who opened it. Tilted behind it, the Activity feed of submissions, guardrail checks, approvals and bypass sessions on the left, and the New request form with its connection and labels on the right." width="1760" height="660"}
The requests list in front, with the activity log on the left and the new request form on the right.
::

## The problem

Most teams fix production by pasting a query from chat into a database client.

- **No review.** Nobody sees the statement first, so one missing filter can change every row.
- **No record.** Afterwards nobody can say who ran what, or what changed.
- **Passwords spread.** Everyone who ever needed production keeps the credential.
- **Data leaks by accident.** A quick `SELECT *` puts customers' emails and card details on screen.

## The solution

::sketch-figure{name="runarks/before-after" alt="Before: a message asks someone with the shared password to run a query, which goes straight to production with no review and no record. With Runarks: a request with a reason is approved by a colleague, run once with masking, every step is logged, and nobody is shown a password."}
A query becomes a request that someone else approves, and the password never leaves Runarks.
::

**Review first.** A colleague approves each statement on what it will actually do, and only the requester runs it, once.

**A record of everything.** Every step is written to a log that can be added to but never edited.

**No passwords to share.** Runarks holds the credentials and opens the connection itself.

**Masked by default.** Sensitive fields are masked before rows leave Runarks.

## What I did

- Defined the product and its security model: who may ask and approve, what may run and what is never shown.
- Designed the executor, the only component allowed to open a connection to a customer's database.
- Built the analyzer that describes a statement the same way for five database engines.
- Designed masking that follows the data, and the append-only activity log.
- Split the code into domains behind contracts, and wrote down each design decision with its reasons.
- Wrote the skills and agents that the coding agents follow in this codebase.

## What it offers

::feature-grid
---
items:
  - icon: lucide:scan-search
    title: Every statement is read first
    text: Each statement is described and checked against grants before anyone is asked to approve it.
  - icon: lucide:users
    title: Two people for every change
    text: Reads need one approval and writes two by default, and nobody approves their own request.
  - icon: lucide:flask-conical
    title: Writes are measured first
    text: A dry run counts the rows a write will change, and that count caps the real run.
  - icon: lucide:venetian-mask
    title: Masking that follows the data
    text: Sensitive columns stay masked through aliases, functions and joins.
  - icon: lucide:key-round
    title: No shared passwords
    text: Credentials are encrypted and used only by the executor; nobody is ever shown one.
  - icon: lucide:scroll-text
    title: A trail nobody can edit
    text: Every step goes to a log that the application and the database both keep append-only.
---
::

## System design

::sketch-figure{name="runarks/architecture" alt="Architecture: requesters and approvers use the web app, a modular monolith split into domains, each behind a contract, with a dashboard and a back office. The executor is the only code that opens a connection to customer databases over short-lived TLS. A separate analyzer process with no credentials or network describes statements. Behind the app sit the Runarks database, a queue and scheduler, and notifications."}
One web application, with a single executor at its edge and the analyzer in its own process.
::

Its domains talk only through each other's contracts, and the back office sees metadata only. A queue and a scheduler expire lapsed requests, check connections and send notifications.

### How a request moves

::sketch-figure{name="runarks/request-lifecycle" alt="State machine of a query request: draft, pending approval, approved, executing, then executed or failed. A dashed bypass path leads from pending approval to approved for reads only. Rejected, expired and cancelled are exits before anything runs."}
Every transition is guarded, and every one writes to the activity log.
::

There is no path from *pending approval* straight to *executing*, and rejecting takes the same permission as approving. Reads needed during an incident use a separate *bypass*: reads only, and flagged in the log.

### One door to production

::sketch-figure{name="runarks/one-door" alt="The executor is the only component that opens a database connection. An approved request or a read-only bypass session passes through the analyzer, grants, quota and credential gates, reaches the production database over one short-lived TLS connection, and the rows come back through masking. Every gate writes to the append-only activity log."}
The credential is decrypted last, and the connection closes as soon as the statement finishes.
::

Every path to a customer's database goes through the executor, and a test fails the build if anything else opens a connection. The analyzer has no credentials or network, and anything it cannot describe is refused.

### Approving what a write will do

::sketch-figure{name="runarks/write-gates" alt="Write pipeline: scan the raw text, parse it into one description, apply write rules, check grants on every column, run a dry run that is always rolled back, then fingerprint the facts. The approver sees the statement, tables, measured rows and masked columns. The run happens in a transaction with a row cap and timeout; it commits and logs the real count, or rolls back if more rows change than were approved."}
A dry run that is always rolled back sees the triggers and cascades a parser misses.
::

The approver judges the rows a write would really change, and that count is a hard cap when it runs: if more rows change, it rolls back.

### Masking that follows the data

Masking rules are written per column but follow the data, so `SELECT ssn AS x` and `CONCAT(first_name, ssn)` stay masked. Filtering on a masked column is refused, so nobody can recover a value one `LIKE` at a time.

## In the product

::project-shot{src="/projects/runarks/approval-workflow" alt="The Requests list in Runarks, showing requests with their SQL, labels, connection, status and who opened them." width="1760" height="924"}
Each request carries its statement, labels and status.
::

::project-shot{src="/projects/runarks/sql-guardrails" alt="The New request form: a title, the statement editor, the connection, a reason for the reviewer and a Submit for approval button." width="1760" height="1096"}
The statement is checked as you submit it, before any reviewer sees it.
::

::project-shot{src="/projects/runarks/activity-log" alt="The Activity page: a day-by-day feed of submissions, guardrail checks, approvals and bypass sessions, with a filter for bypasses only." width="1760" height="1100"}
The activity log can be added to but never edited.
::
