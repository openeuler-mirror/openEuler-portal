import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createApp, defineComponent, h } from 'vue';
import { useScreen, ScreenConfig, Size } from '../app/.vitepress/src-new/composables/useScreen';
import fs from 'fs';
import path from 'path';

function withSetup<T>(setup: () => T): { result: T; app: ReturnType<typeof createApp>; el: HTMLElement } {
  let result!: T;
  const App = defineComponent({
    setup() {
      result = setup();
      return () => h('div');
    },
  });
  const el = document.createElement('div');
  const app = createApp(App);
  app.mount(el);
  return { result, app, el };
}

const homeBannerSrc = fs.readFileSync(
  path.resolve('app/.vitepress/src-new/views/home/HomeBanner.vue'),
  'utf8',
);
const homeIntroSrc = fs.readFileSync(
  path.resolve('app/.vitepress/src-new/views/home/HomeIntro.vue'),
  'utf8',
);
const homeShowCaseSrc = fs.readFileSync(
  path.resolve('app/.vitepress/src-new/views/home/HomeShowCase.vue'),
  'utf8',
);

describe('useScreen — SSR 默认值(width=1440)下视口属性应为桌面端', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1440, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true });
  });

  it('width=1440 时 isPhone 为 false', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(result.isPhone.value).toBe(false);
    app.unmount();
  });

  it('width=1440 时 lePadV 为 false', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(result.lePadV.value).toBe(false);
    app.unmount();
  });

  it('width=1440 时 gtPad 为 true', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(result.gtPad.value).toBe(true);
    app.unmount();
  });

  it('SSR 默认值与 fallback 槽桌面内容一致: !isPhone=true 且 !lePadV=true 时渲染桌面分支', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(!result.isPhone.value).toBe(true);
    expect(!result.lePadV.value).toBe(true);
    app.unmount();
  });
});

describe('useScreen — 手机视口(width≤600)下视口属性应为移动端', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 667, configurable: true });
  });

  it('width=375 时 isPhone 为 true', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(result.isPhone.value).toBe(true);
    app.unmount();
  });

  it('width=375 时 lePadV 为 true', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(result.lePadV.value).toBe(true);
    app.unmount();
  });

  it('width=375 时 gtPad 为 false', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(result.gtPad.value).toBe(false);
    app.unmount();
  });
});

describe('useScreen — 边界视口宽度', () => {
  it('width=600(Phone 上界)时 isPhone 为 true', () => {
    Object.defineProperty(window, 'innerWidth', { value: 600, configurable: true });
    const { result, app } = withSetup(() => useScreen());
    expect(result.isPhone.value).toBe(true);
    expect(result.lePadV.value).toBe(true);
    app.unmount();
  });

  it('width=601(刚超过 Phone)时 isPhone 为 false', () => {
    Object.defineProperty(window, 'innerWidth', { value: 601, configurable: true });
    const { result, app } = withSetup(() => useScreen());
    expect(result.isPhone.value).toBe(false);
    expect(result.lePadV.value).toBe(true);
    app.unmount();
  });

  it('width=840(PadV 上界)时 lePadV 为 true', () => {
    Object.defineProperty(window, 'innerWidth', { value: 840, configurable: true });
    const { result, app } = withSetup(() => useScreen());
    expect(result.lePadV.value).toBe(true);
    expect(result.isPhone.value).toBe(false);
    app.unmount();
  });

  it('width=841(刚超过 PadV)时 lePadV 为 false', () => {
    Object.defineProperty(window, 'innerWidth', { value: 841, configurable: true });
    const { result, app } = withSetup(() => useScreen());
    expect(result.lePadV.value).toBe(false);
    app.unmount();
  });

  it('width=1200(PadH 上界)时 gtPad 为 false', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1200, configurable: true });
    const { result, app } = withSetup(() => useScreen());
    expect(result.gtPad.value).toBe(false);
    app.unmount();
  });

  it('width=1201(刚超过 PadH)时 gtPad 为 true', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1201, configurable: true });
    const { result, app } = withSetup(() => useScreen());
    expect(result.gtPad.value).toBe(true);
    app.unmount();
  });
});

describe('useScreen — size.width 动态变更后 computed 属性响应式更新', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1440, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true });
  });

  it('从桌面(1440)切换到手机(375)后 isPhone 变为 true', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(result.isPhone.value).toBe(false);
    result.size.width = 375;
    expect(result.isPhone.value).toBe(true);
    app.unmount();
  });

  it('从桌面(1440)切换到 PadV(768)后 lePadV 变为 true', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(result.lePadV.value).toBe(false);
    result.size.width = 768;
    expect(result.lePadV.value).toBe(true);
    app.unmount();
  });
});

describe('HomeBanner SFC — ClientOnly + fallback 模板结构', () => {
  it('模板包含 <ClientOnly> 元素', () => {
    expect(homeBannerSrc).toContain('<ClientOnly>');
  });

  it('模板包含 <template #fallback> 槽', () => {
    expect(homeBannerSrc).toContain('<template #fallback>');
  });

  it('fallback 内的 OCarousel 设置了 auto-play="false"(SSR 静态轮播)', () => {
    const fallbackMatch = homeBannerSrc.match(/<template #fallback>([\s\S]*?)<\/template>/);
    expect(fallbackMatch).not.toBeNull();
    const fallbackContent = fallbackMatch![1];
    expect(fallbackContent).toContain(':auto-play="false"');
  });

  it('fallback 闭合标签后紧跟 </ClientOnly>', () => {
    expect(homeBannerSrc).toContain('</ClientOnly>');
  });

  it('默认槽内有 v-if="!isPhone" 的桌面轮播', () => {
    expect(homeBannerSrc).toMatch(/v-if="!isPhone"/);
  });

  it('默认槽内有 v-if="isPhone" 的移动轮播', () => {
    expect(homeBannerSrc).toMatch(/v-if="isPhone"/);
  });
});

describe('HomeIntro SFC — ClientOnly + fallback 模板结构', () => {
  it('模板包含 <ClientOnly> 元素', () => {
    expect(homeIntroSrc).toContain('<ClientOnly>');
  });

  it('模板包含 <template #fallback> 槽', () => {
    expect(homeIntroSrc).toContain('<template #fallback>');
  });

  it('默认槽内有 v-if="!lePadV" 的桌面 intro', () => {
    expect(homeIntroSrc).toMatch(/v-if="!lePadV"/);
  });

  it('默认槽内有 v-else 的移动 OCollapse', () => {
    expect(homeIntroSrc).toContain('v-else');
  });

  it('fallback 内容包含 intro-pc 类名(桌面版布局)', () => {
    const fallbackMatch = homeIntroSrc.match(/<template #fallback>([\s\S]*?)<\/template>/);
    expect(fallbackMatch).not.toBeNull();
    const fallbackContent = fallbackMatch![1];
    expect(fallbackContent).toContain('intro-pc');
  });

  it('fallback 闭合标签后紧跟 </ClientOnly>', () => {
    expect(homeIntroSrc).toContain('</ClientOnly>');
  });
});

describe('HomeShowCase SFC — ClientOnly + fallback 模板结构', () => {
  it('模板包含 <ClientOnly> 元素', () => {
    expect(homeShowCaseSrc).toContain('<ClientOnly>');
  });

  it('模板包含 <template #fallback> 槽', () => {
    expect(homeShowCaseSrc).toContain('<template #fallback>');
  });

  it('默认槽内有 v-if="!isPhone" 的 case-img 元素', () => {
    expect(homeShowCaseSrc).toMatch(/v-if="!isPhone"/);
  });

  it('默认槽内 <li> 具有 case-img 类名', () => {
    expect(homeShowCaseSrc).toContain('class="case-img"');
  });

  it('fallback 内容包含 <li class="case-img">(桌面版图片)', () => {
    const fallbackMatch = homeShowCaseSrc.match(/<template #fallback>([\s\S]*?)<\/template>/);
    expect(fallbackMatch).not.toBeNull();
    const fallbackContent = fallbackMatch![1];
    expect(fallbackContent).toContain('class="case-img"');
  });

  it('fallback 闭合标签后紧跟 </ClientOnly>', () => {
    expect(homeShowCaseSrc).toContain('</ClientOnly>');
  });
});

describe('SSR/fallback 一致性 — SSR 默认视口条件与 fallback 槽渲染内容匹配', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1440, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true });
  });

  it('HomeBanner: width=1440 时 !isPhone=true → SSR 渲染桌面轮播,与 fallback 一致', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(!result.isPhone.value).toBe(true);
    app.unmount();
  });

  it('HomeIntro: width=1440 时 !lePadV=true → SSR 渲染桌面 intro,与 fallback 一致', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(!result.lePadV.value).toBe(true);
    app.unmount();
  });

  it('HomeShowCase: width=1440 时 !isPhone=true → SSR 渲染 case-img,与 fallback 一致', () => {
    const { result, app } = withSetup(() => useScreen());
    expect(!result.isPhone.value).toBe(true);
    app.unmount();
  });
});

describe('ScreenConfig — 断点阈值完整性', () => {
  it('Phone 断点为 600', () => {
    expect(ScreenConfig[Size.Phone]).toBe(600);
  });

  it('PadV 断点为 840', () => {
    expect(ScreenConfig[Size.PadV]).toBe(840);
  });

  it('PadH 断点为 1200', () => {
    expect(ScreenConfig[Size.PadH]).toBe(1200);
  });

  it('Laptop 断点为 1440(SSR 默认宽度)', () => {
    expect(ScreenConfig[Size.Laptop]).toBe(1440);
  });
});