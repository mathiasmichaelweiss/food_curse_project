import {
    openModalContent,
    closeModalContent
} from './modal';

import {
    postData
} from '../services/services';

function forms(formSelector, modalContentTimerId) {
    // Forms 

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.gif',
        succes: 'Мы скоро с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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
        openModalContent('.modal', modalContentTimerId);

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
            closeModalContent('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(result => console.log(result));
}

export default forms;