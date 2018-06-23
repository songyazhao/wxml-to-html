const fs = require('fs')
const assert = require('chai').assert
const wxmlToHtml = require('../index.js')

const path = require('path')
const sourcePath = path.resolve(__dirname, '../pages')
const savePath = path.resolve(__dirname, '../public')
const options = { ext: 'wxml', outExt: 'html', rawPath: true }

describe('module:wxml-to-html', () => {
  it('export', () => {
    assert.isTrue(typeof wxmlToHtml === 'function')
  })

  describe('feature:wxml-to-html', () => {
    it('have options', async () => {
      let html = await wxmlToHtml(sourcePath, savePath, options)
      assert.isTrue(Array.isArray(html) && html.length > 0, `"options" error`)
    })

    it('not have options', async () => {
      let html = await wxmlToHtml(sourcePath, savePath)
      assert.isTrue(Array.isArray(html) && html.length > 0, `transform failed`)
    })
  })
})
