# less-plugin-platform
该项目是一个less插件, 针对跨端开发, 提供编译支持

# 语法

```less
/* #ifdef $platform */
// 仅在平台等于$platform时, 被编译
/* #endif */


/* #ifndef $platform */
// 平台不等于$platform时, 被编译
/* #endif */
```

# 安装

```bash
npm install less-plugin-platform --save-dev
# or
yarn add less-plugin-platform -D
```

# 配置
```javascript
// webpack.config.js
const PlatformPlugin = require('less-plugin-platform')
module.exports = {
  ...
  module: {
    rules: [
      test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          {
            loader: 'less-loader',
            options: [
              lessOptions: {
                plugins: [
                  new PlatformPlugin({ platform: 'h5' })
                ]
              }
            ]
          }
        ],
    ]
  }
}
```

# 示例

```less
.g-nav-bar {
  position: relative;

  /*  #ifdef  alipay  */
  width: 100%;
  .nav-bar__icon {
      position: absolute;
      .van-icon {
          display: none;
      }
  }
  /*  #endif  */
} 
``` 

通过该插件作用后, 如果编译平台为`h5`则, 编译结果
```css
.g-nav-bar {
  position: relative;
} 
``` 

如果编译平台为`alipay`, 编译结果
```css
.g-nav-bar {
  position: relative;
  width: 100%;
}
.g-nav-bar .nav-bar__icon {
  position: absolute;
}
.g-nav-bar .nav-bar__icon .van-icon {
  display: none;
}
```