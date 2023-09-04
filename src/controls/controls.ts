import * as THREE from 'three'

import { PointerLockControls } from 'three-stdlib'
import { checkCollision } from './boundaries'
import { KeysPressed } from '../types/types'
import { KEYSPRESSED, WALLS } from '../settings/settings'

const MOVEMENT_SPEED = 8.0
const JUMP_FORCE = 6.0
const GRAVITY = -9.8 // Upwards direction is positive, so gravity is negative.
let canJump = false
let velocity = new THREE.Vector3()

export const addKeyboardControls = (controls: PointerLockControls) => {
  document.addEventListener('keydown', (event) => {
    if (event.key in KEYSPRESSED) {
      KEYSPRESSED[event.key as keyof KeysPressed] = true
    }

    if (event.key === ' ' && canJump === true) {
      velocity.y += JUMP_FORCE // Adjust the '20' to set the jump speed.
      canJump = false
    }
  })

  document.addEventListener('keyup', (event) => {
    if (event.key in KEYSPRESSED) {
      KEYSPRESSED[event.key as keyof KeysPressed] = false
    }
  })

  controls.addEventListener('lock', function () {
    canJump = true
  })

  controls.addEventListener('unlock', function () {
    canJump = false
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

  velocity.y += GRAVITY * delta

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

  controls.getObject().position.y += velocity.y * delta

  if (checkCollision(camera, wallsFromScene)) {
    camera.position.copy(previousPosition)
  }

  if (controls.getObject().position.y <= 0) {
    velocity.y = 0
    controls.getObject().position.y = 0
    canJump = true
  }
}

export const addHowToControls = (
  clock: THREE.Clock,
  controls: PointerLockControls
) => {
  const playButton = document.getElementById('play_button')
  const overlay = document.getElementById('overlay')

  function startExperience() {
    clock.start()
    controls.lock()
    hideMenu()
    overlay?.classList.remove('active')
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
    overlay?.classList.add('active')
  }

  controls.addEventListener('unlock', showMenu)
}
