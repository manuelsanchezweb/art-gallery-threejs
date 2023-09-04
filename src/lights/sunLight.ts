import * as THREE from 'three'

export const createSunLight = () => {
  const sunLight = new THREE.DirectionalLight(0xdddddd, 1)
  sunLight.position.set(0, 0, 100)
  return sunLight
}
