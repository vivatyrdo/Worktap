function updateHeaderState() {
  const header = document.querySelector(".js-header");
  const isLoggedIn = localStorage.getItem("worktap_logged_in");

  if (header) {
    if (isLoggedIn === "true") {
      header.classList.add("header--logged");
      header.classList.remove("header--guest");
    } else {
      header.classList.add("header--guest");
      header.classList.remove("header--logged");
    }
  }
}
document.addEventListener("DOMContentLoaded", updateHeaderState);

const burger = document.querySelector(".burger");
const nav = document.querySelector(".header__nav");
const body = document.body;

burger.addEventListener("click", () => {
  burger.classList.toggle("burger--active");
  nav.classList.toggle("header__nav--active");

  if (nav.classList.contains("header__nav--active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }
});

const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("burger--active");
    nav.classList.remove("header__nav--active");
    body.style.overflow = "";
  });
});

const aboutSection = document.querySelector(".about");
const closeBtn = document.querySelector(".about__close");

if (closeBtn && aboutSection) {
  closeBtn.addEventListener("click", () => {
    aboutSection.style.transition = "opacity 0.3s ease";
    aboutSection.style.opacity = "0";
    setTimeout(() => {
      aboutSection.style.display = "none";
    }, 300);
  });
}

const modalTrigger = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(
  ".modal__close, .js-modal-close"
);

modalTrigger.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = trigger.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("modal--active");
      document.body.style.overflow = "hidden";
    }
  });
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modals.forEach((modal) => modal.classList.remove("modal--active"));
    document.body.style.overflow = "";
  });
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal__overlay")) {
    modals.forEach((modal) => modal.classList.remove("modal--active"));
    document.body.style.overflow = "";
  }
});

const heroExchange = document.querySelector(".js-hero-exchange");
const ordersList = document.querySelector(".js-orders-list");
const loadMoreBtn = document.querySelector(".js-load-more");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    heroExchange.classList.add("hero-exchange--compact");
  } else {
    heroExchange.classList.remove("hero-exchange--compact");
  }
});

const createOrder = () => {
  const card = document.querySelector(".order-card").cloneNode(true);
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  return card;
};

loadMoreBtn.addEventListener("click", () => {
  loadMoreBtn.textContent = "Загружаем...";

  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      const newOrder = createOrder();
      ordersList.appendChild(newOrder);

      setTimeout(() => {
        newOrder.style.transition = "all 0.4s ease";
        newOrder.style.opacity = "1";
        newOrder.style.transform = "translateY(0)";
      }, i * 100);
    }
    loadMoreBtn.textContent = "Загрузить еще";
  }, 800);
});

const recoveryBtn = document.querySelector(".js-btn-recovery");
const emailInput = document.querySelector(".js-input-email");
const codeInput = document.querySelector(".js-input-code");

if (recoveryBtn && emailInput && codeInput) {
  let isCodeSent = false;

  recoveryBtn.addEventListener("click", () => {
    if (emailInput.value.trim() === "") {
      emailInput.style.borderColor = "red";
      alert("Пожалуйста, введите E-mail");
      return;
    } else {
      emailInput.style.borderColor = "";
    }

    if (!isCodeSent) {
      const randomCode = Math.floor(1000 + Math.random() * 9000);

      codeInput.value = randomCode;

      recoveryBtn.textContent = "Войти";
      recoveryBtn.style.backgroundColor = "#1dbf73";

      isCodeSent = true;
      console.log("Код сгенерирован:", randomCode);
    } else {
      if (codeInput.value.trim() !== "") {
        localStorage.setItem("worktap_logged_in", "true");
        window.location.href = "exchange.html";
      } else {
        alert("Поле кода не может быть пустым");
      }
    }
  });

  // Живая проверка ввода кода
  codeInput.addEventListener("input", () => {
    if (emailInput.value.trim() !== "" && codeInput.value.length >= 4) {
      recoveryBtn.textContent = "Войти";
      isCodeSent = true;
    }
  });
}
