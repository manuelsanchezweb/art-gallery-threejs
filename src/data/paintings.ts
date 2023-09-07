import * as THREE from 'three'

import { ARTWORK, PROJECTS } from '../settings/settings'
import { type MediaProps } from '../geometry/painting'

export const paintingData: MediaProps[] = [
  {
    id: 1,
    mediaUrl: ARTWORK.A0,
    width: 10,
    height: 8,
    position: new THREE.Vector3(-10, 4, -19.9),
    info: {
      // info about the painting
      title: 'Van Gogh',
      artist: 'Vincent van Gogh',
      description:
        'This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork perfectly encapsulates his love for the beauty of everyday life.',
      year: `Year 1994`,
      link: 'https://github.com/theringsofsaturn',
    },
  },
  {
    id: 2,
    mediaUrl: ARTWORK.A1,
    width: 10,
    height: 5,
    position: new THREE.Vector3(10, 4, -19.9),
    info: {
      // info about the painting
      title: 'Van Gogh',
      artist: 'Vincent van Gogh',
      description:
        'This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork perfectly encapsulates his love for the beauty of everyday life.',
      year: `Year 1994`,
      link: 'https://github.com/theringsofsaturn',
    },
  },
  {
    id: 3,
    mediaUrl: ARTWORK.A2,
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
      link: 'https://github.com/theringsofsaturn',
    },
  },
  {
    id: 4,
    mediaUrl: ARTWORK.A3,
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
      link: 'https://github.com/theringsofsaturn',
    },
  },
  {
    id: 5,
    mediaUrl: ARTWORK.A4,
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
      link: 'https://github.com/theringsofsaturn',
    },
  },
  {
    id: 6,
    mediaUrl: PROJECTS.P2,
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
      link: 'https://github.com/theringsofsaturn',
    },
  },
]
