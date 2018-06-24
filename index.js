const { toHtml } = require('wxml-transformer')
const path = require('path')
const fs = require('fs-extra')
const findFileExt = require('find-file-ext')
const resolve = file => path.resolve(__dirname, file)

module.exports = async (sourcePath, savePath, options = {}) => {
  let { extension, outExtension, rawDirectory } = options

  if (!extension) extension = 'wxml'
  if (!outExtension) outExtension = 'html'
  if (!rawDirectory) rawDirectory = true

  const sourceDir = path.isAbsolute(sourcePath) ? sourcePath : resolve(sourcePath)
  const saveDir = path.isAbsolute(savePath) ? savePath : resolve(savePath)
  const wxmlPaths = await findFileExt([sourceDir], [extension])

  wxmlPaths.forEach(async src => {
    const wxmlCon = await fs.readFile(src, 'utf-8')
    const newWxmlCon = toHtml(wxmlCon)
    const suffixPath = src.replace(sourcePath, '').replace(extension, outExtension)
    const savePath = rawDirectory ? path.join(saveDir, suffixPath) : path.join(saveDir, path.basename(suffixPath))

    // 确保目录存在，否则创建
    await fs.ensureDir(path.dirname(savePath))
    // 写入文件
    await fs.writeFile(savePath, newWxmlCon, 'utf-8')
  })

  return Promise.resolve(wxmlPaths)
}
