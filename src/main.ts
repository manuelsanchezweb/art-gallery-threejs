import './style.css'
import * as THREE from 'three'

import { setupScene } from './scene'
import {
  addJoystickControls,
  addKeyboardControls,
  addTouchControls,
  initGalleryExperience,
} from './controls/controls'

import { PointerLockControls } from 'three-stdlib'
import { renderer, startRendering } from './render/render'
import { setupAudio } from './audio/audioGuide'
import { setupEventListeners } from './events/eventListeners'
import { setupClickHandling } from './events/clickHandling'

const { scene, camera, paintings } = setupScene()

const controls = new PointerLockControls(camera, document.body)
const clock = new THREE.Clock()

initGalleryExperience(clock, controls)
addKeyboardControls(controls)
addJoystickControls(clock, controls)
addTouchControls(controls)

setupAudio(camera)

startRendering(scene, clock, camera, controls, paintings)

setupEventListeners(controls)
setupClickHandling(renderer, camera, paintings)
