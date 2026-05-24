> ← [Token 索引](../SKILL.md) · [README](../../../README.md)

# openGauss 主题 Token 色值参考（g）

主题标识：`g`
品牌色：**Purple（紫色）**（`#7D32EA`）
风格特点：递进圆角（4/8/12/16/24px），主色/链接/控件悬浮均使用品牌紫色，灰色为中性灰，无实质渐变

---

## 品牌色板（Brand Palette）

openGauss 拥有完整 brand 色阶（1-10）。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-brand-1` | `rgb(246, 238, 253)` | `rgb(31, 9, 91)` |
| `--o-brand-2` | `rgb(233, 211, 251)` | `rgb(50, 16, 127)` |
| `--o-brand-3` | `rgb(208, 169, 247)` | `rgb(72, 25, 163)` |
| `--o-brand-4` | `rgb(182, 128, 242)` | `rgb(97, 36, 198)` |
| `--o-brand-5` | `rgb(154, 88, 238)` | `rgb(125, 50, 234)` |
| `--o-brand-6` | `rgb(125, 50, 234)` ← 主色 | `rgb(154, 88, 238)` |
| `--o-brand-7` | `rgb(97, 36, 198)` | `rgb(182, 128, 242)` |
| `--o-brand-8` | `rgb(72, 25, 163)` | `rgb(208, 169, 247)` |
| `--o-brand-9` | `rgb(50, 16, 127)` | `rgb(233, 211, 251)` |
| `--o-brand-10` | `rgb(31, 9, 91)` | `rgb(246, 238, 253)` |

> openGauss 的 `--o-brand-6` 在 light（125, 50, 234）与 dark（154, 88, 238）模式下值不同，dark 模式品牌色阶完全反转（brand-1 dark = brand-10 light，以此类推）。

---

## 灰色板（Grey Palette）

openGauss 灰色为中性灰（与 openEuler/Kunpeng/openUBMC 相同）。

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
| `--o-grey-11` | `rgb(61, 61, 66)` | `rgb(181, 181, 185)` |
| `--o-grey-12` | `rgb(37, 37, 41)` | `rgb(208, 208, 210)` |
| `--o-grey-13` | `rgb(21, 21, 23)` | `rgb(235, 235, 238)` |
| `--o-grey-14` | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` |

---

## 主色 Token（Primary）— 使用品牌紫

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-primary1` | `rgb(125, 50, 234)` | `rgb(154, 88, 238)` |
| `--o-color-primary2` | `rgb(182, 128, 242)` | `rgb(97, 36, 198)` |
| `--o-color-primary3` | `rgb(97, 36, 198)` | `rgb(182, 128, 242)` |
| `--o-color-primary4` | `rgb(208, 169, 247)` | `rgb(72, 25, 163)` |
| `--o-color-primary1-light` | `rgb(233, 211, 251)` | `rgb(50, 16, 127)` |
| `--o-color-primary2-light` | `rgb(208, 169, 247)` | `rgb(72, 25, 163)` |
| `--o-color-primary3-light` | `rgb(182, 128, 242)` | `rgb(97, 36, 198)` |
| `--o-color-primary4-light` | `rgb(246, 238, 253)` | `rgb(31, 9, 91)` |

---

## 品牌主色 Token

| Token | 说明 | light 值 | dark 值 |
|-------|------|---------|--------|
| `--o-color-main1` | 品牌主色 | `rgb(125, 50, 234)` | `rgb(154, 88, 238)` |
| `--o-color-main2` | 品牌渐变色（无渐变，纯色） | `linear-gradient(90deg, rgb(154,88,238), rgb(154,88,238))` | 同 |
| `--o-color-main2-start` | 渐变起点（= brand-5） | `rgb(154, 88, 238)` | 同 |
| `--o-color-main2-end` | 渐变终点（= brand-5） | `rgb(154, 88, 238)` | 同 |

> openGauss 与 openEuler 类似，main2 无实质渐变效果。

---

## 链接色 Token（Link）— 使用品牌紫

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-link1` | `rgb(125, 50, 234)` | `rgb(154, 88, 238)` |
| `--o-color-link2` | `rgb(182, 128, 242)` | `rgb(97, 36, 198)` |
| `--o-color-link3` | `rgb(97, 36, 198)` | `rgb(182, 128, 242)` |
| `--o-color-link4` | `rgb(208, 169, 247)` | `rgb(72, 25, 163)` |

---

## 控件色 Token（Control）— 悬浮使用品牌紫

| Token | 说明 | light 值 |
|-------|------|---------|
| `--o-color-control1` | 默认边框（25% 不透明） | `rgba(0, 0, 0, 0.25)` |
| `--o-color-control2` | **悬浮边框（品牌紫）** | `rgb(125, 50, 234)` |
| `--o-color-control3` | 激活边框 | `rgb(97, 36, 198)` |
| `--o-color-control4` | 禁用边框（10% 不透明） | `rgba(0, 0, 0, 0.1)` |
| `--o-color-control5` | 面板前景 | `rgb(255, 255, 255)` |
| `--o-color-control1-light` | 默认背景 | `rgb(222, 222, 227)` |
| `--o-color-control2-light` | **悬浮背景（品牌紫浅色）** | `rgb(246, 238, 253)` |
| `--o-color-control3-light` | 激活背景 | `rgb(233, 211, 251)` |
| `--o-color-control4-light` | 禁用背景 | `rgb(237, 237, 240)` |
| `--o-color-control5-light` | 面板背景 | `rgb(255, 255, 255)` |

---

## 填充色 Token（Fill）

| Token | 说明 | light 值 | dark 值 |
|-------|------|---------|--------|
| `--o-color-fill1` | 页面背景 | `rgb(243, 243, 245)` | `rgb(26, 26, 28)` |
| `--o-color-fill2` | 卡片/区块背景 | `rgb(255, 255, 255)` | `rgb(36, 36, 39)` |
| `--o-color-fill3` | 嵌套卡片背景 | `rgb(237, 237, 240)` | `rgb(43, 43, 47)` |

---

## 圆角 Token（Radius）— 递进风格

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

- **品牌色**：Purple `#7D32EA`（紫色），控件悬浮和链接均使用品牌色
- **Primary = Brand**：主操作按钮直接使用品牌紫（同 openEuler/openUBMC 模式）
- **brand-6 反转**：light（125, 50, 234）与 dark（154, 88, 238）值不同，dark 模式品牌色阶完全反转
- **圆角**：递进圆角体系（4/8/12/16/24px），风格圆润
- **渐变**：无实质渐变（main2 start = end = brand-5）
- **灰色**：中性灰（同 openEuler/Kunpeng/openUBMC）
- **阴影**：shadow-1 基于 grey-13（`0 3px 8px rgba(var(--o-grey-13), 0.08)`）

---

## 反查速查表（Light 模式）

设计稿中遇到以下写死色值时，替换为对应 Token。

### 品牌色 / Primary / 链接色

| Hex | RGB | Token | 用途说明 |
|-----|-----|-------|---------|
| `#7D32EA` | `rgb(125, 50, 234)` | `--o-color-primary1` / `--o-color-link1` / `--o-color-control2` | 主色、链接常规色、悬浮边框 |
| `#B680F2` | `rgb(182, 128, 242)` | `--o-color-primary2` / `--o-color-link2` | 主色悬浮、链接悬浮 |
| `#6124C6` | `rgb(97, 36, 198)` | `--o-color-primary3` / `--o-color-link3` / `--o-color-control3` | 主色激活、链接激活、激活边框 |
| `#D0A9F7` | `rgb(208, 169, 247)` | `--o-color-primary4` / `--o-color-link4` | 主色禁用、链接禁用 |
| `#E9D3FB` | `rgb(233, 211, 251)` | `--o-color-primary1-light` | 主色浅色背景 |
| `#F6EEFD` | `rgb(246, 238, 253)` | `--o-color-primary4-light` / `--o-color-control2-light` | 主色浅色禁用、控件悬浮背景 |

### 控件色

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgba(0, 0, 0, 0.25)` | `--o-color-control1` | 默认边框 |
| `rgb(125, 50, 234)` | `--o-color-control2` | 悬浮边框（品牌紫） |
| `rgb(97, 36, 198)` | `--o-color-control3` | 激活边框 |
| `rgba(0, 0, 0, 0.1)` | `--o-color-control4` | 禁用边框 |
| `rgb(222, 222, 227)` | `--o-color-control1-light` | 默认控件背景 |
| `rgb(246, 238, 253)` | `--o-color-control2-light` | 悬浮控件背景（品牌紫浅色） |
| `rgb(233, 211, 251)` | `--o-color-control3-light` | 激活控件背景 |
| `rgb(237, 237, 240)` | `--o-color-control4-light` | 禁用控件背景 |
| `rgb(255, 255, 255)` | `--o-color-control5-light` | 面板背景 |

### 填充色

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(243, 243, 245)` | `--o-color-fill1` | 页面背景 |
| `rgb(255, 255, 255)` | `--o-color-fill2` | 卡片/区块背景 |
| `rgb(237, 237, 240)` | `--o-color-fill3` | 嵌套卡片背景 |

### 品牌色阶（完整）

| Hex | RGB | Token |
|-----|-----|-------|
| `#F6EEFD` | `rgb(246, 238, 253)` | `--o-brand-1` |
| `#E9D3FB` | `rgb(233, 211, 251)` | `--o-brand-2` |
| `#D0A9F7` | `rgb(208, 169, 247)` | `--o-brand-3` |
| `#B680F2` | `rgb(182, 128, 242)` | `--o-brand-4` |
| `#9A58EE` | `rgb(154, 88, 238)` | `--o-brand-5` |
| `#7D32EA` | `rgb(125, 50, 234)` | `--o-brand-6`（主色） |
| `#6124C6` | `rgb(97, 36, 198)` | `--o-brand-7` |
| `#4819A3` | `rgb(72, 25, 163)` | `--o-brand-8` |
| `#32107F` | `rgb(50, 16, 127)` | `--o-brand-9` |
| `#1F095B` | `rgb(31, 9, 91)` | `--o-brand-10` |

---

## 反查速查表（Dark 模式）

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(154, 88, 238)` | `--o-color-primary1` / `--o-color-link1` | 主色、链接常规色 |
| `rgb(97, 36, 198)` | `--o-color-primary2` | 主色悬浮 |
| `rgb(182, 128, 242)` | `--o-color-primary3` | 主色激活 |
| `rgb(26, 26, 28)` | `--o-color-fill1` | 页面背景 |
| `rgb(36, 36, 39)` | `--o-color-fill2` | 卡片背景 |
| `rgb(43, 43, 47)` | `--o-color-fill3` | 嵌套卡片背景 |
