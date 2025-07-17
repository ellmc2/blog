# 请求失败会弹出一个 toast，如何保证批量请求失败，只弹出一个 toast

要保证批量请求失败时只弹出一个 toast，可以通过以下几种方式实现：

1. 设置全局标识位：定义一个全局标识位（如：isToastShown）来表示是否已经弹出过了 toast，在请求失败的处理逻辑中，首先检查该标识。如果尚未弹出 toast，则进行弹出操作，并设置标识位为 true；如果标识位为 true,则忽略后续的弹出操作。

   ```javascript
   let isShownToast = false; // 全局标识位

   function makeRequest() {
     const requests = [fetchPost(), fetchComments()];
     Promise.all(requests)
       .then(() => {
         // 所有请求成功的处理逻辑
       })
       .catch((errors) => {
         if (!isShowToast) {
           // 检查标识位
           notify(errors[0]); // 弹出toast
           isShowToast = true; // 设置标识位为true
         }
       });
   }

   makeRequest();
   ```

2. 使用防抖或者节流函数：将弹出 toast 的操作放到防抖或者节流函数中，确保在短时间内的多个请求失败时，不会频繁弹出 toast。
3. 集中式处理：把所有请求的 Promise 添加到一个数组中，然后使用`Promise.all`或者其他类似方法来统一处理这些 Promise，如果这些请求都失败了再弹出一个 toast。
