---
title: Composite
group: Structural
icon: lucide:network
summary: 'Treat a single object and a group of objects the same way, by building them into a tree.'
description: 'The Composite pattern builds objects into a tree so that a single item and a whole group can be treated the same way. Explained with a worked Java example of files and directories in a file system.'
example: 'Files and directories in a file system'
order: 3
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Structural/Composite
---

## The idea

Many things are trees. A folder holds files and other folders. A menu holds items and sub-menus. An order holds products and boxes of products. Code that works with these often has to ask, at every step, "is this a single item or a group?"

The Composite pattern removes that question. Single items, the leaves, and groups, the composites, share one interface. A composite keeps a list of children of that interface type and passes each call down to them. So the client calls one method on the root, and the whole tree responds.

The Gang of Four call this a part-whole hierarchy: a whole is made of parts, and a part can itself be a whole.

## When to use it

- Your data forms a tree, such as folders, menus, organisation charts or screen layouts.
- You want client code to treat single objects and groups in the same way.
- An operation on a group should apply to everything inside it, such as working out a folder's size or drawing a group of shapes.
- You want to add new kinds of items without changing the code that walks the tree.

## Pros and cons

### Pros

- It represents part-whole hierarchies directly.
- Clients treat single objects and groups the same way, so they need fewer `if` checks.
- Adding a new kind of leaf or composite needs no change to existing code.

### Cons

- The shared interface can become too general. It is hard to stop a composite from accepting children it shouldn't.
- You must choose where `add` and `remove` live. Here they are only on `Directory`, which is safer, but clients must know when they hold a directory.

## The example

The example is a small file system. Directories hold files and other directories, and showing the name of a directory shows everything inside it.

- **`FileSystemComponent`**: the component interface shared by files and directories, with `showName()`.
- **`File`**: the leaf. It has no children, and `showName()` prints its own name.
- **`Directory`**: the composite. It keeps a list of `FileSystemComponent` children, with `add` and `remove`. Its `showName()` prints its own name, then calls `showName()` on each child.
- **`Demo`**: builds `root/home/user` with two files in `user`, then calls `showName()` once, on `root`.

That one call prints every name in the tree, each directory before its contents.

## The code

```java [FileSystemComponent.java]
public interface FileSystemComponent {
    void showName();
}
```

```java [File.java]
public class File implements FileSystemComponent {
    private final String name;

    public File(String name) {
        this.name = name;
    }

    public void showName() {
        System.out.println(name);
    }
}
```

```java [Directory.java]
import java.util.ArrayList;
import java.util.List;

public class Directory implements FileSystemComponent {
    private final String name;
    private final List<FileSystemComponent> children;

    public Directory(String name) {
        this.name = name;
        children = new ArrayList<>();
    }

    public void add(FileSystemComponent component) {
        children.add(component);
    }

    public void remove(FileSystemComponent component) {
        children.remove(component);
    }

    public void showName() {
        System.out.println(name);
        for (FileSystemComponent child : children) {
            child.showName();
        }
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Directory root = new Directory("root");
        Directory home = new Directory("home");
        Directory user = new Directory("user");
        File file1 = new File("file1.txt");
        File file2 = new File("file2.txt");

        root.add(home);
        home.add(user);
        user.add(file1);
        user.add(file2);

        root.showName();
    }
}
```

Running `Demo` prints:

```text
root
home
user
file1.txt
file2.txt
```
