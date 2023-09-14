import * as THREE from 'three'
import { MediaProps } from '../types/types'
import { GLTFLoader } from 'three-stdlib'

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

        // Log the materials of the model
        console.log('Model Materials: ', model.children)

        model.scale.set(width, height, depth ? depth : 5) // You may need to adjust this
        model.position.set(position.x, position.y, position.z)

        group.add(model)

        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        group.add(cube)
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
