# 案例中心页 / Showcase

案例中心主页（`/zh/showcase/`、`/en/showcase/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/showcase` 虚拟模块。

> **注意**：案例列表数据来自 API（`getUserCaseData`），不在本数据范围。本 yaml 只包含行业分类图标映射（`type_map`），用于案例卡片的行业图标和背景图。
>
> 子页面 `technical-white-paper` 的数据在 `.content/showcase/technical-white-paper/` 下，独立管理。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文行业分类图标映射（7 个行业） |
| `en.yaml` | 英文行业分类图标映射（5 个行业） |
| `images/light/` | 亮色主题行业图标 PNG（7 张） |
| `images/dark/` | 暗色主题行业图标 PNG（7 张） |
| `images/*.svg` | 行业 SVG 图标（7 个，带 `?raw` 后缀，用 `createSvgIcon` 消费） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `type_map` | object | 行业分类图标映射（按行业名索引） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml`（7 项）/ `en.yaml`（5 项），结构一致字段名相同
- **对象索引**：原数据用 `Map` 结构，yaml 改为 `Record<string, Item>` 对象，组件用 `typeMap[key]` 查找（替代 `Map.get(key)`）
- **SVG 用 `?raw` + `createSvgIcon`**：7 个 unplugin-icons 的 SVG 源文件复制到 `images/`，yaml 写 `./images/xxx.svg?raw`，组件用 `createSvgIcon(typeMap[key].icon)` 消费
- **主题变体扁平化**：原 `img: { light, dark }` 嵌套对象扁平化为 `img_light` / `img_dark` 两个字段
- **zh/en 行业数不同**：zh 有 7 个行业（含高校&科研、云计算），en 只有 5 个（缺少 Education 和 CloudComputing）
- **PNG 不带 `?raw`**：`<img>` / CSS 背景图消费
- **图标文件名与图片文件名有差异**：如 `operator.svg` 对应 `carrier.png`（SVG 用变量名，PNG 用文件名）

## 消费方式

```ts
import { computed } from 'vue';
import showcaseContent from '#content/showcase';
import { createSvgIcon } from '~@/composables/createSvgIcon';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
const typeMap = computed(() => showcaseContent[locale.value].type_map);
// 模板：typeMap[item.industry]?.[commonStore.theme === 'dark' ? 'img_dark' : 'img_light']
// 图标：createSvgIcon(typeMap[item.industry]?.icon)
```

## Schema

### type_map（按行业名索引的对象）

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | 是 | 行业 SVG 图标（`./images/xxx.svg?raw`，用 `createSvgIcon` 消费） |
| `img_light` | 是 | 亮色主题行业图标 PNG（`./images/light/xxx.png`） |
| `img_dark` | 是 | 暗色主题行业图标 PNG（`./images/dark/xxx.png`） |

### zh 行业列表（7 项）

金融 / 运营商 / 能源 / 物流 / 高校&科研 / 云计算 / 其他

### en 行业列表（5 项）

Finance / Carrier / Energy / Logistics / Others
