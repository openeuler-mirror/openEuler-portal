---
title: FAQs
custom-layout: true
category: faq
anchor: true
---

<div class="markdown">

# openEuler 常见问题

## 应用开发

### 1. 部分依赖java-devel的应用程序自编译失败

为了提供更新的openjdk特性和对广大java应用程序的兼容，openEuler同时提供了openjdk-1.8.0、openjdk-11等多个版本的openjdk。部分应用程序在编译时需要依赖java-devel包，安装java-devel包时系统会默认安装更高版本的java-11-openjdk，从而导致这些应用的编译失败。因此用户需手动使用命令 `# yum install java-1.8.0-openjdk` 安装java-1.8.0-openjdk后再使用rpmbuild命令进行自编译。

<p style="margin-top:32px">

如常见问题内未能解决您的需求，请邮件至社区[邮件列表](/zh/community/mailing-list/)或[社区论坛](https://forum.openeuler.org/)交流

</p>

</div>