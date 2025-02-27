<template>
  <div class="layout">
    <div class="body">
      <v-banner />
      <div class="content">
        <v-briefly @handleScroll="handleScroll" />

        <mini-title
          :inside-title="i18n.nestos.minititle.versionIn"
          :outside-title="i18n.nestos.minititle.versionOut"
        />
        <v-version />

        <mini-title
          :inside-title="i18n.nestos.minititle.archIn"
          :outside-title="i18n.nestos.minititle.archOut"
        />
        <v-architecture />

        <mini-title
          :inside-title="i18n.nestos.minititle.comIn"
          :outside-title="i18n.nestos.minititle.comOut"
        />
        <ClientOnly>
          <v-comparision />
        </ClientOnly>

        <mini-title
          :inside-title="i18n.nestos.minititle.resourceIn"
          :outside-title="i18n.nestos.minititle.resourceOut"
        />
        <v-resource id="resource" />

        <mini-title
          :inside-title="i18n.nestos.minititle.partnerIn"
          :outside-title="i18n.nestos.minititle.partnerOut"
        />
        <v-partner />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '@/i18n';
import MiniTitle from '@/components/nestos/MiniTitle.vue';
import vArchitecture from '@/components/nestos/architecture/Architecture.vue';
import vBanner from '@/components/nestos/Banner.vue';
import vBriefly from '@/components/nestos/Briefly.vue';
import vComparision from '@/components/nestos/Comparision.vue';
import vResource from '@/components/nestos/Resource.vue';
import vVersion from '@/components/nestos/Version.vue';
import vPartner from '@/components/nestos/Partner.vue';
import { onMounted } from 'vue';
import AOS from 'aos';

const i18n = useI18n();
onMounted(() => {
  AOS.init({
    offset: 200,
    duration: 800,
    easing: 'ease-in-sine',
    delay: 100,
    once: true,
  });
});
const handleScroll = () => {
  document.querySelector('#resource').scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  });
};
</script>
<style lang="scss" scoped>
@import '@/components/nestos/style/color-pick.scss';

.layout {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;

  .body {
    width: 100%;
    background-color: var(--o-color-fill1);

    .content {
      max-width: 1480px;
      margin: 0 auto;
      padding: var(--o-gap-6);
      .roadmap {
        width: 100%;
      }
    }
  }
}
</style>
