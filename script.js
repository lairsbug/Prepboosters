document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const suggestionBox = document.getElementById("suggestions");

  // Show suggestions on focus
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) {
      suggestionBox.style.display = "block";
    }
  });

  // Hide suggestions on blur (with delay to allow click)
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      suggestionBox.style.display = "none";
    }, 150);
  });

  searchInput.addEventListener("input", () => {
    const input = searchInput.value.toLowerCase().trim();
    suggestionBox.innerHTML = ""; // Clear previous

    if (!input) {
      suggestionBox.style.display = "none";
      return;
    }

    const results = data.filter((item) =>
      item.title.toLowerCase().includes(input)
    );

    suggestionBox.style.display = "block";

    if (results.length === 0) {
      const noResult = document.createElement("div");
      noResult.className = "suggestion";
      noResult.textContent = "No books found";
      suggestionBox.appendChild(noResult);
      return;
    }

    results.forEach((item) => {
      const div = document.createElement("div");
      div.className = "suggestion";
      div.textContent = item.title;
      div.addEventListener("click", () => {
        window.open(`${item.url}?query=${item.title.trim()}`, "_self");
      });
      suggestionBox.appendChild(div);
    });
  });
});

function alignSuggestionBox() {
  const searchBar = document.querySelector("#search-input");
  const suggestionBox = document.querySelector("#suggestions");

  const rect = searchBar.getBoundingClientRect();

  suggestionBox.style.position = "absolute";
  suggestionBox.style.left = `${rect.left + window.scrollX + 40}px`;
  suggestionBox.style.top = `${rect.bottom + window.scrollY}px`;
  suggestionBox.style.width = `${rect.width - 40}px`; // Optional: match width
}

window.addEventListener("DOMContentLoaded", alignSuggestionBox);
window.addEventListener("resize", alignSuggestionBox);
window.addEventListener("scroll", alignSuggestionBox);

const params = new URLSearchParams(window.location.search);

const query = params.get("query");

const decodedQuery = decodeURIComponent(query);

function Search() {
  const query = this.value.toLowerCase().trim();
  const queryWords = query.split(/\s+/);
  const cards = document.querySelectorAll(".card-2");
  let anyMatch = false;

  cards.forEach((card) => {
    const text1 = card.querySelectorAll(".card-d")[0]?.innerText.toLowerCase() || "";
    const text2 = card.querySelectorAll(".card-d")[1]?.innerText.toLowerCase() || "";
    const text3 = card.querySelectorAll(".card-d")[2]?.innerText.toLowerCase() || "";
    const text4 = card.querySelectorAll(".card-d")[3]?.innerText.toLowerCase() || "";
    const combined = `${text1} ${text2} ${text3} ${text4}`;

    const isMatch = queryWords.every((word) => combined.includes(word));
    card.style.display = isMatch ? "block" : "none";

    if (isMatch) anyMatch = true;
  });

  const noBooks = document.getElementById("no-books");
  if (noBooks) {
    noBooks.style.display = anyMatch ? "none" : "flex";
  }
}


window.addEventListener("DOMContentLoaded", () => {
  if (query != null) {
  document.getElementById("search-input").value = decodedQuery;
  Search.call(document.getElementById("search-input")); // Call Search function with the input element
}});
document.getElementById("search-input").addEventListener("input", function () {
  Search.call(this);
});
