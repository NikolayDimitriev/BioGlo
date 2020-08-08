const calc = () => {
    const accordion = document.getElementById('accordion'),
        itemsAccordion = [...accordion.querySelectorAll('.panel-heading')],
        btnAccordion = [...accordion.querySelectorAll('.construct-btn')],
        checkbox = accordion.querySelector('#myonoffswitch'),
        selectBox = [...accordion.querySelector('#collapseTwo .panel-body').children],
        result = document.querySelector('#calc-result'),
        allSelect = [...accordion.querySelectorAll('select')],
        checkboxTwo = accordion.querySelector('#myonoffswitch-two'),
        allCheckbox = [checkbox, checkboxTwo];

        
    
    //запрет ввода в поле "расстояние" всего кроме цифр
    accordion.querySelector('input[type="text"]').addEventListener('input', () => {
        accordion.querySelector('input[type="text"]').value = accordion.querySelector('input[type="text"]').value.replace(/\D/g, '');
    });

    const toggleAccordion = i => {
        itemsAccordion.forEach((item, index) => {
            if (index === i) {
                item.parentNode.querySelector('.panel-collapse').classList.add('in');
            } else {
                item.parentNode.querySelector('.panel-collapse').classList.remove('in');
            }
        });
    };

    const output = sum => {
        let res = sum;
        
        //цена в зависимости от диаметра "первог" колодца
        if (allSelect[0].selectedIndex === 1) {
            res = res + sum * 0.2;
        }

        //цена в зависимости количество "первых" колодцев
        if (allSelect[1].selectedIndex === 1) {
            res = res + sum * 0.3;
        } else if (allSelect[1].selectedIndex === 2) {
            res = res + sum * 0.5;
        }

        //цена в зависимости от диаметра "второго" колодца
        if (allSelect[2].selectedIndex === 1) {
            res = res + sum * 0.2;
        } 

        //цена в зависимости от количества "вторых" колодцев
        if (allSelect[3].selectedIndex === 1) {
            res = res + sum * 0.3;
        } else if (allSelect[3].selectedIndex === 2) {
            res = res + sum * 0.5;
        }

        //доп цена в зависимости от наличия дна и типа септика
        if (checkboxTwo.checked && checkbox.checked) {
            res += 1000;
        } else if (checkboxTwo.checked && !checkbox.checked) {
            res += 2000;
        }

        result.value = res;
    };

    const calcSum = () => {
        //если однокамерная
        if (checkbox.checked) {
            //прячу нужные поля выбора
            for (let i = 3; i < selectBox.length - 1; i++) {
                selectBox[i].style.display = 'none';
            }
            output(10000);
        //двукамерный
        } else {
            //показывают нужные поля выбора
            for (let i = 4; i < selectBox.length - 1; i++) {
                selectBox[3].style.display = 'block';
                selectBox[i].style.display = 'inline-block';
            }
            output(15000);
        }
    };

    //обработчики события изменения селектов
    allSelect.forEach(item => {
        item.addEventListener('change', calcSum);
    });

    allCheckbox.forEach(item => {
        item.addEventListener('change', calcSum);
    });

    output(10000);

    accordion.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('.panel-heading')) {
            e.preventDefault();
            itemsAccordion.forEach((item, index) => {
                if (target.closest('.panel-heading') === item) {
                    toggleAccordion(index);
                    calcSum();
                }
            });
        } else if (target.closest('.construct-btn')) {
            e.preventDefault();
            btnAccordion.forEach((item, index) => {
                if (target.closest('.construct-btn') === item) {
                    toggleAccordion(index + 1);
                    calcSum();
                }
            });
        }
    });
};

export default calc;
