let samplesSets = [[], [], []];
let animations = [];
let currentSetIndex = 0;

// Brighter Color Palettes for animations
const colorPalettes = [
  ["#E46A43", "#9B8E32", "#BD96AD", "#DBF585", "#86BEEB"], // Modern Set 1
  ["#86BEEB", "#DBF585", "#9B8E32", "#BD96AD", "#E46A43"], // Modern Set 2
  ["#86BEEB", "#BD96AD", "#E46A43", "#DBF585", "#9B8E32"], // Modern Set 3
];

// Background Colors
const backgroundColors = [
  "#E3E4D7", // Light background for Set 1
  "#EDCCB4", // Deep background for Set 2
  "#444B37", // Dark background for Set 3
];

function resumeAudioContext() {
    console.log('AudioContext state before resume:', getAudioContext().state);
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume().then(() => {
            console.log('AudioContext resumed successfully');
        }).catch((err) => {
            console.error('Failed to resume AudioContext:', err);
        });
    }
}

function playSilentAudio() {
    const silence = new p5.SoundFile();
    silence.playMode('sustain');
    silence.play();
    silence.stop();
}

function preload() {
    playSilentAudio(); 
    const loadSounds = (prefix, start, end, index) => {
        for (let i = start; i <= end; i++) {
            samplesSets[index].push(
                loadSound(
                    `${prefix}_${i}.mp3?v=${Date.now()}`, // Adding timestamp for cache-busting
                    () => {
                        console.log(`Loaded ${prefix}_${i}.mp3?v=${Date.now()}`);
                    },
                    (err) => {
                        console.error(`Failed to load ${prefix}_${i}.mp3?v=${Date.now()}`, err);
                    }
                )
            );
        }
    };

    loadSounds("1st", 0, 9, 0);
    loadSounds("2nd", 11, 20, 1);
    loadSounds("3rd", 21, 30, 2);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    colorMode(RGB, 255);
    textAlign(CENTER, CENTER);
    textSize(24);
    resumeAudioContext();
}

function draw() {
    background(backgroundColors[currentSetIndex]);
    animations.forEach((anim) => anim.draw());
    animations = animations.filter((anim) => anim.alpha > 0); // Remove faded-out animations
}

let isFirstInteraction = true;

function touchStarted() {
    if (isFirstInteraction) {
        reinitializeAudio();
        isFirstInteraction = false;
    }
    handleInteraction(touches[0].x);
    resumeAudioContext();
}

function reinitializeAudio() {
    samplesSets.forEach((set) => {
        set.forEach((sample) => {
            sample.stop();
            sample.play();
            sample.stop(); 
        });
    });
    console.log('Audio reinitialized on first interaction');
}

function mousePressed() {
    if (isComputer()) {
        handleInteraction(mouseX);
    }
    resumeAudioContext();
}

function keyPressed(event) {
    if (key === ' ') {
        event.preventDefault();
        toggleAnimationSet(); // Toggle set with space bar
    } else if (key >= "0" && key <= "9") {
        const index = parseInt(key);
        playAnimation(index);
    }
}

function handleInteraction(x) {
    const index = floor(map(x, 0, width, 0, 11)); // Map to 11 blocks (0-9 + toggle)

    if (index === 10) {
        toggleAnimationSet(); // Toggle set if touching the last block
    } else if (index >= 0 && index < 10) {
        playAnimation(index); // Play animation corresponding to the block
    }
}

function playAnimation(index) {
    resumeAudioContext();
    const samples = samplesSets[currentSetIndex];
    const colors = colorPalettes[currentSetIndex];
    const animationClass = Animations[index];

    if (animationClass) {
        resumeAudioContext();
        samples[index].play();
        const newAnim = new animationClass(random(colors));
        animations.push(newAnim);
        if (animations.length > 10) animations.shift(); // Limit animations
    } else {
        console.error(`Animation class for index ${index} is undefined.`);
    }
}

function toggleAnimationSet() {
    currentSetIndex = (currentSetIndex + 1) % 3;
    animations = []; // Clear current animations on toggle
}

// Base Animation Class
class BaseAnimation {
    constructor(color) {
        this.color = color;
        this.alpha = 255;
        this.fadeRate = 2; // Fade out rate
    }

    fadeOut() {
        this.alpha = max(0, this.alpha - this.fadeRate);
    }

    fillWithAlpha() {
        fill(`${this.color}${hex(this.alpha, 2)}`);
    }
}

// Animation Classes
class Anim_0 extends BaseAnimation {
    constructor(color) {
        super(color);
        this.size = 20;
        this.angle = random(TWO_PI);
    }

    draw() {
        this.fillWithAlpha();
        const x = width / 2 + 100 * cos(this.angle);
        const y = height / 2 + 100 * sin(this.angle);
        ellipse(x, y, this.size, this.size);
        this.size += 5;
        this.angle += 0.1;
        this.fadeOut();
    }
}

class Anim_1 extends BaseAnimation {
    constructor(color) {
        super(color);
        this.size = 20;
    }

    draw() {
        this.fillWithAlpha();
        rect(width / 4, height / 2 - 25, this.size, 100);
        this.size += 5;
        this.fadeOut();
    }
}

// (Continue with remaining Anim_* classes as defined)

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function isComputer() {
    return !/Mobi|Android/i.test(navigator.userAgent);
}
