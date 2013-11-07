---
title: NHibernate can't short-circuit
author: Michael Roufa
date: 2013-11-07
template: article.jade
---
![Johnny Five Is Alive](JohnnyFive.jpg)

Like EF, [NHibernate](http://nhforge.org/) has a LINQ provider that allows you to query your tables, saving you the trouble of having to learn HQL or Criteria to get data out of your database. 

While doing some refactoring on an NHibernate-driven site, I came across a nasty exception:

```
System.ArgumentNullException: Value cannot be null. Parameter name: source 
at System.Linq.Enumerable.Cast[TResult](IEnumerable source)
```

This was a bit confusing at first. The code was already checking for null's. What gives?

```cs
List<int> list = null;
// ... something tries to populate the list ...
// If there's anything in the list, use that as a filter. 
// Otherwise return everything.
var q = Session.Query<Tbl>()
               .Where(t => list == null || list.Contains(t.IntProp));
```

Looking at the error message and the debugger it became clear that even though there the `list` variable was being evaluated. That's very unusual behavior in C# as the `||` operator is supposed to "short-circuit:" when the first operand evaluates to `true`, the second is not evaluated at all.

As it turns out, the parameter of the `Where` clause is not really C#. It is, in fact, an Expression. NHibernate does not execute this expression directly. Instead, it uses it to generate SQL to run against the database. 

To illustrate, suppose that there were no null check, and the list contained the values [1,2,3]. It might try to do something like this:

```sql
SELECT * FROM Tbl WHERE IntProp IN (1,2,3)
```

Now let's assume the list is null, but there's still no null-check in the expression. It would attempt to convert the list to its SQL equivalent and fail with the same exception as above.

Finally, we add the null check. Now NHibernate still is trying to generate a query. Perhaps it decides that "list IS NULL" is a perfectly reasonable SQL expression, or perhaps not. Regardless, *it still has to iterate over the list to generate the `IN` clause*, which it cannot do.

In essence, we are mixing a test that doesn't belong in a query with a test that does, but NHibernate simply cannot easily know that's the case. The solution is to move the tests where they belong.

```cs
List<int> list = null;
// ... something tries to populate the list ...
var q = Session.Query<Tbl>();
// If there's anything in the list, use that as a filter. 
// Otherwise return everything.
if (list != null) {
    q = q.Where(t => list.Contains(t.IntProp));
}
```

It's a bit clumsier without the fluent interface to lean on, but it does have the side benefit of making the resultant SQL query cleaner.