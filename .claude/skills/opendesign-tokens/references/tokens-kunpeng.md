> ← [Token 索引](../SKILL.md) · [README](../../../README.md)

# Kunpeng 主题 Token 色值参考（k）

主题标识：`k`
品牌色：**Kunpeng Red**（`#C7000B`，与 Ascend 相同）
风格特点：圆角极小（接近直角，同 openEuler），主色使用深灰色，控件悬浮为中性灰，链接使用深蓝色，品牌红用于装饰/强调

---

## 品牌色（Brand）

Kunpeng 只定义 `--o-brand-6`（单一品牌色，无色阶），light/dark 均相同。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-brand-6` | `rgb(199, 0, 11)` | `rgb(199, 0, 11)` |

> Kunpeng 品牌红（与 Ascend 品牌红相同），不用于按钮/链接，主要用于 `--o-color-main1` 展示色。

---

## 灰色板（Grey Palette）

Kunpeng 灰色为中性灰（与 openEuler 相同，与 Ascend 略有差异）。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-grey-1` | `rgb(255, 255, 255)` | `rgb(0, 0, 0)` |
| `--o-grey-2` | `rgb(243, 243, 245)` | `rgb(18, 18, 20)` |
| `--o-grey-3` | `rgb(237, 237, 240)` | `rgb(26, 26, 28)` |
| `--o-grey-4` | `rgb(232, 232, 235)` | `rgb(36, 36, 39)` |
| `--o-grey-5` | `rgb(222, 222, 227)` | `rgb(43, 43, 47)` |
| `--o-grey-6` | `rgb(210, 210, 217)` | `rgb(53, 53, 57)` |
| `--o-grey-7` | `rgb(186, 186, 191)` | `rgb(63, 63, 67)` |
| `--o-grey-8` | `rgb(149, 149, 156)` | `rgb(85, 85, 88)` |
| `--o-grey-9` | `rgb(111, 111, 117)` | `rgb(118, 118, 122)` |
| `--o-grey-10` | `rgb(85, 85, 92)` | `rgb(156, 156, 159)` |
| `--o-grey-11` | `rgb(61, 61, 66)` | `rgb(190, 190, 193)` |
| `--o-grey-12` | `rgb(37, 37, 41)` | `rgb(221, 221, 222)` |
| `--o-grey-13` | `rgb(21, 21, 23)` | `rgb(241, 241, 242)` |
| `--o-grey-14` | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` |

---

## 主色 Token（Primary）— 使用深灰色

**Kunpeng 与 Ascend 相同，primary 使用深灰（非品牌红）。**

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-primary1` | `rgb(37, 37, 41)` | `rgb(221, 221, 222)` |
| `--o-color-primary2` | `rgb(61, 61, 66)` | — |
| `--o-color-primary3` | `rgb(21, 21, 23)` | — |
| `--o-color-primary4` | `rgb(210, 210, 217)` | — |
| `--o-color-primary1-light` | `rgb(232, 232, 235)` | — |
| `--o-color-primary2-light` | `rgb(222, 222, 227)` | — |
| `--o-color-primary3-light` | `rgb(210, 210, 217)` | — |
| `--o-color-primary4-light` | `rgb(222, 222, 227)` | — |

---

## 品牌主色 Token

| Token | 说明 | light 值 |
|-------|------|---------|
| `--o-color-main1` | 品牌主色（展示用） | `rgb(199, 0, 11)` |
| `--o-color-main2` | 品牌渐变色（暖色：Orange→Red） | `linear-gradient(90deg, rgb(255,153,51), rgb(247,77,97))` |
| `--o-color-main2-start` | 渐变起点（橙色） | `rgb(255, 153, 51)` |
| `--o-color-main2-end` | 渐变终点（红色） | `rgb(247, 77, 97)` |

> Kunpeng 渐变与 Ascend 不同：Kunpeng 是橙→红暖色渐变，Ascend 是蓝→紫极光渐变。

---

## 链接色 Token（Link）— 使用深蓝色

Kunpeng 链接与 Ascend 相同，使用 `deepblue`。

| Token | light 值 |
|-------|---------|
| `--o-color-link1` | `rgb(46, 83, 250)` |
| `--o-color-link2` | `rgb(120, 153, 252)` |
| `--o-color-link3` | `rgb(29, 55, 207)` |
| `--o-color-link4` | `rgb(157, 184, 253)` |

---

## 控件色 Token（Control）— 悬浮使用中性灰

Kunpeng 控件悬浮与 Ascend 逻辑相同，但由于 grey-3 值不同，实际灰色略有差异。

| Token | 说明 | light 值 |
|-------|------|---------|
| `--o-color-control1` | 默认边框（25% 不透明） | `rgba(0, 0, 0, 0.25)` |
| `--o-color-control2` | **悬浮边框（灰色）** | `rgba(0, 0, 0, 0.6)` |
| `--o-color-control3` | 激活边框（深灰） | `rgba(0, 0, 0, 0.8)` |
| `--o-color-control4` | 禁用边框（10% 不透明） | `rgba(0, 0, 0, 0.1)` |
| `--o-color-control1-light` | 默认背景 | `rgb(222, 222, 227)` |
| `--o-color-control2-light` | **悬浮背景（灰色，Kunpeng 中性灰）** | `rgb(237, 237, 240)` |
| `--o-color-control3-light` | 激活背景 | `rgb(232, 232, 235)` |
| `--o-color-control4-light` | 禁用背景 | `rgb(237, 237, 240)` |
| `--o-color-control5-light` | 面板背景 | `rgb(255, 255, 255)` |

---

## 填充色 Token（Fill）

| Token | 说明 | light 值 | dark 值 |
|-------|------|---------|--------|
| `--o-color-fill1` | 页面背景 | `rgb(243, 243, 245)` | `rgb(18, 18, 20)` |
| `--o-color-fill2` | 卡片/区块背景 | `rgb(255, 255, 255)` | `rgb(0, 0, 0)` |
| `--o-color-fill3` | 嵌套卡片背景 | `rgb(237, 237, 240)` | `rgb(26, 26, 28)` |

---

## 圆角 Token（Radius）— 极扁平风格（同 openEuler）

Kunpeng 圆角与 openEuler 相同，全部接近直角。

| Token | 值 |
|-------|----|
| `--o-radius-xs` | `4px` |
| `--o-radius-s` | `4px` |
| `--o-radius-m` | `4px` |
| `--o-radius-l` | `4px` |
| `--o-radius-xl` | `0px` |
| `--o-radius_control-xs` | `4px` |
| `--o-radius_control-s` | `4px` |
| `--o-radius_control-m` | `4px` |
| `--o-radius_control-l` | `4px` |

---

## 与其他主题对比

| 特征 | openEuler (e) | Ascend (a) | Kunpeng (k) |
|------|--------------|-----------|------------|
| 品牌色 | Klein Blue `#002FA7` | Ascend Red `#C7000B` | Kunpeng Red `#C7000B` |
| Primary 按钮色 | **品牌蓝** | 深灰 | 深灰 |
| 链接色 | 品牌蓝 | DeepBlue | **DeepBlue** |
| 控件悬浮边框 | 品牌蓝 | 灰色 | 灰色 |
| 渐变色 | 无渐变（纯色） | 蓝紫极光 | **橙红暖色** |
| 圆角风格 | 扁平（0~4px） | 圆润（4~24px） | **扁平（0~4px）** |
| 灰色色调 | 中性灰 | 暖灰 | 中性灰 |

---

## 主题特征总结

- **品牌色**：Kunpeng Red `#C7000B`（与 Ascend 相同），仅用于展示
- **Primary = 深灰**：主操作按钮使用深灰色（同 Ascend）
- **链接 = 深蓝**：链接色使用 DeepBlue（同 Ascend）
- **控件悬浮 = 灰色**：悬浮为灰色（同 Ascend）
- **渐变**：橙红暖色渐变（区别于 Ascend 的蓝紫极光）
- **圆角**：全部扁平（4px/0px），同 openEuler（区别于 Ascend）
- **灰色**：中性灰（同 openEuler，与 Ascend 略有差异）

---

## 反查速查表（Light 模式）

设计稿中遇到以下写死色值时，替换为对应 Token。

### 品牌色 / 展示色

| Hex | RGB | Token | 用途说明 |
|-----|-----|-------|---------|
| `#C7000B` | `rgb(199, 0, 11)` | `--o-color-main1` / `--o-brand-6` | 品牌红（展示/装饰用） |

### Primary 色（深灰）

> Kunpeng 与 Ascend 语义相同，但因灰色板不同，RGB 值略有差异。

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(37, 37, 41)` | `--o-color-primary1` | 主色（深灰按钮） |
| `rgb(61, 61, 66)` | `--o-color-primary2` | 主色悬浮 |
| `rgb(21, 21, 23)` | `--o-color-primary3` | 主色激活 |
| `rgb(210, 210, 217)` | `--o-color-primary4` | 主色禁用 |
| `rgb(232, 232, 235)` | `--o-color-primary1-light` | 主色浅色背景 |
| `rgb(222, 222, 227)` | `--o-color-primary2-light` / `--o-color-primary4-light` | 主色浅色悬浮/禁用 |
| `rgb(210, 210, 217)` | `--o-color-primary3-light` | 主色浅色激活 |

### 链接色（深蓝，同 Ascend）

| Hex | RGB | Token | 用途说明 |
|-----|-----|-------|---------|
| `#2E53FA` | `rgb(46, 83, 250)` | `--o-color-link1` | 链接常规色 |
| `#7899FC` | `rgb(120, 153, 252)` | `--o-color-link2` | 链接悬浮色 |
| `#1D37CF` | `rgb(29, 55, 207)` | `--o-color-link3` | 链接激活色 |
| `#9DB8FD` | `rgb(157, 184, 253)` | `--o-color-link4` | 链接禁用色 |

### 控件色

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgba(0, 0, 0, 0.25)` | `--o-color-control1` | 默认边框 |
| `rgba(0, 0, 0, 0.6)` | `--o-color-control2` | 悬浮边框（灰色） |
| `rgba(0, 0, 0, 0.8)` | `--o-color-control3` | 激活边框 |
| `rgba(0, 0, 0, 0.1)` | `--o-color-control4` | 禁用边框 |
| `rgb(222, 222, 227)` | `--o-color-control1-light` | 默认控件背景 |
| `rgb(237, 237, 240)` | `--o-color-control2-light` / `--o-color-control4-light` | 悬浮/禁用控件背景 |
| `rgb(232, 232, 235)` | `--o-color-control3-light` | 激活控件背景 |
| `rgb(255, 255, 255)` | `--o-color-control5-light` | 面板背景 |

### 填充色

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(243, 243, 245)` | `--o-color-fill1` | 页面背景 |
| `rgb(255, 255, 255)` | `--o-color-fill2` | 卡片/区块背景 |
| `rgb(237, 237, 240)` | `--o-color-fill3` | 嵌套卡片背景 |

### 渐变色

| 值 | Token | 用途说明 |
|----|-------|---------|
| `linear-gradient(90deg, rgb(255,153,51), rgb(247,77,97))` | `--o-color-main2` | 橙红暖色渐变 |
| `rgb(255, 153, 51)` | `--o-color-main2-start` | 渐变起点（橙色） |
| `rgb(247, 77, 97)` | `--o-color-main2-end` | 渐变终点（红色） |

---

## 反查速查表（Dark 模式）

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(221, 221, 222)` | `--o-color-primary1` | 主色（浅灰） |
| `rgb(18, 18, 20)` | `--o-color-fill1` | 页面背景 |
| `rgb(0, 0, 0)` | `--o-color-fill2` | 卡片背景 |
| `rgb(26, 26, 28)` | `--o-color-fill3` | 嵌套卡片背景 |
