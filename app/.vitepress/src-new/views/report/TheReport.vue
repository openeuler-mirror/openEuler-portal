<script setup lang="ts">
import { ref } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

import OIcon from 'opendesign/icon/OIcon.vue';
import IconDownload from '~icons/app/icon-download.svg';

const pdfRef = ref();
const pdfUrl = '/annual-report/openEuler-annual-report-2024.pdf';
const currentPage = ref(0);
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
      <VuePdfEmbed ref="pdfRef" :source="pdfUrl" :page="currentPage" />
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
