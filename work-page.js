document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Слайдер с миниатюрами
    const swiperThumbs = new Swiper('.js-work-slider-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            320: { slidesPerView: 3 },
            480: { slidesPerView: 4 },
            768: { slidesPerView: 5 }
        }
    });

    // 2. Главный слайдер (связываем с миниатюрами)
    const swiperMain = new Swiper('.js-work-slider-main', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: swiperThumbs,
        },
    });

    // Добавь это в существующий обработчик DOMContentLoaded
const accordions = document.querySelectorAll('.js-accordion');

accordions.forEach(acc => {
    const header = acc.querySelector('.accordion__header');
    
    header.addEventListener('click', () => {
        // Если хочешь, чтобы при открытии одного другие закрывались — раскомментируй код ниже:
        /*
        accordions.forEach(other => {
            if (other !== acc) other.classList.remove('accordion--active');
        });
        */
        
        acc.classList.toggle('accordion--active');
    });
});

// Внутри DOMContentLoaded
const mainTiers = document.querySelectorAll('.js-main-tier');
const subAccordions = document.querySelectorAll('.js-sub-accordion');

// Логика главных пакетов (Эксклюзивное открытие)
mainTiers.forEach(tier => {
    const header = tier.querySelector('.package__header');
    header.addEventListener('click', () => {
        const isActive = tier.classList.contains('package--active');
        
        // Закрываем все
        mainTiers.forEach(t => t.classList.remove('package--active'));
        
        // Если был закрыт — открываем
        if (!isActive) {
            tier.classList.add('package--active');
        }
    });
});

// Логика вложенных опций (Обычный переключатель)
subAccordions.forEach(acc => {
    const header = acc.querySelector('.extra-item__header');
    header.addEventListener('click', (e) => {
        e.stopPropagation(); // Важно: чтобы не срабатывал клик по родителю-пакету
        acc.classList.toggle('extra-item--active');
    });
});
});