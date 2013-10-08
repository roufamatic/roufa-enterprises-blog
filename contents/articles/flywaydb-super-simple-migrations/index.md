---
title: FlywayDB -- super-simple forward-only raw SQL database migrations for Java
author: Michael Roufa
date: 2013-08-12
template: article.jade
---

For a recent green-field Java project, I chose [Flyway](http://flywaydb.org/) to manage all our database scripts. This library is a gem<a name="1up"></a><sup>[1](#1)</sup>, and I highly recommend it for anybody building or maintaining relational databases in Java.

It's not for every project, of course. Before you commit to using it, you'll need to be sure yours can adhere to the following guidelines:

1. You are only planning to support a single database engine (e.g. MySQL, Postgresql, SQL Server).
2. You are comfortable writing and maintaining raw SQL files for said engine.
3. You are comfortable with a forward-only migration plan and do not need rollback capabilities.

Point #3 is one that FlywayDB enforces simply by exclusion -- there is no "down" pattern to follow a la Rails Migrations. I've spent many hours maintaining "down" scripts, and in the few instances where I've attempted to use them, they've invariably run into problems in the field. For example:

* Newly inserted data cannot be removed due to a forgotten foreign key constraint (my fault, but an easy mistake to make)
* Reverted data structures require more thought than automation can accomplish (e.g. you went from a 1:1 relationship to 1:M, and reverting means having to choose to delete user data that could now be important)
* Sometimes when you go forward you drop tables or columns. There's no good way to reconstruct them!

Furthermore, old "down" migration code rapidly becomes cruft as newer migrations are added. When your project is a year old, do you really plan to revert back to a database schema from 6 months ago? I'm fine knowing that if I need to revert something, I do so by going forward.

Like much modern software, Flyway is very opinionated and prefers convention over configuration. You name your files like `VX_Y__DescriptiveName.sql` (where X & Y are major and minor version numbers) and place them in `/src/main/resources/db/migration`. Make sure each new file is in ascending order and Flyway takes care of the rest.  When you need to customize the configuration, Flyway is there for you as well. In our case we had some servers running postgresql 8, while our production platform was postgresql 9. That led to some script incompatibilities. We resolved that by adding a separate folder for pg9-specific migrations, then configuring each server to run migrations from their own set of folders.

Finally, for actually executing the migrations themselves you have several choices. You can run them via a command-line tool, Gradle or Maven plugin, Ant Task, or take the easy road (as we did) and embed it into your application itself via Spring. The scripts are run within a single transaction, so even if you have a pool of servers attempting to execute the code only one machine will actually succeed at committing. A table called `SCHEMA_MIGRATION` will be added to your database, which FlywayDB will use to ensure only needed migrations are run.

It's rare to find a component that does its job so well you rarely even think about it. Flyway fits that description. Give it a try!

<small><a name="1" href="#1up">1.</a> Not a ruby gem, just a real world gem. Like a ruby. No wait.</small>

