import { KeysPressed } from '../types/types'

export const DISTANCE_THRESHOLD = 11
export const IS_DEBUG_MODE = true

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
  WALLS: './img/wall.jpg',
  CEILING: './img/ceiling.jpg',
}

export const MUSIC = {
  TIERSEN: './sounds/tiersen.mp3',
  RELAX: './sounds/relax.mp3',
}

export const ARTWORK = {
  A0: './artworks/0.jpg',
  A1: './artworks/1.jpg',
  A2: './artworks/2.jpg',
  A3: './artworks/3.jpg',
  A4: './artworks/4.jpg',
}

export const PROJECTS = {
  P0: './projects/game.png',
  P1: './projects/capcom-advisor.gif',
  P2: './projects/water.mp4',
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
  g: false, // start audio
  p: false, // pause audio
}
