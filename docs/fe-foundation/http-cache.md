# HTTP缓存
## 什么是HTTP缓存？

客户端请求资源（比如图片、代码文件等）时，将资源缓存在客户端或者客户端与服务端中间节点的一种技术。

## HTTP缓存的好处？

对于客户端：访问更快；

对于服务端：减轻带宽压力和服务器请求数量；

## HTTP缓存如何配置？

HTTP缓存的相关配置都是放在request header 和response header中的。

## Expires

资源到期时间，比如：`Expires: Wed, 21 Oct 2015 07:29:00 GMT`

## Cache-Control

关于缓存策略的设置：

- `no-store` ：不允许缓存；
- `max-age=xxx` ：允许缓存，多少秒后缓存过期；
- `no-cache` ：允许缓存，但是先要向服务器验证一下缓存是否过期。`max-age=0` 与 `no-cache` 的效果是一样的。

关于缓存地点的设置：

- `public` ：中间节点和客户端均可以缓存；
- `private` ：只有客户端可以缓存，中间节点不可以缓存。
    
    比如：`Cache-Control: public, max-age=604800` 允许客户端和中间节点缓存，有效期为7天。
    

需要注意的是，如果同时设置了`Expires` 与`Cache-Control` ，并且`Cache-Control` 中包含`max-age=xxx` 或者`no-cache` 这种有缓存时间相关的配置，那么`Expires` 会被忽略。如果仅仅只是设置了`public` 那将不影响`Expires` 的生效。

## 协商缓存和强制缓存

根据是否要先向服务端验证缓存是否有效，将缓存设置区分为协商缓存和强制缓存。

协商缓存适用于当你请求同一个网址，对应的资源可能发生变化的场景。比如当浏览器访问https://react.dev时，会请求的HTML文件，就应该设置为协商缓存。

如果一个URL对应的资源不会变更，那就用强制缓存，并且把过期时间设特别长，比如打包后带有hash的JS、CSS文件和图片等。

为了尽可能利用缓存，可以将代码按路由拆分，再就是不常变的依赖单独打包，思路就是拆分变化与不变的，这样不变的呢绒可以走缓存。

## 服务端如何校验客户端缓存是否有效？

response header: ETag or Last-Modified

request header: If-None-Match or If-Modified-Since

## 如果文件内容一样，但是最后修改时间变化了，ETag会变么？

这个是和服务端怎么去生成`ETag`有关系。

NGINX默认的`ETag` 只是简单的根据文件最后修改时间和文件长度来生成的，因为这样很快。

## 如果response header中`Expires`和`Cache-Control` 都没有设置？

如果一个 HTTP 响应中**没有设置 `Expires` 和 `Cache-Control`**，浏览器会根据其他头部字段和启发式算法（heuristics）**猜测一个合理的缓存过期时间**。这个机制称为 **启发式缓存（Heuristic Caching）**

### 浏览器的启发式缓存策略

当 `Expires` 和 `Cache-Control` 都缺失时，浏览器通常会使用如下启发式算法：

> 过期时间 = Last-Modified + 10% ×（现在时间 - Last-Modified）
>

## 如果没有给HTML文件设置缓存头，浏览器还会缓存么？

启发式缓存策略

## 什么时候浏览器会在请求头上自动加`Cache-Control:max-age=0` ?

在当前页面手动刷新的时候。在新标签也去访问是不会加的。所以访问某个url，如果这个url对应的资源可能发生变化时，上线时最好设置`Cache-Control:max-age=0` 。