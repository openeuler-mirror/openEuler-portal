---
title: openYuanrong 快速入门
category: blog 
date: 2026-03-11
tags:
    - openEuler
    - openYuanrong
archives: 2026-03-11
author:  openEuler
summary: openYuanrong是面向 AI、大数据分析、微服务、HPC 等分布式应用的通用 Serverless 平台，提供“单机体验开发、按需弹性运行”能力。让您无需成为分布式系统专家，也能高效开发分布式应用。
---
## 认识 openYuanrong

openYuanrong是面向 AI、大数据分析、微服务、HPC 等分布式应用的通用 Serverless 平台，提供“单机体验开发、按需弹性运行”能力。让您无需成为分布式系统专家，也能高效开发分布式应用。

### openYuanrong介绍

具体内容参考：[把集群变“单机”（上）——openYuanrong核心技术理念解析](https://mp.weixin.qq.com/s/iA4RUk7T-EPjiV6wpz6-dw)

## 安装 openYuanrong

当前 Kafka、Rabbit 等主流的消息队列或数据管道普遍采用中心化的 Broker 架构——即数据需由生产者发送至 Broker 节点进行持久化、缓存与分发，而非就近存储于数据源或计算节点本地。尽管该模式具备良好的解耦性与可靠性，但在高并发、低延迟、资源敏感的场景面临诸多痛点：

openYuanrong 目前支持在 Linux x86_64 及 aarch64 (ARM) 上安装。不同的开发环境安装依赖如下：

- 安装 openYuanrong 并开发 Python 应用：`python<=3.11,>=3.9 `。

- 开发 Java 应用：`java 8/17/21 `。

- 开发 C++ 应用：`gcc>=10.3.0 `且 `stdc++>=14 `。

使用 pip 安装 openYuanrong 官方版本，内含 openYuanrong SDK。

    pip install https://openyuanrong.obs.cn-southwest-2.myhuaweicloud.com/release/0.7.0/linux/x86_64/openyuanrong-0.7.0-cp39-cp39-manylinux_2_34_x86_64.whl


这里以最新的版本为例，历史版本请从官方地址获取：<http://docs.openyuanrong.org/zh-cn/latest/reference/releases.html>


## 总安装 openYuanrong SDK

安装openYuanrong后，即可在当前环境中直接使用Python SDK。

当前openYuanrong支持Python、Java、C++语言，开发前需要安装对应语言的SDK，由于篇幅限制这里以Python举例，若想使用其他语言的SDK，详情参考我们的SDK安装指南文档：<http://docs.openyuanrong.org/zh-cn/latest/deploy/installation.html>

## 多语言函数编程接口快速入门

使用多语言函数编程接口，仅需几行代码即可将常规函数和类转换为 openYuanrong 无状态函数和有状态函数，轻松开发分布式作业类应用，或直接以函数粒度开发 Serverless 服务类应用。

### 开发分布式作业

单机程序中使用 Python、C++、Java 开发的函数可转换为 openYuanrong 无状态函数分布式并行执行，类可转换为 openYuanrong 有状态函数进行分布式有状态计算，因而可以像开发单机程序一样轻松开发分布式作业。

#### 使用 openYuanrong 无状态函数并行化 Python 函数

引入 openYuanrong SDK 并调用 `yr.init() `初始化。使用` yr.invoke `装饰一个函数，声明该函数可以在远端运行。调用时使用 `.invoke() `触发远端运行，返回结果是数据对象的一个引用，需要通过 `yr.get() `获取值。程序结束时，使用 `yr.finalize()` 清理运行上下文。

需要注意的是，`.invoke() `调用会立刻非阻塞返回一个数据对象的 Future 引用，连续多次` .invoke() `调用相当于并行提交多个任务，需要获取结果的时候再调用 `yr.get()`阻塞获取结果。

```
# example.py
import yr

# 定义无状态函数
@yr.invoke
def say_hello(name):
    return'hello, ' + name


# Init（初始化）一次
yr.init()

# 并行异步调用无状态函数
results_ref = [say_hello.invoke('yuanrong') for i in range(3)]
print(yr.get(results_ref))

# 释放环境资源
yr.finalize()

``` 

运行程序:

```
python example.py
# ['hello, yuanrong', 'hello, yuanrong', 'hello, yuanrong']
```

无状态函数适合处理无需维护状态的应用，对于需要维护状态的应用，可使用 openYuanrong 有状态函数。

#### 使用 openYuanrong 有状态函数并行化 Python 类

openYuanrong 提供了有状态函数，让您可以并行化类的实例。当您实例化了一个有状态函数时，openYuanrong 会在集群中启动该类的远程实例。然后该有状态函数可以执行远程方法调用并维护其自身的内部状态。

```
# example.py
import yr

# 定义有状态函数
@yr.instance
class Object:
    def __init__(self):
        self.value = 0

    def save(self, value):
        self.value = value

    def get(self):
        return self.value


# Init（初始化）一次
yr.init()

# 创建三个有状态函数实例
objs = [Object.invoke() for i in range(3)]

# 并行异步调用有状态函数
[obj.save.invoke(9) for obj in objs]
results_ref = [obj.get.invoke() for obj in objs]
print(yr.get(results_ref))

# 销毁有状态函数实例
[obj.terminate() for obj in objs]

# 创建三个有状态函数实例
yr.finalize()

```

运行程序，输出如下:

```
python example.py
# [9, 9, 9]

```

### 开发 Serverless 服务

openYuanrong 提供了函数服务能力，支持将函数托管到集群中，以服务方式运行，通过 http 请求触发调用。函数服务定义了不同开发语言的函数签名作为请求入口，实现该函数即可以部署为 Serverless 服务。 

#### 使用 Python 开发 Serverless 服务

```
# handler 为函数执行方法入口，每次请求都会触发执行。
# event 为 http 请求传递的数据（Header、Body等）。
# context 为 openYuanrong 提供的运行时上下文，包含函数、执行环境等信息。
def handler(event, context):
    print("received request,event content:", event)

    response = ""
    try:
        response = "hello " + event.get("name")
    except Exception as e:
        print(e)
        response = "please enter your name,for example:{'name':'yuanrong'}"

    return response

```

运行示例请参考如下链接： <http://docs.openyuanrong.org/zh-cn/latest/multi_language_function_programming_interface/examples/simple-function-template.html#example-project-function-service>

**下篇预告：部署openYuanrong集群运行分布式应用**

openYuanrong 已在OpenAtom openEuler 社区全面开源，采用 Apache 2.0 License。


- 官网地址：<http://docs.openyuanrong.org/ >  

- 源码地址：<https://atomgit.com/openeuler/yuanrong>

- 问题反馈：<https://atomgit.com/openeuler/yuanrong/issues>

欢迎添加 openYuanrong 小助手微信，由小助手拉您进我们的官方群获得最新资讯

![alt text](0317-01.png)