const fs = require('fs')

export function bufferToImg(file: any, filename: string, type: number) {
  let base64Image = file.buffer.toString('base64')
  let decodedImage = Buffer.from(base64Image, 'base64')
  try {
    const filearr = file.originalname.split('.')
    const ext = filearr[filearr.length - 1]
    const baseDir = '/static'
    let path = '/'
    if (type === 0) { // 头像, avatar
      path = '/upload/imgs/avatar/'
    }
    const savePath = `${process.cwd()}/src${baseDir}${path}${filename}.${ext}`
    const relativePath = `${path}${filename}.${ext}`
    const showPath = `${process.env.baseUrl}${relativePath}`
    fs.writeFileSync(savePath, decodedImage)
    return {
      showPath,
      relativePath
    }
  } catch(e) {
    console.log('e', e)
    return false
  }
}
