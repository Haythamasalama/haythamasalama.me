---
title: Proxy
group: Structural
summary: 'A stand-in with the same interface as the real object, which controls when and how the real one is used.'
description: 'The Proxy pattern puts a stand-in in front of a real object to control access to it: create it only when needed, check calls, or reach it over a network. Explained with a worked Java example of a database.'
example: 'A database that connects only when asked'
order: 7
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Structural/Proxy
---

## The idea

Sometimes you want to control access to an object without changing it or its callers. The object may be expensive to create, it may live on another machine, or only some callers may be allowed to use it.

A proxy is a stand-in with the same interface as the real object. Callers use the proxy as if it were the real thing. The proxy holds a reference to the real object and decides when to create it, whether to let a call through, and what to do before or after passing it on.

The Gang of Four name a few kinds. A virtual proxy creates the real object only when it is first needed. A protection proxy checks whether a call is allowed. A remote proxy stands in for an object that lives somewhere else, such as on a server.

## When to use it

- The real object is expensive to create, and you want to wait until it is used.
- You want to check permissions or state before a call reaches the real object.
- The real object lives on another machine, and callers shouldn't have to deal with the network.
- You want to add logging, caching or call counting without touching the real class.

## Pros and cons

### Pros

- It controls access to an object without the object or its callers changing.
- It can stand in for a remote object, so callers treat it as a local one.
- It can create the real object late, or not at all if it is never used.

### Cons

- It adds a layer between the caller and the real object, which can slow responses down.
- It adds a class, and the proxy must follow every change to the interface.

## The example

The example wraps a database. The proxy creates the real database only when `connect()` is called, and refuses queries while it is not connected.

- **`Database`**: the subject interface shared by the proxy and the real object: `connect`, `disconnect` and `executeQuery`.
- **`RealDatabase`**: the real subject, which does the actual work.
- **`DatabaseProxy`**: the proxy. It creates a `RealDatabase` in `connect()`, not before, and keeps track of whether it is connected. It passes queries through only while connected, and prints a message otherwise.
- **`Demo`**: the client. It holds the proxy as a `Database` and never sees `RealDatabase`.

## The code

```java [Database.java]
public interface Database {
    void connect();

    void disconnect();

    void executeQuery(String query);
}
```

```java [RealDatabase.java]
public class RealDatabase implements Database {
    public void connect() {
        System.out.println("Connecting to real database...");
    }

    public void disconnect() {
        System.out.println("Disconnecting from real database...");
    }

    public void executeQuery(String query) {
        System.out.println("Executing query: " + query + " on real database");
    }
}
```

```java [DatabaseProxy.java]
public class DatabaseProxy implements Database {
    private RealDatabase realDatabase;
    private boolean connected;

    public void connect() {
        if (!connected) {
            realDatabase = new RealDatabase();
            realDatabase.connect();
            connected = true;
        }
    }

    public void disconnect() {
        if (connected) {
            realDatabase.disconnect();
            connected = false;
        }
    }

    public void executeQuery(String query) {
        if (connected) {
            realDatabase.executeQuery(query);
        } else {
            System.out.println("Not connected to the real database");
        }
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Database proxy = new DatabaseProxy();
        
        proxy.connect();
        proxy.executeQuery("SELECT * FROM users");
        proxy.disconnect();
    }
}
```

Running `Demo` prints:

```text
Connecting to real database...
Executing query: SELECT * FROM users on real database
Disconnecting from real database...
```
