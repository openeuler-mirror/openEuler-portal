> ← [Token 索引](../SKILL.md) · [README](../../../README.md)

# openEuler 主题 Token 色值参考（e）

主题标识：`e`
品牌色：**Klein Blue（克莱因蓝）**
风格特点：圆角极小（接近直角），主色/链接/控件悬浮均使用品牌蓝色

---

## 品牌色板（Brand Palette）

openEuler 拥有完整 brand 色阶（1-10）。Mindspore、openGauss、openUBMC 也拥有完整色阶，而 Ascend 和 Kunpeng 仅定义 brand-6。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-brand-1` | `rgb(235, 241, 250)` | `rgb(14, 26, 69)` |
| `--o-brand-2` | `rgb(206, 219, 245)` | `rgb(18, 34, 87)` |
| `--o-brand-3` | `rgb(132, 161, 220)` | `rgb(29, 51, 120)` |
| `--o-brand-4` | `rgb(81, 119, 202)` | `rgb(42, 72, 158)` |
| `--o-brand-5` | `rgb(37, 81, 185)` | `rgb(57, 97, 202)` |
| `--o-brand-6` | `rgb(0, 47, 167)` ← 主色 | `rgb(73, 122, 248)` |
| `--o-brand-7` | `rgb(0, 39, 147)` | `rgb(110, 148, 243)` |
| `--o-brand-8` | `rgb(0, 31, 126)` | `rgb(140, 171, 234)` |
| `--o-brand-9` | `rgb(0, 24, 106)` | `rgb(176, 199, 241)` |
| `--o-brand-10` | `rgb(0, 18, 85)` | `rgb(215, 227, 248)` |

---

## 灰色板（Grey Palette）

openEuler 灰色为中性灰（无色相倾向）。

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

## 主色 Token（Primary）— 使用品牌蓝

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-primary1` | `rgb(0, 47, 167)` | `rgb(73, 122, 248)` |
| `--o-color-primary2` | `rgb(81, 119, 202)` | `rgb(42, 72, 158)` |
| `--o-color-primary3` | `rgb(0, 39, 147)` | `rgb(29, 51, 120)` |
| `--o-color-primary4` | `rgb(132, 161, 220)` | `rgb(18, 34, 87)` |
| `--o-color-primary1-light` | `rgb(206, 219, 245)` | `rgb(18, 34, 87)` |
| `--o-color-primary2-light` | `rgb(132, 161, 220)` | `rgb(29, 51, 120)` |
| `--o-color-primary3-light` | `rgb(81, 119, 202)` | `rgb(42, 72, 158)` |
| `--o-color-primary4-light` | `rgb(235, 241, 250)` | `rgb(14, 26, 69)` |

---

## 品牌主色 Token

| Token | 说明 | light 值 | dark 值 |
|-------|------|---------|--------|
| `--o-color-main1` | 品牌主色（实色） | `rgb(0, 47, 167)` | `rgb(73, 122, 248)` |
| `--o-color-main2` | 品牌渐变色（openEuler 无渐变，start=end） | `linear-gradient(90deg, rgb(0,47,167), rgb(0,47,167))` | — |

---

## 链接色 Token（Link）— 使用品牌蓝

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-link1` | `rgb(0, 47, 167)` | `rgb(73, 122, 248)` |
| `--o-color-link2` | `rgb(81, 119, 202)` | — |
| `--o-color-link3` | `rgb(0, 39, 147)` | — |
| `--o-color-link4` | `rgb(132, 161, 220)` | — |

---

## 控件色 Token（Control）— 悬浮使用品牌蓝

| Token | 说明 | light 值 |
|-------|------|---------|
| `--o-color-control1` | 默认边框（25% 不透明） | `rgba(0, 0, 0, 0.25)` |
| `--o-color-control2` | **悬浮边框（品牌蓝）** | `rgb(0, 47, 167)` |
| `--o-color-control3` | 激活边框 | `rgb(0, 39, 147)` |
| `--o-color-control4` | 禁用边框（10% 不透明） | `rgba(0, 0, 0, 0.1)` |
| `--o-color-control1-light` | 默认背景 | `rgb(222, 222, 227)` |
| `--o-color-control2-light` | **悬浮背景（品牌蓝浅色）** | `rgb(235, 241, 250)` |
| `--o-color-control3-light` | 激活背景 | `rgb(206, 219, 245)` |
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

## 圆角 Token（Radius）— 极扁平风格

openEuler 主题圆角非常小，接近直角风格。

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

## 主题特征总结

- **品牌色**：Klein Blue（克莱因蓝）`#002FA7`，控件悬浮和链接均使用品牌色
- **Primary = Brand**：主操作按钮直接使用品牌蓝（区别于 Ascend/Kunpeng）
- **圆角**：全部扁平（4px/0px），适合科技/严谨风格
- **渐变**：不使用渐变（`--o-color-main2` 无实质渐变）
- **灰色**：中性灰，无色相偏移

---

## 反查速查表（Light 模式）

设计稿中遇到以下写死色值时，替换为对应 Token。

### 品牌色 / Primary / 链接色

| Hex | RGB | Token | 用途说明 |
|-----|-----|-------|---------|
| `#002FA7` | `rgb(0, 47, 167)` | `--o-color-primary1` / `--o-color-link1` / `--o-color-control2` | 主色、链接常规色、悬浮边框 |
| `#5177CA` | `rgb(81, 119, 202)` | `--o-color-primary2` / `--o-color-link2` | 主色悬浮、链接悬浮 |
| `#002793` | `rgb(0, 39, 147)` | `--o-color-primary3` / `--o-color-link3` / `--o-color-control3` | 主色激活、链接激活、激活边框 |
| `#84A1DC` | `rgb(132, 161, 220)` | `--o-color-primary4` / `--o-color-link4` | 主色禁用、链接禁用 |
| `#CEDBF5` | `rgb(206, 219, 245)` | `--o-color-primary1-light` | 主色浅色背景（悬浮背景） |
| `#84A1DC` | `rgb(132, 161, 220)` | `--o-color-primary2-light` | 主色浅色悬浮背景 |
| `#5177CA` | `rgb(81, 119, 202)` | `--o-color-primary3-light` | 主色浅色激活背景 |
| `#EBF1FA` | `rgb(235, 241, 250)` | `--o-color-primary4-light` / `--o-color-control2-light` | 主色浅色禁用、控件悬浮背景 |

### 控件色

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgba(0, 0, 0, 0.25)` | `--o-color-control1` | 默认边框 |
| `rgb(0, 47, 167)` | `--o-color-control2` | 悬浮边框（品牌蓝） |
| `rgb(0, 39, 147)` | `--o-color-control3` | 激活边框 |
| `rgba(0, 0, 0, 0.1)` | `--o-color-control4` | 禁用边框 |
| `rgb(222, 222, 227)` | `--o-color-control1-light` | 默认控件背景 |
| `rgb(235, 241, 250)` | `--o-color-control2-light` | 悬浮控件背景（品牌蓝浅色） |
| `rgb(206, 219, 245)` | `--o-color-control3-light` | 激活控件背景 |
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
| `#EBF1FA` | `rgb(235, 241, 250)` | `--o-brand-1` |
| `#CEDBF5` | `rgb(206, 219, 245)` | `--o-brand-2` |
| `#84A1DC` | `rgb(132, 161, 220)` | `--o-brand-3` |
| `#5177CA` | `rgb(81, 119, 202)` | `--o-brand-4` |
| `#2551B9` | `rgb(37, 81, 185)` | `--o-brand-5` |
| `#002FA7` | `rgb(0, 47, 167)` | `--o-brand-6`（主色） |
| `#002793` | `rgb(0, 39, 147)` | `--o-brand-7` |
| `#001F7E` | `rgb(0, 31, 126)` | `--o-brand-8` |
| `#00186A` | `rgb(0, 24, 106)` | `--o-brand-9` |
| `#001255` | `rgb(0, 18, 85)` | `--o-brand-10` |

---

## 反查速查表（Dark 模式）

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(73, 122, 248)` | `--o-color-primary1` / `--o-color-link1` | 主色、链接常规色 |
| `rgb(42, 72, 158)` | `--o-color-primary2` | 主色悬浮 |
| `rgb(29, 51, 120)` | `--o-color-primary3` | 主色激活 |
| `rgb(18, 18, 20)` | `--o-color-fill1` | 页面背景 |
| `rgb(0, 0, 0)` | `--o-color-fill2` | 卡片背景 |
| `rgb(26, 26, 28)` | `--o-color-fill3` | 嵌套卡片背景 |
