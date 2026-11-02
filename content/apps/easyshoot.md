---
description: 'EasyShoot is my screenshot app for macOS, coming soon to the Mac App Store: capture, mark up, blur and frame screenshots in one window, with Arabic right-to-left text, no account and nothing uploaded.'
---

## Overview

::project-shot{src="/apps/easyshoot/editor.webp" single bare alt="The EasyShoot editor on macOS, in light mode. A screenshot of a WhatsApp Business dashboard sits on a soft blue background, marked up with a dashed red box and step 1 around this month's cost, a curved arrow pointing to the lowest day on the chart with the label 'Lowest day', and step 2 circling a rejected template. The toolbar holds the drawing tools; the inspector on the right shows the Style tab with colour, background, size, shadow and opacity." width="1760" height="1060"}
One capture, marked up with a dashed box, numbered steps, a curved arrow and a label.
::

EasyShoot is a screenshot app for macOS 14 and later. It lives in the menu bar: one shortcut captures an area, a window or the full screen, and the editor marks it up, hides private details and frames it before it's copied or saved. I started it in October 2026, and it is coming soon to the Mac App Store.

## The problem

Sharing a clear screenshot took more steps than it should.

- **Too many apps.** Capturing, cropping, annotating and framing each happened in a different tool.
- **Private details.** Names, emails and phone numbers had to be blurred in yet another app before sharing.
- **Arabic text.** Annotation tools often drew Arabic left-to-right or with broken letter shapes.
- **Privacy.** Some screenshot tools want an account or upload images to a cloud by default.

## The solution

::sketch-figure{name="easyshoot/before-after" alt="Before: a screenshot goes through four steps in separate apps: capture, crop in another app, annotate in a third, frame in a design tool. Hiding private details takes another tool, Arabic text breaks, and some tools upload the image. With EasyShoot: one shortcut, then mark up and frame in one window, then copy, save or drag. Pixelate or blur hides private details in place, and everything stays on the Mac."}
Capture, mark-up and framing happen in one window, and nothing leaves the Mac.
::

**One window.** Arrows, shapes, numbered steps, text, pen, crop and a background tool sit in the same editor, and presets keep every screenshot in one style.

**Hide what's private.** Pixelate or blur names, emails and phone numbers right in the editor, with a strength you choose.

**Arabic first.** Text detects Arabic and writes right-to-left with correct shaping, in any installed font or one downloaded from Google Fonts. The whole interface is in Arabic too.

**Local only.** There is no account and no tracking. Images are saved, copied or dragged straight from the Mac.

## What I did

- Defined the product, its features and its privacy rule: nothing is uploaded.
- Designed the brand, the app icon and the interface on Apple's macOS 27 design kit, with Liquid Glass on macOS 26 and later.
- Built the app with a coding agent: I set the scope and the design, and reviewed every change before it shipped.
- Prepared it for the Mac App Store: a sandboxed build, ScreenCaptureKit capture and the store listing.
- Built the website and its user guide in five languages.

## What it offers

::feature-grid
---
items:
  - icon: lucide:square-dashed
    title: Every kind of capture
    text: Area, window and fullscreen capture, each on a shortcut you can change, plus any image on the clipboard.
  - icon: lucide:pencil
    title: Marks that stay editable
    text: Arrows, shapes, numbered steps, text and pen can be moved and restyled at any time.
  - icon: lucide:eye-off
    title: Pixelate and blur
    text: Hide names, emails and card numbers before you share, with the strength you choose.
  - icon: lucide:frame
    title: Backgrounds and presets
    text: Gradients, padding, corners, shadow and aspect ratios, saved as presets that apply to new captures.
  - icon: lucide:copy
    title: Quick Access
    text: A thumbnail after each capture to copy, save, annotate or drag the image into another app.
  - icon: lucide:languages
    title: Arabic and five languages
    text: Right-to-left text in the editor, and an interface in English, Arabic, French, Spanish and German.
  - icon: lucide:shield-check
    title: No account, no tracking
    text: No sign-up, no cloud and no analytics; the app only goes online for a font you pick and to check for updates.
  - icon: lucide:app-window
    title: Native on the Mac
    text: Built with SwiftUI and AppKit, in light and dark, and delivered through the Mac App Store.
---
::

## System design

::sketch-figure{name="easyshoot/architecture" alt="Capture sources on the left: area, window and fullscreen capture, or an image on the clipboard, through ScreenCaptureKit. They feed a document that holds the image, the marks and the frame. One renderer draws the document to both the editor and the exported file. Presets, any font and right-to-left text shape the document."}
The editor and the exported image are drawn by the same renderer.
::

Captures become a document: the image, every mark and the frame around it. A single renderer draws that document on screen and into the exported file, so what you see is exactly what you save.

### Built for the App Store

The app uses only Apple's own frameworks and runs in the App Sandbox. Capture goes through ScreenCaptureKit, and files are written only where you choose to save them. Every change runs through a pipeline that builds the app, runs the tests and checks every translation.

## In the product

::project-shot{src="/apps/easyshoot/blur.webp" single bare alt="The editor with the pixelate tool selected. The inspector shows the pixelate and blur options with a strength slider set to 9, and a selection box covers a store name in the dashboard's sidebar." width="1760" height="1086"}
Pixelate or blur, with a strength slider, for names and numbers.
::

::project-shot{src="/apps/easyshoot/background.webp" single bare alt="The editor's Background tab: the marked-up screenshot sits on a blue gradient. The inspector shows gradient swatches and sliders for padding, corner radius, shadow and shadow opacity, an aspect ratio menu and an alignment grid." width="1760" height="1086"}
The background tool frames a capture with a gradient, padding, corners and shadow.
::

::project-shot{src="/apps/easyshoot/arabic.webp" single bare alt="The editor in Arabic, laid out right to left: the toolbar, the inspector's Style tab and the menus are in Arabic. The screenshot is the Arabic version of the dashboard, marked up with a dashed box and step 1, a curved arrow labelled 'أقل يوم' (lowest day), and step 2." width="1760" height="1086"}
The same editor in Arabic, from right to left.
::

::project-shot{src="/apps/easyshoot/shortcuts.webp" single bare alt="EasyShoot's Settings window on the Shortcuts page: global shortcuts for Capture Area, Capture Window, Capture Fullscreen and Annotate Clipboard Image, a Restore Defaults button, and single-key shortcuts for each drawing tool such as A for arrow, R for rectangle and T for text." width="1722" height="1281"}
Every capture and every drawing tool has a shortcut.
::
