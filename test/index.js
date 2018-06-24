const fs = require('fs')
const assert = require('chai').assert
const wxmlToHtml = require('../index.js')

const path = require('path')
const sourcePath = path.resolve(__dirname, './pages')
const savePath = path.resolve(__dirname, './dist')
const options = { extension: 'wxml', outExtension: 'html', rawDirectory: true }

describe('module:wxml-to-html', () => {
  it('export', () => {
    assert.isTrue(typeof wxmlToHtml === 'function')
  })

  describe('feature:wxml-to-html', () => {
    it('exist options', async () => {
      let html = await wxmlToHtml(sourcePath, savePath, options)
      assert.isTrue(
        Array.isArray(html) && html.length > 0,
        `转换失败，
        sourcePaht：${sourcePath}，
        savePath：${savePath}，
        options：${options}`
      )
    })

    it('not exist options', async () => {
      let html = await wxmlToHtml(sourcePath, savePath)
      assert.isTrue(
        Array.isArray(html) && html.length > 0,
        `转换失败，
        sourcePaht：${sourcePath}，
        savePath：${savePath}`
      )
    })
  })
})
