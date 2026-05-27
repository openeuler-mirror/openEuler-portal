// `#content/<domain>` 虚拟模块由 vite-plugin-content-yaml 合成,每新增 domain 在此声明一条。

declare module '#content/organization' {
  import type { OrgRawT } from '@/@types/type-organization';
  const data: Record<string, OrgRawT>;
  export default data;
}
