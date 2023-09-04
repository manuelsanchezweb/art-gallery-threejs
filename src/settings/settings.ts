import { KeysPressed } from '../types/types'

export const cameraSettings = {
  fov: 75,
  aspectRatio: window.innerWidth / window.innerHeight,
  nearPlane: 0.1,
  farPlane: 1000,
}

export const rendererSettings = {
  antialias: true,
  clearColor: 0xffffff,
  clearAlpha: 1,
}

export const ASSETS = {
  FLOOR: './img/Floor.jpg',
}

export const ARTWORK = {
  A0: './artworks/0.jpg',
  A1: './artworks/1.jpg',
}

export const WALLS = 'walls'

export const KEYSPRESSED: KeysPressed = {
  w: false,
  a: false,
  s: false,
  d: false,
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}
