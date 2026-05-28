// 组织架构页面相关的类型定义。
//
// 数据来源:`.content/organization/*.yaml`。
// 字段约定见 `app/.vitepress/src-new/shared/content.ts`(i18n 折叠规则)和
// `app/.vitepress/plugins/vite-plugin-content-yaml.ts`(image 字段处理)。

// 原始 YAML 形状(applyLang 之前的字面内容,带 `_en` 兄弟字段)。
// 在 loader 边界用,因为还要读 `title_en` 派生 anchor。
export interface MemberRawT {
  name: string;
  name_en: string;
  image: string;
  position?: string | string[];
  position_en?: string | string[];
  post?: string;
  post_en?: string;
  email?: string;
  gitee?: string;
}

export interface GroupRawT {
  title: string;
  title_en: string;
  members: MemberRawT[];
}

export interface OrgRawT {
  title: string;
  title_en: string;
  members?: MemberRawT[];
  groups?: GroupRawT[];
  rows?: MemberRawT[][];
  /** YAML 本身没有此字段,由 loadFiles 的 enrich 钩子从 `title_en` 派生注入。 */
  anchor?: string;
}

// applyLang 处理后的形状:`_en` 兄弟已折叠回基线字段、image 已解析为最终
// URL。Vue 模板直接按这些字段名读。`anchor` 由调用方在 applyLang 之前
// 用 `deriveAnchor(title_en)` 注入。
export interface MemberT {
  name: string;
  image: string;
  position?: string | string[];
  post?: string;
  email?: string;
  gitee?: string;
}

export interface GroupT {
  title: string;
  members: MemberT[];
}

export interface OrgT {
  title: string;
  anchor: string;
  members?: MemberT[];
  groups?: GroupT[];
  rows?: MemberT[][];
}
