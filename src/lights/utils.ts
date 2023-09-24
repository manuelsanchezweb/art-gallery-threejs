import { LightSettings } from '../types/types'
import * as THREE from 'three'

/**
 * Creates a light based on the LightSettings configuration.
 * @param lightSettings - The configuration object for the light.
 */
export function createCustomLight(lightSettings: LightSettings) {
  let light: THREE.Light

  switch (lightSettings.type) {
    case 'spot':
      light = new THREE.SpotLight(lightSettings.color, lightSettings.intensity)
      break
    case 'point':
      light = new THREE.PointLight(lightSettings.color, lightSettings.intensity)
      break
    case 'directional':
      light = new THREE.DirectionalLight(
        lightSettings.color,
        lightSettings.intensity
      )
      break
  }

  light.position.copy(lightSettings.position)
  return light
}

export function createSpotlight(
  x: number,
  y: number,
  z: number,
  intensity: number | undefined,
  targetPosition: THREE.Vector3
) {
  const spotlight = new THREE.SpotLight(0xffffff, intensity) // create a spotlight
  const helper = new THREE.SpotLightHelper(spotlight)
  spotlight.position.set(x, y, z) // position the spotlight
  spotlight.target.position.copy(targetPosition) // set the spotlight target position
  spotlight.castShadow = true // set the spotlight to cast a shadow
  spotlight.angle = Math.PI / 3 // set the spotlight angle to 60 degrees. Math.PI is 180 degrees
  spotlight.penumbra = 1 // set the spotlight penumbra to 1. The penumbra is the soft edge of the spotlight
  spotlight.decay = 1.5 //  determines how the light attenuates with distance. The higher the value of decay, the faster the light intensity diminishes with distance
  spotlight.distance = 40 // set the spotlight distance to 40 units
  spotlight.shadow.mapSize.width = 1024 // the shadow map size is the resolution of the shadow. The higher the number, the higher the resolution
  spotlight.shadow.mapSize.height = 1024
  return { spotlight, helper } // return the spotlight
}
export const { spotlight, helper } = createSpotlight(
  0,
  20,
  -10,
  2,
  new THREE.Vector3(0, 2, -20)
)
// export const spotlight2 = createSpotlight(
//   0,
//   20,
//   10,
//   2,
//   new THREE.Vector3(0, 2, 20)
// )
// export const spotlight3 = createSpotlight(
//   -10,
//   20,
//   0,
//   2,
//   new THREE.Vector3(-20, 2, 0)
// )
// export const spotlight4 = createSpotlight(
//   10,
//   20,
//   0,
//   2,
//   new THREE.Vector3(20, 2, 0)
// )
