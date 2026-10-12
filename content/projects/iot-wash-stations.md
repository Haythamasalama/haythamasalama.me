---
description: 'How I linked Faris Petrol’s wash bays to its card system: a customer scans their Faris card, the server checks they fuelled recently, and a Raspberry Pi at the bay runs the pump for their wash time.'
---

## Overview

Faris Petrol runs fuel stations in Palestine, and some of them have car-wash bays. Customers who fuel with a Faris card can wash their car there: they scan the card at the bay, and the pump runs for the wash time they have left that day. I had been a full-stack developer at Faris Petrol since 2019, and I designed and built the system behind it, from the circuit at each bay to the server that runs them. It ran at several stations.

## The problem

The wash was a service for card customers, so every bay had to know whose card was in front of it and how much time that card had left.

- **Only for recent customers.** A bay could start only for a Faris card that had fuelled recently, and that answer lived in the company’s card system.
- **Time that adds up.** Each card has a wash time for the day, and a customer may use it in more than one go, so the time had to be measured, not estimated.
- **A pump to switch.** A small computer at the bay had to switch the pump on and off, with lights that show the customer what is happening.
- **A copy on every Pi.** The first version ran the whole system on each Raspberry Pi, so every bay had its own data, settings and code to update.

## The solution

::sketch-figure{name="iot-wash-stations/before-after" alt="Before: at each bay a Raspberry Pi ran its own web server, database, and logic and GPIO, and switched its own pump, so every Pi kept its own copy of the data, the settings and the code. Now: one server holds the data, the rules and the dashboard, and sends commands to a Raspberry Pi at every bay; each Pi only switches its pump and lights."}
The Pis no longer run the system: one server decides, and each Pi switches what it is told to.
::

**A check against the card system.** When a card is scanned, the server asks the company’s card system when it last fuelled, and starts the wash only if that was recent. It keeps the answer, so a returning customer is usually checked without asking again.

**Time measured per session.** Every start and stop is recorded, so the server always knows how much of the day’s time a card has used. Scanning again pauses the wash, the next scan carries on, and a queued job switches the pump off at the end of each turn, or sooner when the day’s time runs out.

**A circuit at every bay.** A Raspberry Pi at each bay drives a relay that switches the pump, and three lights that show whether it is running. The bay’s screen and card scanner are plugged into the same Pi.

**One server for all stations.** I moved the system to one central server. Stations and their bays are registered there, and the server sends each bay’s Pi its commands over the network, so the data, the settings and every update live in one place.

## What I did

I built this project on my own.

- Designed and built the system end to end: the bay screen, the server, the dashboard for staff and the circuit at each bay.
- Wrote the first version, which ran on each Raspberry Pi, then moved it to one server that drives every bay’s Pi over the network.
- Connected it to the company’s card system to check each card’s recent fuelling, and kept the answers so repeat customers aren’t slowed down.
- Built the wash sessions: a daily wash time, pause and carry on, extra time added by staff, and a queued job that stops the pump on time.
- Built the dashboard: every wash by station, bay, card and customer, switching a bay on or off, registering bays and their pins, and the settings behind the rules.

## What it offers

::feature-grid
---
items:
  - icon: lucide:scan-qr-code
    title: Scan to start
    text: Customers scan their Faris card at the bay, or type its number, and the pump starts.
  - icon: lucide:fuel
    title: For customers who fuel
    text: Only a card that fuelled recently is accepted, checked against the company’s card system.
  - icon: lucide:timer
    title: A wash time for the day
    text: Each card has a wash time per day, used in turns, and the pump stops when it is used up.
  - icon: lucide:circle-pause
    title: Pause and carry on
    text: Scanning again pauses the wash, and the next scan carries on with the time that is left.
  - icon: lucide:lightbulb
    title: Lights at the bay
    text: Status lights show the customer when the pump is running and when it has stopped.
  - icon: lucide:layout-dashboard
    title: Every wash on record
    text: Staff see each wash by station, bay, card and customer, with the time it used.
  - icon: lucide:circle-plus
    title: Extra time and control
    text: Staff can give a session extra time, or switch a bay on or off, from the dashboard.
  - icon: lucide:sliders-horizontal
    title: Rules as settings
    text: The wash time, the length of a turn, how recent a fuelling must be and each bay’s pins are settings.
---
::

## System design

::sketch-figure{name="iot-wash-stations/architecture" alt="Architecture: a customer scans their card at the bay screen, which sends the card number to one server for all stations. The server checks that the request comes from a registered bay, checks with the Faris card system that the card fuelled recently (asking only when its own record is too old), opens a session with the time left today, and queues a job that stops the pump on time. It sends GPIO commands to the Raspberry Pi at the bay, which switches a relay for the pump and three status lights. Staff use a dashboard on the same server, which can also switch a bay on or off. Behind the server sit the database of cards, sessions and logs, and the queue of delayed stop jobs."}
The bays hold no data: the server decides, and the Pi at the bay switches.
::

One server runs all the stations. A bay’s screen sends it the scanned card number, and the server checks the bay, the card and the time left before it tells that bay’s Raspberry Pi to start the pump. A queue holds the job that will stop it, and the dashboard for staff runs on the same server, so a wash at any station can be followed from one place.

### From a scan to a running pump

::sketch-figure{name="iot-wash-stations/scan-flow" alt="Flow: the customer scans their Faris card; the server checks that the scan came from a registered bay, that the card fuelled recently (from its local record first, then the card system) and that time is left today; then the pump starts and a stop job is queued. Each failed check refuses the wash: an unknown device, no recent fuelling, or time used up today. While a wash runs, scanning again pauses it and keeps the time used, scanning later carries on with the time left, and at the end of a turn the queued job stops the pump."}
Every refusal happens before the pump starts, and every start has a job waiting to stop it.
::

**Three checks, in order.** The bay, the card, then the time left today. Only when all three pass does the pump start, so a wash never runs for an unknown device or for a card that hasn’t fuelled.

**Sessions.** A card’s first scan of the day opens a session with that day’s wash time. Each run of the pump is logged with its start and end, so the time left is always the day’s time, plus any extra from staff, minus what was used.

**Stopping on time.** Every start queues a job that switches the pump off at the end of the turn, or sooner when the day’s time runs out, so a wash ends on time even if nobody scans again.

### The circuit at every bay

::sketch-figure{name="iot-wash-stations/hardware" alt="The circuit at every bay: a bay screen and a card scanner are plugged into a Raspberry Pi, and the screen sends the card number to the server. The Pi runs a GPIO service that the server sends commands to over the network. From its GPIO pins, one wire goes to a relay that switches the pump’s power, and three wires go through resistors to the status lights: green for running, red for stopped and yellow for a warning."}
The Pi only switches pins; everything the bay shows comes from the server.
::

Each bay has a Raspberry Pi with a relay and three status lights on its GPIO pins. The relay switches the pump’s power, and the lights tell the customer whether the pump is running. The pins are set per bay in the dashboard, so a bay wired differently needs no change to the code.

### One server for all stations

**Bays as devices.** Stations and their bays are registered in the dashboard. Each bay’s Pi is recognised by its network address, so a scan counts only from a registered bay, and the server always knows which pump to switch.

**GPIO over the network.** Each Pi runs a small GPIO service. For every change, the server connects to it, sets the pins for the pump and the lights, and closes the connection, so the Pi itself holds no data and no rules.

**What it changed.** One copy of the data and the settings, one place to deploy an update, and every wash at every station in the same dashboard.
