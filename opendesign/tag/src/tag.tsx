import { computed, defineComponent, toRefs } from 'vue';
import { tagProps, TagProps } from './tag-types';
import './tag.scss';

export default defineComponent({
  name: 'OTag',
  props: tagProps,
  emits: ['click'],
  setup(props: TagProps, { emit, slots }) {
    const { size, type, checked, checkable } = toRefs(props);

    const classNames = computed(() => {
      return {
        'e-tag': true,
        [`o-tag-size-${size.value}`]: true,
        [`o-tag-type-${type.value}`]: true,
        'o-tag-checked': checked.value,
        'o-tag-checkable': checkable.value,
      };
    });

    const onClick = (e: MouseEvent) => {
      emit('click', e);
    };

    return () => {
      return (
        <span class={classNames.value} onClick={onClick}>
          <span>{slots.default?.()}</span>
          {checked.value && type.value === 'primary' && (
            <span class="checked-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M27.797 10.085l-14.133 14.133c-0.125 0.126-0.296 0.197-0.473 0.197s-0.348-0.071-0.473-0.197l-7.187-7.187c-0.126-0.125-0.197-0.296-0.197-0.473s0.071-0.348 0.197-0.473l0.933-0.933c0.125-0.126 0.296-0.197 0.473-0.197s0.348 0.071 0.473 0.197l5.773 5.773 12.733-12.733c0.264-0.256 0.683-0.256 0.947 0l0.933 0.947c0.126 0.125 0.197 0.296 0.197 0.473s-0.071 0.348-0.197 0.473z"
                ></path>
              </svg>
            </span>
          )}
        </span>
      );
    };
  },
});
