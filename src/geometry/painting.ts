import * as THREE from 'three'

type Rotation = 'front' | 'left' | 'right' | 'back'

export interface MediaProps {
  id: number
  mediaUrl: string
  width: number
  height: number
  rotationSide?: Rotation
  isVideo?: boolean
  position: THREE.Vector3
  info?: {
    title: string
    artist: string
    description: string
    year: string
    link: string
  }
}

export function createMedia(props: MediaProps): any {
  const { mediaUrl, width, height, position, rotationSide, isVideo } = props

  let mediaTexture
  let rotation = rotationSide || 'front'

  if (isVideo) {
    const video = document.createElement('video')
    video.src = mediaUrl
    video.loop = true
    video.muted = true // Optionally mute the video

    // Wait for the video to load
    video.addEventListener('loadeddata', function () {
      // Explicitly call play method
      video.play().catch((e) => {
        console.error('Autoplay failed:', e)
      })
      // Update texture
      mediaTexture = new THREE.VideoTexture(video)
      mediaMaterial.map = mediaTexture
      mediaMaterial.needsUpdate = true
    })

    // Optionally add the video to DOM
    // video.style.display = 'none';
    // document.body.appendChild(video);

    mediaTexture = new THREE.VideoTexture(video)
  } else {
    mediaTexture = new THREE.TextureLoader().load(mediaUrl)
  }

  const mediaMaterial = new THREE.MeshBasicMaterial({
    map: mediaTexture,
  })

  const mediaGeometry = new THREE.PlaneGeometry(width, height)
  const mediaMesh = new THREE.Mesh(mediaGeometry, mediaMaterial)

  mediaMesh.position.set(position.x, position.y, position.z)

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
    type: 'media',
    info: props.info,
    url: props.info?.link,
    boundaryMaterial: boundaryMaterial, // Store the boundary material in userData
  }
  group.add(mediaMesh)
  group.add(boundaryLine)

  // Set rotation
  if (rotation === 'left') group.rotation.y = Math.PI / 2
  if (rotation === 'right') group.rotation.y = -Math.PI / 2
  if (rotation === 'back') group.rotation.y = Math.PI

  return group
}
