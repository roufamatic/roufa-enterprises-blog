---
title: Bootstrapping Quality
author: Michael Roufa
date: 2013-10-18
template: article.jade
---

I gave a talk to CompSci seniors at Seattle University today about Version Control Systems, Test-Driven Development and Continuous Integration. Here are the slides:

<div style="text-align:center">
<iframe src="http://www.slideshare.net/slideshow/embed_code/27346279" width="476" height="400" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
</div>

During the presentation I tried to demonstrate TDD by building [FizzBuzz](http://www.codinghorror.com/blog/2007/02/why-cant-programmers-program.html) in a test-driven manner, then showed off Dependency Injection and Mocking by adding text from my twitter feed. 

[Download the source here](FizzBuzzInc.zip).

Notes: 

1. I removed my twitter app authentication keys, so if you execute the program it won't work. See the file Twit.cs and [Twitter Development](https://dev.twitter.com/docs) if you feel the need to resuscitate this.
2. I turned off the Azure VM that hosted the Jenkins instance referenced in the slides. It was costing me two cents an hour! That's like a latte every week.
