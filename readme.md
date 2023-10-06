JavaScript-autoComplete
===================

An extremely lightweight and powerful vanilla JavaScript completion suggester.

Tested in Firefox, Safari, Chrome, Opera, Internet Explorer 8+. No dependencies, written in plain JavaScript.
Released under the MIT License: http://www.opensource.org/licenses/mit-license.php

This plugin was developed by [Pixabay.com](https://pixabay.com/) - an international repository for sharing free public domain images.
We have implemented this piece of software in production on [plainJS](https://plainjs.com/) and we share it - in the spirit of Pixabay - freely with others.

## Links

https://cdn.jsdelivr.net/gh/cyfung1031/JavaScript-autoComplete@1.1.0/auto-complete.js
https://cdn.jsdelivr.net/gh/cyfung1031/JavaScript-autoComplete@1.1.0/auto-complete.min.js

## Usage
```html
<script src="https://cdn.jsdelivr.net/gh/cyfung1031/JavaScript-autoComplete@1.1.0/auto-complete.min.js"></script>
<form onsubmit="return false;" class="pure-form" style="border-top: 1px solid #eee;border-bottom:1px solid #eee;background:#fafafa;margin:30px 0;padding:20px 10px;text-align:center">
    <input id="hero-demo" autofocus type="text" name="q" placeholder="Programming languages ..." style="width:100%;max-width:600px;outline:0">
</form>
<script>
    var demo1 = new autoComplete({
        selector: '#hero-demo',
        minChars: 1,
        source: function(term, suggest){
            term = term.toLowerCase();
            var choices = ['ActionScript', 'AppleScript', 'Asp', 'Assembly', 'BASIC', 'Batch', 'C', 'C++', 'CSS', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'PowerShell', 'Python', 'Ruby', 'Scala', 'Scheme', 'SQL', 'TeX', 'XML'];
            var suggestions = [];
            for (var i=0;i<choices.length;i++)
                if (choices[i].toLowerCase().indexOf(term)>=0) suggestions.push(choices[i]);
            suggest(suggestions);
        }
    });
</script>
```
    

## Demo and Documentation

https://raw.githack.com/cyfung1031/JavaScript-autoComplete/1.1.0/demo.html

## Features

* Lightweight: 5.4 kB of JavaScript - less than 2.4 kB gzipped
* Fully flexible data source
* Smart caching, delay and minimum character settings
* Callbacks

## Changelog

### Version 1.1.0 - 2023/10/06

* Rolling out Update for 2015 - 2023 PRs

### Version 1.0.4 - 2016/02/10

* Included pull #6 and added offsetLeft/offsetTop as optional parameter for suggestions container.


### Version 1.0.3 - 2015/11/02

* Fixed #2: Unspecified error on IE 10.

### Version 1.0.2 - 2015/08/15

* Fixed: Hide suggestions on fast input.
* Fixed: Select item with tab.
* Fixed: Incorrect selection by mouse when suggestions are scrolled down.

### Version 1.0.1 - 2015/06/08

* Simplified code and minor bug fixes.

### Version 1.0.0 - 2015/06/07

* Prevent unnecessary search on pressing enter.

### Version 1.0.0 beta - 2015/05/12

* First release
