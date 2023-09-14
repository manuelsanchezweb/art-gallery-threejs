import * as THREE from 'three'
import { WALLS, cameraSettings } from '../settings/settings'

import { createAmbientLight } from '../lights/ambientLight'
import { createSunLight } from '../lights/sunLight'
import { createFloor } from '../geometry/floor'
import { createWalls } from '../geometry/walls'
import { createMedia } from '../geometry/media'
import { mediaData } from '../data/media'
import { PointerLockControls } from 'three-stdlib'
import { createBoundingBoxes } from '../utils/boundingBoxes'

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

  // Add media elements (img and video) to scene
  const mediaElements: THREE.Group[] = []
  // createBoundingBoxes(mediaElements)
  const controls = new PointerLockControls(camera, renderer.domElement)

  mediaData.forEach((mediaItem) => {
    const media = createMedia(mediaItem)

    media.children[0].userData = mediaItem // Add painting info to mesh

    scene.add(media)
    mediaElements.push(media) // add to mediaElements array
  })

  return { scene, camera, mediaElements, controls, renderer }
}
