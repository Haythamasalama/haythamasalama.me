---
title: Factory
group: Creational
icon: lucide:factory
summary: 'One place decides which concrete class to create, so the rest of the code only asks for what it needs.'
description: 'The Factory pattern moves the choice of which class to create into one place, so client code asks for an object by name and gets back an interface. Explained with a worked Java example of a pizza shop.'
example: 'A pizza shop that makes margherita and pepperoni'
order: 2
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Creational/Factory
---

## The idea

Code that calls `new` on a concrete class is tied to that class. If a shop's ordering code says `new MargheritaPizza()` and `new PepperoniPizza()`, every new pizza means editing the ordering code, and the same `if` or `switch` tends to appear in several places.

A factory moves that decision into one object. The client asks the factory for "a pepperoni pizza", and the factory decides which class to create. The client only knows the common interface, `Pizza`, so it works with any pizza the factory can make.

The Gang of Four book describes two related patterns. In Factory Method, subclasses decide which class to create. Abstract Factory creates families of related objects. The example here is the simpler form both build on, often called a simple factory: one class with one method that picks the concrete class.

## When to use it

- You don't know until runtime which concrete class you need, for example when it comes from user input or a config file.
- The same creation logic would otherwise be repeated in several places.
- You want to add new types without changing the code that uses them.
- Creating an object takes more than a call to `new`, such as setting defaults or looking something up first.

## Pros and cons

### Pros

- Client code creates objects without naming their concrete classes.
- Adding a new type is easy: write the class and add one case to the factory.
- Creation logic lives in one place, so it is easier to change and to test.

### Cons

- It adds classes to the system: an interface, a factory and one class per type.
- A simple factory still has a `switch` that must change for every new type. Factory Method avoids this by moving the choice into subclasses.
- The client has to handle types the factory doesn't know. Here, `createPizza` returns `null` for an unknown name, and `orderPizza` then fails with a `NullPointerException`.

## The example

The example is a pizza shop. The store takes an order by name, asks a factory for the matching pizza, and then runs the same four steps on it, whatever kind it is.

- **`Pizza`**: the product interface: `prepare`, `bake`, `cut` and `box`.
- **`MargheritaPizza`** and **`PepperoniPizza`**: the concrete products.
- **`PizzaFactory`**: the factory. `createPizza` turns a name into the right `Pizza` with a `switch`.
- **`PizzaStore`**: the client. It receives the factory in its constructor and only ever works with the `Pizza` interface.
- **`Demo`**: builds the store and orders one pizza of each kind.

## The code

```java [Pizza.java]
public interface Pizza {
    void prepare();

    void bake();

    void cut();

    void box();
}
```

```java [MargheritaPizza.java]
class MargheritaPizza implements Pizza {
    @Override
    public void prepare() {
        System.out.println("Preparing Margherita Pizza...");
    }

    @Override
    public void bake() {
        System.out.println("Baking Margherita Pizza...");
    }

    @Override
    public void cut() {
        System.out.println("Cutting Margherita Pizza...");
    }

    @Override
    public void box() {
        System.out.println("Boxing Margherita Pizza...");
    }
}
```

```java [PepperoniPizza.java]
class PepperoniPizza implements Pizza {
    @Override
    public void prepare() {
        System.out.println("Preparing Pepperoni  Pizza...");
    }

    @Override
    public void bake() {
        System.out.println("Baking Pepperoni  Pizza...");
    }

    @Override
    public void cut() {
        System.out.println("Cutting Pepperoni  Pizza...");
    }

    @Override
    public void box() {
        System.out.println("Boxing Pepperoni  Pizza...");
    }
}
```

```java [PizzaFactory.java]
public class PizzaFactory {
    public Pizza createPizza(String type) {
        return switch (type.toLowerCase()) {
            case "margherita" -> new MargheritaPizza();
            case "pepperoni" -> new PepperoniPizza();
            default -> null;
        };
    }
}
```

```java [PizzaStore.java]
public class PizzaStore {
    private final PizzaFactory pizzaFactory;

    public PizzaStore(PizzaFactory pizzaFactory) {
        this.pizzaFactory = pizzaFactory;
    }

    public Pizza orderPizza(String type) {
        Pizza pizza = pizzaFactory.createPizza(type);

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        PizzaStore pizzaStore = new PizzaStore(new PizzaFactory());

        pizzaStore.orderPizza("margherita");
        pizzaStore.orderPizza("pepperoni");
    }
}
```

Running `Demo` prints:

```text
Preparing Margherita Pizza...
Baking Margherita Pizza...
Cutting Margherita Pizza...
Boxing Margherita Pizza...
Preparing Pepperoni  Pizza...
Baking Pepperoni  Pizza...
Cutting Pepperoni  Pizza...
Boxing Pepperoni  Pizza...
```
