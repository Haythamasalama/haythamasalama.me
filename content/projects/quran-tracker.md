---
description: 'A web system I designed and built for Qur’an memorization circles: teachers record each student’s week, and students and parents follow memorization, tests and rank.'
---

## Overview

::project-shot{src="/projects/quran-tracker/screens.webp" single bare alt="Three screens of the system, in Arabic, with demo data. In front, a student's dashboard: notifications, the date, the student's role and circle, attendance (5 of 6 days), grade and rank (100 of 100, first of 12 students), and the pages reviewed and memorized with the surahs they run between. Tilted behind it, the teacher's weekly entry form on the left, and the test entry form on the right." width="1760" height="660"}
A student's dashboard in front, with the teacher's weekly entry and test entry behind it.
::

A web system for Qur'an memorization circles. Teachers record each student's week: attendance, the pages memorized and reviewed, a grade and a rank in the circle, and tests. Students sign in to a dashboard of their own progress, and parents follow their child's progress and test scores. I designed and built it on my own in 2016.

## The problem

A memorization circle has a lot to follow for every student, every week.

- **Memorization and review.** How many pages each student memorized and reviewed, and from which surah to which.
- **Attendance and tests.** The days each student came, and the grade for each part (juz') tested.
- **Where each student stands.** A grade and a rank in the circle that students and parents can see, not only the teacher.

## The solution

::sketch-figure{name="quran-tracker/week" alt="A week in a memorization circle, left to right: the teacher records each student's week (days attended, pages memorized, pages reviewed, a grade and rank, and tests with the part and the grade); it is kept as the student's record, highlighted; and the student's dashboard shows, for example, memorized 5 of 5 pages, reviewed 5 of 7 pages, attended 5 of 6 days, grade 100 of 100 and rank 1 of 12. Below: memorization and test data can be exported."}
The teacher's weekly entry becomes each student's dashboard.
::

**One form a week.** For each student, the teacher enters the days attended, the pages memorized and reviewed with the surahs they run between, and a grade and rank in the circle. Tests are entered by part, with their grade.

**A dashboard for every student.** Students see their week at a glance: attendance, pages memorized and reviewed, their grade and their rank in the circle.

## What I did

- Designed and built the whole system on my own: the teacher, student and parent views, the weekly records, tests, ranking and export.

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
    text: The teacher sets each student's grade and place in the circle, and the student sees both.
  - icon: lucide:house
    title: A view for parents
    text: Parents follow their child's memorization progress and test scores.
  - icon: lucide:download
    title: Export
    text: Memorization and test data can be exported.
---
::

## In the product

The screens show demo data, entered under my own name.

::project-shot{src="/projects/quran-tracker/dashboard.webp" single alt="A student's dashboard: an empty notifications box, the date, the student role and the circle's name, then cards for attendance (5 of 6 days, absent 1), grade and rank (100 of 100, first of 12 students), review (5 of 7 pages, between two surahs) and memorization (5 of 5 pages, between two surahs). The student's name and the menu sit on the right." width="1760" height="799"}
A student's week at a glance.
::

::project-shot{src="/projects/quran-tracker/weekly-record.webp" single alt="The teacher's weekly entry form: a student picker, then sections for attendance (days attended out of 6, days absent), memorization (pages out of the pages set, from which surah to which), review (the same fields) and grade and rank (a percentage, the student's place and the number of students), with a save button. The teacher's menu sits on the right." width="1760" height="999"}
The teacher fills in one form per student each week.
::

::project-shot{src="/projects/quran-tracker/test-entry.webp" single alt="The test entry form: a student picker, then the part (juz') the student was tested on and the grade as a percentage, with a save button." width="1760" height="799"}
Tests are recorded by part, with a grade.
::
