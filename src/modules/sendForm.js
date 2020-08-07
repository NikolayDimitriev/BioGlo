const sendForm = () => {

    //маска
    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }

        }

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }

    }

    //применение маски для номеров
    maskPhone('input[name="user_phone"]');

    //запрет ввода в инпуте "номера" всего кроме цифр
    document.querySelectorAll('input[name="user_phone"]').forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/^[-()]\d/g, '');
        });
    });

    //запрет ввода в инпуте "имя" латиницы и цифр
    document.querySelectorAll('input[name="user_name"]').forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^а-яА-яёЁ]/g, '');
        });
    });
    
    //запрет ввода в инпуте "вопрос" латиницы и знак вопроса
    document.querySelector('input[name="user_quest"]').addEventListener('input', () => {
        document.querySelector('input[name="user_quest"]').value = document.querySelector('input[name="user_quest"]').value.replace(/[^а-яА-яёЁ\?]/g, '');
    });

    //ajax отправка формы
    //для каждой формы
    document.querySelectorAll('form').forEach(form => {

        //блокировка отправки формы
        form.querySelector('button').disabled = true;
        form.querySelectorAll('input').forEach(item => {
            item.addEventListener('input', () => {
                //блокировка кнопки отправки, если недостаточно цифр
                if (form.querySelector('input[name="user_phone"]')) {
                    if (form.querySelector('input[name="user_phone"]').value.length === 18) {
                        form.querySelector('button').disabled = false;
                    } else {
                        form.querySelector('button').disabled = true;
                    }

                    if (form.querySelector('button').disabled) {
                        if (form.querySelector('input[name="user_phone"]').value.length !== 18) {
                            form.querySelector('input[name="user_phone"]').style.cssText = 'border: 2px solid red';
                        } else {
                            form.querySelector('input[name="user_phone"]').style.cssText = 'border: 1px solid #ddd; border-radius: 5px;';
                        }
                    } else {
                        form.querySelector('input[name="user_phone"]').style.cssText = 'border: 1px solid #ddd; border-radius: 5px;';
                    }
                }
                
                //блокировка кнопки если не достаточно символов в вопросе
                if (form.querySelector('input[name="user_quest"]')) {
                    if (form.querySelector('input[name="user_quest"]').value.length >= 2) {
                        form.querySelector('button').disabled = false;
                    } else {
                        form.querySelector('button').disabled = true;
                    }
                }

            });
        });

        //отправка формы
        form.addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(form);
            const body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            body["user_question"] = document.querySelector('input[name="user_quest"]').value;
            // eslint-disable-next-line no-use-before-define
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200.');
                    }
                })
                .catch(error => console.error(error));

            //через 3 секунды очищаем инпуты и закрываем модальное окно
            setTimeout(() => {
                form.querySelectorAll('input').forEach(item => {
                    item.value = '';
                });
                document.querySelector('input[name="user_quest"]').value = '';
                document.querySelector('.popup-call').style.cssText = 'display: none;';
                document.querySelector('.popup-discount').style.cssText = 'display: none;';
                document.querySelector('.popup-check').style.cssText = 'display: none;';
                document.querySelector('.popup-consultation').style.cssText = 'display: none;';
            }, 3000);


        });
    });

    //функция запроса на сервер
    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

};

export default sendForm;
