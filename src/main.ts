import { setupScene } from './scene'
import { addHowToControls } from './controls/controls'

import './style.css'
import * as THREE from 'three'

const { scene, camera } = setupScene()

// Initialize renderer
const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 1)

document.body.appendChild(renderer.domElement)

addHowToControls(camera)

// Render loop
const animate = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
