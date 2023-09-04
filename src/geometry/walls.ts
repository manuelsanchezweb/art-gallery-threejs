import * as THREE from 'three'

interface Object3DWithBBox extends THREE.Object3D {
  BBox?: THREE.Box3
}

function createLateralWall(
  xPosition: number,
  rotationY: number = Math.PI / 2,
  color: string = 'lightgray'
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(50, 20, 0.001)
  const material = new THREE.MeshBasicMaterial({ color })
  const wall = new THREE.Mesh(geometry, material)
  wall.rotation.y = rotationY
  wall.position.x = xPosition
  return wall
}

function createCeiling() {
  const geometry = new THREE.PlaneGeometry(50, 50, 32)
  const material = new THREE.MeshBasicMaterial({
    color: 'gray',
    side: THREE.DoubleSide,
  })
  const ceiling = new THREE.Mesh(geometry, material)
  ceiling.rotation.x = Math.PI / 2
  ceiling.position.y = 10
  return ceiling
}

export const createWalls = () => {
  const walls: THREE.Group = new THREE.Group()

  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(
      50, // width
      20, // height
      0.001 // depth
    ),

    new THREE.MeshBasicMaterial({ color: 'lightgray' })
  )
  frontWall.position.z = -20 // Move wall back - adds depth to scene

  const leftWall = createLateralWall(-25)
  const rightWall = createLateralWall(25)

  walls.add(frontWall, leftWall, rightWall)

  // Add bounding boxes to walls
  for (let i = 0; i < walls.children.length; i++) {
    const object: Object3DWithBBox = walls.children[i] as Object3DWithBBox
    object.BBox = new THREE.Box3().setFromObject(object)
  }

  const ceiling = createCeiling()
  walls.add(ceiling)

  return walls
}
