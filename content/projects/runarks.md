---
description: 'How Runarks reviews, runs and records every query against a production database: one door to the database, approvals based on measured effect, masking that follows the data, and an append-only log.'
---

## Overview

Runarks is a SaaS for teams that need to read or fix data in production. Instead of handing out database passwords, people raise a request: they write the statement and say why, a colleague approves it, and they run it once. Runarks reads every statement before anyone approves it, masks sensitive fields on the way out and keeps a record of every step.

## The problem

Most teams fix production the same way. Someone with the password opens a database client, pastes a query from a chat thread and hopes the `WHERE` clause is right.

- **No review.** Nobody else sees the statement before it runs, so one missing filter can change every row in a table.
- **No record.** Afterwards nobody can say who ran what, or what changed.
- **Passwords spread.** Every engineer who has ever needed production keeps the credential, and it is rarely rotated.
- **Data leaks by accident.** A quick `SELECT *` puts customers' emails, phone numbers and card details on someone's screen.

## The solution

::sketch-figure{name="runarks/before-after" alt="Before: a message asks someone with the shared password to run a query, which goes straight to production with no review and no record. With Runarks: a request with a reason is approved by a colleague, run once with masking, every step is logged, and nobody is shown a password."}
A query becomes a request that someone else approves, and the password never leaves Runarks.
::

Runarks puts a request between people and the database. The statement is checked as it is submitted, a colleague approves it based on what it will actually do, and only the person who asked can run it, once. Runarks holds the credentials itself and opens the connection, so nobody needs the password, and everything that happens is written to a log that can be added to but never edited.

## What I did

I founded Runarks and build it on my own.

- Defined the product and its security model: who may ask, who may approve, what may run, and what is never shown.
- Designed the executor, the single component allowed to open a connection to a customer's database, and the gates every statement passes through on the way.
- Built the analyzer that describes a statement for five database engines, so one approval policy works for all of them.
- Designed masking that follows the data through aliases and functions, and the append-only activity log.
- Structured the code as nineteen domains, each behind a contract, and wrote down more than 160 design decisions with their reasons.
- Wrote the agents and skills that the coding agents follow in this codebase: its domain rules, its security boundaries and how it is tested.

## What it offers

::feature-grid
---
items:
  - icon: lucide:scan-search
    title: Every statement is read first
    text: Each query is described and checked against grants before a person is asked to approve it.
  - icon: lucide:users
    title: Two people for every change
    text: Reads need one approval and writes two by default, and nobody approves their own request.
  - icon: lucide:flask-conical
    title: Writes are measured first
    text: A dry run counts the rows a write will change, and that count becomes a hard cap when it runs.
  - icon: lucide:repeat-1
    title: Run exactly once
    text: Only the requester can run an approved request, and a retry or a double click cannot repeat it.
  - icon: lucide:venetian-mask
    title: Masking that follows the data
    text: Sensitive columns stay masked through aliases, functions and joins, before rows leave Runarks.
  - icon: lucide:key-round
    title: No shared passwords
    text: Credentials are encrypted and used only by the executor; nobody is ever shown one.
  - icon: lucide:scroll-text
    title: A trail nobody can edit
    text: Every step is written to an append-only log, which both the application and the database protect.
  - icon: lucide:database
    title: Five engines, one policy
    text: MySQL, PostgreSQL, SQL Server, MongoDB and Redis are described the same way.
---
::

## System design

::sketch-figure{name="runarks/architecture" alt="Architecture: requesters and approvers use the web app, a modular monolith of nineteen domains with a dashboard and a back office. The executor is the only code that opens a connection to customer databases over short-lived TLS. A separate analyzer process with no credentials or network describes statements. Behind the app sit the Runarks database, a queue and scheduler, and notifications."}
One web application, with a single executor at its edge and the analyzer kept in a process of its own.
::

Runarks is one web application split into nineteen domains that only talk through each other's contracts. People use a dashboard; Runarks staff use a separate back office that sees metadata only. A queue and a scheduler handle the work nobody waits for: expiring requests that lapse, checking that connections are still reachable every hour, and sending notifications to the inbox, web push and email.

### How a request moves

::sketch-figure{name="runarks/request-lifecycle" alt="State machine of a query request: draft, pending approval, approved, executing, then executed or failed. A dashed bypass path leads from pending approval to approved for reads only. Rejected, expired and cancelled are exits before anything runs."}
Every transition is a guarded edge of one state machine, and every edge writes to the activity log.
::

There is no path from *pending approval* straight to *executing*, so nothing runs on the way to being approved. Approving checks that the approver is not the requester, that the request has not lapsed and that enough people have said yes. Rejecting takes the same permission as approving, because making "no" harder to say than "yes" is how reviews turn into rubber stamps. Reads needed during an incident use a separate door, *bypass*: reads only, gated by its own permission and a fresh password check, and flagged in the log.

### One door to production

::sketch-figure{name="runarks/one-door" alt="The executor is the only component that opens a database connection. An approved request or a read-only bypass session passes through the analyzer, grants, quota and credential gates, reaches the production database over one short-lived TLS connection, and the rows come back through masking. Every gate writes to the append-only activity log."}
The credential is decrypted only after every other gate has passed, and the connection closes as soon as the statement finishes.
::

Every path to a customer's database goes through the executor, and a test fails the build if anything else tries to open a connection. The order inside it is fixed: the analyzer describes the statement, grants are checked on every table and column, the person's quota is counted from the log, and only then is the credential decrypted. The analyzer runs in its own process with no credentials, no network and no file system; it reports facts and never decides, and anything it cannot describe is refused.

### Approving what a write will do

::sketch-figure{name="runarks/write-gates" alt="Write pipeline: scan the raw text, parse it into one description, apply write rules, check grants on every column, run a dry run that is always rolled back, then fingerprint the facts. The approver sees the statement, tables, measured rows and masked columns. The run happens in a transaction with a row cap and timeout; it commits and logs the real count, or rolls back if more rows change than were approved."}
A parser cannot see triggers or cascades. A dry run in a transaction that is always rolled back can.
::

Before anyone is asked, Runarks runs a write inside a transaction that is always rolled back and measures how many rows it would change. The approver judges that number, and the facts they saw are fingerprinted onto the request. When it runs, that count is a hard cap: if more rows change than were approved, the transaction rolls back and the request fails. Running is a single conditional update that must claim exactly one approved request, so it can never run twice.

### Masking that follows the data

Masking rules are written per column but applied by lineage. `SELECT ssn AS x` and `CONCAT(first_name, ssn)` are still masked, the strictest rule wins when several masked columns feed one value, and filtering on a masked column is refused, so nobody can recover a value one `LIKE` at a time.

## In the product

::project-shot{src="/projects/runarks/approval-workflow" alt="The Requests list in Runarks, showing requests with their SQL, labels, connection, status and who opened them." width="1760" height="924"}
Each request carries its statement, labels and status; the reason it was raised is the first thing a reviewer reads.
::

::project-shot{src="/projects/runarks/sql-guardrails" alt="The New request form: a title, the statement editor, the connection, a reason for the reviewer and a Submit for approval button." width="1760" height="1096"}
The statement is checked as you submit it, so you learn here, not from a reviewer, that it cannot run.
::

::project-shot{src="/projects/runarks/activity-log" alt="The Activity page: a day-by-day feed of submissions, guardrail checks, approvals and bypass sessions, with a filter for bypasses only." width="1760" height="1100"}
The activity log can be added to but never edited.
::
