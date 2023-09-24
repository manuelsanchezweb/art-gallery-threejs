import * as THREE from 'three'
import { IS_DEBUG_MODE, WALLS, cameraSettings } from '../settings/settings'

import { createAmbientLight } from '../lights/ambientLight'
import { createSunLight } from '../lights/sunLight'
import { createFloor } from '../geometry/floor'
import { createWalls } from '../geometry/walls'
import { createMedia } from '../geometry/media'
import { mediaData } from '../data/media'
import { PointerLockControls } from 'three-stdlib'
import { createBoundingBoxes } from '../utils/boundingBoxes'
import { createCustomLight } from '../lights/utils'
import { createCeiling } from '../geometry/ceiling'

export const setupScene = () => {
  const scene = new THREE.Scene()

  // Initialize renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 1)
  document.body.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(
    cameraSettings.fov,
    cameraSettings.aspectRatio,
    cameraSettings.nearPlane,
    cameraSettings.farPlane
  )

  camera.position.z = 5
  scene.add(camera)

  // Add lights to scene
  scene.add(createAmbientLight(camera))
  scene.add(createSunLight())

  // Add floor to scene
  const floor = createFloor()
  scene.add(floor)

  // Add walls to scene
  const walls = createWalls()
  createBoundingBoxes(walls)
  walls.name = WALLS
  scene.add(walls)

  // Add ceiling to scene
  const ceiling = createCeiling()
  scene.add(ceiling)

  // Add media elements (img and video) to scene
  const mediaElements: THREE.Group[] = []
  // createBoundingBoxes(mediaElements)
  const controls = new PointerLockControls(camera, renderer.domElement)

  mediaData.forEach((mediaItem) => {
    const media = createMedia(mediaItem)
    media.name = 'media'

    media.children[0].userData = mediaItem // Add painting info to mesh

    if (mediaItem.lighting) {
      const customLight = createCustomLight(mediaItem.lighting)
      scene.add(customLight)
    }

    createBoundingBoxes(mediaElements)

    scene.add(media)
    mediaElements.push(media) // add to mediaElements array
  })

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(20, 7, 5)
  directionalLight.castShadow = true
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight2.position.set(-20, 7, 5)
  directionalLight2.castShadow = true

  scene.add(directionalLight)
  scene.add(directionalLight2)

  if (IS_DEBUG_MODE) {
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight
    )
    const directionalLightHelper2 = new THREE.DirectionalLightHelper(
      directionalLight2
    )
    scene.add(directionalLightHelper)
    scene.add(directionalLightHelper2)
  }

  return { scene, camera, mediaElements, controls, renderer }
}
