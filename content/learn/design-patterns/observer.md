---
title: Observer
group: Behavioral
summary: 'One object announces a change, and every object that subscribed to it hears about it.'
description: 'The Observer pattern lets one object announce a change to every object that subscribed to it, without knowing who they are or what they do. Explained with a worked Java example of a tweet and its followers.'
example: 'A tweet and its followers'
order: 4
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Behavioral/Observer
---

## The idea

Often several objects need to react when something happens to another object. When a tweet is posted, every follower should hear about it. The tweet could call each follower directly, but then it would need to know every kind of object that cares, and change whenever a new one appears.

The Observer pattern turns this around. The object being watched, the subject, keeps a list of observers. Observers subscribe to it and can unsubscribe at any time. When something happens, the subject goes through its list and calls the same method on each observer. All it knows about them is that they implement the observer interface.

This gives a one-to-many relationship with loose coupling. The subject doesn't know what its observers do, and you can add new kinds of observers without changing it.

## When to use it

- A change to one object should update others, and you don't know in advance how many or which ones.
- You want objects to subscribe and unsubscribe while the program runs.
- You are building events: a button click, a new message, a price change.
- You want to keep a model separate from the views that display it, as in model-view-controller.

## Pros and cons

### Pros

- The subject and its observers are loosely coupled: each depends only on the other's interface.
- Observers can be added and removed at any time.
- One call from the subject reaches every observer, as a broadcast.

### Cons

- With many observers, notifying all of them can be slow.
- The flow of the program is harder to follow, since the subject doesn't show who reacts to a change.
- An observer that never unsubscribes keeps being called, and stays in memory as long as the subject does.

## The example

The example is a tweet and its followers. A follower subscribes to a tweet, and when the tweet notifies its listeners, each follower prints a notification with the tweet's text.

- **`Event`**: the subject interface: `subscribe`, `unsubscribe` and `notifyToAll`.
- **`Listener`**: the observer interface, with a single `notify(message)` method.
- **`Tweet`**: the concrete subject. It keeps its text and a list of listeners, and `notifyToAll()` passes the text to each one.
- **`Follower`**: the concrete observer. It has a username and prints the message it receives.
- **`Demo`**: creates a follower and a tweet, subscribes the follower and sends the notification.

The tweet sends its text along with the call. This is the push model. In the pull model, observers get only a signal and ask the subject for what they need.

## The code

```java [Event.java]
public interface Event {
    void subscribe(Listener listener);
    void unsubscribe(Listener listener);
    void notifyToAll();
}
```

```java [Listener.java]
public interface Listener {
    void notify(String message);
}
```

```java [Tweet.java]
import java.util.ArrayList;
import java.util.List;

public class Tweet implements Event {
    private final String text;
    private final List<Listener> listeners;

    public Tweet(String text) {
        this.text = text;
        this.listeners = new ArrayList<>();
    }

    @Override
    public void subscribe(Listener listener) {
        this.listeners.add(listener);
    }

    @Override
    public void unsubscribe(Listener listener) {
        this.listeners.remove(listener);
    }

    @Override
    public void notifyToAll() {
        this.listeners.forEach((listener -> listener.notify(text)));
    }
}
```

```java [Follower.java]
public class Follower implements Listener {
    private final String username;

    public Follower(String username) {
        this.username = username;
    }

    @Override
    public void notify(String message) {
        System.out.println("New notification to @" + this.username + " : " + message);
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Follower haythamasalama = new Follower("haythamsalsama");
        Tweet tweet = new Tweet("Welcome Friends!!");
        
        tweet.subscribe(haythamasalama);
        tweet.notifyToAll();
    }
}
```

Running `Demo` prints:

```text
New notification to @haythamsalsama : Welcome Friends!!
```
