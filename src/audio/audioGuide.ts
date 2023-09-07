import * as THREE from 'three'
import { MUSIC } from '../settings/settings'

type SoundState = {
  sound: THREE.Audio
  bufferLoaded: boolean
}
// Define the type for sound and its state
let soundState: SoundState = {
  sound: new THREE.Audio(new THREE.AudioListener()),
  bufferLoaded: false,
}

// setup audio for the scene
export const setupAudio = (camera: THREE.Camera): void => {
  const listener = new THREE.AudioListener()
  camera.add(listener)

  soundState.sound = new THREE.Audio(listener) // specify the type

  const audioLoader = new THREE.AudioLoader()
  audioLoader.load(MUSIC.RELAX, (buffer: AudioBuffer) => {
    soundState.sound.setBuffer(buffer)
    soundState.sound.setLoop(true)
    soundState.sound.setVolume(0.3)
    soundState.bufferLoaded = true
  })
}

// play audio
export const startAudio = (): void => {
  if (soundState.sound && soundState.bufferLoaded) {
    soundState.sound.play()
  }
}

// pause audio
export const stopAudio = (): void => {
  if (soundState.sound) {
    soundState.sound.pause()
  }
}
