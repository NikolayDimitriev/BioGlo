const addBlocks = () => {
    const sentence = document.querySelector('.sentence'),
        addBtn = sentence.querySelector('.add-sentence-btn'),
        blocks = [...sentence.querySelectorAll('.col-xs-12')];

    sentence.addEventListener('click', e => {
        const target= e.target;

        if (target === addBtn) {
            addBtn.style.display = 'none';
            blocks.forEach(item => {
                if (item.classList.contains('hidden') || item.classList.contains('visible-sm-block')) {
                    item.classList.remove('hidden');
                    item.classList.remove('visible-sm-block');
                }
            });
        }
    });
};

export default addBlocks;
