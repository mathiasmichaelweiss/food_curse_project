'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        modal = require('./modules/modal'),
        cards = require('./modules/cards'),
        calc = require('./modules/calc'),
        forms = require('./modules/forms'),
        slider = require('./modules/slider');

    tabs();
    timer();
    modal();
    cards();
    calc();
    forms();
    slider();
});  