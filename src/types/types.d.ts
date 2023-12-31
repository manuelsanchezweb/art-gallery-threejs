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
type MediaType = 'img' | 'video' | 'iframe' | 'model'
type OnClickType = 'link' | 'action' | 'video'
type LightType = 'spot' | 'point' | 'directional'

export type LightSettings = {
  type: LightType
  intensity: number
  color: number
  position: THREE.Vector3
}

export interface MediaProps {
  id: number
  mediaSrc: string
  mediaType: MediaType
  width: number
  height: number
  depth?: number
  rotationSide?: Rotation
  position: THREE.Vector3
  lighting?: LightSettings
  info?: {
    title: string
    artist: string
    description: string
    year: string
    showInfo: boolean
  }
  onClose?: {
    type: OnClickType
    event: string
    message: string
    showMessage: boolean
  }
  extras?: {
    whenShouldVideoPlay: 'default' | 'close' | 'click'
  }
}
