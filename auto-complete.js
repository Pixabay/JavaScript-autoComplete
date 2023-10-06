/*
    JavaScript autoComplete v1.1.0
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/

// Chrome 38+, Edge 13+, Safari 8+, Firefox 26+, Opera 25+, all mobile browsers

var autoComplete = (function(){
    // "use strict";
    function autoComplete(options){
        if (!document.querySelector) return;

        // helpers
        function live(elClass, event, cb, context){
            (context || document).addEventListener(event, function(e){
                for (var t = e.target || e.srcElement; t; t = t.parentElement)
                    t.classList.contains(elClass) && (cb.call(t, e), t = 1);
            }, true);
        }

        var o = {
            selector: 0,
            source: 0,
            minChars: 3,
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            cache: 1,
            menuClass: '',
            renderItem: function(item, search){
                // escape special characters
                var si = document.createElement('div');
                si.className = 'autocomplete-suggestion';
                si.setAttribute('data-val', item); // see PR#86
                try{
                    search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    si.innerHTML = item.replace(new RegExp("(" + search.split(' ').join('|') + ")", "gi"), "<b>$1</b>");
                }catch(e){
                    si.textContent = item;
                }
                return si;
            },
            renderItems: function (data, search, that){
                var tp = document.createElement('template');
                var df = tp.content;
                for (var i=0;i<data.length;i++){
                    var item = data[i];
                    var si = o.renderItem(item, search);
                    if (typeof si === 'string') tp.innerHTML += si;
                    else if (si && si.nodeType === 1) df.appendChild(si);
                }
                var _sc = that.sc;
                var firstChild;
                while (firstChild = _sc.firstChild) {
                    firstChild.remove();
                }
                _sc.appendChild(df);
            },
            onSelect: function(e, term, item){}
        };
        for (var k in options) { if (options.hasOwnProperty(k)) o[k] = options[k]; }

        // init
        var elems = typeof o.selector == 'object' ? [o.selector] : document.querySelectorAll(o.selector);
        var forEach = function (that) {

            that._currentRequestId = 0;
            // create suggestions container "sc"
            that.sc = document.createElement('div');
            that.sc.className = 'autocomplete-suggestions '+o.menuClass;
            that.sc.style.display = 'none';

            that.autocompleteAttr = that.getAttribute('autocomplete');
            that.setAttribute('autocomplete', 'off');
            that.cache = new Map(); // changed from {} to Map; related to PR#37 PR#38
            that.last_val = '';

            that.updateSC = function(resize, next){ // see issue mentioned in PR#49
                if(that != document.activeElement) return; // issue#51 PR#52
                var rect = that.getBoundingClientRect();
                that.sc.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + o.offsetLeft) + 'px';
                that.sc.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + o.offsetTop) + 'px';
                that.sc.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth
                if (!resize) {
                    that.sc.style.display = 'block';
                    if (!that.sc.maxHeight) { that.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle).maxHeight); }
                    if (!that.sc.suggestionHeight) that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
                    if (that.sc.suggestionHeight)
                        if (!next) that.sc.scrollTop = 0;
                        else {
                            var scrTop = that.sc.scrollTop, selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
                            if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0) {
                                that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;
                            } else if (selTop < 0){
                                that.sc.scrollTop = selTop + scrTop;
                            }
                        }
                }
            };
            window.addEventListener('resize', that.updateSC);
            document.body.appendChild(that.sc);

            that.sc.addEventListener('mouseleave', function(e){
                var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) setTimeout(function(){ sel.classList.remove('selected'); }, 20);
            });

            live('autocomplete-suggestion', 'mouseenter', function(e){
                var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) sel.classList.remove('selected');
                this.classList.add('selected');
            }, that.sc);

            live('autocomplete-suggestion', 'mousedown', function(e){
                e.stopPropagation();
                var v = this.getAttribute('data-val');
                that.value = v;
                o.onSelect(e, v, this);
                that.sc.style.display = 'none';
            }, that.sc);

            that.blurHandler = function(){
                try { var over_sb = document.querySelector('.autocomplete-suggestions:hover'); } catch(e){ var over_sb = 0; }
                if (!over_sb) {
                    that.last_val = that.value;
                    that.sc.style.display = 'none';
                    setTimeout(function(){ that.sc.style.display = 'none'; }, 350); // hide suggestions on fast input
                } else if (that !== document.activeElement) setTimeout(function(){ that.focus(); }, 20);
            };
            that.addEventListener('blur', that.blurHandler);

            var suggest = function(data, val){
                val = val || that.value; // PR#28
                that.cache.set(val, data);
                that.triggerSC(data, val, val.length >= o.minChars);
            };

            // PR#40
            // Optional method to trigger results programatically
            that.triggerSC = function(data, val, b){
                if (data.length && b!==false) {
                    o.renderItems(data, (val || ''), that);
                    that.updateSC(0);
                } else {
                    that.sc.style.display = 'none';
                }
            };

            that.keydownHandler = function(e){
                var key = window.event ? e.keyCode : e.which;
                // down (40), up (38)
                if ((key == 40 || key == 38) && that.sc.innerHTML) {
                    var next, sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                    if (!sel) {
                        next = (key == 40) ? that.sc.querySelector('.autocomplete-suggestion') : that.sc.lastChild; // first : last
                    } else {
                        sel.classList.remove('selected');
                        next = (key == 40) ? sel.nextSibling : sel.previousSibling;
                    }
                    if (next) {
                        next.classList.add('selected');
                        that.value = next.getAttribute('data-val');
                    } else {
                        that.value = that.last_val;
                        next = 0;
                    }
                    that.updateSC(0, next);
                    return false;
                }
                // esc
                else if (key == 27) { that.value = that.last_val; that.sc.style.display = 'none'; }
                // enter
                else if (key == 13 || key == 9) {
                    var tsc = that.sc;
                    var isVisible = tsc.style.display != 'none';
                    var sel = tsc.querySelector('.autocomplete-suggestion.selected');
                    if (sel && isVisible) {
                        o.onSelect(e, sel.getAttribute('data-val'), sel);
                        setTimeout(function(){ tsc.style.display = 'none'; }, 20);
                    }
                    if(isVisible) e.preventDefault(); // PR#8
                }
            };
            that.addEventListener('keydown', that.keydownHandler);

            that.keyupHandler = function(e){
                var key = window.event ? e.keyCode : e.which;
                if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
                    var val = that.value;
                    if (val.length >= o.minChars) {
                        if (val != that.last_val) {
                            that.last_val = val;
                            clearTimeout(that.timer);
                            if (o.cache) {
                                var c = that.cache;
                                if (c.has(val)) { suggest(c.get(val)); return; }
                                // no requests if previous suggestions were empty
                                var k = o.minChars;
                                for (var j=val.length-1; j>=k; j--) {
                                    var part = val.slice(0, j);
                                    if (c.has(part) && !c.get(part).length) { suggest([]); return; }
                                }
                            }
                            // PR#5
                            that.timer = setTimeout(function(){
                                var val = that.value;
                                var thisRequestId = ++that._currentRequestId;
                                o.source(val, function (data, val){
                                    if (thisRequestId === that._currentRequestId) return suggest(data, val);
                                });
                            }, o.delay);
                        }
                    } else {
                        that.last_val = val;
                        that.sc.style.display = 'none';
                    }
                }
            };
            that.addEventListener('keyup', that.keyupHandler);

            that.focusHandler = function(e){
                that.last_val = '\n';
                that.keyupHandler(e)
            };
            if (!o.minChars) that.addEventListener('focus', that.focusHandler);
        }
        for (var i=0; i<elems.length; i++) {
            forEach(elems[i]);
        }

        // public destroy method
        this.destroy = function(){
            var elems = this.elems;
            if (elems) {
                this.elems = null;
                for (var i=0; i<elems.length; i++) {
                    var that = elems[i];
                    window.removeEventListener('resize', that.updateSC);
                    that.removeEventListener('blur', that.blurHandler);
                    that.removeEventListener('focus', that.focusHandler);
                    that.removeEventListener('keydown', that.keydownHandler);
                    that.removeEventListener('keyup', that.keyupHandler);
                    if (typeof that.autocompleteAttr == 'string') that.setAttribute('autocomplete', that.autocompleteAttr);
                    else that.removeAttribute('autocomplete');
                    that.sc && that.sc.remove(); // issue#92 PR#93
                    that = null;
                }
            }
        };

        this.elems = elems; // PR#40
    }
    return autoComplete;
})();

(function(){
    if (typeof define === 'function' && define.amd) define('autoComplete', function () { return autoComplete; });
    else if (typeof module !== 'undefined' && module.exports) module.exports = autoComplete;
    else window.autoComplete = autoComplete;
})();
