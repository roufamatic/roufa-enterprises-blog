---
title: A few thoughts on Firebase
author: Michael Roufa
date: 2013-10-08
template: article.jade
---

[Firebase](http://www.firebase.com) is a beautiful thing. Real-time updates? AngularJS bindings? No need for a database of your own? It's a compelling offering. When it comes to actually using it, though... it's complicated.

---

I'm building a JavaScript version of the old "dots and lines" game, just for fun. Players take turns choosing line segments on a grid of dots, and when one completes a box (four line segments) he/she gets a point and another turn. My original plan was to try to build this with Firebase. Right off the bat, FireBase packages up much of what I want from my game's backend: a place to store moves, real-time updates when moves happen, and the ability to distinguish between users via authorization.

I hit my first snag when I started to think about security. In a traditional client/server game model, the server maintains a representation of the entire game and acts as the authority on whether any given move is legal. If somebody attempts to cheat by playing a move out of turn, the server can easily detect and prevent it.

Firebase, on the other hand, was designed as a promiscuous database in the cloud. Secrecy in Firebase is managed by writing "security rules" in the "Forge" (their dashboard). In their security model, you must pre-define what areas of your data tree are available to each user. Considering that its main selling point is persisting arbitrary JSON objects, having to spend time on their server defining security rules has a definite "bolted-on" feel.

Validation on their platform requires a lot of planning ahead. In my case, I first tried to tackle the idea of each player having to take turns. There are a few ways to do this in Firebase, but the easiest is to disallow a write to a particular node if the last write was by the same user. Simple enough.

Then came the case where completing a box would give the current user another turn. At this point, Firebase lost its appeal. The solution is to give Firebase a representation of the entire game, just as I'd want in a server-side solution. But... how? How complicated would the validation logic be? 

I'm not saying there is no solution to the problem that would use Firebase exclusively. There may well be. What I am saying is that, within a few hours, I realized that any solution would be an order of magnitude more difficult than having my own server perform the same task. And at that point... why not host my own database?