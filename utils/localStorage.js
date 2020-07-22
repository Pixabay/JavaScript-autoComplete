(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./string'));
    } else {
        root['autoComplete/utils/localStorage'] = factory(root['autoComplete/utils/string']);
    }
}(typeof self !== 'undefined' ? self : this, function (_string) {
    var escapeSpecialChars = _string.escapeSpecialChars,
        removeBoldElement = _string.removeBoldElement;
    var MAX_LOCAL_QUERIES = 5;

    function saveSuggestionQueries(storageName, queries) {
        queries = removeBoldElement(JSON.stringify(queries));
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
            return JSON.stringify(query) !== removeBoldElement(JSON.stringify(term));
        });
        saveSuggestionQueries(storageName, filteredQueries);
    }

    function addQueryToLocalStorage(storageName, query) {
        delete query.isQueryHistory;
        var queries = getSuggestionQueries(storageName);
        if (queries === null) {
            saveSuggestionQueries(storageName, [query]);
        } else {
            queries = queries.filter(function (element) {
                return JSON.stringify(element) !== removeBoldElement(JSON.stringify(query));
            })
            if (queries.length >= MAX_LOCAL_QUERIES) {
                queries.shift();
            }
            queries.push(query);
            saveSuggestionQueries(storageName, queries);
        }
    }

    function getQueriesFromLocalStorage(storageName, term) {
        var queries = getSuggestionQueries(storageName);
        if (queries !== null) {
            term = escapeSpecialChars(term);
            var matchedQueries = queries.map(function (query) {
                query = JSON.stringify(query);
                var regex = new RegExp(term);
                var match = regex.exec(query);
                if (match !== null) {
                    if (term.length){
                        query = query.replace(match[0], '<b>'.concat(match[0],'</b>'));
                    }
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
        for (var i=0;i<queries.length; i++) {
            var isLocal = queries[i].isQueryHistory;
            delete queries[i].isQueryHistory;
            var text = removeBoldElement(JSON.stringify(queries[i]))
            if (titles.indexOf(text) === -1) {
                titles.push(text);
                queries[i].isQueryHistory = isLocal;
                cleanQueries.push(queries[i]);
            }
        }
        return cleanQueries;
    }
    return {
        getSuggestionQueries: getSuggestionQueries,
        saveSuggestionQueries: saveSuggestionQueries,
        removeQueryFromLocalStorage: removeQueryFromLocalStorage,
        addQueryToLocalStorage: addQueryToLocalStorage,
        getQueriesFromLocalStorage: getQueriesFromLocalStorage,
        removeDuplicatedQueries: removeDuplicatedQueries,
        MAX_LOCAL_QUERIES: MAX_LOCAL_QUERIES
    };
}));
