> ← [Token 索引](../SKILL.md) · [README](../../../README.md)

# Ascend 主题 Token 色值参考（a）

主题标识：`a`
品牌色：**Ascend Red**（`#C7000B`）
风格特点：圆角较大（8~24px），主色使用深灰色，控件悬浮为中性灰，链接使用深蓝色，品牌红用于装饰/强调

---

## 品牌色（Brand）

Ascend 只定义 `--o-brand-6`（单一品牌色，无色阶），light/dark 均相同。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-brand-6` | `rgb(199, 0, 11)` | `rgb(199, 0, 11)` |

> Ascend 品牌红不用于按钮/链接，主要用于 `--o-color-main1` 展示色。

---

## 灰色板（Grey Palette）

Ascend 灰色略带暖调（light 模式下微偏暖灰）。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-grey-1` | `rgb(255, 255, 255)` | `rgb(0, 0, 0)` |
| `--o-grey-2` | `rgb(244, 245, 247)` | `rgb(16, 18, 20)` |
| `--o-grey-3` | `rgb(237, 239, 242)` | `rgb(23, 25, 28)` |
| `--o-grey-4` | `rgb(232, 234, 237)` | `rgb(33, 35, 39)` |
| `--o-grey-5` | `rgb(224, 226, 230)` | `rgb(40, 42, 47)` |
| `--o-grey-6` | `rgb(209, 214, 219)` | `rgb(50, 52, 57)` |
| `--o-grey-7` | `rgb(179, 185, 191)` | `rgb(60, 62, 67)` |
| `--o-grey-8` | `rgb(144, 150, 158)` | `rgb(82, 84, 89)` |
| `--o-grey-9` | `rgb(104, 109, 117)` | `rgb(115, 117, 122)` |
| `--o-grey-10` | `rgb(79, 84, 92)` | `rgb(153, 155, 160)` |
| `--o-grey-11` | `rgb(55, 59, 66)` | `rgb(187, 189, 194)` |
| `--o-grey-12` | `rgb(32, 35, 41)` | `rgb(219, 220, 224)` |
| `--o-grey-13` | `rgb(18, 20, 23)` | `rgb(239, 240, 242)` |
| `--o-grey-14` | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` |

---

## 主色 Token（Primary）— 使用深灰色

**Ascend 的 primary 使用深灰（非品牌红），这是与 openEuler 最大的区别之一。**

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-primary1` | `rgb(32, 35, 41)` | `rgb(219, 220, 224)` |
| `--o-color-primary2` | `rgb(55, 59, 66)` | — |
| `--o-color-primary3` | `rgb(18, 20, 23)` | — |
| `--o-color-primary4` | `rgb(209, 214, 219)` | — |
| `--o-color-primary1-light` | `rgb(232, 234, 237)` | — |
| `--o-color-primary2-light` | `rgb(224, 226, 230)` | — |
| `--o-color-primary3-light` | `rgb(209, 214, 219)` | — |
| `--o-color-primary4-light` | `rgb(224, 226, 230)` | — |

---

## 品牌主色 Token

| Token | 说明 | light 值 |
|-------|------|---------|
| `--o-color-main1` | 品牌主色（展示用） | `rgb(199, 0, 11)` |
| `--o-color-main2` | 品牌渐变色（极光：DeepBlue→Purple） | `linear-gradient(90deg, rgb(46,83,250), rgb(123,37,244))` |
| `--o-color-main2-start` | 渐变起点 | `rgb(46, 83, 250)` |
| `--o-color-main2-end` | 渐变终点 | `rgb(123, 37, 244)` |

---

## 链接色 Token（Link）— 使用深蓝色

Ascend 链接使用 `deepblue`（非品牌红）。

| Token | light 值 |
|-------|---------|
| `--o-color-link1` | `rgb(46, 83, 250)` |
| `--o-color-link2` | `rgb(120, 153, 252)` |
| `--o-color-link3` | `rgb(29, 55, 207)` |
| `--o-color-link4` | `rgb(157, 184, 253)` |

---

## 控件色 Token（Control）— 悬浮使用中性灰

**Ascend 控件悬浮使用灰色（非品牌色），点击聚焦时也使用深灰。**

| Token | 说明 | light 值 |
|-------|------|---------|
| `--o-color-control1` | 默认边框（25% 不透明） | `rgba(0, 0, 0, 0.25)` |
| `--o-color-control2` | **悬浮边框（灰色）** | `rgba(0, 0, 0, 0.6)` |
| `--o-color-control3` | 激活边框（深灰） | `rgba(0, 0, 0, 0.8)` |
| `--o-color-control4` | 禁用边框（10% 不透明） | `rgba(0, 0, 0, 0.1)` |
| `--o-color-control1-light` | 默认背景 | `rgb(224, 226, 230)` |
| `--o-color-control2-light` | **悬浮背景（灰色）** | `rgb(237, 239, 242)` |
| `--o-color-control3-light` | 激活背景 | `rgb(232, 234, 237)` |
| `--o-color-control4-light` | 禁用背景 | `rgb(237, 239, 242)` |
| `--o-color-control5-light` | 面板背景 | `rgb(255, 255, 255)` |

---

## 填充色 Token（Fill）

| Token | 说明 | light 值 | dark 值 |
|-------|------|---------|--------|
| `--o-color-fill1` | 页面背景 | `rgb(244, 245, 247)` | `rgb(16, 18, 20)` |
| `--o-color-fill2` | 卡片/区块背景 | `rgb(255, 255, 255)` | `rgb(0, 0, 0)` |
| `--o-color-fill3` | 嵌套卡片背景 | `rgb(237, 239, 242)` | `rgb(23, 25, 28)` |

---

## 圆角 Token（Radius）— 圆润风格

Ascend 圆角最大，风格最圆润。

| Token | 值 |
|-------|----|
| `--o-radius-xs` | `4px` |
| `--o-radius-s` | `8px` |
| `--o-radius-m` | `12px` |
| `--o-radius-l` | `16px` |
| `--o-radius-xl` | `24px` |
| `--o-radius_control-xs` | `4px` |
| `--o-radius_control-s` | `8px` |
| `--o-radius_control-m` | `12px` |
| `--o-radius_control-l` | `16px` |

---

## 主题特征总结

- **品牌色**：Ascend Red `#C7000B`，仅用于展示/装饰（`--o-color-main1`），不用于按钮
- **Primary = 深灰**：主操作按钮使用深灰色（Ascend 强调灰色中性设计）
- **链接 = 深蓝**：链接色使用 DeepBlue（非品牌红）
- **控件悬浮 = 灰色**：悬浮边框和背景均为中性灰（非品牌色）
- **渐变**：极光渐变 DeepBlue → Purple，用于装饰性展示
- **圆角**：全系列圆润（4/8/12/16/24px），适合现代/流畅风格
- **灰色**：略带暖调，与 openEuler/Kunpeng 的中性灰有细微差别

---

## 反查速查表（Light 模式）

设计稿中遇到以下写死色值时，替换为对应 Token。

### 品牌色 / 展示色

| Hex | RGB | Token | 用途说明 |
|-----|-----|-------|---------|
| `#C7000B` | `rgb(199, 0, 11)` | `--o-color-main1` / `--o-brand-6` | 品牌红（展示/装饰用） |

### Primary 色（深灰）

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(32, 35, 41)` | `--o-color-primary1` | 主色（深灰按钮） |
| `rgb(55, 59, 66)` | `--o-color-primary2` | 主色悬浮 |
| `rgb(18, 20, 23)` | `--o-color-primary3` | 主色激活 |
| `rgb(209, 214, 219)` | `--o-color-primary4` | 主色禁用 |
| `rgb(232, 234, 237)` | `--o-color-primary1-light` | 主色浅色背景 |
| `rgb(224, 226, 230)` | `--o-color-primary2-light` | 主色浅色悬浮 |
| `rgb(209, 214, 219)` | `--o-color-primary3-light` | 主色浅色激活 |
| `rgb(224, 226, 230)` | `--o-color-primary4-light` | 主色浅色禁用 |

### 链接色（深蓝）

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
| `rgb(224, 226, 230)` | `--o-color-control1-light` | 默认控件背景 |
| `rgb(237, 239, 242)` | `--o-color-control2-light` / `--o-color-control4-light` | 悬浮/禁用控件背景 |
| `rgb(232, 234, 237)` | `--o-color-control3-light` | 激活控件背景 |
| `rgb(255, 255, 255)` | `--o-color-control5-light` | 面板背景 |

### 填充色

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(244, 245, 247)` | `--o-color-fill1` | 页面背景 |
| `rgb(255, 255, 255)` | `--o-color-fill2` | 卡片/区块背景 |
| `rgb(237, 239, 242)` | `--o-color-fill3` | 嵌套卡片背景 |

### 渐变色

| 值 | Token | 用途说明 |
|----|-------|---------|
| `linear-gradient(90deg, rgb(46,83,250), rgb(123,37,244))` | `--o-color-main2` | 极光渐变（蓝紫） |
| `rgb(46, 83, 250)` | `--o-color-main2-start` | 渐变起点（深蓝） |
| `rgb(123, 37, 244)` | `--o-color-main2-end` | 渐变终点（紫色） |

---

## 反查速查表（Dark 模式）

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(219, 220, 224)` | `--o-color-primary1` | 主色（浅灰） |
| `rgb(16, 18, 20)` | `--o-color-fill1` | 页面背景 |
| `rgb(0, 0, 0)` | `--o-color-fill2` | 卡片背景 |
| `rgb(23, 25, 28)` | `--o-color-fill3` | 嵌套卡片背景 |
