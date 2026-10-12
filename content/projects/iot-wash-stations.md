---
description: 'How I linked Faris Petrol’s wash bays to its card system: a customer scans their Faris card, the server checks they fuelled recently, and a Raspberry Pi at the bay runs the pump for their wash time.'
---

## Overview

Faris Petrol runs fuel stations in Palestine, and some have car-wash bays. Customers who fuel with a Faris card scan it at the bay, and the pump runs for the wash time they have left that day. As a full-stack developer there since 2019, I designed and built the system behind it, from the circuit at each bay to the server, and it ran at several stations.

## The problem

Every bay had to know whose card was in front of it and how much time that card had left.

- **Only for recent customers.** A wash needs a card that fuelled recently, and its daily time is used in turns.
- **A pump to switch.** A small computer at each bay drives the pump and the lights the customer sees.
- **A copy on every Pi.** The first version ran the whole system on each Raspberry Pi, with its own data and code.

## The solution

::sketch-figure{name="iot-wash-stations/before-after" alt="Before: each bay’s Raspberry Pi ran its own web server, database, logic and GPIO, with its own copy of the data and code. Now: one server holds the data, rules and dashboard and sends commands to a Pi at every bay, which only switches its pump and lights."}
The Pis no longer run the system: one server decides, and each Pi switches what it is told to.
::

**Checks before every start.** The server asks the company’s card system when the card last fuelled, and keeps the answer for next time. Every run of the pump is logged, so it always knows how much of the day’s time is left.

**A circuit at every bay.** A Raspberry Pi drives a relay that switches the pump, and three status lights.

**One server for all stations.** I moved the system to one server that sends each bay’s Pi its commands over the network, so the data, the settings and every update live in one place.

## What I did

I built this project on my own.

- Designed and built it end to end: the bay screen, the server, the staff dashboard and the circuit at each bay.
- Wrote the first version on each Raspberry Pi, then moved it to one server that drives every bay.
- Connected it to the company’s card system, and kept its answers so repeat customers aren’t slowed down.
- Built the wash sessions: daily time, pause and carry on, extra time from staff, and a queued stop job.
- Built the dashboard for every wash, the stations, the bays and their pins, and the settings behind the rules.

## What it offers

::sketch-figure{name="iot-wash-stations/feature-map" alt="Everything the system does. At the bay: scan or type the card, pause and carry on, status lights, a relay for the pump, one card at a time. On the server: registered bays only, a fuelling check with the Faris card system, cards remembered, a daily wash time, stop on time. In the dashboard: every wash on record, extra time, a bay on or off, stations and bays with their pins, settings."}
What the customer touches at the bay, the rules the server applies, and what staff control from the dashboard.
::

::feature-grid
---
items:
  - icon: lucide:scan-qr-code
    title: Scan to start
    text: Customers scan their Faris card at the bay, or type its number.
  - icon: lucide:fuel
    title: For customers who fuel
    text: Only a card that fuelled recently starts the pump.
  - icon: lucide:timer
    title: A wash time for the day
    text: Each card’s daily time is used in turns, then the pump stops.
  - icon: lucide:circle-pause
    title: Pause and carry on
    text: Scanning again pauses the wash, and the next scan carries on.
  - icon: lucide:layout-dashboard
    title: Every wash on record
    text: Staff see each wash by station, bay, card and customer.
  - icon: lucide:sliders-horizontal
    title: Control from the dashboard
    text: Staff add extra time, switch a bay on or off and change the rules.
---
::

## System design

::sketch-figure{name="iot-wash-stations/architecture" alt="Architecture: the bay screen sends the scanned card number to one server for all stations. The server checks the bay, asks the Faris card system about recent fuelling when its own record is too old, opens a session and queues a stop job, then sends GPIO commands to the bay’s Raspberry Pi, which switches the pump’s relay and three lights. Staff use a dashboard on the same server, with a database and a queue behind it."}
The bays hold no data: the server decides, and the Pi at the bay switches.
::

One server runs every station. A bay’s screen sends it the card number, and the server checks the bay, the card and the time left before it tells that bay’s Pi to start the pump.

### From a scan to a running pump

::sketch-figure{name="iot-wash-stations/scan-flow" alt="Flow: scan the Faris card, then three checks in order: a registered bay, recent fuelling (local record first, then the card system) and time left today; each failed check refuses the wash. Then the pump starts and a stop job is queued. While it runs, scanning again pauses it, scanning later carries on, and the queued job stops the pump at the end of a turn."}
Every refusal happens before the pump starts, and every start has a job waiting to stop it.
::

The checks run in a fixed order: the bay, the card, then the time left. Every start queues a job that switches the pump off at the end of the turn, even if nobody scans again.

### The circuit at every bay

::sketch-figure{name="iot-wash-stations/hardware" alt="A Raspberry Pi with its 40-pin header takes commands from the server over the network; the bay screen and scanner are plugged into it. Pin 2 gives 5V and pin 6 ground. Pins 8, 10 and 12 drive red (stopped), yellow (warning) and green (running) lights through resistors. Pin 18, highlighted, drives the relay that switches the pump. Pin 32 reads a push button."}
The highlighted path is the one that matters: pin 18 drives the relay that switches the pump.
::

The relay switches the pump’s power, and the lights tell the customer whether it is running. The pins are set per bay in the dashboard, so a bay wired differently needs no change to the code.

### One server for all stations

::sketch-figure{name="iot-wash-stations/one-server" alt="Stations and their bays are registered in the dashboard, each bay with its address and pins. For every change the server connects to that bay’s Pi, sets the pump and lights, and closes the connection. The Pis hold no data and no rules."}
Every Pi is the same; the dashboard says where it is and which pins it uses.
::

Each bay’s Pi is recognised by its network address, so the server knows which pump to switch. The result: one copy of the data, one place to update, and every wash in one dashboard.

## In the product

::project-shot{src="/projects/iot-wash-stations/circuit.webp" single alt="A breadboard wiring drawing: a Raspberry Pi 3 with pins 2 and 6 for 5V and ground, pins 8, 10 and 12 to three lights through resistors, pin 32 to a push button, and pin 18 to a relay module labelled in Arabic “the load or machine”, beside the Pi’s pin map." width="1280" height="737"}
My original wiring drawing for a bay, with the Raspberry Pi’s pin map beside it.
::
