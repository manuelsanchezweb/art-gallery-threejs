import * as THREE from 'three'
import { WALLS, cameraSettings } from '../settings/settings'

import { createAmbientLight } from '../lights/ambientLight'
import { createSunLight } from '../lights/sunLight'
import { createFloor } from '../geometry/floor'
import { createWalls } from '../geometry/walls'
import { createMedia } from '../geometry/painting'
import { paintingData } from '../data/paintings'
import { PointerLockControls } from 'three-stdlib'
import { setupVR } from '../vr/vrbutton'
import { createBoundingBoxes } from '../utils/boundingBoxes'

export const setupScene = () => {
  const scene = new THREE.Scene()

  const canvas = document.querySelector('#canvas') as HTMLCanvasElement

  // Initialize renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 1)
  setupVR(renderer)
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

  // Add paintings to scene
  const paintings: THREE.Group[] = []
  createBoundingBoxes(paintings)
  const controls = new PointerLockControls(camera, renderer.domElement)

  paintingData.forEach((painting) => {
    const media = createMedia(painting)

    scene.add(media)
    paintings.push(media) // add to paintings array
  })

  return { scene, camera, paintings, controls, renderer }
}
