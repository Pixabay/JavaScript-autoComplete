var _cache = require('../../utils/cache'),
    removeSuggestionFromCache = _cache.removeSuggestionFromCache

describe('Cache functions', function () {
    it('should remove query from cache', function () {
        // GIVEN
        var queries = {
            'pref1': [{ titulo: 'target' }, { titulo: 'any' }, { titulo: 'any' }],
            'pref2': [{ titulo: 'any' }, { titulo: 'any' }, { titulo: 'target' }],
            'pref3': [{ titulo: 'any' }, { titulo: 'target' }, { titulo: 'any' }]
        };
        var term = {titulo:'target'};

        // WHEN
        var newCache = removeSuggestionFromCache(queries, term);

        // THEN
        expect(newCache).toMatchObject({
            'pref1': [{ titulo: 'any' }, { titulo: 'any' }],
            'pref2': [{ titulo: 'any' }, { titulo: 'any' }],
            'pref3': [{ titulo: 'any' }, { titulo: 'any' }]
        })
    });
})
