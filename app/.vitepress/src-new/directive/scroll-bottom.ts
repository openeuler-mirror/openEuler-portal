// 滑动到底部出发事件，主要用于移动端请求下一页数据
import { DirectiveBinding } from 'vue';
import { throttle } from 'lodash-es';

interface ExtendedHTMLElement extends HTMLElement {
  scrollToBottomCleanup?: () => void;
}

// 自定义指令
const scrollBottomDirective = {
  mounted(el: ExtendedHTMLElement, binding: DirectiveBinding) {
    let lastScrollTop = 0;

    // 滚动事件处理函数
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      // 检查是否滑到底部并且是下滑
      if (
        scrollTop + clientHeight >= scrollHeight &&
        currentScrollTop > lastScrollTop
      ) {
        binding.value(); // 执行绑定的回调函数
      }
      lastScrollTop = currentScrollTop;
    };

    // 使用 lodash 的 throttle 限制滚动事件触发频率
    const throttleEvent = throttle(handleScroll, 300);

    // 将清理逻辑绑定到元素上
    el.scrollToBottomCleanup = () => {
      window.removeEventListener('scroll', throttleEvent);
    };

    // 注册滚动事件
    window.addEventListener('scroll', throttleEvent);
  },
  unmounted(el: ExtendedHTMLElement) {
    // 解绑事件
    if (el.scrollToBottomCleanup) {
      el.scrollToBottomCleanup();
    }
  },
};

// 导出指令以供全局注册
export default scrollBottomDirective;
