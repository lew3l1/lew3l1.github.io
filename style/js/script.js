// Панель настроек
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const headphonesBtn = document.getElementById("headphonesBtn");
const volumePopup = document.getElementById("volumePopup");
const datetimeBox = document.getElementById("datetime");

// Показ панели настроек
settingsBtn.addEventListener("click", () => {
  settingsPanel.classList.toggle("hidden");
});

// Показ/скрытие громкости
headphonesBtn.addEventListener("click", () => {
  volumePopup.classList.toggle("hidden");
});

// Обновление даты и времени
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
  datetimeBox.textContent = now.toLocaleString('en-GB', options);
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Аудио
const bgAudio = document.getElementById("bgAudio");
const volumeSlider = document.getElementById("volumeSlider");
const audioMain = document.querySelector(".audio-main");
const audioSub = document.querySelector(".audio-sub");
const trackCover = document.querySelector(".track-cover");

// Треки
const trackList = [
  {
    name: "TW.027",
    sub: "Our last project",
    src: "assets/sound/tracks/track52.mp3",
    cover: "assets/sound/icons/52.jpg"
  },
  {
    name: "TW.028",
    sub: "Next one here",
    src: "assets/sound/tracks/taxi.mp3",
    cover: "assets/sound/icons/taxi.jpg"
  }
];

let currentTrack = 0;

function loadTrack(index) {
    const track = trackList[index];
  
    // Добавляем fade-out
    audioMain.classList.add("fade-out");
    audioSub.classList.add("fade-out");
    trackCover.classList.add("fade-out");
  
    // Через 400мс меняем содержимое и добавляем fade-in
    setTimeout(() => {
      bgAudio.src = track.src;
      audioMain.textContent = track.name;
      audioSub.textContent = track.sub;
      trackCover.src = track.cover;
  
      // Плавное появление
      audioMain.classList.remove("fade-out");
      audioSub.classList.remove("fade-out");
      trackCover.classList.remove("fade-out");
  
      audioMain.classList.add("fade-in");
      audioSub.classList.add("fade-in");
      trackCover.classList.add("fade-in");
  
      // Убираем fade-in через небольшой промежуток, чтобы можно было переиспользовать
      setTimeout(() => {
        audioMain.classList.remove("fade-in");
        audioSub.classList.remove("fade-in");
        trackCover.classList.remove("fade-in");
      }, 400);
  
      bgAudio.play().catch(() => {});
    }, 400);
  }
  

// Переключение треков
document.querySelectorAll(".arrow-btn").forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    currentTrack = idx === 0
      ? (currentTrack - 1 + trackList.length) % trackList.length
      : (currentTrack + 1) % trackList.length;
    loadTrack(currentTrack);
  });
});

// Громкость по умолчанию
bgAudio.volume = 0.1;

// Изменение громкости
volumeSlider.addEventListener("input", (e) => {
  bgAudio.volume = e.target.value / 100;
});

// Автовоспроизведение после первого взаимодействия
let audioStarted = false;
function tryStartAudio() {
  if (!audioStarted) {
    bgAudio.play().catch(() => {});
    audioStarted = true;
  }
}
document.addEventListener("click", tryStartAudio);
document.addEventListener("keydown", tryStartAudio);

// Первая загрузка трека
loadTrack(currentTrack);
