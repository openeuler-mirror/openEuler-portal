#!/usr/bin/env python3
"""
设计稿值到 Token 转换工具

使用方法：
1. 从设计稿中提取颜色值（如 #FF0000, rgb(255,0,0) 等）
2. 从设计稿中提取尺寸值（如 16px, 24px 等）
3. 运行此脚本进行转换
"""
import re
import sys
from typing import Optional, Tuple

# Token 映射表（由脚本自动生成）
TOKEN_MAPPING = {
    # 颜色映射 (RGB -> Token，优先语义化 token)
    "color_mapping": {
        (0, 0, 0): "color-black",
        (0, 18, 85): "kleinblue-10",
        (0, 24, 126): "kleinblue-9",
        (0, 31, 126): "kleinblue-8",
        (0, 39, 147): "color-primary3",
        (0, 43, 97): "blue-10",
        (0, 47, 76): "light-blue-10",
        (0, 47, 167): "color-primary1",
        (0, 52, 60): "cyan-10",
        (0, 60, 48): "teal-10",
        (0, 61, 133): "blue-9",
        (0, 72, 115): "light-blue-9",
        (0, 77, 42): "color-success4-light",
        (0, 79, 90): "cyan-9",
        (0, 80, 169): "blue-8",
        (0, 90, 71): "teal-9",
        (0, 99, 153): "light-blue-8",
        (0, 100, 204): "blue-7",
        (0, 107, 119): "cyan-8",
        (0, 119, 93): "teal-8",
        (0, 122, 240): "blue-6",
        (0, 127, 191): "light-blue-7",
        (0, 137, 149): "cyan-7",
        (0, 149, 113): "teal-7",
        (0, 156, 229): "light-blue-6",
        (0, 167, 179): "cyan-6",
        (0, 179, 133): "teal-6",
        (2, 102, 53): "color-success1-light",
        (4, 127, 63): "green-8",
        (5, 19, 101): "indigo-10",
        (7, 152, 72): "color-success3",
        (10, 28, 118): "indigo-9",
        (10, 127, 66): "color-success4",
        (11, 177, 81): "color-success1",
        (14, 26, 69): "color-primary4-light",
        (16, 38, 138): "indigo-8",
        (18, 34, 87): "color-primary1-light",
        (21, 21, 23): "mixedgray-13",
        (22, 152, 80): "color-success2",
        (23, 50, 159): "indigo-7",
        (26, 26, 28): "color-fill1",
        (29, 51, 119): "color-primary2-light",
        (31, 63, 179): "indigo-6",
        (33, 60, 7): "light-green-10",
        (34, 0, 109): "violet-10",
        (36, 36, 39): "color-fill2",
        (37, 37, 41): "mixedgray-12",
        (37, 81, 185): "kleinblue-5",
        (39, 2, 130): "violet-9",
        (39, 186, 194): "cyan-5",
        (39, 194, 152): "teal-5",
        (42, 72, 158): "color-primary4",
        (43, 43, 47): "color-fill3",
        (45, 193, 101): "green-5",
        (46, 7, 150): "violet-8",
        (47, 178, 234): "light-blue-5",
        (49, 151, 243): "blue-5",
        (51, 67, 0): "lime-10",
        (51, 90, 11): "light-green-9",
        (51, 193, 104): "color-success1",
        (53, 13, 171): "violet-7",
        (53, 53, 57): "color-control3-light",
        (57, 97, 202): "color-primary2",
        (60, 0, 97): "purple-10",
        (61, 20, 191): "violet-6",
        (61, 61, 66): "mixedgray-11",
        (63, 63, 67): "color-control1-light",
        (66, 96, 194): "indigo-5",
        (70, 119, 16): "light-green-8",
        (73, 122, 248): "color-primary1",
        (77, 0, 17): "color-danger4-light",
        (77, 0, 118): "purple-9",
        (77, 24, 0): "color-warning4-light",
        (77, 30, 0): "amber-10",
        (78, 101, 0): "lime-9",
        (80, 47, 0): "yellow-10",
        (81, 0, 51): "pink-10",
        (81, 119, 202): "color-primary2",
        (84, 205, 209): "cyan-4",
        (84, 208, 127): "color-success2",
        (84, 209, 173): "teal-4",
        (85, 85, 92): "mixedgray-10",
        (90, 58, 204): "violet-5",
        (90, 208, 131): "color-success3",
        (91, 149, 21): "light-green-7",
        (95, 0, 138): "purple-8",
        (96, 198, 239): "light-blue-4",
        (98, 178, 246): "blue-4",
        (106, 131, 209): "indigo-4",
        (107, 134, 0): "lime-8",
        (110, 148, 243): "color-primary3",
        (111, 111, 117): "mixedgray-9",
        (112, 179, 27): "light-green-6",
        (114, 0, 159): "purple-7",
        (115, 0, 21): "red-9",
        (115, 3, 24): "color-danger1-light",
        (116, 51, 0): "amber-9",
        (117, 0, 70): "pink-9",
        (120, 42, 1): "color-warning1-light",
        (120, 76, 0): "yellow-9",
        (124, 100, 217): "violet-4",
        (128, 224, 158): "color-success4",
        (132, 161, 220): "color-primary4",
        (135, 2, 179): "purple-6",
        (135, 223, 225): "cyan-3",
        (135, 225, 197): "teal-3",
        (136, 168, 0): "lime-7",
        (138, 194, 62): "light-green-5",
        (147, 218, 245): "light-blue-3",
        (149, 149, 157): "mixedgray-8",
        (149, 205, 249): "blue-3",
        (150, 170, 225): "indigo-3",
        (153, 0, 23): "red-8",
        (153, 0, 86): "pink-8",
        (153, 9, 31): "color-danger4",
        (154, 76, 0): "amber-8",
        (160, 109, 0): "yellow-8",
        (161, 41, 194): "purple-5",
        (163, 64, 2): "orange-8",
        (163, 68, 8): "color-warning4",
        (163, 147, 229): "violet-3",
        (166, 209, 103): "light-green-4",
        (167, 201, 0): "lime-6",
        (177, 212, 42): "lime-5",
        (177, 239, 195): "color-success1-light",
        (186, 186, 191): "mixedgray-7",
        (187, 85, 209): "purple-4",
        (188, 0, 100): "pink-7",
        (191, 223, 89): "lime-4",
        (192, 0, 22): "color-danger3",
        (192, 17, 37): "color-danger2",
        (192, 240, 224): "teal-2",
        (192, 240, 240): "cyan-2",
        (193, 105, 0): "amber-7",
        (195, 225, 148): "light-green-3",
        (200, 147, 0): "yellow-7",
        (200, 211, 240): "indigo-2",
        (200, 237, 250): "light-blue-2",
        (202, 231, 252): "blue-2",
        (206, 199, 242): "violet-2",
        (206, 219, 245): "color-primary1-light",
        (207, 88, 3): "color-warning3",
        (207, 97, 19): "color-warning2",
        (208, 233, 140): "lime-3",
        (211, 136, 225): "purple-3",
        (212, 212, 217): "mixedgray-6",
        (222, 222, 227): "color-control1-light",
        (224, 0, 112): "pink-6",
        (225, 240, 199): "light-green-2",
        (228, 247, 241): "teal-1",
        (228, 247, 247): "cyan-1",
        (229, 244, 195): "lime-2",
        (230, 0, 18): "color-danger1",
        (230, 46, 132): "pink-5",
        (231, 137, 0): "amber-6",
        (232, 232, 235): "mixedgray-4",
        (232, 236, 247): "indigo-1",
        (232, 247, 252): "light-blue-1",
        (232, 255, 238): "color-success4-light",
        (233, 245, 254): "blue-1",
        (234, 192, 240): "purple-2",
        (234, 231, 249): "violet-1",
        (235, 35, 45): "color-danger1",
        (235, 43, 52): "red-5",
        (235, 241, 250): "color-primary4-light",
        (236, 95, 156): "pink-4",
        (236, 165, 47): "amber-5",
        (237, 237, 240): "color-fill3",
        (240, 82, 85): "color-danger3",
        (240, 87, 90): "color-danger2",
        (240, 188, 6): "yellow-6",
        (241, 191, 96): "amber-4",
        (242, 247, 231): "light-green-1",
        (243, 146, 184): "pink-3",
        (243, 207, 49): "yellow-5",
        (243, 243, 245): "color-fill1",
        (243, 250, 230): "lime-1",
        (245, 136, 134): "color-danger4",
        (245, 215, 147): "amber-3",
        (245, 228, 247): "purple-1",
        (246, 224, 98): "yellow-4",
        (249, 199, 217): "pink-2",
        (249, 237, 149): "yellow-3",
        (250, 115, 5): "color-warning1",
        (250, 185, 182): "color-danger1-light",
        (250, 237, 200): "amber-2",
        (251, 143, 43): "color-warning1",
        (251, 147, 50): "orange-5",
        (252, 174, 91): "color-warning3",
        (252, 176, 95): "color-warning2",
        (252, 232, 239): "pink-1",
        (252, 248, 202): "yellow-2",
        (253, 202, 140): "color-warning4",
        (253, 247, 232): "amber-1",
        (254, 226, 186): "color-warning1-light",
        (254, 252, 233): "yellow-1",
        (255, 234, 232): "color-danger4-light",
        (255, 246, 232): "color-warning4-light",
        (255, 255, 255): "color-white",
    },

    # 语义化 token 列表
    "semantic_tokens": [
        "color-black",
        "color-control-light",
        "color-control1",
        "color-control1-light",
        "color-control2",
        "color-control2-light",
        "color-control3",
        "color-control3-light",
        "color-control4",
        "color-control4-light",
        "color-control5-light",
        "color-danger1",
        "color-danger1-light",
        "color-danger2",
        "color-danger2-light",
        "color-danger3",
        "color-danger3-light",
        "color-danger4",
        "color-danger4-light",
        "color-fill1",
        "color-fill2",
        "color-fill3",
        "color-info1",
        "color-info1-inverse",
        "color-info2",
        "color-info2-inverse",
        "color-info3",
        "color-info3-inverse",
        "color-info4",
        "color-info4-inverse",
        "color-link1",
        "color-link2",
        "color-link3",
        "color-link4",
        "color-mask1",
        "color-mask2",
        "color-primary1",
        "color-primary1-light",
        "color-primary2",
        "color-primary2-light",
        "color-primary3",
        "color-primary3-light",
        "color-primary4",
        "color-primary4-light",
        "color-success1",
        "color-success1-light",
        "color-success2",
        "color-success2-light",
        "color-success3",
        "color-success3-light",
        "color-success4",
        "color-success4-light",
        "color-warning1",
        "color-warning1-light",
        "color-warning2",
        "color-warning2-light",
        "color-warning3",
        "color-warning3-light",
        "color-warning4",
        "color-warning4-light",
        "color-white",
    ],

    # 值映射 (Value -> Token)
    "value_mapping": {
        "0 2px 24px rgba(var(--o-grey-13), 0.15)": "shadow-2",
        "0 3px 8px rgba(var(--o-grey-13), 0.08)": "shadow-1",
        "0 8px 40px rgba(var(--o-grey-13), 0.1)": "shadow-3",
        "0 2px 24px rgba(var(--o-grey-14), 0.15)": "shadow-2",
        "0 3px 8px rgba(var(--o-grey-14), 0.08)": "shadow-1",
        "0 8px 40px rgba(var(--o-grey-14), 0.1)": "shadow-3",
        "1000ms": "duration-xl",
        "12px": ['gap-3', 'font_size-tip2', 'radius-m', 'radius_control-m'],  # 多个匹配
        "14px": ['control_size-2xs', 'font_size-tip1'],  # 多个匹配
        "16px": ['gap-4', 'control_size-xs', 'icon_size-xs', 'icon_size_control-xs', 'font_size-text1', 'radius-l', 'radius_control-l'],  # 多个匹配
        "18px": ['font_size-text2', 'line_height-tip2'],  # 多个匹配
        "200ms": "duration-s",
        "20px": ['icon_size-s', 'icon_size_control-s', 'font_size-h4'],  # 多个匹配
        "22px": ['font_size-h3', 'line_height-tip1'],  # 多个匹配
        "24px": ['gap-5', 'control_size-s', 'icon_size-m', 'icon_size_control-m', 'font_size-h2', 'line_height-text1', 'radius-xl'],  # 多个匹配
        "250ms": "duration-m1",
        "26px": "line_height-text2",
        "28px": "line_height-h4",
        "300ms": "duration-m2",
        "30px": "line_height-h3",
        "32px": ['gap-6', 'control_size-m', 'icon_size-l', 'icon_size_control-l', 'font_size-h1', 'line_height-h2'],  # 多个匹配
        "400ms": "duration-m3",
        "40px": ['gap-7', 'control_size-l', 'icon_size-xl', 'icon_size_control-xl', 'font_size-display3'],  # 多个匹配
        "44px": "line_height-h1",
        "48px": ['gap-8', 'control_size-xl', 'icon_size-2xl', 'font_size-display2'],  # 多个匹配
        "4px": ['gap-1', 'radius-xs', 'radius_control-xs'],  # 多个匹配
        "500ms": "duration-l",
        "56px": ['control_size-2xl', 'icon_size-3xl', 'font_size-display1', 'line_height-display3'],  # 多个匹配
        "64px": ['gap-9', 'icon_size-4xl', 'line_height-display2'],  # 多个匹配
        "72px": "gap-10",
        "80px": "line_height-display1",
        "8px": ['gap-2', 'radius-s', 'radius_control-s'],  # 多个匹配
        "cubic-bezier(0, 0, 0, 1)": "easing-standard-in",
        "cubic-bezier(0, 0, 1, 1)": "easing-linear",
        "cubic-bezier(0.05, 0.7, 0.1, 1)": "easing-emphasized-out",
        "cubic-bezier(0.2, 0, 0, 1)": ['easing-standard', 'easing-emphasized'],  # 多个匹配
        "cubic-bezier(0.3, 0, 0.8, 0.15)": "easing-emphasized-in",
        "cubic-bezier(0.3, 0, 1, 1)": "easing-standard-out",
        "rgb(var(--o-black))": "color-black",
        "rgb(var(--o-green-1))": "color-success4-light",
        "rgb(var(--o-green-2))": "color-success1-light",
        "rgb(var(--o-green-3))": ['color-success4', 'color-success2-light'],  # 多个匹配
        "rgb(var(--o-green-4))": ['color-success2', 'color-success3-light'],  # 多个匹配
        "rgb(var(--o-green-6))": "color-success1",
        "rgb(var(--o-green-7))": "color-success3",
        "rgb(var(--o-kleinblue-1))": "color-primary4-light",
        "rgb(var(--o-kleinblue-2))": "color-primary1-light",
        "rgb(var(--o-kleinblue-3))": ['color-primary4', 'color-primary2-light'],  # 多个匹配
        "rgb(var(--o-kleinblue-4))": ['color-primary2', 'color-primary3-light'],  # 多个匹配
        "rgb(var(--o-kleinblue-6))": "color-primary1",
        "rgb(var(--o-kleinblue-7))": "color-primary3",
        "rgb(var(--o-mixedgray-1))": "color-fill2",
        "rgb(var(--o-mixedgray-1), 1)": "color-control5-light",
        "rgb(var(--o-mixedgray-1), 1.0)": "color-control-light",
        "rgb(var(--o-mixedgray-2))": "color-fill1",
        "rgb(var(--o-mixedgray-3))": "color-fill3",
        "rgb(var(--o-mixedgray-3), 1)": "color-control4-light",
        "rgb(var(--o-mixedgray-5), 1.0)": "color-control1-light",
        "rgb(var(--o-orange-1))": "color-warning4-light",
        "rgb(var(--o-orange-2))": "color-warning1-light",
        "rgb(var(--o-orange-3))": ['color-warning4', 'color-warning2-light'],  # 多个匹配
        "rgb(var(--o-orange-4))": ['color-warning2', 'color-warning3-light'],  # 多个匹配
        "rgb(var(--o-orange-6))": "color-warning1",
        "rgb(var(--o-orange-7))": "color-warning3",
        "rgb(var(--o-red-1))": "color-danger4-light",
        "rgb(var(--o-red-2))": "color-danger1-light",
        "rgb(var(--o-red-3))": ['color-danger4', 'color-danger2-light'],  # 多个匹配
        "rgb(var(--o-red-4))": ['color-danger2', 'color-danger3-light'],  # 多个匹配
        "rgb(var(--o-red-6))": "color-danger1",
        "rgb(var(--o-red-7))": "color-danger3",
        "rgb(var(--o-white))": "color-white",
        "rgba(var(--o-kleinblue-1), 1)": "color-control2-light",
        "rgba(var(--o-kleinblue-2), 1)": "color-control3-light",
        "rgba(var(--o-kleinblue-3))": "color-link4",
        "rgba(var(--o-kleinblue-4))": "color-link2",
        "rgba(var(--o-kleinblue-6))": "color-link1",
        "rgba(var(--o-kleinblue-7))": "color-link3",
        "rgba(var(--o-mixedgray-1), 0.2)": "color-mask2",
        "rgba(var(--o-mixedgray-1), 0.4)": "color-info4-inverse",
        "rgba(var(--o-mixedgray-1), 0.6)": "color-info3-inverse",
        "rgba(var(--o-mixedgray-1), 0.8)": "color-info2-inverse",
        "rgba(var(--o-mixedgray-1), 1.0)": "color-info1-inverse",
        "rgba(var(--o-mixedgray-14), 0.1)": "color-control4",
        "rgba(var(--o-mixedgray-14), 0.25)": "color-control1",
        "rgba(var(--o-mixedgray-14), 0.4)": ['color-info4', 'color-mask1'],  # 多个匹配
        "rgba(var(--o-mixedgray-14), 0.6)": ['color-control2', 'color-info3'],  # 多个匹配
        "rgba(var(--o-mixedgray-14), 0.8)": ['color-control3', 'color-info2'],  # 多个匹配
        "rgba(var(--o-mixedgray-14), 1.0)": "color-info1",
    },
}


def hex_to_rgb(hex_color: str) -> Optional[Tuple[int, int, int]]:
    """将十六进制颜色转换为 RGB"""
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 6:
        try:
            return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        except:
            pass
    return None

def rgb_to_token(rgb: Tuple[int, int, int], tolerance: int = 0) -> Optional[str]:
    """将 RGB 值转换为 token 名称"""
    color_mapping = TOKEN_MAPPING["color_mapping"]
    
    # 精确匹配
    if rgb in color_mapping:
        return color_mapping[rgb]
    
    # 容差匹配（如果允许）
    if tolerance > 0:
        for mapped_rgb, token_name in color_mapping.items():
            if all(abs(a - b) <= tolerance for a, b in zip(rgb, mapped_rgb)):
                return token_name
    
    return None

def value_to_token(value: str) -> Optional[str]:
    """将值转换为 token 名称"""
    value_mapping = TOKEN_MAPPING["value_mapping"]
    value = value.strip()
    
    # 精确匹配
    if value in value_mapping:
        result = value_mapping[value]
        if isinstance(result, list):
            return result[0]  # 返回第一个匹配
        return result
    
    return None

def convert_color(color_value: str) -> Optional[str]:
    """转换颜色值为 token，优先使用语义化 token"""
    color_value = color_value.strip()
    
    # 处理十六进制
    if color_value.startswith('#'):
        rgb = hex_to_rgb(color_value)
        if rgb:
            token = rgb_to_token(rgb)
            if token:
                return f"var(--o-{token})"
    
    # 处理 rgb/rgba
    rgb_match = re.match(r'rgba?\((\d+),\s*(\d+),\s*(\d+)', color_value)
    if rgb_match:
        rgb = tuple(map(int, rgb_match.groups()))
        token = rgb_to_token(rgb)
        if token:
            return f"var(--o-{token})"
    
    return None

def convert_value(value: str) -> Optional[str]:
    """转换值为 token"""
    token = value_to_token(value)
    if token:
        return f"var(--o-{token})"
    return None

def convert_design_value(value: str) -> Optional[str]:
    """智能转换设计稿中的值"""
    # 尝试作为颜色转换
    if '#' in value or 'rgb' in value.lower():
        result = convert_color(value)
        if result:
            return result
    
    # 尝试作为普通值转换
    result = convert_value(value)
    if result:
        return result
    
    return None

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python convert_to_token.py <value>")
        print("Examples:")
        print("  python convert_to_token.py '#FF0000'")
        print("  python convert_to_token.py 'rgb(255, 0, 0)'")
        print("  python convert_to_token.py '16px'")
        sys.exit(1)
    
    value = sys.argv[1]
    result = convert_design_value(value)
    if result:
        print(result)
    else:
        print(f"No token found for: {value}", file=sys.stderr)
        sys.exit(1)
