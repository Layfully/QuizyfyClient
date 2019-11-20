import { validateImages } from '@/plugins/validation'

let acceptedExtensions = ['heic', 'heif', 'tiff', 'webp', 'ico', 'jpg', 'svg', 'jpeg', 'png', 'bmp', 'gif']
let notAcceptedExtensions = ['rar', 'exe', 'zip', 'asa', 'asdasd']

describe('ImageValidation', () => {
  it('accepts files with specified files extensions', () => {
    let files = []

    for (const extension of acceptedExtensions) {
      files.push(new File([''], 'testName.'.concat(extension)))
    }

    expect(validateImages(files)).toBe(true)
  })

  it('rejects files with not specified files extensions', () => {
    let files = []

    for (const extension of notAcceptedExtensions) {
      files.push(new File([''], 'testName.'.concat(extension)))
    }

    expect(validateImages(files)).toBe(false)
  })
})
