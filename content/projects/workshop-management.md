---
description: 'How I took Faris Petrol’s workshops from a paper inspection form to one system: a bay app for technicians, a checklist the workshop edits itself, and dashboards for every branch.'
---

## Overview

Faris Oil Center runs Faris Petrol's workshops for oil changes, filters and car checks, across several branches. Every car that comes in gets an inspection: technicians go through a checklist of services and record the condition of each and what they did. As a full-stack developer at Faris Petrol from 2019 to 2023, I designed and built the system the workshops run on, from the bay app technicians use to the dashboards supervisors and managers read. It went on to handle thousands of checks a month.

## The problem

When I started, the workshops had outgrown their paper form, and each tool that replaced it kept only part of a visit.

- **Records in too many places.** Visits had moved from a paper form to a spreadsheet, then an online form, then a desktop database. Each kept part of a visit, and the online form left out who did the work.
- **A checklist that keeps changing.** The workshop adds, removes and reorders services, and each one records different things. A form written in code would have needed a developer for every change.
- **Records that couldn't be trusted.** The earlier records held mistyped plates and cars that had changed owners, and a visit could be saved without the technicians who worked on it.
- **Work happens at the bay.** Technicians record checks on shared devices on the workshop floor. Signing in had to be quick, and the system had to know which branch a check came from without asking.
- **No view of the workshops.** Supervisors and managers couldn't see how many cars each branch served, which services were done, who did the work or which customers had stopped coming.

## The solution

::sketch-figure{name="workshop-management/before-after" alt="Before: a paper form, a spreadsheet, an online form and a desktop database follow one another, each keeping part of a visit: the form was filled in by hand, the spreadsheet held name, phone, car and date, the online form held the checks but not who did them. None kept the whole visit. Now: a technician uses the bay app with code sign-in, which writes one record per visit, highlighted, and a supervisor reads dashboards per branch. Notes say a check closes only when it is complete, the workshop edits the checklist itself, and only registered devices can reach the system."}
Four tools that each kept part of a visit became one record per visit, filled in at the bay.
::

**One record for every visit.** Customers, their drivers and their cars live in one place, and every check belongs to a car, a branch and the people who did the work. A technician finds a returning car by plate, phone or name and starts from its last completed check.

**A checklist the workshop edits itself.** Each service defines what is recorded for it: its condition, the action taken and a note. Services are added, reordered or switched off in the dashboard, and the bay app builds its form from them, so changing the checklist needs no new release.

**Checks that are complete by design.** A check is started, saved as often as needed and then completed, and it can't be completed without a bay, the technicians, a service and the odometer reading. A car can have only one open check, and cancelling one needs a reason.

**Built for the bay.** Only devices registered by the company can reach the system, and each device belongs to a branch, so every check knows where it was done. Technicians sign in with a personal code; supervisors use a username and password on the dashboard.

**Dashboards for every branch.** Supervisors and managers follow checks, services, technicians and customers by branch and by day, on dashboards that refresh on their own, and a churn report lists the cars that haven't been back for months.

## What I did

- Designed and built the system: the back end and its API, the dashboard, and the bay app technicians use. The team helped early on with data models, demo data and tests.
- Delivered the first version in about five and a half months, testing included.
- Wrote the specification with the workshop: what a visit holds, the rules for starting, completing and cancelling a check, and how to correct the data errors carried over from the earlier tools.
- Designed the checklist so that each service defines its own fields, and the reports that count services by the action taken.
- Designed the life of a check and its rules, with a code and an Arabic message for every refusal, so technicians know what is missing.
- Built the dashboards and the churn report for supervisors and management.
- Set up device registration, code sign-in at the bay, roles and permissions, and a log of sessions that can be revoked.
- Maintained and extended the system until I left the company.

## What it offers

::feature-grid
---
items:
  - icon: lucide:search
    title: Find any car
    text: Search by plate, phone or customer name, and see the car's last completed check.
  - icon: lucide:users
    title: Customers, drivers and cars
    text: Personal and business accounts, with their drivers and their cars kept together.
  - icon: lucide:clipboard-check
    title: A checklist for every visit
    text: Each service records its condition, the action taken and a note.
  - icon: lucide:wrench
    title: Who did the work
    text: Every check records the technicians who inspected the car, those who serviced it and the supervisor.
  - icon: lucide:sliders-horizontal
    title: A checklist without code
    text: Services are added, reordered or switched off from the dashboard.
  - icon: lucide:map-pin
    title: Branches and bays
    text: Each check belongs to the branch of the device it came from and the bay the car was on.
  - icon: lucide:layout-dashboard
    title: Dashboards for every branch
    text: Checks, services, technicians and peak days by branch and date, refreshing on their own.
  - icon: lucide:user-x
    title: Customers who stopped coming
    text: A report lists the cars that haven't been back for months, with their last visit.
---
::

## System design

::sketch-figure{name="workshop-management/architecture" alt="Architecture: technicians use the bay app, signing in with a code, to start, fill in and complete checks. Supervisors use the dashboard with a username and password to manage customers, cars, services and users and to read the dashboards and the churn report. Both apps call one back end, which answers registered devices only. It holds the workshop's records: accounts and drivers, cars, checks (highlighted), services, branches and bays, and users and roles. It builds the checklist from the services and gives every refusal a code. Behind it, a database keeps every visit with its answers, by car and customer."}
Two apps, one back end, and only the company's registered devices can reach it.
::

One back end serves two apps through the same API. The bay app is where technicians start, fill in and complete checks; the dashboard is where supervisors manage customers, cars, services and users, and read the reports. Every request is checked against the device it came from and the user's role, and anything incomplete is refused with a coded error.

### One record for every visit

**Customers, drivers and cars.** An account is a person or a business, with drivers under it and cars kept with the main account. Every check is filed under the car and the person who brought it, so a car's history stays in one place.

**Found at the bay.** A search by plate, phone or name returns the account, its drivers and its cars, with the last completed check, so a returning car starts from its history instead of a blank form.

### A checklist defined by its services

::sketch-figure{name="workshop-management/checklist" alt="A supervisor sets up a service, highlighted, such as engine oil, with three fields: condition (good, fair, bad or a percentage), action (change, clean or top up) and a note. Services sit in a template, grouped into oils, filters, radiator, battery and care services, which can be reordered or switched off at any time. A technician's bay app builds the form from the template, the answers are kept as entered, and reports count every action, highlighted. A note says a new service is set up in the dashboard, not in a release."}
A new service is a setting in the dashboard, and the bay app's form follows it.
::

Each service carries its own definition: how its condition is rated, which actions apply to it and room for a note. The template groups services into categories in the order the workshop works, and the bay app builds the form from it. For the workshop, a new service or a new order is a setting rather than a release; for management, every report can count what was changed, cleaned or topped up.

### The life of a check

::sketch-figure{name="workshop-management/check-lifecycle" alt="A technician finds the car by plate, phone or name, then starts a check, which is in progress; the branch comes from the device and a car can have only one open check. The check is saved as often as needed, then completed, highlighted, which needs a bay, technicians, a service and the odometer reading. A completed check stays editable for a short window, then only with a special permission. A dotted exit leads from in progress to cancelled, which needs a reason and is never edited again. Every refusal comes with a code and a message in Arabic."}
Each step checks what it needs, and every refusal says what is missing.
::

A check moves from in progress to completed or cancelled, and every step is guarded. Starting refuses a car that already has an open check. Completing refuses a check without its bay, technicians, services and odometer reading. Once completed, a check stays editable for a short window and then only with a special permission, so the record a manager reads is the one the technician finished.

### At the bay

**Registered devices.** The system answers only devices the company has registered, and each one is tied to a branch. A check started on a device belongs to that branch, so nobody picks a branch by hand.

**Quick sign-in.** Technicians sign in on the bay device with a personal code; supervisors and managers use a username and password on the dashboard. Sessions are logged and can be revoked from the dashboard.

### Dashboards and reports

**Dashboards.** Counters and charts show checks by status, services by the action taken, technicians, supervisors, peak days and car types, filtered by branch and date, and they refresh on their own.

**Customers who stopped coming.** The churn report lists the cars whose last visit was several months ago, with the services they had and who served them, so the workshop can follow up.
