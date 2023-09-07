import './style.css'
import * as THREE from 'three'

import { setupScene } from './scene'
import {
  addHowToControls,
  addJoystickControls,
  addKeyboardControls,
  addTouchControls,
  hideMenu,
  showMenu,
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

const toggleInfoButton = document.querySelector(
  '#toggle-info'
) as HTMLButtonElement
const infoPanel = document.querySelector('#info-panel') as HTMLElement
if (toggleInfoButton && infoPanel) {
  toggleInfoButton.addEventListener('click', () => {
    infoPanel.classList.toggle('collapsed')
    toggleInfoButton.innerText = infoPanel.classList.contains('collapsed')
      ? 'Show'
      : 'Hide'
  })
}

const aboutButton = document.getElementById('about_button')
const closeAbout = document.getElementById('close-about')
const aboutOverlay = document.getElementById('about-overlay')
const overlay = document.getElementById('overlay')

aboutButton?.addEventListener('click', function () {
  aboutOverlay?.classList.add('show')
  overlay?.classList.remove('active')
  hideMenu()
})

closeAbout?.addEventListener('click', function () {
  aboutOverlay?.classList.remove('show')
  overlay?.classList.add('active')
  showMenu()
})
