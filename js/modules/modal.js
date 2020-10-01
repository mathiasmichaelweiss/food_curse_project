    // Так как одно и тоже действие будет повторяется, обязательно выводим его в функцию
    function openModalContent(modalSelector, modalContentTimerId) {
        const modalContent = document.querySelector(modalSelector);
        modalContent.style.display = 'block';
        document.body.style.overflow = 'hidden';

        console.log(modalContentTimerId);
        if (modalContentTimerId) {
            clearInterval(modalContentTimerId);
        }
    }

    function closeModalContent(modalSelector) {
        const modalContent = document.querySelector(modalSelector);
        modalContent.style.display = '';
        document.body.style.overflow = '';
    }

    function modal(triggerSelector, modalSelector, modalContentTimerId) {
        // Modal

        const modalTrigger = document.querySelectorAll(triggerSelector),
            modalContent = document.querySelector(modalSelector);

        // 1) перебираем псевдомассив modalTrigger с помощью forEach
        modalTrigger.forEach(btn => {
            btn.addEventListener('click', () => openModalContent(modalSelector, modalContentTimerId));
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
                closeModalContent(modalSelector);

            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') { // при моём способе не нужно использовать contains
                closeModalContent(modalSelector);
            }
        });

        function showModalContentByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModalContent(modalSelector, modalContentTimerId);
                window.removeEventListener('scroll', showModalContentByScroll);
            }
        }

        window.addEventListener('scroll', showModalContentByScroll);
    }

    export default modal;
    export {
        openModalContent,
        closeModalContent
    };