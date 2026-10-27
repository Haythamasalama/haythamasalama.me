---
title: Singleton
group: Creational
icon: lucide:circle-dot
summary: 'A class that makes sure only one instance of itself exists, and hands everyone that same instance.'
description: 'The Singleton pattern keeps a class to a single instance and gives the whole program one way to reach it. Learn when it helps and when it hurts, with a worked Java example of a database connection.'
example: 'A shared database connection'
order: 1
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Creational/Singleton
---

## The idea

Some things should exist only once in a program. A database connection, a configuration object or a log file is often like that. If every part of the code creates its own, you waste resources and the copies can drift apart.

The Singleton pattern makes the class itself responsible for this. Its constructor is private, so no other code can call `new`. Instead, the class offers a static method that returns the one instance. The first call creates it, and every later call returns the same object.

You get two things from this: a guarantee that there is only one instance, and one well-known place to get it from.

## When to use it

- Exactly one object must coordinate something, such as a connection pool or a print queue.
- The object is expensive to create, and you want to create it only when it is first needed.
- Many unrelated parts of the program need the same shared object, and passing it through every constructor would be awkward.
- You want access to a shared resource to go through one place.

## Pros and cons

### Pros

- The class guarantees that it has only one instance.
- There is a single point of control: every caller goes through the same method.
- The instance is created only when it is first asked for.

### Cons

- It makes code harder to test. A class that calls `Database.getDatabase()` cannot easily be given a fake database instead.
- It is global state. Any part of the program can reach it, which makes bugs harder to trace.
- It hides dependencies: a class's constructor doesn't tell you that it needs the database.
- The simple version is not thread-safe. Two threads can both see `null` and each create an instance. When threads are involved, use a `synchronized` method, a field that is set when the class loads, or an `enum`.

## The example

The example models a database connection. Opening a connection is slow, so the program should open one and share it.

- **`Database`**: the singleton. It is `final`, so it cannot be subclassed. Its constructor is private and prints a message when the connection is made. The static field `database` holds the single instance, and `getDatabase()` creates it on the first call and returns it on every call.
- **`Demo`**: the client. It asks `Database.getDatabase()` for the instance. Writing `new Database()` here would not compile.

Call `getDatabase()` a second time and you get the same object back, and the message is not printed again.

## The code

```java [Database.java]
public final class Database {
    private static Database database;

    private Database() {
        System.out.println("make connection database...");
    }

    public static Database getDatabase() {
        if (database == null) {
            database = new Database();
        }

        return database;
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Database database = Database.getDatabase();
    }
}
```

Running `Demo` prints:

```text
make connection database...
```
