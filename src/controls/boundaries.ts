import * as THREE from 'three'

export const checkCollision = (
  camera: THREE.Camera,
  walls: THREE.Group
): boolean => {
  const playerBoundingBox = new THREE.Box3()
  const cameraWorldPosition = new THREE.Vector3()

  camera.getWorldPosition(cameraWorldPosition)

  playerBoundingBox.setFromCenterAndSize(
    cameraWorldPosition,
    new THREE.Vector3(1, 1, 1)
  )

  for (let i = 0; i < walls.children.length; i++) {
    const wall = walls.children[i] as THREE.Mesh
    const wallBoundingBox = new THREE.Box3().setFromObject(wall)

    if (playerBoundingBox.intersectsBox(wallBoundingBox)) {
      return true
    }
  }

  return false
}
