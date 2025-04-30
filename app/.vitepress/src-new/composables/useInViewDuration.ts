import { MaybeComputedElementRef, useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

/**
 * 记录元素在页面可见状态的停留时间
 * @param el dom元素
 * @param cb 回调
 * @param threshold 决定元素可见和离开页面的阈值
 */
const useInViewDuration = (
  el: MaybeComputedElementRef,
  cb: (duration: number) => void,
  threshold: { enter: number; leave: number } = { enter: 1, leave: 0 },
) => {
  const isInView = ref(false);
  let enterTime = 0;
  const res = useIntersectionObserver(
    el,
    ([ent]) => {
      if (
        ent.intersectionRatio >= threshold.enter &&
        ent.isIntersecting &&
        !isInView.value
      ) {
        isInView.value = true;
        enterTime = Date.now();
      } else if (
        ent.intersectionRatio <= threshold.leave &&
        !ent.isIntersecting &&
        isInView.value
      ) {
        isInView.value = false;
        cb(Date.now() - enterTime);
      }
    },
    { threshold: [threshold.leave, threshold.enter] }
  );
  return {
    isInView,
    ...res,
  };
};

export default useInViewDuration;
