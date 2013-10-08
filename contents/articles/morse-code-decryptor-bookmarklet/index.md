---
title: Morse Code Decoder Bookmarklet
author: Michael Roufa
date: 2013-07-30
template: article.jade
---

Ever been to a web page where a clever person has left you some morse code? And you have to go to some other website to decrypt it for you? How pass&eacute;! 

Instead, try this useful bookmarklet!

---

<script type="text/javascript">// <![CDATA[
function selectText(containerid) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
        }
    }
// ]]></script>

Drag this to your bookmarks bar: <a href="javascript:(function(){var DIT='.';var DAH='-';var dits=['.','&middot;'];var dahs=['_','-','=','&ndash;'];var charCodes=new Array(36);charCodes['.-']='A';charCodes['-...']='B';charCodes['-.-.']='C';charCodes['-..']='D';charCodes['.']='E';charCodes['..-.']='F';charCodes['--.']='G';charCodes['....']='H';charCodes['..']='I';charCodes['.---']='J';charCodes['-.-']='K';charCodes['.-..']='L';charCodes['--']='M';charCodes['-.']='N';charCodes['---']='O';charCodes['.--.']='P';charCodes['--.-']='Q';charCodes['.-.']='R';charCodes['...']='S';charCodes['-']='T';charCodes['..-']='U';charCodes['...-']='V';charCodes['.--']='W';charCodes['-..-']='X';charCodes['-.--']='Y';charCodes['--..']='Z';charCodes['.----']='1';charCodes['..---']='2';charCodes['...--']='3';charCodes['....-']='4';charCodes['.....']='5';charCodes['-....']='6';charCodes['--...']='7';charCodes['---..']='8';charCodes['----.']='9';charCodes['-----']='0';charCodes['.-.-.-']='.';charCodes['--..--']=',';charCodes['..--..']='?';charCodes['-....-']='-';charCodes['-...-']='=';charCodes['---...']=':';charCodes['-.-.-.']=';';charCodes['-.--.']='(';charCodes['-.--.-']=')';charCodes['-..-.']='/';charCodes['.-..-.']='\'\'';charCodes['...-..-']='$';charCodes['.----.']='\'';charCodes['.-.-..']='\n';charCodes['..--.-']='_';charCodes['.--.-.']='@';charCodes['---.']='!';charCodes['-.-.--']='!';charCodes['.-.-.']='+';charCodes['.-...']='~';charCodes['...-.-']='#';charCodes['. ...']='&amp;';charCodes['-..-.']='/';var decrypt=function(){var txt=clean(getSelectionText());var decrypted='';var i=0;var curSeq='';var phrase='';while(i&lt;txt.length){var curChar=txt[i];if(curChar===DIT||curChar===DAH){curSeq+=curChar;}else{if(charCodes[curSeq])phrase+=charCodes[curSeq];else if(phrase.length&amp;&amp;phrase[phrase.length-1]!==' ')phrase+=' ';curSeq='';}i++;}if(charCodes[curSeq])phrase+=charCodes[curSeq];alert(phrase);};var clean=function(txt){var output=txt;var reDits=new RegExp('[\\'+dits.join('\\')+']','g');var reDahs=new RegExp('[\\'+dahs.join('\\')+']','g');var reNada=new RegExp('[^\\'+dits.join('\\')+dahs.join('\\')+']','g');output=output.replace(/^\s*/,'').replace(/\s*$/,'');output=output.replace(reDits,DIT);output=output.replace(reDahs,DAH);output=output.replace(reNada,' ');return output;};var getSelectionText=function(){var text='';if(typeof window.getSelection!='undefined'){var sel=window.getSelection();if(sel.rangeCount){var container=document.createElement('div');for(var i=0,len=sel.rangeCount;i&lt;len;++i){container.appendChild(sel.getRangeAt(i).cloneContents());}text=container.innerText;}}else if(typeof document.selection!='undefined'){if(document.selection.type=='Text'){text=document.selection.createRange().text;}}return text;};decrypt();})();">Decrypt Morse Code</a>

Then, <a href="javascript:void(0)" onclick="(function(){selectText('sample');})()">select some text</a> and click on the bookmark.

<pre id="sample">
- .... .- - .----. ... / .- -... --- ..- - /
- .... . / .-.. --- -. --. / .- -. -.. /
... .... --- .-. - / --- ..-. /
.. - ---. .-.-.. .-.-.. .- -. --- - .... . .-. /
.... .- -. -.. -.-- / - --- --- .-.. /
..-. .-. --- -- / .-. --- ..- ..-. .- /
. -. - . .-. .--. .-. .. ... . ... .-.-.-
</pre>

[MorseDecryptorBookmarklet on GitHub](https://github.com/roufamatic/MorseDecryptorBookmarklet)

