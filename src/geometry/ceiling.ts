import * as THREE from 'three'
import { CEILING_TEXTURES } from '../settings/settings'

export function createCeiling() {
  const textureLoader = new THREE.TextureLoader()

  const colorTexture = textureLoader.load(CEILING_TEXTURES.COLOR)
  const displacementTexture = textureLoader.load(CEILING_TEXTURES.DISPLACEMENT)

  const aoTexture = textureLoader.load(CEILING_TEXTURES.AO)
  const emissionTexture = textureLoader.load(CEILING_TEXTURES.EMISSION)
  const metalnessTexture = textureLoader.load(CEILING_TEXTURES.METALNESS)
  const normalGLTexture = textureLoader.load(CEILING_TEXTURES.NORMAL_GL)
  const roughnessTexture = textureLoader.load(CEILING_TEXTURES.ROUGHNESS)

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping
  emissionTexture.wrapS = emissionTexture.wrapT = THREE.RepeatWrapping
  metalnessTexture.wrapS = metalnessTexture.wrapT = THREE.RepeatWrapping
  normalGLTexture.wrapS = normalGLTexture.wrapT = THREE.RepeatWrapping
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping

  const ceilingGeometry = new THREE.PlaneGeometry(100, 70)
  const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    aoMap: aoTexture,
    emissiveMap: emissionTexture,
    // @ts-ignore
    metalnessMap: metalnessTexture,
    normalMap: normalGLTexture,
    // @ts-ignore
    normalMapType: THREE.NormalMap,
    roughnessMap: roughnessTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  })
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial)

  ceilingPlane.rotation.x = Math.PI / 2

  ceilingPlane.position.y = 10

  return ceilingPlane
}
