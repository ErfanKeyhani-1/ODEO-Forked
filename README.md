# Interactive Sound Design Website

An interactive sound-based website built using p5.js, designed to trigger animations and play sounds based on user interactions (touch, click, or keyboard input). This site has been developed and optimized to work across multiple platforms, including MacBook, iPad, Android, and now iPhone, thanks to specific iOS compatibility adjustments.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [iOS Compatibility Adjustments](#ios-compatibility-adjustments)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project features a visually engaging, interactive website where users can trigger various animations and sounds through touch or keyboard events. It utilizes p5.js for animation and audio functionalities and has been modified for improved cross-platform compatibility.

## Features

- **Interactive Animations**: Each interaction triggers unique animations.
- **Multi-Device Compatibility**: Works across desktop, Android, iPad, and iPhone.
- **Color and Animation Variety**: Features multiple color palettes and animation sets.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/lukeelliot88/ODEO.git
   cd InteractiveSoundDesign
   ```

2. Open `index.html` in your preferred browser.

## Usage

### Controls

- **Keyboard (0-9)**: Press keys 0-9 to trigger animations and corresponding sounds.
- **Touch/Mouse**: Click or touch the screen to play animations and sounds based on the area touched.
- **Spacebar**: Switch between color and animation sets.

### iOS Compatibility Adjustments

To ensure the audio works on iOS devices, certain adjustments were made:
- **Audio Context Resumption**: Resumes `AudioContext` on user interactions to comply with iOS sound requirements.
- **Direct Sound Triggers**: Sound plays only when directly triggered by user actions, ensuring compatibility across iOS.

## File Structure

- **index.html**: Main HTML file for the project.
- **sketch.js**: Primary JavaScript file containing animations, sound loading, and event handling.
- **style.css**: Basic CSS for styling, including full-screen view and background color.
- **assets/**: Folder containing sound files (ensure this folder exists and includes necessary `.mp3` files).

## Contributing

Contributions are welcome! If you'd like to improve functionality or enhance compatibility further, feel free to fork the project and submit a pull request.

## License

This project is open-source and available under the MIT License.
