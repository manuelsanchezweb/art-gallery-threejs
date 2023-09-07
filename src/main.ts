import './style.css'
import * as THREE from 'three'

import { setupScene } from './scene'
import {
  addHowToControls,
  addJoystickControls,
  addKeyboardControls,
  addTouchControls,
} from './controls/controls'

import { PointerLockControls } from 'three-stdlib'
import { startRendering } from './render/render'

const { scene, camera, paintings } = setupScene()

const controls = new PointerLockControls(camera, document.body)
const clock = new THREE.Clock()

addHowToControls(clock, controls)
addKeyboardControls(controls)
addJoystickControls(clock, controls)
addTouchControls(controls)

startRendering(scene, clock, camera, controls, paintings)
