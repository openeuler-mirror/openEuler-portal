> ← [Token 索引](../SKILL.md) · [README](../../../README.md)

# Mindspore 主题 Token 色值参考（m）

主题标识：`m`
品牌色：**Vivid Blue（活力蓝）**（`#3366FF`）
风格特点：递进圆角（4/8/12/16/24px），主色/链接/控件悬浮均使用品牌蓝色，暖灰色调（同 Ascend），青蓝渐变

---

## 品牌色板（Brand Palette）

Mindspore 拥有完整 brand 色阶（1-10），与 openEuler 同属"品牌色主导"型主题。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-brand-1` | `rgb(230, 238, 255)` | `rgb(0, 37, 89)` |
| `--o-brand-2` | `rgb(214, 227, 255)` | `rgb(0, 44, 102)` |
| `--o-brand-3` | `rgb(173, 198, 255)` | `rgb(0, 62, 140)` |
| `--o-brand-4` | `rgb(133, 167, 255)` | `rgb(0, 88, 191)` |
| `--o-brand-5` | `rgb(92, 135, 255)` | `rgb(0, 117, 245)` |
| `--o-brand-6` | `rgb(51, 102, 255)` ← 主色 | `rgb(51, 151, 255)` |
| `--o-brand-7` | `rgb(37, 80, 219)` | `rgb(77, 168, 255)` |
| `--o-brand-8` | `rgb(26, 60, 184)` | `rgb(127, 193, 253)` |
| `--o-brand-9` | `rgb(16, 43, 148)` | `rgb(178, 220, 254)` |
| `--o-brand-10` | `rgb(9, 28, 112)` | `rgb(217, 237, 255)` |

> Mindspore 的 `--o-brand-6` 在 light 模式为 `rgb(51, 102, 255)`，dark 模式为 `rgb(51, 151, 255)`——品牌色会随模式变化（dark 更亮更青）。

---

## 灰色板（Grey Palette）

Mindspore 灰色为暖灰（与 Ascend 相同，区别于 openEuler/Kunpeng/openGauss/openUBMC 的中性灰）。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-grey-1` | `rgb(255, 255, 255)` | `rgb(0, 0, 0)` |
| `--o-grey-2` | `rgb(244, 245, 247)` | `rgb(16, 18, 20)` |
| `--o-grey-3` | `rgb(237, 239, 242)` | `rgb(23, 25, 28)` |
| `--o-grey-4` | `rgb(232, 234, 237)` | `rgb(33, 35, 39)` |
| `--o-grey-5` | `rgb(224, 226, 230)` | `rgb(40, 42, 47)` |
| `--o-grey-6` | `rgb(209, 214, 219)` | `rgb(50, 53, 57)` |
| `--o-grey-7` | `rgb(179, 185, 191)` | `rgb(61, 63, 67)` |
| `--o-grey-8` | `rgb(144, 150, 158)` | `rgb(80, 84, 88)` |
| `--o-grey-9` | `rgb(104, 109, 117)` | `rgb(113, 117, 122)` |
| `--o-grey-10` | `rgb(79, 84, 92)` | `rgb(147, 152, 159)` |
| `--o-grey-11` | `rgb(55, 59, 66)` | `rgb(172, 177, 185)` |
| `--o-grey-12` | `rgb(32, 35, 41)` | `rgb(198, 202, 210)` |
| `--o-grey-13` | `rgb(18, 20, 23)` | `rgb(231, 234, 238)` |
| `--o-grey-14` | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` |

---

## 主色 Token（Primary）— 使用品牌蓝

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-primary1` | `rgb(51, 102, 255)` | `rgb(51, 151, 255)` |
| `--o-color-primary2` | `rgb(133, 167, 255)` | `rgb(0, 88, 191)` |
| `--o-color-primary3` | `rgb(37, 80, 219)` | `rgb(77, 168, 255)` |
| `--o-color-primary4` | `rgb(173, 198, 255)` | `rgb(0, 62, 140)` |
| `--o-color-primary1-light` | `rgb(214, 227, 255)` | `rgb(0, 44, 102)` |
| `--o-color-primary2-light` | `rgb(173, 198, 255)` | `rgb(0, 62, 140)` |
| `--o-color-primary3-light` | `rgb(133, 167, 255)` | `rgb(0, 88, 191)` |
| `--o-color-primary4-light` | `rgb(230, 238, 255)` | `rgb(0, 37, 89)` |

---

## 品牌主色 Token

| Token | 说明 | light 值 | dark 值 |
|-------|------|---------|--------|
| `--o-color-main1` | 品牌主色 | `rgb(51, 102, 255)` | `rgb(51, 151, 255)` |
| `--o-color-main2` | 品牌渐变色（青蓝渐变） | `linear-gradient(90deg, rgb(7,202,255), rgb(88,130,255))` | 同 |
| `--o-color-main2-start` | 渐变起点（青色） | `rgb(7, 202, 255)` | 同 |
| `--o-color-main2-end` | 渐变终点（蓝色） | `rgb(88, 130, 255)` | 同 |
| `--o-color-main2-angle` | 渐变角度 | `90deg` | 同 |

> Mindspore 的渐变色为独特的青蓝渐变（Cyan → Blue），区别于 Ascend 的蓝紫渐变和 Kunpeng 的橙红渐变。

---

## 链接色 Token（Link）— 使用品牌蓝

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-link1` | `rgb(51, 102, 255)` | `rgb(51, 151, 255)` |
| `--o-color-link2` | `rgb(133, 167, 255)` | `rgb(0, 88, 191)` |
| `--o-color-link3` | `rgb(37, 80, 219)` | `rgb(77, 168, 255)` |
| `--o-color-link4` | `rgb(173, 198, 255)` | `rgb(0, 62, 140)` |

---

## 控件色 Token（Control）— 悬浮使用品牌蓝

| Token | 说明 | light 值 |
|-------|------|---------|
| `--o-color-control1` | 默认边框（25% 不透明） | `rgba(0, 0, 0, 0.25)` |
| `--o-color-control2` | **悬浮边框（品牌蓝）** | `rgb(51, 102, 255)` |
| `--o-color-control3` | 激活边框 | `rgb(37, 80, 219)` |
| `--o-color-control4` | 禁用边框（10% 不透明） | `rgba(0, 0, 0, 0.1)` |
| `--o-color-control5` | 面板前景 | `rgb(255, 255, 255)` |
| `--o-color-control1-light` | 默认背景 | `rgb(224, 226, 230)` |
| `--o-color-control2-light` | **悬浮背景（品牌蓝浅色）** | `rgb(230, 238, 255)` |
| `--o-color-control3-light` | 激活背景 | `rgb(214, 227, 255)` |
| `--o-color-control4-light` | 禁用背景 | `rgb(237, 239, 242)` |
| `--o-color-control5-light` | 面板背景 | `rgb(255, 255, 255)` |

---

## 填充色 Token（Fill）

| Token | 说明 | light 值 | dark 值 |
|-------|------|---------|--------|
| `--o-color-fill1` | 页面背景 | `rgb(244, 245, 247)` | `rgb(23, 25, 28)` |
| `--o-color-fill2` | 卡片/区块背景 | `rgb(255, 255, 255)` | `rgb(33, 35, 39)` |
| `--o-color-fill3` | 嵌套卡片背景 | `rgb(237, 239, 242)` | `rgb(40, 42, 47)` |

---

## 阴影 Token（Shadow）

| Token | 值 |
|-------|----|
| `--o-shadow-1` | `0 3px 8px rgba(var(--o-grey-13), 0.08)` |

> Mindspore 阴影基于 `--o-grey-13`（同 openGauss/openUBMC），区别于 openEuler 使用 `--o-grey-14`。

---

## 圆角 Token（Radius）— 圆润风格（同 Ascend/openGauss/openUBMC）

Mindspore 与 Ascend、openGauss、openUBMC 使用相同的递进圆角体系。

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

## 与其他主题对比

| 特征 | openEuler (e) | Ascend (a) | Kunpeng (k) | openGauss (g) | openUBMC (u) | Mindspore (m) |
|------|--------------|-----------|------------|--------------|-------------|--------------|
| 品牌色 | Klein Blue `#002FA7` | Red `#C7000B` | Red `#C7000B` | Purple `#7D32EA` | Azure Blue `#0071F3` | **Vivid Blue `#3366FF`** |
| Primary 按钮色 | 品牌蓝 | 深灰 | 深灰 | 品牌紫 | 品牌蓝 | **品牌蓝** |
| 链接色 | 品牌蓝 | DeepBlue | DeepBlue | 品牌紫 | 品牌蓝 | **品牌蓝** |
| 控件悬浮边框 | 品牌蓝 | 灰色 | 灰色 | 品牌紫 | 品牌蓝 | **品牌蓝** |
| 渐变色 | 无渐变 | 蓝紫极光 | 橙红暖色 | 无渐变 | 无渐变 | **青蓝渐变** |
| 圆角风格 | 扁平（0~4px） | 圆润（4~24px） | 扁平（0~4px） | 圆润（4~24px） | 圆润（4~24px） | **圆润（4~24px）** |
| 灰色色调 | 中性灰 | 暖灰 | 中性灰 | 中性灰 | 中性灰 | **暖灰** |
| 阴影基色 | grey-14 | grey-14 | grey-14 | grey-13 | grey-13 | **grey-13** |
| brand-6 随模式变化 | 是 | 是 | 是 | 是 | 否（锚定） | **是** |

---

## 主题特征总结

- **品牌色**：Vivid Blue `#3366FF`（亮蓝色），控件悬浮和链接均使用品牌色
- **Primary = Brand**：主操作按钮直接使用品牌蓝（同 openEuler/openGauss/openUBMC 模式）
- **brand-6 随模式变化**：light `rgb(51, 102, 255)` → dark `rgb(51, 151, 255)`（dark 更亮更青）
- **圆角**：递进圆角体系（4/8/12/16/24px），风格圆润（同 Ascend/openGauss/openUBMC）
- **渐变**：青蓝渐变 Cyan `rgb(7, 202, 255)` → Blue `rgb(88, 130, 255)`，用于装饰性展示
- **灰色**：暖灰色调（同 Ascend，区别于 openEuler/Kunpeng/openGauss/openUBMC）
- **阴影**：基于 grey-13（同 openGauss/openUBMC，区别于 openEuler 的 grey-14）
- **结构特点**：结合了 openEuler 的"品牌色主导"和 Ascend 的"圆润暖灰风格"，渐变色独特

---

## 反查速查表（Light 模式）

设计稿中遇到以下写死色值时，替换为对应 Token。

### 品牌色 / Primary / 链接色

| Hex | RGB | Token | 用途说明 |
|-----|-----|-------|---------|
| `#3366FF` | `rgb(51, 102, 255)` | `--o-color-primary1` / `--o-color-link1` / `--o-color-control2` | 主色、链接常规色、悬浮边框 |
| `#85A7FF` | `rgb(133, 167, 255)` | `--o-color-primary2` / `--o-color-link2` | 主色悬浮、链接悬浮 |
| `#2550DB` | `rgb(37, 80, 219)` | `--o-color-primary3` / `--o-color-link3` / `--o-color-control3` | 主色激活、链接激活、激活边框 |
| `#ADC6FF` | `rgb(173, 198, 255)` | `--o-color-primary4` / `--o-color-link4` | 主色禁用、链接禁用 |
| `#D6E3FF` | `rgb(214, 227, 255)` | `--o-color-primary1-light` | 主色浅色背景 |
| `#E6EEFF` | `rgb(230, 238, 255)` | `--o-color-primary4-light` / `--o-color-control2-light` | 主色浅色禁用、控件悬浮背景 |

### 控件色

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgba(0, 0, 0, 0.25)` | `--o-color-control1` | 默认边框 |
| `rgb(51, 102, 255)` | `--o-color-control2` | 悬浮边框（品牌蓝） |
| `rgb(37, 80, 219)` | `--o-color-control3` | 激活边框 |
| `rgba(0, 0, 0, 0.1)` | `--o-color-control4` | 禁用边框 |
| `rgb(224, 226, 230)` | `--o-color-control1-light` | 默认控件背景 |
| `rgb(230, 238, 255)` | `--o-color-control2-light` | 悬浮控件背景（品牌蓝浅色） |
| `rgb(214, 227, 255)` | `--o-color-control3-light` | 激活控件背景 |
| `rgb(237, 239, 242)` | `--o-color-control4-light` | 禁用控件背景 |
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
| `linear-gradient(90deg, rgb(7,202,255), rgb(88,130,255))` | `--o-color-main2` | 青蓝渐变 |
| `rgb(7, 202, 255)` | `--o-color-main2-start` | 渐变起点（青色） |
| `rgb(88, 130, 255)` | `--o-color-main2-end` | 渐变终点（蓝色） |

### 品牌色阶（完整）

| Hex | RGB | Token |
|-----|-----|-------|
| `#E6EEFF` | `rgb(230, 238, 255)` | `--o-brand-1` |
| `#D6E3FF` | `rgb(214, 227, 255)` | `--o-brand-2` |
| `#ADC6FF` | `rgb(173, 198, 255)` | `--o-brand-3` |
| `#85A7FF` | `rgb(133, 167, 255)` | `--o-brand-4` |
| `#5C87FF` | `rgb(92, 135, 255)` | `--o-brand-5` |
| `#3366FF` | `rgb(51, 102, 255)` | `--o-brand-6`（主色） |
| `#2550DB` | `rgb(37, 80, 219)` | `--o-brand-7` |
| `#1A3CB8` | `rgb(26, 60, 184)` | `--o-brand-8` |
| `#102B94` | `rgb(16, 43, 148)` | `--o-brand-9` |
| `#091C70` | `rgb(9, 28, 112)` | `--o-brand-10` |

---

## 反查速查表（Dark 模式）

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(51, 151, 255)` | `--o-color-primary1` / `--o-color-link1` | 主色、链接常规色 |
| `rgb(0, 88, 191)` | `--o-color-primary2` | 主色悬浮 |
| `rgb(77, 168, 255)` | `--o-color-primary3` | 主色激活 |
| `rgb(0, 62, 140)` | `--o-color-primary4` / `--o-color-link4` | 主色禁用、链接禁用 |
| `rgb(0, 44, 102)` | `--o-color-primary1-light` | 主色浅色背景 |
| `rgb(0, 37, 89)` | `--o-color-primary4-light` | 主色浅色禁用 |
| `rgb(23, 25, 28)` | `--o-color-fill1` | 页面背景 |
| `rgb(33, 35, 39)` | `--o-color-fill2` | 卡片背景 |
| `rgb(40, 42, 47)` | `--o-color-fill3` | 嵌套卡片背景 |
