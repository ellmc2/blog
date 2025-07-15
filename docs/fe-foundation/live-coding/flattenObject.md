# flattenObject

1. 深度遍历
题目描述：
请实现一个函数 flattenObject(obj)，对任意嵌套的 JSON 对象进行深度遍历，返回一个以路径为键、基本类型值为值的对象。
要求：
- 路径使用 . 作为分隔符；
- 数组下标也要作为路径的一部分；
- 忽略 null 和 undefined 的值；
- 输出结果的 key 是路径字符串，value 是对应的值。

示例输入：
```javascript
const input = {
  a: 1,
  b: {
    c: [2, { d: 3 }],
    e: "hello"
  }
};
```

期望输出：
```javascript
{
    "a": 1,
    "b.c.0": 2,
    "b.c.1.d": 3,
    "b.e": "hello"
}
```

请在下方实现：
```javascript
function flattenObject(obj) {
    // TODO:
    return newObj;
}
```

参考答案：
```javascript
function flattenObject(obj) {
  const result = {};

  function traverse(current, path) {
    if (current === null || current === undefined) {
      return;
    }

    if (typeof current !== "object") {
      result[path] = current;
      return;
    }

    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        const value = current[key];
        const newPath = Array.isArray(current)
          ? `${path}.${key}`
          : path
          ? `${path}.${key}`
          : key;
        traverse(value, newPath);
      }
    }
  }

  traverse(obj, "");
  return result;
}   
```