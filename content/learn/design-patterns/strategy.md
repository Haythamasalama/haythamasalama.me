---
title: Strategy
group: Behavioral
icon: lucide:shuffle
summary: 'Put each way of doing a task in its own class, and choose which one to use while the program runs.'
description: 'The Strategy pattern puts each version of an algorithm in its own class, so you can swap them while the program runs. Explained with a worked Java example of a logger that writes to a file or the console.'
example: 'A logger that writes to a file or the console'
order: 6
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Behavioral/Strategy
---

## The idea

There is often more than one way to do the same task. Logs can go to a file, the console or a database. A price can be worked out with or without a discount. If one class holds all the options behind an `if` or a `switch`, it grows with every new option, and changing one risks breaking the others.

The Strategy pattern puts each option, each strategy, in its own class behind a shared interface. The class that needs the work done, the context, holds a reference to a strategy and calls it through that interface. It doesn't know which strategy it has.

You pass a strategy in when you create the context, and can swap it later. A new option means a new class, not an edit to the context.

## When to use it

- You have several ways to do the same task and want to choose between them at runtime.
- A class has a large `switch` that picks between versions of one algorithm.
- You want to keep the details of an algorithm, and the data it uses, out of the class that uses it.
- You want to test each version of the algorithm on its own.

## Pros and cons

### Pros

- It is flexible and easy to extend: a new behaviour is a new class.
- You can pick the right algorithm for the current situation, and change it at runtime.
- It replaces conditionals with composition, so the context stays small.

### Cons

- It adds classes to the system: one for each strategy.
- Clients must know that the strategies exist and choose between them.
- If there are only two options and they rarely change, an `if` is simpler.

## The example

The example is a logger. The same `Log` object can write to a file or to the console, and the demo switches between the two while the program runs.

- **`Logger`**: the strategy interface, with one `log(message)` method.
- **`FileLogger`** and **`ConsoleLogger`**: concrete strategies. Both print to the console, with a prefix that shows where the message would go. A comment in `FileLogger` marks where writing to a file belongs.
- **`Log`**: the context. It holds a `Logger`, offers `info()` and `error()`, and adds the level to the message before passing it to the strategy. `setLogger()` swaps the strategy.
- **`Demo`**: logs two messages with the file logger, swaps in the console logger, and logs two more.

## The code

```java [Logger.java]
public interface Logger {
    void log(String message);
}
```

```java [FileLogger.java]
public class FileLogger implements Logger {

    @Override
    public void log(String message) {
        // Your implementation for logging to file.
        System.out.println("[file]:" + message);
    }
}
```

```java [ConsoleLogger.java]
public class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        // Your implementation for logging to console.
        System.out.println("[console]:" + message);
    }
}
```

```java [Log.java]
public class Log {

    private Logger logger;

    public Log(Logger logger) {
        this.logger = logger;
    }

    public void setLogger(Logger logger) {
        this.logger = logger;
    }

    public void info(String message) {
        this.logger.log("[info]:" + message);
    }

    public void error(String message) {
        this.logger.log("[error]:" + message);
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Log log = new Log(new FileLogger());
        log.error("tests log error file,Strategy Pattern.");
        log.info("tests log info file,Strategy Pattern.");

        log.setLogger(new ConsoleLogger());
        log.error("tests log error console,Strategy Pattern.");
        log.info("tests log info console,Strategy Pattern.");
    }
}
```

Running `Demo` prints:

```text
[file]:[error]:tests log error file,Strategy Pattern.
[file]:[info]:tests log info file,Strategy Pattern.
[console]:[error]:tests log error console,Strategy Pattern.
[console]:[info]:tests log info console,Strategy Pattern.
```
