import * as THREE from 'three'
import { updateMovement } from '../controls/controls'
import { DISTANCE_THRESHOLD, IS_DEBUG_MODE } from '../settings/settings'
import { displayMediaInfo, hideMediaInfo } from '../ui/infoMedia'
import { PointerLockControls } from 'three-stdlib'

export const setupRendering = (
  scene: THREE.Scene,
  clock: THREE.Clock,
  camera: THREE.PerspectiveCamera,
  controls: PointerLockControls,
  mediaElements: THREE.Group[], // replace with the actual type
  renderer: THREE.WebGLRenderer
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

    let closestMedia = null
    let closestDistance = Infinity
    const cameraWorldPosition = new THREE.Vector3()
    camera.getWorldPosition(cameraWorldPosition)

    mediaElements.forEach((mediaGroup) => {
      const media = mediaGroup.children[0]
      const mediaWorldPosition = new THREE.Vector3()
      media.getWorldPosition(mediaWorldPosition)
      const distanceToMedia = cameraWorldPosition.distanceTo(mediaWorldPosition)

      if (distanceToMedia < closestDistance) {
        closestMedia = media
        closestDistance = distanceToMedia
      }

      const boundaryMaterial = mediaGroup.userData.boundaryMaterial
      hideMediaInfo()
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

    // Update the boundary color of the closest media
    if (closestMedia && closestDistance < DISTANCE_THRESHOLD) {
      // @ts-ignore
      const closestMediaGroup = closestMedia.parent // Assuming the closest media is still part of its original group
      const closestMediaUserData = closestMediaGroup.userData
      const boundaryMaterial = closestMediaUserData.boundaryMaterial
      displayMediaInfo(closestMediaUserData)

      if (boundaryMaterial && IS_DEBUG_MODE) {
        boundaryMaterial.color.set(0xff0000) // Set to red
        boundaryMaterial.opacity = 1 // Reset opacity to 1
        boundaryMaterial.transparent = false // Disable transparency
        boundaryMaterial.needsUpdate = true // Signal that the material has changed
      }

      if (closestMediaUserData.type === 'video') {
        if (closestMediaUserData.extras?.whenShouldVideoPlay === 'close') {
          const videoElement: HTMLVideoElement =
            closestMediaGroup.userData.videoElement
          videoElement.play().catch((error) => {
            console.error('Video autoplay failed:', error)
          })
        }
      }

      // console.log('Closest media:', closestMediaGroup.userData)
    } else {
      // Pause all videos if they are farther than the threshold
      mediaElements.forEach((mediaGroup: THREE.Group) => {
        const videoElement: HTMLVideoElement | undefined =
          mediaGroup.userData.videoElement
        if (videoElement) {
          videoElement.pause()
        }
      })
    }

    // @ts-ignore
    renderer.gammaOutput = true
    // @ts-ignore
    renderer.gammaFactor = 2.2

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
}
