var autoComplete = require('../auto-complete');
var JSDOM = require('jsdom').JSDOM

function removeSpaces(text) {
    return text.trim().replace(/\s/g, '');
}


describe('Autocomplete Instance', function () {
    jest.useFakeTimers();
    jest.spyOn(window, 'getComputedStyle').mockImplementation(function () {
        return { 'position': 'fixed' }
    });

    beforeEach(function () {
        document.body.innerHTML = `
        <fieldset>
            <div class="input"><input type="search" class="Test">
            </div>
        </fieldset>`.trim();
    })

    it('should add class "autocomplete-suggestion"', function () {
        // WHEN
        autoComplete({
            selector: '.Test'
        });

        // THEN
        expect(removeSpaces(document.body.innerHTML)).toBe(removeSpaces(`
        <fieldset>
            <div class="input"><input type="search" class="Test" autocomplete="off">
                <div class="autocomplete-suggestions"></div>
           </div>
        </fieldset>
        `));
    });

    it('should set browser default autocomplete off', function () {
        // GIVEN
        autoComplete({
            selector: '.Test'
        });
        var inputBox = document.querySelector('.Test');

        // THEN
        expect(inputBox.getAttribute('autocomplete')).toBe('off')

    });

    it('should show all local storage queries when queryHistoryStorageName is not null input is empty', function () {
        // GIVEN
        autoComplete({
            selector: '.Test',
            source: function (a, callback) { callback([]) },
            queryHistoryStorageName: 'localTest'
        })
        window.localStorage.setItem('localTest', JSON.stringify(['1', '2']))
        var clickEvent = new Event('click');
        var inputBox = document.querySelector('.Test');
        var suggestions = document.querySelector('.autocomplete-suggestions');

        // WHEN
        inputBox.dispatchEvent(clickEvent);

        // THEN
        expect(removeSpaces(suggestions.innerHTML)).toBe(removeSpaces(`
        <div class="autocomplete-suggestion" data-val="1"><b></b>1<b></b></div>
        <div class="autocomplete-suggestion" data-val="2"><b></b>2<b></b></div>
        `));
    });

    it('should not show local storage queries when queryHistoryStorageName is null and input is empty', function () {
        // GIVEN
        autoComplete({
            selector: '.Test',
            source: function (a, callback) { callback([]) },

        })
        window.localStorage.setItem('localTest', JSON.stringify(['1', '2']))
        var clickEvent = new MouseEvent('click');
        var inputBox = document.querySelector('.Test');
        var suggestions = document.querySelector('.autocomplete-suggestions');

        // WHEN
        inputBox.dispatchEvent(clickEvent);

        // THEN
        expect(suggestions.innerHTML).toBe("");
    });

    it('should show local queries suggestion while value of selector not reach minimum char if queryHistoryStorageName is not null', function () {
        // GIVEN
        autoComplete({
            delay: 0,
            selector: '.Test',
            source: function (a, callback) {
                callback(['suggestion 1', 'suggestion 2']);
            },
            queryHistoryStorageName: 'localTest',
            minChars: 3
        });
        window.localStorage.setItem('localTest', JSON.stringify(['suggestion local 1', 'suggestion local 2']))
        var keyPressEvent = new KeyboardEvent('keyup');
        var inputBox = document.querySelector('.Test');
        inputBox.value = 'su';
        var suggestions = document.querySelector('.autocomplete-suggestions')

        // WHEN
        inputBox.dispatchEvent(keyPressEvent);
        jest.advanceTimersByTime(1);

        // THEN
        expect(removeSpaces(suggestions.innerHTML)).toBe(removeSpaces(`
        <div class="autocomplete-suggestion" data-val="<b>su</b>ggestion local 1">
            <b><b>su</b></b>ggestion local 1
        </div>
        <div class="autocomplete-suggestion" data-val="<b>su</b>ggestion local 2">
            <b><b>su</b></b>ggestion local 2
        </div>
        `));
    });

    it('should show nothing while value of selector not reach minimum char and queryHistoryStorageName is not null', function () {
        // GIVEN
        autoComplete({
            delay: 0,
            selector: '.Test',
            source: function (a, callback) {
                callback(['suggestion 1', 'suggestion 2']);
            },
            minChars: 3
        });
        window.localStorage.setItem('localTest', JSON.stringify(['suggestion local 1', 'suggestion local 2']))
        var keyPressEvent = new KeyboardEvent('keyup');
        var inputBox = document.querySelector('.Test');
        inputBox.value = 'su';
        var suggestions = document.querySelector('.autocomplete-suggestions')

        // WHEN
        inputBox.dispatchEvent(keyPressEvent);
        jest.advanceTimersByTime(1);

        // THEN
        expect(removeSpaces(suggestions.innerHTML)).toBe('');
    })

    it('should show suggestions when value of selector reach minimum char', function () {
        // GIVEN
        autoComplete({
            delay: 0,
            selector: '.Test',
            source: function (a, callback) {
                callback(['suggestion 1', 'suggestion 2']);
            },
            minChars: 3
        });
        var keyPressEvent = new KeyboardEvent('keyup');
        var inputBox = document.querySelector('.Test');
        inputBox.value = 'sugg';
        var suggestions = document.querySelector('.autocomplete-suggestions')

        // WHEN
        inputBox.dispatchEvent(keyPressEvent);
        jest.advanceTimersByTime(1);

        // THEN
        expect(removeSpaces(suggestions.innerHTML)).toBe(removeSpaces(`
        <div class="autocomplete-suggestion" data-val="suggestion 1"><b>sugg</b>estion 1</div>
        <div class="autocomplete-suggestion" data-val="suggestion 2"><b>sugg</b>estion 2</div>
        `));

    });

    it('should merge local suggestions with the source suggestions if queryHistoryStorageName is not null', function () {
        // GIVEN
        autoComplete({
            delay: 0,
            selector: '.Test',
            source: function (a, callback) {
                callback(['suggestion 1', 'suggestion 2']);
            },
            queryHistoryStorageName: 'localTest',
            minChars: 3
        });
        window.localStorage.setItem('localTest', JSON.stringify(['suggestion local 1', 'suggestion local 2']))
        var keyPressEvent = new KeyboardEvent('keyup');
        var inputBox = document.querySelector('.Test');
        inputBox.value = 'sugg';
        var suggestions = document.querySelector('.autocomplete-suggestions')

        // WHEN
        inputBox.dispatchEvent(keyPressEvent);
        jest.advanceTimersByTime(1);

        // THEN
        expect(removeSpaces(suggestions.innerHTML)).toBe(removeSpaces(`
        <div class="autocomplete-suggestion" data-val="<b>sugg</b>estion local 1">
            <b><b>sugg</b></b>estion local 1
        </div>
        <div class="autocomplete-suggestion" data-val="<b>sugg</b>estion local 2">
            <b><b>sugg</b></b>estion local 2
        </div>
        <div class="autocomplete-suggestion" data-val="suggestion 1">
            <b>sugg</b>estion 1
        </div>
        <div class="autocomplete-suggestion" data-val="suggestion 2">
            <b>sugg</b>estion 2
        </div>
        `));
    })

    it('should set "selected" in class name when arrow down key is pressed', function () {
        // GIVEN
        autoComplete({
            selector: '.Test',
            source: function (a, callback) { callback([]) },
            queryHistoryStorageName: 'localTest'
        });
        window.event = 'true';
        window.localStorage.setItem('localTest', JSON.stringify(['1', '2']))
        var clickEvent = new Event('click');
        var arrowEvent = new KeyboardEvent('keydown', { keyCode: 40 });
        var inputBox = document.querySelector('.Test');
        inputBox.dispatchEvent(clickEvent);

        // WHEN
        inputBox.dispatchEvent(arrowEvent);

        // THEN
        var selectedSuggestion = document.querySelector('.autocomplete-suggestion.selected');
        expect(selectedSuggestion).not.toBeNull()
    });

    it('should set display "none" and reset input value to last value when esc key is pressed', function () {
        // GIVEN
        autoComplete({
            selector: '.Test',
            source: function (a, callback) { callback([]) },
            queryHistoryStorageName: 'localTest'
        });
        window.event = 'true';
        window.localStorage.setItem('localTest', JSON.stringify(['1', '2']))
        var clickEvent = new Event('click');
        var escEvent = new KeyboardEvent('keydown', { keyCode: 27 });
        var inputBox = document.querySelector('.Test');
        var suggestions = document.querySelector('.autocomplete-suggestions');
        inputBox.last_val = 'any';
        inputBox.value = 'discarted'
        inputBox.dispatchEvent(clickEvent);
        suggestions.style.display = 'block';

        // WHEN

        inputBox.dispatchEvent(escEvent);

        // THEN
        expect(suggestions.style.display).toBe('none');
        expect(inputBox.value).toBe('any');
    });

    it('should call o.onSelect function with the value of selected suggestion when enter key is pressed', function () {
        // GIVEN
        var selectFunction = jest.fn();
        autoComplete({
            delay: 0,
            selector: '.Test',
            source: function (a, callback) {
                callback(['suggestion 1', 'suggestion 2']);
            },
            onSelect: selectFunction
        });
        window.event = 'true';
        var keyPressEvent = new KeyboardEvent('keyup', { keyCode: 1 });
        var inputBox = document.querySelector('.Test');
        inputBox.value = 'suggw';
        var suggestions = document.querySelector('.autocomplete-suggestions')
        inputBox.dispatchEvent(keyPressEvent);
        jest.advanceTimersByTime(1);
        var arrowEvent = new KeyboardEvent('keydown', { keyCode: 40 });
        var enterEvent = new KeyboardEvent('keydown', { keyCode: 13 });
        inputBox.dispatchEvent(arrowEvent);

        // WHEN
        inputBox.dispatchEvent(enterEvent);

        // THEN
        expect(selectFunction).toHaveBeenCalled();
    });

})