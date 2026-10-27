---
title: State
group: Behavioral
icon: lucide:toggle-left
summary: 'An object changes its behaviour when its internal state changes, as if it had changed its class.'
description: 'The State pattern lets an object change its behaviour when its internal state changes, with one class per state instead of long chains of if statements. Explained with a worked Java example of a transaction.'
example: 'A transaction that moves from pending to approved'
order: 5
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Behavioral/State
---

## The idea

Many objects behave differently depending on the state they are in. A transaction that is pending, approved or cancelled responds differently to the same request. The usual way to code this is a `switch` or a chain of `if` statements on a status field, repeated in every method. Each new state means editing all of them.

The State pattern gives each state its own class, and all the state classes share one interface. The main object, the context, holds a reference to its current state and passes each request to it. To change its behaviour, the context swaps in a different state object.

From the outside, the context seems to change its class. Inside, the logic for each state sits in one place.

## When to use it

- An object's behaviour depends on its state, and it must change that behaviour at runtime.
- Methods are full of `switch` or `if` statements on the same status field.
- The object goes through a clear lifecycle, such as an order, a document review or a network connection.
- You expect to add new states, and want each one in its own class.

## Pros and cons

### Pros

- It is more flexible and has fewer branches: the `if` chains on the status go away.
- Adding a new state is easy: write one class.
- The code for each state sits in one class, so it is easier to read and to test.

### Cons

- The code is more complex, with one more class in the system for every state.
- For an object with two or three simple states, a plain field and a `switch` can be clearer.
- The transitions are spread across classes, so the full lifecycle is harder to see at a glance.

## The example

The example is a payment transaction. A new transaction starts as pending. The demo then moves it to `ApprovingState` and then to `PressedState`, and each state handles the request in its own way.

- **`State`**: the state. An abstract class that holds the transaction and declares `handle()`.
- **`Transaction`**: the context. It starts in `PendingState`, can switch state with `setState()`, and passes each `request()` to the current state's `handle()`.
- **`PendingState`**, **`ApprovingState`**, **`PressedState`** and **`CancelingState`**: concrete states. Each prints which state handled the request. The demo doesn't use `CancelingState`.
- **`Demo`**: the client. It sends one request in each state.

Here, `Demo` moves the transaction from one state to the next. In the Gang of Four book, either the context or the state classes decide the next state. Each state already holds the transaction, so it could call `setState()` itself.

## The code

```java [State.java]
public abstract class State {
    protected Transaction transaction;

    public State(Transaction transaction) {
        this.transaction = transaction;
    }

    abstract void handle();
}
```

```java [Transaction.java]
public class Transaction {
    private State state;

    public Transaction() {
        this.state = new PendingState(this);
    }

    public void setState(State state) {
        this.state = state;
    }

    public void request() {
        this.state.handle();
    }
}
```

```java [PendingState.java]
public class PendingState extends State {
    public PendingState(Transaction transaction) {
        super(transaction);
    }

    @Override
    void handle() {
        // Your implementation for pending state transaction.
        System.out.println("handle pending state transaction");
    }
}
```

```java [ApprovingState.java]
public class ApprovingState extends State {
    public ApprovingState(Transaction transaction) {
        super(transaction);
    }

    @Override
    void handle() {
        // Your implementation for approved state transaction.
        System.out.println("handle approved state transaction");
    }
}
```

```java [PressedState.java]
public class PressedState extends State {
    public PressedState(Transaction transaction) {
        super(transaction);
    }

    @Override
    void handle() {
        // Your implementation for pressed state transaction.
        System.out.println("handle pressed state transaction");
    }
}
```

```java [CancelingState.java]
public class CancelingState extends State {
    public CancelingState(Transaction transaction) {
        super(transaction);
    }

    @Override
    void handle() {
        // Your implementation for canceled state transaction.
        System.out.println("handle canceled state transaction");
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Transaction transaction = new Transaction();
        transaction.request();

        transaction.setState(new ApprovingState(transaction));
        transaction.request();

        transaction.setState(new PressedState(transaction));
        transaction.request();
    }
}
```

Running `Demo` prints:

```text
handle pending state transaction
handle approved state transaction
handle pressed state transaction
```
