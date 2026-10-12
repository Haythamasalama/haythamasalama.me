---
description: 'A web system I built for Qur’an memorization circles: teachers record each student’s week and tests, and every student sees their memorization, review, attendance and rank in the circle.'
---

## Overview

A web system for Qur'an memorization circles. Teachers record what each student memorized and reviewed every week, their attendance and their tests, and each student signs in to a dashboard of their own progress and rank in the circle. I built it in 2016.

## The problem

A memorization circle has a lot to follow for every student, every week.

- **Memorization and review.** How many pages each student memorized and reviewed, and from which surah to which.
- **Attendance and tests.** The days each student came, and the grade for each part (juz') tested.
- **Where each student stands.** A rank in the circle that the student can see, not only the teacher.

## The solution

::sketch-figure{name="quran-tracker/week" alt="A week in a memorization circle, left to right: the teacher records each student's week (pages memorized, pages reviewed, days attended, and tests with the part and the grade); the records give each student a rank in the circle, highlighted; and the student's dashboard shows, for example, memorized 5 of 5 pages, reviewed 5 of 7 pages, attended 5 of 6 days and rank 1 of 12. Below: memorization and test data can be exported."}
The teacher's weekly records become each student's progress and rank.
::

**One record a week.** The teacher enters each student's memorization and review, from which surah and verse to which, and every test with its part and grade.

**A dashboard for every student.** Students see their week at a glance: pages memorized and reviewed, days attended, their score and their rank in the circle.

## What I did

- Built the system: the teacher and student accounts, the weekly records, tests, ranking and export.

## What it offers

::feature-grid
---
items:
  - icon: lucide:users
    title: Circles of students
    text: Teachers register students into a circle and manage its list.
  - icon: lucide:book-open
    title: Weekly memorization
    text: Pages memorized each week, from which surah and verse to which.
  - icon: lucide:repeat
    title: Review
    text: Pages reviewed each week, out of the pages set.
  - icon: lucide:calendar-check
    title: Attendance
    text: The days each student attended in the week.
  - icon: lucide:clipboard-check
    title: Tests by part
    text: Each test records the part (juz') and the grade.
  - icon: lucide:trophy
    title: A rank in the circle
    text: Every student sees their score and their place among the circle.
  - icon: lucide:download
    title: Export
    text: Memorization and test data can be exported.
---
::
