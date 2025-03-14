export default {
  plugins: ['stylelint-scss', 'stylelint-order'],
  extends: [
    'stylelint-config-standard', // 配置 stylelint 拓展插件
    'stylelint-config-standard-scss', // 配置 stylelint scss 插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
  ],
  rules: {
    'at-rule-no-unknown': null, // 关闭默认的未知的@规则检查
    'scss/at-rule-no-unknown': true, // 使用scss的@规则检查
    'value-keyword-case': null, // 使用 v-bind，不报错
    'selector-pseudo-class-no-unknown': null, // 关闭不允许未知的选择器
    'no-duplicate-selectors': null, // 关闭重复声明检查
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-class-pattern': null, // 关闭 class 命名规范校验
    'no-empty-source': null, // 关闭空内容校验
    'no-descending-specificity': null, // 关闭较低特异性的选择器覆盖较高特异性的选择器检查
    'custom-property-pattern': null, // 关闭自定义属性命名检查
    'color-function-notation': null, // 禁用函数式颜色表示法的检查
    'color-hex-length': null, // 关闭十六进制颜色长度的检查
    'color-no-invalid-hex': null, // 关闭无效十六进制颜色的检查
    'alpha-value-notation': null, // 关闭将 opacity 或 rgba 中的 alpha 值转换为百分比形式
    'selector-pseudo-element-no-unknown': null, // 关闭未知的伪元素选择器的检查
    'function-linear-gradient-no-nonstandard-direction': null, // 关闭linear-gradient中调用不符合标准语法的无效方向值的检查
    // @规则前换行
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: [
          'after-comment', // 忽略注释后换行
          'first-nested', // 忽略第一个嵌套@
          'inside-block', // 忽略行内@
          'blockless-after-same-name-blockless', // 忽略另一个同名无块 at 规则后面的无块 at 规则。
          'blockless-after-blockless', // 忽略无块 at 规则后面的无块 at 规则。
        ],
      },
    ],
    // 声明排序
    'order/order': [
      'custom-properties',
      'dollar-variables',
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'text-truncate',
      },
      'declarations',
      'at-rules',
      'rules',
    ],
  },
};
