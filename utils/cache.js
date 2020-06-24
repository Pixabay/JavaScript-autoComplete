function removeSuggestionFromCache(cache, suggestion) {
    var clean_cache = {};
    for (key in cache) {
        clean_cache[key] = cache[key].filter(function (element) {
            return element.titulo.replace(/<b>|<\/b>/g, '') !== suggestion;
        })
    }
    return clean_cache;
}

module.exports = {
    removeSuggestionFromCache,
}
