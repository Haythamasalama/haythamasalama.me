---
title: Adapter
group: Structural
icon: lucide:plug
summary: 'A thin wrapper that lets a class work with code that expects a different interface.'
description: 'The Adapter pattern wraps a class so it matches the interface your code expects, letting two incompatible parts work together without changing either. Explained with a worked Java example of a card reader.'
example: 'A USB drive used through a memory card interface'
order: 1
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Structural/Adapter
---

## The idea

Sometimes a class does what you need, but its methods don't match what your code expects. Your code calls `readData()`, and the class offers `read()`. You may not be able to change either side: one is a library, or the other is used in many places.

An adapter sits between them. It implements the interface your code expects, holds the other object, and turns each call into a call that object understands. It works like a travel plug adapter: neither the socket nor the plug changes.

The Gang of Four describe two forms. A class adapter inherits from the class it adapts. An object adapter, like the one in this example, holds a reference to it. The object form fits Java better, since a class can extend only one other class.

## When to use it

- You want to use an existing class, but its interface doesn't match the one your code needs.
- You are adding a third-party library and want to keep its API out of the rest of your code.
- You are replacing one implementation with another that has a different interface, and don't want to change every caller.
- Several existing classes do similar work with different method names, and you want to treat them the same way.

## Pros and cons

### Pros

- You reuse existing classes without changing them.
- It separates concerns: the conversion lives in one class, away from the business logic.
- Client code depends only on its own interface, so you can swap the adapted class later.

### Cons

- It adds a class and a layer of indirection for every interface you adapt.
- If the two interfaces differ a lot, the adapter can grow complex and hide real differences in behaviour.

## The example

The example uses storage devices. The client works with memory cards through the `MemoryCard` interface. A flash drive offers the same kind of operations through a different interface, `USBDrive`. A card reader adapter lets the client use the flash drive as if it were a memory card.

- **`MemoryCard`**: the target: the interface the client expects, with `readData()` and `writeData()`.
- **`USBDrive`**: the interface of the class being adapted, with `read()` and `write()`.
- **`SDMemoryCard`**: an ordinary `MemoryCard` that the client uses directly.
- **`FlashDrive`**: the adaptee: a `USBDrive` that the client cannot use as it is.
- **`USBCardReaderAdapter`**: the adapter. It implements `MemoryCard`, holds a `USBDrive`, and forwards `readData()` to `read()` and `writeData()` to `write()`.
- **`Demo`**: the client. It uses the SD card and then the flash drive, both through the `MemoryCard` interface.

## The code

```java [MemoryCard.java]
public interface MemoryCard {
    void readData();

    void writeData();
}
```

```java [USBDrive.java]
public interface USBDrive {
    void read();

    void write();
}
```

```java [SDMemoryCard.java]
class SDMemoryCard implements MemoryCard {
    public void readData() {
        System.out.println("Reading data from SD memory card");
    }

    public void writeData() {
        System.out.println("Writing data to SD memory card");
    }
}
```

```java [FlashDrive.java]
public class FlashDrive implements USBDrive {
    public void read() {
        System.out.println("Reading data from flash drive");
    }

    public void write() {
        System.out.println("Writing data to flash drive");
    }
}
```

```java [USBCardReaderAdapter.java]
public class USBCardReaderAdapter implements MemoryCard {
    private final USBDrive flashDrive;

    public USBCardReaderAdapter(USBDrive flashDrive) {
        this.flashDrive = flashDrive;
    }

    public void readData() {
        flashDrive.read();
    }

    public void writeData() {
        flashDrive.write();
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        MemoryCard sdCard = new SDMemoryCard();
        sdCard.readData();
        sdCard.writeData();

        USBDrive flashDrive = new FlashDrive();
        MemoryCard adapter = new USBCardReaderAdapter(flashDrive);
        adapter.readData();
        adapter.writeData();
    }
}
```

Running `Demo` prints:

```text
Reading data from SD memory card
Writing data to SD memory card
Reading data from flash drive
Writing data to flash drive
```
