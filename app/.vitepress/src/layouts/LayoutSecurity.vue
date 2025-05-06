<script lang="ts" setup>
import { reactive, computed, ref, onMounted, onUpdated } from 'vue';
import { useData, useRouter } from 'vitepress';

import { OButton, OTab, OTabPane } from '@opensig/opendesign';

import { useI18n } from '@/i18n';

import BannerLevel2 from '~@/components/BannerLevel2.vue';

import banner from '~@/assets/category/security/security-banner.jpg';

import { useScreen } from '~@/composables/useScreen';

const { lang } = useData();
const i18n = useI18n();
const { lePadV } = useScreen();

const btnDatas = [
  {
    text: computed(() => {
      return i18n.value.cve.VULNERABILITY;
    }),
    link: computed(() => {
      return `/${lang.value}/security/vulnerability-reporting/`;
    }),
  },
  {
    text: computed(() => {
      return i18n.value.cve.CERTIFICATE;
    }),
    link: computed(() => {
      return `/${lang.value}/security/certificate-center/`;
    }),
  },
];

const title = ref('');

const router = useRouter();
const clickTab = (val: string) => {
  title.value =
    val === 'cve' ? i18n.value.cve.CVE : i18n.value.cve.SECURITY_ADVISORIES;
  val === 'cve'
    ? router.go(`/${lang.value}/security/cve/`)
    : router.go(`/${lang.value}/security/security-bulletins/`);
};
const bannerData = {
  bannerImg: banner,
  bannerText: 'DOWNLOAD',
  bannerTitle: computed(() => {
    return i18n.value.cve.SAFETY_CENTER;
  }),
  subtitle: computed(() => {
    return i18n.value.cve.SAFETY_CENTER_DESC;
  }),
};

const tabsData = reactive({
  tabPane: [
    {
      label: computed(() => {
        return i18n.value.cve.SECURITY_ADVISORIES;
      }),
      name: 'security-bulletins',
    },
    {
      label: computed(() => {
        return i18n.value.cve.CVE;
      }),
      name: 'cve',
    },
  ],
});
const activeTab = ref('');
onMounted(() => {
  const pathList = router.route.path.split('/');
  activeTab.value = pathList[pathList.length - 2];

  title.value =
    activeTab.value === 'cve'
      ? i18n.value.cve.CVE
      : i18n.value.cve.SECURITY_ADVISORIES;
});
</script>
<template>
  <div v-if="!lePadV">
    <BannerLevel2
      :background-image="bannerData.bannerImg"
      :background-text="bannerData.bannerText"
      :title="bannerData.bannerTitle.value"
      :subtitle="bannerData.subtitle.value"
    >
      <div class="btn">
        <OButton
          variant="solid"
          color="primary"
          size="large"
          :href="btnDatas[0].link.value"
          target="_blank"
        >
          {{ btnDatas[0].text }}
        </OButton>
        <OButton
          variant="outline"
          color="primary"
          size="large"
          class="certificate-btn"
          :href="btnDatas[1].link.value"
          target="_blank"
        >
          {{ btnDatas[1].text }}
        </OButton>
      </div>
    </BannerLevel2>
    <OTab v-model="activeTab" :line="false" :key="lang" @change="clickTab">
      <OTabPane
        v-for="item in tabsData.tabPane"
        :key="item.name"
        :label="item.label"
        :value="item.name"
      ></OTabPane>
    </OTab>
  </div>
  <div v-else>
    <div class="banner-mb">
      <p class="title">{{ i18n.cve.SAFETY_CENTER }}</p>
      <p class="desc">{{ i18n.cve.SAFETY_CENTER_DESC }}</p>
      <OTab v-model="activeTab" :line="false" @change="clickTab">
        <OTabPane
          v-for="item in tabsData.tabPane"
          :key="item.name"
          :label="item.label"
          :value="item.name"
        ></OTabPane>
      </OTab>
      <p class="title title-page">{{ title }}</p>
      <div class="btn-mb">
        <OButton
          variant="solid"
          color="primary"
          size="medium"
          :href="btnDatas[0].link.value"
          target="_blank"
        >
          {{ btnDatas[0].text }}
        </OButton>
        <OButton
          variant="outline"
          color="primary"
          size="medium"
          :href="btnDatas[0].link.value"
          target="_blank"
        >
          {{ btnDatas[1].text }}
        </OButton>
      </div>
    </div>
  </div>
  <Content />
</template>

<style scoped lang="scss">
.certificate-btn {
  margin-left: 24px;
}

:deep(.o-tab) {
  --tab-nav-padding: 14px 0 24px 0;
  .o-tab-head {
    background-color: var(--o-color-fill2);
  }
}

:deep(.banner-level2 .wrap) {
  .banner-text {
    max-width: 60%;
    .banner-title {
      @include display2;
      color: var(--o-color-black);
    }
    .banner-subtitle {
      @include text2;
      color: var(--o-color-black);
      margin-top: var(--o-gap-2);
    }
  }

  height: 280px;

  @media screen and (max-width: 1680px) {
    height: 220px;

    .banner-text {
      .banner-title {
        font-size: 40px;
        line-height: 56px;
      }
      .banner-subtitle {
        font-size: 16px;
        line-height: 24px;
      }
      .banner-operation {
        margin-top: var(--o-gap-4);

        .o-btn {
          --btn-height: 32px;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    height: 180px;

    .banner-text {
      .banner-title {
        @include display2;
      }
      .banner-subtitle {
        @include text2;
      }
    }
  }
}

@include respond-to('<=pad_v') {
  .banner-mb {
    padding: 24px 24px 0;
    .title {
      font-weight: 500;
      color: var(--o-color-info1);
      @include display1;
    }
    .desc {
      color: var(--o-color-info1);
      margin-top: 8px;
      @include text1;
    }
  }
  :deep(.o-tab) {
    --tab-nav-padding: 0 0 4px 0;
    --tab-nav-justify: flex-start;
    margin-top: 12px;
    .o-tab-head {
      background-color: transparent;
    }
  }
  .title-page {
    margin-top: 24px;
  }
  .btn-mb {
    margin-top: 12px;
  }
  .o-btn + .o-btn {
    margin-left: 8px;
  }
}
</style>
