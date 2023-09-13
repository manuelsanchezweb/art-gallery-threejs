export type ActionMap = {
  log: () => void
  alert: () => void
  // Add more actions here
}

/**
 * These are a series of global actions that can be triggered when clicking on a media element.
 */
export const actions: ActionMap = {
  log: () => console.log('This was clicked!!!!'),
  alert: () => alert('This is an alert!'),
}
