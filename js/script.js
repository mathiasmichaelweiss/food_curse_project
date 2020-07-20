'use strict';

// Tabs
window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none'; // скрываем контент вкладки 
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // Удаляем внутри класслиста класс активности кнопки
        });
    }

    function showTabContent(i = 0) { // i - определенный таб (i = 0, значит что если не выбрано то по умолчанию 0)
        tabsContent[i].style.display = 'block'; // возвращаем определенный контент
        tabs[i].classList.add('tabheader__item_active'); // возвращаем определенной ссылке меню класс актив
    }

    hideTabContent();
    showTabContent();

    /* Сейчас при помощи делегирования событий я сделаю событие клика на родителя меню, при помощи event.target где
    event это каждое событие клика, а таргет это определенная цель на которую кликают внутри блока
    с этими целями */

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; // создаем переменную что бы постоянно не писать event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => { // item - каждый элемент i порядковый номер элемента
                if (target == item) { // если элемент который кликнули == одному из перебираемых элементов - то...
                    hideTabContent(); // то выполнится функция и скроются все элементы
                    showTabContent(i); // то выполнится функция и покажется элемент по которому кликнули
                }
            });
        }
    });

    /* target.classList.contains = classList - обращается ко всем классам элемента, в нашем случае ко всем классам 
    того элемента на который производится клик, contains - проверяет если ли данный класс у этого элемента, и если 
    он будет if(target &&(и) target.classList.contains('tabheader__item')), тогда выполнится дейтствие которое мы 
    зададим. Необходимо что бы при клике на объект определился номер элемента и этот номер элемента 
    использовался в функции showTabContent*/

    // Timer 

    const deadline = '2020-08-20';

    // Функция рассчитывающая разницу между сейчас и дедлайном(результат отоброжаемый на странице)

    function getTimeRemaining(endtime) { // разница между сейчас и дедлайном, аргумент - дедлайн
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);
        // операции рассчитывающие оставшееся время до дедлайна
        // они существуют только внутри функции, поэтому возвращаем их ввиде объекта
        return {
            'total': t, // используется для завершения таймера, когда t будет равно отрицательному числу
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    // функция помошник - которая добавляет 0 перед числами меньше 10
    function getZero(num) {
        // Если число больше или равно 0 и меньше 10, мы добавим перед ним цифру 0
        if (num >= 0 && num < 10) {
            return `0${num}`;
            // Если не произойдет это условие то оставим как есть
        } else {
            return num;
        }
    }

    // Функция устонавливающая таймер на страницу

    function setClock(selector, endtime) { // аргументы: - главный объект куда устанавл. время и дедлайн
        // 1) получаем все элементы со страницы
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            // запускаем функцию updateClock каждую секунду, что бы менялось время на странице
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); // убираем мигание верстки

        // 2) Внутри этой функции, функция обновляющая тамер каждую секунду

        function updateClock() {
            // 1) рассчет времени на момент - сейчас
            const t = getTimeRemaining(endtime);
            // 2) отображаем данные на страницу 
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // 3) Остановить таймер по завершению дедлайна
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalContent = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');



    // Так как одно и тоже действие будет повторяется, обязательно выводим его в функцию
    function openModalContent() {
        modalContent.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalContentTimerId);
    }

    function closeModalContent() {
        modalContent.style.display = '';
        document.body.style.overflow = '';
    }

    // 1) перебираем псевдомассив modalTrigger с помощью forEach
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModalContent);
    });

    modalCloseBtn.addEventListener('click', closeModalContent); // теперь просто вписываем закрывающую функцию

    // Заменили на верхнюю с использованием функции
    /* modalCloseBtn.addEventListener('click', () => {
        modalContent.style.display = '';
        document.body.style.overflow = '';
    }); */

    modalContent.addEventListener('click', (e) => {
        if (e.target === modalContent) {
            /* modalContent.style.display = '';
            document.body.style.overflow = ''; */ // так же как и выше, вызываем
            // а не вписываем закрывающую функцию
            closeModalContent();

        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') { // при моём способе не нужно использовать contains
            closeModalContent();
        }
    });

    const modalContentTimerId = setTimeout(openModalContent, 3000);

    function showModalContentByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalContent();
            window.removeEventListener('scroll', showModalContentByScroll);
        }
    }

    window.addEventListener('scroll', showModalContentByScroll);
});