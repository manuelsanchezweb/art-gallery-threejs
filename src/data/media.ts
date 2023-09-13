import * as THREE from 'three'

import { ARTWORK, PROJECTS } from '../settings/settings'
import { type MediaProps } from '../types/types'

export const mediaData: MediaProps[] = [
  {
    id: 1,
    mediaSrc: ARTWORK.A0,
    width: 10,
    height: 8,
    position: new THREE.Vector3(-10, 4, -19.9),
    info: {
      // info about the painting
      title: 'Van Gogh - Alert',
      artist: 'Vincent van Gogh',
      description:
        'This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork perfectly encapsulates his love for the beauty of everyday life.',
      year: `Year 1994`,
      showInfo: true,
    },
    onClick: {
      type: 'action',
      event: "console.log('Clicked the vangiii!')",
      message: 'Click the vangi to get an alertchen!',
      showMessage: false,
    },
  },
  {
    id: 2,
    mediaSrc: ARTWORK.A1,
    width: 10,
    height: 5,
    position: new THREE.Vector3(10, 4, -19.9),
    info: {
      // info about the painting
      title: 'Van Gogh - Link',
      artist: 'Vincent van Gogh',
      description:
        'This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork perfectly encapsulates his love for the beauty of everyday life.',
      year: `Year 1994`,
      showInfo: false,
    },
    onClick: {
      type: 'link',
      event: 'https://github.com/your-github',
      message: 'Click here to go to the Github repo!',
      showMessage: true,
    },
  },
  {
    id: 3,
    mediaSrc: ARTWORK.A2,
    width: 10,
    height: 7,
    position: new THREE.Vector3(6, 4, -24.9),
    rotationSide: 'left',
    info: {
      // info about the painting
      title: 'Van Gogh',
      artist: 'Vincent van Gogh',
      description:
        'This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork perfectly encapsulates his love for the beauty of everyday life.',
      year: `Year 1994`,
      showInfo: false,
    },
    onClick: {
      type: 'link',
      event: 'https://github.com/manuelsanchez2/melicena',
      message: 'Click here to go to the Melicena Github Repo!',
      showMessage: true,
    },
  },
  {
    id: 4,
    mediaSrc: ARTWORK.A3,
    width: 10,
    height: 5,
    position: new THREE.Vector3(-10, 4, -24.9),
    rotationSide: 'right',
    info: {
      // info about the painting
      title: 'Van Gogh',
      artist: 'Vincent van Gogh',
      description:
        'This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork perfectly encapsulates his love for the beauty of everyday life.',
      year: `Year 1994`,
      showInfo: false,
    },
    onClick: {
      type: 'link',
      event: 'https://github.com/manuelsanchez2/melicena',
      message: 'Click here to go to the Melicena Github Repo!',
      showMessage: true,
    },
  },
  {
    id: 5,
    mediaSrc: ARTWORK.A4,
    width: 10,
    height: 8,
    position: new THREE.Vector3(4, 4, -24.9),
    rotationSide: 'right',
    info: {
      // info about the painting
      title: 'Van Gogh',
      artist: 'Vincent van Gogh',
      description:
        'This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork perfectly encapsulates his love for the beauty of everyday life.',
      year: `Year 1994`,
      showInfo: false,
    },
    onClick: {
      type: 'action',
      event: 'alert',
      message: 'Click here to use one action!',
      showMessage: true,
    },
  },
  {
    id: 6,
    mediaSrc: PROJECTS.P2,
    width: 5,
    height: 8,
    position: new THREE.Vector3(15, 4, -24.9),
    rotationSide: 'right',
    isVideo: true,
    info: {
      // info about the painting
      title: 'La playa de Melicena',
      artist: 'Manuel Sánchez',
      description:
        'Esta es una joya de vídeo que hicimos en un día de verano en el que no había mucha gente.',
      year: '2021',
      showInfo: false,
    },
    onClick: {
      type: 'link',
      event: 'https://github.com/manuelsanchez2/melicena',
      message: 'Click here to go to the Melicena Github Repo!',
      showMessage: true,
    },
  },
]
