---
title: 'Guidance to Post a News'
category: news
---

<div id="post-news-content">

## 准备

1. 参考<https://docs.atomgit.com/docs/start/quick> 注册 AtomGit 账号。

2. 在 AtomGit 个人设置中设置主邮箱地址，在此<https://atomgit.com/setting/email>。

3. 签署贡献者协议，<https://www.openeuler.org/zh/other/cla>。

4. 参考<https://docs.atomgit.com/docs/help/home/general-reference/git>准备你的git环境

## 理解新闻格式

openEuler 是用 markdown 格式写新闻的。
请阅读该文章 <https://atomgit.com/openeuler/openEuler-portal/blob/master/app/zh/interaction/post-news/index.md>来理解 openEuler 新闻是如何设计的。

文件头需要包含如下信息：

```
---
title: Sample Post
date: '2020-03-03'
tags:
    - theme
banner: img/banners/banner-2020hdc.png
author:
  - openEuler
sig: sig-xxx
summary: Just about everything you'll need to style in the theme：headings, paragraphs, blockquotes, tables, code blocks, and more.
---

Here you can edit your news.
```

## 提交新闻

新闻的提交利用了 AtomGit 的 PR(Pull Request)。

1. Fork openEuler 新闻项目 <https://atomgit.com/openeuler/openEuler-portal> 到你自己的 AtomGit 上。如果需要具体指导请参考 <https://docs.atomgit.com/docs/help/home/org_project/pullrequests/pr-fork> 。

2. Clone 代码

```
git clone https://atomgit.com/<your-atomgit-id>/openEuler-portal
```

3. 创建分支

```
git checkout -b <branch-name>
```

4. 创建工作路径

如果你发表中文新闻，工作路径是 app/zh/news 。
假设你要写一个英文新闻：

```
cd app/en/news
mkdir <your-atomgit-id>
cd <your-atomgit-id>
touch YEAR-MONTH-DAY-title.md
```

你可以以你的 md 文档名来命名你的资源文件，方便使用。例如：

```
YEAR-MONTH-DAY-title-NN.MARKUP
```

其中，YEAR, MONTH, DAY, 和 title 和你的新闻 md 文件名一致。NN 是 01、02、03 这样的序号。MARKUP 文件扩展名。如下例子：

```
2020-01-01-new-years-is-coming.md
2020-01-01-new-years-is-coming-01.png
2020-01-01-new-years-is-coming-02.gif
2020-01-01-new-years-is-coming-03.pdf
```

使用 HTML \<img\> 标签嵌入图片， 但你的图片资源需要放入当前目录下（即 your-atomgit-id 目录下），输入图片名称作为 src 值：

```
<img src = "./2020-01-01-new-years-is-coming-01.png">
```

1. Commit 你的新闻

```
git add <file-path>
git commit -m "<message>"
git push origin <branch-name>:<branch-name>
```

2. 参考 <https://docs.atomgit.com/docs/help/home/org_project/pullrequests/pr-fork> 提交你的 PR

3. 等待评审和合入。

</div>
