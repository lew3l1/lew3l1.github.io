// Элементы настроек
const settingsBtn   = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const themeToggle   = document.getElementById('themeToggle');
const bgToggle      = document.getElementById('bgToggle');
const bgOptions     = document.getElementById('bgOptions');

// Дата/время
const dateSpan = document.getElementById('date');
const timeSpan = document.getElementById('time');

// Громкость
const headphonesBtn = document.getElementById('headphonesBtn');
const volumePopup   = document.getElementById('volumePopup');
const volumeSlider  = document.getElementById('volumeSlider');

// Аудио
const bgAudio  = document.getElementById('bgAudio');
const audioSub = document.querySelector('.audio-sub');
const audioMain= document.querySelector('.audio-main');

// Панель треков
const trackCover  = document.querySelector('.track-cover');
const marqueeText = document.querySelector('.marquee-text');
const prevBtn     = document.querySelector('.prev-btn');
const nextBtn     = document.querySelector('.next-btn');

// Фон страницы
const bgContainer = document.getElementById('background');

// ── Toggles ────────────────────────────────────────────────────────────────
settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('hidden');
});

themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  themeToggle.textContent = isLight ? '🌙' : '🌞';
});

bgToggle.addEventListener('click', () => {
  bgOptions.classList.toggle('hidden');
});
document.querySelectorAll('input[name="bg"]').forEach(radio => {
  radio.addEventListener('change', e => {
    const val = e.target.value;
    bgContainer.style.backgroundImage = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${val}`);
  });
});

// ── Дата и время ────────────────────────────────────────────────────────────
function updateDateTime() {
  const now = new Date();
  const mm  = String(now.getMonth()+1).padStart(2,'0');
  const dd  = String(now.getDate()).padStart(2,'0');
  const hh12= now.getHours() % 12 || 12;
  const min = String(now.getMinutes()).padStart(2,'0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  dateSpan.textContent = `${mm}/${dd}`;
  timeSpan.textContent = `${hh12}:${min} ${ampm}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// ── Громкость ──────────────────────────────────────────────────────────────
headphonesBtn.addEventListener('click', () => {
  volumePopup.classList.toggle('hidden');
});
volumeSlider.addEventListener('input', e => {
  bgAudio.volume = e.target.value / 100;
});

// ── Плейлист и треки ───────────────────────────────────────────────────────
const trackList = [
  { name: '52', sub: 'Jusnkie Kis2 3', src: 'assets/sound/tracks/track52.mp3', cover: 'assets/sound/icons/52.jpg' },
  { name: 'Al1xion', sub: 'Taxi',    src: 'assets/sound/tracks/taxi.mp3',    cover: 'assets/sound/icons/taxi.jpg' }
];
let currentTrack = 0;

function loadTrack(i) {
  const t = trackList[i];
  bgAudio.src       = t.src;
  audioSub.textContent  = t.sub;
  audioMain.textContent = t.name;
  trackCover.src        = t.cover;
  marqueeText.textContent = `${t.name} — ${t.sub}`;
  bgAudio.play().catch(() => {});
}

prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + trackList.length) % trackList.length;
  loadTrack(currentTrack);
});
nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % trackList.length;
  loadTrack(currentTrack);
});

// громкость по умолчанию и автозапуск после клика/нажатия
bgAudio.volume = 0.2;
loadTrack(currentTrack);
let audioStarted = false;
['click','keydown'].forEach(evt =>
  document.addEventListener(evt, () => {
    if (!audioStarted) {
      bgAudio.play().catch(() => {});
      audioStarted = true;
    }
  })
);


// Фон по умолчанию
const defaultBg = 'assets/img/bg/default.jpg';

// Смена фона при нажатии
bgToggle.addEventListener('click', () => {
  bgOptions.classList.toggle('hidden');
});

document.querySelectorAll('input[name="bg"]').forEach(radio => {
  radio.addEventListener('change', e => {
    const val = e.target.value;
    bgContainer.style.backgroundImage = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${val}`);
  });
});

// Устанавливаем дефолтный фон
bgContainer.style.backgroundImage = `url(${defaultBg})`;

// Смена темы
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  themeToggle.textContent = isLight ? '🌙' : '🌞';
});


