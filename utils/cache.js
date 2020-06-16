function remmoveSuggestionFromCache(cache, suggestion) {
    for (key in cache) {
        cache[key] = cache[key].filter(function (element) {
            return element.titulo.replace(/<b>|<\/b>/g, '') !== suggestion;
        })
    }
}

module.exports = {
    remmoveSuggestionFromCache,
}
