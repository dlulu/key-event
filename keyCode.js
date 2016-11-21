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
    'N.': 110,
    '/': 191,
    '=': 187,
    '-': 189,
    '[': 219,
    ']': 221,
    'N+': 107,
    'N-': 109,
    'N*': 106,
    'N/': 111,

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

var getKeysFromSequence = function (sequence) {
    var reg = /([^\+]+)|([^\+]+\+\+)|([^\+]+\+[^\+]+)+|([^\+]+\+[^\+]+)+\+/g;
    return sequence.match(reg).map(function (item) {
        return item.toLowerCase();
    });
};

var KE = function (elemOrSelector) {
    var elem = typeof elemOrSelector === 'string'
        ? document.querySelector(elemOrSelector)
        : elemOrSelector;
    KE.elem = elem;
    return KE;
};


KE.register = function (sequence, callback) {
    var seq = getKeysFromSequence(sequence);
    var triggered = {};
    this.elem.addEventListener('keydown', function (event) {
        var kc = event.keyCode;
        var i = 0, len = seq.length;
        for (i = 0; i < len; i++) {
            if (keyCodes.hasOwnProperty(seq[i]) && keyCodes[seq[i]] === kc) {
                triggered[seq[i]] = true;
                for (j = 0; j < len; j++) {
                    if (!triggered[seq[j]]) {
                        return;
                    }
                }
                if (callback instanceof Function) {
                    callback(event);
                }
            }
        }
    });
    this.elem.addEventListener('keyup', function (event) {
        var kc = event.keyCode;
        var i = 0, len = seq.length;
        for (i = 0; i < len; i++) {
            if (keyCodes.hasOwnProperty(seq[i]) && keyCodes[seq[i]] === kc) {
                triggered[seq[i]] = false;
            }
        }
    });
};
