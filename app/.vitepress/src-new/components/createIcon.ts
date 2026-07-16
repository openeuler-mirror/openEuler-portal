import { defineComponent, h, withDirectives, resolveDirective, type Component } from 'vue';

export function createIcon(raw: string): Component {
  return defineComponent({
    render() {
      const dir = resolveDirective('dompurify-html')!;
      return withDirectives(h('span', { class: 'inline-svg' }), [[dir, raw]]);
    },
  });
}
