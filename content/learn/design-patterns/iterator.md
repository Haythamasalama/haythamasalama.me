---
title: Iterator
group: Behavioral
icon: lucide:list-ordered
summary: 'Walk through the items of a collection one by one, without knowing how the collection stores them.'
description: 'The Iterator pattern lets you walk through a collection item by item without knowing how it stores its items inside. Explained with a worked Java example of an iterator over a collection built on an array.'
example: 'A small collection backed by an array'
order: 3
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Behavioral/Iterator
---

## The idea

A collection might keep its items in an array, a linked list, a tree or a hash table. If client code loops over the array directly, it depends on that choice. Change the storage, and every loop has to change too.

The Iterator pattern moves the job of walking through the items into a separate object, the iterator. It answers two questions: is there another item (`hasNext()`), and what is it (`next()`). The iterator knows how the collection is stored, and the client only knows the iterator's interface.

Since each iterator keeps its own position, several iterators can walk the same collection at the same time without getting in each other's way. Java's `java.util.Iterator` and its for-each loop are built on this pattern.

## When to use it

- You want to hide how a collection stores its items from the code that uses it.
- You need one way to loop over several kinds of collections.
- You want more than one way to walk the same collection, such as forwards, backwards or filtered.
- You need several loops over the same collection at once, each with its own position.

## Pros and cons

### Pros

- Clients walk a collection without knowing how it is stored, so different collections can be used in the same way.
- Items are reached in order, one at a time, without exposing the collection's internal structure.
- Several iterators can work on the same collection at once, each with its own position.

### Cons

- It adds objects and classes to the system: an iterator for every kind of collection.
- For a simple array or list, a plain loop is shorter and easier to read.

## The example

The example stores strings in a fixed-size array and prints them through an iterator. It defines its own `Iterator` and `Collection` interfaces rather than using the ones in `java.util`.

- **`Collection`**: the aggregate interface, with `createIterator()`.
- **`Iterator`**: the iterator interface, with `hasNext()` and `next()`.
- **`ConcreteCollection`**: the concrete aggregate. It stores items in an array and tracks how many have been added.
- **`ConcreteIterator`**: the concrete iterator. It keeps an index and reads items from the collection until it reaches the collection's size.
- **`Demo`**: adds three items, gives the collection an iterator, then loops with `hasNext()` and `next()`.

In the Gang of Four version, `createIterator()` creates a new iterator and returns it. Here it receives an iterator from the caller and stores it, and `getIterator()` hands it back.

## The code

```java [Collection.java]
public interface Collection<T> {
    void createIterator(Iterator<T> iterator);
}
```

```java [Iterator.java]
public interface Iterator<T> {
    boolean hasNext();

    T next();
}
```

```java [ConcreteCollection.java]
public class ConcreteCollection<T> implements Collection<T> {
    private final T[] items;
    private int size = 0;
    private Iterator<T> iterator;

    public ConcreteCollection(int size) {
        this.items = (T[]) new Object[size];
    }

    public void add(T item) {
        this.items[size++] = item;
    }

    public int getSize() {
        return size;
    }

    public T[] getItems() {
        return items;
    }

    @Override
    public void createIterator(Iterator<T> iterator) {
        this.iterator = iterator;
    }

    public Iterator<T> getIterator() {
        return this.iterator;
    }
}
```

```java [ConcreteIterator.java]
public class ConcreteIterator<T> implements Iterator<T> {
    private final ConcreteCollection<T> collection;
    private int index = 0;

    public ConcreteIterator(ConcreteCollection<T> collection) {
        this.collection = collection;
    }

    @Override
    public boolean hasNext() {
        return index < collection.getSize();
    }

    @Override
    public T next() {
        return collection.getItems()[index++];
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        ConcreteCollection<String> collection = new ConcreteCollection<String>(5);
        collection.add("item 1");
        collection.add("item 2");
        collection.add("item 3");

        collection.createIterator(new ConcreteIterator<String>(collection));

        Iterator<String> iterator = collection.getIterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```

Running `Demo` prints:

```text
item 1
item 2
item 3
```
