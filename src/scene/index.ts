import * as THREE from 'three'
import { cameraSettings } from '../settings/settings'
import { createCube } from '../geometry/cube'
import { createAmbientLight } from '../lights/ambientLight'
import { createSunLight } from '../lights/sunLight'
import { createFloor } from '../geometry/floor'

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

  // Add cube to scene
  const cube = createCube()
  scene.add(cube)

  // Add floor to scene
  const floor = createFloor()
  scene.add(floor)

  return { scene, camera, cube }
}
