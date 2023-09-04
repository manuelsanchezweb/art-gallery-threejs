import * as THREE from 'three'
import { WALLS, cameraSettings } from '../settings/settings'

import { createAmbientLight } from '../lights/ambientLight'
import { createSunLight } from '../lights/sunLight'
import { createFloor } from '../geometry/floor'
import { createWalls } from '../geometry/walls'
import { createMedia } from '../geometry/painting'
import { paintingData } from '../data/paintings'

export const setupScene = () => {
  const scene = new THREE.Scene()

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
  walls.name = WALLS
  scene.add(walls)

  // Add paintings to scene
  const paintings: THREE.Group[] = []

  paintingData.forEach((painting) => {
    const media = createMedia(painting)

    scene.add(media)
    paintings.push(media) // add to paintings array
  })

  return { scene, camera, paintings }
}
