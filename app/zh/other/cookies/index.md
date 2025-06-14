---
title: '关于COOKIES'
---

<script setup>
  import CookieReset from '~@/components/CookieReset.vue';
</script>

<div class='markdown markdown-statement'>

# 关于 COOKIES

<hr/>

## （一）Cookie

Cookie是一种网络服务器存储在计算机或移动设备上的纯文本文件。Cookie的内容只能由创建它的服务器检索或读取。每个Cookie对您的网络浏览器或移动应用程序都是唯一的。Cookie通常包含标识符、站点名称以及一些号码和字符。

openEuler社区有时会在计算机或移动设备上存储Cookie，我们启用Cookie的目的在于改善用户体验，包括：

1. 严格必要的Cookie：当您使用网站时，Cookie将确保您对该网站的访问尽可能顺利、安全；

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>来源</th>
      <th>到期时间</th>
      <th>目的</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>_Y_G_</td>
      <td>openEuler网站</td>
      <td>会话</td>
      <td>维持用户登录会话</td>
    </tr>
    <tr>
      <td>_U_T_</td>
      <td>openEuler网站</td>
      <td>10小时</td>
      <td>防止跨站请求伪造攻击</td>
    </tr>
    <tr>
      <td>HWWAFSESID, HWWAFSESTIME</td>
      <td>华为云Waf</td>
      <td>会话</td>
      <td>防止恶意攻击</td>
    </tr>
    <tr>
      <td>_forum_session, _t</td>
      <td>论坛网站</td>
      <td>7天</td>
      <td>维持用户会话</td>
    </tr>
    <tr>
      <td>express_sid</td>
      <td>etherpad网站</td>
      <td>1天</td>
      <td>维持用户会话</td>
    </tr>
    <tr>
      <td>token</td>
      <td>etherpad网站</td>
      <td>60天</td>
      <td>记录由客户端生成的作者随机令牌</td>
    </tr>
    <tr>
      <td>sessionId</td>
      <td>兼容性测评网站</td>
      <td>30分钟</td>
      <td>维持用户会话</td>
    </tr>
    <tr>
      <td>XSRF_TOKEN</td>
      <td>兼容性测评网站</td>
      <td>30分钟</td>
      <td>防止跨站请求伪造攻击</td>
    </tr>
    <tr>
      <td>Authorization</td>
      <td>EulerMaker网站</td>
      <td>4小时</td>
      <td>维持用户会话</td>
    </tr>
    <tr>
      <td>agreed-cookiepolicy</td>
      <td>openEuler网站</td>
      <td>6个月</td>
      <td>记录用户是否同意接受Cookie</td>
    </tr>
    <tr>
      <td>openEuler-theme-appearance</td>
      <td>openEuler网站</td>
      <td>6个月</td>
      <td>记录用户对网站主题风格的选择</td>
    </tr>
    <tr>
      <td>prefs</td>
      <td>etherpad网站</td>
      <td>1年1月1周</td>
      <td>记录客户端的偏好设置，用来设置字体系列、颜色等内容</td>
    </tr>
  </tbody>
</table>

2. 统计分析：用于收集用户如何访问网页, 以便帮助我们了解本服务是如何运行、使用的；

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>来源</th>
      <th>到期时间</th>
      <th>目的</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>百度统计相关Cookie，详细名称请参见<a href="https://tongji.baidu.com/holmes/Analytics/隐私合规指南/百度统计相关Cookie列表/">百度统计相关Cookie列表</a></td>
      <td>详细来源请参见<a href="https://tongji.baidu.com/holmes/Analytics/隐私合规指南/百度统计相关Cookie列表/">百度统计相关Cookie列表</a></td>
      <td>详细到期时间请参见<a href="https://tongji.baidu.com/holmes/Analytics/隐私合规指南/百度统计相关Cookie列表/">百度统计相关Cookie列表</a></td>
      <td>详细目的请参见<a href="https://tongji.baidu.com/holmes/Analytics/隐私合规指南/百度统计相关Cookie列表/">百度统计相关Cookie列表</a></td>
    </tr>
  </tbody>
</table>

openEuler社区不会将Cookie用于本声明所述目的之外的任何用途。您可根据自己的偏好管理或删除Cookie。有关详情，请参见 [AboutCookies.org](https://www.aboutcookies.org/)。您可以清除计算机上保存的所有Cookie，大部分网络浏览器都设有阻止Cookie的功能。但如果您这么做，则需要在每一次访问我们的网站时亲自更改用户设置。如需详细了解如何更改浏览器设置，请访问以下链接：[internet Explorer](https://support.microsoft.com/zh-cn/help/17442/windows-internet-explorer-delete-manage-cookies)、[google Chrome](https://support.google.com/chrome/answer/95647)、[mozilla Firefox](https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer?redirectlocale=en-US&redirectslug=Cookies)、[safari](https://support.apple.com/kb/PH19214?locale=zh_CN)和[opera](https://help.opera.com/en/latest/security-and-privacy/)。

如果您清除Cookie，则需要在每一次访问openEuler社区的网站时亲自更改用户设置。同时也请注意，openEuler社区的某些服务可能必须使用Cookie，禁用Cookie可能会影响您使用这些服务的全部或部分功能。

您可以通过点击<CookieReset/>撤销对非必要Cookie的同意。

## （二） 其他类似的技术

除Cookie之外，我们可能会使用其他技术来自动收集信息。

浏览器网络存储：我们可能会使用浏览器网络存储（包括通过HTML5），也称为本地存储对象，从而达到与Cookie类似的目的。浏览器Web存储可以存储比Cookie更多的数据量。您的网络浏览器可能会提供清除浏览器网络存储的功能。

我们使用如下本地存储：

1. **LocalStorage**
   - **a)** 统计分析：oa-openEuler-client，oa-openEuler-events，oa-openEuler-session
     <br/>
     来源：openEuler网站
     <br/>
     目的：记录您的应用id，事件，会话
   - **b)** 搜索历史：search-history
     <br/>
     来源：openEuler网站
     <br/>
     目的：记录您的站内历史搜索记录
   - **c)** 新手引导步骤：tour_guide
     <br/>
     来源：openEuler网站
     <br/>
     目的：记录您站内新手引导的进度步骤

## （三）Do Not Track（请勿追踪）

很多网络浏览器均设有Do Not Track功能，该功能可向网站发布Do Not Track请求。目前，主要互联网标准组织尚未设立相关政策来规定网站应如何应对此类请求。

openEuler社区没有根据您选择的“请勿跟踪”设置或您的浏览器可能提供的其他“选择退出”设置或特性，改变本文中详述的数据收集和使用方式。但是，openEuler社区保留在今后不通知您的情况下改变数据处理方式的权利。

</div>
