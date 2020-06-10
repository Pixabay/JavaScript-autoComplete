const remmoveSuggestionFromCache = (cache, suggestion) => {
    suggestion = suggestion.replace(/<b>|<\/b>/g, '');
    for (key in cache) {
        cache[key] = cache[key].filter((element) => {
            if (element.titulo.replace(/<b>|<\/b>/g, '') !== suggestion) {
                return true;
            } else {
                return false;
            }
        })
    }
}

module.exports = {
    remmoveSuggestionFromCache,
}
