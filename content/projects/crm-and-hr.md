---
description: 'The CRM I built with one other developer for Faris Petrol’s customer service and field teams, linked to the phone system and Clever, and the HR system that turns access-control punches into shifts.'
---

## Overview

Faris Petrol issues Faris electronic cards and runs Clever, a loyalty app with partner stores. I joined in 2019 as a full-stack developer, and from September 2020 I built, with one other developer, the system its customer service, field and HR teams work in. One side is a CRM linked to the phone system and Clever; the other is HR, with attendance read from the company’s access-control devices.

::project-shot{src="/projects/crm-and-hr/screens.webp" single bare alt="Three screens of the Arabic interface. In front, the monthly calendar of store visits, with planned visits in yellow and completed ones in green. Tilted behind it, the weekly attendance sheet on the left and the employees list on the right." width="1760" height="660"}
The month's store visits in front, with the attendance sheet and the employees beside it.
::

## The problem

The teams needed one place for their daily work, and HR needed attendance it could rely on.

- **Calls without context.** A call reached an agent as a bare phone number.
- **Work spread across systems.** Requests had no owner, store visits had no plan, and partner stores lived in Clever.
- **Punches, not shifts.** The devices recorded punches, but HR needed shifts, including 24-hour shifts across midnight.

## The solution

::sketch-figure{name="crm-and-hr/before-after" alt="Before: a person switches between the phone system, which shows only a number, an old CRM with contacts, Clever with stores and balances, and devices with raw punches. Now: one system with a CRM side and an HR side, linked both ways to the phone system, Clever, SMS and messaging apps, and the access-control devices."}
One record per customer and per employee, fed by the systems around it.
::

**The caller on screen.** The phone system asks the CRM who is calling, and every call is logged on the caller’s record.

**One place for the daily work.** Tickets have an owner, partner stores sync from Clever, and every store gets a monthly visit.

**Shifts from punches.** One rule pairs punches into shifts, and HR can fix a missed punch or re-run a day.

## What I did

- Set up the project and built it with one other developer, releasing it a module at a time.
- Built the HR side: employees, contracts, shifts, leave and attendance from the access-control devices.
- Built the phone-system integration that shows the caller and logs every call.
- Built SMS templates, the monthly visit plans, and the scheduled Clever sync with low-balance alerts.
- Built contacts, tickets, visits and messaging with the other developer, and set up roles and permissions.

## What it offers

::sketch-figure{name="crm-and-hr/feature-map" alt="Everything in the system. CRM, for customer service and the field team: contacts, calls, tickets, partner stores synced from Clever, monthly visit plans and messages. HR, for HR and managers: employees, contracts, shifts, leave and holidays, attendance from the access-control devices, and reports. Both sides share notifications and roles."}
The CRM and HR sides, and what they share.
::

## System design

::sketch-figure{name="crm-and-hr/architecture" alt="Agents, the field team, HR and managers use one web system, where roles decide who sees what, with a CRM side, an HR side and notifications. It talks both ways to the phone system, Clever, messaging apps and the access-control devices. Behind it sit the database, and queues and schedules for the slow work."}
One system for every team, with the outside systems feeding it.
::

Roles decide what each person sees, from station supervisors to the field team and HR. Queues and schedules do the slow work, so nobody waits on screen for a sync or a message to send.

### Calls and contacts

::sketch-figure{name="crm-and-hr/incoming-call" alt="When a call comes in, the phone system asks the CRM who is calling: a known caller’s record opens for the agent, and an unknown number is kept for later. When the call ends, it is logged on the contact as in, out or missed, with the agent and times."}
The agent knows who is calling before answering.
::

An unknown number is kept, so an agent can link it to a contact later.

### From punches to shifts

::sketch-figure{name="crm-and-hr/attendance" alt="Punches from the access-control devices are imported and kept raw, paired into shifts by one rule, corrected by HR and summed up in reports. Two timelines show a day shift and a 24-hour shift across midnight, each made one shift by the same rule."}
A day shift and a 24-hour shift go through the same rule.
::

Each employee’s shift tells the rule when it starts and on which day it ends. After a power or network outage, HR re-runs the period.

## In the product

::project-shot{src="/projects/crm-and-hr/visit-plan.webp" single alt="The visit calendar for a month: planned visits in yellow and completed ones in green on each day, next to the month’s totals and today’s visits." width="1760" height="852"}
The monthly visit plan, with completed visits in green.
::

::project-shot{src="/projects/crm-and-hr/attendance-sheet.webp" single alt="A week of attendance: one row per employee, with check-in and check-out times for each day and missing punches in red." width="1760" height="799"}
A week of attendance, with missing punches in red for HR to fix.
::
