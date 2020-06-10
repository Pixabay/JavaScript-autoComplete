const removeQueryFromLocalStorage = (storageName, term) => {
    const queries = JSON.parse(window.localStorage.getItem(storageName));
    const filtredQueries = queries.filter((query) => {
        if (query === term) {
            return false;
        }
        return true;
    });
    window.localStorage.setItem(storageName, JSON.stringify(filtredQueries));
};

const addQueryToLocalStorage = (storageName, query) => {
    if (window.localStorage.getItem(storageName) === null) {
        window.localStorage.setItem(storageName, JSON.stringify([query]));
    } else {
        const queries = JSON.parse(window.localStorage.getItem(storageName));
        if (!queries.includes(query)) {
            if (queries.length >= 5) {
                queries.shift();
            }
            queries.push(query);
        }
        window.localStorage.setItem(storageName, JSON.stringify(queries));
    }
};

const getQueriesFromLocalStorage = (storageName, term) => {
    if (window.localStorage.getItem(storageName) !== null) {
        const queries = JSON.parse(window.localStorage.getItem(storageName));
        let mathcedQueries = queries.map((query) => {
            const regex = new RegExp(`^${term}`);
            const match = regex.exec(query);
            if (match) {
                return query.replace(match, `<b>${match}</b>`);
            }
            return null;
        });
        mathcedQueries = mathcedQueries.filter((value) => value !== null);
        return mathcedQueries.map((query) => {
            return {
                'id-perfil': null,
                'id-topico': null,
                'imagem': "",
                'titulo': query,
                'isQueryHistory': true
            };
        });
    }
    return [];
};


const removeDuplicatedQueries = (queries) => {
    const titles = [];
    const cleanQueries = [];
    for (let query of queries) {
        const text = query.titulo.replace(/<b>|<\/b>/g, '')
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