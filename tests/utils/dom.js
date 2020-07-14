var _dom = require('../../utils/dom'),

getClosest = _dom.getClosest;

describe('DOM related functions', function() {
  describe('getClosest', function() {
    beforeEach(function() {
      document.body.innerHTML =
        '<div class="autocomplete-suggestions ">' +
        '  <div class="autocomplete-suggestion  selected"' +
        '    data-url="https://escritorioonline.jusbrasil.com.br/contatos/jbprofile:13174584:AUTOMATIC:9753809"' +
        '    data-val="Leonice Alves">' +
        '    <div class="autocomplete-thumb">' +
        '      <div class="avatar avatar--circle avatar--sm avatar--bluegray">L</div>' +
        '    </div>' +
        '    <div class="autocomplete-suggestion-text">' +
        '      <span class="autocomplete-suggestion-text-title">Leonice Alves</span>' +
        '      <span class="autocomplete-suggestion-text-description">Cliente em potencial</span>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    });

    it('should return null properly if no matching parent was found', function() {
      var targetEl = document.querySelector('.autocomplete-suggestion-text-title');
      var expectedClosest = null;
      expect(getClosest(targetEl, '.unknown')).toEqual(expectedClosest);
    });

    it('should return the closest properly if parent was found', function() {
      var targetEl = document.querySelector('.autocomplete-suggestion-text-title');
      var expectedClosest = document.querySelector('.autocomplete-suggestion');
      expect(getClosest(targetEl, '.autocomplete-suggestion')).toEqual(expectedClosest);
    });

    it('should polyfill Element.matches properly', function() {
      var originalElementPrototype = Element.prototype;
      delete Element.prototype.matches;
      delete Element.prototype.matchesSelector;
      delete Element.prototype.mozMatchesSelector;
      delete Element.prototype.msMatchesSelector;
      delete Element.prototype.oMatchesSelector;
      delete Element.prototype.webkitMatchesSelector;

      var targetEl = document.querySelector('.autocomplete-suggestion-text-title');
      var expectedClosest = document.querySelector('.autocomplete-suggestion');
      expect(getClosest(targetEl, '.autocomplete-suggestion')).toEqual(expectedClosest);

      Element.prototype = originalElementPrototype;
    });
  });
})
