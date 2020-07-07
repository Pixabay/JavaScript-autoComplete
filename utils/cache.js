(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./string'));
    } else {
        root['autoComplete/utils/cache'] = factory(root['autoComplete/utils/string']);
    }
}(typeof self !== 'undefined' ? self : this, function (_string) {
    var removeBoldElement = _string.removeBoldElement;

    function removeSuggestionFromCache(cache, suggestion) {
        var cleanCache = {};
        for (var key in cache) {
            cleanCache[key] = cache[key].filter(function (element) {
                return removeBoldElement(JSON.stringify(element)) !== removeBoldElement(JSON.stringify(suggestion));
            })
        }
        return cleanCache;
    }
    return {
        removeSuggestionFromCache: removeSuggestionFromCache
    };
}));
