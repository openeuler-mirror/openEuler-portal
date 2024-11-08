<script setup lang="ts">
import { watch, type PropType } from 'vue';

import { useLocale } from '~@/composables/useLocale';

import {
  linksData,
  linksData2,
  quickNav,
  friendshipLinks,
} from '~@/data/footer';

import { ODivider } from '@opensig/opendesign';
import ContentWrapper from './ContentWrapper.vue';

import LogoFooter from '~@/assets/category/footer/footer-logo2.png';
import LogoFooter1 from '~@/assets/category/footer/footer-logo1.png';
import LogoAtom from '~@/assets/category/footer/atom-logo.svg';

// 公众号、小助手
import CodeTitleXzs from '~@/assets/category/footer/img-xzs.png';
import CodeTitleGzh from '~@/assets/category/footer/img-gzh.png';
import CodeImgXzs from '~@/assets/category/footer/code-xzs.png';
import CodeImgZgz from '~@/assets/category/footer/code-zgz.png';

const props = defineProps({
  lang: {
    type: String as PropType<'zh' | 'en'>,
    default: 'zh',
  },
  target: {
    type: String,
    default: '_blank',
  },
});

const { t, locale } = useLocale();

// 公众号、小助手
const footerCodeList = [
  {
    img: CodeTitleGzh,
    code: CodeImgZgz,
    label: t('footer.qrAssistant'),
  },
  {
    img: CodeTitleXzs,
    code: CodeImgXzs,
    label: t('footer.qrCode'),
  },
];

watch(
  () => props.lang,
  (val) => {
    locale.value = val as 'zh' | 'en';
  },
  { immediate: true }
);
</script>

<template>
  <div class="footer">
    <ContentWrapper :pc-top="0" :mobile-top="0">
      <div class="atom">
        <p class="atom-text">{{ t('footer.atomText') }}</p>
        <a href="https://openatom.cn" target="_blank">
          <img :src="LogoAtom" class="atom-logo" alt="" />
        </a>
      </div>
    </ContentWrapper>
    <div class="footer-content">
      <ContentWrapper :pc-top="0" :mobile-top="0">
        <div class="quick-nav">
          <div v-for="category in quickNav[lang]" class="category">
            <div class="category-title">
              {{ category.title }}
            </div>
            <ul class="navs">
              <li v-for="nav in category.list" class="nav">
                <a :href="nav.link" target="_blank" rel="noopener noreferrer">{{
                  nav.title
                }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="friendship-link">
          <div class="friendship-link-title">
            {{ $t('footer.friendshipLink') }}
          </div>
          <a
            v-for="link in friendshipLinks[lang]"
            class="friendship-link-item"
            :href="link.link"
            target="_blank"
            >{{ link.title }}</a
          >
        </div>
        <div class="inner">
          <div class="footer-logo">
            <img class="show-pc" :src="LogoFooter" alt="" />
            <img class="show-mo" :src="LogoFooter1" alt="" />
            <p>
              <a
                class="email"
                href="mailto:contact@openeuler.io"
                target="_blank"
              >
                contact@openeuler.io
              </a>
            </p>
          </div>
          <div class="footer-option">
            <div class="footer-option-item">
              <template
                v-for="(link, index) in linksData2[lang]"
                :key="link.URL"
              >
                <a :target="target" :href="link.URL" class="link">{{
                  link.NAME
                }}</a>
                <ODivider
                  v-if="index !== linksData2[lang].length - 1"
                  :style="{
                    '--o-divider-bd-color': 'var(--o-color-white)',
                    '--o-divider-label-gap': '0 8px',
                  }"
                  direction="v"
                />
              </template>
            </div>
            <p class="copyright">
              {{
                t('footer.copyRight', {
                  year: new Date().getFullYear(),
                })
              }}
            </p>
            <p class="license">
              <span>{{ t('footer.license_1') }}</span>
              {{ t('footer.license_2') }}
            </p>
          </div>
          <div class="footer-right">
            <div v-if="lang === 'zh'" class="code-box">
              <div
                v-for="(item, index) in footerCodeList"
                :key="index"
                class="code-pop"
              >
                <img :src="item.img" class="code-img" alt="" />
                <div class="code-layer">
                  <img :src="item.code" alt="" />
                  <p class="txt">{{ item.label }}</p>
                </div>
              </div>
            </div>
            <div class="footer-links" :class="{ iszh: lang === 'zh' }">
              <a
                v-for="(item, index) in linksData[lang]"
                :key="item.path"
                :href="item.path"
                class="links-logo"
                target="_blank"
              >
                <img
                  :style="{ height: `${item.height}px` }"
                  :src="item.logo"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color: #fff;
.o-divider {
  @include tip2;
}
.footer {
  background: rgba(18, 18, 18);
  :deep(.app-content) {
    padding-bottom: 0;
  }
  .atom {
    text-align: center;
    padding: 24px 0 12px;
    position: relative;

    .atom-text {
      color: $color;
      @include h4;
    }
    .atom-logo {
      height: 36px;
      margin-top: 12px;
      @include respond-to('<=pad') {
        height: 30px;
      }
    }
  }

  .footer-content {
    @include tip1;
    background: url('~@/assets/category/footer/footer-bg.png') no-repeat bottom
      center;
    @include respond-to('<=pad') {
      background: url('~@/assets/category/footer/footer-bg-mo.png') no-repeat
        bottom center;
    }
    .quick-nav {
      margin: 16px auto 0;
      display: flex;
      justify-content: space-between;
      max-width: 1140px;
      @include respond-to('<=pad') {
        display: none;
      }
      .category {
        .category-title {
          @include h4;
          color: var(--o-color-white);
        }
        .navs {
          display: flex;
          flex-direction: column;
          .nav {
            margin-top: 8px;
            @include tip1;
            a {
              color: rgba(255, 255, 255, 0.6);
              @include hover {
                color: rgba(255, 255, 255, 1);
              }
            }
          }
          .nav:first-child {
            margin-top: 10px;
          }
        }
      }
    }
    .friendship-link {
      margin-top: 16px;
      padding-bottom: 12px;
      display: flex;
      @include tip2;
      //TODO: 颜色变量
      border-bottom: 1px solid rgba(229, 229, 229, 0.12);
      @include respond-to('<=pad') {
      }
      .friendship-link-title {
        color: var(--o-color-white);
        margin-right: 45px;
      }
      .friendship-link-item {
        &:not(:first-of-type) {
          margin-left: 24px;
        }
        color: rgba(255, 255, 255, 0.6);
        @include hover {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .inner {
      display: flex;
      align-items: end;
      justify-content: space-between;
      padding: 18px 0 32px;
      position: relative;
      min-height: 118px;
      @include respond-to('<=pad') {
        margin: 0 auto;
        max-width: 240px;
        padding: 14px 0 24px;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .footer-logo {
    flex: 1;
    img {
      height: 46px;
    }
    .show-pc {
      display: block;
    }
    .show-mo {
      display: none;
    }
    @include respond-to('<=pad') {
      text-align: center;
      margin: 16px 0;
      .show-pc {
        display: none;
      }
      .show-mo {
        display: inline-block;
        height: 20px;
      }
      p {
        margin-top: 4px;
      }
    }
  }

  .copyright {
    margin-top: 6px;
    color: rgba(255, 255, 255, 0.6);
    @include respond-to('phone') {
      margin-top: 4px;
    }
  }
  .license {
    color: $color;
    margin-top: 6px;
    span {
      color: rgba(255, 255, 255, 0.6);
    }
    @include respond-to('phone') {
      margin-top: 4px;
    }
  }

  .footer-option {
    text-align: center;
    @include tip1;
    .link {
      color: $color;
      display: inline-block;
    }
    .footer-option-item {
      display: flex;
      align-items: center;
    }
    @include respond-to('<=pad') {
      order: -1;
    }
  }

  .footer-right {
    flex: 1;
    .code-box {
      display: flex;
      justify-content: right;
      gap: 16px;
      margin-bottom: 16px;
      .code-pop {
        cursor: pointer;
        position: relative;
        height: 20px;
        display: block;
        > img {
          height: 100%;
          object-fit: cover;
        }
        .code-layer {
          position: absolute;
          top: -105px;
          left: -32px;
          z-index: 99;
          display: none;
          background: #fff;
          padding: 6px;
          img {
            width: 78px;
            height: 78px;
          }
          .txt {
            margin-top: 8px;
            color: $color;
            display: none;
          }
          &::after {
            border: 10px solid transparent;
            content: '';
            border-top-color: #fff;
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            display: block;
          }
          @include respond-to('<=pad_v') {
            display: block;
            position: initial;
            background: none;
            padding: 0;
            text-align: center;
            &::after {
              display: none !important;
            }
            .txt {
              display: block;
            }
          }
        }
        &:hover {
          .code-layer {
            display: block;
          }
        }
        @include respond-to('<=pad_v') {
          height: auto;
          > img {
            display: none;
          }
        }
      }
      @include respond-to('<=pad') {
        justify-content: center;
      }
      @include respond-to('<=pad') {
        margin-top: 24px;
      }
    }
    .footer-links {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 16px;
      .links-logo {
        display: flex;
        align-items: center;
        padding: 0 9px;
        height: 40px;
        background-color: #2b2b2f;
        border-radius: var(--o-radius-xs);
        img {
          object-fit: cover;
        }
      }
      @include respond-to('<=pad') {
        justify-content: center;
      }
      @include respond-to('<=pad_v') {
        display: flex;
        text-align: center;
        .img {
          height: 16px;
        }
      }
      &.iszh {
        gap: 12px 8px;
        .links-logo {
          height: 20px;
        }
        @include respond-to('<=pad_v') {
          display: flex;
          flex-wrap: wrap;
          text-align: center;
          margin-top: 21px;
          .img {
            height: 16px;
          }
        }
      }
    }

    p {
      color: $color;
      margin-top: var(--o-spacing-h8);
    }
  }

  .email {
    color: $color;
  }
}

[lang='en'] {
  .footer {
    .footer-content {
      .inner {
        @include respond-to('<=pad') {
          margin: 0 auto;
          max-width: fit-content;
          padding: 14px 0 24px;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
