# API 与状态管理规范

## API 模块规范

### 文件组织

```plaintext
app/.vitepress/src-new/api/
├── api-news.ts          # 新闻接口
├── api-search.ts        # 搜索接口
├── api-sig.ts           # SIG 接口
├── api-security.ts      # 安全公告接口
├── api-meeting.ts       # 会议接口
├── api-download.ts      # 下载接口
└── api-[模块名].ts      # 其他业务接口
```

命名规则：`api-[模块名].ts`

---

### axios 实例

**始终从 `~@/shared/axios` 导入，禁止自行创建 axios 实例。**

```typescript
// ✅ 正确
import { request } from '~@/shared/axios';
import type { AxiosResponse } from '~@/shared/axios';

// ❌ 禁止
import axios from 'axios';
const myAxios = axios.create({ ... });
```

axios 实例已内置：
- 重复请求取消（`ignoreDuplicates` 控制）
- 全局 Loading 显示（`showLoading` 控制）
- 错误提示（`showError` 控制）

---

### API 函数编写规范

`get` 请求使用 `params` 传参，禁止直接拼接 URL。

```typescript
// api/api-news.ts
import { request } from '~@/shared/axios';

/**
 * 获取新闻列表
 */
export const getNewsData = (params: NewsQueryT) => {
  return request
    .post('/api-search/search/sort', params)
    .then((res) => res.data);
};

/**
 * 获取 SIG 详情
 */
export const getSigDetail = (sigName: string) => {
  return request
    .get('/api-sig/detail', {
      params: { name: decodeURIComponent(sigName) },
    })
    .then((res) => res.data);
};
```

---

### 组件中调用 API

```typescript
// ✅ 必须用 try/catch，配合 loading 状态
const list = ref<NewsItemT[]>([]);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getNewsData({ page: 1, pageSize: 10 });
    list.value = res.list ?? [];
  } catch (error) {
    console.error('获取新闻列表失败:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

// ❌ 禁止不处理错误
const res = await getNewsData({ page: 1 }); // 无 try/catch
```

---

## 状态管理规范

### 选择原则

| 场景 | 方案 |
|------|------|
| 全局共享状态（主题、用户信息、Cookie 协议） | Pinia `defineStore` |
| 仅当前组件使用的临时状态 | `ref` / `reactive` |
| 父子组件间状态传递 | `props` + `emit` / `provide` + `inject` |

VitePress 项目**没有 Nuxt 的 `useState`**，禁止使用。

---

### Pinia Store

```plaintext
app/.vitepress/src-new/stores/
├── common.ts        # 通用状态（主题、页头标题）
├── cookie.ts        # Cookie 协议状态
├── download.ts      # 下载页状态
└── search.ts        # 搜索状态
```

**Options Store 风格（现有 store 使用）：**

```typescript
// stores/cookie.ts
import { defineStore } from 'pinia';

export const useCookieStore = defineStore('cookie', {
  state: () => ({
    status: '0',
    isNoticeVisible: false,
  }),
  getters: {
    isAllAgreed: (state) => state.status === '1',
  },
  actions: {
    getUserCookieStatus() {
      const cookieVal = getCookie(COOKIE_KEY) ?? '0';
      this.status = cookieVal[0];
    },
  },
});
```

**新 Store 推荐 Setup Store 风格：**

```typescript
// stores/version.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVersionStore = defineStore('version', () => {
  const current = ref('');
  const list = ref<string[]>([]);

  const fetchVersions = async () => {
    try {
      // ...
    } catch (error) {
      console.error('获取版本失败:', error);
    }
  };

  return { current, list, fetchVersions };
});
```

---

### Store 使用规范

```typescript
import { useCookieStore } from '~@/stores/cookie';
import { storeToRefs } from 'pinia';

const cookieStore = useCookieStore();

// ✅ 解构响应式数据必须使用 storeToRefs
const { status, isNoticeVisible } = storeToRefs(cookieStore);

// ✅ actions 直接从 store 解构即可
const { getUserCookieStatus } = cookieStore;

// ❌ 直接解构 state 丢失响应性
const { status } = cookieStore;
```

---

### Store 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| defineStore ID | camelCase | `'cookie'`, `'userInfo'` |
| 使用函数 | `use` + PascalCase + `Store` | `useCookieStore`, `useDownloadStore` |
| 文件名 | camelCase + `.ts` | `cookie.ts`, `download.ts` |
