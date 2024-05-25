function getImageURL(name) {
    return new URL(`../blog-assets/${name}`, import.meta.url).href
  }
  
  export {getImageURL};