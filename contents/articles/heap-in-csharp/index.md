---
title: Heap in C#
author: Michael Roufa
date: 2016-06-05
template: article.jade
disqusId: heap-in-csharp
disqusUrl: http://www.roufa.com/articles/heap-in-csharp
---
![What a heap.](dung-406217_960_720.jpg)

I found myself wanting to learn a bit more about [Heaps](https://en.wikipedia.org/wiki/Heap_%28data_structure%29) so I built one in C#. 
Array backed storage, *O(log(n))* inserts and removals, *(O(1))* to get the min/max value. 
It can be a Min- or a Max-Heap, and it accepts any type as long as that type is *IComparable*.
&nbsp;<br>

<script src="https://gist.github.com/roufamatic/ee7e11469809f2b276c0d3dc6b8dd80b.js"></script>
