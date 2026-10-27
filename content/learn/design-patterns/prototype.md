---
title: Prototype
group: Creational
summary: 'Create a new object by copying an existing one, then change only what differs.'
description: 'The Prototype pattern creates new objects by copying an existing one, so you skip the setup and change only what differs. Learn when copying beats building, with a worked Java example of a car.'
example: 'Copies of a Ford Mustang'
order: 4
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Creational/Prototype
---

## The idea

Sometimes creating an object from scratch is slow or awkward. It may need many settings, data from a file or a long calculation. If you already have an object that is close to what you need, it is easier to copy it.

The Prototype pattern gives objects a `clone()` method. Each class knows how to copy itself, so client code can make a copy without knowing the exact class. You keep a ready-made object, the prototype, clone it whenever you need a new one, and then change the few fields that differ.

Because the object makes the copy itself, the copy can include private state that outside code could not reach.

## When to use it

- Creating an object is expensive, and many of your objects start out the same.
- You need copies of an object, but your code only knows it through an interface or a base class.
- You want a set of preset objects, such as default configurations, that callers copy and adjust.
- The classes to create are only known at runtime, for example plugins registered as sample objects.

## Pros and cons

### Pros

- You create new objects without naming their class.
- Making many similar instances is easy: copy the prototype and change what differs.
- You avoid repeating long setup code for each new object.

### Cons

- Every class in the hierarchy must implement `clone()`, and keep it up to date when fields are added.
- Copying objects that refer to other objects is tricky. You must choose between a shallow copy, which shares the inner objects, and a deep copy, which copies them too.
- Java's own `Cloneable` interface and `Object.clone()` are easy to misuse, so a copy method written by hand, as in this example, is often clearer.

## The example

The example copies a car. A `FordPrototype` starts as a red Mustang with a 5.0L engine. The demo clones it twice: one copy is painted blue, and the other gets a bigger engine. The original stays as it was.

- **`CarPrototype`**: the prototype. An abstract class with the car's fields, getters and setters, and an abstract `clone()` method that returns a `CarPrototype`.
- **`FordPrototype`**: the concrete prototype. Its constructor sets the default values, and its `clone()` creates a new `FordPrototype` and copies each field into it.
- **`Demo`**: the client. It keeps one prototype, calls `clone()` to get new cars, and changes the colour of one and the engine size of the other.

The fields are all `String`s, which can't be changed in Java, so copying the references is enough here.

## The code

```java [CarPrototype.java]
public abstract class CarPrototype {
    protected String maker;
    protected String model;
    protected String color;
    protected String engineSize;

    public abstract CarPrototype clone();

    public String getMake() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getEngineSize() {
        return engineSize;
    }

    public void setEngineSize(String engineSize) {
        this.engineSize = engineSize;
    }
}
```

```java [FordPrototype.java]
public class FordPrototype extends CarPrototype {
    public FordPrototype() {
        maker = "Ford";
        model = "Mustang";
        color = "Red";
        engineSize = "5.0L";
    }

    @Override
    public CarPrototype clone() {
        FordPrototype fordPrototype = new FordPrototype();
        fordPrototype.setMaker(this.maker);
        fordPrototype.setModel(this.model);
        fordPrototype.setColor(this.color);
        fordPrototype.setEngineSize(this.engineSize);
        
        return fordPrototype;
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        FordPrototype fordPrototype = new FordPrototype();
        
        FordPrototype ford1 = (FordPrototype) fordPrototype.clone();
        ford1.setColor("Blue");

        FordPrototype ford2 = (FordPrototype) fordPrototype.clone();
        ford2.setEngineSize("5.5L");
    }
}
```

Running `Demo` prints nothing: it makes the two copies and changes them, but doesn't print them.
