import * as THREE from 'three'
import { updateMovement } from '../controls/controls'
import { DISTANCE_THRESHOLD, IS_DEBUG_MODE } from '../settings/settings'
import { displayPaintingInfo, hidePaintingInfo } from '../ui/infoMedia'
// import { displayPaintingInfo, hidePaintingInfo } from '../ui/infoPictures'

// Initialize renderer
const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 1)
document.body.appendChild(renderer.domElement)

export const startRendering = (
  scene: THREE.Scene,
  clock: THREE.Clock,
  camera: THREE.PerspectiveCamera,
  controls: any, // replace with the actual type
  paintings: THREE.Group[] // replace with the actual type
) => {
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onWindowResize, false)

  // Render loop
  const animate = () => {
    const delta = clock.getDelta()
    updateMovement(scene, delta, camera, controls)

    let closestPainting = null
    let closestDistance = Infinity
    const cameraWorldPosition = new THREE.Vector3()
    camera.getWorldPosition(cameraWorldPosition)

    paintings.forEach((paintingGroup) => {
      const painting = paintingGroup.children[0] // Assuming the actual painting is the first child of the group
      const paintingWorldPosition = new THREE.Vector3()
      painting.getWorldPosition(paintingWorldPosition)
      const distanceToPainting = cameraWorldPosition.distanceTo(
        paintingWorldPosition
      )

      if (distanceToPainting < closestDistance) {
        closestPainting = painting
        closestDistance = distanceToPainting
      }

      const boundaryMaterial = paintingGroup.userData.boundaryMaterial
      hidePaintingInfo()
      if (boundaryMaterial) {
        if (IS_DEBUG_MODE) {
          boundaryMaterial.color.set(0x00ff00) // Reset to green
        } else {
          boundaryMaterial.color.set(0x000000) // Set to transparent
          boundaryMaterial.opacity = 0 // Set opacity to 0
          boundaryMaterial.transparent = true // Enable transparency
        }
        boundaryMaterial.needsUpdate = true // Signal that the material has changed
      }
    })

    // Update the boundary color of the closest painting
    if (closestPainting && closestDistance < DISTANCE_THRESHOLD) {
      // @ts-ignore
      const closestPaintingGroup = closestPainting.parent // Assuming the closest painting is still part of its original group
      const boundaryMaterial = closestPaintingGroup?.userData.boundaryMaterial
      displayPaintingInfo(closestPaintingGroup.userData)
      if (boundaryMaterial) {
        boundaryMaterial.color.set(0xff0000) // Set to red
        boundaryMaterial.opacity = 1 // Reset opacity to 1
        boundaryMaterial.transparent = false // Disable transparency
        boundaryMaterial.needsUpdate = true // Signal that the material has changed
      }
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
}
