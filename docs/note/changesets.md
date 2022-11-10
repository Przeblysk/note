# 使用 Changesets 管理类库版本及更新日志

Monorepo 项目离不开的就是版本和发布更新日志的管理。不知道[Monorepo]([现代 Monorepo 工程技术选型，聊聊我的思考 (qq.com)](https://mp.weixin.qq.com/s/y5ZU9hWAfYrUuAhUVBmVUw))的同学可以看下这篇文章。

一般的 Monorepo 项目下都会有很多个 package ，比如一个UI组件库大概就会有UI库package、一个文档DOC的package、一个Demo的package等等。

每次发布 Monorepo 的项目的时候就需要去维护发布的版本号和更新日志，如果这些都通过手动来修改和描述那就很复杂了。

所以我们今天来介绍下[changesets](https://github.com/changesets/changesets)。一个用来优化这些流程，变成规范工作流的发布管理工具。



## Changesets 怎么做的？

生成的 changelog 遵循 [语义化版本 2.0.0]([语义化版本 2.0.0 | Semantic Versioning (semver.org)](https://semver.org/lang/zh-CN/)) ，具体的做法是先根据你的代码更改生成 changeset 文件，然后发版的时候合并这些 changeset 文件、更改版本号、生成 changelog。



## 开始使用

### 安装依赖

```bash
npm install @changesets/cli -D
npm install @changesets/changelog-github -D //可选
```

### 初始化

```bash
npx changeset init
```

初始化完成后项目的根目录会有一个.changeset的文件夹，里面的config.json就是changeset的配置文件，如下：

```
{
  "$schema": "https://unpkg.com/@changesets/config@2.2.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public", // 默认值为restricted
  "baseBranch": "master",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

我们可以关注下其中的 **changelog** 和 **access** 。changelog 可以修改为我们安装的 `@changesets/changelog-github` ，access 的默认值为 `restricted` ，可以修改为 `public`。更多的配置信息说明可以看[官方文档]([changesets/config-file-options.md at main · changesets/changesets (github.com)](https://github.com/changesets/changesets/blob/main/docs/config-file-options.md))。

### 生成 chanegset

1. 选择需要包含的packages

![选择package](https://s2.loli.net/2022/11/10/6VsgBEuI3H5kjyG.png)

2. 会问你哪些包要发布major的版本，如果一个都不选会继续问你哪些包要发布minor的版本，如果你还是不选它就会发布patch版本了。并且会自动显示各个package的version号![CleanShot2022-11-10at14.58.46@2x.png](https://s2.loli.net/2022/11/10/VtiB4wkAPaMsOUr.png)
3. 添加更新摘要![更新摘要](https://s2.loli.net/2022/11/10/JUX64qKoMLmacf1.png)

4. 生成 chanegset 在.changeset文件夹下

![chanegset](https://s2.loli.net/2022/11/10/jD9EIPsZMJBTarX.png)

### 确认版本并发布

1. `npx changeset version`

这个命令会自动更新每个package下的 **package.json** 以及 **CHANGELOG.md**。并删除上面生成chanegset md文件。

2. `npx changeset publish`

接着我们就可以用命令发布我们的packagse了