---
title: Quick Boot Camp Tip
author: Michael Roufa
date: 2013-10-22
template: article.jade
---

Thought I'd leave this nugget in case it helps somebody. Yesterday my 6-month-old Lenovo ThinkPad W530 died, and my wife needed a new computer anyway, so I picked up a Mac Mini. It's her computer, but will act as my emergency machine in case something like this happens again. Since I'm primarily a Windows developer, I set up a small partition with Boot Camp.

Here's what I've learned: If you're attempting to install Windows 8.1 on a Mac Mini using Boot Camp, and you choose to download the drivers to a USB flash drive and then install from an external DVD drive, [you must remove the flash drive before rebooting into the Windows installer](http://support.apple.com/kb/TS4536). Otherwise you'll just see a blank screen and nothing will happen and you'll be scared and afraid for your brand new purchase.

Also, the "alt" key is your friend if you don't have an Apple keyboard -- hold it down on boot to see the boot options.