// 分页器 PER_PAGE
export const COUNT_PER_PAGE = [12, 18, 24, 36];

// 直播
export const VHALLYUN = 'https://hw.vhallyun.com';

// 测试/本地环境（本地 dev 模式，或部署域名为 test.osinfra.cn）
export const IS_TEST_ENV = import.meta.env.DEV || `${import.meta.env.VITE_MAIN_DOMAIN_URL}`.includes('test.');
