// 文本超过 n 行显示展开隐藏按钮
import { ref, DirectiveBinding } from 'vue';

interface ExtendedHTMLElement extends HTMLElement {
  scrollToBottomCleanup?: () => void;
}

export default {
  mounted(el: ExtendedHTMLElement, binding: DirectiveBinding) {
    const lineClamp = binding.value || 3;

    // 添加内部状态，确保每个元素的状态独立
    let isExpanded = false;

    // 保存初始样式
    el.style.cssText = `
      position: relative;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: ${lineClamp};
      -webkit-box-orient: vertical;
    `;

    const toggleButton = document.createElement('button');
    toggleButton.textContent = '展开';

    toggleButton.addEventListener('click', () => {
      isExpanded = !isExpanded;
      el.style.display = isExpanded ? 'block' : '-webkit-box';
      el.style.overflow = isExpanded ? 'visible' : 'hidden';
      toggleButton.textContent = isExpanded ? '收起' : '展开';
    });

    // 检查内容是否需要截断
    const checkTruncation = () => {
      if (el.scrollHeight > el.offsetHeight) {
        el.parentNode.style.position = 'relative';
        el.parentNode.appendChild(toggleButton);
      }
    };

    // 延迟检查以确保 DOM 已渲染完成
    setTimeout(checkTruncation, 0);
  },
};
