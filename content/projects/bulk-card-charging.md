---
description: 'How I built bulk top-ups for Clever cards at Faris Petrol: a spreadsheet checked against typed totals, approval with a password, one queued job per card, and a person for any card without a clear answer.'
---

## Overview

Clever is Faris Petrol's payment card and app. Some top-ups come as a list: many cards, each with its own amount, charged from one merchant account on the Clever platform. The bulk charging system turns that list into a batch that is checked, approved and sent card by card, with live progress and a clear outcome for every card. I designed and built it on my own in 2022, test-first, as a full-stack developer at Faris Petrol.

## The problem

Charging a list of cards is easy to start and hard to get exactly right.

- **One card at a time.** Without a system, every card on a list had to be topped up by hand, one after another.
- **Mistakes cost money.** A wrong amount goes straight onto someone's card and a missing row leaves a card without its top-up, so a list has to be checked and approved before anything is sent.
- **Not every answer is clear.** An error from the platform means nothing was charged. No answer at all means nobody knows, and sending the card again could charge it twice.
- **Long batches need watching.** A batch takes a while to send. Operators need to see it move, stop it if something looks wrong, and keep a record of what happened to every card.
- **Code that moves money can't break.** Every path, including each way the platform can fail, has to keep working as the rules change.

## The solution

::sketch-figure{name="bulk-card-charging/before-after" alt="Before: a list of cards and amounts is typed in card by card by a person into the card platform. With no answer in time, nobody knows whether the card was charged, and sending it again may charge it twice; nobody checked the totals or approved the list. Now: the list is uploaded with its totals, approved with a password, highlighted, and sent as one job per card to the card platform. Every card ends with a clear status: processed (charged), failed (safe to send again) or stuck (a person checks), with live progress and a record for every card."}
A list becomes a batch that is checked and approved first, and every card ends with a status you can trust.
::

**A batch from a spreadsheet.** The operator picks the merchant account and uploads a spreadsheet of cards, amounts and references. From there the system sends every card itself, one by one, and nobody types a top-up by hand.

**Checked and approved first.** The operator also types the total amount and the number of cards, and the file must match both. Nothing is sent until someone with the permission approves the batch and re-enters their password.

**Failed and stuck, kept apart.** An error from the platform marks a card *failed*: nothing was charged, and it can be sent again. No answer, or a timeout, marks it *stuck*: the system never sends it again on its own, and a person checks the card on the platform and marks it processed or failed.

**One job per card, live.** Each card is its own job in a queue, locked while it is sent so it can't go out twice. The batch page updates live, cancelling stops the cards not yet sent, and the results export to Excel.

**Tested path by path.** I built it test-first: every action, and every way the platform can fail, has an automated test.

## What I did

- Designed and built the system on my own: the back end, the operators' dashboard, the queue and the live progress.
- Wrote the specification: the states of a batch and of a card, what each action may do in each state, and the error each refusal returns.
- Built it test-first, with feature tests for every action and for each way the card platform can fail.
- Connected it to the Clever card platform's API. A merchant account signs in once with its platform password, and the system keeps only the session it gets back, never the password.
- Set up roles and permissions, registered devices and a log of sessions, and made approving, sending, cancelling or closing a batch, and settling a stuck card, ask for the password again.

## What it offers

::feature-grid
---
items:
  - icon: lucide:file-spreadsheet
    title: Batches from a spreadsheet
    text: Each row holds a card, an amount, a reference and an optional note, and every row is checked before anything is saved.
  - icon: lucide:calculator
    title: Totals that must match
    text: The operator types the total amount and the number of cards, and a file that disagrees is refused.
  - icon: lucide:user-check
    title: Approval before sending
    text: Only someone with the permission can approve a batch, and they confirm it with their password.
  - icon: lucide:layers
    title: One job per card
    text: Every card is sent on its own, so one failure never holds up the rest.
  - icon: lucide:activity
    title: Live progress
    text: The batch page updates as each card is answered, without a refresh.
  - icon: lucide:list-checks
    title: A clear outcome per card
    text: Each card ends processed, failed or stuck, with the platform's reply kept.
  - icon: lucide:octagon-x
    title: Stop at any time
    text: Cancelling a batch stops the cards not yet sent, and the ones already charged stay on record.
  - icon: lucide:file-down
    title: Excel export
    text: Every batch's results, card by card, in one file.
---
::

## System design

::sketch-figure{name="bulk-card-charging/architecture" alt="Architecture: an operator and an approver use the dashboard of one web app, which answers registered devices only and asks for the password again on key steps. Inside it are merchants, batches, the cards in a batch, the error log, the Excel export, and users and roles. A queue, highlighted, runs one job per card, locked while it is sent, and calls the Clever card platform, which answers each top-up with an invoice or an error. A merchant account signs in once and its password is never stored. A live-updates server pushes every change back to the batch page, and a database keeps batches, cards, replies and errors."}
One web app, a queue that sends each card on its own, and live updates back to the page.
::

Operators and approvers use one web app, reachable only from registered devices. It checks each spreadsheet, keeps the batches and their cards, and hands an approved batch to a queue, where every card becomes a job that calls the Clever card platform. A live-updates server pushes each change to the batch page, and every error is stored with its card.

### The life of a batch

::sketch-figure{name="bulk-card-charging/batch-lifecycle" alt="State diagram of a batch. An operator uploads it, and the totals must match the file. It is approved with a permission and a password, then sent as one job per card with live progress. It ends processed, highlighted, when every card is charged, or partly processed when it is closed by hand with a note. A dotted line shows it can be cancelled at any point: cancelled if nothing was sent, or partly cancelled, where the cards not yet sent never go out. A stuck card must be settled before a batch closes or is cancelled, and results export to Excel."}
A batch is sent only after it is approved, and it can be stopped at any point before the end.
::

Uploading and approving are separate permissions, and approval needs the password again. A batch is sent only once it is approved, and sent again only when its last run has finished, so the same cards are never in the queue twice. A merchant account has one open batch at a time, and closing a batch by hand needs a note that stays with it.

### Failed or stuck

::sketch-figure{name="bulk-card-charging/failed-or-stuck" alt="One job per card sends the top-up to the card platform; cards wait their turn, one failure never stops the rest, and each card is locked while it is sent so it can't go out twice. The answer decides the outcome: an invoice means processed, highlighted, and the card was charged; an error means failed, nothing was charged and it is safe to send again; no reply means stuck, the outcome is unknown and the card is held for a person. The person checks the card on the platform, then marks it processed or failed and confirms with a password. A batch can't be closed or cancelled while one of its cards is stuck."}
An error and a silence lead to different places, because only an error proves nothing was charged.
::

An error means the platform refused the top-up, so nothing was charged and the card can go out again in the next run. Silence means the top-up may or may not have gone through, so the card is held as stuck and the system never sends it again by itself. A person looks the card up on the platform and marks it processed or failed, with their password, and until then the batch can't be closed or cancelled. That rule is what keeps a card from being charged twice.

### Queues and live progress

**One job per card.** Sending a batch queues one job per card. Each job locks its card while it is sent and can't be queued twice, so a card never goes out twice at once, and a slow or failed card never holds up the rest.

**Live progress.** Every change is pushed to the batch page over a private live channel, so operators see each card's status as it changes. Cancelling a batch stops the jobs that haven't run, and the results export to Excel, card by card.

**A record of every error.** Each failure is stored against its card, with where it came from and the platform's reply, so anyone can see later what happened to a card.

### Tested path by path

I built the system test-first. Feature tests cover every action and the states it is allowed or refused in: creating, approving, sending, resending, cancelling and closing a batch, and settling a stuck card. They also cover each way the platform can fail (an error response, a lost connection and a timeout), with the platform faked in the tests. That made it safe to change the money rules later without guessing what they would break.
