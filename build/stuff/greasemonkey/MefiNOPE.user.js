﻿// ==UserScript==
// @name        MeFi NOPE!
// @namespace   http://www.roufa.com/mefiNope
// @version     0.32
// @description Sometimes people post things that you don't want to click on. Click "NOPE!" instead to vanquish the post to oblivion.
// @match       *://www.metafilter.com/
// @match       *://www.metafilter.com/index.cfm*
// @copyright   2014+, Michael Roufa
// @require     http://code.jquery.com/jquery-latest.js
// ==/UserScript==


jQuery(function () {
    var noped = JSON.parse(GM_getValue('noped', '[]'));
    console.log("Loaded noped", noped);
    var nopeId = 0;

    var nope = function (el, save) {
        var p1 = el;
        nopeId++;
        console.log('p1', p1);
        p1.hide(); // Nope to the body!
        p1.addClass('nopeId-' + nopeId);
        var p2 = p1.prev('div.posttitle');
        console.log('p2', p2);
        p2.hide(); // Nope to the title!
        p2.addClass('nopeId-' + nopeId);
        p2.addClass('nopeUrlContainer-' + nopeId);
        if (save) {
            // Grab that URL for eternal noping.
            var linkAnchor = jQuery('a', p2)[0];
            var linkPath = linkAnchor.pathname;
            console.log('Noping forever', linkPath);
            noped.push(linkPath);
            saveNoped();
        }
        var p3 = p2.prev('br');
        console.log('p3', p3);
        p3.hide(); // Nope to the line break!
        p3.addClass('nopeId-' + nopeId);
        p1.before('<div class="copy"><small><em>[One item noped. <a href="#" onclick="return false" data-id="' + nopeId + '" class="unnope">unnope</a>]</em></small></div>');
    };

    jQuery(document).on('click', '.nope', function (event) {
        nope(jQuery(event.target).parents('div.copy'), true);
    });
    jQuery(document).on('click', '.unnope', function (event) {
        var id = jQuery(event.target).attr('data-id');
        jQuery('.nopeId-' + id).show();
        jQuery(event.target).parents('.copy').remove();
        var href = jQuery('a', '.nopeUrlContainer-' + id).attr('href');
        var i;
        for (i = 0; i < noped.length; i++) {
            if (noped[i] === href) break;
        }
        if (i < noped.length) {
            noped.splice(i, 1);
            saveNoped();
        }
    });

    var els = jQuery('span.smallcopy:contains("posted by")');
    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML += '&nbsp;[<a href="#" class="nope" onclick="return false;">NOPE!</a>]';
    }
    for (var i = 0; i < noped.length; i++) {
        var hrf = noped[i];
        var anc = jQuery("a[href$='" + hrf + "']:not('.more')");
        if (anc.length === 0) continue;
        console.log(hrf + " -- NOPE!!!!");
        var startEl = anc.parents('div.posttitle').next('div.copy');
        nope(startEl, false);
    }

    var saveNoped = function () {
        GM_setValue('noped', JSON.stringify(noped));
    };

});