'use strict';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {
    openModalContent
} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalContentTimerId = setTimeout(() => openModalContent('.modal', modalContentTimerId), 500000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-10-23');
    modal('[data-modal]', '.modal', modalContentTimerId);
    cards();
    calc();
    forms('form', modalContentTimerId);
    slider({
        contaier: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide'
    });
});