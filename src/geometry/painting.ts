import * as THREE from 'three'

interface MediaProps {
  mediaUrl: string
  width: number
  height: number
  rotationSide?: Rotation
  isVideo?: boolean
  position: THREE.Vector3
}

type Rotation = 'front' | 'left' | 'right'

export function createMedia(props: MediaProps): THREE.Group {
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

  // Create a group and add the media and light to it
  const group = new THREE.Group()
  group.add(mediaMesh)

  // Set rotation
  if (rotation === 'left') group.rotation.y = Math.PI / 2
  if (rotation === 'right') group.rotation.y = -Math.PI / 2

  return group
}
