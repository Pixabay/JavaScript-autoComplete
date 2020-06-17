var MAX_LOCAL_QUERIES = 5;

function saveSuggestionQueries(storageName, queries) {
    window.localStorage.setItem(storageName, JSON.stringify(queries));
}

function getSuggestionQueries(storageName) {
    try {
        return JSON.parse(window.localStorage.getItem(storageName));
    } catch (ignored) {
        return [];
    }
}

function removeQueryFromLocalStorage(storageName, term) {
    var queries = getSuggestionQueries(storageName);
    var filteredQueries = queries.filter(function (query) {
        return query !== term;
    });
    saveSuggestionQueries(storageName, filteredQueries);
};

function addQueryToLocalStorage(storageName, query) {
    var queries = getSuggestionQueries(storageName);
    if (queries === null) {
        saveSuggestionQueries(storageName, [query]);
    } else {
        if (!queries.includes(query)) {
            if (queries.length >= MAX_LOCAL_QUERIES) {
                queries.shift();
            }
            queries.push(query);
        }
        saveSuggestionQueries(storageName, queries);
    }
};

function getQueriesFromLocalStorage(storageName, term) {
    var queries = getSuggestionQueries(storageName);
    if (queries !== null) {
        var matchedQueries = queries.map(function (query) {
            var regex = new RegExp(`^${term}`);
            var match = regex.exec(query);
            if (match) {
                return query.replace(match, `<b>${match}</b>`);
            }
            return null;
        });
        matchedQueries = matchedQueries.filter(function (value) { return value !== null });
        return matchedQueries.map(function (query) {
            return {
                'id-perfil': null,
                'id-topico': null,
                imagem: '',
                titulo: query,
                isQueryHistory: true
            };
        });
    }
    return [];
};


function removeDuplicatedQueries(queries) {
    var titles = [];
    var cleanQueries = [];
    for (var query of queries) {
        var text = query.titulo.replace(/<b>|<\/b>/g, '')
        if (!titles.includes(text)) {
            titles.push(text);
            cleanQueries.push(query);
        }
    }
    return cleanQueries;
};

module.exports = {
    getSuggestionQueries,
    saveSuggestionQueries,
    removeQueryFromLocalStorage,
    addQueryToLocalStorage,
    getQueriesFromLocalStorage,
    removeDuplicatedQueries,
    MAX_LOCAL_QUERIES
}
