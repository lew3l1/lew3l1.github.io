// Элементы
const settingsBtn   = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const themeToggle   = document.getElementById('themeToggle');
const bgToggle      = document.getElementById('bgToggle');
const bgOptions     = document.getElementById('bgOptions');

const dateSpan      = document.getElementById('date');
const timeSpan      = document.getElementById('time');

const headphonesBtn = document.getElementById('headphonesBtn');
const volumePopup   = document.getElementById('volumePopup');
const volumeSlider  = document.getElementById('volumeSlider');

// Аудио (трек-панель)
const bgAudio       = document.getElementById('bgAudio');
const audioSub      = document.querySelector('.audio-sub');
const audioMain     = document.querySelector('.audio-main');
const trackCover    = document.querySelector('.track-cover');
const marqueeText   = document.querySelector('.marquee-text');
const prevBtn       = document.querySelector('.prev-btn');
const nextBtn       = document.querySelector('.next-btn');

// Фон страницы
const bgContainer   = document.getElementById('background');


// ── Панель настроек ─────────────────────────────────────────────────────────
settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('hidden');
});

// Закрывать всё по клику вне
document.addEventListener('click', e => {
  if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
    settingsPanel.classList.add('hidden');
  }
  if (!bgOptions.contains(e.target) && e.target !== bgToggle) {
    bgOptions.classList.add('hidden');
  }
  if (!volumePopup.contains(e.target) && e.target !== headphonesBtn) {
    volumePopup.classList.add('hidden');
  }
});


// ── Дата и время ─────────────────────────────────────────────────────────────
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


// ── Ползунок громкости ───────────────────────────────────────────────────────
headphonesBtn.addEventListener('click', e => {
  e.stopPropagation();
  volumePopup.classList.toggle('hidden');
});
volumeSlider.addEventListener('input', e => {
  bgAudio.volume = e.target.value / 100;
});


// ── Смена темы ───────────────────────────────────────────────────────────────
themeToggle.addEventListener('click', e => {
  e.stopPropagation();
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  // обновляем иконку
  themeToggle.textContent = isLight ? '🌙' : '🌞';
});

// ── Смена фона ───────────────────────────────────────────────────────────────
bgToggle.addEventListener('click', e => {
  e.stopPropagation();
  bgOptions.classList.toggle('hidden');
});
document
  .querySelectorAll('input[name="bg"]')
  .forEach(radio => {
    radio.addEventListener('change', e => {
      const val = e.target.value;
      // используем CSS-переменную из :root
      bgContainer.style.backgroundImage = getComputedStyle(document.documentElement)
        .getPropertyValue(`--${val}`);
      // сразу закрываем меню
      bgOptions.classList.add('hidden');
    });
  });

// Устанавливаем дефолтный фон сразу
bgContainer.style.backgroundImage = `url('assets/img/bg/default.jpg')`;


// ── Плейлист и треки ────────────────────────────────────────────────────────
const trackList = [
  { name: 'Junkie Kis2 3', sub: 'Friendly Thug 52', src: 'assets/sound/tracks/track52.mp3', cover: 'assets/sound/icons/52.jpg' },
  { name: 'Такси', sub: 'al1xon', src: 'assets/sound/tracks/taxi.mp3',cover: 'assets/sound/icons/taxi.jpg' },
  { name: 'Sun to me', sub: 'mgk', src: 'assets/sound/tracks/mgksun.mp3', cover: 'assets/sound/icons/mgkSun.jpg' }
];
let currentTrack = 0;

function loadTrack(i) {
  const t = trackList[i];
  bgAudio.src            = t.src;
  audioSub.textContent   = t.sub;
  audioMain.textContent  = t.name;
  trackCover.src         = t.cover;
  marqueeText.textContent= `${t.name} — ${t.sub}`;
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

// автозапуск и громкость по умолчанию
bgAudio.volume = 0.5;
loadTrack(currentTrack);
let audioStarted = false;
['click','keydown'].forEach(evt => {
  document.addEventListener(evt, () => {
    if (!audioStarted) {
      bgAudio.play().catch(()=>{});
      audioStarted = true;
    }
  });
});


const trackPanel = document.querySelector('.track-panel');
const extPanel = document.querySelector('.extended-track-panel');
const extCover = document.getElementById('ext-cover');
const extName = document.getElementById('ext-name');
const extSub = document.getElementById('ext-sub');
const volumeRange = document.getElementById('volumeRange');

trackPanel.addEventListener('click', () => {
  // обновим контент
  const t = trackList[currentTrack];
  extCover.src = t.cover;
  extName.textContent = t.name;
  extSub.textContent = t.sub;

  // переключаем видимость
  extPanel.classList.toggle('hidden');
});

// громкость
volumeRange.addEventListener('input', () => {
  bgAudio.volume = volumeRange.value;
});

