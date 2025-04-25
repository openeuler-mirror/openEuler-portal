import { oaReport } from '@/shared/analytics';
import { type Directive } from 'vue';

interface AnalyzeDataInternal {
  event?: string;
  service?: string;
  properties?: Record<string, any>;
}

type AnalyzeData =
  | AnalyzeDataInternal
  | AnalyzeDataInternal['properties']
  | undefined;

const fromBubble = {};

/**
 * 判断变量类型是否为对象
 */
const isObj = (val: any): val is Record<string, any> =>
  typeof val === 'object' && val !== null;

/**
 * 判断事件是否来自子元素自定义指令的冒泡
 */
const isFromBubble = (ev: Event): ev is CustomEvent =>
  ev instanceof CustomEvent && fromBubble === ev.detail?.fromBubble;

/**
 * 将元素与所监听的事件和指令传值绑定
 *
 * 因为如果指令传值是或者依赖了响应式变量，变量更新时binding.value不会随着更新，下次触发监听如果直接获取binding.value取到的是旧值，所以需要一个映射关系，在响应式依赖变更时再手动更新
 *
 * 结构：dom元素 => { 监听的dom事件: 指令传来的值 }
 */
const bindingValueMap = new WeakMap<HTMLElement, Record<string, any>>();

/**
 * 获取指令传值，从map中获取，而不是直接取binding.value
 */
const getDirectiveBindingValueData = (el: HTMLElement, event: string) => {
  const bindingVal = bindingValueMap.get(el)?.[event];
  if (!bindingVal) {
    return;
  }
  if (typeof bindingVal === 'function') {
    return bindingVal();
  }
  return bindingVal;
};

const dispatchBubbleCustomEvent = (
  el: HTMLElement,
  event: string,
  data: any
) => {
  el.dispatchEvent(
    new CustomEvent(event, {
      detail: {
        data,
        fromBubble,
      },
      bubbles: true,
    })
  );
};

export const vAnalytics: Directive<
  HTMLElement,
  AnalyzeData | ((ev: Event) => AnalyzeData) | undefined
> = {
  mounted(el, binding) {
    const originalEvent = binding.arg || 'click';

    const isBubble = binding.modifiers.bubble;
    const listeningEvent =
      isBubble || binding.modifiers.catchBubble
        ? '_v-analytics_' + originalEvent
        : originalEvent;

    if (isBubble) {
      // 如果指令被设置为冒泡类型，且在当前元素上触发了事件，则拦截原始的dom事件，分发一个自定义事件
      // 事件名改为非html标准事件，避免影响冒泡路径上其他对标准事件的监听
      el.addEventListener(originalEvent, (ev) => {
        ev.stopPropagation();
        const currentData = getDirectiveBindingValueData(el, listeningEvent);
        if (!currentData) return;
        dispatchBubbleCustomEvent(el, listeningEvent, currentData);
      });
    }

    el.addEventListener(listeningEvent, (ev: Event) => {
      // 获取指令传值
      let currentData = getDirectiveBindingValueData(el, listeningEvent);
      if (!currentData) return;

      if (isBubble && ev.currentTarget !== ev.target) {
        // 需要向上冒泡
        ev.stopPropagation();
        // 如果触发当前监听的事件是从子元素的指令冒泡上来的，就将携带上来的数据合并到当前指令传进来的对象里
        if (
          isFromBubble(ev) &&
          isObj(ev.detail.data) &&
          ev.type === listeningEvent
        ) {
          currentData = { ...currentData, ...ev.detail.data };
        }
        // 从父元素上触发一个自定义事件
        const parentEl = (ev.currentTarget as HTMLElement).parentElement;
        parentEl && dispatchBubbleCustomEvent(el, listeningEvent, currentData);
      } else if (binding.modifiers.catchBubble) {
        // 需要捕获从子元素冒泡上来的事件
        if (
          isFromBubble(ev) &&
          isObj(ev.detail.data) &&
          ev.type === listeningEvent
        ) {
          // 合并从子元素冒泡上来的数据，并调用上报
          currentData = {
            ...currentData,
            properties: {
              ...(currentData as AnalyzeDataInternal).properties,
              ...ev.detail.data,
            },
          };
          oaReport(
            currentData.event || originalEvent,
            currentData.properties,
            currentData.service
          );
        }
        // 普通地触发上报
      } else {
        if (isFromBubble(ev)) return;
        oaReport(
          currentData.event || originalEvent,
          currentData.properties,
          currentData.service
        );
      }
    });
    // 以dom元素为键，{ event: binding.value }为值存入weakMap中
    const mapItem = bindingValueMap.get(el);
    if (mapItem) {
      mapItem[listeningEvent] = binding.value;
    } else {
      bindingValueMap.set(el, { [listeningEvent]: binding.value });
    }
  },
  updated(el, binding) {
    // 自定义指令
    const event = binding.arg || 'click';
    const listeningEvent =
      binding.modifiers.bubble || binding.modifiers.catchBubble
        ? '_v-analytics_' + event
        : event;
    // 更新元素上特定事件的指令传值
    const mapItem = bindingValueMap.get(el);
    if (mapItem) {
      mapItem[listeningEvent] = binding.value;
    } else {
      bindingValueMap.set(el, { [listeningEvent]: binding.value });
    }
  },
};
