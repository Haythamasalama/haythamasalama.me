---
title: Command
group: Behavioral
summary: 'Turn a request into an object, so it can be passed around, queued, logged or undone.'
description: 'The Command pattern turns a request into an object, so you can pass it around, queue it, log it or undo it later. Explained with a worked Java example of commands that switch a light on and off.'
example: 'Commands that turn a light on and off'
order: 2
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Behavioral/Command
---

## The idea

Usually, the code that wants something done calls the object that does it: a button calls `light.turnOn()`. This ties the button to the light. You can't reuse the button for anything else, and you can't keep a record of what was pressed.

The Command pattern puts the request in an object of its own. A command has one method, `execute()`, and knows which object to call and how. That object is the receiver. The object that triggers the action, the invoker, only holds a `Command` and calls `execute()` on it. It doesn't know what the command does.

Because a request is now an object, you can store it, pass it around, put it in a queue or write it to a log. Keep a history of executed commands and give each an `undo()` method, and you can reverse them.

## When to use it

- You want buttons, menu items or keyboard shortcuts to trigger actions without knowing what those actions do.
- You need undo and redo: keep each executed command in a history and reverse it.
- You want to queue requests, schedule them or run them later on another thread.
- You want to log every operation so it can be replayed after a crash.

## Pros and cons

### Pros

- It decouples the classes that invoke operations from the classes that perform them.
- It makes undo, redo and deferred execution possible, since each request is an object you can keep.
- You can add new commands without changing the invoker, and combine simple commands into larger ones.

### Cons

- It adds many small classes: one for every action.
- The extra layer can make the code harder to read: to see what a button does, you have to find its command.

## The example

The example controls a light. Turning it on and turning it off are two commands, and each knows the light it acts on.

- **`Command`**: the command interface, with a single `execute()` method.
- **`Light`**: the receiver, the object that does the real work in `turnOn()` and `turnOff()`.
- **`TurnOnLightCommand`** and **`TurnOffLightCommand`**: concrete commands. Each holds a `Light` and calls one of its methods in `execute()`.
- **`Demo`**: the client. It creates the light and the two commands.

The example has no invoker. In a full version, something like a remote control would hold the commands and call `execute()` when a button is pressed.

## The code

```java [Command.java]
public interface Command {
    void execute();
}
```

```java [Light.java]
public class Light {
    public void turnOn() {
        System.out.println("The light is on");
    }

    public void turnOff() {
        System.out.println("The light is off");
    }
}
```

```java [TurnOnLightCommand.java]
public class TurnOnLightCommand implements Command {
    private final Light light;

    public TurnOnLightCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOn();
    }
}
```

```java [TurnOffLightCommand.java]
public class TurnOffLightCommand implements Command {
    private final Light light;

    public TurnOffLightCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOff();
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Light light = new Light();
        new TurnOnLightCommand(light);
        new TurnOffLightCommand(light);
    }
}
```

Running `Demo` prints nothing: it creates the two commands but never calls `execute()` on them. Calling `execute()` on the first one would print `The light is on`.
