> ← [Token 索引](../SKILL.md) · [README](../../../README.md)

# openUBMC 主题 Token 色值参考（u）

主题标识：`u`
品牌色：**Azure Blue（天蓝色）**（`#0071F3`）
风格特点：圆角较大（8~24px），主色/链接/控件悬浮均使用品牌蓝色，灰色为中性灰

---

## 品牌色板（Brand Palette）

openUBMC 拥有完整 brand 色阶（1-10）。

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-brand-1` | `rgb(231, 240, 253)` | `rgb(5, 18, 64)` |
| `--o-brand-2` | `rgb(190, 216, 255)` | `rgb(6, 29, 102)` |
| `--o-brand-3` | `rgb(153, 198, 250)` | `rgb(6, 55, 112)` |
| `--o-brand-4` | `rgb(69, 150, 244)` | `rgb(0, 77, 165)` |
| `--o-brand-5` | `rgb(32, 133, 248)` | `rgb(0, 96, 207)` |
| `--o-brand-6` | `rgb(0, 113, 243)` ← 主色 | `rgb(0, 113, 243)` |
| `--o-brand-7` | `rgb(0, 84, 230)` | `rgb(56, 149, 255)` |
| `--o-brand-8` | `rgb(2, 66, 165)` | `rgb(182, 211, 255)` |
| `--o-brand-9` | `rgb(2, 53, 130)` | `rgb(209, 227, 255)` |
| `--o-brand-10` | `rgb(2, 42, 106)` | `rgb(239, 244, 252)` |

> openUBMC 的 `--o-brand-6` 在 light/dark 模式下值相同（0, 113, 243），是唯一一个锚定品牌色不随模式变化的主题。

---

## 灰色板（Grey Palette）

openUBMC 灰色为中性灰（与 openEuler/Kunpeng/openGauss 相同）。

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

## 主色 Token（Primary）— 使用品牌蓝

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-primary1` | `rgb(0, 113, 243)` | `rgb(0, 113, 243)` |
| `--o-color-primary2` | `rgb(69, 150, 244)` | `rgb(0, 77, 165)` |
| `--o-color-primary3` | `rgb(0, 84, 230)` | `rgb(56, 149, 255)` |
| `--o-color-primary4` | `rgb(153, 198, 250)` | `rgb(6, 55, 112)` |
| `--o-color-primary1-light` | `rgb(190, 216, 255)` | `rgb(6, 29, 102)` |
| `--o-color-primary2-light` | `rgb(153, 198, 250)` | `rgb(6, 55, 112)` |
| `--o-color-primary3-light` | `rgb(69, 150, 244)` | `rgb(0, 77, 165)` |
| `--o-color-primary4-light` | `rgb(231, 240, 253)` | `rgb(5, 18, 64)` |

---

## 品牌主色 Token

| Token | 说明 | light 值 | dark 值 |
|-------|------|---------|--------|
| `--o-color-main1` | 品牌主色 | `rgb(0, 113, 243)` | `rgb(0, 113, 243)` |
| `--o-color-main2` | 品牌渐变色（无渐变，纯色） | `linear-gradient(90deg, rgb(0,113,243), rgb(0,113,243))` | 同 |
| `--o-color-main2-start` | 渐变起点 | `rgb(0, 113, 243)` | 同 |
| `--o-color-main2-end` | 渐变终点 | `rgb(0, 113, 243)` | 同 |

> openUBMC 与 openEuler 类似，main2 无实质渐变效果。

---

## 链接色 Token（Link）— 使用品牌蓝

| Token | light 值 | dark 值 |
|-------|---------|--------|
| `--o-color-link1` | `rgb(0, 113, 243)` | `rgb(0, 113, 243)` |
| `--o-color-link2` | `rgb(69, 150, 244)` | `rgb(0, 77, 165)` |
| `--o-color-link3` | `rgb(0, 84, 230)` | `rgb(56, 149, 255)` |
| `--o-color-link4` | `rgb(153, 198, 250)` | `rgb(6, 55, 112)` |

---

## 控件色 Token（Control）— 悬浮使用品牌蓝

| Token | 说明 | light 值 |
|-------|------|---------|
| `--o-color-control1` | 默认边框（25% 不透明） | `rgba(0, 0, 0, 0.25)` |
| `--o-color-control2` | **悬浮边框（品牌蓝）** | `rgb(0, 113, 243)` |
| `--o-color-control3` | 激活边框 | `rgb(0, 84, 230)` |
| `--o-color-control4` | 禁用边框（10% 不透明） | `rgba(0, 0, 0, 0.1)` |
| `--o-color-control1-light` | 默认背景 | `rgb(222, 222, 227)` |
| `--o-color-control2-light` | **悬浮背景（品牌蓝浅色）** | `rgb(231, 240, 253)` |
| `--o-color-control3-light` | 激活背景 | `rgb(190, 216, 255)` |
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

## 圆角 Token（Radius）— 圆润风格

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

- **品牌色**：Azure Blue `#0071F3`（天蓝色），控件悬浮和链接均使用品牌色
- **Primary = Brand**：主操作按钮直接使用品牌蓝（同 openEuler 模式）
- **brand-6 锚定**：light/dark 模式下 `--o-brand-6` 值相同（不随模式反转）
- **圆角**：递进圆角体系（4/8/12/16/24px），风格圆润
- **渐变**：无实质渐变（main2 start = end = brand-6）
- **灰色**：中性灰（同 openEuler/Kunpeng/openGauss）

---

## 反查速查表（Light 模式）

设计稿中遇到以下写死色值时，替换为对应 Token。

### 品牌色 / Primary / 链接色

| Hex | RGB | Token | 用途说明 |
|-----|-----|-------|---------|
| `#0071F3` | `rgb(0, 113, 243)` | `--o-color-primary1` / `--o-color-link1` / `--o-color-control2` | 主色、链接常规色、悬浮边框 |
| `#4596F4` | `rgb(69, 150, 244)` | `--o-color-primary2` / `--o-color-link2` | 主色悬浮、链接悬浮 |
| `#0054E6` | `rgb(0, 84, 230)` | `--o-color-primary3` / `--o-color-link3` / `--o-color-control3` | 主色激活、链接激活、激活边框 |
| `#99C6FA` | `rgb(153, 198, 250)` | `--o-color-primary4` / `--o-color-link4` | 主色禁用、链接禁用 |
| `#BED8FF` | `rgb(190, 216, 255)` | `--o-color-primary1-light` | 主色浅色背景 |
| `#E7F0FD` | `rgb(231, 240, 253)` | `--o-color-primary4-light` / `--o-color-control2-light` | 主色浅色禁用、控件悬浮背景 |

### 控件色

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgba(0, 0, 0, 0.25)` | `--o-color-control1` | 默认边框 |
| `rgb(0, 113, 243)` | `--o-color-control2` | 悬浮边框（品牌蓝） |
| `rgb(0, 84, 230)` | `--o-color-control3` | 激活边框 |
| `rgba(0, 0, 0, 0.1)` | `--o-color-control4` | 禁用边框 |
| `rgb(222, 222, 227)` | `--o-color-control1-light` | 默认控件背景 |
| `rgb(231, 240, 253)` | `--o-color-control2-light` | 悬浮控件背景（品牌蓝浅色） |
| `rgb(190, 216, 255)` | `--o-color-control3-light` | 激活控件背景 |
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
| `#E7F0FD` | `rgb(231, 240, 253)` | `--o-brand-1` |
| `#BED8FF` | `rgb(190, 216, 255)` | `--o-brand-2` |
| `#99C6FA` | `rgb(153, 198, 250)` | `--o-brand-3` |
| `#4596F4` | `rgb(69, 150, 244)` | `--o-brand-4` |
| `#2085F8` | `rgb(32, 133, 248)` | `--o-brand-5` |
| `#0071F3` | `rgb(0, 113, 243)` | `--o-brand-6`（主色） |
| `#0054E6` | `rgb(0, 84, 230)` | `--o-brand-7` |
| `#0242A5` | `rgb(2, 66, 165)` | `--o-brand-8` |
| `#023582` | `rgb(2, 53, 130)` | `--o-brand-9` |
| `#022A6A` | `rgb(2, 42, 106)` | `--o-brand-10` |

---

## 反查速查表（Dark 模式）

| RGB | Token | 用途说明 |
|-----|-------|---------|
| `rgb(0, 113, 243)` | `--o-color-primary1` / `--o-color-link1` | 主色、链接常规色 |
| `rgb(0, 77, 165)` | `--o-color-primary2` | 主色悬浮 |
| `rgb(56, 149, 255)` | `--o-color-primary3` | 主色激活 |
| `rgb(26, 26, 28)` | `--o-color-fill1` | 页面背景 |
| `rgb(36, 36, 39)` | `--o-color-fill2` | 卡片背景 |
| `rgb(43, 43, 47)` | `--o-color-fill3` | 嵌套卡片背景 |
