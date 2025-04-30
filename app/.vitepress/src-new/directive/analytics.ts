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
const getDirectiveBindingValueData = (
  el: HTMLElement,
  event: string,
  ev: Event
) => {
  const bindingVal = bindingValueMap.get(el)?.[event];
  if (!bindingVal) {
    return;
  }
  if (typeof bindingVal === 'function') {
    return bindingVal(ev);
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
      detail: { data, fromBubble },
      bubbles: true,
    })
  );
};

const stdEventSet = new WeakSet<Event>();

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

    if (isBubble && !binding.modifiers.noTrigger) {
      // 如果指令被设置为冒泡类型，且在当前元素上触发了事件，则分发一个自定义事件
      // 事件名改为非html标准事件，避免影响冒泡路径上其他对标准事件的监听
      el.addEventListener(originalEvent, (ev) => {
        if (stdEventSet.has(ev)) { // 判断该标准事件是否已被后代元素处理过
          return;
        }
        stdEventSet.add(ev);
        const currentData = getDirectiveBindingValueData(
          el,
          listeningEvent,
          ev
        );
        if (!isObj(currentData)) {
          return;
        }
        const parentEl = (ev.currentTarget as HTMLElement).parentElement;
        parentEl &&
          dispatchBubbleCustomEvent(parentEl, listeningEvent, currentData);
      });
    }

    el.addEventListener(listeningEvent, (ev: Event) => {
      // 获取指令传值
      let currentData = getDirectiveBindingValueData(el, listeningEvent, ev);
      if (!isObj(currentData)) {
        return;
      }
      if (isBubble) {
        // 触发监听的事件来自后代元素上该指令产生的自定义事件
        // 向事件携带的数据中添加当前指令传入的数据
        if (isFromBubble(ev)) {
          Object.assign(ev.detail.data, currentData);
        }
      } else if (binding.modifiers.catchBubble) {
        if (isFromBubble(ev)) {
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
      } else {
        // 普通地触发上报
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
