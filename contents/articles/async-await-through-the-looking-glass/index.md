---
title: Async/Await -- Through the Looking Glass
author: Michael Roufa
date: 2013-12-17
template: article.jade
---
![Alice entering the Looking-glass World (http://www.victorianweb.org/art/illustration/tenniel/lookingglass/1.4.html)](ttlg.jpg)

I finally had a chance to try out the no longer very new *async/await* paradigm for asynchronous programming in .NET. My goal: make a long-running MVC4 action asynchronous to prevent thread starvation in ASP.NET.

When the call is made, the action fires off an executable to perform some work. This executable returns immediately and offers few hooks, so the only way I can be certain that the operation has completed is to watch for the appearance of a particular zero-byte file that it creates when it has finished.

The beauty of *async/await* is how it does away with the traditional async callback method. Instead of Begin/End pairs, or Async/Complete, or even callback events, you get code that looks something like this.

    public async Task<Stuff> GetStuffAsync() {
        Stuff stuff = await DoTheAsyncThing();
        return stuff;
    }

It all looks very synchronous and saves a lot of mental unwinding that would happen otherwise.

But as I learned today, once you do hit the `await` statement, you are still leaving the stack. And when the `await` returns, the place you come back to may not be identical to the place you left, depending on how it got there. Here's a contrived example.

    public async Task<Stuff> GetStuffAsync(string someRelativeFolder) {
        string completionFile = 
            HttpContext.Current.Server.MapPath(
                Path.Combine(someRelativeFolder, "file.txt"))
        await VerifyFileExists(completionFile);
        
        string absolutePath = HttpContext.Current.Server.MapPath(
            Path.Combine(someRelativeFolder, "anotherfile.xml"));

        return LoadStuffFromAbsolutePath(absolutePath);
    }

    public async Task VerifyFileExists(string path) {
        if (File.Exists(path)) return Task.FromResult(true);
        var tsc = new TaskCompletionSource<bool>();
        var fsw = new FileSystemWatcher(Path.GetDirectoryName(path));
        FileSystemEventHandler createdHandler = null;
        createdHandler = (s, e) => {
            if (e.Name == Path.GetFileName(path)) {
                tcs.SetResult(true);
                watcher.Created -= createdHandler;
                watcher.Dispose();
            }
        }
        watcher.Created += createdHandler;
        watcher.EnableRaisingEvents = true;
        return tcs.Task;
    }

This throws a `NullReferenceException` the **second** time that you try to access `HttpContext.Current`. Why? The `fsw.Created` handler is called on a different thread than the one you just came from. That's a pretty well-known fact and is why the `FileSystemWatcher` has a `SynchronizingObject` property to help WinForms programmers navigate their way back to the UI thread. 

But it also exposes the "through the looking glass" nature of *async/await*. The simplified syntax obscures the true nature of the code -- in one method, the same object goes from having a value to having no value. Watch out!