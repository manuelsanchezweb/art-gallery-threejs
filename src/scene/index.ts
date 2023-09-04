import * as THREE from 'three'
import { ARTWORK, PROJECTS, WALLS, cameraSettings } from '../settings/settings'
// import { createCube } from '../geometry/cube'
import { createAmbientLight } from '../lights/ambientLight'
import { createSunLight } from '../lights/sunLight'
import { createFloor } from '../geometry/floor'
import { createWalls } from '../geometry/walls'
import { createMedia } from '../geometry/painting'

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
  walls.name = WALLS
  scene.add(walls)

  // Add paintings to scene
  const painting1 = createMedia({
    mediaUrl: ARTWORK.A0,
    width: 10,
    height: 8,
    position: new THREE.Vector3(-10, 4, -19.9),
  })

  const painting2 = createMedia({
    mediaUrl: ARTWORK.A1,
    width: 10,
    height: 5,
    position: new THREE.Vector3(10, 4, -19.9),
  })

  const painting3 = createMedia({
    mediaUrl: ARTWORK.A2,
    width: 10,
    height: 7,
    position: new THREE.Vector3(6, 4, -24.9),
    rotationSide: 'left',
  })

  const painting4 = createMedia({
    mediaUrl: ARTWORK.A3,
    width: 10,
    height: 5,
    position: new THREE.Vector3(-10, 4, -24.9),
    rotationSide: 'right',
  })

  const painting5 = createMedia({
    mediaUrl: ARTWORK.A4,
    width: 10,
    height: 8,
    position: new THREE.Vector3(3, 4, -24.9),
    rotationSide: 'right',
  })

  const painting6 = createMedia({
    mediaUrl: PROJECTS.P2,
    isVideo: true,
    width: 5,
    height: 8,
    position: new THREE.Vector3(15, 4, -24.9),
    rotationSide: 'right',
  })

  scene.add(painting1)
  scene.add(painting2)
  scene.add(painting3)
  scene.add(painting4)
  scene.add(painting5)
  scene.add(painting6)

  return { scene, camera }
}
