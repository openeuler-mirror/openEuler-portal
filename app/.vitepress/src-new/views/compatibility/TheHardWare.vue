<script lang="ts" setup>
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';

import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

const { lang } = useData();
const i18n = useI18n();
</script>
<template>
  <ContentWrapper :vertical-padding="['40px', 0]">
    <OBreadcrumb>
      <OBreadcrumbItem>
        <a :href="`/${lang}/compatibility/`">
          {{ i18n.compatibility.COMPATIBILITY }}
        </a>
      </OBreadcrumbItem>
      <OBreadcrumbItem>
        {{ i18n.compatibility.COMPATIBILITY_TITLE }}
      </OBreadcrumbItem>
    </OBreadcrumb>
  </ContentWrapper>
</template>
<style lang="scss" scope>
.o-tab {
  margin-bottom: 40px;
}
.wrapper {
  max-width: 1504px;
  margin: 0 auto;
  padding: 40px var(--e-spacing-h2) 0;
  @media screen and (max-width: 768px) {
    padding: 0 var(--e-spacing-h5);
  }
}

html[lang='zh'] {
  .hardware-wrapper {
    padding-bottom: 0;
  }
}

.banner {
  margin: 0 auto;
  .breadcrumb {
    margin-bottom: var(--e-spacing-h5);
    font-size: var(--e-font-size-h6);
    color: var(--e-color-link1);
    line-height: var(--e-line-height-h5);
    cursor: pointer;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-h7);
      font-size: var(--e-font-size-h7);
    }
  }
  .banner-title {
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    margin-bottom: var(--e-spacing-h1);
    color: var(--e-color-text1);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-h5);
      line-height: var(--e-line-height-h5);
      margin-bottom: var(--e-spacing-h2);
    }
  }
}
.hardware-content {
  max-width: 1504px;
  margin: 0 auto;
  color: var(--e-color-text5);
  font-size: var(--e-font-size-h8);
  line-height: var(--e-line-height-h7);
  background-color: var(--e-color-bg2);
  padding: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--e-spacing-h5);
  }
  a {
    text-decoration: none;
    color: var(--e-color-link1);
    cursor: pointer;
  }
  .hardware-content-top {
    .title {
      font-size: var(--e-font-size-h5);
      color: var(--e-color-text1);
      margin-bottom: var(--e-spacing-h4);
      line-height: var(--e-line-height-h5);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
      }
    }
    .content {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h7);
      color: var(--e-color-text4);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }
  }
  .hardware-content-middle {
    margin-top: var(--e-spacing-h2);
    .title {
      font-size: var(--e-font-size-h5);
      color: var(--e-color-text1);
      margin-bottom: var(--e-spacing-h4);
      line-height: var(--e-line-height-h4);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
      }
    }
    .content-item {
      display: flex;
      padding: var(--e-spacing-h3);
      align-items: center;
      justify-content: left;
      @media screen and (max-width: 768px) {
        padding: var(--e-spacing-h4) 0;
      }
      &:last-child {
        padding-bottom: 0;
        @media screen and (max-width: 768px) {
          padding-bottom: var(--e-spacing-h3);
        }
      }
      .left {
        font-size: var(--e-line-height-h3);
        color: var(--e-color-link1);
        padding-right: var(--e-spacing-h3);
        @media screen and (max-width: 768px) {
          font-size: var(--e-line-height-h4);
          padding-right: var(--e-spacing-h5);
        }
      }
      .right {
        padding-left: var(--e-spacing-h3);
        border-left: 1px solid var(--e-color-border1);
        @media screen and (max-width: 768px) {
          padding-left: var(--e-spacing-h5);
        }
        .item-title {
          color: var(--e-color-text1);
          font-size: var(--e-font-size-h6);
          line-height: var(--e-line-height-h6);
          margin-bottom: var(--e-spacing-h6);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-h7);
          }
        }
        .item-content {
          font-size: var(--e-font-size-h8);
          line-height: var(--e-line-height-h8);
          word-break: break-all;
          color: var(--e-color-text4);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-tip);
          }
        }
      }
    }
  }
}
</style>
