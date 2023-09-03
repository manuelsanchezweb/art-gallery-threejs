import * as THREE from 'three'
import { ASSETS } from '../settings/settings'

export const createFloor = (): THREE.Mesh => {
  const textureLoaded = new THREE.TextureLoader().load(ASSETS.FLOOR)
  textureLoaded.wrapS = THREE.RepeatWrapping // Repeat horizontally
  textureLoaded.wrapT = THREE.RepeatWrapping // Repeat vertically
  textureLoaded.repeat.set(20, 20) // Repeat 20 times in both directions

  const planeGeometry = new THREE.PlaneGeometry(50, 50, 32)
  const planeMaterial = new THREE.MeshBasicMaterial({
    map: textureLoaded,
    side: THREE.DoubleSide,
  })

  const floor = new THREE.Mesh(planeGeometry, planeMaterial)
  floor.rotation.x = Math.PI / 2
  floor.position.y = -Math.PI
  return floor
}
