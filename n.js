// Flip Card Function
function flipCard(card) {
    const inner = card.querySelector('.card-inner');
    inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
}

// Open Gift Function
function openGift() {
    const box = document.querySelector('.box');
    const lid = document.querySelector('.lid');
    const content = document.getElementById('gift-content');
    lid.style.transform = 'rotateX(-90deg)';
    setTimeout(() => {
        content.style.opacity = '1';
    }, 500);
}

// 3D Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide-3d');

function nextSlide3D() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    updateCarousel();
}

function updateCarousel() {
    slides.forEach((slide, index) => {
        const angle = (index - currentSlide) * 60;
        slide.style.transform = `translateZ(-200px) rotateY(${angle}deg)`;
    });
}

// Countdown Timer
const birthday = new Date('December 25, 2024 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('timer').innerHTML = '<p>Happy Birthday!</p>';
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

// Confetti Canvas
const confettiCanvas = document.getElementById('confetti');
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiParticles = [];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 5 + 2
        });
    }
}

function updateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravity

        if (particle.y > confettiCanvas.height) {
            particle.y = 0;
            particle.x = Math.random() * confettiCanvas.width;
        }

        confettiCtx.fillStyle = particle.color;
        confettiCtx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });
    requestAnimationFrame(updateConfetti);
}

createConfetti();
updateConfetti();

// Fireworks Canvas
const fireworksCanvas = document.getElementById('fireworks');
const fireworksCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

const fireworks = [];

function createFirework() {
    const x = Math.random() * fireworksCanvas.width;
    const y = fireworksCanvas.height;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    fireworks.push({ x, y, color, particles: [] });

    for (let i = 0; i < 20; i++) {
        fireworks[fireworks.length - 1].particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 100
        });
    }
}

function updateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworks.forEach((firework, fi) => {
        firework.particles.forEach((particle, pi) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1;
            particle.life--;

            if (particle.life <= 0) {
                firework.particles.splice(pi, 1);
            } else {
                fireworksCtx.fillStyle = firework.color;
                fireworksCtx.fillRect(particle.x, particle.y, 2, 2);
            }
        });

        if (firework.particles.length === 0) {
            fireworks.splice(fi, 1);
        }
    });

    if (Math.random() < 0.05) {
        createFirework();
    }

    requestAnimationFrame(updateFireworks);
}

updateFireworks();

// Resize Canvases
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
});

// Particle Burst Effects on Button Hovers
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        createParticleBurst(e.clientX, e.clientY);
    });
});

function createParticleBurst(x, y) {
    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'fixed';
    burstContainer.style.left = x + 'px';
    burstContainer.style.top = y + 'px';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = 1000;
    document.body.appendChild(burstContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.position = 'absolute';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.left = '0px';
        particle.style.top = '0px';
        particle.style.opacity = '1';
        burstContainer.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 80 + 20;
        const xDest = Math.cos(angle) * distance;
        const yDest = Math.sin(angle) * distance;

        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${xDest}px, ${yDest}px)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });

        setTimeout(() => {
            particle.remove();
            if (burstContainer.childElementCount === 0) {
                burstContainer.remove();
            }
        }, 600);
    }
}

function setName() {
    // Removed as per user request
}

// Cake pop up and candle blow out feature
const cake = document.querySelector('.cake');
const candle = document.querySelector('.candle');
const cakeButton = document.getElementById('cake-button');
const micStatus = document.getElementById('mic-status');

let cakePopped = false;
let candleLit = true;
let micStream = null;
let audioContext = null;
let analyser = null;
let dataArray = null;
let animationId = null;

function popCake() {
    cake.style.transform = 'scale(1)';
    cakePopped = true;
}

function hideCake() {
    cake.style.transform = 'scale(0)';
    cakePopped = false;
}

function blowOutCandle() {
    if (candleLit) {
        candle.style.opacity = '0.3';
        candleLit = false;
    }
}

function lightCandle() {
    if (!candleLit) {
        candle.style.opacity = '1';
        candleLit = true;
    }
}

cakeButton.addEventListener('mousedown', () => {
    popCake();
    lightCandle();
});

cakeButton.addEventListener('mouseup', () => {
    // Wait for blow detection to turn off candle
});

async function startMic() {
    try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(micStream);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        micStatus.textContent = 'Microphone access granted. Blow to turn off candle.';
        detectBlow();
    } catch (err) {
        micStatus.textContent = 'Microphone access denied or not available.';
    }
}

function detectBlow() {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    if (average > 50 && cakePopped && candleLit) {
        blowOutCandle();
    }
    animationId = requestAnimationFrame(detectBlow);
}

startMic();

window.addEventListener('beforeunload', () => {
    if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
    }
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});
