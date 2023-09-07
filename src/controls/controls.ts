import * as THREE from 'three'

import { PointerLockControls } from 'three-stdlib'
import { checkCollision } from './boundaries'
import { KeysPressed } from '../types/types'
import { KEYSPRESSED, WALLS } from '../settings/settings'

import nipplejs, { type JoystickManagerOptions } from 'nipplejs'

const MOVEMENT_SPEED = 8.0
const JUMP_FORCE = 6.0
const GRAVITY = -9.8 // Upwards direction is positive, so gravity is negative.
let canJump = false
let velocity = new THREE.Vector3()

let lastTouchX = 0
let lastTouchY = 0
const touchSensitivity = 0.8

export const addJoystickControls = (
  clock: THREE.Clock,
  controls: PointerLockControls
) => {
  const joystickOptions: JoystickManagerOptions = {
    zone: document.getElementById('zone_joystick') as HTMLElement, // active zone
    mode: 'static',
    size: 100, // size of joystick
    position: { left: '50%', top: '50%' },
  }
  const joystick = nipplejs.create(joystickOptions)

  joystick.on('move', function (_evt, data) {
    const moveSpeed = MOVEMENT_SPEED * 2 * clock.getDelta() // Ensure delta is accessible here

    if (data.angle.degree > 45 && data.angle.degree < 135) {
      // move forward
      controls.moveForward(moveSpeed)
    } else if (data.angle.degree > 225 && data.angle.degree < 315) {
      // move backward
      controls.moveForward(-moveSpeed)
    } else if (data.angle.degree <= 45 || data.angle.degree >= 315) {
      // move right
      controls.moveRight(moveSpeed)
    } else if (data.angle.degree >= 135 && data.angle.degree <= 225) {
      // move left
      controls.moveRight(-moveSpeed)
    }
  })

  joystick.on('end', function () {
    // stop movement, if needed
  })
}

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

export const addTouchControls = (controls: PointerLockControls) => {
  document.addEventListener(
    'touchstart',
    function (event) {
      lastTouchX = event.touches[0].pageX
      lastTouchY = event.touches[0].pageY
    },
    false
  )

  document.addEventListener(
    'touchmove',
    function (event) {
      event.preventDefault()

      const touchX = event.touches[0].pageX
      const touchY = event.touches[0].pageY

      const deltaX = (touchX - lastTouchX) * touchSensitivity
      const deltaY = (touchY - lastTouchY) * touchSensitivity

      // Get current Euler angle, adjust, and set it back
      const currentEuler = new THREE.Euler().setFromQuaternion(
        controls.getObject().quaternion,
        'YXZ'
      )
      currentEuler.y -= deltaX * 0.002
      currentEuler.x -= deltaY * 0.002
      controls.getObject().quaternion.setFromEuler(currentEuler)

      lastTouchX = touchX
      lastTouchY = touchY
    },
    { passive: false }
  )
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
  const joystickZone = document.getElementById('zone_joystick') as HTMLElement

  function startExperience() {
    clock.start()
    controls.lock()
    hideMenu()
    overlay?.classList.remove('active')
    joystickZone?.classList.add('active')
  }

  function showMenuAndOtherOptions() {
    showMenu()
    overlay?.classList.add('active')
    joystickZone?.classList.remove('active')
  }

  playButton?.addEventListener('click', startExperience)
  controls.addEventListener('unlock', showMenuAndOtherOptions)
}

export function hideMenu() {
  const menu = document.getElementById('menu') as HTMLDivElement
  if (!menu) return
  menu.style.display = 'none'
}

export function showMenu() {
  const menu = document.getElementById('menu') as HTMLDivElement
  if (!menu) return
  menu.style.display = 'block'
}
