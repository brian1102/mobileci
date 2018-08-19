import { Platform, Image } from 'react-native'
import ImageResizer from 'react-native-image-resizer'

const SIZE_RATE = 1
const QUALITY_RATE = 0.8

export function resizeImageFromBase64(imageInput) {
  return new Promise((resolve, reject) => {
    Image.getSize(
      `data:image/jpeg;base64,${imageInput}`,
      (width, height) => {
        ImageResizer.createResizedImage(
          `data:image/jpeg;base64, ${imageInput}`,
          width * SIZE_RATE,
          height * SIZE_RATE,
          'JPEG',
          QUALITY_RATE * 100,
          0,
          null
        )
          .then(response => {
            resolve(Platform.OS === 'android' ? response.uri : response.path)
          })
          .catch(err => {
            reject(err)
          })
      },
      err => reject(err)
    )
  })
}

export function resizeImageFromPath(imagePath, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    ImageResizer.createResizedImage(
      imagePath,
      maxWidth,
      maxHeight,
      'JPEG',
      QUALITY_RATE * 100,
      0,
      null // dependency has error if we input the outputPath to here
    )
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
