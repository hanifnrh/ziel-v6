// src/scripts/lenis.js
import Lenis from 'lenis'

// Initialize Lenis
const lenis = new Lenis({
  // Your configuration options here
})

// Start the animation frame loop
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)