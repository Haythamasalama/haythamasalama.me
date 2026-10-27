---
title: Chain of Responsibility
group: Behavioral
icon: lucide:link
summary: 'Pass a request along a chain of handlers, where each one can deal with it or hand it to the next.'
description: 'The Chain of Responsibility pattern passes a request along a line of handlers, and each one can act on it, stop it or pass it on. Explained with a worked Java example of middleware that checks web requests.'
example: 'Middleware that checks a web request'
order: 1
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Behavioral/ChainOfResponsibility
---

## The idea

A request often needs several checks before it can be served. Is the user signed in? Is their IP address allowed? Have they sent too many requests? Putting all of these checks in one method makes it long, and every new check means editing it.

The Chain of Responsibility pattern puts each check in its own handler object. Handlers share one interface, and each holds a reference to the next handler. The sender passes the request to the first handler and doesn't know which handler, if any, will deal with it.

In the Gang of Four version, each handler either handles the request or passes it on. A common variant, used in this example and in web framework middleware, lets every handler run its check and pass the request on, while any handler can stop it.

## When to use it

- A request has to go through several checks or steps, and you want each one in its own class.
- More than one object may handle a request, and the handler should be chosen at runtime.
- You want to add, remove or reorder steps without changing the sender.
- You are building middleware for web requests, or UI events that move from a control up to its parents.

## Pros and cons

### Pros

- It decouples the sender of a request from the objects that handle it.
- You can change the chain at runtime by adding, removing or reordering handlers.
- Each handler does one job, so it is easy to test on its own.

### Cons

- It can be hard to follow: to know what happens to a request, you have to trace the whole chain.
- A long chain can slow things down, and a request may reach the end without being handled.

## The example

The example checks an incoming web request with three middleware steps: authentication, an IP allow list and throttling. If every step passes, the request is valid.

- **`Middleware`**: the handler. An abstract class that holds the next handler, sets it with `setNextHandler()`, and offers `handleNext()`, which passes the request on, or returns `true` at the end of the chain.
- **`AuthenticateMiddleware`**, **`WhitelistIpMiddleware`** and **`ThrottlingMiddleware`**: concrete handlers. Each prints what it checks, then either returns `false` to stop the request or calls `handleNext()` to pass it on. The checks themselves are stubs that always pass.
- **`Demo`**: the client. It builds the chain and asks whether the request is valid.

## The code

```java [Middleware.java]
public abstract class Middleware {
    private Middleware next;

    public Middleware setNextHandler(Middleware next) {
        this.next = next;

        return next;
    }

    public abstract boolean handle();

    protected boolean handleNext() {
        if (next == null) {
            return true;
        }

        return next.handle();
    }
}
```

```java [AuthenticateMiddleware.java]
public class AuthenticateMiddleware extends Middleware {
    @Override
    public boolean handle() {
        System.out.println("check if user is authenticated");

        if (!checkIfAuthenticated()) {
            System.out.println("User is not authenticated");

            return false;
        }

        return handleNext();
    }

    private boolean checkIfAuthenticated() {
        return true;
    }
}
```

```java [WhitelistIpMiddleware.java]
public class WhitelistIpMiddleware extends Middleware {
    @Override
    public boolean handle() {
        System.out.println("check if ip in database or not");

        if (!checkIp()) {
            System.out.println("Ip is not in database");
            return false;
        }

        return handleNext();
    }

    private boolean checkIp() {
        // code to check if IP is in database
        return true;
    }
}
```

```java [ThrottlingMiddleware.java]
public class ThrottlingMiddleware extends Middleware {
    private final int requestPerMinute;
    private final int request;

    public ThrottlingMiddleware(int requestPerMinute, int request) {
        this.requestPerMinute = requestPerMinute;
        this.request = request;
    }

    @Override
    public boolean handle() {
        System.out.println("handle the functionality for throttling");

        if (checkThrottling()) {
            System.out.println("Request is throttled");

            return false;
        }

        return handleNext();
    }

    private boolean checkThrottling() {
        // code to check if request is throttled
        return false;
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {

        Middleware middleware = new AuthenticateMiddleware()
                .setNextHandler(new WhitelistIpMiddleware())
                .setNextHandler(new ThrottlingMiddleware(10, 1));

        if (middleware.handle()) {
            System.out.println("Request is valid");
        } else {
            System.out.println("Request is invalid");
        }
    }
}
```

Running `Demo` prints:

```text
handle the functionality for throttling
Request is valid
```

Only the throttling step ran. `setNextHandler()` returns the handler it was given, so that calls can be chained. After the two chained calls, `middleware` holds the last handler, `ThrottlingMiddleware`, not the first. To run the whole chain, keep a reference to the first handler and call `handle()` on it:

```java
Middleware middleware = new AuthenticateMiddleware();
middleware.setNextHandler(new WhitelistIpMiddleware())
        .setNextHandler(new ThrottlingMiddleware(10, 1));
```

With that change, all three checks print before `Request is valid`.
