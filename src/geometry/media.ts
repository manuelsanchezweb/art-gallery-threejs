import * as THREE from 'three'
import { MediaProps } from '../types/types'
import { GLTFLoader } from 'three-stdlib'

/**
 * Calculate the scale factor for a 3D model within a boundary.
 *
 * @param modelSize - The dimensions of the 3D model.
 * @param boundarySize - The dimensions of the boundary.
 * @param minScale - The minimum scale factor to apply. Default is 0.1.
 * @returns The scale factor.
 */
const calculateScaleFactor = (
  modelSize: THREE.Vector3,
  boundarySize: THREE.Vector3,
  minScale: number = 0.1 // minimum scale factor
): number => {
  const scale = Math.min(
    boundarySize.x / modelSize.x,
    boundarySize.y / modelSize.y,
    boundarySize.z / modelSize.z
  )
  return Math.max(scale, minScale) // ensure the scale is not below minScale
}

/**
 * Create a media group for a scene.
 *
 * @param props - The media properties.
 * @returns A THREE.Group containing the media.
 */
export function createMedia(props: MediaProps): THREE.Group {
  const { mediaSrc, width, height, depth, position, rotationSide, mediaType } =
    props

  // Create the boundary box
  const boundaryGeometry = new THREE.BoxGeometry(width + 1, height + 1, 1) // Adjust the size as needed
  const boundaryMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 })
  const boundaryEdges = new THREE.EdgesGeometry(boundaryGeometry)
  const boundaryLine = new THREE.LineSegments(boundaryEdges, boundaryMaterial)

  // Position the boundary box
  boundaryLine.position.set(position.x, position.y, position.z)

  // Create a group and add the media and light to it
  const group = new THREE.Group()
  group.userData = {
    type: mediaType,
    info: props.info,
    onClose: props.onClose,
    boundaryMaterial: boundaryMaterial, // Store the boundary material in userData
    extras: props.extras,
  }

  let mediaTexture
  let mediaMaterial = new THREE.MeshBasicMaterial()
  let rotation = rotationSide || 'front'

  if (mediaType === 'model') {
    const loader = new GLTFLoader()
    loader.load(
      mediaSrc,
      (gltf) => {
        const model = gltf.scene
        console.log('Model loaded:', model)

        // Log the materials of the model
        console.log('Model Materials: ', model.children)

        model.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            if (
              (child as THREE.Mesh).material instanceof
              THREE.MeshStandardMaterial
            ) {
              const material = (child as THREE.Mesh)
                .material as THREE.MeshStandardMaterial
              material.roughness = 0.1
              console.log('Material:', material)
            }
          }
        })

        // Calculate the bounding box size of the model
        const modelBox = new THREE.Box3().setFromObject(model)
        const modelSize = modelBox.getSize(new THREE.Vector3())

        // Debug output
        // console.log('Model box size:', modelSize)

        // Calculate scale factor
        const scaleFactor = calculateScaleFactor(
          modelSize,
          new THREE.Vector3(width + 1, height + 1, depth || 1),
          0.01 // you can adjust this minimum scale as needed
        )

        model.scale.set(scaleFactor, scaleFactor, scaleFactor)
        model.position.set(position.x, position.y, position.z)

        group.add(model)

        isModelInsideBoundaries(model, boundaryLine, modelBox)
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model', error)
      }
    )
  } else {
    if (mediaType == 'video') {
      const video = document.createElement('video')
      video.src = mediaSrc
      video.loop = true
      video.muted = true // Optionally mute the video

      // Wait for the video to load
      video.addEventListener('loadeddata', function () {
        // Explicitly call play method
        if (props.extras?.whenShouldVideoPlay === 'default') {
          video.play().catch((e) => {
            console.error('Autoplay failed:', e)
          })
        }

        // Update texture
        mediaTexture = new THREE.VideoTexture(video)
      })

      // Optionally add the video to DOM
      // video.style.display = 'none';
      // document.body.appendChild(video);

      mediaTexture = new THREE.VideoTexture(video)
      group.userData.videoElement = video // <-- Add this line
    } else {
      mediaTexture = new THREE.TextureLoader().load(mediaSrc)
    }

    mediaMaterial.map = mediaTexture
    mediaMaterial.needsUpdate = true

    const mediaGeometry = new THREE.PlaneGeometry(width, height)
    const mediaMesh = new THREE.Mesh(mediaGeometry, mediaMaterial)
    mediaMesh.position.set(position.x, position.y, position.z)
    group.add(mediaMesh)
  }

  if (rotation === 'left') group.rotation.y = Math.PI / 2
  if (rotation === 'right') group.rotation.y = -Math.PI / 2
  if (rotation === 'back') group.rotation.y = Math.PI

  group.add(boundaryLine)

  return group
}

/**
 * Debugging function to validate model boundary.
 *
 * @param model - The 3D model object.
 * @param boundaryLine - The boundary line object.
 * @param modelBox - The bounding box of the model.
 */
const isModelInsideBoundaries = (
  model: THREE.Object3D,
  boundaryLine: THREE.LineSegments,
  modelBox: THREE.Box3
) => {
  const modelBoxDebug = new THREE.Box3().setFromObject(model)
  const boundaryBoxDebug = new THREE.Box3().setFromObject(boundaryLine)

  console.log('Model Box Size:', modelBoxDebug.getSize(new THREE.Vector3()))
  console.log(
    'Boundary Box Size:',
    boundaryBoxDebug.getSize(new THREE.Vector3())
  )

  if (boundaryBoxDebug.containsBox(modelBox)) {
    console.log('Model is within the boundary')
  } else {
    console.log('Model is outside the boundary')
  }
}
