import * as THREE from 'three'
import { ARTWORK, cameraSettings } from '../settings/settings'
// import { createCube } from '../geometry/cube'
import { createAmbientLight } from '../lights/ambientLight'
import { createSunLight } from '../lights/sunLight'
import { createFloor } from '../geometry/floor'
import { createWalls } from '../geometry/walls'
import { createPainting } from '../geometry/painting'

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
  // const cube = createCube()
  // scene.add(cube)

  // Add floor to scene
  const floor = createFloor()
  scene.add(floor)

  // Add walls to scene
  const walls = createWalls()
  scene.add(walls)

  // Add paintings to scene
  const painting1 = createPainting({
    imageUrl: ARTWORK.A0,
    width: 10,
    height: 8,
    position: new THREE.Vector3(-10, 4, -19.9),
  })

  const painting2 = createPainting({
    imageUrl: ARTWORK.A1,
    width: 10,
    height: 5,
    position: new THREE.Vector3(10, 4, -19.9),
  })
  scene.add(painting1)
  scene.add(painting2)

  return { scene, camera }
}
