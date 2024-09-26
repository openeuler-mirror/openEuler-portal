---
title: '【案例】audit写日志占满分区空间出现系统停机'
date: '2024-07-05'
category: blog
tags:
  - 案例库
  - audit
  - log
author: '徐饶青'
summary: '案例分析：audit写日志占满分区空间出现系统停机'
---

# audit写日志占满分区空间出现系统停机

## 问题背景

系统异常停机，需要排查停机原因。

## 现象描述
查看日志记录是由audit执行停机动作，按照预期已配置日志回滚，不应该停机。
查看audit日志目录，存在记录大量日志且已占满空间，如下：

```
-r--------. 1 root root 6291639  May 14 04:10 audit.log.968
-r--------. 1 root root 6291629  May 14 03:28 audit.log.969
-r--------. 1 root root 6291630  May 14 02:45 audit.log.970
-r--------. 1 root root 6291627  May 14 02:03 audit.log.971
-r--------. 1 root root 6291546  May 14 01:20 audit.log.972
-r--------. 1 root root 6291689  May 14 00:38 audit.log.973
-r--------. 1 root root 6291705  May 13 23:57 audit.log.974
-r--------. 1 root root 6291528  May 13 23:14 audit.log.975
...
```

## 原因分析
从现象上看，疑似audit日志回滚能力失效，检查auditd.conf配置：

```
...
max_log_file = 6 // 日志文件大小6MB
num_logs = 5     // 最大日志文件数5
...
admin_space_left = 50
admin_space_left_action = halt //空间小于admin_space_left执行停机
...
```

按照上述配置，最多出现5个日志文件，但实际超过设定值，不符合预期；系统停机是配置的默认动作，符合预期。

检查message日志，排查audit是否出现异常信息：

```
...
2024-06-09T04:59:46.424433+08:00 localhost auditd[21699]: Audit daemon rotating long files with keep option
...
```

从日志来看，触发了audit日志回滚，但是使用“keep option”选项，查看auditd.conf配置：

```
...
max_log_file_action = keep_logs //keep_logs 与rotate相似，但忽略num_logs选项
...
```

综上所述，此案例下audit写日志占满空间是由于配置“max_log_file_action = keep_logs”导致"num_logs = 5"参数失效。
## 解决方案
将max_log_file_action设置为rotate即可。