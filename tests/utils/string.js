var _string = require('../../utils/string'),
    escapeSpecialChars = _string.escapeSpecialChars,
    clearString = _string.clearString;

describe('String related functions', function () {
    it('should escape with \ all special chars',function(){
        // GIVE
        var string = "[something]*/?^+()|{}-";

        // WHEN
        string = escapeSpecialChars(string);

        // THEN
        expect(string).toEqual('\\[something\\]\\*\\/\\?\\^\\+\\(\\)\\|\\{\\}\\-');
    });

    it('should remove bold mark from string',function(){
        // GIVEN
        var string = '<b>test</b>ing';

        // WHEN
        string = clearString(string);

        // THEN
        expect(string).toEqual('testing');
    })
})
