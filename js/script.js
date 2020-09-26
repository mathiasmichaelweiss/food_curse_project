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
        modalContent = document.querySelector('.modal');


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


    // Заменили на верхнюю с использованием функции
    /* modalCloseBtn.addEventListener('click', () => {
        modalContent.style.display = '';
        document.body.style.overflow = '';
    }); */

    modalContent.addEventListener('click', (e) => {
        if (e.target === modalContent || e.target.getAttribute('data-close') == '') {
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

    const modalContentTimerId = setTimeout(openModalContent, 500000);

    function showModalContentByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalContent();
            window.removeEventListener('scroll', showModalContentByScroll);
        }
    }

    window.addEventListener('scroll', showModalContentByScroll);

    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 71;
            this.changeToRUB();
        }
        changeToRUB() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');

            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            // После аругмента price, теперь мы используем оператор rest, который будет принимать в себя название класса div'a, для того что бы использовать классы из массива который нам пришел, мы перебираем его с помощью метода forEach, где каждый класс это аругмент className, после чего мы говорим функции перебора классов что мы добавляем в список классов className, т.е тот класс который пришел к нам из массива аругмента ...classes.
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const getResourse = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });


    // Forms 

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.gif',
        succes: 'Мы скоро с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST', // Каким образом отправляем?
            headers: {
                'Content-type': 'application/json'
            },
            body: data // Что именно отправляем?
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // показывает спинер
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            margin-top: 5 px;
            width: 25px;
            height: 25px;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); // сбор всех данных из формы

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.succes);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure); // действие в случае неудачи
                }).finally(() => {
                    form.reset(); // действие в любом случае
                });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModalContent();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModalContent();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(result => console.log(result));


    // Slider 

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    //Функция активности точек
    function activeDotStyle() {
        // Стиль при активности точки
        dots.forEach(dot => dot.style.opacity = '0.5'); // изначально стиль каждой точки 50% непрозрачности
        dots[slideIndex - 1].style.opacity = 1; // берем определенный индекс, который равен slideIndex в данный момент - 1, получаем индекс того слайда на котором находится пользователь и даем ему непрозрачность 100%.
    }

    //Функция изменения слайда на странице
    function changeSlide() {
        // Изменение номер слайда на странице
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`; // меняем значение отображаемое на странице при помощи textContent в случае если меньше 10 
        } else {
            current.textContent = slideIndex; // меняем значение отображаемое на странице при помощи textContent в случае если больше 10 
        }
    }

    // Проверка чисел > или < 10
    if (slides.length < 10) { // если цифра в счетчике меньше 10, то
        total.textContent = `0${slides.length}`; // перед этой цифрой записываться ноль в total - т.е в значение общего кол-ва слайдов
        current.textContent = `0${slideIndex}`; // перед этой цифрой записываться ноль в значение current - т.е в ту позицию на которой находится пользователь(номер данного слайда)
    } else { // в другом случае, если больше 10,
        total.textContent = slides.length; // общшее кол-во слайда не будет добавлять 0 перед числом
        current.textContent = slideIndex; // номер данного слайда не будет добавлять 0 перед числом
    }


    slidesField.style.width = 100 * slides.length + '%'; // Размер ширины блока со всеми слайдами
    slidesField.style.display = 'flex'; // Выстраивание всех слайдов по горизонтали
    slidesField.style.transition = '0.5s all'; // Плавное переключение слайдов

    slidesWrapper.style.overflow = 'hidden'; // скрытие лишних слайдов из видимости, скрывает те, что находятся за пределами wrapper

    // Устанавливаем всем слайдерам одинаковую ширину
    slides.forEach(slide => {
        slide.style.width = width;
    });

    //_________________________

    // Точки переключения
    // Создаем и стилизуем блок с точками
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    // помещаем контейнер для точек, в общую коробочку со всеми элементами слайдера
    slider.append(indicators);

    // Создаем кол-во точек равное кол-ву слайдов
    for (let i = 0; i < slides.length; i++) { // создает определенное кол-во точек ориентируясь на slides.lenght
        // создаем точки
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // Устанавливает каждой точке атрибут(т.е к какому слайду она будет относиться) и устанавливает нумерацию начиная с 1.
        // Стилизуем точки
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        // индикатор активности кнопки(стиль активности)
        if (i == 0) {
            dot.style.opacity = 1;
        }

        // помещаем точку в заранее созданный для неё контейнер
        indicators.append(dot);
        // помещаем все точки в массив 
        dots.push(dot); // массив можно использовать
    }

    // Далее переходим в обработчики событий

    //_________________________

    // Удаляющая числа функция

    function removeNumbers(str) {
        return +str.replace(/\D/g, '');
    }

    // Click на кнопку next
    next.addEventListener('click', () => {
        if (offset == removeNumbers(width) * (slides.length - 1)) { // если положение слайда = положению последнего слайда - 1
            // ВАЖНАЯ ЗАМЕТКА - МЫ ПОМЕНЯЛИ slice на replase, что бы удалить все 'НЕ ЧИСЛА'!!_________________
            offset = 0; // тогда положение должно переключиться на начало
        } else { // в другом случае
            offset += removeNumbers(width);
            // ВАЖНАЯ ЗАМЕТКА - МЫ ПОМЕНЯЛИ slice на replase, что бы удалить все 'НЕ ЧИСЛА'!!_________________
            // добавиться ширина еще одного слайда и картинка сместится дальше.
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // Отвечает за сдвиг слайдера в коробочке inner, translateX - на сколько будет сдвигаться элемент(аргумент в скобке-сторона,где отрицательное число значит влево,а положительное вправо)

        // Проверка для того, что бы правильно работало значение отображаемое в счетчике, при условии что он дошел до конца
        if (slideIndex == slides.length) { // если счетчик дошел до конца, то значение slideIndex при click будет = 1 и цифра на сайте заменится единицой.
            slideIndex = 1;
        } else { // в другом случае, к цифре добавится +1
            slideIndex++;
        }

        // Изменение номер слайда на странице
        changeSlide();
        // стиль при активности точек
        activeDotStyle();
    });

    // Click на кнопку prev
    prev.addEventListener('click', () => {
        if (offset == 0) { // Если положением = 0 и мы двигаем назад
            offset = removeNumbers(width) * (slides.length - 1);
            // ВАЖНАЯ ЗАМЕТКА - МЫ ПОМЕНЯЛИ slice на replase, что бы удалить все 'НЕ ЧИСЛА'!!_________________
            // тогда положение станет равно последнему слайду и нажатие переключит его на последний слайд
        } else { // в другом случае 
            offset -= removeNumbers(width);
            // ВАЖНАЯ ЗАМЕТКА - МЫ ПОМЕНЯЛИ slice на replase, что бы удалить все 'НЕ ЧИСЛА'!!_________________
            // добавится ширина еще одного слайда и картинка сместится дальше
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // Отвечает за сдвиг слайдера в коробочке inner, translateX - на сколько будет сдвигаться элемент(аргумент в скобке-сторона,где отрицательное число значит влево,а положительное вправо)

        // Проверка для того, что бы правильно работало значение отображаемое в счетчике, при условии что он дошел до конца
        if (slideIndex == 1) { // когда мы находимся на первом слайде, при клике на кнопку предыдущего слайда
            slideIndex = slides.length; // будет смещение в самый конец слайдов
        } else { // в другом случае, от цифры будет вычитаться -1
            slideIndex--;
        }

        // Изменение номер слайда на странице
        changeSlide();
        // стиль при активности точек
        activeDotStyle();
    });

    // Функционал точек(переключение слайдов, изменение порядкового номера при нажатии на точку)    
    dots.forEach(dot => {
        // навешиваем на каждую точку обработчик события click
        // Атрибут собитя нужен для того что бы мы могли кликать на кнопки, обхект события это - кнопка с атрибутом который был добавлен в начале.
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; // кликнули на 2 позицию slideIndex будет = 2, соответственно цифра поменяется в счетчике

            // смещение слайда
            offset = removeNumbers(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            // ВАЖНАЯ ЗАМЕТКА - МЫ ПОМЕНЯЛИ slice на replase, что бы удалить все 'НЕ ЧИСЛА'!!_________________
            // Изменение номер слайда на странице
            changeSlide();
            // Стиль при активности точки
            activeDotStyle();
        });
    });

    // Calc

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        } // Проверка, если нет хотя бы одной данной из списка, функция запускать не будет.

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // Получаем все эелементы внутри этого родителя.

        // Отслеживаем клики по родительскому элементу

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    // для активности
                    ratio = +e.target.getAttribute('data-ratio');
                    // означает, что если мы кликнули по диву, функция вытащит значение из data-атрибута.
                    // Запоминаем значения в localStorage
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    // для пола, который не имеет дата атрибут
                    sex = e.target.getAttribute('id');
                    // Запоминаем значения в localStorage
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                // Убераем класс активности у всех элементов и назначаем только тому на который кликаем
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });

    }


    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            // проверка на правильность введенных данных пользователем

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            // проверят что это, возраст или вес или рост при помощи switchCase
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            } // теперь функция будет ссылкаться на уникальный индификатор и записывать данные в нужную переменную
            calcTotal();
        });

    }


    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});