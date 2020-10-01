function timer(id, deadline) {

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

    setClock(id, deadline);
}

export default timer;