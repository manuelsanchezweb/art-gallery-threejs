import { MediaProps } from '../types/types'

// Display media info in the DOM
const infoPanelElement = document.getElementById('media__info__panel')
const infoTriggerElement = document.getElementById('media__info__trigger')

export const displayMediaInfo = (data: MediaProps) => {
  displayMediaInfoPanel(data)
  displayMediaInfoTrigger(data)
}

// Hide Media info in the DOM
export const hideMediaInfo = () => {
  hideMediaInfoPanel()
  hideMediaInfoTrigger()
}

const displayMediaInfoPanel = (data: MediaProps) => {
  const info = data.info
  if (!infoPanelElement || info?.showInfo === false) return

  // Set the html content inside info element
  infoPanelElement.innerHTML = `
      <h3>${info?.title}</h3>
      <p>Artista: ${info?.artist}</p>
      <p>Descripción: ${info?.description}</p>
      <p>Año: ${info?.year}</p>
    `
  infoPanelElement.classList.add('show') // Add the 'show' class
}

// Hide Media info in the DOM
const hideMediaInfoPanel = () => {
  if (!infoPanelElement) return
  infoPanelElement.classList.remove('show') // Remove the 'show' class
}

const displayMediaInfoTrigger = (data: MediaProps) => {
  const onCloseInfo = data.onClose
  if (!infoTriggerElement || onCloseInfo?.showMessage === false) return

  infoTriggerElement.innerHTML = `
      <h3>${onCloseInfo?.message}</h3>
    `
  infoTriggerElement.classList.add('show') // Add the 'show' class
}

// Hide Media info in the DOM
const hideMediaInfoTrigger = () => {
  if (!infoTriggerElement) return
  infoTriggerElement.classList.remove('show') // Remove the 'show' class
  infoTriggerElement.innerHTML = ''
}
