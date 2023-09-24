import * as THREE from 'three'
import { FLOOR_TEXTURES } from '../settings/settings'

export const createFloor = (): THREE.Mesh => {
  const textureLoader = new THREE.TextureLoader()
  // Load the textures
  const colorTexture = textureLoader.load(FLOOR_TEXTURES.COLOR)
  const displacementTexture = textureLoader.load(FLOOR_TEXTURES.DISPLACEMENT)
  const normalTexture = textureLoader.load(FLOOR_TEXTURES.NORMAL)
  const roughnessTexture = textureLoader.load(FLOOR_TEXTURES.ROUGHNESS)
  const aoTexture = textureLoader.load(FLOOR_TEXTURES.AO)

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping

  const planeGeometry = new THREE.PlaneGeometry(45, 45)
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    aoMap: aoTexture,
    displacementScale: 0.3,
    side: THREE.DoubleSide,
  })

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial)

  floorPlane.rotation.x = Math.PI / 2
  floorPlane.position.y = -Math.PI
  return floorPlane
}
