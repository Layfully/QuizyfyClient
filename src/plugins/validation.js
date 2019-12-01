export const validateImageDimensions = (value, { width, height }) => {
  return new Promise((resolve) => {
    let image = new Image()
    image.onerror = () => { return resolve(false) }
    image.onload = () => { return resolve(image.width >= width && image.height >= height) }
    image.src = URL.createObjectURL(value[0])
  })
}

export const validateImages = (files) => {
  let regex = /\.(heic|heif|tiff|webp|ico|jpg|svg|jpeg|png|bmp|gif)$/i
  if (Array.isArray(files)) {
    return files.every((file) => { return regex.test(file.name) })
  }
  return regex.test(files.name)
}
