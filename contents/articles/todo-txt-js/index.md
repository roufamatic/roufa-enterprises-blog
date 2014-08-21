---
title: Todo.txt JavaScript parser
author: Michael Roufa
date: 2014-08-21
template: article.jade
---

<div class="github-widget" data-repo="roufamatic/todo-txt-js" style="padding-bottom:20px"></div>

My current todo list is a simple text file using the popular *[todo.txt](https://github.com/ginatrapani/todo.txt-cli/wiki/The-Todo.txt-Format)* format. Along with the Android app, I'm able to keep track of my tasks in a simple format that I can access on the go. 

Lately, I've been hard at work on a new project that I hope to announce in the not-too-distant future. The project involves showing todos in a Chrome extension, and I wanted to be able to support *todo.txt* files as well as plain old text files. 

This isn't the only Javascript implementation of the spec, but it was such a nice, contained project that it seemed like a good chance to [reinvent the wheel](http://blog.codinghorror.com/dont-reinvent-the-wheel-unless-you-plan-on-learning-more-about-wheels/). The result is pure JavaScript using lessons gleaned from the classic *[JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)*, and was developed TDD-style using [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/). Enjoy!

[todo-txt-js on GitHub](https://github.com/roufamatic/todo-txt-js)