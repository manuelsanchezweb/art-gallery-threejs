import './style.css'
import * as THREE from 'three'

// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// Scene, camera, renderer
// Scene
const scene = new THREE.Scene()
// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view: how much we can see of the scene
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane: objects closer than this won't be rendered
  1000 // Far clipping plane: objects further than this won't be rendered
)

camera.position.z = 5 // Move the camera back a bit so we can see the scene
scene.add(camera)

// Renderer: takes the scene and the camera and displays them on the screen (canvas)
const renderer = new THREE.WebGLRenderer({
  antialias: false, // Smooth edges
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 1) // Bg color
document.body.appendChild(renderer.domElement)

// Lights
// 1. Ambient light: lights up the whole scene
let ambientLight = new THREE.AmbientLight(0x101010, 1)
// change the position of the ambientLight to be the one of the camera
ambientLight.position.copy(camera.position) // light follows the camera
scene.add(ambientLight)

// 2. Sun light: directional light
let sunLight = new THREE.DirectionalLight(0xdddddd, 1)
sunLight.position.y = 15
scene.add(sunLight)

// Add geometry
let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshBasicMaterial({ color: 'blue' })
let cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Add some controls on keydown
document.addEventListener('keydown', onKeyDown, false) // false: event listener is in the bubbling phase

function onKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp':
      camera.translateY(-0.3)
      console.log('yehja')
      break
    case 'ArrowDown':
      camera.translateY(0.3)
      break
    case 'ArrowLeft':
      camera.translateX(0.3)
      break
    case 'ArrowRight':
      camera.translateX(-0.3)
      break
    default:
      break
  }
}

// Render loop
const animate = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}
animate()
