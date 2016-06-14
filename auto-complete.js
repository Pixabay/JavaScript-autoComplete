/*
 JavaScript autoComplete v1.0.4
 Copyright (c) 2014 Simon Steinberger / Pixabay
 GitHub: https://github.com/Pixabay/JavaScript-autoComplete
 License: http://www.opensource.org/licenses/mit-license.php
 */

var autoComplete = (function() {
    // "use strict";
    function autoComplete(options) {
        if (!document.querySelector) return;

        // helpers
        function hasClass(el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
        }

        function addEvent(el, type, handler) {
            if (el.attachEvent) el.attachEvent('on' + type, handler); else el.addEventListener(type, handler);
        }

        function removeEvent(el, type, handler) {
            // if (el.removeEventListener) not working in IE11
            if (el.detachEvent) el.detachEvent('on' + type, handler); else el.removeEventListener(type, handler);
        }

        function live(elClass, event, cb, context) {
            addEvent(context || document, event, function(e) {
                var found, el = e.target || e.srcElement;
                while (el && !(found = hasClass(el, elClass))) el = el.parentElement;
                if (found) cb.call(el, e);
            });
        }

        var defaultOptions = {
            selector: 0,
            source: 0,
            minChars: 3,
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            cache: 1,
            menuClass: '',
            renderItem: function(item, search) {
                // escape special characters
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>';
            },
            onSelect: function(e, term, item) {
            }
        };
        for (var option in options) {
            if (options.hasOwnProperty(option)) defaultOptions[option] = options[option];
        }

        // init
        var elems = typeof defaultOptions.selector == 'object' ? [defaultOptions.selector] : document.querySelectorAll(defaultOptions.selector);
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];

            // create suggestions container
            elem.suggestionsContainer = document.createElement('div');
            elem.suggestionsContainer.className = 'autocomplete-suggestions ' + defaultOptions.menuClass;

            elem.autocompleteAttr = elem.getAttribute('autocomplete');
            elem.setAttribute('autocomplete', 'off');
            elem.cache = {};
            elem.last_val = '';

            elem.updateSuggestionsContainer = function(resize, next) {
                var rect = this.getBoundingClientRect();
                this.suggestionsContainer.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + defaultOptions.offsetLeft) + 'px';
                this.suggestionsContainer.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + defaultOptions.offsetTop) + 'px';
                this.suggestionsContainer.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth
                if (!resize) {
                    this.suggestionsContainer.style.display = 'block';
                    if (!this.suggestionsContainer.maxHeight) {
                        this.suggestionsContainer.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(this.suggestionsContainer, null) : this.suggestionsContainer.currentStyle).maxHeight);
                    }
                    if (!this.suggestionsContainer.suggestionHeight) this.suggestionsContainer.suggestionHeight = this.suggestionsContainer.querySelector('.autocomplete-suggestion').offsetHeight;
                    if (this.suggestionsContainer.suggestionHeight)
                        if (!next) this.suggestionsContainer.scrollTop = 0;
                        else {
                            var scrTop = this.suggestionsContainer.scrollTop, selTop = next.getBoundingClientRect().top - this.suggestionsContainer.getBoundingClientRect().top;
                            if (selTop + this.suggestionsContainer.suggestionHeight - this.suggestionsContainer.maxHeight > 0)
                                this.suggestionsContainer.scrollTop = selTop + this.suggestionsContainer.suggestionHeight + scrTop - this.suggestionsContainer.maxHeight;
                            else if (selTop < 0)
                                this.suggestionsContainer.scrollTop = selTop + scrTop;
                        }
                }
            };
            addEvent(window, 'resize', elem.updateSuggestionsContainer);
            document.body.appendChild(elem.suggestionsContainer);

            live('autocomplete-suggestion', 'mouseleave', function() {
                var sel = elem.suggestionsContainer.querySelector('.autocomplete-suggestion.selected');
                if (sel) setTimeout(function() {
                    sel.className = sel.className.replace('selected', '');
                }, 20);
            }, elem.suggestionsContainer);

            live('autocomplete-suggestion', 'mouseover', function() {
                var sel = elem.suggestionsContainer.querySelector('.autocomplete-suggestion.selected');
                if (sel) sel.className = sel.className.replace('selected', '');
                this.className += ' selected';
            }, elem.suggestionsContainer);

            live('autocomplete-suggestion', 'mousedown', function(e) {
                if (hasClass(this, 'autocomplete-suggestion')) { // else outside click
                    var v = this.getAttribute('data-val');
                    elem.value = v;
                    defaultOptions.onSelect(e, v, this);
                    elem.suggestionsContainer.style.display = 'none';
                }
            }, elem.suggestionsContainer);

            elem.blurHandler = function() {
                var that = this;
                try {
                    var over_sb = document.querySelector('.autocomplete-suggestions:hover');
                } catch (e) {
                    var over_sb = 0;
                }
                if (!over_sb) {
                    this.last_val = this.value;
                    this.suggestionsContainer.style.display = 'none';
                    setTimeout(function() {
                        that.suggestionsContainer.style.display = 'none';
                    }, 350); // hide suggestions on fast input
                } else if (this !== document.activeElement) setTimeout(function() {
                    this.focus();
                }, 20);
            };
            addEvent(elem, 'blur', elem.blurHandler);

            var suggest = function(data) {
                var val = elem.value;
                elem.cache[val] = data;
                if (data.length && val.length >= defaultOptions.minChars) {
                    var s = '';
                    for (var i = 0; i < data.length; i++) s += defaultOptions.renderItem(data[i], val);
                    elem.suggestionsContainer.innerHTML = s;
                    elem.updateSuggestionsContainer(0);
                }
                else
                    elem.suggestionsContainer.style.display = 'none';
            };

            elem.keydownHandler = function(e) {
                var sel,
                    that = this,
                    key = window.event ? e.keyCode : e.which;
                // down (40), up (38)
                if ((key == 40 || key == 38) && this.suggestionsContainer.innerHTML) {
                    var next;
                    sel = this.suggestionsContainer.querySelector('.autocomplete-suggestion.selected');
                    if (!sel) {
                        next = (key == 40) ? this.suggestionsContainer.querySelector('.autocomplete-suggestion') : this.suggestionsContainer.childNodes[this.suggestionsContainer.childNodes.length - 1]; // first : last
                        next.className += ' selected';
                        this.value = next.getAttribute('data-val');
                    } else {
                        next = (key == 40) ? sel.nextSibling : sel.previousSibling;
                        if (next) {
                            sel.className = sel.className.replace('selected', '');
                            next.className += ' selected';
                            this.value = next.getAttribute('data-val');
                        }
                        else {
                            sel.className = sel.className.replace('selected', '');
                            this.value = this.last_val;
                            next = 0;
                        }
                    }
                    this.updateSuggestionsContainer(0, next);
                    return false;
                }
                // esc
                else if (key == 27) {
                    this.value = this.last_val;
                    this.suggestionsContainer.style.display = 'none';
                }
                // enter
                else if (key == 13 || key == 9) {
                    sel = this.suggestionsContainer.querySelector('.autocomplete-suggestion.selected');
                    if (sel && this.suggestionsContainer.style.display != 'none') {
                        defaultOptions.onSelect(e, sel.getAttribute('data-val'), sel);
                        setTimeout(function() {
                            that.suggestionsContainer.style.display = 'none';
                        }, 20);
                    }
                }
            };
            addEvent(elem, 'keydown', elem.keydownHandler);

            elem.keyupHandler = function(e) {
                var key = window.event ? e.keyCode : e.which;
                if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
                    var val = this.value;
                    if (val.length >= defaultOptions.minChars) {
                        if (val != this.last_val) {
                            this.last_val = val;
                            clearTimeout(this.timer);
                            if (defaultOptions.cache) {
                                if (val in this.cache) {
                                    suggest(this.cache[val]);
                                    return;
                                }
                                // no requests if previous suggestions were empty
                                for (var i = 1; i < val.length - defaultOptions.minChars; i++) {
                                    var part = val.slice(0, val.length - i);
                                    if (part in this.cache && !this.cache[part].length) {
                                        suggest([]);
                                        return;
                                    }
                                }
                            }
                            this.timer = setTimeout(function() {
                                defaultOptions.source(val, suggest)
                            }, defaultOptions.delay);
                        }
                    } else {
                        this.last_val = val;
                        this.suggestionsContainer.style.display = 'none';
                    }
                }
            };
            addEvent(elem, 'keyup', elem.keyupHandler);

            elem.focusHandler = function(e) {
                this.last_val = '\n';
                this.keyupHandler(e)
            };
            if (!defaultOptions.minChars) addEvent(elem, 'focus', elem.focusHandler);
        }

        // public destroy method
        this.destroy = function() {
            for (var i = 0; i < elems.length; i++) {
                var that = elems[i];
                removeEvent(window, 'resize', that.updateSuggestionsContainer);
                removeEvent(that, 'blur', that.blurHandler);
                removeEvent(that, 'focus', that.focusHandler);
                removeEvent(that, 'keydown', that.keydownHandler);
                removeEvent(that, 'keyup', that.keyupHandler);
                if (that.autocompleteAttr)
                    that.setAttribute('autocomplete', that.autocompleteAttr);
                else
                    that.removeAttribute('autocomplete');
                document.body.removeChild(that.suggestionsContainer);
                that = null;
            }
        };
    }

    return autoComplete;
})();

(function() {
    if (typeof define === 'function' && define.amd)
        define('autoComplete', function() {
            return autoComplete;
        });
    else if (typeof module !== 'undefined' && module.exports)
        module.exports = autoComplete;
    else
        window.autoComplete = autoComplete;
})();
