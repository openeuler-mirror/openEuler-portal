<script lang="ts" setup>
import { useRouter } from 'vitepress';

import { useI18n } from '@/i18n';

import AppContent from '@/components/AppContent.vue';

const i18n = useI18n();
const router = useRouter();

function goBackPage() {
  const i = router.route.path.lastIndexOf('a');
  router.go(`${router.route.path.substring(0, i)}`);
}
</script>
<template>
  <AppContent :mobile-top="16">
    <div class="banner">
      <div class="breadcrumb" @click="goBackPage">
        {{ i18n.approve.TITLE }} \
      </div>
      <div class="banner-title">
        {{ i18n.approve.STEP_HEAD }}
      </div>
    </div>
    <div class="hardware-content">
      <div class="hardware-content-middle">
        <div class="title">
          {{ i18n.approve.STEP_TITLE }}
        </div>
        <div class="content">
          <div class="content-item">
            <div class="left">
              {{ i18n.approve.STEP_CONTENT[0].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.approve.STEP_CONTENT[0].TITLE }}
              </div>
              <div class="item-content">
                {{ i18n.approve.STEP_CONTENT[0].TEXT_1 }}
                <a
                  :href="i18n.approve.STEP_CONTENT[0].LINK_1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ i18n.approve.STEP_CONTENT[0].LINK_1 }} </a
                >。
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.approve.STEP_CONTENT[1].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.approve.STEP_CONTENT[1].TITLE }}
              </div>
              <div class="item-content">
                {{ i18n.approve.STEP_CONTENT[1].TEXT_1 }}
                <a
                  :href="i18n.approve.STEP_CONTENT[1].LINK_1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ i18n.approve.STEP_CONTENT[1].LINK_1 }} </a
                >。
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">{{ i18n.approve.STEP_CONTENT[2].ID }}</div>
            <div class="right">
              <div class="item-title">
                {{ i18n.approve.STEP_CONTENT[2].TITLE }}
              </div>
              <div class="item-content">
                {{ i18n.approve.STEP_CONTENT[2].TEXT_1 }}
                <a :href="'mailto:' + i18n.approve.STEP_CONTENT[2].LINK_1">
                  {{ i18n.approve.STEP_CONTENT[2].LINK_1 }}
                </a>
                {{ i18n.approve.STEP_CONTENT[2].TEXT_2 }}
                <p>
                  {{ i18n.approve.STEP_CONTENT[2].TEXT_3 }}
                  <a
                    :href="i18n.approve.STEP_CONTENT[2].LINK_2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ i18n.approve.STEP_CONTENT[2].LINK_2 }}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">{{ i18n.approve.STEP_CONTENT[3].ID }}</div>
            <div class="right">
              <div class="item-title">
                {{ i18n.approve.STEP_CONTENT[3].TITLE }}
              </div>
              <div class="item-content">
                {{ i18n.approve.STEP_CONTENT[3].TEXT_1 }}
                <a
                  :href="i18n.approve.STEP_CONTENT[3].LINK_1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ i18n.approve.STEP_CONTENT[3].LINK_1 }}
                </a>
                {{ i18n.approve.STEP_CONTENT[3].TEXT_2 }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">{{ i18n.approve.STEP_CONTENT[4].ID }}</div>
            <div class="right">
              <div class="item-title">
                {{ i18n.approve.STEP_CONTENT[4].TITLE }}
              </div>
              <div class="item-content">
                {{ i18n.approve.STEP_CONTENT[4].TEXT_1 }}
                <a
                  :href="i18n.approve.STEP_CONTENT[4].LINK_1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ i18n.approve.STEP_CONTENT[4].LINK_TEXT }}
                </a>
                {{ i18n.approve.STEP_CONTENT[4].TEXT_2 }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">{{ i18n.approve.STEP_CONTENT[5].ID }}</div>
            <div class="right">
              <div class="item-title">
                {{ i18n.approve.STEP_CONTENT[5].TITLE }}
              </div>
              <div class="item-content">
                {{ i18n.approve.STEP_CONTENT[5].TEXT_1 }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">{{ i18n.approve.STEP_CONTENT[6].ID }}</div>
            <div class="right">
              <div class="item-title">
                {{ i18n.approve.STEP_CONTENT[6].TITLE }}
              </div>
              <div class="item-content">
                {{ i18n.approve.STEP_CONTENT[6].TEXT_1 }}
                <a
                  :href="i18n.approve.STEP_CONTENT[6].LINK_1"
                  rel="noopener noreferrer"
                  >{{ i18n.approve.STEP_CONTENT[6].LINK_1 }}</a
                >
                {{ i18n.approve.STEP_CONTENT[6].TEXT_2 }}
                <a
                  :href="`mailto:${i18n.approve.STEP_CONTENT[6].LINK_2}`"
                  rel="noopener noreferrer"
                  >{{ i18n.approve.STEP_CONTENT[6].LINK_2 }}</a
                >
                {{ i18n.approve.STEP_CONTENT[6].TEXT_3 }}
                <ul class="content-list">
                  <li
                    v-for="item in i18n.approve.STEP_CONTENT[6].TEXT_LITS"
                    :key="item"
                  >
                    {{ item }}
                  </li>
                </ul>
                {{ i18n.approve.STEP_CONTENT[6].TEXT_4 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scope>
.wrapper {
  max-width: 1504px;
  margin: 0 auto;
  padding: var(--e-spacing-h2) var(--e-spacing-h2) 0;
  @media screen and (max-width: 768px) {
    padding: 0 var(--e-spacing-h5);
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
      .content-list {
        padding: 8px;
        li {
          margin-bottom: 4px;
        }
        @media screen and (max-width: 768px) {
          padding: 4px;
          margin-bottom: 2px;
        }
      }
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
