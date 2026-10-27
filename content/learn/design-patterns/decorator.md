---
title: Decorator
group: Structural
icon: lucide:gift
summary: 'Wrap an object in another object that adds behaviour, without changing the original class.'
description: 'The Decorator pattern wraps an object to add behaviour at runtime, so you can stack extras without a subclass for every mix. Explained with a worked Java example of booking plans that add to the price.'
example: 'Booking plans that add to the price'
order: 4
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Structural/Decorator
---

## The idea

Say a booking can come with upgrades, and each upgrade changes the price. With subclasses you would need one class for every combination, and the number of classes grows with every new upgrade.

A decorator wraps an object that has the same interface as itself. When you call a method on the decorator, it calls the same method on the object it wraps and adds its own behaviour before or after. Because the decorator has the same interface, you can wrap a decorator in another decorator, and the client can't tell the difference.

So instead of a class for every combination, you build combinations at runtime by stacking wrappers: a basic plan, wrapped in a pro upgrade, wrapped in a VIP upgrade.

## When to use it

- You need to add behaviour to single objects at runtime, not to a whole class.
- Extras can be combined freely, and a subclass for each combination would mean too many classes.
- You can't or don't want to change the original class, for example because it is `final` or belongs to a library.
- You want to add logging, caching or compression around an existing object. Java's `BufferedInputStream` wrapping a `FileInputStream` is a decorator.

## Pros and cons

### Pros

- You add behaviour to objects without changing their class.
- You can combine extras freely, at runtime, by stacking decorators.
- You reuse existing objects: the wrapped object does its normal work, and the decorator only adds to it.

### Cons

- Code that relies on the concrete component's type breaks. A `ProPlan` is a `Booking`, but it isn't a `BasicPlan`.
- Many small wrappers can make the code hard to follow and debug.
- The order of wrapping can matter, and nothing in the types tells you the right order.

## The example

The example prices booking plans. A basic plan costs 10, a pro upgrade adds 10, and a VIP upgrade adds another 10. The demo wraps the basic plan in a pro plan, then wraps that in a VIP plan, and prints the price at each step.

- **`Booking`**: the component interface, with `getTitle()` and `getPrice()`.
- **`BookingDecorator`**: the base decorator. It implements `Booking` and holds the `Booking` it wraps.
- **`BasicPlan`**: the concrete component: the plain booking that the others wrap.
- **`ProPlan`** and **`VipPlan`**: concrete decorators. Each `getPrice()` asks the wrapped booking for its price and adds 10.
- **`Demo`**: builds the stack one layer at a time.

Only `getPrice()` builds on the wrapped object. In both decorators, `getTitle()` returns a fixed string instead of adding to the wrapped booking's title.

## The code

```java [Booking.java]
public interface Booking {
    String getTitle();

    double getPrice();
}
```

```java [BookingDecorator.java]
public abstract class BookingDecorator implements Booking {
    protected Booking booking;

    public BookingDecorator(Booking booking) {
        this.booking = booking;
    }
}
```

```java [BasicPlan.java]
class BasicPlan implements Booking {
    @Override
    public String getTitle() {
        return "this Basic plan";
    }

    @Override
    public double getPrice() {
        return 10;
    }
}
```

```java [ProPlan.java]
public class ProPlan extends BookingDecorator {
    public ProPlan(Booking booking) {
        super(booking);
    }

    @Override
    public String getTitle() {
        return "Pro Plan";
    }

    @Override
    public double getPrice() {
        return this.booking.getPrice() + 10;
    }
}
```

```java [VipPlan.java]
public class VipPlan extends BookingDecorator {
    public VipPlan(Booking booking) {
        super(booking);
    }

    @Override
    public String getTitle() {
        return "Pro Plan";
    }

    @Override
    public double getPrice() {
        return this.booking.getPrice() + 10;
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        // Basic Plan is 10 ,Pro 20 and Vip 30
        BasicPlan basicPlan = new BasicPlan();
        System.out.println(basicPlan.getPrice());

        ProPlan proPlan = new ProPlan(basicPlan);
        System.out.println(proPlan.getPrice());

        VipPlan vipPlan = new VipPlan(proPlan);
        System.out.println(vipPlan.getPrice());
    }
}
```

Running `Demo` prints:

```text
10.0
20.0
30.0
```
