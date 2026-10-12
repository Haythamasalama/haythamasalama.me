---
description: 'The API and admin dashboard I built for Sanad, a Saudi real-estate investment platform: a wallet ledger that traces every riyal, investing in one step, and returns paid on a schedule.'
---

## Overview

Sanad is a real-estate investment platform in Saudi Arabia. Investors verify their identity through Absher, top up a wallet, buy units in income-generating properties and receive their returns in the same wallet. As a part-time full-stack engineer, I built its API and its admin dashboard.

## The problem

The platform was new, and real money had to move through it safely.

- **Money that always adds up.** Every balance had to be explainable, movement by movement.
- **No half-finished investments.** Units, money and fees had to change together, or not at all.
- **Returns for every investor.** Paying each investor by hand would be slow and error-prone.
- **Control for the team.** Deposits, withdrawals and bank accounts needed a person to approve them.

## The solution

::sketch-figure{name="sanad/before-after" alt="Four risks on the left, each with an arrow to what the platform does on the right. A balance nobody can trace back to its movements: a ledger where every movement is linked to the one before, with the balance after it. Units sold but not paid for, or paid for but not sold: one all-or-nothing step for units, money and fees, confirmed by a code. Returns worked out by hand, investor by investor: a schedule of returns, paid per unit to every investor in one action. Money moving in or out with nobody checking it: deposits, withdrawals and bank accounts approved by a person on the team."}
Each risk has one safeguard in the platform, and I built each of them.
::

## What I did

- Built the API from its first commit, on Domain-Driven Design, split into more than ten domains.
- Built the parts where money moves: the wallet ledger, the investment flow and the returns.
- Built sign-in with one-time codes, the approvals, and the connections to Absher and payment gateways.
- Built the admin dashboard on my own.
- Helped build the investor app's home and account pages, and guided the engineer who built the rest.
- Wrote tests for the money paths.

## What it offers

::feature-grid
---
items:
  - icon: lucide:house
    title: Shares in income properties
    text: Investors buy units in income-generating properties, from the website or the app.
  - icon: lucide:id-card
    title: Verified investors
    text: Every investor verifies their identity through Absher before investing.
  - icon: lucide:wallet
    title: A wallet for every investor
    text: Top up from a bank account, invest from the balance and withdraw back.
  - icon: lucide:calendar-clock
    title: Returns on a schedule
    text: Returns are paid once, monthly or yearly, straight into the wallet.
  - icon: lucide:smartphone
    title: Confirmed by a code
    text: Signing in and every investment are confirmed by SMS.
  - icon: lucide:languages
    title: Arabic and English
    text: The apps, the messages and every wallet movement read in either language.
---
::

## System design

::sketch-figure{name="sanad/architecture" alt="Architecture: investors use the investor app and the website, and the operations team uses the admin dashboard. Each calls its own layer of one API: the investor API, the website API and the admin API, and investors and admins sign in separately. Behind them sit more than ten domains, each behind a contract, such as security, users, banks, opportunities, roles, settings, content and locations, with the finance domain's wallet ledger and the investments and returns domain highlighted. The API connects to Absher for identity verification, to payment gateways, and to SMS for codes and confirmations, which goes to a team chat in testing. A database and a queue for messages sit behind it, and the money paths are covered by tests."}
Three front ends share one API, and the money lives in two domains at its centre.
::

### The wallet ledger

::sketch-figure{name="sanad/ledger" alt="One investor's wallet as five movements, oldest first: a deposit from a bank account to the wallet, an investment and its fees from the wallet to the investment, a return to the wallet, and a withdrawal to a bank account. Each row shows the balance after it as a bar, and an arrow links each row to the one before it. The database writes the link and the balance on every movement, and the wallet's balance is always its last movement. Every movement also reads as one line in Arabic or English."}
Each movement points to the one before it, so a balance is always the end of a chain.
::

The application never writes a balance: it only adds movements, and the database keeps every wallet in step with them.

### Investing in one step

::sketch-figure{name="sanad/investment" alt="An investor picks the units and enters the code sent by SMS. Inside one all-or-nothing transaction, the platform checks that the code is right, the investor is verified, the opportunity is open, enough units are left, the investment is within the investor's limits and the wallet covers it all. Then it reserves the units, records the investment and debits the wallet with its fees. The investor gets a confirmation by SMS, and units and money always change together. If any check fails, nothing changes and the investor is told why."}
Every check runs before anything changes, and every change happens together.
::

### Returns for every investor

::sketch-figure{name="sanad/returns" alt="An opportunity's life: soon, available (investors buy units), offering complete, profit distribution (returns are paid, highlighted), liquidation complete and completed. Returns are paid in three steps. First, a return plan: a fixed amount or a percentage, paid once, monthly or yearly, between a start and an end date, which can change until the first period is paid. Second, a schedule of periods, with each period's return split per unit sold. Third, paying a period: an admin confirms their password and records a profit or a loss, and every investor gets their units times the share, in one transaction with one ledger row each."}
The plan is set once; paying a period is one confirmed action that pays every investor.
::
