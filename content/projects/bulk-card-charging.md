---
description: 'How I built bulk top-ups for Clever cards at Faris Petrol: a spreadsheet checked against typed totals, approval with a password, one queued job per card, and a person for any card without a clear answer.'
---

## Overview

Clever is Faris Petrol's payment card and app. The bulk charging system tops up many Clever cards from one merchant account: a spreadsheet becomes a batch that is checked, approved and sent card by card, with live progress and a clear outcome for each card. I designed and built it on my own in 2022, test-first, as a full-stack developer at Faris Petrol.

::project-shot{src="/projects/bulk-card-charging/batch.webp" single bare alt="Three screens of the dashboard, in Arabic. In front, a batch of cards with the approval dialog over it, asking for the password. Behind it on the left, the form for a new batch; on the right, a batch being sent, with a progress bar and a status for each card." width="1760" height="660"}
The new batch form, the approval that asks for the password, and a batch being sent card by card.
::

## The problem

Charging a list of cards is easy to start and hard to get exactly right.

- **Mistakes cost money.** A wrong amount or a missing row goes straight onto someone's card.
- **Not every answer is clear.** With no reply from the platform, nobody knows if a card was charged.
- **Long batches need watching.** Operators must see progress, stop a batch, and keep a record.

## The solution

::sketch-figure{name="bulk-card-charging/before-after" alt="Without it: a list of cards and amounts goes to the card platform unchecked. Nobody checks the totals or approves the list, with no answer nobody knows if a card was charged, and sending it again may charge it twice. With it: upload with totals, approve with a password, highlighted, then one job per card. Every card ends processed (charged), failed (safe to send again) or stuck (a person checks), with live progress and a record."}
A list becomes a batch that is checked and approved first, and every card ends with a status you can trust.
::

- **Checked and approved first.** The file must match the typed totals, and an approver confirms with a password.
- **Failed and stuck, kept apart.** An error is safe to send again; no reply holds the card for a person.
- **One job per card, live.** Each card is its own queued job, and the page updates as each one is answered.

## What I did

- Designed and built the system on my own: the back end, the dashboard, the queue and the live progress.
- Wrote the specification: the states of a batch and a card, and what each action may do in each.
- Built it test-first, with a test for every action and every way the platform can fail.
- Connected it to the Clever API; a merchant account signs in once, and its password is never stored.
- Set up roles, registered devices, and a password check to approve, send, cancel or close a batch.

## What it offers

::sketch-figure{name="bulk-card-charging/features" alt="Everything the system does, in four columns. Set up: merchants with their Clever accounts, users and roles, registered devices. Run a batch: upload a spreadsheet whose totals must match, approval with its own permission and the password, cancel, and close by hand with a note. Every card: one queued job per card, live progress and, highlighted, three outcomes: processed, failed or stuck. Follow up: settle a stuck card, resend failed cards, an error log and an Excel export."}
From setting up merchants to following up on every card, built around the three outcomes.
::

## System design

::sketch-figure{name="bulk-card-charging/architecture" alt="Architecture: an operator and an approver use the dashboard of one web app, open to registered devices only, which asks for the password again on key steps and holds merchants, batches and their cards, the error log, the export, and users and roles. A queue, highlighted, runs one locked job per card against the Clever card platform, which answers with an invoice or an error. Live updates push every change back to the page, and a database keeps it all."}
One web app, a queue that sends each card on its own, and live updates back to the page.
::

One web app, open only to registered devices, checks each spreadsheet and keeps the batches. An approved batch goes to a queue where every card is a job that calls the Clever API, and each answer is pushed back to the page.

### The life of a batch

::sketch-figure{name="bulk-card-charging/batch-lifecycle" alt="A batch is uploaded with totals that must match, approved with a permission and a password, and sent as one job per card. It ends processed, highlighted, when every card is charged, or partly processed when closed by hand with a note. It can be cancelled at any point: cancelled if nothing was sent, partly cancelled otherwise. A stuck card must be settled first, and results export to Excel."}
A batch is sent only after it is approved, and it can be stopped at any point before the end.
::

Uploading and approving are separate permissions. A merchant account has one open batch at a time, and closing a batch by hand needs a note.

### Failed or stuck

::sketch-figure{name="bulk-card-charging/failed-or-stuck" alt="Each card’s job sends a top-up to the card platform, locked so it can’t go out twice. An invoice means processed, highlighted: the card was charged. An error means failed: nothing was charged and it is safe to send again. No reply means stuck: the outcome is unknown, so a person checks the platform, marks it processed or failed and confirms with a password. A batch can’t close or be cancelled while a card is stuck."}
An error and a silence lead to different places, because only an error proves nothing was charged.
::

The system never sends a stuck card again by itself. A person checks it on the platform and settles it, and that rule is what keeps a card from being charged twice.

## In the product

::project-shot{src="/projects/bulk-card-charging/screens.webp" single bare alt="Three screens of the dashboard, in Arabic. In front, a batch waiting for approval, with approve and cancel buttons and its cards, each not yet sent. Behind it on the left, the list of merchant accounts; on the right, the list of batches with a date filter." width="1760" height="660"}
Merchant accounts, a batch’s cards waiting for approval, and the list of batches.
::

::project-shot{src="/projects/bulk-card-charging/batch-running.webp" single alt="One batch being sent, in Arabic: the merchant, the number of cards and the total at the top, a progress bar, then the cards. One is in progress, one failed with a connection error and has a resend button, and the rest are not sent yet." width="1760" height="820"}
A batch mid-run: one card in progress, one failed with a connection error and a resend button, the rest waiting.
::
