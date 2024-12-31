import type { OScroller } from '@opensig/opendesign';
import { type Ref, onMounted, nextTick } from 'vue';

const useScrollBottom = (scrollerRef: Ref<InstanceType<typeof OScroller>>, callback: () => void) => {
  const onScroll = (event: Event) => {
    const el = event.target as HTMLDivElement;
    if (el.scrollHeight - Math.round(el.scrollTop) <= el.clientHeight) {
      callback();
    }
  };

  onMounted(() => {
    nextTick(() => {
      const container = (scrollerRef.value?.$el as HTMLDivElement).querySelector('.o-scroller-container');
      container && container.addEventListener('scroll', onScroll);
    });
  });
};
export default useScrollBottom;
