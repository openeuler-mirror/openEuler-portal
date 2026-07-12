import { defineComponent, h, type Component } from 'vue';

export function createIcon(raw: string): Component {
  return defineComponent({
    render() {
      return h('span', { class: 'inline-svg', innerHTML: raw });
    },
  });
}
