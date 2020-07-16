/* window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none'; // скрываем каждый контент таба при помощи стиля
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // скрываем класс активности каждого таба
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block'; // добавляем определенный [i] контент при помощи стиля
        tabs[i].classList.add('tabheader__item_active'); // добавляем к определенному [i] контенту класс активности
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });


}); */

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




});