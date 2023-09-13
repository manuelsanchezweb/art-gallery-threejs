import { showMenuAndOtherOptions } from '../controls/controls'

export class PointerLockState {
  private static isLocked: boolean = false
  private static displayElement: HTMLElement | null = null
  private static cursorElement: HTMLElement | null = null

  static initialize({
    displayElement,
    cursorElement,
  }: {
    displayElement: string
    cursorElement: string
  }) {
    // Get the DOM element where the state will be displayed
    PointerLockState.displayElement = document.querySelector(
      displayElement
    ) as HTMLElement
    PointerLockState.cursorElement = document.querySelector(
      cursorElement
    ) as HTMLElement

    // Attach event listeners for pointer lock state change
    document.addEventListener('pointerlockchange', PointerLockState.updateState)
    document.addEventListener(
      'mozpointerlockchange',
      PointerLockState.updateState
    )

    // Initial display update
    PointerLockState.updateDisplay()
  }

  private static updateState() {
    PointerLockState.isLocked = !!document.pointerLockElement
    console.log('Is it possible to move freely?', PointerLockState.isLocked)
    if (PointerLockState.isLocked) {
      PointerLockState.cursorElement!.classList.add('active')
    } else {
      PointerLockState.cursorElement!.classList.remove('active')
      setTimeout(() => {
        showMenuAndOtherOptions()
      }, 50)
    }

    // Update the display
    PointerLockState.updateDisplay()
  }

  private static updateDisplay() {
    if (PointerLockState.displayElement) {
      PointerLockState.displayElement.innerText = `Pointer Lock State: ${
        PointerLockState.isLocked
          ? 'Locked - Freely interact'
          : 'Unlocked - Menu interaction only'
      }`
    }
  }

  static getIsLocked(): boolean {
    return PointerLockState.isLocked
  }
}
