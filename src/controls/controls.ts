export const addKeyboardControls = (camera: THREE.Camera) => {
  function onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        camera.translateY(-0.3)
        console.log('yehja')
        break
      case 'ArrowDown':
        camera.translateY(0.3)
        break
      case 'ArrowLeft':
        camera.translateX(0.3)
        break
      case 'ArrowRight':
        camera.translateX(-0.3)
        break
      default:
        break
    }
  }

  document.addEventListener('keydown', onKeyDown)
}
