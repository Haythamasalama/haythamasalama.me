---
title: Visitor
group: Behavioral
icon: lucide:footprints
summary: 'Add new operations to a set of classes without changing them, by moving each operation into its own visitor.'
description: 'The Visitor pattern lets you add new operations to a set of classes without changing them, by moving each operation into a visitor object. Explained with a worked Java example of a payroll.'
example: 'A payroll for full-time and part-time staff'
order: 8
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Behavioral/Visitor
---

## The idea

Say you have a stable set of classes, such as kinds of employee, and you keep needing new operations on them: work out pay, export to a spreadsheet, print a report. Adding each operation as a method to every class spreads unrelated code across all of them, and means editing them every time.

The Visitor pattern moves each operation into its own class, a visitor. The visitor has one `visit` method for each class it can work on. Each of those classes gets a single `accept(visitor)` method that calls `visitor.visit(this)`. Inside `accept`, `this` has the exact type of the class, so Java picks the matching `visit` method.

This two-step call is known as double dispatch: the code that runs depends on both the type of the visitor and the type of the element. A new operation is now a new visitor class, and the element classes don't change.

## When to use it

- You need many unrelated operations on a set of classes, and don't want to fill those classes with them.
- The set of classes rarely changes, but new operations are added often.
- An operation needs different logic for each class, and you want to avoid `instanceof` checks.
- You want to collect results across a structure of objects, such as totals over a list or a tree.

## Pros and cons

### Pros

- Adding a new operation is easy: write a new visitor, without touching the element classes.
- It separates concerns: each operation lives in one class instead of being spread across many.
- A visitor can keep state as it goes, such as a running total.

### Cons

- It adds classes to the system: one for every operation.
- Adding a new element class is hard, because every visitor needs a new `visit` method.
- Visitors often need public getters on the elements to do their work, which weakens encapsulation.

## The example

The example is a payroll. An organisation has full-time and part-time employees, and their pay is worked out in different ways. That calculation lives in a visitor, not in the employee classes.

- **`Employee`**: the element interface, with a single `accept(visitor)` method.
- **`EmployeeVisitor`**: the visitor interface, with one `visit` method for each kind of employee.
- **`FullTimeEmployee`** and **`PartTimeEmployee`**: concrete elements. Each `accept()` calls `visitor.visit(this)`.
- **`SalaryCalculator`**: the concrete visitor. It adds a full-time employee's salary to the total. For a part-time employee, it adds the hourly rate times 20 × 8, that is 160 hours.
- **`Organization`**: the object structure. It holds the employees, passes one `SalaryCalculator` to each of them, and prints the total.
- **`Demo`**: adds a full-time employee on 10,000 and a part-time one at 30 an hour, then asks for the total: 10,000 plus 30 × 160.

## The code

```java [Employee.java]
public interface Employee {
    void accept(EmployeeVisitor visitor);

}
```

```java [EmployeeVisitor.java]
public interface EmployeeVisitor {
    void visit(FullTimeEmployee employee);

    void visit(PartTimeEmployee employee);
}
```

```java [FullTimeEmployee.java]
public class FullTimeEmployee implements Employee {
    private final String name;
    private final double salary;

    public FullTimeEmployee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public void accept(EmployeeVisitor visitor) {
        visitor.visit(this);
    }
}
```

```java [PartTimeEmployee.java]
public class PartTimeEmployee implements Employee {
    private final String name;
    private final double hourlyRate;

    public PartTimeEmployee(String name, double hourlyRate) {
        this.name = name;
        this.hourlyRate = hourlyRate;
    }

    public String getName() {
        return name;
    }

    public double getHourlyRate() {
        return hourlyRate;
    }

    @Override
    public void accept(EmployeeVisitor visitor) {
        visitor.visit(this);
    }
}
```

```java [SalaryCalculator.java]
public class SalaryCalculator implements EmployeeVisitor {
    private double totalSalary;

    @Override
    public void visit(FullTimeEmployee employee) {
        totalSalary += employee.getSalary();
    }

    @Override
    public void visit(PartTimeEmployee employee) {
        totalSalary += employee.getHourlyRate() * 20 * 8;
    }

    public double getTotalSalary() {
        return totalSalary;
    }
}
```

```java [Organization.java]
import java.util.ArrayList;
import java.util.List;

public class Organization {
    List<Employee> employees;

    public Organization() {
        employees = new ArrayList<>();
    }

    public void addEmployee(Employee employee) {
        employees.add(employee);
    }

    public void calculateSalary() {
        SalaryCalculator calculator = new SalaryCalculator();
        for (Employee employee : employees) {
            employee.accept(calculator);
        }
        System.out.println("Total salary: " + calculator.getTotalSalary());
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        Organization company = new Organization();

        company.addEmployee(new FullTimeEmployee("Haytham", 10000));
        company.addEmployee(new PartTimeEmployee("Hamza", 30));
        company.calculateSalary();
    }
}
```

Running `Demo` prints:

```text
Total salary: 14800.0
```
