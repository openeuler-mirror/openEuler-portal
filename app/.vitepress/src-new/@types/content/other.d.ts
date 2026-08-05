declare module '#content/other/lifecycle' {
  interface LifecycleContentT {
    banner: string;
    overall: string;
    img1: string;
    lts: string;
    img2: string;
  }

  const data: { zh: LifecycleContentT; en: LifecycleContentT };
  export default data;
}
