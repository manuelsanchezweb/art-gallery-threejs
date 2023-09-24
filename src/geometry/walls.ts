import * as THREE from 'three'
import { WALLS_TEXTURES } from '../settings/settings'

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load(WALLS_TEXTURES.DIFF)
const roughnessTexture = textureLoader.load(WALLS_TEXTURES.ROUGH)
normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping
roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping

const wallMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: normalTexture,
  roughnessMap: roughnessTexture,
  side: THREE.DoubleSide,
  lightMapIntensity: 0.5,
})

function createLateralWall(
  xPosition: number,
  rotationY: number = Math.PI / 2
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(50, 20, 0.001)

  const wall = new THREE.Mesh(geometry, wallMaterial)
  wall.rotation.y = rotationY
  wall.position.x = xPosition
  return wall
}

export const createWalls = () => {
  const walls: THREE.Group = new THREE.Group()

  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    wallMaterial
  )
  frontWall.position.z = -20

  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    wallMaterial
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

  return walls
}
