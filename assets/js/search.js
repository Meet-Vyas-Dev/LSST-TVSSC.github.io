let pages = [];

fetch("pages.json")
  .then(response => response.json())
  .then(data => {
      pages = data;
  });

const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    results.innerHTML = '';

    if (!query) return;

    const filtered = pages.filter(page =>
        page.title.toLowerCase().includes(query) ||
        page.content.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        results.innerHTML = '<li>No results found.</li>';
        return;
    }

    filtered.forEach(page => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${page.url}">${page.title}</a>`;
        results.appendChild(li);
    });
});
