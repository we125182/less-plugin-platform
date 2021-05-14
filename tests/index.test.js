const LessPluginPlatform = require('../src/index')
const less = require('less')
const path = require('path')
const fs = require('fs')

const resolve = (_path) => path.resolve(__dirname, '..', _path)
const input = fs.readFileSync(resolve('tests/index.less'), { encoding: 'utf8' })

test('index.less remove alipay rules in h5', async () => {
  const { css } = await less.render(input, {
    plugins: [new LessPluginPlatform({ platform: 'h5' })]
  })
  expect(css).toBe(
`.g-nav-bar {
  position: relative;
}
` )
})

test('index.less contain alipay rules in alipay ', async () => {
  const { css } = await less.render(input, {
    plugins: [new LessPluginPlatform({ platform: 'alipay' })]
  })
  expect(css).toBe(
`.g-nav-bar {
  position: relative;
  width: 100%;
}
.g-nav-bar .nav-bar__icon {
  position: absolute;
}
.g-nav-bar .nav-bar__icon .van-icon {
  display: none;
}
` )
})