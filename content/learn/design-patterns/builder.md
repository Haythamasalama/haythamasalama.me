---
title: Builder
group: Creational
summary: 'Build a complex object step by step, setting only the parts you need, then get the finished object in one call.'
description: 'The Builder pattern constructs a complex object step by step, so you set only the parts you need and get back a finished object that does not change. Explained with a worked Java example of a car.'
example: 'A car with maker, model, year, colour and gearbox'
order: 3
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Creational/Builder
---

## The idea

Some objects have many fields. A constructor that takes all of them, like `new Car("Toyota", "Camry", 2018, "Red", true)`, is hard to read: which argument is the colour, and what does `true` mean? Adding a constructor for each combination of optional fields doesn't scale either.

The Builder pattern separates building an object from the object itself. You create a builder, call one method for each part, and finally ask it for the result. Each call names what it sets, so the code reads like a description of the object.

In the Gang of Four book, a director object runs the building steps against a builder interface, so the same steps can produce different representations. The example here uses the form common in Java code, described by Joshua Bloch in Effective Java: a static nested `Builder` class whose methods return the builder itself, so the calls can be chained.

## When to use it

- A class has many fields, and several of them are optional.
- You want the finished object to be immutable, but setting every field in one constructor call is hard to read.
- The same building steps should produce different results, such as an HTML and a PDF version of one report.
- Creating the object takes several steps that must happen in order.

## Pros and cons

### Pros

- You build a complex object step by step, and each step is named.
- The finished object can be immutable: `Car` has only `final` fields and no setters.
- The same building process can be reused to create different representations.

### Cons

- It adds classes to the system: every class you build gets a builder.
- The builder repeats every field of the class it builds, so adding a field means changing two places.
- Without checks in `build()`, you can create an object with missing fields. Here, a `Car` built without `setMaker` has a `null` maker.

## The example

The example builds a car. A car has a maker, a model, a year, a colour and a gearbox type, and once built it should not change.

- **`Car`**: the product. All its fields are `final`, and its constructor is package-private, so code outside the package has to go through the builder.
- **`Car.Builder`**: the builder. It holds the same fields as `Car`, has one setter for each field that returns `this`, and `build()` passes them all to the `Car` constructor.
- **`Demo`**: the client. It chains the setters and calls `build()` to get the car.

## The code

```java [Car.java]
public class Car {
    private final String maker;
    private final String model;
    private final int year;
    private final String color;
    private final boolean isAutomatic;

    Car(String maker, String model, int year, String color, boolean isAutomatic) {
        this.maker = maker;
        this.model = model;
        this.year = year;
        this.color = color;
        this.isAutomatic = isAutomatic;
    }

    public static class Builder {
        private String maker;
        private String model;
        private int year;
        private String color;
        private boolean isAutomatic;

        public Builder setMaker(String maker) {
            this.maker = maker;

            return this;
        }

        public Builder setModel(String model) {
            this.model = model;

            return this;
        }

        public Builder setYear(int year) {
            this.year = year;

            return this;
        }

        public Builder setColor(String color) {
            this.color = color;

            return this;
        }

        public Builder setAutomatic(boolean isAutomatic) {
            this.isAutomatic = isAutomatic;

            return this;
        }

        public Car build() {
            return new Car(maker, model, year, color, isAutomatic);
        }
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        new Car.Builder()
                .setMaker("Toyota")
                .setModel("Camry")
                .setYear(2018)
                .setColor("Red")
                .setAutomatic(true)
                .build();
    }
}
```

Running `Demo` prints nothing: it builds the car and stops there. `Car` has no getters, so there is nothing to show.
