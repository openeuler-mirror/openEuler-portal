---
title: Patch通过邮件列表转换PR指引
category: blog 
date: 2023-07-11
tags:
    - openEuler
    - Patch转PR
archives: 2023-07
author: wanghaosq
sig: Infrastructure
summary: Patch通过邮件列表转换PR简介与指引
---

# Patch通过邮件列表转PR提交
## 一、简介
### 1.概述
此功能以patchwork，git-pw以及getmail等开源工具为基础进行搭建，使用自定义脚本进行业务处理。<br>
### 2.工具简介
patchwork: 基于django开发的web端patch追踪系统 <br>
getmail: 一个邮件下载工具，结合patchwork对邮件进行解析入库  <br>
git-pw： 一个patch下载工具，结合patchwork对补丁进行下载操作  <br>
### 3.项目地址文档和脚本路径：<br>
[patchwork](https://github.com/getpatchwork/patchwork) <br>
[getmail](https://github.com/getmail6/getmail6) <br>
[git-pw](https://patchwork.readthedocs.io/projects/git-pw/en/latest/) <br>
[自定义脚本](https://gitee.com/openeuler/infrastructure/blob/master/ci/tools/patch2pr/multi_patch2pr.py)

## 二、使用指引
### 1.新建诉求
请在[基础设施仓库](https://gitee.com/openeuler/infrastructure/issues) 下新建issue，表明需要纳管到服务下的仓库，分支以及邮件列表地址。

### 2.提交pr
提交配置相关的pull request<br>
配置文件路径https://gitee.com/openeuler/infrastructure/tree/master/ci/tools/patch2pr/repositories_branches_map.yaml <br>
```yaml
# 配置参考
mapping:
  src-openeuler/kernel:                            # 组织/仓库
    mailing-list: "kernel-build@openeuler.org"     # 邮件列表地址
    env:                                           # 服务所需环境变量
      host: "SRC_OPENEULER_KERNEL_HOST"            # 邮件host,建议格式为SRC_OPENEULER_REPO_HOST, REPO值根据仓库名进行修改
      pass: "SRC_OPENEULER_KERNEL_PASS"            # 邮件password,建议格式为SRC_OPENEULER_REPO_PASS, REPO值根据仓库名进行修改
    branches:                                      # 分支信息
      build-5.10-rc: 'build-5.10-rc'
      master: 'master'
      openEuler-20.03-LTS: 'openEuler-20.03-LTS'
```

## 三、流程与功能说明
### 1.配置服务
由基础设施小组进行服务配置，参数来源自上述issue中提供的参数以及合入相关pr，完成后基础设施小组会在issue上进行回复并关闭issue，通知责任人功能已可用。

### 2.制作patch
开发者使用git format-patch命令进行补丁制作， 命令示例如下。<br>

单一补丁(两种方式择一)
```shell
1.单一补丁+封面
git format-patch -1 --subject-prefix="PATCH branch_name" --cover-letter

2.单一补丁
git format-patch -1 --subject-prefix="PATCH branch_name"
```

多个补丁
```shell
n表示要选取的commit数
git format-patch -n --subject-prefix="PATCH branch_name" --cover-letter
```

注意！！！
```text
允许的subject-prefix： 
1.分支名+版本号: [PATCH branch_name v2], [PATCH v2 branch_name]
2.分支名： [PATCH branch_name]

不允许的subject-prefix：
1.缺失PATCH字段： [branch_name], [v2 branch_name], [branch_name v2],
2.PATCH小写： [patch ...]
3.缺少分支: [PATCH]
```

### 2.发送patch邮件到邮件列表
开发者通过git send-email的方式发送邮件到邮件列表，如不熟悉，可参考如下[git send-email文档](https://git-scm.com/docs/git-send-email)
<br>命令示例： git send-email *.patch --to "" --cc "" --suppress-cc=all

注意！！！
```text
1.创建的补丁如果含有封面，请将封面和补丁邮件一并进行发送，如果不发送封面则无法创建pr
2.发送补丁集请发送完整，不要出现遗漏
```

### 3.patch转化为pr
后台服务5min进行一次轮询（有任务进行时会延期轮询），查看邮箱是否到达新邮件并通过getmail工具拉取，使用git-pw进行patch下载，合并补丁到对应分支，
提交pr并邮件通知补丁发送者，抄送邮件列表