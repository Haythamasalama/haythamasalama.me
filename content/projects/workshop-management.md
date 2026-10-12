---
description: 'The system Faris Petrol’s workshops run on, which I designed and built: a bay app for technicians, a checklist the workshop edits itself, and dashboards for every branch.'
---

## Overview

Faris Oil Center is Faris Petrol's chain of workshops for oil changes, filters and car checks, across several branches. Every car that comes in gets an inspection, and I designed and built the system each one runs through, from the bay app technicians use to the dashboards managers read.

::project-shot{src="/projects/workshop-management/apps" alt="Four screens of the system. In front, the bay app's checklist, with the day's open checks along the top and services grouped into oils, filters, radiator and care, each with its condition and action. Behind it on the left, the dashboard with counters and charts; on the right, the checks list with its filters. In front at the bottom right, a customer's account with the results of their last check." width="1760" height="880"}
The bay app's checklist in front, with the dashboard, the checks list and a customer's last visit around it.
::

## The problem

- **One visit, four tools.** A paper form, a spreadsheet, an online form and a desktop database each kept part of a visit.
- **A checklist that keeps changing.** Each new or reordered service would have needed a developer.
- **No view of the workshops.** Managers couldn't see checks, services or technicians by branch.

## The solution

::sketch-figure{name="workshop-management/before-after" alt="Before: a paper form, a spreadsheet, an online form and a desktop database follow one another, each keeping part of a visit: the form was filled in by hand, the spreadsheet held name, phone, car and date, the online form held the checks but not who did them. None kept the whole visit. Now: a technician uses the bay app with code sign-in, which writes one record per visit, highlighted, and a supervisor reads dashboards per branch. Notes say a check closes only when it is complete, the workshop edits the checklist itself, and only registered devices can reach the system."}
Four tools that each kept part of a visit became one record per visit, filled in at the bay.
::

- **One record per visit,** with the car, the customer and everyone who worked on it.
- **A checklist the workshop edits itself,** built from its services, with no release needed.
- **A dashboard for every branch,** refreshing on its own.

## What I did

- Designed and built the back end, the dashboard and the bay app. The team helped early on with data models, demo data and tests.
- Wrote the specification with the workshop: what a visit holds, and the rules for starting, completing and cancelling a check.
- Designed the checklist and the life of a check, with a clear message for every refusal.
- Built the dashboards and the report on customers who stopped coming.
- Maintained and extended the system until I left the company.

## What it offers

::sketch-figure{name="workshop-management/features" alt="Six areas of the system. At the bay, highlighted: sign in with a personal code, find a car by plate, phone or name, start, save and complete a check, one open check per car, cancel only with a reason. Records: personal and business accounts, drivers under each account, cars and their history, every check with who did the work. Set-up: services and their categories, checklist templates, branches and their bays, registered devices, car properties and tags. Access: users for every branch, roles and permissions, sessions that can be revoked, edits after a check by permission. Dashboards: live counters by status and action, checks per branch and day, filters by branch and date, refreshing on their own. Reports: technicians and supervisors, peak days in each branch, car types and models, customers who stopped coming."}
Six areas, from the bay to the reports.
::

::project-shot{src="/projects/workshop-management/screens" alt="Five dashboard screens fanned out, labelled Checks, Cars, Services, Bays in each branch, and Roles and permissions." width="1760" height="860"}
Each part of the system has its own screen in the dashboard.
::

## System design

::sketch-figure{name="workshop-management/architecture" alt="Architecture: technicians use the bay app, signing in with a code, to start, fill in and complete checks. Supervisors use the dashboard with a username and password to manage customers, cars, services and users and to read the dashboards and the churn report. Both apps call one back end, which answers registered devices only. It holds the workshop's records: accounts and drivers, cars, checks (highlighted), services, branches and bays, and users and roles. It builds the checklist from the services and gives every refusal a code. Behind it, a database keeps every visit with its answers, by car and customer."}
Two apps, one back end, and only the company's registered devices can reach it.
::

One back end serves both apps. Each registered device belongs to a branch, so every check knows where it was done without anyone choosing it.

### A checklist defined by its services

::sketch-figure{name="workshop-management/checklist" alt="A supervisor sets up a service, highlighted, such as engine oil, with three fields: condition (good, fair, bad or a percentage), action (change, clean or top up) and a note. Services sit in a template, grouped into oils, filters, radiator, battery and care services, which can be reordered or switched off at any time. A technician's bay app builds the form from the template, the answers are kept as entered, and reports count every action, highlighted. A note says a new service is set up in the dashboard, not in a release."}
A new service is a setting in the dashboard, and the bay app's form follows it.
::

### The life of a check

::sketch-figure{name="workshop-management/check-lifecycle" alt="A technician finds the car by plate, phone or name, then starts a check, which is in progress; the branch comes from the device and a car can have only one open check. The check is saved as often as needed, then completed, highlighted, which needs a bay, technicians, a service and the odometer reading. A completed check stays editable for a short window, then only with a special permission. A dotted exit leads from in progress to cancelled, which needs a reason and is never edited again. Every refusal comes with a code and a message in Arabic."}
A check can't be completed until it is whole, so the record a manager reads is the one the technician finished.
::

### A dashboard for every branch

::project-shot{src="/projects/workshop-management/dashboard.webp" single alt="The dashboard: counters for checks by status, services by action and customers along the top, then charts of checks and new accounts per day for each branch, work per technician, peak days in each branch, checks by city, work per supervisor, services per branch, and the top car models, transmissions and types." width="1760" height="1503"}
Checks, services, technicians, supervisors and peak days, by branch and date.
::
