const accordion = () => {
    const accordion = document.getElementById('accordion-two'),
        itemsAccordion = [...accordion.querySelectorAll('.panel-heading')];


    const toggleAccordion = i => {
        itemsAccordion.forEach((item, index) => {
            if (index === i) {
                item.parentNode.querySelector('.panel-collapse').classList.toggle('in');
            } else {
                item.parentNode.querySelector('.panel-collapse').classList.remove('in');
            }
        });
    };

    accordion.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('.panel-heading')) {
            e.preventDefault();
            itemsAccordion.forEach((item, index) => {
                if (target.closest('.panel-heading') === item) {
                    toggleAccordion(index);
                }
            });
        }
    });
};

export default accordion;
