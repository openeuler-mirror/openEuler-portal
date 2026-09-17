import { h, type Component } from 'vue';

const cache = new Map<string, Component>();

export function createSvgIcon(svg: string): Component {
  const cached = cache.get(svg);
  if (cached) return cached;
  const component: Component = () => h('i', { innerHTML: svg });
  cache.set(svg, component);
  return component;
}
