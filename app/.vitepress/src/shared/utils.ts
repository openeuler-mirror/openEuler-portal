// 格式化数字
export function formatNumber(num: number) {
  return num >= 1e3 && num < 1e4
    ? `${(num / 1e3).toFixed(1)}K`
    : num >= 1e4
    ? `${(num / 1e4).toFixed(1)}W`
    : num;
}

// TS 对象key合法检查
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * 首页母大写其他字母小写
 * @param str 字符串
 * @returns 首字母大写其他字母小写的字符串
 */
export function firstToUpper(str: string): string {
  return str.replace(/(w)(w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
}

/**
 * 是否是浏览器环境
 * @returns {String}
 */
export function isBrowser(): boolean {
  return typeof global === 'undefined';
}

/**
 * 获取今日日期 2222-01-09
 * @returns {String}
 */
export function getNowFormatDate() {
  const date = new Date();
  const seperator1 = '/';
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = Number('0' + month);
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = Number('0' + strDate);
  }
  const currentDate = year + seperator1 + month + seperator1 + strDate;
  return currentDate;
}

// 搜索对搜索词埋点
export function setSearchBuriedData(search_key: string) {
  const search_event_id = `${search_key}${new Date().getTime()}${
    (window as any)['sensorsCustomBuriedData']?.ip || ''
  }`;
  const obj = {
    search_key,
    search_event_id,
  };
  (window as any)['addSearchBuriedData'] = obj;
  const sensors = (window as any)['sensorsDataAnalytic201505'];
  sensors?.setProfile({
    profileType: 'searchValue',
    ...((window as any)['sensorsCustomBuriedData'] || {}),
    ...((window as any)['addSearchBuriedData'] || {}),
  });
}

// 等待sensor加载完成
export function addSearchBuriedData(search_key: string, num = 20) {
  if (!num) {
    // 重试最大次数
    return;
  }
  if ((window as any)['sensorsCustomBuriedData']) {
    setSearchBuriedData(search_key);
  } else {
    setTimeout(() => {
      // 若是一开始没有值，则重试
      num--;
      addSearchBuriedData(search_key, num);
    }, 500);
  }
}
// URL参数转对象
export function getUrlParams(url: string) {
  const arrObj = url.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    const list = {} as any;
    for (let i = 0; i < arrPara.length; i++) {
      const item = arrPara[i].split('=');
      const key = item[0];
      const value = item[1];
      list[key] = value;
    }
    return list;
  }
}
export function getBetweenDateStr(starDay: string, endDay: string) {
  const arr = [];
  const dates = [];

  // 设置两个日期UTC时间
  const db = new Date(starDay);
  const de = new Date(endDay);

  // 获取两个日期GTM时间
  const s = db.getTime() - 24 * 60 * 60 * 1000;
  const d = de.getTime() - 24 * 60 * 60 * 1000;

  // 获取到两个日期之间的每一天的毫秒数
  for (let i = s; i <= d; ) {
    i = i + 24 * 60 * 60 * 1000;
    arr.push(parseInt(i.toString()));
  }

  // 获取每一天的时间  YY-MM-DD
  for (const j in arr) {
    const time = new Date(arr[j]);
    const mouth =
      time.getMonth() + 1 >= 10
        ? time.getMonth() + 1
        : '0' + (time.getMonth() + 1);
    const day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
    const YYMMDD = mouth + '月' + '-' + day + '日';
    dates.push(YYMMDD);
  }

  return dates;
}
// 获取url 指定参数
export function getUrlParam(paraName: string) {
  const url = document.location.toString();
  const arrObj = url.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');
      if (arr !== null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
}

export function isTestEmail(str: string) {
  return /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/.test(
    str
  );
}
export function isTestPhone(str: string) {
  return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(str);
}

/*
 * setCookie 设置cookie
 *  cname cookie的名称
 *  cvalue cookie的值
 *  day cookie的过期时间 默认1天
 */
export function setCustomCookie(cname: string, cvalue: string, day = 1) {
  const expires = day * 24 * 60 * 60 * 1000;
  const date = new Date(+new Date() + expires).toUTCString();
  document.cookie = `${cname}=${cvalue};expires=${date}`;
}

// 删除cookie
export function removeCustomCookie(cname: string, cvalue: string) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const c = cookieArr[i].trim();
    if (c.includes(cvalue)) {
      setCustomCookie(cname, '', -1);
    }
  }
}
