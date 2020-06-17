var _localStorage = require('../../utils/localStorage'),
    removeQueryFromLocalStorage = _localStorage.removeQueryFromLocalStorage,
    addQueryToLocalStorage = _localStorage.addQueryToLocalStorage,
    getQueriesFromLocalStorage = _localStorage.getQueriesFromLocalStorage,
    getSuggestionQueries = _localStorage.getSuggestionQueries,
    saveSuggestionQueries = _localStorage.saveSuggestionQueries,
    removeDuplicatedQueries = _localStorage.removeDuplicatedQueries,
    MAX_LOCAL_QUERIES = _localStorage.MAX_LOCAL_QUERIES;


describe('Local storage functions', function () {
    var testStorageName = 'testStorage';

    beforeEach(function () {
        window.localStorage.removeItem(testStorageName);
    });

    it('should remove queries from localStorage', function () {
        // GIVEN
        window.localStorage.setItem(testStorageName, JSON.stringify(['any', 'target', 'any']));

        // WHEN
        removeQueryFromLocalStorage(testStorageName, 'target');

        // THEN
        var queries = getSuggestionQueries(testStorageName);
        expect(queries).toEqual(['any', 'any']);
    });

    it('should create localStorage if not exists', function () {
        // WHEN
        addQueryToLocalStorage(testStorageName, 'target');

        // THEN
        var queries = getSuggestionQueries(testStorageName);
        expect(queries).not.toBeNull();
    });

    it('should not add query if already is in localStorage', function () {
        // GIVEN 
        addQueryToLocalStorage(testStorageName, 'target');

        // WHEN 
        addQueryToLocalStorage(testStorageName, 'target');

        // THEN
        var queries = getSuggestionQueries(testStorageName);
        expect(queries).toEqual(['target']);
    });

    it('should delete last query if localStorage full', function () {
        // GIVEN
        addQueryToLocalStorage(testStorageName, 'last');
        for (var i = 0; i < MAX_LOCAL_QUERIES - 1; i++) {
            addQueryToLocalStorage(testStorageName, i);
        }

        // WHEN
        addQueryToLocalStorage(testStorageName, i);

        // THEN
        var queries = getSuggestionQueries(testStorageName);
        expect(queries).toEqual(expect.not.arrayContaining(['last']));
    });

    it('should add query if localStorage exist and not full', function () {
        // GIVEN 
        addQueryToLocalStorage(testStorageName, 'first');

        // WHEN
        addQueryToLocalStorage(testStorageName, 'second');

        // THEN
        var queries = getSuggestionQueries(testStorageName);
        expect(queries).toEqual(['first', 'second']);
    });

    it('should returned formated queries', function () {
        // GIVEN
        addQueryToLocalStorage(testStorageName, 'first');
        addQueryToLocalStorage(testStorageName, 'second');

        // WHEN
        var queries = getQueriesFromLocalStorage(testStorageName, '');

        // THEN
        expect(queries).toMatchObject([
            {
                'id-perfil': null,
                'id-topico': null,
                imagem: '',
                titulo: '<b></b>first',
                isQueryHistory: true
            },
            {
                'id-perfil': null,
                'id-topico': null,
                imagem: '',
                titulo: '<b></b>second',
                isQueryHistory: true
            }
        ]);
    });

    it('should return matched queries with bold propety in matched characters', function () {
        // GIVEN 
        addQueryToLocalStorage(testStorageName, 'testing');

        // WHEN 
        var queries = getQueriesFromLocalStorage(testStorageName, 'test');

        // THEN
        expect(queries).toMatchObject([
            {
                'id-perfil': null,
                'id-topico': null,
                imagem: '',
                titulo: '<b>test</b>ing',
                isQueryHistory: true
            }
        ]);
    });

    it('should remove queries with same title', function () {
        // GIVEN
        var queries = [{ titulo: 'equal' }, { titulo: 'any' }, { titulo: 'equal' }, { titulo: 'diff' }];

        // WHEN
        removeDuplicatedQueries(queries);

        // THEN
        expect(queries).toMatchObject([{ titulo: 'equal' },
        { titulo: 'any' },
        { titulo: 'equal' },
        { titulo: 'diff' }]);
    });
})