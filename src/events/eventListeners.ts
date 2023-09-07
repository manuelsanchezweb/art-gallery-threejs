import { PointerLockControls } from 'three-stdlib'
import { startAudio, stopAudio } from '../audio/audioGuide'
import {
  hideMenu,
  showMenu,
  showMenuAndOtherOptions,
} from '../controls/controls'

let lockPointer = true
let showMenuOnUnlock = false

export function setupEventListeners(controls: PointerLockControls) {
  handleAboutSectionLogic()
  handleInfoPanelLogic()
  handleAudioLogic()

  controls.addEventListener('unlock', () => {
    if (showMenuOnUnlock) {
      showMenuAndOtherOptions()
    }
    showMenuOnUnlock = true
  })
}

function handleAboutSectionLogic() {
  const aboutButton = document.getElementById('about_button')
  const closeAbout = document.getElementById('close-about')
  const aboutOverlay = document.getElementById('about-overlay')
  const overlay = document.getElementById('overlay')

  aboutButton?.addEventListener('click', function () {
    aboutOverlay?.classList.add('show')
    overlay?.classList.remove('active')
    hideMenu()
  })

  closeAbout?.addEventListener('click', function () {
    aboutOverlay?.classList.remove('show')
    overlay?.classList.add('active')
    showMenu()
  })
}

function handleInfoPanelLogic() {
  const toggleInfoButton = document.querySelector(
    '#toggle-info'
  ) as HTMLButtonElement
  const infoPanel = document.querySelector('#info-panel') as HTMLElement
  if (toggleInfoButton && infoPanel) {
    toggleInfoButton.addEventListener('click', () => {
      infoPanel.classList.toggle('collapsed')
      toggleInfoButton.innerText = infoPanel.classList.contains('collapsed')
        ? 'Show'
        : 'Hide'
    })
  }
}

function handleAudioLogic() {
  const startAudioButton = document.querySelector('#start_audio')
  const pauseAudioButton = document.querySelector('#stop_audio')

  startAudioButton?.addEventListener('click', startAudio)
  pauseAudioButton?.addEventListener('click', stopAudio)
}

// toggle the pointer lock
export function togglePointerLock(controls: PointerLockControls) {
  if (lockPointer) {
    controls.lock()
  } else {
    showMenuOnUnlock = false
    controls.unlock()
  }
  lockPointer = !lockPointer // toggle the lockPointer variable
}
