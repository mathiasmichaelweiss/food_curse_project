function modal() {
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
}

module.exports = modal;