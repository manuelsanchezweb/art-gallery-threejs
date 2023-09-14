import * as THREE from 'three'
import { PointerLockState } from './pointerEventsLock'
import { ActionMap, actions } from '../data/actions'

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

export function setupClickHandling(
  camera: THREE.PerspectiveCamera,
  mediaElements: THREE.Group[]
) {
  // Updated click event listener
  // console.log(renderer.domElement)
  document.addEventListener(
    'click',
    (event) => {
      // check if canva is clicked
      if (!PointerLockState.getIsLocked()) return
      console.log('Clicked canvas')

      // Normalize mouse position to [-1, 1] range
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Raycasting logic
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(
        mediaElements.map((p) => p.children[0])
      )

      console.log('Intersects:', intersects)
      console.log('mediaElements:', mediaElements)

      if (intersects.length > 0) {
        const media = intersects[0].object
        if (!media.userData.onClose) return

        const mediaonCloseType = media.userData.onClose.type
        console.log('This is the media clicked', media)

        if (mediaonCloseType === 'link') {
          window.open(media.userData.onClose.event, '_blank')
        } else if (mediaonCloseType === 'action') {
          const actionName = media.userData.onClose.event as keyof ActionMap
          const action = actions[actionName]
          // TODO: check if this is killing performance
          if (action) {
            action()
          } else {
            eval(media.userData.onClose.event)
          }
        } else if (
          mediaonCloseType === 'video' &&
          media.userData.extras?.whenShouldVideoPlay === 'click'
        ) {
          if (!media.parent) return
          const videoElement: HTMLVideoElement =
            media.parent.userData.videoElement
          if (videoElement.paused) {
            videoElement.play().catch((error) => {
              console.error('Video play failed:', error)
            })
          } else {
            videoElement.pause()
          }
        }
      }
    },
    false
  )
}
// check if clicks are being registered at all when PointerLockControls is deactivated
// document.addEventListener('click', () => {
//   console.log('Document clicked') // this is printing
// })
