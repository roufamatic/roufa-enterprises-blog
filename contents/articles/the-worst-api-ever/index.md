---
title: The Worst API ever
author: Michael Roufa
date: 2013-10-10
template: article.jade
---

I'm integrating with what may be the worst API ever. Check this out!

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" 
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
 <soap:Body>
  <Create xmlns="http://www.REDACTED.com/api/">
   <data>
    ["{\"type\":\"REDACTED\",\"data\":\"{ParentType: 'REDACTED', ParentId: '1', ActionEntityType: '2', ActionEntityId: '3', SegmentId: '0' }\",\"normalize\":false}"]
   </data>
  </Create>
 </soap:Body>
</soap:Envelope>
```
So much wrong in so little space. Here we have:

* a SOAP message...
* ... with a "data" parameter...
* ... containing a JSON array...
* ... of a single string
* ... of JSON (string-escaped, of course)...
* ... that itself contains "data" parameter...
* ... which is again a string....
* ... of improperly formatted JSON!

I suspect the last improper formatting is to reduce the amount of quote-escaping needed given that you are now in double-escape territory. Oh, and lest you think it's just being permissive -- if you attempt to properly JSON-encode the inner data parameter, the call fails with "unable to parse JSON!" 

This. Is. A. Maz. Ing.