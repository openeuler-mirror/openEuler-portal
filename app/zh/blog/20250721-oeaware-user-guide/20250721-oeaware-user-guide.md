---
title: oeAware 安装与使用指南
category: blog 
date: 2025-07-21
tags:
    - openEuler
    - oeAware
archives: 2025-07-21
author:  openEuler
summary: oeAware 是在 OpenAtom openEuler（简称：“openEuler”或“开源欧拉”）上实现低负载采集感知调优的框架，目标是动态感知系统行为后智能使能系统的调优特性。传统调优特性都以独立运行且静态打开关闭为主，oeAware 将调优拆分采集、感知和调优三层，每层通过订阅方式关联，各层采用插件式开发尽可能复用 。
---

oeAware 是在 OpenAtom openEuler（简称：“openEuler”或“开源欧拉”）上实现低负载采集感知调优的框架，目标是动态感知系统行为后智能使能系统的调优特性。传统调优特性都以独立运行且静态打开关闭为主，oeAware 将调优拆分采集、感知和调优三层，每层通过订阅方式关联，各层采用插件式开发尽可能复用 。

### 安装

配置 openEuler 的 yum 源，使用 yum 命令安装。在 openEuler 22.03 LTS SP4 的后续版本的软件镜像中都包含该软件。

```bash
yum install oeAware-manager
```

### 使用方法

首先启动 oeAware 服务，然后通过 `oeawarectl` 命令进行使用。

#### 服务启动

通过 systemd 服务启动。安装完成后会默认启动。

```bash
systemctl start oeaware
```

配置文件

配置文件路径：/etc/oeAware/config.yaml

```yaml
# 日志存储路径
log_path:/var/log/oeAware
# 日志等级 1：DEBUG 2：NFO 3：WARN 4：ERROR
log_level:1
#默认使能插件
enable_list:    
    #只配置插件，使能本插件的所有实例    
    -name:libtest.so    
    #配置插件实例，使能配置的插件实例    
    -name:libtest1.so        
    instances:            
        -instance1            
        -instance2            
        ...    
    ...
#可支持下载的包
plugin_list:    
    #名称需要唯一，如果重复取第一个配置    
    -name:test        
    description:helloworld        
    #url非空        
    url:https://gitee.com/openeuler/oeAware-manager/raw/master/README.md
...
```

修改配置文件后，通过以下命令重启服务。

```bash
systemctl restart oeaware
```

#### 插件说明

**插件定义**：一个插件对应一个.so 文件，插件分为采集插件、感知插件和调优插件,[插件开发方法](https://docs.openeuler.org/zh/docs/24.03_LTS_SP2/server/performance/tuning_framework/oeaware/oeaware_user_guide.html#%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91%E8%AF%B4%E6%98%8E)。

**实例定义**：服务中的调度单位是实例，一个插件中包括多个实例。例如，一个采集插件包括多个采集项，每个采集项是一个实例。

#### 插件加载

服务会默认加载插件存储路径下的插件。

插件路径：/usr/lib64/oeAware-plugin/

另外也可以通过手动加载的方式加载插件。

```bash
oeawarectl -l | --load <插件名>
```

示例

```bash
[root@localhost ~]# oeawarectl -l libthread_collect.so
Plugin loaded successfully.
```

失败返回错误说明。

#### 插件卸载

```bash
oeawarectl -r <插件名> | --remove <插件名>
```

示例

```bash
[root@localhost ~]# oeawarectl -r libthread_collect.so
Plugin remove successfully.
```

失败返回错误说明。

#### 插件查询

##### 查询插件状态信息

```bash
oeawarectl -q  #查询系统中已经加载的所有插件
oeawarectl --query <插件名> #查询指定插件
```

示例

```bash
[root@localhost ~]# oeawarectl -q
Show plugins and instances status.
------------------------------------------------------------
libsystem_tune.so
        stealtask_tune(available, close, count: 0)
        smc_tune(available, close, count: 0)
        xcall_tune(available, close, count: 0)
        seep_tune(available, close, count: 0)
libpmu.so
        pmu_counting_collector(available, close, count: 0)
        pmu_sampling_collector(available, close, count: 0)
        pmu_spe_collector(available, close, count: 0)
        pmu_uncore_collector(available, close, count: 0)
libdocker_tune.so
        docker_cpu_burst(available, close, count: 0)
libthread_scenario.so
        thread_scenario(available, close, count: 0)
libsystem_collector.so
        thread_collector(available, close, count: 0)
        kernel_config(available, close, count: 0)
        command_collector(available, close, count: 0)
libdocker_collector.so
        docker_collector(available, close, count: 0)
libub_tune.so
        unixbench_tune(available, close, count: 0)
libanalysis_oeaware.so
        analysis_aware(available, close, count: 0)
------------------------------------------------------------
format:[plugin]
        [instance]([dependency status], [running status], [enable cnt])
dependency status: available means satisfying dependency, otherwise unavailable.
running status: running means that instance is running, otherwise close.
enable cnt: number of instances enabled.
```

失败返回错误说明。

##### 查询运行实例订阅关系

```bash
oeawarectl -Q  #查询所有运行实例的订阅关系图
oeawarectl --query-dep= <插件实例>  #查询运行实例订阅关系图
```

在当前目录下生成 dep.png，显示订阅关系。

实例未运行，不会显示订阅关系。

示例

```bash
oeawarectl -e thread_scenario
oeawarectl -Q
```

img

#### 插件实例使能

##### 使能插件实例

```bash
oeawarectl -e | --enable <插件实例>
```

使能某个插件实例，会将其订阅的 topic 实例一起使能。

失败返回错误说明。

推荐使能插件列表：

- libsystem_tune.so：stealtask_tune，smc_tune，xcall_tune，seep_tune。
- libub_tune.so：unixbench_tune。
- libtune_numa.so：tune_numa_mem_access。

其他插件主要用来提供数据，可通过 sdk 获取插件数据。

##### 关闭插件实例

```bash
oeawarectl -d | --disable <插件实例>
```

关闭某个插件实例，会将其订阅的 topic 实例一起关闭。

失败返回错误说明。

#### 插件下载安装

通过 `--list` 命令查询支持下载的 rpm 包和已安装的插件。

```bash
oeawarectl --list
```

查询结果如下。

```
Supported Packages: #可下载的包
[name1] #config中配置的plugin_list
[name2]
...
Installed Plugins: #已安装的插件
[name1]
[name2]
...
```

通过 `--install` 命令下载安装 rpm 包。

```bash
oeawarectl -i | --install <rpm包名> #指定--list下查询得到的包名称（Supported Packages下的包）
```

失败返回错误说明。

#### 分析模式

```bash
oeawarectl analysis -h
usage: oeawarectl analysis [options]...
 options
   -t|--time <s>              set analysis duration in seconds(default 30s), range from 1 to 100.
   -r|--realtime              show real time report.
   -v|--verbose               show verbose information.
   -h|--help                  show this help message.
```

示例

执行以下命令，输出系统分析报告。

```bash
oeawarectl analysis -t 10
```

结果如下

```
============================================================================================
                                    Summary Analysis Report
============================================================================================
========================================= Suggest =========================================
Tune Instance                  | Suggest    | Note
stealtask_tune                 | No         | CpuRatio(average) :   0.17%
smc_tune                       | No         | Collecting very little network access
gazelle                        | No         | Collecting very little network access
tune_numa_mem_access           | No         | No access
========================================= Network =========================================
Local network communication distribution
 Node0   Node1   Node2   Node3
 0.00%   0.00%   0.00%   0.00%
Remote network communication distribution(receive)
matrix representation of network thread nodes to irq nodes
        Node0   Node1   Node2   Node3
Node0 100.00%   0.00%   0.00%   0.00%
Node1   0.00%   0.00%   0.00%   0.00%
Node2   0.00%   0.00%   0.00%   0.00%
Node3   0.00%   0.00%   0.00%   0.00%
======================================== Solution ========================================
No solution.
```

报告分为三部分：

- Suggest：根据系统运行状态，给出调优建议。
- Network：网络使用情况。
- Solution：给出具体调优方法。

#### 帮助

通过 `--help` 查看帮助。

```bash
usage: oeawarectl [options]...
 options
    -l|--load [plugin]      load plugin.
    -r|--remove [plugin]    remove plugin from system.
    -e|--enable [instance]  enable the plugin instance.
    -d|--disable [instance] disable the plugin instance.
    -q                      query all plugins information.
    --query [plugin]        query the plugin information.
    -Q                      query all instances dependencies.
    --query-dep [instance]  query the instance dependency.
    --list                  the list of supported plugins.
    -i|--install [plugin]   install plugin from the list.
    --help                  show this help message.
```
