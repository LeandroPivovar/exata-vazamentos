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
