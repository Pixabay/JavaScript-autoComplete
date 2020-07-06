function escapeSpecialChars(string) {
    console.log(string)
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');;
}

function clearString(string) {
    return string.replace(/<\/?b>/g, '');

}


(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root['autoComplete/utils/localStorage'] = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    return {
        escapeSpecialChars,
        clearString
    };
}));