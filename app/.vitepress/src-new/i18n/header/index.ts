import zh from './header-zh';
import en from './header-en';

const pathStack = [] as string[];

function setPath(this: { isZh: boolean }, item: any) {
  pathStack.push(item.NAME);
  const res = {
    ...item,
    _PATH: [...pathStack],
  };
  if (Array.isArray(res.CHILDREN)) {
    res.CHILDREN = res.CHILDREN.map(setPath, this);
  }
  if (Array.isArray(res.SHORTCUT)) {
    pathStack.push(this.isZh ? zh.QUICKLINK : en.QUICKLINK);
    res.SHORTCUT = res.SHORTCUT.map(setPath, this);
    pathStack.pop();
  }
  pathStack.pop();
  return res;
}

zh.NAV_ROUTER = zh.NAV_ROUTER.map(setPath, { isZh: true }) as any[];
en.NAV_ROUTER = en.NAV_ROUTER.map(setPath, { isZh: false }) as any[];

export default {
  zh,
  en,
};
