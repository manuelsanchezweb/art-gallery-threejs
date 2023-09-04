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

export function createPainting(props: PaintingProps): THREE.Mesh {
  const { imageUrl, width, height, position } = props

  const textureLoader = new THREE.TextureLoader()
  const paintingTexture = textureLoader.load(imageUrl)

  const paintingMaterial = new THREE.MeshLambertMaterial({
    map: paintingTexture,
  })

  const paintingGeometry = new THREE.PlaneGeometry(width, height)
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial)

  painting.position.set(position.x, position.y, position.z)

  return painting
}
