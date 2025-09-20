function setActive(button) {
  document.querySelectorAll('.bottom-nav button')
    .forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

/* Showcase Auto Slide */
let currentSlide = 0;
const showcaseContainer = document.getElementById("showcaseContainer");
setInterval(() => {
  currentSlide = (currentSlide + 1) % showcaseContainer.children.length;
  showcaseContainer.style.transform = translateX(-${currentSlide * 100}%);
}, 5000);

/* Watch History */
const watchHistoryContainer = document.getElementById("watchHistoryContainer");
let watchHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]");
function addToWatchHistory(movie) {
  watchHistory = watchHistory.filter(m => m.title !== movie.title);
  watchHistory.unshift(movie);
  if (watchHistory.length > 10) watchHistory.pop();
  localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
  renderWatchHistory();
}
function renderWatchHistory() {
  watchHistoryContainer.innerHTML = "";
  watchHistory.forEach(m => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <img src="${m.img}" alt="${m.title}">
      <div class="history-info">
        <div class="history-title">${m.title}</div>
      </div>`;
    watchHistoryContainer.appendChild(card);
  });
}
renderWatchHistory();

/* Horizontal scroll on PC with mouse wheel */
const movieContainer = document.getElementById("movieList");
movieContainer.addEventListener("wheel", e => {
  if (e.deltaY !== 0) {
    e.preventDefault();
    movieContainer.scrollBy({ left: e.deltaY, behavior: "smooth" });
  }
}, { passive:false });

/* Search Overlay */
const searchFull = document.getElementById("searchFull");
const searchInputFull = document.getElementById("searchFullInput");
const searchResultsFull = document.getElementById("searchFullResults");
const searchHistoryBox = document.getElementById("searchHistory");
let searchHistoryList = [];

function openSearchFull(){
  searchFull.classList.add("active");
  searchInputFull.focus();
}
function closeSearchFull(){
  searchFull.classList.remove("active");
}

function searchFullMovies(){
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
