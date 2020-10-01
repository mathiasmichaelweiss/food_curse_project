import {
    getResourse
} from '../services/services';

function cards() {
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

}

export default cards;