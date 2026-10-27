---
title: Facade
group: Structural
summary: 'One simple class in front of a complex system, so callers talk to it instead of to every part.'
description: 'The Facade pattern puts one simple class in front of a complex subsystem, so callers make one call instead of many and need not know how the parts fit. Explained with a worked Java example of trading shares.'
example: 'Buying and selling shares through one class'
order: 5
source: https://github.com/Haythamasalama/designPattern/tree/master/src/Structural/Facade
---

## The idea

A task often needs several classes to work together in the right order. Buying shares, for example, means taking money from a bank account and then adding the shares to a portfolio. If every caller does this itself, every caller has to know about both classes and the order of the steps.

A facade is a class that does this work for them. It offers a few simple methods, such as `buyStock`, and inside it calls the subsystem classes in the right order. Callers talk to the facade and don't need to know what is behind it.

The subsystem classes don't change, and they don't know about the facade. Code that needs more control can still use them directly.

## When to use it

- A subsystem has many classes, and most callers only need a few common tasks from it.
- You want to give a library or an old module a simpler entry point.
- You want to reduce how many classes your code depends on, so changes inside the subsystem don't spread.
- You are organising a system in layers, and want each layer to have one entry point.

## Pros and cons

### Pros

- It separates concerns: callers deal with tasks, and the subsystem deals with the details.
- It gives a simpler, more convenient interface to a complex system.
- Callers depend on one class instead of many, so the subsystem can change behind it.

### Cons

- A facade can grow into a large class that knows too much and is coupled to every part of the system.
- If callers need options the facade doesn't offer, they go around it, and you end up with two ways of doing the same thing.

## The example

The example is a small financial system. Buying and selling shares touches both the bank account and the stock portfolio, and checking credit is a separate service.

- **`BankAccount`**, **`StockPortfolio`** and **`CreditRating`**: the subsystem classes. Each does one job and knows nothing of the others.
- **`FinancialSystemFacade`**: the facade. It creates the three subsystem objects. `buyStock` withdraws the cost from the account, then buys the shares. `sellStock` sells the shares, then deposits the money. The prices are fixed in the code: 100 a share to buy and 110 a share to sell.
- **`Demo`**: the client. It only ever uses the facade.

## The code

```java [BankAccount.java]
public class BankAccount {
    public void deposit(double amount) {
        System.out.println("Deposit " + amount + " to bank account");
    }

    public void withdraw(double amount) {
        System.out.println("Withdraw " + amount + " from bank account");
    }
}
```

```java [StockPortfolio.java]
public class StockPortfolio {
    public void buy(String stock, int shares) {
        System.out.println("Buy " + shares + " shares of " + stock + " stock");
    }

    public void sell(String stock, int shares) {
        System.out.println("Sell " + shares + " shares of " + stock + " stock");
    }
}
```

```java [CreditRating.java]
public class CreditRating {
    public void check() {
        System.out.println("check credit rating");
    }
}
```

```java [FinancialSystemFacade.java]
public class FinancialSystemFacade {
    private final BankAccount bankAccount;
    private final StockPortfolio stockPortfolio;
    private final CreditRating creditRating;

    public FinancialSystemFacade() {
        bankAccount = new BankAccount();
        stockPortfolio = new StockPortfolio();
        creditRating = new CreditRating();
    }

    public void checkCredit() {
        creditRating.check();
    }

    public void buyStock(String stock, int shares) {
        bankAccount.withdraw(shares * 100);

        stockPortfolio.buy(stock, shares);
    }

    public void sellStock(String stock, int shares) {
        stockPortfolio.sell(stock, shares);

        bankAccount.deposit(shares * 110);
    }
}
```

```java [Demo.java]
public class Demo {
    public static void main(String[] args) {
        FinancialSystemFacade facade = new FinancialSystemFacade();

        facade.checkCredit();
        facade.buyStock("AAPL", 10);
        facade.sellStock("AAPL", 5);
    }
}
```

Running `Demo` prints:

```text
check credit rating
Withdraw 1000.0 from bank account
Buy 10 shares of AAPL stock
Sell 5 shares of AAPL stock
Deposit 550.0 to bank account
```
