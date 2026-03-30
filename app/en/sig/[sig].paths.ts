export default {
  async paths() {
    try {
      const res = await fetch(
        'https://magicapi.osinfra.cn/stat/sig/info?community=openeuler'
      );
      if (!res.ok) return [];
      const sigs = await res.json();
      return sigs?.data?.map((sig) => {
        return {
          params: {
            sig: `${sig.name}`,
          },
        };
      }) ?? [];
    } catch {
      return [];
    }
  },
};