<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';
import { downloadCard } from '@/api/api-certification';

import AppContent from '@/components/AppContent.vue';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';
const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();

const language = computed(() =>
  lang.value === 'zh' ? 'zh_CN' : lang.value === 'en' ? 'en_US' : 'ru_RU'
);
const notFoundImg = computed(() =>
  commonStore.theme === 'light' ? notFoundImg_light : notFoundImg_dark
);
const disabledTip = ref('');
// 下载事件处理
function downloadCertification(paString: string) {
  downloadCard(paString, language.value)
    .then((res) => {
      if (res.success) {
        disabledTip.value = '';
        function handleUrlToBlob(dataurl: any) {
          const arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
        }
        function handleBlobToFile(theBlob: any, fileName: any) {
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        }
        const str = 'data:application/pdf;base64,' + res.data.data;
        const blob = handleUrlToBlob(str);
        const file = handleBlobToFile(blob, 'zs');
        const href = URL.createObjectURL(file);
        const downloadElement = document.createElement('a');
        downloadElement.href = href;
        downloadElement.download = res.data.fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      } else {
        disabledTip.value = res.message;
      }
    })
    .catch((error: any) => {
      throw new Error(error);
    });
}
// 获取url里面携带的PA参数
function getUrlArguments(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.slice(1).match(reg);

  if (r !== null) {
    return decodeURI(r[2]);
  }
  return '';
}
onMounted(() => {
  downloadCertification(getUrlArguments('PA'));
});
</script>
<template>
  <AppContent>
    <h2>{{ i18n.certification.certificateDownload }}</h2>
    <div v-if="disabledTip !== ''" class="nofound">
      <img class="nofound-img" :src="notFoundImg" alt="404" />
      <p class="nofound-text">
        {{ disabledTip }}
      </p>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
h2 {
  font-size: var(--e-font-size-h3);
  line-height: var(--e-line-height-h3);
  color: var(--e-color-text1);
  text-align: center;
  font-weight: 300;
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
  }
}
.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--e-font-size-h6);
  color: var(--e-color-text1);
  padding: var(--e-spacing-h2) 0;
  min-height: calc(100vh - 339px);
  .nofound-text {
    margin-top: var(--e-spacing-h5);
    font-size: var(--e-font-size-h7);
  }
  .nofound-img {
    height: 300px;
  }
  @media screen and (max-width: 768px) {
    padding-top: var(--e-spacing-h2);
    font-size: var(--e-font-size-text);
    .nofound-img {
      max-height: 232px;
    }
    .nofound-text {
      margin-top: var(--e-spacing-h6);
      font-size: var(--e-font-size-tip);
    }
  }
}
</style>
