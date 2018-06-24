# wxml-to-html

## 微信小程序wxml文件批量转html

## Install

```bash
yarn add wxml-to-html # Or npm install wxml-to-html
```

## Usage

Transform before

```
example/
├── pages/
│   ├── detail/
│   │   └── detail.wxml/
│   └──index.wxml
├── dist/
└── index.js
```

> index.js
```js
const wxmlToHtml = require('wxml-to-html')
const path = require('path')
const sourcePath = path.resolve(__dirname, './pages')
const savePath = path.resolve(__dirname, './dist')
const options = {
  extension: 'wxml', // 要查找的后缀
  outExtension: 'html', // 输出的文件格式
  rawDirectory: true // 是否保持原文件一样的目录结构输出
}

// Promise
wxmlToHtml(sourcePath, savePath, options)
  .then(savePaths => {
    console.log(`success: ${savePaths}`)
  })
  .catch(err => {
    console.error(`output file failed: ${err}`)
  })

// Or Async
async () => {
  try {
    const savePaths = await wxmlToHtml(sourcePath, savePath, options)
    console.log(`success: ${savePaths}`)
  } catch (err) {
    console.error(`output file failed: ${err}`)
  }
}
```

Transform after:

```
example/
├── pages/
│   ├── detail/
│   │   └── detail.wxml/
│   └──index.wxml
├── dist/
│   ├── detail/
│   │   └── detail.html/
│   └──index.html
└── index.js
```

## LICENSE
[MIT](LICENSE)
