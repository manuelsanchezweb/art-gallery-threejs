import * as THREE from 'three'
import { ASSETS } from '../settings/settings'

const wallTexture = new THREE.TextureLoader().load(ASSETS.WALLS)
wallTexture.wrapS = THREE.RepeatWrapping
wallTexture.wrapT = THREE.RepeatWrapping
wallTexture.repeat.set(1, 1)

function createCeiling() {
  const ceilingTexture = new THREE.TextureLoader().load(ASSETS.CEILING)
  ceilingTexture.wrapS = THREE.RepeatWrapping
  ceilingTexture.wrapT = THREE.RepeatWrapping
  ceilingTexture.repeat.set(1, 1)

  const geometry = new THREE.PlaneGeometry(50, 50, 32)
  const material = new THREE.MeshBasicMaterial({
    map: ceilingTexture,
  })
  const ceiling = new THREE.Mesh(geometry, material)
  ceiling.rotation.x = Math.PI / 2
  ceiling.position.y = 10
  return ceiling
}

function createLateralWall(
  xPosition: number,
  rotationY: number = Math.PI / 2
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(50, 20, 0.001)
  const material = new THREE.MeshBasicMaterial({ map: wallTexture })
  const wall = new THREE.Mesh(geometry, material)
  wall.rotation.y = rotationY
  wall.position.x = xPosition
  return wall
}

export const createWalls = () => {
  const walls: THREE.Group = new THREE.Group()

  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshLambertMaterial({ map: wallTexture })
  )
  frontWall.position.z = -20

  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ map: wallTexture })
  )
  backWall.position.z = 20 // Move wall forward to create depth in opposite direction

  const leftWall = createLateralWall(-25)
  const rightWall = createLateralWall(25)

  frontWall.castShadow = true
  backWall.castShadow = true
  leftWall.castShadow = true
  rightWall.castShadow = true
  frontWall.receiveShadow = true
  backWall.receiveShadow = true
  leftWall.receiveShadow = true
  rightWall.receiveShadow = true

  walls.add(frontWall, backWall, leftWall, rightWall)

  // Add bounding boxes to walls
  // for (let i = 0; i < walls.children.length; i++) {
  //   const object: Object3DWithBBox = walls.children[i] as Object3DWithBBox
  //   object.BBox = new THREE.Box3().setFromObject(object)
  // }

  const ceiling = createCeiling()
  walls.add(ceiling)

  return walls
}
