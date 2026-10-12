---
description: 'The CRM I built with one other developer for Faris Petrol’s customer service and field teams, linked to the phone system and Clever, and the HR system that turns access-control punches into shifts.'
---

## Overview

Faris Petrol issues Faris electronic cards and runs Clever, a loyalty app with partner stores. Its customer service team answers card holders, Clever customers and partner stores, and a field team visits those stores. I joined Faris Petrol as a full-stack developer in 2019, and from September 2020 I built the system these teams work in, together with one other developer: contacts, calls, tickets, visits and messages in one place, linked to the phone system and to Clever. The same system holds HR: employees, contracts, shifts and leave, with attendance read from the company’s access-control devices.

## The problem

The teams needed one place for their daily work, and HR needed attendance it could rely on.

- **Calls without context.** A call reached an agent as a phone number. Who was calling, and what they had asked before, had to be looked up somewhere else.
- **Requests without an owner.** Complaints and requests from customers and stores needed someone responsible, a priority and a follow-up until they were closed.
- **Partner stores in another system.** The stores that accept Clever, their branches and their balances lived in Clever, and the field team’s visits to them needed a plan and a record.
- **Messages to many people.** Notices went to long lists of customers by SMS and WhatsApp, which needed templates and sending in bulk.
- **Punches, not shifts.** The access-control devices record punches. HR needed the shifts people actually worked, including 24-hour shifts that cross midnight, and a way to repair the record after a power or network outage.

## The solution

::sketch-figure{name="crm-and-hr/before-after" alt="Before: a person moves between four separate places: the phone system, which shows only a number; an old CRM with contacts; Clever, with stores and balances; and the access-control devices, with raw punches. Each answer meant another system, and punches were not yet shifts. Now: one system with a CRM side (contacts, calls, tickets, visits, stores and messages) and an HR side (employees, shifts, leave and attendance), linked both ways to the phone system, Clever, SMS, WhatsApp and Telegram, and the access-control devices."}
One record per customer and per employee, fed by the systems around it.
::

**The caller on screen.** The CRM is linked to the phone system. When a call comes in, the agent sees who is calling and opens their record, and every call is logged on it.

**Tickets with an owner.** Every request becomes a ticket with a priority, a status, a responsible person and a group. Comments and attachments stay on the ticket, and tickets left open too long send reminders.

**Stores and visits from Clever.** Partner stores, their branches and their cashiers are synced from Clever on a schedule, and the team is told when a store’s balance runs low. Each month the system plans a visit to every active store, spread over the month by area.

**Messages in bulk.** SMS go out from templates, and WhatsApp messages are sent in bulk from a spreadsheet, queued and spaced out.

**Shifts from punches.** Punches are imported from the devices, and one rule pairs each employee’s punches into the shift they work, on the same day or the next. HR can fix a missed punch or re-run a day after an outage.

## What I did

I set up the project and built it with one other developer, releasing it a module at a time from a feature plan for each release.

- Built the HR side: employees and contracts, with import from spreadsheets; shifts, holidays and leave; and attendance from the access-control devices, including the rule that pairs punches into shifts and the tools HR uses to correct them.
- Built the phone-system integration that shows the caller and logs every call.
- Built SMS sending with templates, and the monthly plan of store visits with its reminders.
- Built the scheduled jobs that sync stores from Clever and warn the team when a balance runs low.
- Built contacts, tickets, visits, the connection to Clever, and WhatsApp and Telegram messaging together with the other developer.
- Set up the roles and permissions that decide what each person sees, from station supervisors to the field team and HR.

## What it offers

::feature-grid
---
items:
  - icon: lucide:phone-incoming
    title: The caller, before you answer
    text: When a call comes in, the agent sees who is calling and opens their record, and every call is logged.
  - icon: lucide:contact
    title: One record per customer
    text: A contact holds their Faris cards, notes, tickets and calls, and can be looked up in Clever by phone number.
  - icon: lucide:ticket
    title: Tickets with an owner
    text: Priorities, statuses, a responsible person and group, comments and attachments, and reminders for tickets left open.
  - icon: lucide:map-pin
    title: Planned field visits
    text: A monthly plan visits every partner store, and each visit records where it took place.
  - icon: lucide:store
    title: Partner stores from Clever
    text: Stores, branches and cashiers are synced from Clever, with a notice when a store’s balance runs low.
  - icon: lucide:send
    title: Messages in bulk
    text: SMS from templates, and WhatsApp messages sent to a list from a spreadsheet.
  - icon: lucide:bell
    title: Alerts where people are
    text: Ticket events, reminders and the day’s visits reach the team in the system and on Telegram.
  - icon: lucide:calendar-check
    title: Attendance from the devices
    text: Punches from the access-control devices become shifts, next to leave, holidays and contracts.
---
::

## System design

::sketch-figure{name="crm-and-hr/architecture" alt="Architecture: agents, the field team, HR and managers use one web system, where roles decide who sees what. It has a CRM side (contacts, calls, tickets, visits, stores and messages), an HR side (employees, contracts, shifts, leave, holidays and attendance) and notifications in the system and on Telegram. It talks both ways to the phone system, which shows the caller and logs every call; to Clever, for partner stores, branches, balances and customers; to SMS, WhatsApp and Telegram; and to the access-control devices, for the people on each device and their punches. Behind it sit the database and the queues and schedules that sync Clever, send messages, and import and pair punches."}
One system for every team, with the outside systems feeding it.
::

One web system serves every team, and roles decide what each person sees. The CRM and HR sides share the same users, branches and notifications. Queued and scheduled jobs do the slow work, such as syncing Clever, sending messages and importing punches, so nobody waits for them on screen.

### Calls and contacts

::sketch-figure{name="crm-and-hr/incoming-call" alt="When a call comes in: a customer calls, the phone system asks the CRM who the number belongs to, and if the number is known the agent opens the caller’s record and past calls; if not, the number is kept so it can be linked to a contact later. When the call ends: the phone system reports it, the call log records whether it was incoming, outgoing or missed, and the call is logged on the contact with the agent and the times."}
The agent knows who is calling before answering, and every call ends up on the caller’s record.
::

The phone system asks the CRM who is calling, so the agent can open the caller’s record, with their cards, notes, tickets and past calls, before answering. A number the CRM doesn’t know is kept, and an agent can link it to a contact later. When the call ends, the phone system reports it, and it is logged on the contact with its direction, the agent and its times.

### Tickets

**From whom, about whom.** A ticket records who raised it and who it is about, and each can be a contact, a store or an employee, so every complaint is followed up the same way.

**Follow-up.** The responsible person and group are notified in the system and on Telegram when a ticket is created, updated, commented on or closed, and a ticket left open too long sends a reminder.

### Partner stores and visits

**Synced from Clever.** Stores, branches and cashiers come from Clever on a schedule, with each branch’s balance, and the team is told on Telegram when a balance runs low.

**Visit plans.** Each month the system spreads a visit to every active store over the month, grouped by area and assigned to the person who covers it, and the field team gets the day’s visits on Telegram.

**Where it happened.** Ending a visit records the visitor’s location from the browser and saves it on the store, so the store’s location stays current.

### Messages

SMS go out from templates to a contact or a Clever customer. WhatsApp messages can be sent to a list in a spreadsheet; each one is queued, with a short pause between them.

### From punches to shifts

::sketch-figure{name="crm-and-hr/attendance" alt="From punches to shifts: the people on each access-control device are linked to employees; their punches are imported for a period and kept raw; one rule pairs them into shifts, using each employee’s shift to know when it starts, when it ends and on which day; HR fixes a missed punch, or re-runs a day after an outage, in the attendance records; and reports show hours worked, leave and holidays. Below, two timelines over two days: a day shift is a check-in and a check-out on the same day, and a 24-hour shift is a check-in on day 1 and a check-out on day 2, across midnight. Both are one shift under the same rule."}
A day shift and a 24-hour shift go through the same rule.
::

Punches are imported from the devices for a period and kept as they were recorded. Each employee’s shift says when it starts, when it ends and whether it ends the next day, and one rule pairs the punches against it. HR can add or fix a punch, remove a wrong record and re-run a period after a power or network outage, and leave and holidays sit next to the attendance they explain.
