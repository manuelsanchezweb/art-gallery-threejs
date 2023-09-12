import * as THREE from 'three'
import { PointerLockState } from './pointerEventsLock'

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

export function setupClickHandling(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  paintings: THREE.Group[]
) {
  // Updated click event listener
  console.log(renderer.domElement)
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
        paintings.map((p) => p.children[0])
      ) // Extracting mesh from group

      console.log('Intersects:', intersects)
      console.log('Paintings:', paintings)

      if (intersects.length > 0) {
        const painting = intersects[0].object
        console.log('Clicked painting:', painting.userData.info)
        window.open(painting.userData.info.link, '_blank')
      }

      // NOTE: the userData is likely being set on the Group, not the Mesh itself.
      // You can either:
      // a. Set the userData directly to the Mesh when creating it. (I changed the code in 'intex.ts')
      // b. Access the parent's userData when accessing the intersected object: painting.parent.userData.info
    },
    false
  )
}
// check if clicks are being registered at all when PointerLockControls is deactivated
document.addEventListener('click', () => {
  console.log('Document clicked') // this is printing
})
