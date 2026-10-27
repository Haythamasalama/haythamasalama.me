---
title: Flyweight
group: Structural
icon: lucide:feather
summary: 'Share the common part of many similar objects, so large numbers of them cost little memory.'
description: 'The Flyweight pattern shares the common state of many similar objects, so a program can hold large numbers of them in little memory. Explained with a worked Java example of trees in a forest.'
example: 'Trees in a forest that share their shape and colour'
order: 6
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Structural/Flyweight
---

## The idea

Some programs need a huge number of small objects: trees in a game world, characters in a text editor, particles in a simulation. If each object stores all of its data, memory runs out quickly, even though most of that data is the same across objects.

The Flyweight pattern splits an object's data in two. Intrinsic state is the part that many objects have in common, such as a tree's shape and colour. Extrinsic state is the part that differs for each use, such as where the tree stands. Intrinsic state is stored once, in a shared object called the flyweight. Extrinsic state stays with the caller and is passed in when needed.

A factory hands out the flyweights. When you ask for a tree with a given shape and colour, it returns the one it already has, and creates it only the first time.

## When to use it

- The program needs a very large number of similar objects, and memory is a real limit.
- Most of each object's state can be moved out of it and passed in by the caller.
- Once that state is moved out, many objects can be replaced by a few shared ones.
- Your code doesn't compare these objects by identity, so sharing one instance is safe.

## Pros and cons

### Pros

- It uses far less memory when there are many similar objects.
- Existing objects are reused instead of being created again.
- The factory gives you one place to control how many objects exist.

### Cons

- The code is more complex: state is split in two, and callers must keep the extrinsic part and pass it in.
- It can trade memory for time, since extrinsic state may need to be worked out or looked up on every call.
- A shared flyweight must not hold state that differs for each use, or the uses overwrite each other.

## The example

The example draws a forest. Every tree has a shape, a colour and a position. Many trees have the same shape and colour, so those are shared. The position is passed in each time a tree is drawn.

- **`Tree`**: the flyweight interface, with `render(x, y)`. The position is the extrinsic state.
- **`OakTree`**: the concrete flyweight. It stores the intrinsic state, `shape` and `color`, in `final` fields.
- **`TreeFactory`**: the flyweight factory. It keeps a map keyed by shape and colour, creates an `OakTree` the first time a key is asked for, and returns the stored one after that.
- **`Demo`**: asks for three cone-shaped green trees and draws each at a different position.

All three calls return the same `OakTree` object, so the forest holds one tree object, drawn three times.

`OakTree` also keeps `x` and `y` in fields, set on every `render` call. Because the object is shared, each call overwrites the last position. It works here because `render` prints the position straight away, but in the pattern the flyweight holds only the shared state.

## The code

```java [Tree.java]
public interface Tree {
    void render(int x, int y);
}
```

```java [OakTree.java]
public class OakTree implements Tree {
    private final String shape;
    private final String color;
    private int x;
    private int y;

    public OakTree(String shape, String color) {
        this.shape = shape;
        this.color = color;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void render(int x, int y) {
        setX(x);
        setY(y);
        System.out.println("Render Oak tree with shape: " + shape + " and color: " + color + " at x: " + x + " y: " + y);
    }
}
```

```java [TreeFactory.java]
import java.util.HashMap;
import java.util.Map;

public class TreeFactory {
    private final Map<String, Tree> treeMap = new HashMap<>();

    public Tree getTree(String shape, String color) {
        String key = shape + "-" + color;

        if (!treeMap.containsKey(key)) {
            treeMap.put(key, new OakTree(shape, color));
        }

        return treeMap.get(key);
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        TreeFactory treeFactory = new TreeFactory();
        
        Tree tree1 = treeFactory.getTree("cone", "green");
        tree1.render(1, 2);

        Tree tree2 = treeFactory.getTree("cone", "green");
        tree2.render(3, 4);

        Tree tree3 = treeFactory.getTree("cone", "green");
        tree3.render(5, 6);
    }
}
```

Running `Demo` prints:

```text
Render Oak tree with shape: cone and color: green at x: 1 y: 2
Render Oak tree with shape: cone and color: green at x: 3 y: 4
Render Oak tree with shape: cone and color: green at x: 5 y: 6
```
