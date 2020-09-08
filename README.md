# 煎果

准备做一个游戏相关的社区，有游戏库、评论等功能，发现不一样的游戏

## 开始

[使用煎果](https://fried-fruit.briefguo.com)

## RoadMap

- [ ] UE
  - [x] 页面设计的基调
  - [x] Logo
  - [ ] 更多概念
- [ ] Serverless 架构
  - [ ] 相关后端计算放在阿里云的“Serverless 函数计算”
  - [ ] 游戏库存储在 OSS
- [ ] 游戏库
  - [x] Admin first. (管理端使用 TOKEN 进行身份身份授权)
  - [x] API first. (CURD complete)
    - [x] games
    - [x] posts
- [ ] 评论，游客可用

- [ ] 自动的开发日志

## Reffenences

- https://github.com/alibaba/funcraft/blob/master/docs/usage/getting_started-zh.md

- [函数计算冷启动优化最佳实践](https://help.aliyun.com/document_detail/140338.html?spm=a2c4g.11186623.6.647.2a4daf5bW03oUd)

- 降低冷启动概率：
  - 使用定时触发器预热函数
  - 使用 Initializer 函数入口，函数计算会异步调用初始化接口，消除掉 “User Code Init” 的时间，在函数计算系统升级或者函数更新过程中，用户对冷启动无感知。
