document.addEventListener('DOMContentLoaded', () => {
    const profileTrigger = document.querySelector('.js-profile-trigger');
    const profileDropdown = document.querySelector('.js-profile-dropdown');

    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            // Останавливаем всплытие, чтобы клик по самому меню не закрывал его
            e.stopPropagation();
            profileTrigger.classList.toggle('profile-meta--active');
            profileDropdown.classList.toggle('profile-dropdown--active');
        });

        // Закрытие меню при клике в любое место экрана
        document.addEventListener('click', () => {
            profileTrigger.classList.remove('profile-meta--active');
            profileDropdown.classList.remove('profile-dropdown--active');
        });
        
        // Предотвращаем закрытие при клике внутри самого меню
        profileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Переключение ролей внутри меню (визуальное)
        const roleBtns = document.querySelectorAll('.profile-dropdown__role');
        roleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                roleBtns.forEach(b => b.classList.remove('profile-dropdown__role--active'));
                btn.classList.add('profile-dropdown__role--active');
            });
        });
    }



    const grid = document.querySelector('.js-works-grid');
    const loadBtn = document.querySelector('.js-load-works');

    const cardTemplate = () => `
        <article class="work-item" style="opacity: 0; transform: translateY(10px)">
            <div class="work-item__image"><img src="images/work-profile.png" alt=""></div>
            <div class="work-item__body">
                <div class="work-item__author">
                    <div class="work-item__avatar"><img src="images/top-freelancer1.png" alt=""></div>
                    <span class="work-item__author-name">Екатерина Иванова</span>
                </div>
                <h3 class="work-item__title">Сделаю качественный дизайн вашего будущего лендинга</h3>
                <div class="work-item__rating rating">
                    <div class="rating__stars">
                        <span class="star star--full"></span><span class="star star--full"></span><span class="star star--full"></span><span class="star star--full"></span><span class="star"></span>
                    </div>
                    <span class="rating__count">(15)</span>
                </div>
                <div class="work-item__footer">
                    <div class="work-item__price">
                        <span class="work-item__price-label">от</span>
                        <span class="work-item__price-value">50 000 тенге</span>
                    </div>
                    <a class="work-item__btn-view" href="work-page.html">Посмотреть</a>
                </div>
            </div>
        </article>
    `;

    if (loadBtn && grid) {
        loadBtn.addEventListener('click', () => {
            loadBtn.textContent = 'Загрузка...';
            setTimeout(() => {
                for (let i = 0; i < 4; i++) {
                    grid.insertAdjacentHTML('beforeend', cardTemplate());
                    const last = grid.lastElementChild;
                    setTimeout(() => {
                        last.style.transition = 'all 0.4s ease';
                        last.style.opacity = '1';
                        last.style.transform = 'translateY(0)';
                    }, i * 100);
                }
                loadBtn.textContent = 'Загрузить еще';
            }, 600);
        });
    }
});