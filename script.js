// Header: ganha fundo quando o topo do hero sai da tela
const nav = document.querySelector(".nav");
const sentinel = document.querySelector(".hero__sentinel");
if (sentinel && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    nav.classList.toggle("is-scrolled", !entry.isIntersecting);
  }).observe(sentinel);
} else {
  nav.classList.add("is-scrolled");
}

// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const mobile = document.getElementById("menu-mobile");
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  toggle.textContent = open ? "Fechar" : "Menu";
  mobile.hidden = !open;
  nav.classList.toggle("menu-open", open);
};
toggle.addEventListener("click", () => setMenu(mobile.hidden));
mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Animação de entrada
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains("reveal"));
      entry.target.style.transitionDelay = `${Math.min(siblings.indexOf(entry.target), 6) * 70}ms`;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("is-in"));
}

// FAQ: um aberto por vez
const faqs = document.querySelectorAll(".faq details");
faqs.forEach((d) => d.addEventListener("toggle", () => {
  if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
}));

document.getElementById("ano").textContent = new Date().getFullYear();

// Galeria: filtros
const shots = [...document.querySelectorAll(".shot")];
const chips = document.querySelectorAll(".chip");
chips.forEach((chip) => chip.addEventListener("click", () => {
  chips.forEach((c) => {
    c.classList.toggle("is-active", c === chip);
    c.setAttribute("aria-pressed", String(c === chip));
  });
  shots.forEach((s) => { s.hidden = chip.dataset.filter !== "todos" && s.dataset.cat !== chip.dataset.filter; });
}));

// Galeria: foto ampliada, navegando só entre as fotos visíveis
const box = document.querySelector(".lightbox");
if (box && typeof box.showModal === "function") {
  const boxImg = box.querySelector(".lightbox__img");
  const boxCap = box.querySelector(".lightbox__caption");
  const visible = () => shots.filter((s) => !s.hidden);
  let current = 0;
  const show = (i) => {
    const list = visible();
    current = (i + list.length) % list.length;
    const btn = list[current].querySelector(".shot__btn");
    const thumb = btn.querySelector("img");
    boxImg.src = btn.dataset.full;
    boxImg.alt = thumb.alt;
    boxCap.textContent = thumb.alt;
  };
  shots.forEach((s) => s.querySelector(".shot__btn").addEventListener("click", () => {
    show(visible().indexOf(s));
    box.showModal();
  }));
  box.querySelector(".lightbox__close").addEventListener("click", () => box.close());
  box.querySelector(".lightbox__prev").addEventListener("click", () => show(current - 1));
  box.querySelector(".lightbox__next").addEventListener("click", () => show(current + 1));
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
  box.addEventListener("close", () => boxImg.removeAttribute("src"));
}
