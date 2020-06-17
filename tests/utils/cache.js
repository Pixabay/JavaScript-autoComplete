var _cache = require('../../utils/cache'),
    removeSuggestionFromCache = _cache.removeSuggestionFromCache

describe('Cache functions', function () {
    it('should remove query from cache', function () {
        // GIVEN
        var queries = [
            [{ titulo: 'target' }, { titulo: 'any' }, { titulo: 'any' }],
            [{ titulo: 'any' }, { titulo: 'any' }, { titulo: 'target' }],
            [{ titulo: 'any' }, { titulo: 'target' }, { titulo: 'any' }]
        ];
        var term = 'target';

        // WHEN
        removeSuggestionFromCache(queries, term);

        // THEN
        expect(queries).toMatchObject([
            [{ titulo: 'any' }, { titulo: 'any' }],
            [{ titulo: 'any' }, { titulo: 'any' }],
            [{ titulo: 'any' }, { titulo: 'any' }]
        ])
    });
})