> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# 组件组合范式

本文件记录 OpenDesign 组件库中跨组件的组合模式，帮助 AI 在还原整页设计稿时正确嵌套和组装组件。

---

## 表单校验模式

### 嵌套结构
```
OForm > OFormItem > 表单控件（OInput / OSelect / OTextarea / OCheckboxGroup / ORadioGroup / OInputNumber / OIpInput）
```

### 发现来源
源码发现：OForm 通过 `formInjectKey` provide 表单模型和校验方法；OFormItem 通过 `formItemInjectKey` provide 字段级校验状态；各表单控件 inject `formItemInjectKey` 触发校验。

### 模板示例
```vue
<script setup>
import { ref } from 'vue';
import { OForm, OFormItem, OInput, OSelect, OOption, OButton } from '@opensig/opendesign';

const formModel = ref({ name: '', type: '' });
const formRef = ref();
const rules = {
  name: [{ required: true, message: '请输入名称' }],
  type: [{ required: true, message: '请选择类型' }],
};

const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (valid) { /* submit */ }
};
</script>

<template>
  <OForm ref="formRef" :model="formModel" :rules="rules">
    <OFormItem label="名称" field="name">
      <OInput v-model="formModel.name" placeholder="请输入" />
    </OFormItem>
    <OFormItem label="类型" field="type">
      <OSelect v-model="formModel.type" placeholder="请选择">
        <OOption value="a" label="类型A" />
        <OOption value="b" label="类型B" />
      </OSelect>
    </OFormItem>
    <OFormItem>
      <OButton color="primary" variant="solid" @click="handleSubmit">提交</OButton>
    </OFormItem>
  </OForm>
</template>
```

### 关键约束
- OFormItem 的 `field` prop 必须与 `formModel` 中的字段名对应
- OForm 的 `model` 必须是响应式对象（`ref` 或 `reactive`）
- 表单控件必须使用 `v-model` 绑定到 `formModel` 的对应字段
- `rules` 对象的 key 必须与 `field` prop 一致
- OFormItem 不能脱离 OForm 独立使用校验功能

### 设计稿页面特征
页面中竖向排列的"标签 + 输入框"行列表，底部有提交按钮 → 表单校验模式。每行左侧为文字标签，右侧为输入控件，标签与控件横向排列或上下排列。

---

## 弹窗确认模式

### 嵌套结构
```
ODialog > 内容区 + OButton（footer 操作按钮）
```

### 发现来源
源码发现：ODialog 内部渲染 OLayer 作为遮罩层，使用 OScrollbar 管理内容滚动，footer 区域放置 OButton 操作按钮。

### 模板示例
```vue
<script setup>
import { ref } from 'vue';
import { ODialog, OButton } from '@opensig/opendesign';

const visible = ref(false);
</script>

<template>
  <OButton @click="visible = true">打开弹窗</OButton>
  <ODialog v-model:visible="visible" title="确认操作">
    <p>确定要执行此操作吗？</p>
    <template #foot>
      <OButton @click="visible = false">取消</OButton>
      <OButton color="primary" variant="solid" @click="handleConfirm">确认</OButton>
    </template>
  </ODialog>
</template>
```

### 关键约束
- ODialog 通过 `v-model:visible` 控制显隐
- 移动端（≤1200px 触控设备）ODialog 自动从底部滑入，操作按钮变为文字样式
- ODialog 内部使用 OLayer，继承 OLayer 的遮罩和层级管理
- footer 中的 OButton 在移动端自动适配为 text 变体

### 设计稿页面特征
居中浮层 + 半透明遮罩背景，浮层内有标题栏、内容区、底部操作按钮区 → 弹窗确认模式。移动端为底部全宽弹出面板。

---

## 下拉选择模式

### 嵌套结构
```
OSelect > OOption + OOptionGroup（可选）
# 移动端自动切换为：
OSelect > ODialog > OOption
```

### 发现来源
源码发现：OSelect 桌面端使用 OPopup 展示下拉面板，移动端（`isPhonePad`）自动切换为 ODialog 展示选项列表。OOption 通过 `selectOptionInjectKey` 与 OSelect 通信。

### 模板示例
```vue
<OSelect v-model="selected" placeholder="请选择" clearable>
  <OOptionGroup label="水果">
    <OOption value="apple" label="苹果" />
    <OOption value="banana" label="香蕉" />
  </OOptionGroup>
  <OOptionGroup label="蔬菜">
    <OOption value="carrot" label="胡萝卜" />
  </OOptionGroup>
</OSelect>
```

### 关键约束
- OOption 必须作为 OSelect 的子组件使用（依赖 inject）
- 多选时 OOption 内部自动渲染 OCheckbox
- OOptionGroup 用于分组展示，不影响选中值
- 移动端下拉面板自动转为 ODialog，底部有确认/取消按钮

### 设计稿页面特征
输入框样式的触发区域 + 下方弹出的选项列表面板 → 下拉选择模式。面板中为等高的文字行列表，可能有分组标题。

---

## 级联选择模式

### 嵌套结构
```
OCascader > OSelect（内部复用） > OCascaderPanel（多级面板）
```

### 发现来源
源码发现：OCascader 内部包裹 OSelect，通过 OCascaderPanel 渲染多级选项面板。

### 模板示例
```vue
<OCascader v-model="value" :options="options" placeholder="请选择地区" />
```

### 关键约束
- OCascader 本质是 OSelect 的扩展，继承 OSelect 的大部分交互行为
- options 数据必须是树形结构（含 children 字段）
- 移动端同样使用 ODialog 展示级联面板

### 设计稿页面特征
输入框触发 + 弹出的多列面板（每列是一级选项），选中一列的项后右侧展开下一列 → 级联选择模式。

---

## 数据表格模式

### 嵌套结构
```
ODataTable > OScroller（横向/纵向滚动）+ OCheckbox（行选择）+ OPopover（单元格溢出提示）
# 配合分页：
ODataTable + OPagination
# 配合工具栏：
OButton / OInput + ODataTable + OPagination
```

### 发现来源
源码发现：ODataTable 内部使用 OScroller 管理表格滚动，OCheckbox 处理行选择，OPopover 处理单元格文字溢出提示。ODataTable 通过 `dataTableInjectKey` provide 表格数据和状态。

### 模板示例
```vue
<script setup>
import { ref } from 'vue';
import { ODataTable, OPagination, OButton } from '@opensig/opendesign';

const columns = [
  { key: 'name', title: '名称' },
  { key: 'status', title: '状态' },
];
const data = ref([...]);
const currentPage = ref(1);
</script>

<template>
  <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
    <OButton color="primary" variant="solid">新增</OButton>
  </div>
  <ODataTable :columns="columns" :data="data" row-key="id" selectable>
    <template #cell-status="{ row }">
      <OTag :color="row.status === 'active' ? 'success' : 'normal'">{{ row.status }}</OTag>
    </template>
  </ODataTable>
  <OPagination v-model="currentPage" :total="100" :page-size="10" style="margin-top: 16px;" />
</template>
```

### 关键约束
- `columns` 定义列配置（key 必须与 data 字段对应）
- `row-key` 用于行唯一标识，启用选择时必填
- 配合 OPagination 使用时需手动处理分页逻辑
- 单元格内容通过 `#cell-{key}` 动态插槽自定义

### 设计稿页面特征
表头行 + 多行数据行的网格布局，可能有左侧复选框列、右侧操作列，底部有分页器 → 数据表格模式。

---

## 导航菜单模式

### 嵌套结构
```
OMenu > OMenuItem + OSubMenu > OMenuItem（子菜单项）
```

### 发现来源
源码发现：OMenu 通过 `menuInjectKey` provide 导航状态；OSubMenu 通过 `subMenuInjectKey` provide 子菜单深度；OMenuItem inject 两者来注册和响应导航。

### 模板示例
```vue
<OMenu v-model="activeMenu" mode="horizontal">
  <OMenuItem value="home" label="首页" />
  <OSubMenu value="products" label="产品">
    <OMenuItem value="product-a" label="产品A" />
    <OMenuItem value="product-b" label="产品B" />
  </OSubMenu>
  <OMenuItem value="about" label="关于" />
</OMenu>
```

### 关键约束
- OMenuItem/OSubMenu 必须作为 OMenu 子组件使用
- OSubMenu 支持嵌套（多级菜单）
- `mode` 控制水平/垂直排列
- 水平模式下子菜单通过 OPopover 弹出，垂直模式下展开折叠

### 设计稿页面特征
水平排列的导航项 + 悬停/点击弹出的子菜单面板 → 水平导航菜单；垂直排列的菜单项列表 + 可展开/折叠的子项 → 侧边导航菜单。

---

## 标签页模式

### 嵌套结构
```
OTab > OTabPane（多个面板）
# 移动端标签溢出时：
OTab > OPopup / ODialog（标签选择器）
```

### 发现来源
源码发现：OTab 通过 `tabInjectKey` provide 标签页状态；OTabPane inject 来注册面板；标签溢出时使用 OPopup（桌面）或 ODialog（移动）展示更多标签。

### 模板示例
```vue
<OTab v-model="activeTab">
  <OTabPane value="info" label="基本信息">
    <p>基本信息内容</p>
  </OTabPane>
  <OTabPane value="settings" label="设置">
    <p>设置内容</p>
  </OTabPane>
</OTab>
```

### 关键约束
- OTabPane 必须作为 OTab 子组件使用
- `value` 是 OTabPane 的唯一标识，必须唯一
- 标签溢出时自动出现"更多"按钮

### 设计稿页面特征
顶部一行水平标签项 + 下方内容面板，标签项有底部指示器高亮 → 标签页模式。区别于 OAnchor 水平模式（无面板内容切换）。

---

## 步骤流程模式

### 嵌套结构
```
OStep > OStepItem（多个步骤节点）
# 配合内容切换：
OStep + 条件渲染内容区
```

### 发现来源
源码发现：OStep 通过 `stepInjectKey` provide 步骤信息；OStepItem inject 获取当前步骤状态。

### 模板示例
```vue
<script setup>
import { ref } from 'vue';
import { OStep, OStepItem, OButton } from '@opensig/opendesign';

const current = ref(1);
</script>

<template>
  <OStep :active="current">
    <OStepItem title="填写信息" />
    <OStepItem title="确认提交" />
    <OStepItem title="完成" />
  </OStep>
  <div v-if="current === 1">步骤1内容</div>
  <div v-else-if="current === 2">步骤2内容</div>
  <div v-else>完成!</div>
  <OButton @click="current++">下一步</OButton>
</template>
```

### 关键约束
- OStepItem 必须作为 OStep 子组件使用
- `active` 控制当前步骤（从 1 开始）
- 每个步骤有 wait/process/finish 三种状态
- 支持水平和垂直布局

### 设计稿页面特征
水平排列的步骤节点（圆形编号 + 标题 + 连接线） → 步骤流程模式。当前步骤高亮，已完成步骤有完成标记。

---

## 折叠面板模式

### 嵌套结构
```
OCollapse > OCollapseItem（多个折叠面板）
```

### 发现来源
源码发现：OCollapse 通过 `collapseInjectKey` provide 展开状态和点击处理；OCollapseItem inject 管理自身展开/折叠。

### 模板示例
```vue
<OCollapse v-model="activeKeys" accordion>
  <OCollapseItem value="1" title="第一部分">
    <p>第一部分的内容</p>
  </OCollapseItem>
  <OCollapseItem value="2" title="第二部分">
    <p>第二部分的内容</p>
  </OCollapseItem>
</OCollapse>
```

### 关键约束
- OCollapseItem 必须作为 OCollapse 子组件使用
- `accordion` 模式下同时只能展开一个面板
- `value` 是面板的唯一标识

### 设计稿页面特征
竖向堆叠的面板列表，每个面板有标题栏 + 可展开/折叠的内容区，标题栏右侧有展开箭头 → 折叠面板模式。

---

## 轮播展示模式

### 嵌套结构
```
OCarousel > OCarouselItem（多个轮播项）
```

### 发现来源
源码发现：OCarousel 通过 `carouselInjectKey` provide 轮播效果和状态；OCarouselItem inject 获取效果配置。

### 模板示例
```vue
<OCarousel autoplay :interval="3000">
  <OCarouselItem v-for="item in banners" :key="item.id">
    <img :src="item.url" :alt="item.title" />
  </OCarouselItem>
</OCarousel>
```

### 关键约束
- OCarouselItem 必须作为 OCarousel 子组件使用
- 支持 slide/fade 等切换效果
- `autoplay` 开启自动轮播，`interval` 控制间隔

### 设计稿页面特征
大幅图片/内容区域 + 底部指示点或侧边切换箭头 → 轮播展示模式。一次只展示一个内容项。

**⚠️ Banner / 首屏大图必须主动检测**：页面顶部的大幅横幅区域（Banner、Hero Section、首屏广告位）在设计稿中通常只展示第一帧，视觉上看起来像静态区块，但**实际极大概率是轮播图**。识别规则：
- DSL 中该区域的图层名含 `carousel`、`slider`、`轮播`、`Banner N`，或有多个同结构平级子项 → 使用 OCarousel
- 仅当：该区域只有单个子内容项、无指示器层、无箭头层、且图层名不含轮播相关词 → 才实现为静态 HTML

详细检测清单见 `carousel.md` 的「Banner 大图区域必做检测」。

---

## 浮层提示模式

### 嵌套结构
```
# 气泡提示
OPopover > 触发元素（#target 插槽）+ 提示内容（default 插槽）
# 底层浮层定位
OPopup > 触发元素（#target 插槽）+ 浮层内容
```

### 发现来源
源码发现：OPopover 包裹 OPopup，添加了样式和箭头；OPopup 是底层定位组件，处理智能定位和显隐逻辑。

### 模板示例
```vue
<OPopover position="top" trigger="hover">
  <p>提示内容</p>
  <template #target>
    <OButton>悬停查看</OButton>
  </template>
</OPopover>
```

### 关键约束
- `#target` 插槽放触发元素，`default` 插槽放提示内容
- `trigger` 支持 hover / click / focus
- `position` 控制弹出方向（top/bottom/left/right 及变体）
- OPopover 是 OPopup 的高级封装，多数场景用 OPopover 即可

### 设计稿页面特征
元素附近的小浮层面板（带箭头指向触发元素）→ OPopover；无箭头的定位浮层 → OPopup。

---

## 列表页模式

### 嵌套结构
```
OInput（搜索框）+ OButton（操作按钮）
> ODataTable / 卡片列表
> OPagination（分页器）
```

### 发现来源
基于组件 API 能力推演，参考业界常见管理后台列表页结构。

### 模板示例
```vue
<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
      <OInput v-model="keyword" placeholder="搜索..." clearable style="width: 240px;" />
      <OButton color="primary" variant="solid">新增</OButton>
    </div>
    <ODataTable :columns="columns" :data="filteredData" row-key="id" />
    <OPagination v-model="page" :total="total" :page-size="20" style="margin-top: 16px; justify-content: flex-end;" />
  </div>
</template>
```

### 关键约束
- OInput 搜索框与 ODataTable 的数据过滤由开发者手动实现
- OPagination 与 ODataTable 无自动联动，需手动处理分页

### 设计稿页面特征
顶部工具栏（搜索框 + 按钮）+ 中间表格/卡片列表 + 底部分页器的三段式布局 → 列表页模式。

---

## 详情页模式

### 嵌套结构
```
OBreadcrumb（面包屑导航）
> OTab（标签页切换不同详情面板）
  > OCard（信息卡片）
    > OGrid > ORow > OCol（网格布局展示字段）
```

### 发现来源
基于组件 API 能力推演，参考业界常见详情页结构。

### 模板示例
```vue
<template>
  <OBreadcrumb>
    <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
    <OBreadcrumbItem href="/list">列表</OBreadcrumbItem>
    <OBreadcrumbItem>详情</OBreadcrumbItem>
  </OBreadcrumb>
  <OTab v-model="activeTab">
    <OTabPane value="basic" label="基本信息">
      <OCard title="基本信息">
        <ORow :gutter="[16, 16]">
          <OCol :span="12"><span>名称：{{ data.name }}</span></OCol>
          <OCol :span="12"><span>状态：{{ data.status }}</span></OCol>
        </ORow>
      </OCard>
    </OTabPane>
    <OTabPane value="config" label="配置">
      <OCard title="配置项">...</OCard>
    </OTabPane>
  </OTab>
</template>
```

### 关键约束
- OBreadcrumb 中最后一个 OBreadcrumbItem 不设 href（表示当前页）
- ORow/OCol 的 span 总和建议为 24（24 栅格系统）

### 设计稿页面特征
顶部面包屑 + 标签页切换 + 卡片式信息展示区，卡片内用栅格排列字段值 → 详情页模式。

---

## 表单弹窗模式

### 嵌套结构
```
ODialog > OForm > OFormItem > 表单控件
```

### 发现来源
基于"弹窗确认模式"与"表单校验模式"组合推演，参考业界常见的弹窗表单场景。

### 模板示例
```vue
<ODialog v-model:visible="dialogVisible" title="新增记录">
  <OForm ref="formRef" :model="formModel" :rules="rules">
    <OFormItem label="名称" field="name">
      <OInput v-model="formModel.name" />
    </OFormItem>
    <OFormItem label="描述" field="desc">
      <OTextarea v-model="formModel.desc" />
    </OFormItem>
  </OForm>
  <template #foot>
    <OButton @click="dialogVisible = false">取消</OButton>
    <OButton color="primary" variant="solid" @click="submitForm">确认</OButton>
  </template>
</ODialog>
```

### 关键约束
- ODialog 关闭时应重置表单状态（`formRef.value?.resetFields()`）
- 提交前应调用 `formRef.value?.validate()` 校验
- 移动端 ODialog 从底部滑入，表单布局自动适配

### 设计稿页面特征
弹窗浮层内包含标签+输入框的表单结构，底部有取消/确认按钮 → 表单弹窗模式。

---

## 锚点文档导航模式

### 嵌套结构
```
OAnchor（侧边栏/顶部）+ 内容区（带 id 的标题）
```

### 发现来源
源码发现：OAnchor 监听指定容器的滚动事件，通过 `#id` 锚点匹配和定位页面区域。

### 模板示例
```vue
<template>
  <div style="display: flex;">
    <div id="content" style="flex: 1; overflow-y: auto; height: 100vh;">
      <h2 id="section1">第一章</h2>
      <p>...</p>
      <h2 id="section2">第二章</h2>
      <p>...</p>
    </div>
    <OAnchor container="#content" :target-offset="10" style="width: 200px;">
      <OAnchorItem href="#section1" title="第一章" />
      <OAnchorItem href="#section2" title="第二章" />
    </OAnchor>
  </div>
</template>
```

### 关键约束
- `container` 必须指向有 `overflow-y: auto/scroll` 的容器
- `href` 值必须与页面中元素的 `id` 一致（带 # 前缀）
- 水平模式常用于页面顶部，配合 `position: sticky` 吸顶

### 设计稿页面特征
左侧长内容区 + 右侧固定的目录导航栏（竖线+文字列表）→ 锚点文档导航模式。
