const API_KEY = 'AIzaSyAgvz-UMSloCZd4nGzs4HaXvMyEIgVr3ns'; // Replace if needed
const grid = document.getElementById("videoGrid");
const searchInput = document.getElementById("searchInput");

// Creates a clickable card with thumbnail and title
function createVideoCard(video) {
  const videoId = video.id.videoId || video.id; // handles both search and default load
  const thumbnail = video.snippet.thumbnails.medium.url;
  const title = video.snippet.title;

  const div = document.createElement("div");
  div.className = "video";
  div.innerHTML = `
    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">
      <img src="${thumbnail}" alt="${title}">
      <h3>${title}</h3>
    </a>
  `;
  return div;
}

// YouTube API Search
async function searchYouTube(query) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent(query + " song")}&videoEmbeddable=true&key=${API_KEY}`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.items && data.items.length) {
      grid.innerHTML = '';
      data.items.forEach(item => {
        grid.appendChild(createVideoCard(item));
      });
    } else {
      grid.innerHTML = "<p>No music results found.</p>";
    }
  } catch (error) {
    console.error('YouTube API error:', error);
    grid.innerHTML = "<p>Error loading videos. Check your API key or quota.</p>";
  }
}

// Load static default videos
const defaultVideos = [
  "lLjvsAyEj-g", 
  "4gNaG4g6xdM", 
  "c6RgA4VZ4Hk",
  "uu7j_xljCRY", 
  "u2ah9tWTkmk",
  "ajvS3QAG0Z0"
];

async function loadDefaultVideos() {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${defaultVideos.join(",")}&key=${API_KEY}`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.items && data.items.length) {
      grid.innerHTML = '';
      data.items.forEach(item => {
        grid.appendChild(createVideoCard(item));
      });
    }
  } catch (error) {
    console.error("Default video load error:", error);
    grid.innerHTML = "<p>Error loading default videos.</p>";
  }
}

// Listen for "Enter" on search bar
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query.length > 2) {
      searchYouTube(query);
    }
  }
});

// Load default videos on page load
loadDefaultVideos();
