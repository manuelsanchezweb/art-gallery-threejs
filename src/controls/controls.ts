import { PointerLockControls } from 'three-stdlib'

const MOVEMENT_SPEED = 0.8

export const addKeyboardControls = (controls: PointerLockControls) => {
  function onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        controls.moveForward(MOVEMENT_SPEED)
        break
      case 'ArrowDown':
      case 's':
        controls.moveForward(-MOVEMENT_SPEED)
        break
      case 'ArrowLeft':
      case 'a':
        controls.moveRight(-MOVEMENT_SPEED)
        break
      case 'ArrowRight':
      case 'd':
        controls.moveRight(MOVEMENT_SPEED)
        break
      default:
        break
    }
  }

  document.addEventListener('keydown', onKeyDown)
}

export const addHowToControls = (camera: THREE.Camera) => {
  const controls = new PointerLockControls(camera, document.body)
  const playButton = document.getElementById('play_button')

  function startExperience() {
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

  // Add keyboard controls
  addKeyboardControls(controls)
}
