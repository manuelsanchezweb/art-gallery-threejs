import * as THREE from 'three'

import { PointerLockControls } from 'three-stdlib'
import { checkCollision } from './boundaries'
import { KeysPressed } from '../types/types'
import { KEYSPRESSED, WALLS } from '../settings/settings'

const MOVEMENT_SPEED = 5.0

export const addKeyboardControls = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key in KEYSPRESSED) {
      KEYSPRESSED[event.key as keyof KeysPressed] = true
    }
  })

  document.addEventListener('keyup', (event) => {
    if (event.key in KEYSPRESSED) {
      KEYSPRESSED[event.key as keyof KeysPressed] = false
    }
  })
}

export const updateMovement = (
  scene: THREE.Scene,
  delta: number,
  camera: THREE.Camera,
  controls: PointerLockControls
) => {
  const moveSpeed = MOVEMENT_SPEED * delta
  const previousPosition = camera.position.clone()
  const wallsFromScene = scene.getObjectByName(WALLS) as THREE.Group

  if (KEYSPRESSED.w || KEYSPRESSED.ArrowUp) {
    controls.moveForward(moveSpeed)
  }

  if (KEYSPRESSED.s || KEYSPRESSED.ArrowDown) {
    controls.moveForward(-moveSpeed)
  }

  if (KEYSPRESSED.a || KEYSPRESSED.ArrowLeft) {
    controls.moveRight(-moveSpeed)
  }

  if (KEYSPRESSED.d || KEYSPRESSED.ArrowRight) {
    controls.moveRight(moveSpeed)
  }

  if (checkCollision(camera, wallsFromScene)) {
    camera.position.copy(previousPosition)
  }
}

export const addHowToControls = (
  clock: THREE.Clock,
  controls: PointerLockControls
) => {
  const playButton = document.getElementById('play_button')

  function startExperience() {
    clock.start()
    controls.lock()
    hideMenu()
  }
  playButton?.addEventListener('click', startExperience)

  function hideMenu() {
    const menu = document.getElementById('menu') as HTMLDivElement
    if (!menu) return
    menu.style.display = 'none'
  }

  function showMenu() {
    const menu = document.getElementById('menu') as HTMLDivElement
    if (!menu) return
    menu.style.display = 'block'
  }

  controls.addEventListener('unlock', showMenu)
}
