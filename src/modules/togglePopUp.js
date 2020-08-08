const togglePopUp = () => {
    const body = document.body,
        popUpCall = document.querySelector('.popup-call'),
        popUpDiscount = document.querySelector('.popup-discount'),
        popUpCheck = document.querySelector('.popup-check'),
        popUpConsultation = document.querySelector('.popup-consultation');

    body.addEventListener('click', e => {
        const target = e.target;

        //открытие модального окна по кнопке "перезвоните"
        if (target.closest('.construct-btn.call-btn') && target.closest('.constructor')) {
            e.preventDefault();
            popUpDiscount.querySelector('form').classList.add('calc-form');
            popUpDiscount.style.cssText = 'display: block; opacity: 1;';
            popUpDiscount.classList.add('active-popup');
        //открытие модального окна по кнопке "узнать цену по скидке"
        } else if (target.closest('.discount-btn')) {
            e.preventDefault();
            popUpDiscount.querySelector('form').classList.remove('calc-form');
            popUpDiscount.style.cssText = 'display: block; opacity: 1;';
            popUpDiscount.classList.add('active-popup');
        //открытие окна по кнопке в калькуляторе
        } else if (target.closest('.call-btn')) {
            e.preventDefault();
            popUpCall.style.cssText = 'display: block; opacity: 1;';
            popUpCall.classList.add('active-popup');
        //открытие модального окна по кнопке "получить чек-лист"
        } else if (target.closest('.check-btn')) {
            popUpCheck.style.cssText = 'display: block; opacity: 1;';
            popUpCheck.classList.add('active-popup');
        //открытие модального окна по кнопке "получить консультацию"
        } else if (target.closest('.consultation-btn')) {
            e.preventDefault();
            popUpConsultation.style.cssText = 'display: block; opacity: 1;';
            popUpConsultation.classList.add('active-popup');
        //закрытие модального окна по крестику
        } else if (target.closest('.popup-close')) {
            target.closest('.active-popup').removeAttribute('style');
            target.closest('.active-popup').classList.remove('active-popup');
        //закрытие модального окна по подложке
        } else if (target.closest('.active-popup') && !target.closest('.popup-content')) {
            target.closest('.active-popup').removeAttribute('style');
            target.closest('.active-popup').classList.remove('active-popup');
        }
    });
};

export default togglePopUp;
