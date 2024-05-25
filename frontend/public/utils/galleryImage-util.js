function getImageURL(name) {
    return new URL(`../gallery-assets/${name}`, import.meta.url).href
  }
  
  export {getImageURL};