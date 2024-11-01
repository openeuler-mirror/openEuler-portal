import type { ExtractPropTypes, PropType } from 'vue';

export const BadgeColorTypes = ['primary', 'success', 'warning', 'danger'] as const;
export type BadgeColorT = (typeof BadgeColorTypes)[number];

export const badgeProps = {
  /**
   * 显示值
   */
  value: {
    type: [String, Number],
    default: '',
  },
  /**
   * 最大值，超过最大值显示${max}+(仅当 value 类型为 number 时生效)
   */
  max: {
    type: Number,
    default: 99,
  },
  /**
   * 徽标位置偏移量
   */
  offset: {
    type: Array as PropType<Array<number | string>>,
    default: () => [],
  },
};

export type BadgePropsT = ExtractPropTypes<typeof badgeProps>;
