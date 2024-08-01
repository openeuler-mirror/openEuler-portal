---
title: FAQs
custom-layout: true
category: faq
anchor: true
---

<!-- <script setup>
  import TheFAQ from "~@/views/faq/TheFAQ.vue"
</script> -->

<div class="markdown">

# openEuler FAQs

## Cloud Native

### 1. Why does the container fail to start when the default runtime of iSulad is changed to `lxc` and the error message "failed to initialize engine or runtime" is displayed?

The default runtime of iSulad is `runc`. When the default runtime is set to `lxc`, dependencies might be missing. If you need to change the default runtime of iSulad to `lxc`, you need to install the `lcr` and `lxc` software packages and set `runtime` in the iSulad configuration file to `lcr`. Alternatively, you can specify `--runtime lcr` when starting the container. After the container is started, do not uninstall the `lcr` and `lxc` software packages; otherwise, residual resources may remain when the container is deleted.

### 2. Why is the error message "rpc error: code = Unimplemented desc =" displayed when the iSulad `CRI V1` interface is used?

iSulad supports both `CRI V1alpha2` and `CRI V1` interfaces. By default, `CRI V1alpha2` is used. To use `CRI V1`, you need to enable the `CRI V1` configuration in the iSulad configuration file **`/etc/isulad/daemon.json`**:

```json
{
    "enable-cri-v1": true
}
```

If you are compiling iSulad from the source code, add the `cmake` compilation option `-D ENABLE_CRI_API_V1=ON` during compilation.

### 3. Why does isula-build fail to pull images and the error message "pinging container registry xx: get xx: dial tcp host:repo: connect: connection refused" is displayed?

The pulled image may come from an unauthorized repository. You can modify the configuration file **`/etc/isula-build/registries.toml`** of the isula-build image repository, add the untrusted repository to `[registries.insecure]`, and restart isula-build.

### 4. Why does deployment of Kubernetes + Docker fail?

Starting from version 1.21, Kubernetes no longer supports deploying clusters with Docker. To resolve this, you can use cri-dockerd + Docker, or opt for containerd or iSulad for cluster deployment. 

### 5. Why cannot openEuler directly install Kubernetes-related RPM packages using yum?

This is because the EPOL-related part of the **yum** repo source needs to be configured for the Kubernetes-related RPM package. You can view the [openEuler Forum](https://forum.openeuler.org/t/topic/768) and reconfigure the EPOL source in the environment.

### 6. Why does Kmesh report an error and exit when the Kmesh service is started?

![](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Kmesh/figures/not_set_cluster_ip.png)

Check whether the IP address of the control plane program is correctly configured. In cluster startup mode, the Kmesh service needs to communicate with the control plane program and obtain configuration information from the control plane.Therefore, you need to set the correct IP address of the control plane program. This is done through cluster startup mode in [**installation and deployment**](https://docs.openeuler.org/en/docs/24.03_LTS/docs/Kmesh/installation-and-deployment.html).

### 7. Why is the message "get kube config error!" displayed when the Kmesh service is started?

![](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Kmesh/figures/get_kubeconfig_error.png)

In cluster mode, the Kmesh service automatically obtains the IP address of the control plane program based on Kubernetes configurations. If the **kubeconfig** path is not configured in the system, Kmesh will fail to obtain the configurations, and reports "get kube config error!" To correctly configure the IP address of the control plane program, you can modify the Kmesh configuration file by configuring **kubeconfig** as follows:

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

<p style="margin-top:32px">

If the above FAQs cannot resolve your issue, please send an email to our [mailing lists](/en/community/mailing-list/) describing your issue or discuss it on the [openEuler Forum](https://forum.openeuler.org/).

</p>

</div>