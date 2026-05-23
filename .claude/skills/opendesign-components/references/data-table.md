> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# ODataTable 数据表格

## Part A：设计理解卡

ODataTable 是数据驱动的表格组件，通过列配置和行数据自动渲染表格内容。支持列固定、行选择、列筛选排序、行展开、树形数据、单元格合并、列宽拖拽调整、嵌套表头、溢出气泡等功能。

### 数据源

**data**（属性，必填）：表格行数据数组。每个元素是一个对象，对象的键名对应列配置的 key 字段。支持树形数据结构，行对象可包含 children 子节点数组和 hasChildren 懒加载标记。

**columns**（属性，必填）：列配置数组。每列通过 key 指定关联数据字段，label 指定表头文本。支持通过 children 嵌套形成多级分组表头。iOS 端不支持多列固定。

### 尺寸与高度

**size**（属性）：表格整体尺寸，可选中号或小号。默认中号。

**height**（属性）：固定表格高度。设置后表头固定、内容区域滚动。

**maxHeight**（属性）：表格最大高度。超出后表头固定、内容区域滚动。默认适应内容高度。

**minTableWidth**（属性）：内部 table 元素最小宽度。表格容器宽度不足时出现横向滚动条。

### 外观

**border**（属性）：表格边框样式。支持全边框、仅行线、仅列线、外框、组合等多种模式。默认仅行线。

**stripe**（属性）：斑马纹。仅在无纵向合并单元格时生效。默认关闭。

**headerStyle**（属性）：表头风格。填充背景或分割线样式。默认填充背景。

**showHeader**（属性）：是否显示表头行。默认显示。

**highlightCurrentRow**（属性）：鼠标悬停时是否高亮当前行。默认关闭。

**defaultEmptyCellText**（属性）：单元格值为空时的占位文案。默认显示 "--"。

### 行标识

**rowKey**（属性）：行数据的唯一标识字段名，支持传入字符串路径或计算函数。在行选择、行展开等场景中用于标识行。默认使用 "id" 字段。

### 列固定

通过列配置的 fixed 属性设定。可将列固定在左侧或右侧，横向滚动时固定列不随内容滚动。左侧或右侧最靠近滚动区域的固定列边缘会显示阴影。iOS 端仅支持最左一列和最右一列各固定一列。

### 列宽控制

**columnResizable**（属性）：是否允许拖拽调整列宽。默认关闭。开启后表头单元格右侧出现拖拽手柄。

列配置可通过 width、minWidth、maxWidth 设定初始宽度和宽度范围。支持数字（像素）和百分比字符串。

### 单元格渲染

列配置的 formatter 属性可自定义单元格渲染，返回字符串、VNode、组件或函数式组件。也可使用动态插槽 `td_{columnKey}` 自定义渲染。当 formatter 未设置时，空值单元格显示 defaultEmptyCellText，非空值调用 toString。

⚠️ **推荐优先使用 `formatter`，不推荐 `td_{columnKey}` 插槽**：formatter 将渲染逻辑内聚在列配置中，便于复用和测试；`td_` 插槽仅适合确实需要在模板中使用 `v-model` 双向绑定的场景（如内联表单控件）。即便是内联输入框，也可通过 `formatter` 返回函数式组件实现响应式更新（见代码参考场景 12），因此 `td_` 插槽应视为最后手段。

列配置的 showOverflowToolTip 属性控制溢出文本显示气泡提示，传入数字可设定最大行数。

### 表头渲染

列配置的 label 属性除了字符串外，也支持 VNode 或组件。列配置的 description 属性可为表头添加描述气泡图标。可使用动态插槽 `th_{columnKey}` 自定义表头单元格内容。

列配置的 asHeader 属性可将某列标记为竖向表头列，该列会呈现表头背景样式。

列配置的 customColSpan 属性可合并相邻同级的表头单元格。

### 嵌套分组表头

列配置支持 children 嵌套，形成多级分组表头。父列的 label 显示在上方横跨其所有子列，子列的表头在下一行显示。可多层嵌套。

### 筛选与排序

通过列配置的 filter 属性开启列筛选。filter 是一个对象，包含获取可选项的异步方法、是否多选、是否显示搜索输入框、移动端弹窗标题等配置。筛选图标出现在表头文本旁。

通过列配置的 sortKey 属性开启列排序。排序图标出现在表头文本旁。仅支持单列排序，切换排序列时自动清空其他列的排序。排序在升序、降序、不排序之间循环切换。

**conditions**（双向绑定属性）：筛选排序条件对象。key 对应列的 key（筛选列）或 sortKey（排序列）。筛选列值为选中值数组，排序列值为排序方式常量。

筛选排序变更时组件触发 condition-update 事件，业务方在事件回调中根据 conditions 重新请求数据并更新 data。也可通过 watch conditions 实现自动请求。

**业务处理规范**：在 `@condition-update` 回调（或 `watch(conditions, ...)` 中），需按 conditions 的结构逐字段处理：筛选列（key 对应列的 key）值为选中值数组，用 `Array.includes()` 或自定义 filter 函数过滤数据；排序列（key 对应 sortKey）值为 `DataTableSortMethod.ASC(1)` / `DESC(-1)` / `NA(undefined)`，据此对数据排序。后端分页场景下，将 conditions 传入接口参数即可。

### 行选择

**selection**（属性）：开启行选择。默认关闭。开启后第一列前出现复选框。

**selectedKeys**（双向绑定属性）：已选中行的 rowKey 数组。

**disabledProp**（属性）：指定行数据中控制行是否禁用选择的字段名。默认使用 "disabled" 字段。

**checkStrictly**（属性）：树形数据中父子节点选择是否不关联。默认不关联（独立选择）。关闭后选中父节点自动全选子节点，子节点全选后自动选中父节点。

### 行展开

**expandMethod**（属性）：行展开渲染方法。接收行数据和行索引，返回展开内容（字符串、VNode、组件或函数式组件），返回 false 表示该行不可展开。

**expand 插槽**：行展开内容的插槽方式，可获取行数据和行索引。使用后所有行均可展开。

**expanded-row-keys**（双向绑定属性）：已展开行的 rowKey 数组。

### 树形数据

行数据包含 children 数组时自动呈现树形缩进和展开箭头。行数据的 hasChildren 标记为 true 时表示支持懒加载子节点，展开时触发 load-children 事件，业务方异步加载后调用 resolve 完成或 reject 失败回退。

### 单元格合并

**spanMethod**（属性）：合并单元格的计算方法。接收行数据、列配置、单元格值、行列索引，返回 colSpan 和 rowSpan。已被合并的单元格不会再次参与合并。

### 加载与空状态

**loading**（属性）：显示加载中遮罩。加载时筛选排序图标禁用。

**loadingLabel**（属性）：加载中提示文案。

**emptyLabel**（属性）：数据为空时的提示文案。

**loading 插槽**：自定义加载中显示内容。

**empty 插槽**：自定义空状态显示内容。

### 整体表头插槽

**header 插槽**：替换整个 thead 内容。可获取扁平列数组和分组列二维数组。

### 暴露方法

组件通过模板引用暴露全选、清空选择、展开全部、收起全部等方法，以及列配置的映射和数组数据。

### 响应式行为

筛选面板在手机/平板竖屏尺寸下使用底部弹窗（Dialog）代替桌面端弹出层（Popup）。iOS 端仅支持最左一列和最右一列各固定一列。

🧩 **布局结构**：ODataTable 为纵向布局容器，根元素 `.o-data-table` 内部包含可选的表头分割线、左侧阴影指示器、OScroller 滚动容器（含 table 元素：colgroup + thead + tbody）、加载/空状态遮罩层、右侧阴影指示器和溢出气泡。table 内部 thead 固定在顶部（sticky），tbody 内通过 TableRow 递归渲染数据行和展开行。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: column
regions:
  - header-divider-h (条件: split-line模式)
  - left-shadow (条件: 无左固定列时)
  - OScroller (滚动容器)
    - table
      - colgroup (TableColGroup)
      - thead (sticky, 含 tr > th 表头单元格)
      - tbody (含 TableRow 递归)
  - loading-wrap / tip-wrap (条件渲染)
  - right-shadow (条件: 无右固定列时)
  - OPopover (溢出气泡)
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：带有填充色表头（蓝灰背景）或分割线表头的多列数据表格；表头可含筛选漏斗图标、排序箭头、描述气泡图标；行首可有复选框或展开箭头；固定列滚动时有侧边阴影
- **Token → Prop 映射**：表头背景 `--o-color-control3-light` 对应 `headerStyle="fill"`；行底分割线对应默认 `border="row"`；全边框对应 `border="all"`；表头筛选图标对应列配置 `filter`；排序图标对应列配置 `sortKey`
- **易混淆组件区分**：与 OTable 区分——OTable 是纯展示表格（手写 tr/td），ODataTable 是数据驱动表格（通过 columns+data 自动渲染）；与 OList 区分——List 是单列列表，DataTable 是多列表格

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ODataTable } from '@opensig/opendesign';
// 按需导入类型
import type {
  DataTableColumnT,
  DataTableSpanMethod,
  DataTableExpandMethod,
  DataTableSortMethod,
  DataTableSortMethodT,
  DataTableConditionUpdatePayload,
  DataTableSortUpdatePayload,
  DataTableSelectionPayload,
  DataTableSelectionChangePayload,
  DataTableLoadChildrenPayload,
  DataTableInstance,
  DataTableRowKeyValue,
} from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type DataTableSizeT = 'medium' | 'small';
type DataTableHeaderStyleT = 'fill' | 'split-line';
type DataTableFixedT = true | 'left' | 'right'; // true 等同 'left'
type TableBorderT = 'all' | 'row' | 'column' | 'frame' | 'row-column' | 'row-frame' | 'column-frame' | 'none';
type DataTableRowKeyValue = string | number;

// 排序方式常量
const DataTableSortMethod = {
  ASC: 1,      // 升序
  DESC: -1,    // 降序
  NA: undefined // 不排序（初始值）
};
type DataTableSortMethodT = 1 | -1 | undefined;

// 单元格渲染方法参数
interface DataTableColumnFormatterOptions {
  row: any;
  column: EffectiveDataTableColumnT;
  cellValue: string | number | unknown;
  rowIndex: number;
  colIndex: number;
}

// 单元格渲染方法
type DataTableColumnFormatter = (options: DataTableColumnFormatterOptions) => Component | VNode | string;

// 合并单元格方法
type DataTableSpanMethod = (options: DataTableColumnFormatterOptions) => { colSpan?: number; rowSpan?: number } | void;

// 行展开方法
type DataTableExpandMethod = (row: any, rowIndex: number) => Component | VNode | string | false;

// 行数据类型
interface TableRowT {
  key?: string | number;
  hasChildren?: boolean;  // 懒加载标记
  children?: TableRowT[];
  [key: string]: unknown;
}
```

### Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| data | `TableRowT[]` | 是 | — | — | 表格数据 |
| columns | `DataTableColumnT[]` | 是 | — | — | 列配置，iOS 端不支持多列固定 |
| size | `DataTableSizeT` | 否 | `'medium'` / `'small'` | `'medium'` | 表格尺寸 |
| height | `number \| string` | 否 | — | — | 表格高度，设置后表头固定、内容滚动 |
| maxHeight | `number \| string` | 否 | — | `'fit-content'` | 最大高度，超出时表头固定滚动 |
| minTableWidth | `number \| string` | 否 | — | — | 内部 table 最小宽度，超出时横向滚动 |
| rowKey | `string \| ((row: TableRowT) => string)` | 否 | — | `'id'` | 行唯一标识字段名或计算函数 |
| border | `TableBorderT` | 否 | `'all'` / `'row'` / `'column'` / `'frame'` / `'row-column'` / `'row-frame'` / `'column-frame'` / `'none'` | `'row'` | 边框样式 |
| stripe | `boolean` | 否 | — | `false` | 斑马纹（无纵向合并时生效） |
| headerStyle | `DataTableHeaderStyleT` | 否 | `'fill'` / `'split-line'` | `'fill'` | 表头风格 |
| showHeader | `boolean` | 否 | — | `true` | 是否显示表头 |
| highlightCurrentRow | `boolean` | 否 | — | `false` | 鼠标悬停高亮行 |
| columnResizable | `boolean` | 否 | — | `false` | 是否可拖拽调整列宽 |
| selection | `boolean` | 否 | — | `false` | 是否开启行选择 |
| disabledProp | `string` | 否 | — | `'disabled'` | 行数据中控制禁用选择的字段名 |
| checkStrictly | `boolean` | 否 | — | `true` | 树形选择时父子是否不关联 |
| defaultEmptyCellText | `string` | 否 | — | `'--'` | 空单元格占位文案 |
| emptyLabel | `string` | 否 | — | — | 空数据提示文案 |
| loading | `boolean` | 否 | — | `false` | 加载中状态 |
| loadingLabel | `string` | 否 | — | — | 加载中提示文案 |
| spanMethod | `DataTableSpanMethod` | 否 | — | `() => undefined` | 合并单元格方法 |
| expandMethod | `DataTableExpandMethod` | 否 | — | — | 行展开方法，返回 false 则不可展开 |
| v-model:conditions | `Record<string, unknown>` | 否 | — | `reactive({})` | 筛选排序条件对象 |
| v-model:selected-keys | `DataTableRowKeyValue[]` | 否 | — | `reactive([])` | 已选中行的 rowKey 数组 |
| v-model:expanded-row-keys | `DataTableRowKeyValue[]` | 否 | — | `reactive([])` | 已展开行的 rowKey 数组 |

### DataTableColumnT 列配置

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | `string` | 是 | 列数据字段名，对应行数据对象的 key，支持路径如 `'a.b'` |
| label | `string \| Component \| VNode` | 否 | 表头文本，支持字符串、VNode、组件或函数式组件 |
| description | `string \| Component \| VNode` | 否 | 表头描述气泡文案 |
| formatter | `DataTableColumnFormatter` | 否 | 单元格自定义渲染方法 |
| fixed | `true \| 'left' \| 'right'` | 否 | 列固定方向，`true` 等同 `'left'`。iOS 不支持多列固定 |
| asHeader | `boolean` | 否 | 是否作为竖向表头列，默认 false |
| width | `number \| string` | 否 | 列宽，支持像素数字或百分比字符串 |
| minWidth | `number \| string` | 否 | 最小列宽 |
| maxWidth | `number \| string` | 否 | 最大列宽 |
| showOverflowToolTip | `boolean \| number` | 否 | 溢出时显示气泡，传数字设定最大行数 |
| sortKey | `string` | 否 | 排序条件字段 key，仅支持单列排序 |
| filter | `DataTableColumnFilterT` | 否 | 筛选配置 |
| customColSpan | `number` | 否 | 表头单元格自定义 colspan，仅支持同级合并 |
| children | `DataTableColumnT[]` | 否 | 嵌套子列配置，形成分组表头 |

### DataTableColumnFilterT 筛选配置

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| optionsFn | `(option: { column, emptyOption }) => Option[] \| Promise<Option[]>` | 是 | 获取筛选选项的方法，支持异步 |
| optionTitle | `string` | 否 | 移动端弹窗标题 |
| multiple | `boolean` | 否 | 是否支持多选，默认 true |
| showInput | `boolean \| ((count: number) => boolean)` | 否 | 是否显示搜索框，默认选项超过 8 个时显示 |

### DataTableColumnFilterOption 筛选选项

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| label | `any` | 是 | 选项标签文本 |
| value | `any` | 是 | 选项值 |

### Events 表

| 事件名 | 参数 | 说明 |
|--------|------|------|
| condition-update | `payload?: DataTableConditionUpdatePayload` | 筛选条件更新时触发（排序更新时 payload 为 undefined） |
| sort-update | `payload: DataTableSortUpdatePayload` | 列排序更新时触发 |
| update:selected-keys | `payload: DataTableRowKeyValue[]` | 选中行变更双向绑定 |
| selection | `payload: DataTableSelectionPayload` | 单行复选框点击时触发 |
| selection-change | `payload: DataTableSelectionChangePayload` | 已选择数据变更时触发（含全选操作） |
| selection-all | `allSelected: boolean` | 全选/取消全选复选框点击时触发 |
| load-children | `payload: DataTableLoadChildrenPayload` | 懒加载子节点时触发 |
| column-resize | `column: EffectiveDataTableColumnT, width: number` | 列宽调整时触发 |
| update:conditions | `value: Record<string, unknown>` | conditions 双向绑定更新 |
| update:expanded-row-keys | `value: DataTableRowKeyValue[]` | expanded-row-keys 双向绑定更新 |

#### 事件载荷类型

```typescript
// condition-update 载荷
interface DataTableConditionUpdatePayload {
  key: string;           // 对应 column 的 key
  newVal: (string | number | boolean)[];  // 选中的值数组
}

// sort-update 载荷
interface DataTableSortUpdatePayload {
  key: string;           // 对应 column 的 sortKey
  newVal?: DataTableSortMethodT;  // 1(升序) / -1(降序) / undefined(不排序)
}

// selection 载荷
interface DataTableSelectionPayload {
  key: DataTableRowKeyValue;  // 行的 rowKey 值
  selected: boolean;          // 是否选中
}

// selection-change 载荷
interface DataTableSelectionChangePayload {
  prev: DataTableRowKeyValue[];  // 变更前选中的 rowKey 数组
  cur: DataTableRowKeyValue[];   // 变更后选中的 rowKey 数组
}

// load-children 载荷
interface DataTableLoadChildrenPayload {
  row: TableRowT;
  rowIndex: number;
  rowKey: DataTableRowKeyValue;
  resolve: () => void;   // 加载成功时调用
  reject: (reason?: any) => void;  // 加载失败时调用，展开自动回退
}
```

### Slots 表

| 插槽名 | Slot Props | 说明 |
|--------|-----------|------|
| header | `{ columns: EffectiveDataTableColumnT[], groupColumns: EffectiveDataTableColumnT[][] }` | 替换整个 thead 内容 |
| loading | — | 自定义加载中显示 |
| empty | — | 自定义空状态显示 |
| expand | `{ row: TableRowT, rowIndex: number }` | 行展开内容，使用后所有行均可展开 |
| `th_{columnKey}` | `{ column: EffectiveDataTableColumnT }` | 自定义指定列的表头单元格内容（动态插槽） |
| `td_{columnKey}` | `{ column: EffectiveDataTableColumnT, row: TableRowT, cellValue: any, index: number }` | 自定义指定列的数据单元格内容（动态插槽）。⚠️ **不推荐**，优先使用 `column.formatter`；仅当模板 `v-model` 语法必须使用时才选此方式 |

### Expose 方法表

| 方法名 | 类型 | 说明 |
|--------|------|------|
| selectAll | `() => void` | 全选（不含禁用行） |
| clearAll | `() => void` | 清空全部选择 |
| expandAll | `() => void` | 展开所有行 |
| foldAll | `() => void` | 收起所有行 |
| getRowKey | `(row: TableRowT, rowIndex: number) => DataTableRowKeyValue` | 计算行的 rowKey |
| dataColumnMap | `Map<string, EffectiveDataTableColumnT>` | 列配置的 key-value 映射 |
| dataColumns | `Ref<EffectiveDataTableColumnT[]>` | 扁平化的所有叶子列数组 |
| groupColumns | `Ref<EffectiveDataTableColumnT[][]>` | 按层级分组的列二维数组 |

### 插槽层级关系

```
header（替换整个 thead）
  └── th_{columnKey}（替换单个表头单元格内容）

expand（替换行展开内容）
  └── 与 expandMethod 二选一；slot 优先级更高且所有行可展开

loading（替换加载中遮罩内容）
empty（替换空状态内容）

td_{columnKey}（替换单个数据单元格内容）
  ⚠️ 优先使用 column.formatter（推荐），td_ 插槽与 formatter 二选一
  └── 以 formatter 为主；仅需模板 v-model 语法时才用 td_ 插槽
```

### 典型使用场景与调用模板

**场景 1：基础数据表格**
适用于：简单数据展示
```vue
<script setup>
import { ref } from 'vue';
import { ODataTable } from '@opensig/opendesign';
import type { DataTableColumnT } from '@opensig/opendesign';

const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name' },
  { label: '年龄', key: 'age' },
  { label: '地址', key: 'address' },
];
const data = ref([
  { id: 1, name: '张三', age: 28, address: '北京' },
  { id: 2, name: '李四', age: 32, address: '上海' },
]);
</script>
<template>
  <ODataTable :columns="columns" :data="data" />
</template>
```

**场景 2：固定高度 + 固定列 + 列宽拖拽**
适用于：大量数据、宽表格
```vue
<script setup>
import type { DataTableColumnT } from '@opensig/opendesign';

const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name', fixed: 'left', minWidth: '15%' },
  { label: '薪资', key: 'salary' },
  { label: '地址', key: 'address' },
  { label: '邮箱', key: 'email', minWidth: 200 },
  { label: '操作', key: 'action', fixed: 'right' },
];
</script>
<template>
  <ODataTable :columns="columns" :data="data" :height="400" border="all" column-resizable />
</template>
```

**场景 3：筛选 + 排序（事件驱动模式）**
适用于：后端分页筛选排序，或前端数据筛选排序
```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import { ODataTable, DataTableSortMethod } from '@opensig/opendesign';
import type { DataTableColumnT, DataTableSortMethodT, DataTableColumnFilterOption } from '@opensig/opendesign';

// 薪资范围筛选项——每个 option 带自定义 filter 函数（范围判断）
const salaryOptions: (DataTableColumnFilterOption & { filter: (row: any) => boolean })[] = [
  { label: '< 6000', value: '<6000', filter: (row) => row.salary < 6000 },
  { label: '6000-8000', value: '6000-8000', filter: (row) => row.salary >= 6000 && row.salary <= 8000 },
  { label: '> 8000', value: '>8000', filter: (row) => row.salary > 8000 },
];

const columns = computed<DataTableColumnT[]>(() => [
  {
    label: '姓名', key: 'name',
    filter: {
      multiple: true,
      showInput: true,
      optionTitle: '选择姓名',
      // optionsFn 接收 { column, emptyOption }；emptyOption 为内置"空值"筛选项
      optionsFn: ({ emptyOption }) => [
        { label: '张三', value: '张三' },
        { label: '李四', value: '李四' },
        emptyOption, // 允许用户筛选该列为空的行
      ],
    },
  },
  { label: '年龄', key: 'age', sortKey: 'ageSort' },
  {
    label: '薪资', key: 'salary',
    filter: {
      optionTitle: '选择薪资范围',
      optionsFn: () => salaryOptions,
    },
  },
]);

// conditions 的 key 对应列的 key（筛选列）或 sortKey（排序列）
// 筛选列初始值为 []，排序列初始值用 DataTableSortMethod.NA
const conditions = ref<{
  name: string[];
  salary: string[];
  ageSort?: DataTableSortMethodT;
}>({
  name: [],
  salary: [],
  ageSort: DataTableSortMethod.NA,
});

// 原始数据（后端场景替换为 API 调用）
const allData = [
  { id: 1, name: '张三', age: 28, salary: 5500 },
  { id: 2, name: '李四', age: 35, salary: 7000 },
  { id: 3, name: '王五', age: 42, salary: 9500 },
];

const data = ref([...allData]);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    // ⚠️ 后端接口场景：data.value = await api.list({ ...conditions.value, page, size })
    // 前端筛选/排序模拟：
    let res = [...allData];

    // 精确值筛选（conditions.name 存的是用户选中的 value 数组）
    if (conditions.value.name?.length) {
      res = res.filter((row) => conditions.value.name.includes(row.name));
    }
    // 范围筛选（通过 option 的自定义 filter 函数处理）
    if (conditions.value.salary?.length) {
      res = res.filter((row) =>
        conditions.value.salary
          .map((val) => salaryOptions.find((opt) => opt.value === val))
          .some((opt) => opt?.filter(row))
      );
    }
    // 排序（ASC=1 升序，DESC=-1 降序，NA=undefined 不排序）
    if (conditions.value.ageSort === DataTableSortMethod.ASC) {
      res.sort((a, b) => a.age - b.age);
    } else if (conditions.value.ageSort === DataTableSortMethod.DESC) {
      res.sort((a, b) => b.age - a.age);
    }

    data.value = res;
  } finally {
    loading.value = false;
  }
};

fetchData();
</script>
<template>
  <ODataTable
    :columns="columns"
    :data="data"
    v-model:conditions="conditions"
    :loading="loading"
    @condition-update="fetchData"
  />
</template>
```

**场景 4：行选择**
适用于：批量操作
```vue
<script setup>
import { ref } from 'vue';
import type { DataTableColumnT, DataTableInstance } from '@opensig/opendesign';

const dataTableRef = ref<DataTableInstance>();
const selectedKeys = ref<(string | number)[]>([]);
const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name' },
  { label: '年龄', key: 'age' },
];
const data = ref([
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32, disabled: true },
]);

// 编程式全选/清空
const handleSelectAll = () => dataTableRef.value?.selectAll();
const handleClearAll = () => dataTableRef.value?.clearAll();
</script>
<template>
  <ODataTable ref="dataTableRef" v-model:selected-keys="selectedKeys" :columns="columns" :data="data" selection />
</template>
```

**场景 5：行展开（插槽方式）**
适用于：展示行详情
```vue
<template>
  <ODataTable :columns="columns" :data="data" v-model:expanded-row-keys="expandedRowKeys" row-key="key">
    <template #expand="{ row }">
      <p>详细地址：{{ row.address }}</p>
      <p>邮箱：{{ row.email }}</p>
    </template>
  </ODataTable>
</template>
```

**场景 6：行展开（expandMethod 方式，按行控制）**
适用于：部分行可展开，支持 JSX/TSX
```vue
<script setup lang="tsx">
import type { DataTableExpandMethod } from '@opensig/opendesign';

const expandMethod: DataTableExpandMethod = (row, rowIndex) => {
  if (rowIndex < 2) return false; // 前两行不可展开
  return () => <div>展开内容：{row.name}</div>;
};
</script>
<template>
  <ODataTable :columns="columns" :data="data" :expand-method="expandMethod" row-key="key" />
</template>
```

**场景 7：树形数据 + 懒加载**
适用于：组织架构、文件树
```vue
<script setup>
import { ref } from 'vue';
import type { DataTableLoadChildrenPayload } from '@opensig/opendesign';

const data = ref([
  { key: '1', name: '部门A', children: [
    { key: '1-1', name: '小组1' },
  ]},
  { key: '2', name: '部门B', hasChildren: true }, // 懒加载
]);

const handleLoadChildren = ({ row, rowKey, resolve, reject }: DataTableLoadChildrenPayload) => {
  fetchChildren(rowKey).then((children) => {
    row.children = children;
    resolve();
  }).catch(() => reject());
};
</script>
<template>
  <ODataTable :columns="columns" :data="data" row-key="key" @load-children="handleLoadChildren" />
</template>
```

**场景 8：嵌套分组表头**
适用于：复杂表头分组
```vue
<script setup>
import type { DataTableColumnT } from '@opensig/opendesign';

const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name' },
  {
    label: '详细信息', key: 'detail',
    children: [
      { label: '薪资', key: 'salary' },
      { label: '地址', key: 'address' },
      { label: '邮箱', key: 'email', minWidth: 200 },
    ],
  },
];
</script>
<template>
  <ODataTable :columns="columns" :data="data" />
</template>
```

**场景 9：单元格合并**
适用于：报表、统计表格
```vue
<script setup>
import type { DataTableSpanMethod } from '@opensig/opendesign';

const spanMethod: DataTableSpanMethod = ({ colIndex, rowIndex }) => {
  if (colIndex === 0 && rowIndex === 0) {
    return { colSpan: 1, rowSpan: 2 }; // 第一列前两行合并
  }
};
</script>
<template>
  <ODataTable :columns="columns" :data="data" :span-method="spanMethod" />
</template>
```

**场景 10：竖向表头列（垂直表头）**
适用于：属性-值对照表
```vue
<script setup>
import type { DataTableColumnT } from '@opensig/opendesign';

const columns: DataTableColumnT[] = [
  { label: '属性', key: 'name', width: 200, asHeader: true, fixed: true },
  { label: '值1', key: 'val1' },
  { label: '值2', key: 'val2' },
];
</script>
<template>
  <ODataTable :columns="columns" :data="data" :show-header="false" />
</template>
```

**场景 11：分页 + 筛选排序联动**
适用于：后端分页与筛选排序联合使用
```vue
<script setup>
import { ref, watch } from 'vue';
import { DataTableSortMethod } from '@opensig/opendesign';

const conditions = ref({ name: [], ageSort: DataTableSortMethod.NA });
const currentPage = ref(1);
const pageSize = ref(10);
const data = ref([]);
const total = ref(0);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  const res = await api.list({ ...conditions.value, page: currentPage.value, size: pageSize.value });
  data.value = res.list;
  total.value = res.total;
  loading.value = false;
};

// 筛选/排序变更时回到第一页
const handleConditionUpdate = () => {
  currentPage.value = 1;
  fetchData();
};

watch([currentPage, pageSize], fetchData);
fetchData();
</script>
<template>
  <ODataTable
    :columns="columns"
    :data="data"
    v-model:conditions="conditions"
    :loading="loading"
    @condition-update="handleConditionUpdate"
  />
  <OPagination v-model:page="currentPage" v-model:page-size="pageSize" :total="total" />
</template>
```

**场景 12：可编辑单元格（formatter + h，推荐）**
适用于：行内输入框、行内选择器等需要直接编辑单元格数据的场景
```vue
<script setup lang="ts">
import { ref, h } from 'vue';
import { ODataTable, OInput } from '@opensig/opendesign';
import type { DataTableColumnT } from '@opensig/opendesign';

interface EditableRow {
  id: number;
  name: string;
  count: number;
  remark: string;
}

const data = ref<EditableRow[]>([
  { id: 1, name: '张三', count: 100, remark: '备注A' },
  { id: 2, name: '李四', count: 200, remark: '备注B' },
]);

const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name', width: 160 },
  {
    label: '数量', key: 'count', width: 120,
    // ✅ 推荐：formatter 返回函数式组件（箭头函数），每次渲染时重新读取 row.count
    // 不要直接返回 h(OInput, ...)，那会导致 VNode 只在初始化时生成一次，失去响应性
    formatter: ({ row }) => () =>
      h(OInput, {
        modelValue: (row as EditableRow).count,
        'onUpdate:modelValue': (v: string | number) => {
          (row as EditableRow).count = Number(v);
        },
        size: 'small',
        style: { width: '90px' },
      }),
  },
  {
    label: '备注', key: 'remark', width: 160,
    formatter: ({ row }) => () =>
      h(OInput, {
        modelValue: (row as EditableRow).remark,
        'onUpdate:modelValue': (v: string | number) => {
          (row as EditableRow).remark = String(v);
        },
        size: 'small',
        style: { width: '120px' },
      }),
  },
  {
    label: '操作', key: 'action', width: 80,
    formatter: ({ row }) =>
      h('span', {
        style: { color: 'var(--o-color-danger1)', cursor: 'pointer' },
        onClick: () => {
          data.value = data.value.filter((r) => r.id !== (row as EditableRow).id);
        },
      }, '删除'),
  },
];
</script>
<template>
  <ODataTable :columns="columns" :data="data" border="row-frame" />
</template>
```

> **核心要点**：`formatter` 必须返回**函数式组件**（`() => h(...)`）而非直接返回 VNode（`h(...)`）。函数式组件会在每次父组件重渲染时重新调用，从而读取 `row` 中的最新值，实现响应式更新。



| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础表格 | `:columns` + `:data` | 最简用法 |
| 固定表头滚动 | `:height="400"` | 超出高度表头固定 |
| 列固定 | column `fixed: 'left'/'right'` | 左右固定列 |
| 列宽调整 | `column-resizable` | 拖拽调整列宽 |
| 全边框 | `border="all"` | 单元格全边框 |
| 斑马纹 | `stripe` | 偶数行背景色 |
| 行选择 | `selection` + `v-model:selected-keys` | 复选框选择 |
| 树形选择关联 | `selection` + `:check-strictly="false"` | 父子联动 |
| 筛选排序 | column `filter/sortKey` + `v-model:conditions` + `@condition-update` | 服务端筛选排序 |
| 行展开 | `#expand` 或 `:expand-method` + `v-model:expanded-row-keys` | 行详情展开 |
| 树形懒加载 | `row.hasChildren` + `@load-children` | 异步加载子节点 |
| 分割线表头 | `header-style="split-line"` | 线分割表头风格 |
| 竖向表头 | column `asHeader` + `:show-header="false"` | 属性-值对照 |
| 加载中 | `loading` + `loading-label` | 加载遮罩 |
| 空数据 | `empty-label` 或 `#empty` | 空状态文案 |
| 单元格合并 | `:span-method` | 合并行列 |
| 空值占位 | `default-empty-cell-text="N/A"` | 自定义空值文案 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--table-filter-trigger-gap` | `4px` | 筛选触发图标与表头文字的间距 |
| `--table-filter-trigger-size` | `16px` | 筛选触发图标大小 |
| `--table-head-bg` | `var(--o-color-control3-light)` | 表头背景色（fill 模式） |
| `--table-head-border-bottom` | `var(--table-border-width) solid var(--table-head-bg)` | 表头底部边框（fill 模式） |
| `--popup-bg-color` | `var(--o-color-control5-light)` | 列筛选弹出面板背景色 |
| `--popup-radius` | `var(--o-radius-xs)` | 列筛选弹出面板圆角 |
| `--popup-shadow` | `var(--o-shadow-2)` | 列筛选弹出面板阴影 |
| `--table-filter-popup-width` | `192px` | 列筛选弹出面板宽度 |
| `--table-filter-option-list-max-height-default` | `256px` | 列筛选选项列表最大高度 |

**使用示例**：
```vue
<ODataTable
  :columns="columns"
  :data="data"
  style="--table-filter-popup-width: 240px; --table-filter-option-list-max-height-default: 320px"
/>
```

### 响应式行为表

| 维度 | 手机/平板竖屏 (<=pad_v) | 桌面端 |
|------|------------------------|--------|
| 列筛选面板 | 底部弹窗 (ODialog) | 弹出层 (OPopup) |
| 多列固定 (iOS) | 仅支持最左 1 列 + 最右 1 列 | 无限制 |

### 组件布局结构

```yaml
component: ODataTable
root: .o-data-table.o-table
  direction: column (position: relative; overflow: hidden)
  border-radius: var(--table-radius)  # var(--o-radius_control-m)
  background-color: var(--table-bg-color)  # var(--o-color-control5)
  CSS-class-modifiers:
    - .o-table-{size}: medium | small
    - .o-table-header-{headerStyle}: fill | split-line
    - .o-table-stripe: 斑马纹
    - .o-table-border-{border}: all | row | column | frame 等
    - .is-overflow-left / .is-overflow-right / .is-overflow-top: 滚动溢出方向
  style-bindings:
    --table-header-height: headerTableHeight (动态计算)
    --table-height: props.height
    --table-max-height: props.maxHeight  # 默认 fit-content

  children:
    # 1. 分割线表头水平分割线（仅 split-line 模式）
    - region: header-divider-h
      class: .o-data-table-header-divider-h
      condition: showHeader && headerStyle === 'split-line'
      position: sticky; z-index: 3
      top: calc(var(--table-header-height) * 1px)
      height: 1px; background: linear-gradient

    # 2. 左侧阴影指示器（无左固定列时使用）
    - region: left-shadow
      class: .o-data-table-left-shadow
      condition: !hasLeftFixedColumn && !loading && data.length
      z-index: 3; display: none (is-overflow-left时display: block)

    # 3. 滚动容器
    - region: scroller
      component: OScroller
      class: .o-table-scroller
      wrap-class: .o-table-wrap
        height: var(--table-height)
        max-height: var(--table-max-height)
        overflow: auto
      children:
        - region: table
          element: table.o-table-inner-table
          min-width: props.minTableWidth
          children:
            # 3a. 列宽定义
            - region: colgroup
              component: TableColGroup
              element: colgroup
              children:
                - col (v-for column: 每列一个col元素, 设定min/maxWidth)

            # 3b. 表头
            - region: thead
              element: thead.o-table-header
              condition: props.showHeader
              position: sticky; top: 0; z-index: 2
              background-color: var(--table-head-bg)
                # fill模式: var(--o-color-control3-light)
                # split-line模式: var(--o-color-control5)
              children:
                - slot: header (替换整个thead)
                - fallback: tr.o-table-header-row (v-for groupColumns)
                  children:
                    - th.o-table-header-cell (v-for column)
                      padding: unset (通过内部.o-table-cell__inner控制)
                      position: sticky (若column.fixed)
                      children:
                        - span.o-table-cell__inner
                          display: flex; align-items: center
                          padding: var(--table-head-cell-padding)  # 12px 16px
                          首列额外padding-left: var(--table-edge-padding)  # 32px
                          末列额外padding-right: var(--table-edge-padding)  # 32px
                          children:
                            - OCheckbox (条件: isFirstCol && selection, 全选框)
                            - icon-placeholder (条件: isFirstCol && 有展开列)
                            - span.o-table-cell__inner-content
                              overflow: hidden; text-overflow: ellipsis
                              children: slot th_{key} 或 column.label
                            - TableColumnFilter (条件: column.filter)
                            - TableColumnSorter (条件: column.sortKey)
                            - OPopover (条件: column.description, 描述气泡)
                        - div.o-table-column-resizer (条件: columnResizable)

            # 3c. 表体
            - region: tbody
              element: tbody.o-table-body
              children:
                - component: TableRow (v-for data, 递归组件)
                  element: tr.o-table-body-row
                  children:
                    - td.o-table-body-cell (v-for dataColumns)
                      position: sticky (若column.fixed)
                      children:
                        - span.o-table-cell__inner
                          display: flex; align-items: center
                          padding: var(--table-cell-padding)  # 12px 16px
                          children:
                            - OCheckbox (条件: isFirstCol && selection, 行选框)
                            - icon-placeholder * level (树形缩进)
                            - IconChevronRightSmall (条件: 可展开, 展开箭头)
                            - TableCellRenderer (formatter 或 slot td_{key})
                  # 展开行（expand模式）
                  - tr.o-table-row-expand (条件: expandBy==='expand' && isRowExpanded)
                    - td[colspan=全列] > span.o-table-expand-cell__inner
                      padding: var(--table-expand-cell-padding)  # 32px
                  # 子行（children树形模式，递归TableRow）
                  - TableRow (v-for row.children, level+1)

                - div.empty-placeholder (条件: loading || data为空)

    # 4. 加载遮罩层
    - region: loading-wrap
      class: .o-table-loading-wrap
      condition: props.loading
      position: absolute; top: calc(var(--table-header-height) * 1px)
      background-color: var(--table-bg-color)
      children: slot loading 或 IconLoading + loadingLabel

    # 5. 空状态层
    - region: tip-wrap
      class: .o-table-tip-wrap
      condition: !loading && !data.length
      position: absolute; top: calc(var(--table-header-height) * 1px)
      children: slot empty 或 emptyLabel

    # 6. 右侧阴影指示器
    - region: right-shadow
      class: .o-data-table-right-shadow
      condition: !hasRightFixedColumn && !loading && data.length

    # 7. 溢出气泡
    - region: popover
      component: OPopover
      condition: popoverVisible
      position: top(表头) / bottom(表体)

# 尺寸变体
size-variants:
  medium:
    --table-text-size: var(--o-font_size-text1)
    --table-text-height: var(--o-line_height-text1)
    --table-head-cell-padding: 12px 16px
    --table-cell-padding: 12px 16px
    --table-edge-padding: 32px
    --table-expand-cell-padding: 32px
    --table-row-icon-size: var(--o-icon_size-m)
    --table-row-icon-gap: 8px
  small:
    --table-text-size: var(--o-font_size-tip1)
    --table-text-height: var(--o-line_height-tip1)
    --table-head-cell-padding: 8px 16px
    --table-cell-padding: 8px 16px
    --table-edge-padding: 16px
    --table-expand-cell-padding: 24px

# 固定列机制
fixed-columns:
  mechanism: position: sticky
  left-fixed: left值由列宽累加计算
  right-fixed: right值由列宽累加计算
  shadow:
    last-left-fixed: 右侧伪元素阴影 linear-gradient(90deg)
    first-right-fixed: 左侧伪元素阴影 linear-gradient(-90deg)
    shadow-size: var(--table-fixed-col-shadow-size)  # 16px
    gradient: var(--table-fixed-col-shadow-gradient)
  overflow-trigger: .is-overflow-left / .is-overflow-right 显示对应阴影

# 筛选面板布局
filter-panel:
  desktop: OPopup弹出层
    width: var(--table-filter-popup-width)  # 192px
    children: [搜索输入框, 选项列表(OOptionList), 分割线, 操作按钮区]
  mobile: ODialog底部弹窗
    children: [同上，样式适配移动端]
```

### 设计稿识别指南

**视觉特征指纹**

1. 矩形表格容器（圆角 `--o-radius_control-m`），包含水平方向的多列数据行；表头行有填充背景色（`--o-color-control3-light` 浅蓝灰）或仅有底部分割线（split-line 模式），表体行之间有行分割线
2. 表头单元格可出现筛选漏斗图标（filter）、排序上下箭头图标（sortKey）、描述气泡图标（description）。行首列可出现复选框（selection 模式）或展开箭头（expand/树形模式）
3. 固定列区域在横向滚动时不随内容移动，固定列与滚动区域交界处出现渐变阴影（16px 宽度）。斑马纹模式下奇偶行交替显示淡色背景

**设计 Token → Prop 值映射表**

⚠️ **border prop 识别规则（重要）**：
- ODataTable 的边框由 `border` prop 控制，**不体现在 DSL 容器节点的 `strokes` 属性中**
- DSL 容器 `strokes:[]` 不代表没有边框，需从**设计图视觉截图**判断边框样式
- 识别方式：截取表格区域图，观察是否有外框线（frame）和竖分隔线（column），再选对应值

| 设计稿 Token / 视觉特征 | 对应 Prop / 配置 | 说明 |
|---|---|---|
| 表头填充背景 `--o-color-control3-light` | `headerStyle="fill"` (默认) | 填充式表头 |
| 表头仅底部线分隔 | `headerStyle="split-line"` | 分割线表头 |
| 行底部细线，无外框，无竖线 | `border="row"` (默认) | 仅行线边框 |
| 行底部细线 + 外框，无竖线 | `border="row-frame"` | 行线+外框 |
| 完整网格线（行+竖+外框） | `border="all"` | 全边框 |
| 仅外框 | `border="frame"` | 仅外框 |
| 仅竖分隔线 | `border="column"` | 仅列线 |
| 无任何边框 | `border="none"` | 无边框 |
| 奇偶行交替背景 | `stripe` | 斑马纹 |
| 鼠标悬停行高亮 | `highlightCurrentRow` | 行悬停高亮 |
| 行首复选框 | `selection` | 行选择模式 |
| 行首展开箭头 + 展开区域 | `expandMethod` 或 `#expand` 插槽 | 行展开 |
| 树形缩进 + 展开箭头 | `data` 含 `children` 字段 | 树形数据 |
| 表头筛选漏斗图标 | 列配置 `filter` | 列筛选 |
| 表头排序上下箭头 | 列配置 `sortKey` | 列排序 |
| 表头描述气泡 `(i)` 图标 | 列配置 `description` | 表头描述 |
| 某列背景色同表头 | 列配置 `asHeader: true` | 竖向表头列 |
| 多级分组表头（上下分层） | 列配置 `children` 嵌套 | 嵌套表头 |
| 拖拽调整列宽手柄 | `columnResizable` | 列宽拖拽 |
| 单元格文字省略 + 悬停气泡 | 列配置 `showOverflowToolTip` | 溢出提示 |
| 紧凑行高 | `size="small"` | 小尺寸模式 |

**易混淆组件区分表**

| 组件 A | 组件 B | 区分标准 |
|--------|--------|---------|
| ODataTable | OTable | DataTable 通过 `columns` + `data` 数据驱动自动渲染；OTable 需手写 `<tr><td>` 模板 |
| ODataTable | OList | DataTable 是多列表格（含表头）；OList 是单列无表头的列表 |
| ODataTable (树形) | OTree | DataTable 树形是表格行的层级嵌套，有多列数据；OTree 是纯树形控件，单列节点 |
| ODataTable (headerStyle=fill) | ODataTable (headerStyle=split-line) | fill 模式表头有填充背景色；split-line 模式表头与表体同色，仅有底部分割线 |
| ODataTable (selection) | ODataTable (expand) | selection 在行首显示复选框用于多选；expand 在行首显示箭头用于展开详情 |
