> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OUpload 上传

## Part A：设计理解卡

OUpload 是文件上传组件，支持点击选择和拖拽上传。包含三种文件列表展示模式（文字、图片列表、图片卡片）。支持自定义上传请求、上传前/选择前拦截、手动/自动上传、缩略图生成、上传进度展示等。

### 文件列表

**modelValue**（属性）：文件列表（v-model 双向绑定）。数组中每项包含 id、name、file、status（pending/uploading/finished/failed）、percent 等信息。

**defaultFileList**（属性）：非受控模式下的默认文件列表。

### 选择

**accept**（属性）：可选文件的 MIME 类型限制，如 "image/jpeg;image/png"。

**multiple**（属性）：是否支持多文件上传。

**disabled**（属性）：是否禁用上传。

**beforeSelect**（属性）：选择文件前的拦截回调。返回 false 阻止选择。

**onAfterSelect**（属性）：选择后的处理回调。可自定义文件对象的构造。

### 上传

**uploadRequest**（属性）：自定义上传请求函数。接收 onProgress/onSuccess/onError 回调和 file 信息，需返回包含 abort 方法的对象。

**lazyUpload**（属性）：是否手动触发上传。false 时选择后自动上传。默认自动上传。

**onBeforeUpload**（属性）：上传前的拦截回调。返回 false 阻止上传，返回 File 替换上传文件。

**onBeforeRemove**（属性）：删除前的拦截回调。返回 false 阻止删除。

### 展示

**listType**（属性）：文件列表展示模式。"text" 文字列表、"picture" 图片列表、"picture-card" 图片卡片。默认 text。

**btnLabel**（属性）：上传按钮文字。

**showProgress**（属性）：上传中是否显示进度条。默认关闭。

**createThumbnail**（属性）：自定义缩略图生成函数。

### 拖拽

**draggable**（属性）：是否支持拖拽上传。

**dragLabel**（属性）：拖拽区域提示文本。

**dragHoverLabel**（属性）：拖拽中的提示文本。

### 插槽区域

**default 插槽**（插槽）：自定义上传触发区域（text/picture 模式下的选择按钮区域）。

**select-drag 插槽**（插槽）：自定义拖拽区域。

**select-drag-extra 插槽**（插槽）：拖拽区域额外内容。

**select-extra 插槽**（插槽）：选择按钮后的额外内容区域。

**select-add 插槽**（插槽）：picture-card 模式下自定义添加卡片内容。

**select-add-label 插槽**（插槽）：picture-card 模式下自定义添加卡片标签文字。

**item 插槽**（插槽）：自定义文件列表项渲染。接收 item（当前文件对象 UploadFileT）作为插槽参数。

### 事件

**progress**（事件）：上传进度变化时触发。

**success**（事件）：单文件上传成功时触发。

**error**（事件）：单文件上传失败时触发。

**change**（事件）：文件列表变化时触发。

**select**（事件）：选择文件后触发。

**itemRemove**（事件）：删除文件时触发。

**itemRetry**（事件）：重新上传时触发。

**itemReplace**（事件）：替换文件时触发。

**itemPreview**（事件）：预览文件时触发。

**itemClick**（事件）：点击文件项时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），拖拽区域内边距缩至 16px 8px，卡片宽度缩至 96px，拖拽区最大宽度缩至 400px；在平板及以下（≤1080px），文件列表项图标操作始终可见；在平板竖屏及以下（≤840px），拖拽区最大宽度缩至 240px。

🧩 **布局结构**：上传组件由选择区域和文件列表区域垂直排列组成。选择区域分为按钮模式（text/picture 列表类型）和拖拽模式两种。文件列表区域根据 listType 分为三种布局：text 模式为行列表（图标+文件名+操作按钮）、picture 模式为带缩略图的行列表、picture-card 模式为网格卡片布局（卡片内含缩略图和操作遮罩层）。picture-card 模式下末尾有一个"点击上传"的添加卡片。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: vertical
regions: [select-wrap(选择区域+拖拽区域), file-list(文件列表)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：带有"点击上传"按钮或虚线边框拖拽区域的文件上传组件 → 匹配 OUpload；卡片网格 + 添加按钮（+号） → 匹配 OUpload（picture-card 模式）；文件名列表 + 各文件有删除/重试图标 → 匹配 OUpload（text/picture 模式）
- **Token → Prop 映射**：虚线边框大区域 + 拖拽提示文字 → draggable=true；网格卡片布局 + 带缩略图 → listType="picture-card"；行列表 + 小缩略图 → listType="picture"；纯文件名行列表 → listType="text"（默认）；有"+ 点击上传"蓝色胶囊按钮 → 默认选择按钮；卡片尺寸 120px 方形 → picture-card 默认；进度条 → showProgress=true
- **易混淆组件区分**：与 OButton 区分——上传按钮只是 OUpload 的触发子元素，完整的上传组件还包含文件列表和拖拽区域；与 OFigure/OImage 区分——OUpload 的 picture-card 模式包含缩略图但主要目的是上传管理，OFigure 是纯图片展示

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OUpload } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type UploadFileStatusT = 'pending' | 'uploading' | 'finished' | 'failed';
type UploadListTypeT = 'text' | 'picture' | 'picture-card';

interface UploadFileT {
  id: string | number;
  name: string;
  file?: File;
  status?: UploadFileStatusT;
  message?: string;
  messageClass?: string;
  retry?: boolean;
  percent?: number;
  request?: UploadRequestT;
  icon?: string | boolean | Component;
  imgUrl?: string;
}

interface UploadRequestOptionT {
  onProgress: (percent: number, event?: ProgressEvent) => void;
  onSuccess: (response?: { messages?: string; [k: string]: unknown }) => void;
  onError: (response?: { messages?: string; [k: string]: unknown }, retry?: boolean) => void;
  file: UploadFileT;
}

interface UploadRequestT {
  abort: () => void;
}
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `UploadFileT[]` | — | — | 文件列表（v-model） |
| defaultFileList | `UploadFileT[]` | — | — | 默认文件列表 |
| accept | `string` | — | — | MIME 类型限制 |
| disabled | `boolean` | — | `false` | 禁用 |
| multiple | `boolean` | — | `false` | 多文件 |
| beforeSelect | `(value: UploadFileT[]) => Promise<boolean> \| boolean` | — | — | 选择前拦截 |
| onAfterSelect | `(fileList: FileList) => Promise<UploadFileT[]>` | — | — | 选择后处理 |
| btnLabel | `string` | — | — | 按钮文字 |
| uploadRequest | `(options: UploadRequestOptionT) => UploadRequestT` | — | — | 自定义上传 |
| lazyUpload | `boolean` | — | `false` | 手动上传 |
| onBeforeUpload | `(file: UploadFileT) => Promise<boolean \| File>` | — | — | 上传前拦截 |
| onBeforeRemove | `(file: UploadFileT) => Promise<boolean>` | — | — | 删除前拦截 |
| draggable | `boolean` | — | `false` | 拖拽上传 |
| dragLabel | `string` | — | — | 拖拽提示 |
| dragHoverLabel | `string` | — | — | 拖拽中提示 |
| listType | `UploadListTypeT` | `'text'` / `'picture'` / `'picture-card'` | `'text'` | 列表展示模式 |
| createThumbnail | `(file: File) => Promise<string>` | — | — | 缩略图生成 |
| showProgress | `boolean` | — | `false` | 显示进度条 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: UploadFileT[])` | 文件列表变化时 |
| progress | `(value: UploadFileT)` | 上传进度变化 |
| success | `(value: UploadFileT)` | 上传成功 |
| error | `(value: UploadFileT)` | 上传失败 |
| change | `(value: UploadFileT[])` | 文件列表变化 |
| select | `(value: UploadFileT[])` | 选择文件后 |
| itemRemove | `(value: UploadFileT, evt: Event)` | 删除文件 |
| itemRetry | `(value: UploadFileT, evt: Event)` | 重新上传 |
| itemReplace | `(value: UploadFileT, evt: Event)` | 替换文件 |
| itemPreview | `(value: UploadFileT, evt: Event)` | 预览文件 |
| itemClick | `(value: UploadFileT, evt: Event)` | 点击文件项 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | text/picture 模式 | 选择按钮区域 | 默认上传按钮 |
| select-drag | — | draggable 时 | 拖拽区域 | 默认拖拽区域 |
| select-drag-extra | — | draggable 时 | 拖拽区域额外内容 | 无 |
| select-extra | — | 有插槽时 | 选择按钮后内容 | 无 |
| select-add | — | picture-card 模式 | 添加卡片内容 | 加号图标+标签 |
| select-add-label | — | picture-card 模式 | 添加卡片标签 | `btnLabel` 文字 |
| item | `{ item: UploadFileT }` | 始终 | 文件列表项 | 默认列表项渲染 |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| upload() | — | 手动触发所有文件上传 |
| select() | — | 打开文件选择对话框 |
| retry(file, force?) | `UploadFileT, boolean` | 重新上传指定文件 |
| replace(file) | `UploadFileT` | 替换指定文件 |
| replaceById(id, newFile) | `string, UploadFileT` | 按 id 替换文件 |
| replaceByIndex(index, newFile) | `number, UploadFileT` | 按索引替换文件 |
| removeById(id) | `string \| number` | 按 id 删除文件 |
| removeByIndex(index) | `number` | 按索引删除文件 |
| removeAll() | — | 删除所有文件 |
| previewItemById(id) | `number \| string` | 按 id 预览文件 |
| previewItemByIndex(index) | `number` | 按索引预览文件 |

### 典型使用场景与调用模板

**场景 1：基础上传**
适用于：简单文件上传
```vue
<script setup>
import { ref } from 'vue';
const fileList = ref([]);
const uploadRequest = ({ file, onProgress, onSuccess, onError }) => {
  const xhr = new XMLHttpRequest();
  xhr.upload.onprogress = (e) => onProgress(Math.round(e.loaded / e.total * 100));
  xhr.onload = () => onSuccess({ messages: '上传成功' });
  xhr.onerror = () => onError({ messages: '上传失败' }, true);
  // xhr.open(...); xhr.send(file.file);
  return { abort: () => xhr.abort() };
};
</script>
<template>
  <OUpload v-model="fileList" :upload-request="uploadRequest" />
</template>
```

**场景 2：拖拽上传**
适用于：大文件或批量上传
```vue
<OUpload
  v-model="fileList"
  draggable
  multiple
  drag-label="点击或拖拽文件到此处"
  drag-hover-label="释放文件"
  :upload-request="uploadRequest"
/>
```

**场景 3：图片卡片模式**
适用于：图片上传预览
```vue
<OUpload
  v-model="fileList"
  list-type="picture-card"
  accept="image/jpeg;image/png"
  :upload-request="uploadRequest"
  @item-preview="handlePreview"
/>
```

**场景 4：手动上传**
适用于：选择完毕后统一上传
```vue
<script setup>
import { ref } from 'vue';
const uploadRef = ref();
const fileList = ref([]);
</script>
<template>
  <OUpload ref="uploadRef" v-model="fileList" lazy-upload :upload-request="uploadRequest" />
  <OButton @click="uploadRef.upload()">开始上传</OButton>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础上传 | `v-model` + `:upload-request` | 最常见 |
| 拖拽 | `draggable` + `drag-label` | 拖拽区域 |
| 图片卡片 | `list-type="picture-card"` + `accept` | 图片上传 |
| 图片列表 | `list-type="picture"` | 缩略图列表 |
| 手动上传 | `lazy-upload` + ref.upload() | 延迟上传 |
| 多文件 | `multiple` | 批量选择 |
| 进度条 | `show-progress` | 显示上传进度 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--upload-icon-size` | `var(--o-icon_size_control-xs)` | 文件列表图标尺寸（小） |
| `--upload-icon-size-l` | `var(--o-icon_size_control-m)` | 文件列表图标尺寸（中） |
| `--upload-icon-size-xl` | `var(--o-icon_size_control-l)` | 文件列表图标尺寸（大） |
| `--upload-color` | `var(--o-color-info1)` | 文件名文字颜色 |
| `--upload-color-error` | `var(--o-color-danger1)` | 上传失败文字颜色 |
| `--upload-color-disabled` | `var(--o-color-info4)` | 禁用状态文字颜色 |
| `--upload-item-bg-hover` | `var(--o-color-control2-light)` | 列表项 hover 背景色 |
| `--upload-item-radius` | `var(--o-radius_control-s)` | 列表项圆角 |
| `--upload-item-picture-size` | `var(--o-icon_size-2xl)` | picture 模式缩略图尺寸 |
| `--upload-progress-height` | `1px` | 进度条高度 |
| `--upload-progress-bg-color` | `var(--o-color-control3-light)` | 进度条轨道背景色 |
| `--upload-progress-value-bg-color` | `var(--o-color-primary1)` | 进度条填充色 |
| `--upload-drag-padding` | `32px 24px` | 拖拽区域内边距 |
| `--upload-drag-width` | `100%` | 拖拽区域宽度 |
| `--upload-drag-max-width` | `480px` | 拖拽区域最大宽度 |
| `--upload-drag-radius` | `var(--o-radius_control-s)` | 拖拽区域圆角 |
| `--upload-drag-color` | `var(--o-color-info2)` | 拖拽区域文字颜色 |
| `--upload-drag-bg-color` | `var(--o-color-control2-light)` | 拖拽区域背景色 |
| `--upload-drag-bd` | `1px solid var(--o-color-control1)` | 拖拽区域边框 |
| `--upload-card-radius` | `var(--o-radius_control-s)` | 图片卡片圆角 |
| `--upload-card-width` | `120px` | 图片卡片宽度 |
| `--upload-card-height` | `var(--upload-card-width)` | 图片卡片高度（正方形） |
| `--upload-card-gap` | `8px` | 图片卡片间距 |
| `--upload-card-bd` | `1px solid var(--o-color-control1)` | 图片卡片边框 |
| `--upload-card-bg-color` | `var(--o-color-control2-light)` | 图片卡片背景色 |
| `--upload-card-img-fit` | `cover` | 图片填充方式 |
| `--upload-card-mask` | `var(--o-color-mask1)` | 图片卡片操作遮罩色 |

**使用示例**:
```vue
<OUpload style="--upload-card-width: 96px; --upload-drag-max-width: 360px" list-type="picture-card" v-model="fileList" />
```

### 响应式行为表
|------|--------|-----------|------------|---------|
| 拖拽区内边距 | 16px 8px | 16px 8px | 16px 8px | 32px 24px |
| 拖拽区最大宽度 | 240px | 400px | 400px | 480px |
| 卡片宽度 | 96px | 96px | 96px | 120px |
| 文件行操作图标 | 始终可见 | 始终可见 | hover 时显示 | hover 时显示 |
| 添加卡片字号 | tip2 | tip2 | tip2 | 标准 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  element: div.o-upload
  direction: vertical
  regions:
    # 选择区域（text/picture 模式）
    - name: select-wrap
      element: div.o-upload-select-wrap
      condition: listType 为 text 或 picture
      direction: horizontal
      children:
        - name: select-button
          element: div.o-upload-select
          children:
            - { type: slot, name: default }  # 或默认 OButton "点击上传"
        - name: select-extra
          element: div.o-upload-select-extra
          condition: 有 select-extra 插槽时
          children:
            - { type: slot, name: select-extra }

    # 拖拽区域（draggable 模式）
    - name: drag-area
      element: div.o-upload-drag
      condition: draggable=true
      direction: vertical
      align: center
      padding: 32px 24px
      max-width: 480px
      border: 1px solid var(--o-color-control1)
      border-radius: var(--o-radius_control-s)
      bg: var(--o-color-control2-light)
      children:
        - { type: slot, name: select-drag }  # 或默认: IconAdd + 拖拽提示文字
        - { type: slot, name: select-drag-extra }

    # 文件列表区域
    - name: file-list
      element: div.o-upload-list
      children:
        # text/picture 模式: 垂直行列表
        - name: row-item  # 每个文件
          element: div.o-upload-row-item
          direction: horizontal
          align: center
          children:
            - thumbnail  # picture 模式有缩略图
            - icon  # text 模式有文件图标
            - label  # 文件名
            - action-icons  # 删除/重试/预览/下载按钮
            - progress-bar  # 上传进度条（showProgress 时）

        # picture-card 模式: 网格卡片列表
        - name: card-item  # 每个文件卡片
          element: div.o-upload-card-item
          width: 120px
          height: 120px
          gap: 8px
          border-radius: var(--o-radius_control-s)
          children:
            - thumbnail/file-icon  # 缩略图或文件图标
            - overlay-icons  # 悬浮操作层（预览/删除/重试）
            - progress-bar  # 上传进度条

        - name: add-card  # 添加按钮卡片（picture-card 模式末尾）
          element: div.o-upload-card-add
          condition: listType=picture-card
          children:
            - { type: slot, name: select-add }  # 或默认: IconAdd + btnLabel
```

**≤1440px**
```yaml
# drag: padding 16px 8px, max-width 400px
# card: width 96px, font-size tip2
```

**≤1080px**
```yaml
# row-item: 操作图标始终可见（无需 hover）
# card-item: 遮罩层始终可见
```

**≤840px**
```yaml
# drag: max-width 240px
```

### 设计稿识别指南

**视觉特征指纹**

1. 带"+ 点击上传"蓝色胶囊按钮 + 下方文件名列表 → 匹配 OUpload（text 模式）
2. 虚线边框矩形区域 + "点击或拖拽文件到此处"提示文字 + 加号图标 → 匹配 OUpload（draggable 模式）
3. 方形缩略图卡片网格 + 末尾有加号添加卡片 → 匹配 OUpload（picture-card 模式）
4. 文件名列表 + 带小缩略图 + 操作图标（删除/重试/预览） → 匹配 OUpload（picture 模式）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 布局 | 网格卡片 + 缩略图 | listType | `'picture-card'` | — |
| 布局 | 行列表 + 小缩略图 | listType | `'picture'` | — |
| 布局 | 纯文件名行列表 | listType | `'text'` | 默认 |
| 选择方式 | 虚线边框拖拽区域 | draggable | `true` | — |
| 选择方式 | 按钮点击 | draggable | `false` | 默认 |
| 卡片尺寸 | 120×120px | — | — | picture-card 默认 |
| 拖拽区域 | 最大宽度 480px | — | — | 默认 |
| 进度条 | 文件上传中有进度条 | showProgress | `true` | — |
| 按钮文字 | 自定义文字 | btnLabel | 字符串值 | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OUpload | OButton | 上传按钮只是 OUpload 的子元素，完整组件还包含文件列表和拖拽区域 |
| OUpload（picture-card） | OFigure/OImage | OUpload 的卡片包含上传管理功能（删除/重试/进度），OFigure 是纯图片展示 |
| OUpload（draggable） | 自定义拖拽区域 | OUpload 拖拽区域有完整的文件选择、上传、列表管理功能 |
| OUpload（text） | 普通文件列表 | OUpload 文件列表项有上传状态、进度条和操作按钮（删除/重试） |
