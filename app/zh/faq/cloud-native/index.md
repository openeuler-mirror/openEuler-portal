---
title: FAQs
custom-layout: true
category: faq
anchor: true
---

<div class="markdown">

# openEuler 常见问题

## 云原生

### 1. 修改iSulad默认运行时为lxc，启动容器报错：Failed to initialize engine or runtime

若需修改iSulad默认运行时为lxc，需要安装lcr、lxc软件包依赖，且配置iSulad配置文件中runtime为lcr 或者启动容器时指定--runtime lcr。启动容器后不应该随意卸载lcr、lxc软件包，否则可能会导致删除容器时的资源残留。

详情请查看[iSulad容器引擎的常见问题](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Container/isula%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html)

### 2. 使用iSulad CRI V1接口，报错：rpc error: code = Unimplemented desc =

在iSulad配置文件/etc/isulad/daemon.json中开启CRI V1的配置。

详情请查看[iSulad容器引擎的常见问题](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Container/isula%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html)

### 3. isula-build拉取镜像报错：pinging container registry xx: get xx: dial tcp host:repo: connect: connection refused

拉取的镜像来源于非授信仓库，因此需要修改isula-build镜像仓库的配置文件/etc/isula-build/registries.toml，将该非授信仓库加入[registries.insecure]，重启isula-build。

### 4. Kubernetes + docker为什么无法部署

Kubernetes自1.21版本开始不再支持Kubernetes + docker部署Kubernetes集群。需要改为使用cri-dockerd+docker部署集群，也可以使用containerd或者iSulad部署集群。

### 5. openEuler无法通过yum直接安装Kubernetes相关的rpm包

参考[链接](https://forum.openeuler.org/t/topic/768)中repo源，重新配置环境中的EPOL源。

### 6. 在使用集群启动模式时，若没有配置控制面程序ip信息，Kmesh服务启动后会报错退出

参考[安装与部署](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Kmesh/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.html)章节中集群启动模式，设置正确的控制面程序ip信息。

### 7. Kmesh服务在启动时,提示"get kube config error!"

集群启动模式下，Kmesh服务会根据k8s的配置，自动获取控制面程序ip信息，若环境中没有配置k8s的kubeconfig路径，会导致获取kubeconfig失败，然后提示上述信息。（若已经手动修改Kmesh的配置文件，正确配置控制面程序ip信息，该问题可忽略）。

具体解决方式请参考文档[Kmesh用户指南的常见问题2](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Kmesh/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%982kmesh%E6%9C%8D%E5%8A%A1%E5%9C%A8%E5%90%AF%E5%8A%A8%E6%97%B6%E6%8F%90%E7%A4%BAget-kube-config-error)

<p style="margin-top:32px">

如常见问题内未能解决您的需求，请邮件至社区[邮件列表](/zh/community/mailing-list/)或[社区论坛](https://forum.openeuler.org/)交流

</p>

</div>