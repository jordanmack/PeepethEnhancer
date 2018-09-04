// ==UserScript==
// @name         Peepeth Enhancer
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  Peepeth Enhancer is a collection of scripts that add several new features to Peepeth.
// @author       Jordan Mack (jordanmack.info)
// @match        https://peepeth.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	jQuery(`<script src="https://cdn.rawgit.com/jordanmack/PeepethEnhancer/ee9121bf/peepeth-enhancer.js"></script>`).appendTo("body");
});