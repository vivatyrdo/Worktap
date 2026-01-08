document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 6;

    // Элементы навигации
    const steps = document.querySelectorAll('.js-step-content');
    const stepperItems = document.querySelectorAll('.stepper__item');
    const nextBtn = document.querySelector('.js-btn-next');
    const backBtn = document.querySelector('.js-btn-back');

    // Функция обновления шага
    function updateStepDisplay() {
        steps.forEach(s => {
            s.classList.toggle('step-content--hidden', parseInt(s.dataset.step) !== currentStep);
        });

        stepperItems.forEach(item => {
            const stepNum = parseInt(item.dataset.step);
            item.classList.toggle('stepper__item--active', stepNum <= currentStep);
        });

        // Кнопка Назад
        backBtn.classList.toggle('btn--hidden', currentStep === 1);

        // Текст кнопки Дальше
        nextBtn.textContent = currentStep === totalSteps ? 'Опубликовать' : 'Дальше';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Навигация Вперед
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepDisplay();
        } else {
            // Финальное действие при нажатии "Опубликовать"
            alert('Поздравляем! Ваш ворк успешно отправлен на модерацию.');
            window.location.href = 'profile.html'; // Перенаправляем пользователя
        }
    });

    // Навигация Назад
    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepDisplay();
        }
    });

    // --- ЛОГИКА ТЕГОВ (ШАГ 1) ---
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

    // --- ЛОГИКА ДОП. ОПЦИЙ (ШАГ 2) ---
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

    // --- МОДАЛКА (ШАГ 2) ---
    const modal = document.querySelector('.js-modal-option');
    const openModalBtns = document.querySelectorAll('.js-open-modal');
    const closeElements = document.querySelectorAll('.js-close-modal');

    openModalBtns.forEach(b => b.addEventListener('click', () => modal.classList.add('modal--active')));
    closeElements.forEach(c => c.addEventListener('click', (e) => {
        if (e.target === c || c.classList.contains('modal__btn-primary')) modal.classList.remove('modal--active');
    }));

    // --- ЛОГИКА FAQ (ШАГ 3) ---
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
            // Вставляем новую карточку перед кнопкой добавления
            faqGrid.insertBefore(faqCard, addFaqBtn);
        });

        // Удаление через делегирование
        faqGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('js-remove-faq')) {
                const card = e.target.closest('.js-faq-card');
                if (card) card.remove();
            }
        });
    }

    // --- ЛОГИКА ФОТО (ШАГ 5) ---
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

                    // Удаление фото
                    item.querySelector('.gallery-item__remove').addEventListener('click', () => item.remove());
                };
                reader.readAsDataURL(file);
            });
        });
    }

    // --- ЛОГИКА ДОКУМЕНТОВ (ШАГ 5 - ПЕРЕИСПОЛЬЗОВАНИЕ) ---
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

        // Drag & Drop эффекты
        ['dragenter', 'dragover'].forEach(name => {
            docArea.addEventListener(name, () => docArea.classList.add('upload-area--dragover'));
        });
        ['dragleave', 'drop'].forEach(name => {
            docArea.addEventListener(name, () => docArea.classList.remove('upload-area--dragover'));
        });
    }
});