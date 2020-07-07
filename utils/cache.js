(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./string'));
    } else {
        root['autoComplete/utils/cache'] = factory(root['autoComplete/utils/string']);
    }
}(typeof self !== 'undefined' ? self : this, function (_string) {
    var clearString = _string.clearString;

    function removeSuggestionFromCache(cache, suggestion) {
        var cleanCache = {};
        for (var key in cache) {
            clean_cache[key] = cache[key].filter(function (element) {
                return clearString(JSON.stringify(element)) !== clearString(JSON.stringify(suggestion));
            })
        }
        return clean_cache;
    }
    return {
        removeSuggestionFromCache,
    };
}));
