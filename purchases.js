document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.js-purchases-grid');
    const filterRadios = document.querySelectorAll('.js-filter-status');
    const loadMoreBtn = document.querySelector('.js-load-purchases');

    filterRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const status = radio.value;
            const cards = document.querySelectorAll('.js-purchase-card');

            cards.forEach(card => {
                if (status === 'all' || card.dataset.status === status) {
                    card.classList.remove('purchase-card--hidden');
                } else {
                    card.classList.add('purchase-card--hidden');
                }
            });
        });
    });

    const createCardHTML = (status) => {
        const isDone = status === 'done';
        return `
            <article class="purchase-card js-purchase-card" data-status="${status}" style="opacity:0; transform:translateY(10px)">
                <div class="purchase-card__image">
                    <img src="images/history-img.png" alt="">
                    <div class="purchase-card__badge ${isDone ? 'purchase-card__badge--orange' : 'purchase-card__badge--blue'}"></div>
                </div>
                <div class="purchase-card__content">
                    <h3 class="purchase-card__subject">Дизайн сайта</h3>
                    <p class="purchase-card__package">Стандарт пакет</p>
                    <div class="purchase-card__info">
                        <span class="purchase-card__price">50 000 тенге</span>
                        <span class="purchase-card__date">26.03.2021</span>
                    </div>
                    <span class="purchase-card__status ${isDone ? 'purchase-card__status--done' : 'purchase-card__status--progress'}">
                        ${isDone ? 'Завершено' : 'Выполняется'}
                    </span>
                    <div class="purchase-card__actions">
                        <button class="purchase-card__btn purchase-card__btn--chat">В чат</button>
                        <button class="purchase-card__btn purchase-card__btn--more">Подробнее</button>
                    </div>
                </div>
            </article>
        `;
    };

    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.textContent = 'Загрузка...';
        
        setTimeout(() => {
            const statuses = ['progress', 'done', 'progress', 'done'];
            const currentFilter = document.querySelector('.js-filter-status:checked').value;

            statuses.forEach((status, i) => {
                grid.insertAdjacentHTML('beforeend', createCardHTML(status));
                const newCard = grid.lastElementChild;

                if (currentFilter !== 'all' && status !== currentFilter) {
                    newCard.classList.add('purchase-card--hidden');
                }

                setTimeout(() => {
                    newCard.style.transition = 'all 0.4s ease';
                    newCard.style.opacity = '1';
                    newCard.style.transform = 'translateY(0)';
                }, i * 100);
            });

            loadMoreBtn.textContent = 'Загрузить еще';
        }, 600);
    });
});