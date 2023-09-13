export interface KeysPressed {
  w: boolean
  a: boolean
  s: boolean
  d: boolean
  W: boolean
  S: boolean
  A: boolean
  D: boolean
  ArrowUp: boolean
  ArrowDown: boolean
  ArrowLeft: boolean
  ArrowRight: boolean
  g: boolean
  p: boolean
}

type Rotation = 'front' | 'left' | 'right' | 'back'

export interface MediaProps {
  id: number
  mediaSrc: string
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
    showInfo: boolean
  }
  onClick?: {
    type: 'link' | 'action' | 'video'
    event: string
    message: string
    showMessage: boolean
  }
}
