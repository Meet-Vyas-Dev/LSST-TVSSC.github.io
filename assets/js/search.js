let pages = [];

// Load pages.json
fetch("pages.json")
  .then(response => response.json())
  .then(data => {
    pages = data;

    // If ?query= is in the URL, pre-fill and run search
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    if (query) {
        document.getElementById("searchInput").value = query;
        runSearch(query);
    }
  });

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

searchInput.addEventListener("input", () => {
    runSearch(searchInput.value);
});

function runSearch(query) {
    const q = query.toLowerCase().trim();
    results.innerHTML = "";

    if (!q) return;

    const filtered = pages.filter(page =>
        page.title.toLowerCase().includes(q) ||
        page.content.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
        results.innerHTML = "<li>No results found.</li>";
        return;
    }

    filtered.forEach(page => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${page.url}">${page.title}</a>`;
        results.appendChild(li);
    });
}
