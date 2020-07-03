function removeSuggestionFromCache(cache, suggestion) {
    var clean_cache = {};
    for (key in cache) {
        clean_cache[key] = cache[key].filter(function (element) {
            return JSON.stringify(element).replace(/<\/?b>/g, '') !== JSON.stringify(suggestion).replace(/<\/?b>/g, '');
        })
    }
    return clean_cache;
}

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root['autoComplete/utils/cache'] = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return {
        removeSuggestionFromCache,
    };
}));
