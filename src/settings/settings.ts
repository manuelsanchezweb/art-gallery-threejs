import { KeysPressed } from '../types/types'

export const IS_DEBUG_MODE = false
export const DISTANCE_THRESHOLD = 11

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
  MELICENA: './projects/projects-melicena.mov',
}

export const MODELS = {
  STATUE_DAVID: './models/david_statue/scene.gltf',
}

export const CEILING_TEXTURES = {
  COLOR: './textures/OfficeCeiling005_1K-JPG/OfficeCeiling005_1K-JPG_Color.jpg',
  DISPLACEMENT:
    './textures/OfficeCeiling005_1K-JPG/OfficeCeiling005_1K-JPG_Displacement.jpg',
  AO: './textures/OfficeCeiling005_1K-JPG/OfficeCeiling005_1K-JPG_AmbientOcclusion.jpg',
  EMISSION:
    './textures/OfficeCeiling005_1K-JPG/OfficeCeiling005_1K-JPG_Emission.jpg',
  METALNESS:
    './textures/OfficeCeiling005_1K-JPG/OfficeCeiling005_1K-JPG_Metalness.jpg',
  NORMAL_GL:
    './textures/OfficeCeiling005_1K-JPG/OfficeCeiling005_1K-JPG_NormalGL.jpg',
  ROUGHNESS:
    './textures/OfficeCeiling005_1K-JPG/OfficeCeiling005_1K-JPG_Roughness.jpg',
}

export const WALLS_TEXTURES = {
  DIFF: './textures/walls/leather_white_diff_4k.jpg',
  ROUGH: './textures/walls/leather_white_rough_4k.jpg',
}

export const FLOOR_TEXTURES = {
  COLOR: './textures/wood_floor/WoodFloor040_1K-JPG_Color.jpg',
  DISPLACEMENT: './textures/wood_floor/WoodFloor040_1K-JPG_Displacement.jpg',
  NORMAL: './textures/wood_floor/WoodFloor040_1K-JPG_NormalGL.jpg',
  ROUGHNESS: './textures/wood_floor/WoodFloor040_1K-JPG_Roughness.jpg',
  AO: './textures/wood_floor/WoodFloor040_1K-JPG_AmbientOcclusion.jpg',
}

export const WALLS = 'walls'
export const MEDIA = 'media'

export const KEYSPRESSED: KeysPressed = {
  w: false,
  a: false,
  s: false,
  d: false,
  W: false,
  S: false,
  A: false,
  D: false,
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  g: false, // start audio
  p: false, // pause audio
}
