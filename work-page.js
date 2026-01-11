document.addEventListener('DOMContentLoaded', () => {
    
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

const accordions = document.querySelectorAll('.js-accordion');

accordions.forEach(acc => {
    const header = acc.querySelector('.accordion__header');
    
    header.addEventListener('click', () => {
        
        acc.classList.toggle('accordion--active');
    });
});

const mainTiers = document.querySelectorAll('.js-main-tier');
const subAccordions = document.querySelectorAll('.js-sub-accordion');

mainTiers.forEach(tier => {
    const header = tier.querySelector('.package__header');
    header.addEventListener('click', () => {
        const isActive = tier.classList.contains('package--active');
        
        mainTiers.forEach(t => t.classList.remove('package--active'));
        
        if (!isActive) {
            tier.classList.add('package--active');
        }
    });
});

subAccordions.forEach(acc => {
    const header = acc.querySelector('.extra-item__header');
    header.addEventListener('click', (e) => {
        e.stopPropagation();
        acc.classList.toggle('extra-item--active');
    });
});
});