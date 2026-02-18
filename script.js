document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. ЛОГИКА АВТОРИЗАЦИИ (GLOBAL HEADER) --- */
    function updateHeaderState() {
        const header = document.querySelector('.js-header');
        // Проверяем, есть ли хедер вообще
        if (!header) return;

        const isLoggedIn = localStorage.getItem('worktap_logged_in');

        if (isLoggedIn === 'true') {
            header.classList.add('header--logged');
            header.classList.remove('header--guest');
        } else {
            header.classList.add('header--guest');
            header.classList.remove('header--logged');
        }
    }
    // Запускаем проверку при загрузке
    updateHeaderState();


    /* --- 2. МОБИЛЬНОЕ МЕНЮ (BURGER) --- */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__nav');
    const body = document.body;

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            nav.classList.toggle('header__nav--active');
            
            if (nav.classList.contains('header__nav--active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('burger--active');
                nav.classList.remove('header__nav--active');
                body.style.overflow = '';
            });
        });
    }


    /* --- 3. СТРАНИЦА БИРЖИ (Скролл и Загрузка) --- */
    const heroExchange = document.querySelector('.js-hero-exchange');
    const ordersList = document.querySelector('.js-orders-list');
    const loadMoreBtn = document.querySelector('.js-load-more');

    // Безопасный скролл: вешаем событие только если есть элемент heroExchange
    if (heroExchange) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                heroExchange.classList.add('hero-exchange--compact');
            } else {
                heroExchange.classList.remove('hero-exchange--compact');
            }
        });
    }

    // Кнопка загрузить еще (для биржи)
    if (loadMoreBtn && ordersList) {
        const createOrder = () => {
            // Клонируем существующую карточку, если она есть, или создаем строку
            const template = document.querySelector('.order-card');
            if (template) {
                const newCard = template.cloneNode(true);
                newCard.style.opacity = '0';
                newCard.style.transform = 'translateY(20px)';
                return newCard;
            }
            return null; 
        };

        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.textContent = 'Загружаем...';
            
            setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    const newOrder = createOrder();
                    if (newOrder) {
                        ordersList.appendChild(newOrder);
                        setTimeout(() => {
                            newOrder.style.transition = 'all 0.4s ease';
                            newOrder.style.opacity = '1';
                            newOrder.style.transform = 'translateY(0)';
                        }, i * 100);
                    }
                }
                loadMoreBtn.textContent = 'Загрузить еще';
            }, 800);
        });
    }


    /* --- 4. СТРАНИЦА ВХОДА (LOGIN) --- */
    // Ищем кнопку по селектору формы или класса
    const loginForm = document.querySelector('.auth__form'); 
    // Если это именно страница логина (не регистрации и не восстановления)
    if (loginForm && !document.querySelector('.js-recovery-form')) {
        loginForm.addEventListener('submit', (e) => {
            // e.preventDefault() чтобы форма реально не отправлялась на сервер
            // Но если у тебя там ссылка <a href>, то используй click по кнопке
            // Для надежности найдем кнопку сабмита:
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            if(submitBtn && submitBtn.textContent.includes('Войти')) {
                 e.preventDefault();
                 localStorage.setItem('worktap_logged_in', 'true');
                 window.location.href = 'profile.html';
            }
        });
    }


    /* --- 5. ВОССТАНОВЛЕНИЕ ПАРОЛЯ --- */
    const recoveryBtn = document.querySelector('.js-btn-recovery');
    const emailInput = document.querySelector('.js-input-email');
    const codeInput = document.querySelector('.js-input-code');

    // Проверяем наличие ВСЕХ элементов перед запуском логики
    if (recoveryBtn && emailInput && codeInput) {
        let isCodeSent = false;

        recoveryBtn.addEventListener('click', () => {
            if (emailInput.value.trim() === "") {
                emailInput.style.borderColor = 'red';
                alert("Пожалуйста, введите E-mail");
                return;
            } else {
                emailInput.style.borderColor = '';
            }

            if (!isCodeSent) {
                const randomCode = Math.floor(1000 + Math.random() * 9000);
                codeInput.value = randomCode;
                recoveryBtn.textContent = "Войти";
                recoveryBtn.style.backgroundColor = "#1dbf73";
                isCodeSent = true;
            } else {
                if (codeInput.value.trim() !== "") {
                    localStorage.setItem('worktap_logged_in', 'true');
                    window.location.href = 'exchange.html';
                } else {
                    alert("Поле кода не может быть пустым");
                }
            }
        });

        codeInput.addEventListener('input', () => {
            if (emailInput.value.trim() !== "" && codeInput.value.length >= 4) {
                recoveryBtn.textContent = "Войти";
                isCodeSent = true;
            }
        });
    }


    /* --- 6. МОДАЛКИ (О НАС, ПРАВИЛА) --- */
    // Эта логика универсальна для футера
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal__close, .js-modal-close');

    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('modal--active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modals.forEach(modal => modal.classList.remove('modal--active'));
                document.body.style.overflow = '';
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__overlay')) {
                modals.forEach(modal => modal.classList.remove('modal--active'));
                document.body.style.overflow = '';
            }
        });
    }

});