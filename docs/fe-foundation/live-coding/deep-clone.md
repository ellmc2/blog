# Deep Clone 深克隆

```ts
function cloneDeep<T>(obj: T, map = new WeakMap()): T {
  // 如果不是对象或为 null，直接返回（基本类型直接返回自身）
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 处理循环引用：如果 map 中已存在该对象，则直接返回已克隆的对象
  if (map.has(obj as object)) {
    return map.get(obj as object) as T;
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj) as T;
  }

  // 处理正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj) as T;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const arr: unknown[] = [];
    map.set(obj, arr); // 先存入 map，防止循环引用
    for (let i = 0; i < obj.length; i++) {
      arr[i] = cloneDeep(obj[i], map); // 递归克隆每一项
    }
    return arr as unknown as T;
  }

  // 处理普通对象
  const cloneObj: { [key: string]: unknown } = {};
  map.set(obj as object, cloneObj); // 先存入 map，防止循环引用
  for (const key in obj) {
    // 只克隆对象自身的属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = cloneDeep((obj as { [key: string]: unknown })[key], map);
    }
  }

  return cloneObj as T;
}

```
