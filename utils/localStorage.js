var MAX_LOCAL_QUERIES = 5;

function saveSuggestionQueries(storageName, queries) {
    queries = JSON.stringify(queries).replace(/<\/?b>/g, '');
    window.localStorage.setItem(storageName, queries);
}

function getSuggestionQueries(storageName) {
    try {
        return JSON.parse(window.localStorage.getItem(storageName));
    } catch (ignored) {
        return [];
    }
}

function removeQueryFromLocalStorage(storageName, term) {
    delete term.isQueryHistory;
    var queries = getSuggestionQueries(storageName);
    var filteredQueries = queries.filter(function (query) {
        return JSON.stringify(query) !== JSON.stringify(term).replace(/<\/?b>/g, '');
    });
    saveSuggestionQueries(storageName, filteredQueries);
}

function addQueryToLocalStorage(storageName, query) {
    delete query.isQueryHistory;
    var queries = getSuggestionQueries(storageName);
    if (queries === null) {
        saveSuggestionQueries(storageName, [query]);
    } else {
        queries = queries.filter(function(element){
            return JSON.stringify(element) !== JSON.stringify(query).replace(/<\/?b>/g, '');
        })
        if(queries.length >= MAX_LOCAL_QUERIES){
            queries.shift();
        }
        queries.push(query);
        saveSuggestionQueries(storageName, queries);
    }
}

function getQueriesFromLocalStorage(storageName, term) {
    var queries = getSuggestionQueries(storageName);
    if (queries !== null) {
        var matchedQueries = queries.map(function (query) {
            query = JSON.stringify(query);
            var regex = new RegExp(`${term}`);
            var match = regex.exec(query);
            if (match) {
                query = query.replace(match, `<b>${match}</b>`);
                query = JSON.parse(query);
                query.isQueryHistory = true;
                return query;
            }
            return null;
        });
        matchedQueries = matchedQueries.filter(function (value) { return value !== null });
        return matchedQueries;
    }
    return [];
}


function removeDuplicatedQueries(queries) {
    var titles = [];
    var cleanQueries = [];
    for (var query of queries) {
        var isLocal = query.isQueryHistory;
        delete query.isQueryHistory;
        var text = JSON.stringify(query).replace(/<\/?b>/g, '')
        if (titles.indexOf(text) === -1) {
            titles.push(text);
            query.isQueryHistory = isLocal;
            cleanQueries.push(query);
        }
    }
    return cleanQueries;
}

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root['autoComplete/utils/localStorage'] = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return {
        getSuggestionQueries,
        saveSuggestionQueries,
        removeQueryFromLocalStorage,
        addQueryToLocalStorage,
        getQueriesFromLocalStorage,
        removeDuplicatedQueries,
        MAX_LOCAL_QUERIES
    };
}));
