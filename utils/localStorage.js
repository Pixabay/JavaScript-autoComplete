function removeQueryFromLocalStorage(storageName, term) {
    var queries = JSON.parse(window.localStorage.getItem(storageName));
    var filtredQueries = queries.filter(function(query) {
        return query !== term;
    });
    window.localStorage.setItem(storageName, JSON.stringify(filtredQueries));
};

function addQueryToLocalStorage(storageName, query) {
    if (window.localStorage.getItem(storageName) === null) {
        window.localStorage.setItem(storageName, JSON.stringify([query]));
    } else {
        var queries = JSON.parse(window.localStorage.getItem(storageName));
        if (!queries.includes(query)) {
            if (queries.length >= 5) {
                queries.shift();
            }
            queries.push(query);
        }
        window.localStorage.setItem(storageName, JSON.stringify(queries));
    }
};

function getQueriesFromLocalStorage(storageName, term) {
    if (window.localStorage.getItem(storageName) !== null) {
        var queries = JSON.parse(window.localStorage.getItem(storageName));
        var mathcedQueries = queries.map(function (query) {
            var regex = new RegExp(`^${term}`);
            var match = regex.exec(query);
            if (match) {
                return query.replace(match, `<b>${match}</b>`);
            }
            return null;
        });
        mathcedQueries = mathcedQueries.filter(function(value){ value !== null});
        return mathcedQueries.map(function (query) {
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
    removeQueryFromLocalStorage,
    addQueryToLocalStorage,
    getQueriesFromLocalStorage,
    removeDuplicatedQueries
}
