function slider({
    contaier,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {
    // Slider 

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(contaier),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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
}

export default slider;