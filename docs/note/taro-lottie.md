# 在 Taro 中使用 Lottie

## 选择

目前小程序的 Lottie 插件有两个：

1. [wechat-miniprogram/lottie-miniprogram: lottie for miniprogram (github.com)](https://github.com/wechat-miniprogram/lottie-miniprogram)
2. [landn172/lottie-miniapp: lottie mniapp 小程序 (github.com)](https://github.com/landn172/lottie-miniapp)

一个是微信官方维护的小程序 Lottie 插件，另一个是比官方更早出的社区版本。

两个版本都有用户在使用，相比之下官方的库最近的更新时间更加新一些，因为都是对官方 LottieWeb 库的改造和依赖，所以大体上不会有太大的区别，任选其一都可以。

## 在 Taro 项目中安装

使用 yarn 或者 npm 安装 node 包

```bash
yarn add lottie-miniprogram
```

```bash
npm install lottie-miniprogram
```

## 在页面中使用

#### 引入 lottie

首先我么需要在页面中引入我们的 Lottie 库

`import lottie from 'lottie-miniprogram'`

#### 创建 canvas 容器

目前小程序只支持以 canvas 的方式去渲染 Lottie，所以我们需要初始化一个 canvas 容器给 Lottie 使用。

微信小程序对 canvas 有更新，目前有新旧两种方式使用 canvas 组件。

从基础库 2.9.0 起支持一套新 Canvas 2D 接口（需指定 type 属性），同时支持[同层渲染](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html#原生组件同层渲染)。所有我们的示例会使用新的方式来使用。

我们在页面上定义一个 canvas，代码如下

```jsx
<Canvas
  id='canvas'
  type='2d'
  style={{ width: '100%', height: '375px', opacity: 0 }}
/>
```

我们定义了一个`type`为 2d、`id` 为 canvas 的 canvas。这个容器之后会给 Lottie 使用。

#### 初始化 Lottie

现在我们已经有了一个 Canvas 容器，接下来我们需要在页面中初始化 Lottie，具体的代码如下：

```jsx
React.useEffect(() => {
  Taro.nextTick(() => {
    Taro.createSelectorQuery()
      .select('#canvas')
      .node((res: any) => {
        if (res) {
          const canvas = res.node
          const context = canvas.getContext('2d')
          let pixelRatio = 2
          pixelRatio = sysInfo?.pixelRatio || pixelRatio
          context.scale(pixelRatio, pixelRatio)
          canvas.width = canvas._width * pixelRatio
          canvas.height = canvas._height * pixelRatio
          lottie.setup(canvas)
          lottieRef.current = lottie.loadAnimation({
            loop: false,
            autoplay: false,
            path: 'https://assets7.lottiefiles.com/private_files/lf30_blzqtgs6.json',
            rendererSettings: {
              context,
            },
          })
          lottieRef.current.goToAndStop(40, true)
        }
      })
      .exec()
  })
}, [sysInfo])
```

我们在 useEffect 中使用 `Taro.createSelectorQuery()` 根据之前定义的 id 来获取到 canvas。

然后使用了 `canvas.getContext('2d')` 来获取 canvas 的上下文。

接着我们使用了系统信息去对 canvas 进行了缩放。

然后有一行很重要的代码：`lottie.setup(canvas)` 这一步很重要，我们在调用 Lottie 的接口之前，一定要把 canvas 传入。

接下来我们调用了 Lottie 的一个方法 `loadAnimation` 。它接受一个类型为 `LoadAnimationParameter` 的参数。具体的属性如下：

```typescript
interface LoadAnimationParameter {
  renderer?: 'canvas' // 默认使用canvas渲染，官方没有把该属性放出
  loop?: boolean | number // 是否重复播放
  autoplay?: boolean // 是否自动播放
  name?: string // 名称只供参考而已
  rendererSettings?: CanvasRendererConfig // 用来接受canvas上下文
  animationData?: any // 动画数据
  path?: string // 动画地址
}
```

在我们代码中，我们设置了 loop、autoplay、path 以及 rendererSettings。

接下来我们又马上调用了 Lottie 的一个方法 `goToAndStop` ，从字面上就很好理解，这个方法就是将动画暂停在我们设置的那个时间点。它接受了 2 个参数，第一个参数是要停止的位置，第二个参数是第一个参数的单位是否是帧。因为我们的 Lottie 动画其实是帧动画，所以这个帧应该也不难理解。

#### Lottie 中的方法

```typescript
interface LoadAnimationReturnType {
  play(): void
  stop(): void
  pause(): void
  setSpeed(speed: number): void
  goToAndPlay(value: number, isFrame?: boolean): void
  goToAndStop(value: number, isFrame?: boolean): void
  setDirection(direction: AnimationDirection): void
  playSegments(
    segments: AnimationSegment | AnimationSegment[],
    forceFlag?: boolean
  ): void
  setSubframe(useSubFrames: boolean): void
  destroy(): void
  getDuration(inFrames?: boolean): number
  triggerEvent<T = any>(name: AnimationEventName, args: T): void
  addEventListener<T = any>(
    name: AnimationEventName,
    callback: AnimationEventCallback<T>
  ): void
  removeEventListener<T = any>(
    name: AnimationEventName,
    callback: AnimationEventCallback<T>
  ): void
}
```

在 lottie-miniprogram 的类型定义文件中一共有以上这些方法。

1. play 播放
2. stop 停止
3. pause 暂停
4. setSpeed 设置倍数
5. goToAndPlay 跳到某处播放
6. goToAndStop 跳到某处暂停
7. setDirection 设置方向
8. playSegments 播放指定片段
9. setSubframe 是否使用原生 AE FPS
10. destroy 销毁实例
11. getDuration 获取时长

#### 为所欲为

初始化完 Lottie 后，我们就可以使用 Lottie 中的方法对 Lottie 动画为所欲为啦。
