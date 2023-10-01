# Event loop 事件循环

## 进程和线程

::: tip

`JavaScript` 是单线程执行的，在 `JavaScript` 运行期间，有可能会阻塞 UI 渲染，这在一方面说明 `JavaScript` 引擎线程和 UI 渲染线程是互斥的。`JavaScript` 被设计成单线程的原因在于，`JavaScript` 可以修改 DOM，如果在 `JavaScript` 工作期间，UI 还在渲染的话，则可能不会正确渲染 DOM。单线程也有一些好处，如下：

1. 节省内存空间
2. 节省上下文切换时间
3. 没有锁的问题存在

:::

进程(process)：指计算机中已执行的程序，是线程的容器。

线程(thread)：在计算机科学中，将进程划分为两个或多个线程（实例）或子进程，由单处理器（单线程）或多处理器（多线程）或多核处理系统并发执行。

## 执行栈

::: tip

可以把执行栈看成是一个存储函数调用的栈结构，遵循先进后出的原则。

:::

## Event loop

上面讲到函数会在执行栈中执行，那么当遇到异步代码后，该如何处理呢？其实当遇到异步代码的时候，会被挂起在 Task 队列中，一旦执行栈为空，就会从 Task 中拿出需要执行的代码执行，所以本质上讲 JS 中的异步还是同步行为。

1. 宏任务(`script`、`setTimeout`、`setInterval`、`setImmidiate`、`I/O`、`UI Rendering`)可以有多个队列
2. 微任务(`procress.nextTick`、`Promise.then`、`Object.observe`、`mutataionObserver`)只能有一个队列
   执行顺序： 当执行栈执行完毕后，会首先执行微任务队列，当微任务队列执行完毕再从宏任务中读取并执行，当再次遇到微任务时，放入微任务队列。

