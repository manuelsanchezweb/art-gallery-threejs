import * as THREE from 'three'

import { PointerLockControls } from 'three-stdlib'
import { checkCollision } from './boundaries'
import { KeysPressed } from '../types/types'
import { KEYSPRESSED, MEDIA, WALLS } from '../settings/settings'

import nipplejs, { type JoystickManagerOptions } from 'nipplejs'
import { startAudio, stopAudio } from '../audio/audioGuide'
import { PointerLockState } from '../events/pointerEventsLock'

const overlay = document.getElementById('overlay')
const joystickZoneMovement = document.getElementById(
  'zone_joystick-movement'
) as HTMLElement

const MOVEMENT_SPEED = 8.0
const JUMP_FORCE = 6.0
const GRAVITY = -9.8 // Upwards direction is positive, so gravity is negative.
let canJump = false
let velocity = new THREE.Vector3()

let lastTouchX = 0
let lastTouchY = 0
const touchSensitivity = 0.8

export const addKeyboardControls = (controls: PointerLockControls) => {
  document.addEventListener('keydown', (event) => {
    if (!PointerLockState.getIsLocked()) return

    if (event.key in KEYSPRESSED) {
      KEYSPRESSED[event.key as keyof KeysPressed] = true
    }

    if (event.key === ' ' && canJump === true) {
      velocity.y += JUMP_FORCE // Adjust the '20' to set the jump speed.
      canJump = false
    }

    if (event.key === 'g') {
      startAudio()
    }

    if (event.key === 'p') {
      stopAudio()
    }

    if (event.key === 'm') {
      // if the "m" key is pressed
      showMenuAndOtherOptions()
      controls.unlock() // unlock the pointer
    }
  })

  document.addEventListener('keyup', (event) => {
    if (!PointerLockState.getIsLocked()) return

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

let joystickInitialized = false
const joystickOptions: JoystickManagerOptions = {
  zone: joystickZoneMovement, // active zone
  mode: 'semi',
  size: 100, // size of joystick
  position: { left: '50%', top: '50%' },
  restOpacity: 0.8,
}
let joystick = nipplejs.create(joystickOptions)

const setupJoystickEvents = (
  controls: PointerLockControls,
  moveSpeed: number,
  camera: THREE.Camera,
  wallsFromScene: THREE.Group,
  mediaElements: THREE.Group[]
) => {
  if (joystickInitialized) return

  joystickInitialized = true

  try {
    joystick.on('hidden', function () {
      // your existing logic here...
      console.log(moveSpeed)
    })

    joystick.on('move', function (_evt, data) {
      const speed = 0.2
      const previousPosition = camera.position.clone() // Save previous position

      if (data.angle.degree > 45 && data.angle.degree < 135) {
        // move forward
        controls.moveForward(speed)
      } else if (data.angle.degree > 225 && data.angle.degree < 315) {
        // move backward
        controls.moveForward(-speed)
      } else if (data.angle.degree <= 45 || data.angle.degree >= 315) {
        // move right
        controls.moveRight(speed)
      } else if (data.angle.degree >= 135 && data.angle.degree <= 225) {
        // move left
        controls.moveRight(-speed)
      }

      if (checkCollision(camera, wallsFromScene)) {
        camera.position.copy(previousPosition)
      }

      mediaElements.forEach((mediaGroup) => {
        if (checkCollision(camera, mediaGroup)) {
          camera.position.copy(previousPosition)
        }
      })
    })

    joystick.on('end', function () {
      // your existing logic here...
    })
  } catch (error) {
    console.error('An error occurred in the joystick logic: ', error)
  }
}
/**
 * Updates the camera position and checks for collisions.
 * @param scene - Three.js scene instance.
 * @param delta - Time delta for movements.
 * @param camera - Camera for the view.
 * @param controls - PointerLockControls for handling movements.
 */
export const updateMovement = (
  scene: THREE.Scene,
  delta: number,
  camera: THREE.Camera,
  controls: PointerLockControls
) => {
  const moveSpeed = MOVEMENT_SPEED * delta
  const previousPosition = camera.position.clone()
  const wallsFromScene = scene.getObjectByName(WALLS) as THREE.Group
  const mediaElements = scene.getObjectsByProperty(
    'name',
    MEDIA
  ) as THREE.Group[]

  velocity.y += GRAVITY * delta

  setupJoystickEvents(
    controls,
    moveSpeed,
    camera,
    wallsFromScene,
    mediaElements
  )

  if (KEYSPRESSED.w || KEYSPRESSED.W || KEYSPRESSED.ArrowUp) {
    controls.moveForward(moveSpeed)
  }

  if (KEYSPRESSED.s || KEYSPRESSED.S || KEYSPRESSED.ArrowDown) {
    controls.moveForward(-moveSpeed)
  }

  if (KEYSPRESSED.a || KEYSPRESSED.A || KEYSPRESSED.ArrowLeft) {
    controls.moveRight(-moveSpeed)
  }

  if (KEYSPRESSED.d || KEYSPRESSED.D || KEYSPRESSED.ArrowRight) {
    controls.moveRight(moveSpeed)
  }

  controls.getObject().position.y += velocity.y * delta

  if (checkCollision(camera, wallsFromScene)) {
    camera.position.copy(previousPosition)
  }

  mediaElements.forEach((mediaGroup) => {
    if (checkCollision(camera, mediaGroup)) {
      camera.position.copy(previousPosition)
    }
  })

  if (controls.getObject().position.y <= 0) {
    velocity.y = 0
    controls.getObject().position.y = 0
    canJump = true
  }
}

export const initGalleryExperience = (
  clock: THREE.Clock,
  controls: PointerLockControls
) => {
  const playButton = document.getElementById('play_button') as HTMLButtonElement

  function startExperience() {
    hideMenuAndOtherOptions()
    clock.start()
    controls.lock()
  }

  playButton?.addEventListener('click', startExperience)
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

export function showMenuAndOtherOptions() {
  setTimeout(() => {
    showMenu()
    overlay?.classList.add('active')
    joystickZoneMovement?.classList.remove('active')
  }, 1000)
}

export async function hideMenuAndOtherOptions() {
  hideMenu()
  overlay?.classList.remove('active')
  joystickZoneMovement?.classList.add('active')
}
