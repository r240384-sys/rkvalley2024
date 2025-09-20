function setActive(button) {
  document.querySelectorAll('.bottom-nav button')
    .forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

function scrollMovies(direction) {
  const container = document.getElementById("movieList");
  const scrollAmount = 300;
  container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

/* === Showcase Auto Slider === */
let showcaseIndex = 0;
const showcaseSlides = document.querySelectorAll(".showcase-slide");

function showSlide(index) {
  showcaseSlides.forEach((slide,i) => {
    slide.classList.toggle("active", i === index);
  });
}
function nextShowcase() {
  showcaseIndex = (showcaseIndex + 1) % showcaseSlides.length;
  showSlide(showcaseIndex);
}
function prevShowcase() {
  showcaseIndex = (showcaseIndex - 1 + showcaseSlides.length) % showcaseSlides.length;
  showSlide(showcaseIndex);
}
// Auto change every 5 seconds
setInterval(nextShowcase, 5000);

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader.classList.add("hide"), 1000);
});

// ---------- Search ----------
const searchFull = document.getElementById("searchFull");
const searchInputFull = document.getElementById("searchFullInput");
const searchResultsFull = document.getElementById("searchFullResults");
const searchHistoryBox = document.getElementById("searchHistory");
let searchHistoryList = [];

function openSearchFull() {
  searchFull.classList.add("active");
  searchInputFull.focus();
}
function closeSearchFull() {
  searchFull.classList.remove("active");
  document.querySelector('.bottom-nav button').classList.add('active');
}

function searchFullMovies() {
  const input = searchInputFull.value.trim().toLowerCase();
  searchResultsFull.innerHTML = "";
  if (!input) return;

  if (!searchHistoryList.includes(input)) {
    searchHistoryList.unshift(input);
    if (searchHistoryList.length > 6) searchHistoryList.pop();
    renderSearchHistory();
  }

  document.querySelectorAll("#movieList .movie").forEach(movie => {
    const title = movie.dataset.title.toLowerCase();
    if (title.includes(input)) {
      const card = movie.cloneNode(true);
      card.style.width = "100%";
      searchResultsFull.appendChild(card);
    }
  });
}

function renderSearchHistory() {
  searchHistoryBox.innerHTML = "";
  searchHistoryList.forEach(term => {
    const btn = document.createElement("button");
    btn.textContent = term;
    btn.onclick = () => {
      searchInputFull.value = term;
      searchFullMovies();
    };
    searchHistoryBox.appendChild(btn);
  });
}
