const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const heartBtn = document.getElementById("heartBtn");
const messageCard = document.getElementById("messageCard");

const letterCards = document.querySelectorAll(".letter-card");
const letterPopup = document.getElementById("letterPopup");
const letterText = document.getElementById("letterText");
const closeLetter = document.getElementById("closeLetter");
const envelope = document.getElementById("envelope");

let musicStartedOnce = false;

const letters = {
  sad:
    "Hey Alisha ❤️\n\nIf you're reading this because you're sad, I just want you to remember how strong and beautiful you are. Whatever is bothering you right now is temporary.\n\nBut my love for you isn't.\n\nTake a deep breath. I'm always here for you.\n\n— Anubhav",

  miss:
    "Alisha ❤️\n\nIf you miss me right now... just smile.\n\nBecause somewhere, at this exact moment, I'm probably thinking about you too.\n\nNo distance can reduce what we have.\n\n— Anubhav",

  sleep:
    "Alisha 🌙❤️\n\nCan't sleep?\n\nClose your eyes and imagine I'm holding your hand.\n\nNo stress. No noise. Just peace. Just us.\n\nSweet dreams.\n\n— Anubhav",

  motivation:
    "Alisha ❤️\n\nYou are capable of incredible things.\n\nNever forget how intelligent, kind, and unstoppable you are.\n\nIf you ever doubt yourself, read this again.\n\nI'm always proud of you.\n\n— Anubhav",
};

/* Reveal message + scroll (music does NOT auto-start here) */
function revealMessage() {
  messageCard.classList.add("show");

  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth",
  });
}

/* Toggle music */
function toggleMusic() {
  if (music.paused) {
    music.play().catch(() => {});
    musicToggle.innerText = "🔈";
    musicStartedOnce = true;
  } else {
    music.pause();
    musicToggle.innerText = "🔇";
  }
}

/* Open letter (envelope animation + auto music start) */
function openLetter(key) {
  letterText.innerText = letters[key];
  letterPopup.style.display = "flex";

  envelope.classList.remove("open");
  requestAnimationFrame(() => {
    envelope.classList.add("open");
  });

  // Music starts when a letter opens
  music.play().catch(() => {});
  musicToggle.innerText = "🔈";
  musicStartedOnce = true;
}

/* Close letter popup */
function closeLetterPopup() {
  envelope.classList.remove("open");
  setTimeout(() => {
    letterPopup.style.display = "none";
  }, 250);
}

/* Floating hearts */
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart-bg";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.innerText = "❤️";
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

/* Events */
heartBtn.addEventListener("click", revealMessage);
musicToggle.addEventListener("click", toggleMusic);

letterCards.forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.getAttribute("data-letter");
    openLetter(key);
  });
});

closeLetter.addEventListener("click", closeLetterPopup);

letterPopup.addEventListener("click", (e) => {
  if (e.target === letterPopup) closeLetterPopup();
});

/* Hearts loop */
setInterval(spawnHeart, 500);
