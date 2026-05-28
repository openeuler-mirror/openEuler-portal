import { expect, describe, it } from 'vitest';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

// 与 TheOrganization.vue 内联的实现保持一致。
function deriveAnchor(titleEn: string): string {
  return titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

describe('foldI18n — i18n 字段合并', () => {
  it('zh 模式删除所有 _en 兄弟字段,保留基线字段', () => {
    const input = { name: '张三', name_en: 'Zhang San', age: 30 };
    expect(foldI18n(input, 'zh')).toEqual({ name: '张三', age: 30 });
  });

  it('en 模式用 _en 字段覆盖基线字段,然后删除 _en', () => {
    const input = { name: '张三', name_en: 'Zhang San', age: 30 };
    expect(foldI18n(input, 'en')).toEqual({ name: 'Zhang San', age: 30 });
  });

  it('没有 _en 兄弟的字段在两种模式下都保留', () => {
    const input = { name: '张三', name_en: 'Zhang San', email: 'a@b.com', gitee: 'abc' };
    expect(foldI18n(input, 'zh')).toEqual({
      name: '张三', email: 'a@b.com', gitee: 'abc',
    });
    expect(foldI18n(input, 'en')).toEqual({
      name: 'Zhang San', email: 'a@b.com', gitee: 'abc',
    });
  });

  it('多个 _en 字段并存(name/post/position)同时处理', () => {
    const input = {
      name: '胡欣蔚',
      name_en: 'Hu Xinwei',
      post: '主席',
      post_en: 'Chairperson',
      position: '华为',
      position_en: 'Huawei',
    };
    expect(foldI18n(input, 'en')).toEqual({
      name: 'Hu Xinwei',
      post: 'Chairperson',
      position: 'Huawei',
    });
  });

  it('_en 字段没有兄弟基线时 zh 直接丢弃,en 创建新字段', () => {
    const input = { foo_en: 'bar' };
    expect(foldI18n(input, 'zh')).toEqual({});
    expect(foldI18n(input, 'en')).toEqual({ foo: 'bar' });
  });
});

describe('deriveAnchor — 从 title_en 派生 HTML anchor', () => {
  it('小写 + 非字母数字字符替换为连字符(GFM/URL slug 规范)', () => {
    expect(deriveAnchor('openEuler Technical Committee')).toBe('openeuler-technical-committee');
  });

  it('长 title 也能稳定派生', () => {
    expect(deriveAnchor('Advisory Committee of the openEuler Committee'))
      .toBe('advisory-committee-of-the-openeuler-committee');
  });

  it('多个连续空格/特殊字符压成一个连字符', () => {
    expect(deriveAnchor('A  B   C')).toBe('a-b-c');
    expect(deriveAnchor('A_B.C/D')).toBe('a-b-c-d');
  });

  it('首尾空格/标点被去掉', () => {
    expect(deriveAnchor('  hello world!  ')).toBe('hello-world');
    expect(deriveAnchor('(Note)')).toBe('note');
  });

  it('zh/en 派生结果一致(因为只看 title_en,跟 lang 无关)', () => {
    const titleEn = 'openEuler Technical Committee';
    expect(deriveAnchor(titleEn)).toBe(deriveAnchor(titleEn));
  });
});

describe('foldI18n — 递归遍历', () => {
  it('嵌套对象递归处理', () => {
    const input = {
      title: '委员会',
      title_en: 'Committee',
      meta: { author: '李四', author_en: 'Li Si' },
    };
    expect(foldI18n(input, 'en')).toEqual({
      title: 'Committee',
      meta: { author: 'Li Si' },
    });
  });

  it('数组内的对象递归处理', () => {
    const input = {
      members: [
        { name: '张三', name_en: 'Zhang San' },
        { name: '李四', name_en: 'Li Si' },
      ],
    };
    expect(foldI18n(input, 'en')).toEqual({
      members: [{ name: 'Zhang San' }, { name: 'Li Si' }],
    });
  });

  it('数组的数组(rows)正确递归', () => {
    const input = {
      rows: [
        [{ name: '周楠', name_en: 'Zhou Nan' }],
        [{ name: '胡正策', name_en: 'Hu Zhengce' }],
      ],
    };
    expect(foldI18n(input, 'zh')).toEqual({
      rows: [[{ name: '周楠' }], [{ name: '胡正策' }]],
    });
  });

  it('原始数据不被改动 (纯函数,deep clone)', () => {
    const input = { name: '张三', name_en: 'Zhang San' };
    foldI18n(input, 'en');
    expect(input).toEqual({ name: '张三', name_en: 'Zhang San' });
  });
});

describe('foldI18n — 边界情况', () => {
  it('空对象', () => {
    expect(foldI18n({}, 'zh')).toEqual({});
  });

  it('空数组', () => {
    expect(foldI18n([], 'zh')).toEqual([]);
  });

  it('原始值(string/number/null/undefined)原样返回', () => {
    expect(foldI18n('hello', 'zh')).toBe('hello');
    expect(foldI18n(42, 'zh')).toBe(42);
    expect(foldI18n(null, 'zh')).toBe(null);
    expect(foldI18n(undefined, 'zh')).toBe(undefined);
  });

  it('不识别的后缀(_fr 等)保留原样', () => {
    const input = { name: '张三', name_fr: 'Zhang San' };
    expect(foldI18n(input, 'zh')).toEqual({ name: '张三', name_fr: 'Zhang San' });
    expect(foldI18n(input, 'en')).toEqual({ name: '张三', name_fr: 'Zhang San' });
  });
});

describe('foldI18n — 完整 organization YAML 形状', () => {
  it('模拟一个真实的 section YAML(技术委员会形态),含注入的 anchor', () => {
    const yaml = {
      title: 'openEuler 技术委员会',
      title_en: 'openEuler Technical Committee',
      anchor: deriveAnchor('openEuler Technical Committee'),
      members: [
        {
          name: '胡欣蔚',
          name_en: 'Hu Xinwei',
          image: '/assets/huxinwei-technical.png',
          post: '主席',
          post_en: 'Chairperson',
          email: 'shinwell_hu@openeuler.sh',
          gitee: 'shinwell_hu',
        },
      ],
    };

    const en = foldI18n(yaml, 'en');
    expect(en).toEqual({
      title: 'openEuler Technical Committee',
      anchor: 'openeuler-technical-committee',
      members: [
        {
          name: 'Hu Xinwei',
          image: '/assets/huxinwei-technical.png',
          post: 'Chairperson',
          email: 'shinwell_hu@openeuler.sh',
          gitee: 'shinwell_hu',
        },
      ],
    });
  });

  it('模拟委员会形态(groups 子分组),anchor 在 zh/en 一致', () => {
    const yaml = {
      title: 'openEuler 委员会',
      title_en: 'openEuler Committee',
      anchor: deriveAnchor('openEuler Committee'),
      groups: [
        {
          title: '主席',
          title_en: 'Chairperson',
          members: [{ name: '熊伟', name_en: 'Xiong Wei', image: '/assets/xiongwei.png' }],
        },
      ],
    };

    const zh = foldI18n(yaml, 'zh');
    expect(zh).toEqual({
      title: 'openEuler 委员会',
      anchor: 'openeuler-committee',
      groups: [
        {
          title: '主席',
          members: [{ name: '熊伟', image: '/assets/xiongwei.png' }],
        },
      ],
    });

    const en = foldI18n(yaml, 'en');
    expect(en.anchor).toBe('openeuler-committee');
  });
});

// 集成测试:走真实 Vite 插件管线,验证目录 import 与单文件 import 都能拿到 URL 化的 image。
import organizationAll from '#content/organization';
import advisoryDirect from '#content/organization/advisory.yaml';

describe('集成: vite-plugin-content-yaml 真实 YAML', () => {
  const advisory = organizationAll.advisory;

  it('目录 import 拿到了所有 11 个 section', () => {
    expect(Object.keys(organizationAll).length, '虚拟目录模块返回空 → 核对 #content alias / 插件 configResolved').toBe(11);
    expect(advisory, '没找到 advisory.yaml,核对 vitest.config.js 的 #content alias').toBeDefined();
  });

  it('advisory.yaml 已被插件解析为 JS 对象', () => {
    expect(advisory.title).toBe('openEuler 委员会顾问专家委员会');
    expect(advisory.title_en).toBe('Advisory Committee of the openEuler Committee');
  });

  it('image 字段已被插件转成 URL(不是原始的 ./images/ 路径)', () => {
    const first = advisory.members![0];
    expect(first.image, 'image 必须是 URL 或绝对/data URL,不能还是 ./images/...')
      .not.toMatch(/^\.\/images\//);
  });

  it('单文件 import 与目录 import 拿到的是同一对象 (referential equality)', () => {
    expect(advisoryDirect).toBe(advisory);
  });

  it('zh foldI18n 后 title 是中文、_en 字段消失', () => {
    const zh = foldI18n(advisory, 'zh') as Record<string, unknown>;
    expect(zh.title).toBe('openEuler 委员会顾问专家委员会');
    expect(zh.title_en).toBeUndefined();
  });

  it('en foldI18n 后 title 是英文', () => {
    const en = foldI18n(advisory, 'en') as Record<string, unknown>;
    expect(en.title).toBe('Advisory Committee of the openEuler Committee');
  });
});
