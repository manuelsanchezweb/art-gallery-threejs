import * as THREE from 'three'

interface PaintingProps {
  imageUrl: string
  width: number
  height: number
  position: Position
}

interface Position {
  x: number
  y: number
  z: number
}

export function createPainting(props: PaintingProps): THREE.Group {
  const { imageUrl, width, height, position } = props

  const textureLoader = new THREE.TextureLoader()
  const paintingTexture = textureLoader.load(imageUrl)

  const paintingMaterial = new THREE.MeshBasicMaterial({
    map: paintingTexture,
  })

  const paintingGeometry = new THREE.PlaneGeometry(width, height)
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial)

  painting.position.set(position.x, position.y, position.z)
  painting.castShadow = true
  painting.receiveShadow = true

  // Create a group and add the painting and light to it
  const group = new THREE.Group()
  group.add(painting)

  // Create a point light to fully illuminate the painting
  // Create multiple point lights
  const numLights = 4
  for (let i = 0; i < numLights; i++) {
    for (let j = 0; j < numLights; j++) {
      const pointLight = new THREE.PointLight(0xffffff, 1, 5)
      const lightX =
        position.x + (i - (numLights - 1) / 2) * (width / (numLights - 1))
      const lightY =
        position.y + (j - (numLights - 1) / 2) * (height / (numLights - 1))
      const lightZ = position.z + 0.5

      pointLight.position.set(lightX, lightY, lightZ)
      group.add(pointLight)
    }
  }

  return group
}
