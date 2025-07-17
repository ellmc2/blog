# 首屏性能优化
## 如何定位到首屏性能问题？有哪些量化指标？

如何定位：

1. `webpack-bundle-analyzer` 插件：生成可视化依赖图谱，用来分析依赖关系和包大小；
2. Performance面板：Chrome调试工具，分析性能必备，需要掌握性能录制和分析“火焰图”；
3. Network面板：Chrome调试工具，用来查看和调试网络请求；
4. 埋点监控工具：一般是借助Sentry或者第三方监控工具，可以采集数据和监控线上问题。

量化指标：

1. FCP，首次内容绘制时间，之用户首次“看到东西”的时间，一般要求小于1.8s；
2. LCP，最大内容绘制时间，如主图、主标题、用户感知主体页面已加载，一般要求2.5s；
3. TTI，页面首次可交互的时间（按钮、输入等响应），一般要求小于5s；

## 有哪些首屏优化手段？以及优化效果如何？

1. JS分包：包括路由懒加载和组件按需加载，只需在路由配置时，改为动态import，以及将组件库改为按需加载；
2. 静态资源走CDN：购买CDN服务，将静态资源托管到CDN，加快访问速度；
3. 提取通用库：配置`externals` ，将项目中体积较大的三方库改用CDN引入，减少打包体积；
4. 开启Gzip：在Nginx服务器上开启Gzip压缩，降低网络传输体积；
5. 体验优化：比如骨架屏和Loading，可以降低用户等待焦虑；
6. 图片加载优化：图片懒加载、预加载，图片压缩以及使用现代格式的图片；
7. SSR服务端渲染：服务端渲染在一定程度上也能加快首屏访问速度，但是需要考虑开发和运维成本，一般只有在SEO要求比较高的场景才考虑使用。

效果：

1. 分包能直接减轻首屏资源压力，能减少大约80%包体积；
2. 图片优化和体验优化能直接提升用户交互体验，感知最明显；
3. Gzip/CDN解决了传输慢、资源加载慢的问题，效果也比较显著；

一般这3点组合起来，能让首屏打开速度提升2-5倍。

## Gzip和CDN一般是服务器上配置，为什么前端来做？

Gzip和CDN虽然在服务器配置，但前端也需要做一些配合～

Gzip

1. 原理：将HTML、JS、CSS等文本资源在服务端压缩后传输，降低首屏资源体积，减少网络传输耗时，加快首屏渲染；
2. 后端工作：修改Nginx配置（gzip_static设置为on）。建议前端学一下Nginx的常用配置：CORS跨域、代理跨域、HTTPS、缓存等；
3. 前端配合：使用`compression-webpack-plugin` 在构建时预生成`.gz` 压缩文件，减少服务器实时压缩的开销；
4. 进阶场景：对于需要极致优化的场景，可以选择Brotli来替代Gzip，Brotli可以压缩的更小，但是浏览器兼容性稍差。

## 开发环境优化思路有哪些，怎么定位到构建过程中耗时的任务？

1. 升级到webpack5或者迁移到vite，但是需要考虑到升级难度和时间成本；
2. 配置webpack缓存：缓存不变的文件，提高二次构建速度。
    1. 启用 Webpack 持久化缓存（内置支持）
        
        从 **Webpack 5** 开始，推荐使用内置的文件缓存（`cache: 'filesystem'`）。
        
        ```jsx
        // webpack.config.js
        module.exports = {
          // ...
          cache: {
            type: 'filesystem', // 启用文件缓存
            buildDependencies: {
              config: [__filename], // 如果配置文件变了，重新缓存
            },
          },
        };
        
        ```
        
        Webpack 会在 `node_modules/.cache/webpack/` 中自动生成缓存内容。
        
    2. 启用 loader 缓存（如 babel-loader）
        
        ```jsx
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 启用 babel 缓存
            },
          },
        }
        ```
        
        这会把缓存存在 `node_modules/.cache/babel-loader/` 目录下，加速二次构建。
        
    3. 使用 `cache-loader`（Webpack 4 时代用法，Webpack 5 不再推荐）
        
        ```bash
        npm install cache-loader --save-dev
        ```
        
        ```jsx
        {
          test: /\.js$/,
          use: [
            'cache-loader',
            'babel-loader',
          ],
          include: path.resolve('src'),
        }
        ```
        
        Webpack 5 已不推荐使用 `cache-loader`，建议直接使用 `cache: { type: 'filesystem' }`。
        
    4. 使用 `hard-source-webpack-plugin`（已废弃）
3. 多线程并行打包：使用`thread-loader`
    
    ```bash
    npm install --save-dev thread-loader
    ```
    
    ```jsx
    // webpack.config.js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve('src'),
            use: [
              {
                loader: 'thread-loader',
                options: {
                  workers: 2, // 启动两个 worker（默认是 CPU 核数 - 1）
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },
    };
    ```
    
    `thread-loader` 要放在 **耗时 loader 的前面**，比如 `babel-loader`、`ts-loader`、`vue-loader`。不要给 `style-loader`、`css-loader` 等轻量 loader 加线程，反而变慢。
    
4. 预编译第三方库：对于稳定第三方库进行预编译，减少每次构建的处理时间，可以使用DllPlugin或者vue-cli项目配置transpileDependencies。

怎么定位问题？

1. 使用`speed-measure-webpack-plugin` 插件来分析loader/plugin花费的时间；
2. 控制变量：隔离特定功能模块，观察构建速度变化；
3. 打包时使`--profile —-json` 生成status.json分析文件，包含详细的构建性能分析数据。