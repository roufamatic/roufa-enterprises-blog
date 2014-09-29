---
title: Lovely "usage" wrapper for jasmine data-driven tests
author: Michael Roufa
date: 2013-10-14
template: article.jade
disqusId: lovely-usage-wrapper-for-jasmine
disqusUrl: http://www.roufa.com/articles/lovely-usage-wrapper-for-jasmine
---

I was looking for a way to do a bit of data-driven testing with [jasmine](http://pivotal.github.io/jasmine/), and [JP nailed it](http://blog.jphpsf.com/2012/08/30/drying-up-your-javascript-jasmine-tests).

```javascript
describe("username validation", function() {
  using("valid values", 
    ["abc", "longusername", "john_doe"], 
    function(value){
      it("should return true for valid usernames", function() {
        expect(validateUserName(value)).toBeTruthy();
      });
    });
});
```

The gist is that you can simply wrap your `it()` calls in a function that iterates over an array and pass the data in with each loop. It works great with synchronous and asynchronous tests. The function integrates cleanly with the test runner so each spec gets its own descriptive row. Best of all, it has a very pleasing syntax that makes it clear what is going to happen when you use it.

Check out [JP's blog](http://blog.jphpsf.com/2012/08/30/drying-up-your-javascript-jasmine-tests) for the source.