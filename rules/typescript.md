# TypeScript 规范

## 基本要求

- 所有文件使用 `.ts` / `.vue` 扩展名，不使用 `.js`
- `tsconfig.json` 已启用 `"strict": true`，不得降低
- 尽量避免使用 `any`（ESLint 对 `any` 为 warn 级别，特殊情况需注释说明原因）

---

## 类型文件组织

```plaintext
app/.vitepress/src-new/@types/
├── sig.ts           # SIG 相关类型
├── news.ts          # 新闻相关类型
├── search.ts        # 搜索相关类型
├── download.ts      # 下载相关类型
├── security.ts      # 安全公告类型
└── [模块名].ts      # 其他业务模块类型
```

---

## 接口 vs 类型别名

```typescript
// ✅ 对象结构使用 interface
interface SigItemT {
  name: string;
  description: string;
  maintainers: string[];
}

// ✅ 联合类型、工具类型使用 type
type Theme = 'light' | 'dark';
type ApiResponse<T> = {
  code: number;
  data: T;
  message: string;
};

// ✅ 继承扩展使用 interface extends
interface SigDetailT extends SigItemT {
  meetings: MeetingT[];
  repos: string[];
}
```

---

## API 类型命名约定

```typescript
// @types/sig.ts

// 请求参数类型：ParamsT 或 QueryT 后缀
export interface SigListParamsT {
  page: number;
  pageSize: number;
  keyword?: string;
}

// 单条数据：T 后缀
export interface SigItemT {
  name: string;
  description: string;
}

// 列表响应：ListT 后缀
export interface SigListT {
  list: SigItemT[];
  total: number;
}

// 详情响应：DetailT 后缀
export interface SigDetailT extends SigItemT {
  maintainers: string[];
  meetings: MeetingT[];
}
```

---

## Ref 类型标注

```typescript
// 基础类型自动推导，无需标注
const count = ref(0);
const name = ref('');

// 复杂类型必须显式标注
const sigList = ref<SigItemT[]>([]);
const currentSig = ref<SigDetailT | null>(null);
```

---

## 枚举替代方案

```typescript
// ❌ 避免使用 enum（运行时有额外开销）
enum Status { Active, Inactive }

// ✅ 使用 const object + as const
const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

type StatusType = typeof STATUS[keyof typeof STATUS];
// => 'active' | 'inactive'

// ✅ 项目中已有的 Size enum（useScreen 内）可继续使用
import { Size } from '~@/composables/useScreen';
```

---

## 非空断言

```typescript
// ❌ 避免随意使用非空断言
const name = user!.name;

// ✅ 使用可选链 + 空值合并
const name = user?.name ?? '未知';

// ✅ 提前 guard
if (!user) return;
const name = user.name;
```

---

## 泛型 Props 类型

组件 Props 类型统一用 interface 定义，命名以 `PropsT` 结尾：

```typescript
interface CardPropsT {
  title: string;
  subtitle?: string;
  items: SigItemT[];
}

const props = withDefaults(defineProps<CardPropsT>(), {
  subtitle: undefined,
});
```

---

## JSDoc 注释规范

公共 API 函数和工具函数必须添加 JSDoc：

```typescript
/**
 * 获取 SIG 列表
 * @param params 查询参数
 */
export function getSigList(params: SigListParamsT) {
  return request.get('/api-sig/list', { params }).then((res) => res.data);
}
```

---

## 禁止事项

```typescript
// ❌ 禁止 @ts-ignore（应修复类型错误）
// @ts-ignore
const result = badFunction();

// ❌ 禁止空 catch（必须处理或 console.error）
try {
  await fetchData();
} catch {}

// ❌ 禁止类型断言绕过类型检查
const sig = {} as SigDetailT;

// ❌ 禁止用 as any 蒙混过关（需注释说明）
const data = response as any;
```
