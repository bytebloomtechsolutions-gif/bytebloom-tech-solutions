const grid = document.getElementById('projectGrid');
if (grid && window.BYTEBLOOM_PROJECTS) {
  const categories = [...new Set(window.BYTEBLOOM_PROJECTS.map(project => project.category))];
  const filters = document.getElementById('projectFilters');
  filters.innerHTML = ['All', ...categories].map((category, index) =>
    `<button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${category}">${index === 0 ? 'All projects' : category}</button>`
  ).join('');

  function render(category = 'All') {
    const projects = window.BYTEBLOOM_PROJECTS.filter(project => category === 'All' || project.category === category);
    grid.innerHTML = projects.map(project => `
      <article class="project-card reveal">
        <div class="project-card-body">
          <div class="project-card-top"><span class="project-kicker">PROJECT ${String(project.id).padStart(2, '0')}</span><span class="project-type-pill">${project.category}</span></div>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="tag-row">${project.tech.slice(0, 5).map(technology => `<span class="tag">${technology}</span>`).join('')}</div>
          <details class="project-detail">
            <summary>Explore project details</summary>
            <p><b>Key features:</b> ${project.features.join(' · ')}</p>
            <p><b>Technologies:</b> ${project.tech.join(', ')}</p>
            ${project.demo ? `<a class="card-link" href="${project.demo}" target="_blank" rel="noopener">View project demo ↗</a>` : ''}
          </details>
        </div>
      </article>`).join('');
    grid.querySelectorAll('.reveal').forEach(element => requestAnimationFrame(() => element.classList.add('visible')));
  }

  render();
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-category]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button));
    render(button.dataset.category);
  });
}
