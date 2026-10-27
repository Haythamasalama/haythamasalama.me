---
title: Template Method
group: Behavioral
icon: lucide:layout-template
summary: 'A base class fixes the steps of a task, and subclasses fill in the steps that differ.'
description: 'The Template Method pattern fixes the steps of a task in a base class and lets subclasses fill in only the steps that differ. Explained with a worked Java example of importing CSV, Excel and Word files.'
example: 'Importing CSV, Excel and Word files'
order: 7
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Behavioral/TemplateMethod
---

## The idea

Several classes often do the same task in the same order, with only one or two steps that differ. Importing a file always means opening it, reading it and closing it. Only the reading depends on the file type. If each importer writes all three steps, the shared steps are copied into every class.

The Template Method pattern puts the order of the steps in one method of a base class: the template method. Steps that are the same for everyone are written once, in the base class. Steps that differ are declared abstract, and each subclass fills them in.

The base class stays in control of the order. Subclasses can change a step, but not the sequence. This is sometimes called the Hollywood principle, "don't call us, we'll call you": the base class calls the subclass, not the other way round.

## When to use it

- Several classes run the same steps in the same order, and differ in only a few of them.
- You want to stop subclasses from changing the order of a process, while letting them change its details.
- You see the same code copied across sibling classes, with small changes.
- You are writing a framework, and want its users to plug in their own code at fixed points.

## Pros and cons

### Pros

- It reuses code: shared steps are written once, in the base class.
- Extending the algorithm is easy: a new variant is a subclass that fills in the missing steps.
- The order of the steps is fixed in one place.

### Cons

- It adds classes to the system: one subclass for every variant.
- It relies on inheritance, so each object's variant is fixed when it is created. Strategy uses composition, and can be swapped at runtime.
- The more steps a template has, the harder it is to see which ones a subclass may change.

## The example

The example imports files of different types. Every import opens the file, reads it and closes it, and only the reading depends on the type.

- **`FileImporter`**: the abstract class. `importFile()` is the template method. It is `final`, so subclasses can't change the order, and it calls `openFile()`, `readFile()` and `closeFile()`. Opening and closing are written once here, and `readFile()` is abstract.
- **`CsvFileImporter`**, **`ExcelFileImporter`** and **`WordFileImporter`**: concrete classes. Each overrides only `readFile()`.
- **`Demo`**: runs the Excel and Word importers. Both open and close the file in the same way, and differ only in the read step.

## The code

```java [FileImporter.java]
public abstract class FileImporter {
    public void openFile() {
        System.out.println("open file...");
    }

    public void closeFile() {
        System.out.println("close file...");
    }

    abstract void readFile();

    final public void importFile() {
        this.openFile();
        this.readFile();
        this.closeFile();
    }
}
```

```java [CsvFileImporter.java]
public class CsvFileImporter extends FileImporter {
    @Override
    public void readFile() {
        System.out.println("read data from csv file...");
    }
}
```

```java [ExcelFileImporter.java]
public class ExcelFileImporter extends FileImporter {
    @Override
    public void readFile() {
        System.out.println("read data from excel file...");
    }
}
```

```java [WordFileImporter.java]
public class WordFileImporter extends FileImporter {
    @Override
    public void readFile() {
        System.out.println("read data from word file...");
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        ExcelFileImporter excelFileImporter = new ExcelFileImporter();
        excelFileImporter.importFile();

        WordFileImporter wordFileImporter = new WordFileImporter();
        wordFileImporter.importFile();
    }
}
```

Running `Demo` prints:

```text
open file...
read data from excel file...
close file...
open file...
read data from word file...
close file...
```
