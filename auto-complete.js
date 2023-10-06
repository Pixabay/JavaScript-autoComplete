/*
    JavaScript autoComplete v1.2.0
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/

// Chrome 41+, Edge 15+, Safari 9+, Firefox 35+, Opera 28+, all mobile browsers

var autoComplete = (function(){
    // "use strict";
    function autoComplete(options){
        if (!document.querySelector) return;

        // helpers
        function live(selector, event, cb, context){
            context.addEventListener(event, function(e){
                var t = (e.target || e.srcElement).closest(selector);
                t && cb.call(t, e);
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
            clickToShow: 1,
            closeOnTap: 1,
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
            renderItems: function (data, search, ipt){
                var tp = document.createElement('template');
                var df = tp.content;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    var si = o.renderItem(item, search);
                    if (typeof si == 'string') tp.innerHTML += si;
                    else if (si && si.nodeType == 1) df.appendChild(si);
                }
                var _sc = ipt.sc;
                var firstChild;
                while (firstChild = _sc.firstChild) firstChild.remove();
                _sc.appendChild(df);
            },
            onSelect: function(e, term, item){},
            onRender: function(data, val, ipt){},
        };
        for (var k in options) { if (options.hasOwnProperty(k)) o[k] = options[k]; }

        var forEach = function (ipt) {

            ipt._currentRequestId = 0;
            // create suggestions container "sc"
            ipt.sc = document.createElement('div');
            ipt.sc.className = 'autocomplete-suggestions '+o.menuClass;
            ipt.sc.style.display = 'none';

            ipt.pivot = document.createElement('autocomplete-holder');
            ipt.autocompleteAttr = ipt.getAttribute('autocomplete');
            ipt.setAttribute('autocomplete', 'off');
            ipt.cache = new Map(); // changed from {} to Map; related to PR#37 PR#38
            ipt.last_val = '';

            ipt.updateSize = function(){
                var pivot = ipt.pivot;
                var rect = ipt.getBoundingClientRect();
                pivot.style.width = rect.width+'px';
                // pivot.style.height = rect.height+'px';
                pivot.style.marginTop = rect.height+'px';
                // pivot.style.marginBottom = -rect.height+'px';
            }

            ipt.isSCVisible = function(){
                var style = ipt.sc.style;
                return style.display != 'none';
            }
            ipt.hideSC = function(){
                var style = ipt.sc.style;
                style.display != 'none' && (style.display = 'none');
            }

            ipt.showSC = function(){
                var style = ipt.sc.style;
                style.display == 'none' && (style.display = 'block');
            }

            ipt.updateSC = function(next){ // see issue mentioned in PR#49

                ipt.updateSize();
                var pivot = ipt.pivot;
                var _sc = ipt.sc;
                (_sc.parentNode == pivot) || pivot.appendChild(_sc);
                (ipt.nextSibling == pivot) || ipt.parentNode.insertBefore(pivot, ipt);
                ipt.showSC();

                if (!next) _sc.scrollTop = 0;
                else {
                    var rectSC = _sc.getBoundingClientRect();
                    if (rectSC.height > 0) {
                        var rectNext = next.getBoundingClientRect();
                        var a = rectNext.top - rectSC.top;
                        var b = rectNext.bottom - rectSC.bottom;
                        if (b > 0) {
                            _sc.scrollTop += b;
                        } else if (a < 0) {
                            _sc.scrollTop += a;
                        }
                    }
                }

            };
            // window.addEventListener('resize', ipt.updateSC);

            //  ipt.pivot.appendChild(ipt.sc);
            ipt.parentNode.insertBefore(ipt.pivot, ipt); // avoid Safari's minor layout bug

            ipt.sc.addEventListener('mouseleave', function(e){
                var sel = ipt.sc.querySelector('.autocomplete-suggestion.selected');
                sel.classList.remove('selected');
            });

            live('.autocomplete-suggestion', 'mouseenter', function(e){
                var sel = ipt.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) sel.classList.remove('selected');
                this.classList.add('selected');
            }, ipt.sc);

            live('.autocomplete-suggestion', 'pointerdown', function(e){
                e.stopPropagation();
                e.preventDefault();
                if (!e.button) { // only left click
                    var v = ipt.value = this.getAttribute('data-val');
                    o.onSelect(e, v, this);
                    o.closeOnTap && ipt.hideSC();
                }
            }, ipt.sc);

            var suggest = function(data, val){ // see PR#28
                if (typeof val == 'string') {
                    (data instanceof Array) && ipt.cache.set(val, data);
                    ipt.triggerSC(data, val, val.length >= o.minChars);
                }
            };


            // PR#40
            // Optional method to trigger results programatically
            ipt.triggerSC = function(data, val, b){
                if (data.length && b !== false) {
                    o.renderItems(data, val, ipt);
                    ipt.updateSC();
                    o.onRender(data, val, ipt);
                } else {
                    ipt.hideSC();
                }
            };

            var inputCounter = 0;

            ipt.iptHandlers = {
                blur(){
                    ipt.last_val = ipt.value;
                    ipt.hideSC();
                },
                keydown(e){
                    var key = window.event ? e.keyCode : e.which;
                    // down (40), up (38)
                    if ((key == 40 || key == 38) && ipt.sc.lastChild) {
                        var next, sel = ipt.sc.querySelector('.autocomplete-suggestion.selected');
                        if (!sel) {
                            next = (key == 40) ? ipt.sc.querySelector('.autocomplete-suggestion') : ipt.sc.lastChild; // first : last
                        } else {
                            next = (key == 40) ? sel.nextSibling : sel.previousSibling;
                            sel.classList.remove('selected');
                        }
                        if (next) {
                            next.classList.add('selected');
                            ipt.value = next.getAttribute('data-val');
                        } else {
                            ipt.value = ipt.last_val;
                            next = 0;
                        }
                        ipt.updateSC(next);
                        e.preventDefault();
                    }
                    // esc
                    else if (key == 27) { ipt.value = ipt.last_val; ipt.hideSC(); }
                    // enter
                    else if (key == 13 || key == 9) {
                        var tsc = ipt.sc;
                        var isVisible = ipt.isSCVisible();
                        var sel = tsc.querySelector('.autocomplete-suggestion.selected');
                        if (sel && isVisible) {
                            o.onSelect(e, sel.getAttribute('data-val'), sel);
                            ipt.hideSC();
                        }
                        if (isVisible) { // PR#8
                            e.preventDefault();
                        }
                        ipt.last_val = ipt.value;
                    }
                },
                input(){
                    inputCounter++;
                },
                keyup(e){

                    if (!inputCounter) return;
                    inputCounter = 0;
                    var key = window.event ? e.keyCode : e.which;
                    if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
                        var val = ipt.value;
                        ipt.last_val = val;
                        if (val.length >= o.minChars) {
                            ipt.timer && clearTimeout(ipt.timer);
                            ipt.timer = 0;
                            if (o.cache) {
                                var c = ipt.cache;
                                if (c.has(val)) { suggest(c.get(val), val); return; }
                                // no requests if previous suggestions were empty
                                var k = o.minChars;
                                for (var j = val.length; --j >= k;) {
                                    var part = val.slice(0, j);
                                    if (c.has(part) && !c.get(part).length) { suggest([], val); return; }
                                }
                            }
                            // PR#5
                            ipt.timer = setTimeout(function(){
                                var thisRequestId = ++ipt._currentRequestId;
                                var _val = ipt.value;
                                o.source(_val, function (data, val){
                                    if (thisRequestId == ipt._currentRequestId){
                                       suggest(data, typeof val === 'string' ? val : _val);
                                    } 
                                });
                            }, o.delay);
                        } else {
                            ipt.sc.style.display = 'none';
                        }
                    }
                },
                // focus(e){
                //     if (!o.minChars) {
                //         ipt.last_val = '\n';
                //         ipt.iptHandlers.keyup(e);
                //     }
                // },

                click(){
                    if (o.clickToShow && ipt.isContentNotEmpty()) {
                        ipt.showSC();
                    }
                }

            }

            for (var h of Object.keys(ipt.iptHandlers)) {
                ipt.addEventListener(h, ipt.iptHandlers[h]);
            }

            ipt.destroyAutoComplete = function(){
                if (ipt) {
                    // window.removeEventListener('resize', ipt.updateSC);
                    for (var h of Object.keys(ipt.iptHandlers)) {
                        ipt.removeEventListener(h, ipt.iptHandlers[h]);
                    }
                    if (ipt.autocompleteAttr) ipt.setAttribute('autocomplete', ipt.autocompleteAttr);
                    else ipt.removeAttribute('autocomplete');
                    ipt.pivot && ipt.pivot.remove(); // issue#92 PR#93
                    ipt = null;
                }
            }

            ipt.isContentNotEmpty = function () {
                return (ipt.value || '').length > 0 && (ipt.sc.textContent || '').length > 0;
            }
            
        }
        // init
        var elems = typeof o.selector == 'object' ? [o.selector] : document.querySelectorAll(o.selector);
        for (var i = 0; i < elems.length; i++) {
            forEach(elems[i]);
        }

        // public destroy method
        this.destroy = function(){
            var elems = this.elems;
            if (elems) {
                this.elems = null;
                for (var i = 0; i < elems.length; i++) elems[i].destroyAutoComplete();
            }
            o = null;
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
