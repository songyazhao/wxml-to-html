const { toHtml } = require('wxml-transformer')
const path = require('path')
const fs = require('fs-extra')
const findFileExt = require('find-file-ext')
const resolve = file => path.resolve(__dirname, file)

module.exports = async (sourcePath, savePath, options) => {
  let { ext, outExt, rawPath } = options

  if (!ext) ext = 'wxml'
  if (!outExt) outExt = 'html'
  if (!rawPath) rawPath = true

  const sourceDir = path.isAbsolute(sourcePath) ? sourcePath : resolve(sourcePath)
  const saveDir = path.isAbsolute(savePath) ? savePath : resolve(savePath)
  const wxmlPaths = await findFileExt([sourceDir], [ext])

  wxmlPaths.forEach(async src => {
    const wxmlCon = await fs.readFile(src, 'utf-8')
    const newWxmlCon = toHtml(wxmlCon)
    const suffixPath = src.replace(sourcePath, '').replace(ext, outExt)
    const savePath = rawPath ? path.join(saveDir, path.basename(suffixPath)) : path.join(saveDir, suffixPath)

    // 确保目录存在，否则创建
    await fs.ensureDir(path.dirname(savePath))
    // 写入文件
    await fs.writeFile(savePath, newWxmlCon, 'utf-8')
  })

  return Promise.resolve(wxmlPaths)
}
