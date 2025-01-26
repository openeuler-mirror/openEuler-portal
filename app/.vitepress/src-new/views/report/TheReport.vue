<script setup lang="ts">
import { ref } from 'vue';

import OIcon from 'opendesign/icon/OIcon.vue';
import IconDownload from '~icons/app/icon-download.svg';
import { onMounted } from 'vue';

const pdfRef = ref();
const pdfUrl = '/annual-report/openEuler-annual-report-2024.pdf';
const VuePdfEmbed = ref(null);

onMounted(async () => {
  const { default: PdfEmbed } = await import('vue-pdf-embed');
  VuePdfEmbed.value = PdfEmbed;
});
</script>

<template>
  <div class="pdf-viewer">
    <div class="pdf-header">
      <a
        class="download-btn"
        href="/annual-report/openEuler-annual-report-2024.pdf"
        download="openEuler-annual-report-2024.pdf"
      >
        <OIcon>
          <IconDownload />
        </OIcon>
      </a>
    </div>
    <div class="pdf-content">
      <component :is="VuePdfEmbed" ref="pdfRef" :source="pdfUrl" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pdf-viewer {
  --pdf-header-height: 32px;
  position: relative;
  @include respond-to('<=pad_v') {
    --pdf-header-height: 24px;
  }
}

.pdf-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  height: var(--pdf-header-height);
  background-color: #333639;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.download-btn {
  height: 100%;
  display: inline-flex;
  justify-content: center;
  padding: 0 32px;
  color: rgba(var(--o-white));
  @include respond-to('<=pad_v') {
    padding: 0 16px;
  }
}

.pdf-content {
  margin-top: var(--pdf-header-height);
}
</style>
