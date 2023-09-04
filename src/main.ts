import './style.css'
import * as THREE from 'three'

import { setupScene } from './scene'
import {
  addHowToControls,
  addKeyboardControls,
  updateMovement,
} from './controls/controls'

import { PointerLockControls } from 'three-stdlib'
const { scene, camera } = setupScene()

// Initialize renderer
const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 1)

document.body.appendChild(renderer.domElement)

const controls = new PointerLockControls(camera, document.body)
const clock = new THREE.Clock()

addHowToControls(clock, controls)
addKeyboardControls()

// Render loop
const animate = () => {
  const delta = clock.getDelta()
  updateMovement(scene, delta, camera, controls)
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
