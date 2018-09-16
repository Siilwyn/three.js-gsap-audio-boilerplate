const gsap = require('gsap');
const three = require('three');
const canvasResizer = require('./canvas-resizer.js')

// Setup basics to render
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new three.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('[data-renderer]')
});
renderer.setClearColor(0xeeeeee);

canvasResizer(camera, renderer);

// Add basic cube
const geometry = new three.BoxGeometry(1, 1, 1);
const material = new three.MeshNormalMaterial({ wireframe: true });
const cube = new three.Mesh(geometry, material);
scene.add(cube);

// GSAP timeline
const mainTimeline = new TimelineLite({ paused: true });
mainTimeline
  .set(camera.position, { z: 10 })
  .set(cube.rotation, { x: 360, y: 360 })
  .to(camera.position, 10, { z: 2 })
  .to(cube.rotation, 20, { onUpdate: moveCubeToSpectrum })
  .to(cube.rotation, 20, { onUpdate: moveCubeToWaveform })
  .to(cube.rotation, 60, { onUpdate: moveCubeToSpectrum });

// Setup audio processing
const audioContext = new AudioContext();
const audioAnalyser = audioContext.createAnalyser();
const spectrum = new Uint8Array(audioAnalyser.frequencyBinCount);
const waveform = new Float32Array(audioAnalyser.frequencyBinCount);
const audioElement = new Audio();
const audioSource = audioContext.createMediaElementSource(audioElement);
audioElement.src = 'Joakim Karud - Dreams.mp3';
audioElement.controls = true;
audioElement.onplay = () => {
  mainTimeline.time(audioElement.currentTime);
  mainTimeline.play();
};
audioElement.onpause = () => mainTimeline.pause();
document.body.appendChild(audioElement);
audioSource.connect(audioAnalyser);
audioAnalyser.connect(audioContext.destination);

function moveCubeToSpectrum() {
  audioAnalyser.getByteFrequencyData(spectrum);
  var average = spectrum.reduce((a, b) => a + b) / spectrum.length;
  cube.rotation.x += average / 1000;
  cube.rotation.y += average / 1000;
}

function moveCubeToWaveform() {
  audioAnalyser.getFloatTimeDomainData(waveform);
  var average = waveform.reduce((a, b) => a + b) / waveform.length;
  cube.rotation.x += average;
  cube.rotation.y += average;
}

TweenLite.ticker.addEventListener('tick', render);
function render() {
  renderer.render(scene, camera);
}
