---
title: '【案例】isulad使用grpc与rest直接调用服务方法'
date: '2024-09-30'
category: blog
tags:
  - 案例库
  - isulad
  - grpc
  - rest
author: '钟涛'
summary: '案例分析：isulad使用grpc与rest直接调用服务方法'
---

# isulad使用grpc与rest直接调用服务方法

## isulad使用grpc直接调用服务方法

isula与isulad之间的通信默认使用grpc，且k8s场景CRI接口调用只能使用grpc。

若用户想在第三方组件中直接通过gRPC连接向iSulad请求服务，可参照<https://gitee.com/openeuler/iSulad/tree/master/src/api/services>不同功能模块目录下的proto文件获取gRPC请求格式。

调试grpc调用可使用grpcurl工具，grpcurl 是 Go 语言开源社区开发的工具，需要手工安装：
```sh
$ go get github.com/fullstorydev/grpcurl
$ go install github.com/fullstorydev/grpcurl/cmd/grpcurl
```

调试grpc调用时可参照以下命令：
```sh
grpcurl -plaintext -H 'tls_mode:0' -proto=api.proto -import-path=../ -unix=true /var/run/isulad.sock runtime.v1alpha2.ImageService.ListImages
```

## isulad使用rest直接调用服务方法

若isula与isulad之间想要使用更轻量级的rest进行通信，需要在[iSulad](https://gitee.com/openeuler/iSulad) 仓库获取iSulad源码进行源码编译，源码编译的教程可参照：<https://gitee.com/openeuler/iSulad/blob/master/docs/build_docs/README_zh.md>

在源码编译时使用如下编译选项可更换isula与isulad的交互方式为rest：
```sh
cmake -DENABLE_GRPC=OFF …/
```
调试rest调用可直接使用curl工具，调试的具体方式可参照以下命令：
```sh
curl -d "{}" --unix-socket /var/run/isulad.sock http://localhost/ContainerService/Version
```