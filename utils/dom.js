function getClosest (elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }

  // Get the closest matching element
  for ( ; elem && elem !== document; elem = elem.parentNode ) {
    if ( elem.matches( selector ) ) return elem;
  }
  return null;
};

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root['autoComplete/utils/dom'] = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  return {
    getClosest: getClosest,
  };
}));
