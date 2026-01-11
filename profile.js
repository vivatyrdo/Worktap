document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".js-burger");
  const nav = document.querySelector(".js-nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("burger--active");
      nav.classList.toggle("nav--active");
      document.body.style.overflow = nav.classList.contains("nav--active")
        ? "hidden"
        : "";
    });
  }

  const toggle = document.querySelector(".js-details-toggle");
  const card = document.querySelector(".js-details-card");

  if (toggle && card) {
    toggle.addEventListener("click", () => {
      card.classList.toggle("details-card--closed");
      const span = toggle.querySelector("span");
      if (span) {
        span.textContent = card.classList.contains("details-card--closed")
          ? "Показать подробную информацию"
          : "Скрыть подробную информацию";
      }
    });
  }

  const searchModal = document.querySelector(".js-modal-search");
  const openSearchBtns = document.querySelectorAll(".btn-quick-search");
  const closeSearchBtn = document.querySelector(".js-close-search");

  if (searchModal && openSearchBtns.length > 0) {
    openSearchBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        searchModal.classList.add("modal-search--active");
        document.body.style.overflow = "hidden";
      });
    });

    if (closeSearchBtn) {
      closeSearchBtn.addEventListener("click", () => {
        searchModal.classList.remove("modal-search--active");
        document.body.style.overflow = "";
      });
    }

    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove("modal-search--active");
        document.body.style.overflow = "";
      }
    });
  }

  const footerModalTriggers = document.querySelectorAll("[data-modal]");

  footerModalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute("data-modal");
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add("modal--active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  const allModals = document.querySelectorAll(".modal");
  allModals.forEach((modal) => {
    const closeBtn = modal.querySelector(".modal__close");
    const okBtn = modal.querySelector(".js-modal-close");
    const overlay = modal.querySelector(".modal__overlay");

    const closeModal = () => {
      modal.classList.remove("modal--active");
      document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (okBtn) okBtn.addEventListener("click", closeModal);
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
      });
    }
  });

  const worksGrid = document.querySelector(".js-works-grid");
  const loadWorksBtn = document.querySelector(".js-load-works");

  if (loadWorksBtn && worksGrid) {
    const createWorkHTML = () => `
            <article class="work-card" style="opacity: 0; transform: translateY(10px)">
                <div class="work-card__image"><img src="images/work-profile.png" alt=""></div>
                <div class="work-card__content">
                    <h3 class="work-card__name">Дизайн сайта</h3>
                    <p class="work-card__price">50 000 тенге</p>
                </div>
            </article>
        `;

    loadWorksBtn.addEventListener("click", () => {
      loadWorksBtn.textContent = "Загрузка...";
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          worksGrid.insertAdjacentHTML("beforeend", createWorkHTML());
          const lastItem = worksGrid.lastElementChild;
          setTimeout(() => {
            lastItem.style.transition = "all 0.3s ease";
            lastItem.style.opacity = "1";
            lastItem.style.transform = "translateY(0)";
          }, i * 50);
        }
        loadWorksBtn.textContent = "Загрузить еще";
      }, 500);
    });
  }

  const profileTrigger = document.querySelector(".js-profile-trigger");
  const profileDropdown = document.querySelector(".js-profile-dropdown");

  if (profileTrigger && profileDropdown) {
    profileTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      profileTrigger.classList.toggle("profile-meta--active");
      profileDropdown.classList.toggle("profile-dropdown--active");
    });

    document.addEventListener("click", () => {
      profileTrigger.classList.remove("profile-meta--active");
      profileDropdown.classList.remove("profile-dropdown--active");
    });

    profileDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    const roleBtns = document.querySelectorAll(".profile-dropdown__role");
    roleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        roleBtns.forEach((b) =>
          b.classList.remove("profile-dropdown__role--active")
        );
        btn.classList.add("profile-dropdown__role--active");
      });
    });
  }

  const reviewsGrid = document.querySelector(".js-reviews-grid");
  const loadReviewsBtn = document.querySelector(".js-load-reviews");
  const filterBtns = document.querySelectorAll(".reviews__filter-btn");

  if (reviewsGrid && loadReviewsBtn) {
    const createReviewHTML = (type) => {
      const isPositive = type === "positive";
      const stars = isPositive ? 4 : 1;
      let starsHTML = "";
      for (let i = 0; i < stars; i++)
        starsHTML += '<span class="star star--full"></span>';
      for (let i = 0; i < 5 - stars; i++)
        starsHTML += '<span class="star"></span>';

      return `
                <div class="review-card js-review-item" data-type="${type}" style="opacity: 0; transform: translateY(10px)">
                    <div class="review-card__header">
                        <div class="review-card__avatar"><img src="" alt=""></div>
                        <div class="review-card__info">
                            <h4 class="review-card__user">Никита Евреев</h4>
                            <div class="rating__stars">${starsHTML}</div>
                        </div>
                    </div>
                    <p class="review-card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            `;
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) =>
          b.classList.remove("reviews__filter-btn--active")
        );
        btn.classList.add("reviews__filter-btn--active");
        const filterType = btn.dataset.filter;
        document.querySelectorAll(".js-review-item").forEach((card) => {
          card.classList.toggle(
            "review-card--hidden",
            card.dataset.type !== filterType
          );
        });
      });
    });

    loadReviewsBtn.addEventListener("click", () => {
      const activeFilter = document.querySelector(
        ".reviews__filter-btn--active"
      ).dataset.filter;
      loadReviewsBtn.textContent = "Загрузка...";
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          reviewsGrid.insertAdjacentHTML(
            "beforeend",
            createReviewHTML(activeFilter)
          );
          const lastItem = reviewsGrid.lastElementChild;
          setTimeout(() => {
            lastItem.style.transition = "all 0.3s ease";
            lastItem.style.opacity = "1";
            lastItem.style.transform = "translateY(0)";
          }, i * 50);
        }
        loadReviewsBtn.textContent = "Загрузить еще";
      }, 500);
    });
  }
});
