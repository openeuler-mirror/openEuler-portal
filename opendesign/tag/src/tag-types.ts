import { ExtractDefaultPropTypes, PropType } from 'vue';
import { SizeType } from '../../_utils/common';

type TagType = 'outline' | 'primary' | 'secondary' | 'text';

export const tagProps = {
  size: {
    type: String as PropType<SizeType>,
    default: 'medium',
  },
  type: {
    type: String as PropType<TagType>,
    default: 'outline',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
};

export type TagProps = ExtractDefaultPropTypes<typeof tagProps>;
