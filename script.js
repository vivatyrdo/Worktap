/* MOBILE MENU LOGIC */
const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');
const body = document.body;

burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('header__nav--active');
    
    // Блокировка скролла при открытом меню
    if (nav.classList.contains('header__nav--active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('burger--active');
        nav.classList.remove('header__nav--active');
        body.style.overflow = '';
    });
});

/* ABOUT BLOCK LOGIC */
const aboutSection = document.querySelector('.about');
const closeBtn = document.querySelector('.about__close');

if (closeBtn && aboutSection) {
    closeBtn.addEventListener('click', () => {
        // Плавное исчезновение
        aboutSection.style.transition = 'opacity 0.3s ease';
        aboutSection.style.opacity = '0';
        setTimeout(() => {
            aboutSection.style.display = 'none';
        }, 300);
    });
}

/* MODAL MANAGEMENT */
const modalTrigger = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal__close, .js-modal-close');

// Открытие
modalTrigger.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('modal--active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
        }
    });
});

// Закрытие
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modals.forEach(modal => modal.classList.remove('modal--active'));
        document.body.style.overflow = ''; // Возвращаем скролл
    });
});

// Закрытие по клику на оверлей (пустое место вокруг карты)
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal__overlay')) {
        modals.forEach(modal => modal.classList.remove('modal--active'));
        document.body.style.overflow = '';
    }
});

/* EXCHANGE PAGE INTERACTIVITY */

const heroExchange = document.querySelector('.js-hero-exchange');
const ordersList = document.querySelector('.js-orders-list');
const loadMoreBtn = document.querySelector('.js-load-more');

// 1. Scroll Transformation
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        heroExchange.classList.add('hero-exchange--compact');
    } else {
        heroExchange.classList.remove('hero-exchange--compact');
    }
});

// 2. Load More Logic
const createOrder = () => {
    const card = document.querySelector('.order-card').cloneNode(true);
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    return card;
};

loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.textContent = 'Загружаем...';
    
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            const newOrder = createOrder();
            ordersList.appendChild(newOrder);
            
            // Анимированное появление
            setTimeout(() => {
                newOrder.style.transition = 'all 0.4s ease';
                newOrder.style.opacity = '1';
                newOrder.style.transform = 'translateY(0)';
            }, i * 100);
        }
        loadMoreBtn.textContent = 'Загрузить еще';
    }, 800);
});

/* PASSWORD RECOVERY LOGIC */

// Оборачиваем в проверку, чтобы код не падал на других страницах
const recoveryBtn = document.querySelector('.js-btn-recovery');
const emailInput = document.querySelector('.js-input-email');
const codeInput = document.querySelector('.js-input-code');

if (recoveryBtn && emailInput && codeInput) {
    let isCodeSent = false;

    recoveryBtn.addEventListener('click', () => {
        // 1. Проверяем, заполнено ли поле E-mail
        if (emailInput.value.trim() === "") {
            emailInput.style.borderColor = 'red'; // Визуальная подсказка
            alert("Пожалуйста, введите E-mail");
            return;
        } else {
            emailInput.style.borderColor = '';
        }

        if (!isCodeSent) {
            // --- ЭТАП 1: Генерация кода ---
            
            // Генерируем код
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            
            // Вставляем в поле
            codeInput.value = randomCode;
            
            // Меняем кнопку
            recoveryBtn.textContent = "Войти";
            recoveryBtn.style.backgroundColor = "#1dbf73"; // Зеленый из макета
            
            isCodeSent = true;
            console.log("Код сгенерирован:", randomCode);
        } else {
            // --- ЭТАП 2: Вход ---
            if (codeInput.value.trim() !== "") {
                localStorage.setItem('worktap_logged_in', 'true');
                window.location.href = 'exchange.html';
            } else {
                alert("Поле кода не может быть пустым");
            }
        }
    });

    // Живая проверка ввода кода
    codeInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== "" && codeInput.value.length >= 4) {
            recoveryBtn.textContent = "Войти";
            isCodeSent = true;
        }
    });
}