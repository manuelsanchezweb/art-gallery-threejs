import * as THREE from 'three'

export const createAmbientLight = (camera: THREE.Camera) => {
  const ambientLight = new THREE.AmbientLight(0x101010, 1)
  ambientLight.position.copy(camera.position)
  return ambientLight
}
