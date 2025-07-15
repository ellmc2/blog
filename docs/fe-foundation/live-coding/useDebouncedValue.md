# useDebounceValue

```ts
import { useState, useEffect } from "react";

/**
 * useDebounceValue
 * @param value - 需要防抖的值
 * @param delay - 延迟时间（毫秒），默认 300ms
 * @returns 返回延迟后的值
 */
function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounceValue;

```
