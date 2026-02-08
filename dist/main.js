// ================================================================
// CONFIGURATION — Update this after running the upload script
// ================================================================
const R2_BASE_URL = 'https://photos.madeforjennywith.love';

// Photo captions — map image filenames (keys in R2) to captions.
// Photos not listed here will get no caption.
// The order in the manifest determines gallery order.
const CAPTIONS = {
  'wedding/001.webp': '01.29.2024',
  'wedding/002.webp': 'the best day',
  'wedding/003.webp': 'I do ❤',
  'wedding/004.webp': 'partners in crime',
  'wedding/005.webp': 'forever & always',
  'wedding/006.webp': 'us ❤',
  'wedding/007.webp': 'that look tho',
  'wedding/008.webp': '01.29.24',
  'wedding/009.webp': 'my favorite person',
  'wedding/010.webp': 'Mr. & Mrs.',
  'wedding/011.webp': 'the vibes',
  'wedding/012.webp': '❤ ❤ ❤',
  // Photos without a caption entry here will still appear in the gallery.
};

// ================================================================
// GALLERY — Fetch manifest and render polaroids
// ================================================================
async function loadGallery() {
  const gallery = document.getElementById('galleryScroll');

  try {
    const res = await fetch(R2_BASE_URL + '/manifest.json');
    if (!res.ok) throw new Error('manifest fetch failed');
    const manifest = await res.json();

    gallery.innerHTML = '';

    manifest.forEach(function(photo) {
      var div = document.createElement('div');
      div.className = 'polaroid';

      var img = document.createElement('img');
      img.src = R2_BASE_URL + '/' + photo.key;
      img.alt = 'Wedding photo';
      img.loading = 'lazy';

      div.appendChild(img);

      var caption = CAPTIONS[photo.key];
      if (caption) {
        var cap = document.createElement('div');
        cap.className = 'caption';
        cap.textContent = caption;
        div.appendChild(cap);
      }

      gallery.appendChild(div);
    });
  } catch (err) {
    console.warn('Gallery load failed, falling back to static images:', err);
    // Fallback: if manifest isn't available yet, show a friendly message
    gallery.innerHTML =
      '<div class="gallery-loading">Photos coming soon! &#10084;</div>';
  }
}

loadGallery();

// ============ YOUTUBE PLAYER (envelope overlay) ============
var songVideoPlayer = null;
var envelopeOpenedByUser = false;

function onYouTubeIframeAPIReady() {
  songVideoPlayer = new YT.Player('song-video-player', {
    height: '100%',
    width: '100%',
    videoId: 'o7L_PYzkxEc',
    playerVars: {
      enablejsapi: 1,
      origin: window.location.origin
    },
    events: {}
  });
  if (envelopeOpenedByUser && songVideoPlayer.unMute && songVideoPlayer.playVideo) {
    songVideoPlayer.unMute();
    songVideoPlayer.playVideo();
  }
}

(function initEnvelopeOverlay() {
  var overlay = document.getElementById('videoEnvelopeOverlay');
  if (!overlay) return;

  overlay.addEventListener('click', function openEnvelope() {
    overlay.classList.add('opening');
    envelopeOpenedByUser = true;

    if (songVideoPlayer && songVideoPlayer.playVideo && songVideoPlayer.unMute) {
      songVideoPlayer.unMute();
      songVideoPlayer.playVideo();
    }

    setTimeout(function() {
      overlay.classList.add('opened');
    }, 700);
  });
})();

// ============ FLOATING HEARTS ============
const heartsContainer = document.getElementById('doodleHearts');
const heartSymbols = ['&#10084;', '&#10085;', '&#9825;', '&#10083;'];

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'doodle-heart';
  heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (Math.random() * 20 + 12) + 'px';
  heart.style.color = Math.random() > 0.5 ? 'var(--warm-pink)' : 'var(--dusty-rose)';
  heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
  heart.style.animationDelay = Math.random() * 5 + 's';
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 25000);
}

// Create initial batch
for (let i = 0; i < 8; i++) {
  setTimeout(createHeart, i * 600);
}
setInterval(createHeart, 3000);

// ============ SCROLL ANIMATIONS ============
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reason-card, .timeline-item').forEach(el => {
  observer.observe(el);
});

// ============ CLICK HEARTS ============
document.addEventListener('click', (e) => {
  const heart = document.createElement('div');
  heart.className = 'click-heart';
  heart.innerHTML = ['&#10084;', '&#10085;', '&#9825;'][Math.floor(Math.random() * 3)];
  heart.style.left = e.clientX + 'px';
  heart.style.top = e.clientY + 'px';
  heart.style.color = Math.random() > 0.5 ? 'var(--warm-pink)' : 'var(--deep-rose)';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
});
