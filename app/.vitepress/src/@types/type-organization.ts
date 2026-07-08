// 组织架构页面相关的类型定义。
//
// 数据来源:`.content/community/organization/{zh,en}.yaml`。
// 字段约定见 `app/.vitepress/plugins/vite-plugin-content-yaml.ts`(image 字段处理)。
// 数据已按 locale 拆分到 zh.yaml/en.yaml,无 `_en` 兄弟字段,无需 foldI18n。

// applyLang 处理后的形状:image 已解析为最终 URL。
// Vue 模板直接按这些字段名读。`anchor` 由 yaml 数据显式提供
// (zh/en 共用同一英文 anchor 值,写在 `.content/community/organization/{zh,en}.yaml` 每个 section 里)。
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
