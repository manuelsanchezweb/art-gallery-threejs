// Display painting info in the DOM
const infoElement = document.getElementById('painting-info') // Get the reference

export const displayPaintingInfo = (data: any) => {
  if (!infoElement) return
  const info = data.info

  // Set the html content inside info element
  infoElement.innerHTML = `
      <h3>${info.title}</h3>
      <p>Artista: ${info.artist}</p>
      <p>Descripción: ${info.description}</p>
      <p>Año: ${info.year}</p>
    `
  infoElement.classList.add('show') // Add the 'show' class
}

// Hide painting info in the DOM
export const hidePaintingInfo = () => {
  if (!infoElement) return
  infoElement.classList.remove('show') // Remove the 'show' class
}
