import * as THREE from 'three'

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

export function setupClickHandling(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  paintings: THREE.Object3D[]
) {
  console.log(renderer)
  console.log(paintings)
  renderer.domElement.addEventListener(
    'click',
    (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      onClick(camera, paintings)
    },
    false
  )
}

function onClick(camera: THREE.PerspectiveCamera, paintings: THREE.Object3D[]) {
  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(paintings)
  console.log(intersects)

  if (intersects.length > 0) {
    const painting = intersects[0].object
    console.log(painting)

    // Perform the desired action, e.g., open a modal or redirect to another page
    console.log('Clicked painting:', painting.userData.info.title)
    window.open(painting.userData.info.link, '_blank')
  }
}
