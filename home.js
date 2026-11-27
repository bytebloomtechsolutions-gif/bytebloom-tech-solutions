// Small enhancement for the home page. The site remains usable without JavaScript.
document.querySelectorAll('.service-card, .project-card').forEach((card, index) => {
  card.style.animationDelay = `${index * 90}ms`;
});
