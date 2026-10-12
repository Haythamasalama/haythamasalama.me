---
description: 'How I built Sanad’s API and admin dashboard: a wallet ledger that traces every riyal, investing in one all-or-nothing step, and returns paid to every investor on a schedule.'
---

## Overview

Sanad is a real-estate investment platform in Saudi Arabia. Investors verify their identity through Absher, top up a wallet, buy units in income-generating properties from the website or the app, and receive their returns in the same wallet. Sanad's operations team runs the opportunities, the money and the investors from an admin dashboard. I worked on it part-time as a full-stack engineer from May 2024 to May 2025, and built its API and its admin dashboard.

## The problem

The platform was new when I joined, and I started its back end from the first commit. Four things had to hold before real money could move through it.

- **Money that always adds up.** Investors' money moves from their bank to a wallet, into opportunities, and back as returns. Every balance had to be explainable movement by movement, and never drift from its history.
- **Investing without half-finished steps.** One investment changes the opportunity's units, the investor's wallet and the fees. If it stopped halfway, units could be sold without being paid for, or paid for without being sold.
- **Returns for every investor.** Each opportunity pays returns over its life, to every investor in proportion to their units. Worked out by hand, investor by investor, that is slow and easy to get wrong.
- **Control for the operations team.** Deposits, withdrawals and new bank accounts needed a person to check them, and the team needed one place to publish opportunities and run the platform.

## The solution

::sketch-figure{name="sanad/before-after" alt="Four risks on the left, each with an arrow to what the platform does on the right. A balance nobody can trace back to its movements: a ledger where every movement is linked to the one before, with the balance after it. Units sold but not paid for, or paid for but not sold: one all-or-nothing step for units, money and fees, confirmed by a code. Returns worked out by hand, investor by investor: a schedule of returns, paid per unit to every investor in one action. Money moving in or out with nobody checking it: deposits, withdrawals and bank accounts approved by a person on the team."}
Each risk has one safeguard in the platform, and each safeguard is a part I built.
::

**A wallet that is a ledger.** Every movement of money is its own row, linked to the one before it and carrying the balance after it. The database keeps each wallet's balance in step with those rows, so any balance can be traced back, riyal by riyal.

**Investing in one step.** An investor confirms an investment with a code sent to their phone. The platform checks it, then reserves the units, records the investment and debits the wallet with its fees in one all-or-nothing step: either everything changes, or nothing does.

**Returns on a schedule.** The team sets an opportunity's return plan once, and the platform turns it into a schedule of periods. Paying a period credits every investor for their units in a single action.

**Approvals in the dashboard.** Deposits, withdrawals and bank accounts wait in the admin dashboard until someone on the team approves them, and the same dashboard runs the opportunities, the investors, the returns and the settings.

## What I did

- Designed and built the API from its first commit, on Domain-Driven Design: one back end for the investor app, the public website and the admin dashboard, split into more than ten domains, each behind a contract.
- Designed and built the parts where money moves: the wallet ledger, the investment flow and the returns engine.
- Built sign-in for investors and admins, with one-time codes by SMS for investors, and the approvals for deposits, withdrawals and bank accounts.
- Connected the platform to Absher for identity verification and to payment gateways.
- Built the admin dashboard on my own, from sign-in to the returns pages.
- Helped build parts of the investor app's interface, such as its home page and account pages, and guided the engineer who built the rest of it.
- Wrote tests for the money paths: investing, the ledger and returns.

## What it offers

::feature-grid
---
items:
  - icon: lucide:house
    title: Shares in income properties
    text: Investors buy units in income-generating properties, from the website or the app.
  - icon: lucide:id-card
    title: Verified investors
    text: Investors verify their identity through Absher before they can invest.
  - icon: lucide:wallet
    title: A wallet for every investor
    text: Investors top up from their bank account, invest from the balance and withdraw back to the bank.
  - icon: lucide:smartphone
    title: Confirmed by a code
    text: Signing in and every investment are confirmed with a one-time code sent by SMS.
  - icon: lucide:calendar-clock
    title: Returns on a schedule
    text: Returns are paid once, monthly or yearly, straight into the wallet.
  - icon: lucide:layout-dashboard
    title: An account at a glance
    text: Investors see their balance, what they have invested, their account's value and the returns they have received.
  - icon: lucide:file-text
    title: Full details for investors
    text: Anyone can browse the opportunities; signed-in investors also see the documents, the team and every detail.
  - icon: lucide:languages
    title: Arabic and English
    text: The apps, the messages and every wallet movement read in either language.
---
::

## System design

::sketch-figure{name="sanad/architecture" alt="Architecture: investors use the investor app and the website, and the operations team uses the admin dashboard. Each calls its own layer of one API: the investor API, the website API and the admin API, and investors and admins sign in separately. Behind them sit more than ten domains, each behind a contract, such as security, users, banks, opportunities, roles, settings, content and locations, with the finance domain's wallet ledger and the investments and returns domain highlighted. The API connects to Absher for identity verification, to payment gateways, and to SMS for codes and confirmations, which goes to a team chat in testing. A database and a queue for messages sit behind it, and the money paths are covered by tests."}
Three front ends share one API, and the money lives in two domains at its centre.
::

One API serves the investor app, the public website and the admin dashboard, each through its own layer, and investors and admins sign in separately. Underneath, the back end is split into domains such as security, users, banks, finance, opportunities, and investments and returns, each behind a contract the others call. Identity verification, payment gateways and SMS each sit behind their own integration. Outside production, every SMS goes to a team chat instead, so the team could test codes and confirmations without texting anyone.

### The wallet ledger

::sketch-figure{name="sanad/ledger" alt="One investor's wallet as five movements, oldest first: a deposit from a bank account to the wallet, an investment and its fees from the wallet to the investment, a return to the wallet, and a withdrawal to a bank account. Each row shows the balance after it as a bar, and an arrow links each row to the one before it. The database writes the link and the balance on every movement, and the wallet's balance is always its last movement. Every movement also reads as one line in Arabic or English."}
Each movement points to the one before it, so a balance is always the end of a chain.
::

Every deposit, investment, fee, return and withdrawal is a row with a source, a destination and the balance after it. The application never writes a balance: it only adds movements, and the database links each one to the last and keeps the wallet's balance in step. For the team, any balance can be explained line by line; for investors, the wallet is a readable history in Arabic or English.

### Investing in one step

::sketch-figure{name="sanad/investment" alt="An investor picks the units and enters the code sent by SMS. Inside one all-or-nothing transaction, the platform checks that the code is right, the investor is verified, the opportunity is open, enough units are left, the investment is within the investor's limits and the wallet covers it all. Then it reserves the units, records the investment and debits the wallet with its fees. The investor gets a confirmation by SMS, and units and money always change together. If any check fails, nothing changes and the investor is told why."}
Every check runs before anything changes, and every change happens together.
::

An investment runs as one transaction. Everything is checked first: the code from the investor's phone, the investor, the opportunity, the units left, the investor's limits and the wallet. Then the units, the investment and the wallet's movements are written together, and the investor gets a confirmation by SMS. When something fails, the investor is told exactly why, and the team never has a half-finished investment to repair by hand.

### Returns for every investor

::sketch-figure{name="sanad/returns" alt="An opportunity's life: soon, available (investors buy units), offering complete, profit distribution (returns are paid, highlighted), liquidation complete and completed. Returns are paid in three steps. First, a return plan: a fixed amount or a percentage, paid once, monthly or yearly, between a start and an end date, which can change until the first period is paid. Second, a schedule of periods, with each period's return split per unit sold. Third, paying a period: an admin confirms their password and records a profit or a loss, and every investor gets their units times the share, in one transaction with one ledger row each."}
The plan is set once; each period is one confirmed action that pays every investor.
::

When an opportunity reaches profit distribution, the team sets its return plan: a fixed amount or a percentage, paid once, monthly or yearly. The platform splits it into periods and per unit sold, and the plan can still change until the first period is paid. Paying a period asks the admin to confirm their password, then credits every investor's wallet with their share of a profit, or debits it for a loss, in one transaction with a ledger row each. For the team, paying everyone in an opportunity is one action instead of a list of transfers.

### The admin dashboard

**Approvals.** Investors' deposits, withdrawals and new bank accounts arrive as requests. Someone on the team approves or rejects each one with a note, and only an approved transfer writes to the ledger and tells the investor by SMS.

**Opportunities.** The team creates an opportunity with its details, its location on a map, images, documents and the team behind it, and can edit it until investing closes. Visitors see the listing on the website; signed-in investors see everything.

**Running the platform.** Investors, investments, every wallet movement and balance, team members and their roles, and settings such as banks and cities are all managed from the dashboard, in Arabic or English.
