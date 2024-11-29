export default {
  async paths() {
    const sigs = await (
      await fetch(
        'https://dsapi.osinfra.cn/query/sig/info?community=openeuler&search=fuzzy'
      )
    ).json();
    return sigs?.data.map((sig) => {
      return {
        params: {
          sig: `${sig.sig_name}`,
        },
      };
    });
  },
};
