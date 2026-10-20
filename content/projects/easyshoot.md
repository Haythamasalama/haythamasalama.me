---
description: 'EasyShoot is my open-source screenshot app for macOS: capture, mark up and frame screenshots in one window, with scrolling capture, Arabic right-to-left text and nothing uploaded.'
---

## Overview

EasyShoot is a free, open-source screenshot app for macOS. It lives in the menu bar: one shortcut captures an area, a window, the full screen or a long scrolling page, and the editor marks it up and frames it before it's copied or saved. I started it in October 2026 and maintain it on GitHub, where anyone can contribute.

## The problem

Sharing a clear screenshot took more steps than it should.

- **Too many apps.** Capturing, cropping, annotating and framing each happened in a different tool.
- **Long pages.** Chats, documents and web pages that scroll needed several screenshots joined by hand.
- **Arabic text.** Annotation tools often drew Arabic left-to-right or with broken letter shapes.
- **Privacy.** Some screenshot tools upload images to a cloud by default.

## The solution

::sketch-figure{name="easyshoot/before-after" alt="Before: a screenshot goes through four steps in separate apps: capture, crop in another app, annotate in a third, frame in a design tool. Long pages need several shots, Arabic text breaks, and some tools upload the image. With EasyShoot: one shortcut, then mark up and frame in one window, then copy, save or drag. Scrolling capture stitches long pages into one image, and everything stays on the Mac."}
Capture, mark-up and framing happen in one window, and nothing leaves the Mac.
::

**One window.** Arrows, text, numbered steps, highlights, crop and a background tool sit in the same editor, and presets keep every screenshot in one style.

**Scrolling capture.** EasyShoot records a region while it scrolls and stitches the frames into one tall image, in any app.

**Arabic first.** Text detects Arabic and writes right-to-left with correct shaping, in any installed font or one downloaded from Google Fonts.

**Local only.** There is no account and no cloud. Images are saved, copied or dragged straight from the Mac.

## What I did

- Defined the product, its features and its privacy rule: nothing is uploaded.
- Designed the brand, the app icon and the interface, including the Liquid Glass look on macOS 26.
- Built the app with a coding agent: I set the scope and the design, and reviewed every change before it shipped.
- Set up the build, tests and release pipeline, and the website in five languages.
- Opened the project to contributors with a guide, issue forms and a code of conduct.

## What it offers

::feature-grid
---
items:
  - icon: lucide:square-dashed
    title: Every kind of capture
    text: Area, window, fullscreen and scrolling capture, each on a shortcut you can change.
  - icon: lucide:pencil
    title: Marks that stay editable
    text: Arrows, shapes, text, counters, highlighter, pen and pixelate can be moved and restyled at any time.
  - icon: lucide:languages
    title: Arabic and five languages
    text: Right-to-left text in the editor, and an interface in English, Arabic, French, Spanish and German.
  - icon: lucide:frame
    title: Backgrounds and presets
    text: Gradients, padding, corners, shadow and aspect ratios, saved as presets that apply to new captures.
  - icon: lucide:copy
    title: Quick Access
    text: A thumbnail after each capture to copy, save, annotate or drag the image into another app.
  - icon: lucide:hard-drive
    title: Stays on the Mac
    text: No account, no cloud and no analytics; the app only goes online to download a font you pick.
---
::

## System design

::sketch-figure{name="easyshoot/architecture" alt="Capture sources on the left: area, window and fullscreen capture, and scrolling frames that a stitcher joins row by row. They feed a document that holds the image, the marks and the frame. One renderer draws the document to both the editor and the exported file. Presets, any font and right-to-left text shape the document."}
The editor and the exported image are drawn by the same renderer.
::

Captures become a document: the image, every mark and the frame around it. A single renderer draws that document on screen and into the exported file, so what you see is exactly what you save.

### Scrolling capture

The capture records a fixed region while the page scrolls. Each new frame is matched to the previous one row by row, so only the new rows are added, and headers that stay in place appear once. The stitcher is plain code with unit tests, which makes it easy for contributors to improve.

### Open to contributors

The app uses only Apple's own frameworks, and every change runs through a pipeline that builds the app, runs the tests, checks every translation and launches the app. A guide in the repository explains how to set it up and how to add a language.
