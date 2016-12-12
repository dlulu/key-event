(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === 'object' && typeof module === 'object') {
		module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
		define([], factory);
    } else if (typeof exports === 'object') {
		exports['KE'] = factory;
    } else if (root.jQuery) {
        $.fn.extend({
            ke: function () {
                return factory(this[0]);
            }
        });
    } else {
		root['KE'] = factory;
    }
})(this, (function keyCombination() {
    // define all keys and their key codes
    var keyCodes = {
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,

        esc: 27,
        enter: 13,
        shift: 16,
        ctrl: 17,
        alt: 18,
        tab: 9,
        backspace: 8,
        arrowleft: 37,
        arrowup: 38,
        arrowright: 39,
        arrowdown: 40,

        capslock: 20,
        numlock: 144,
        scrolllock: 145,
        pause: 19,

        insert: 45,
        delete: 46,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,

        '`': 192,
        '\\': 220,
        ';': 186,
        '\'': 222,
        ',': 188,
        '.': 190,
        '/': 191,
        '=': 187,
        '-': 189,
        '[': 219,
        ']': 221,
        NUM_DOT: 110,
        NUM_ADD: 107,
        N_MINUS: 109,
        NUM_TIMES: 106,
        NUM_DIVIDED: 111,

        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,

        N0: 96,
        N1: 97,
        N2: 98,
        N3: 99,
        N4: 100,
        N5: 101,
        N6: 102,
        N7: 103,
        N8: 104,
        N9: 105,

        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90,
        space: 32
    };

    /**
     * @description        Detecting if keys registered are in keyCodes
     * @param {Array} keys Keys registered to be detect
     * @return {Boolean}   Is keys all in keyCodes
     */
    var isKeysExist = function (keys) {
        var i = 0, len = keys.length;
        for (i = 0; i < len; i++) {
            if (!keyCodes.hasOwnProperty(keys[i])) {
                throw keys[i] + ' is not a valid key';
            }
        }
        return true;
    };

    /**
     * @description             Get registered keys from string or array.
     * @param {Object} sequence Registered keys' string or array.
     * @return {Array}          Get registered keys.
     */
    var getKeysFromSequence = function (sequence) {
        if (sequence instanceof Array) {
            if (isKeysExist(sequence)) {
                return sequence;
            }
        }
        return sequence.split(/\+/);
    };

    /**
     * @description      Detect if two arrays are the same.
     * @param {Array} a1 Array 1.
     * @param {Array} a2 Array 2.
     * @return {Boolean}
     */
    var isEqual = function (a1, a2) {
        var i = 0, len1 = a1.length, len2 = a2.length;
        if (len1 !== len2) {
            return false;
        }
        for (i = 0; i < len1; i++) {
            if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    };

    var KE = function (elemOrSelector) {
        var elem = typeof elemOrSelector === 'string'
            ? document.querySelector(elemOrSelector)
            : elemOrSelector;
        KE.elem = elem;
        return KE;
    };

    // All registered keys combination quene.
    KE.Quene = [];

    /**
     * @description               Register key combination and it's callback.
     * @param {Object}   sequence Register keys string or array.
     * @param {Function} callback Callback function when combination keydown event triggered.
     * @return {Object}           Return itself to call it's function chaining
     */
    KE.register = function (sequence, callback) {
        this.Quene.push({
            seq: typeof sequence === 'string'
                ? getKeysFromSequence(sequence)
                : sequence,
            callback: callback
        });
        return KE;
    };

    /**
     * @description Trigger keydown and keyup events when registered complete.
     */
    KE.trigger = function () {
        var record = [];
        KE.elem.addEventListener('keydown', function (event) {
            event.preventDefault();
            if (record.indexOf(event.keyCode) === -1) {
                record.push(event.keyCode);
            }
            KE.Quene.forEach(function (quene) {
                var seq = quene.seq.map(function (q) {
                    return keyCodes[q];
                });
                if (isEqual(record, seq)) {
                    quene.callback.call(event);
                }
            });
        });
        KE.elem.addEventListener('keyup', function (event) {
            record = record.filter(function (key) {
                return key !== event.keyCode;
            });
        });
    };

    return KE;
})());
