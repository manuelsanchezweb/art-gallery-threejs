import { setupScene } from './scene'
import { addKeyboardControls } from './controls/controls'

import './style.css'
import * as THREE from 'three'

const { scene, camera, cube } = setupScene()

// Initialize renderer
const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 1)

document.body.appendChild(renderer.domElement)

// Add keyboard controls
addKeyboardControls(camera)

// Render loop
const animate = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
