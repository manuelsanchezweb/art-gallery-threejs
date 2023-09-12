import './style.css'
import * as THREE from 'three'

import { setupScene } from './scene'
import {
  addJoystickControls,
  addKeyboardControls,
  addTouchControls,
  initGalleryExperience,
} from './controls/controls'

import { setupRendering } from './render/render'
import { setupAudio } from './audio/audioGuide'
import { setupEventListeners } from './events/eventListeners'
import { setupClickHandling } from './events/clickHandling'
import { setupVR } from './vr/vrbutton'
import { PointerLockState } from './events/pointerEventsLock'

const { scene, camera, paintings, controls, renderer } = setupScene()

const clock = new THREE.Clock()

initGalleryExperience(clock, controls)

addKeyboardControls(controls)
addJoystickControls(clock, controls)
addTouchControls(controls)

setupAudio(camera)
setupEventListeners(controls)
setupClickHandling(renderer, camera, paintings)

setupRendering(scene, clock, camera, controls, paintings, renderer)

setupVR(renderer)

// Initialize the PointerLockState class at the start of your application
PointerLockState.initialize({
  displayElement: '#pointer-lock-display',
  cursorElement: '#cursor',
})
