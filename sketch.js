let samplesSets = [[], [], []];
let animations = [];
let currentSetIndex = 0;
let track11; // Variable for Track_11.wav

// Color Palettes for animations
const colorPalettes = [
  ["#261201", "#ED8008", "#315B7B", "#D8A367", "#736B1E"], // Set 1
  ["#AAB7BF", "#E15E3E", "#D8A367", "#BEBAB0", "#292A2E"], // Set 2
  ["#315B7B", "#736356", "#AAB7BF", "#F07032", "#F1B73A"], // Set 3
];

// Background Colors
const backgroundColors = [
  "#DADCD0", // Background for Set 1
  "#AE2F25", // Background for Set 2
  "#261201", // Background for Set 3
];

function preload() {
  // Load sounds for each set
  for (let i = 0; i <= 9; i++) {
    samplesSets[0].push(loadSound(`Track_${i}.wav`));
  }
  for (let i = 12; i <= 21; i++) {
    samplesSets[1].push(loadSound(`Alt_Track_${i}.wav`));
  }
  for (let i = 22; i <= 31; i++) {
    samplesSets[2].push(loadSound(`New_Track_${i}.wav`));
  }
  track11 = loadSound("Track_11.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fullscreen(true); // Enable fullscreen mode
  noStroke();
  colorMode(RGB, 255);
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  const backgroundColor = backgroundColors[currentSetIndex];
  background(backgroundColor); // Set background to the current set color
  animations.forEach((anim) => anim.draw());
}

function keyPressed() {
  if (key === "Enter") {
    track11.isPlaying() ? track11.stop() : track11.loop();
  } else if (key >= "0" && key <= "9") {
    playAnimation(key);
  } else if (key === " ") {
    toggleAnimationSet();
  }
}

function playAnimation(key) {
  const samples = samplesSets[currentSetIndex];
  const colors = colorPalettes[currentSetIndex];
  const animationClass = Animations[key];

  if (animationClass) {
    samples[parseInt(key)].play();
    const newAnim = new animationClass(random(colors));
    animations.push(newAnim);
    if (animations.length > 10) animations.shift(); // Limit animations
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
    this.fadeRate = 2; // Slightly faster fade out for a tighter feel
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
    this.size = 10; // Start smaller for smoother feel
    this.angle = random(TWO_PI);
  }

  draw() {
    this.fillWithAlpha();
    const x = width / 2 + 100 * cos(this.angle);
    const y = height / 2 + 100 * sin(this.angle);
    ellipse(x, y, this.size, this.size);
    this.size += 3; // Slightly faster growth
    this.angle += 0.05;
    this.fadeOut();
  }
}

class Anim_1 extends BaseAnimation {
  constructor(color) {
    super(color);
    this.size = 0;
  }

  draw() {
    this.fillWithAlpha();
    rect(width / 4, height / 2 - 25, this.size, 70);
    this.size += 3;
    this.fadeOut();
  }
}

class Anim_2 extends BaseAnimation {
  constructor(color) {
    super(color);
    this.angle = 0;
    this.size = 250;
  }

  draw() {
    this.fillWithAlpha();
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    pop();
    this.angle += 0.05;
    this.fadeOut();
  }
}

class Anim_3 extends BaseAnimation {
  constructor(color) {
    super(color);
  }

  draw() {
    this.fillWithAlpha();
    rect(0, 0, width, height);
    this.fadeOut();
  }
}

class Anim_4 extends BaseAnimation {
  constructor(color) {
    super(color);
    this.posy = height + 50;
  }

  draw() {
    this.fillWithAlpha();
    rect(0, this.posy - 50, width, 70);
    this.posy *= 0.9;
    this.fadeOut();
  }
}

class Anim_5 extends BaseAnimation {
  constructor(color) {
    super(color);
    this.posy = height + 50;
  }

  draw() {
    this.fillWithAlpha();
    rect(0, this.posy - 50, width, 50);
    rect(0, height - this.posy, width, 50);
    this.posy *= 0.95;
  }
}

class Anim_6 extends BaseAnimation {
  constructor(color) {
    super(color);
    this.size = 80;
    this.x = random(width);
    this.y = random(height);
  }

  draw() {
    this.fillWithAlpha();
    ellipse(this.x, this.y, this.size, this.size);
    this.fadeOut();
  }
}

class Anim_7 extends BaseAnimation {
  constructor(color) {
    super(color);
    this.angle = 0;
    this.size = 70;
    this.amplitude = 30;
  }

  draw() {
    this.fillWithAlpha();
    const x = width / 2 + this.size * cos(this.angle);
    const y = height / 2 + this.size * sin(this.angle) + this.amplitude * sin(frameCount * 0.1);
    ellipse(x, y, 140, 140);
    this.angle += 0.05;
    this.size += 0.5;
    this.fadeOut();
  }
}

class Anim_8 extends BaseAnimation {
  constructor(color) {
    super(color);
    this.height = 0;
  }

  draw() {
    this.fillWithAlpha();
    noStroke();
    rect(0, height / 2 - this.height / 2, width, this.height);
    this.height = min(this.height + 6, height);
    this.fadeOut();
  }
}

class Anim_9 extends BaseAnimation {
  constructor(color) {
    super(color);
    this.x = -width;
    this.speed = 70;
    this.alpha = 255;
    this.hasCovered = false;
    this.isActive = true;
  }

  draw() {
    if (!this.isActive) return;

    noStroke();
    this.fillWithAlpha();

    if (!this.hasCovered) {
      rect(this.x, 0, width, height);
      this.x += this.speed * 0.1;
      if (this.x >= 0) {
        this.hasCovered = true;
      }
    } else {
      this.alpha = max(0, this.alpha - 4);
      if (this.alpha === 0) {
        this.isActive = false;
      } else {
        fill(255, this.alpha);
        rect(0, 0, width, height);
      }
    }
  }
}

// Map keys to animations
const Animations = {
  0: Anim_0,
  1: Anim_1,
  2: Anim_2,
  3: Anim_3,
  4: Anim_4,
  5: Anim_5,
  6: Anim_6,
  7: Anim_7,
  8: Anim_8,
  9: Anim_9,
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
