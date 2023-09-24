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
