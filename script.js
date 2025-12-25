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