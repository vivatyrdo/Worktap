document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 6;

    const steps = document.querySelectorAll('.js-step-content');
    const stepperItems = document.querySelectorAll('.stepper__item');
    const nextBtn = document.querySelector('.js-btn-next');
    const backBtn = document.querySelector('.js-btn-back');

    function updateStepDisplay() {
        steps.forEach(s => {
            s.classList.toggle('step-content--hidden', parseInt(s.dataset.step) !== currentStep);
        });

        stepperItems.forEach(item => {
            const stepNum = parseInt(item.dataset.step);
            item.classList.toggle('stepper__item--active', stepNum <= currentStep);
        });

        backBtn.classList.toggle('btn--hidden', currentStep === 1);

        nextBtn.textContent = currentStep === totalSteps ? 'Опубликовать' : 'Дальше';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepDisplay();
        } else {
            alert('Поздравляем! Ваш ворк успешно отправлен на модерацию.');
            window.location.href = 'profile.html';
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepDisplay();
        }
    });

    const tagInput = document.querySelector('.js-tag-input');
    const tagsList = document.querySelector('.js-tags-list');
    let tags = ['Тег 1', 'Тег 2', 'Дизайн сайта'];

    function renderTags() {
        tagsList.innerHTML = '';
        tags.forEach((tag, index) => {
            const tagEl = document.createElement('div');
            tagEl.className = 'tag-item';
            tagEl.innerHTML = `<span>${tag}</span><span class="tag-item__remove" data-index="${index}">×</span>`;
            tagsList.appendChild(tagEl);
        });
    }

    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = tagInput.value.trim();
            if (val && !tags.includes(val)) {
                tags.push(val);
                tagInput.value = '';
                renderTags();
            }
        }
    });

    tagsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag-item__remove')) {
            tags.splice(e.target.dataset.index, 1);
            renderTags();
        }
    });
    renderTags();

    const extraGrid = document.querySelector('.js-extra-grid');
    const addExtraBtn = document.querySelector('.js-add-extra');

    addExtraBtn.addEventListener('click', () => {
        const card = document.createElement('div');
        card.className = 'extra-card js-extra-card';
        card.innerHTML = `
            <div class="work-form__group"><label class="work-form__label">Название</label><input type="text" class="work-form__input" placeholder="Placeholder"></div>
            <div class="work-form__group"><label class="work-form__label">Подсказка для покупателя</label><input type="text" class="work-form__input" placeholder="Placeholder"></div>
            <div class="work-form__row">
                <div class="work-form__group"><label class="work-form__label">Срок выполнения</label><input type="text" class="work-form__input" placeholder="Placeholder"></div>
                <div class="work-form__group"><label class="work-form__label">Цена в тенге</label><input type="number" class="work-form__input" placeholder="Placeholder"></div>
            </div>
            <button type="button" class="extra-card__delete js-remove-extra">Удалить</button>
        `;
        extraGrid.insertBefore(card, addExtraBtn);
    });

    extraGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-remove-extra')) {
            e.target.closest('.js-extra-card').remove();
        }
    });

    const modal = document.querySelector('.js-modal-option');
    const openModalBtns = document.querySelectorAll('.js-open-modal');
    const closeElements = document.querySelectorAll('.js-close-modal');

    openModalBtns.forEach(b => b.addEventListener('click', () => modal.classList.add('modal--active')));
    closeElements.forEach(c => c.addEventListener('click', (e) => {
        if (e.target === c || c.classList.contains('modal__btn-primary')) modal.classList.remove('modal--active');
    }));

    const faqGrid = document.querySelector('.js-faq-grid');
    const addFaqBtn = document.querySelector('.js-add-faq');

    if (addFaqBtn && faqGrid) {
        addFaqBtn.addEventListener('click', () => {
            const faqCard = document.createElement('div');
            faqCard.className = 'faq-card js-faq-card';
            faqCard.innerHTML = `
                <div class="work-form__group">
                    <label class="work-form__label">Вопрос</label>
                    <input type="text" class="work-form__input" placeholder="Placeholder">
                </div>
                <div class="work-form__group">
                    <label class="work-form__label">Ответ</label>
                    <input type="text" class="work-form__input" placeholder="Placeholder">
                </div>
                <button type="button" class="faq-card__delete js-remove-faq">Удалить</button>
            `;
            faqGrid.insertBefore(faqCard, addFaqBtn);
        });

        faqGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('js-remove-faq')) {
                const card = e.target.closest('.js-faq-card');
                if (card) card.remove();
            }
        });
    }

    const photoInput = document.querySelector('.js-input-photo');
    const photoGrid = document.querySelector('.js-photo-grid');

    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
                if (!file.type.startsWith('image/')) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    item.innerHTML = `
                        <img src="${event.target.result}" alt="Preview" class="gallery-item__img">
                        <button type="button" class="gallery-item__remove">×</button>
                    `;
                    photoGrid.appendChild(item);

                    item.querySelector('.gallery-item__remove').addEventListener('click', () => item.remove());
                };
                reader.readAsDataURL(file);
            });
        });
    }

    const docInput = document.querySelector('.js-doc-input');
    const docList = document.querySelector('.js-doc-list');
    const docArea = document.querySelector('.js-doc-upload-area');

    if (docInput && docList) {
        docInput.addEventListener('change', (e) => {
            Array.from(e.target.files).forEach(file => {
                const docItem = document.createElement('div');
                docItem.className = 'upload-file';
                docItem.innerHTML = `
                    <div class="upload-file__info">
                        <span class="upload-file__name">${file.name}</span>
                    </div>
                    <button type="button" class="upload-file__remove">×</button>
                `;
                docList.appendChild(docItem);
                docItem.querySelector('.upload-file__remove').addEventListener('click', () => docItem.remove());
            });
        });

        ['dragenter', 'dragover'].forEach(name => {
            docArea.addEventListener(name, () => docArea.classList.add('upload-area--dragover'));
        });
        ['dragleave', 'drop'].forEach(name => {
            docArea.addEventListener(name, () => docArea.classList.remove('upload-area--dragover'));
        });
    }
});