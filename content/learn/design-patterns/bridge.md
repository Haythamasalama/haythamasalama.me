---
title: Bridge
group: Structural
icon: lucide:bridge
summary: 'Split a class into two parts that can change on their own: what it does, and how it gets done.'
description: 'The Bridge pattern splits an abstraction from its implementation so each side can grow on its own, without a class for every pair. Explained with a worked Java example of apps that run on two platforms.'
example: 'An application that runs on Windows or Mac'
order: 2
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Structural/Bridge
---

## The idea

Say you have two kinds of application and two platforms. With inheritance alone you need a class for every pair: `ApplicationAOnWindows`, `ApplicationAOnMac`, and so on. Add a third platform and the number of classes grows again. Two separate ideas, which application and which platform, are tangled in one hierarchy.

The Bridge pattern splits them into two hierarchies. One is the abstraction, the part the client works with: here, the application. The other is the implementation, the part that does the low-level work: here, the platform. The abstraction holds a reference to an implementation and passes work to it. That reference is the bridge.

Now each side can grow on its own. A new application is one class, a new platform is one class, and any application can run on any platform.

## When to use it

- A class varies in two independent ways, and a subclass for every combination would multiply classes.
- You want to choose or switch the implementation at runtime.
- You want to change the implementation without touching the code that uses the abstraction.
- Your code must run on several platforms, databases or rendering back ends.

## Pros and cons

### Pros

- It separates concerns: high-level logic sits in the abstraction, platform details in the implementation.
- You can extend the implementation easily: a new platform needs no change to any application.
- Abstractions and implementations can be combined freely at runtime.

### Cons

- It adds indirection and more types, which isn't worth it for a class that varies in only one way.
- You need to find the right split early. Splitting along the wrong line makes both sides harder to change.

## The example

The example runs applications on operating systems. An application knows what it wants to do. A platform knows how to run code on one operating system.

- **`Application`**: the abstraction. An abstract class that holds a `Platform` and declares `develop()`.
- **`ApplicationA`**: a refined abstraction. Its `develop()` hands the work to the platform with `platform.execute("Application A")`.
- **`Platform`**: the implementor interface, with one method, `execute()`.
- **`Windows`** and **`Mac`**: concrete implementors. Each runs the code on its own operating system.
- **`Demo`**: the client. It pairs `ApplicationA` with `Windows`. Passing `new Mac()` instead is the only change needed to run it on a Mac.

## The code

```java [Platform.java]
interface Platform {
    void execute(String code);
}
```

```java [Application.java]
public abstract class Application {
    protected Platform platform;

    public Application(Platform platform) {
        this.platform = platform;
    }

    abstract void develop();
}
```

```java [Windows.java]
class Windows implements Platform {
    @Override
    public void execute(String code) {
        System.out.println("Running " + code + " on Windows");
    }
}
```

```java [Mac.java]
class Mac implements Platform {
    @Override
    public void execute(String code) {
        System.out.println("Running " + code + " on MAC");
    }
}
```

```java [ApplicationA.java]
public class ApplicationA extends Application {
    public ApplicationA(Platform platform) {
        super(platform);
    }

    @Override
    void develop() {
        platform.execute("Application A");
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Application app = new ApplicationA(new Windows());
        app.develop();
    }
}
```

Running `Demo` prints:

```text
Running Application A on Windows
```
