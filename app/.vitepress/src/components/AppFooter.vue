<script setup lang="ts">
import { computed, toRefs, ref, onMounted } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useI18n } from '@/i18n';
import AppContent from '@/components/AppContent.vue';

import LogoFooter from '@/assets/common/footer/footer-logo2.png';
import LogoFooter1 from '@/assets/common/footer/footer-logo1.png';
import LogoAtom from '@/assets/common/footer/atom-logo.svg';
import FooterBg from '@/assets/common/footer/footer-bg.png';
import FooterBgMo from '@/assets/common/footer/footer-bg-mo.png';

// 中文友情链接
import LogoBilibili from '@/assets/common/footer/bilibili.png';
import LogoInfoq from '@/assets/common/footer/infoq.png';
import LogoJuejin from '@/assets/common/footer/juejin.png';
import LogoOschina from '@/assets/common/footer/oschina.png';
import LogoCsdn from '@/assets/common/footer/csdn.png';
import Logo51cto from '@/assets/common/footer/51cto.png';

// 英文、俄文友情链接
import LogoRedditSquare from '@/assets/common/footer/reddit-square@2x.png';
import LogoBilibili2 from '@/assets/common/footer/bilibili@2x.png';
import LogoLinkedin from '@/assets/common/footer/linkedin@2x.png';
import LogoYoutube from '@/assets/common/footer/youtube@2x.png';
import LogoTwitter from '@/assets/common/footer/twitter@2x.png';

// 公众号、小助手
import CodeTitleXzs from '@/assets/common/footer/img-xzs.png';
import CodeTitleGzh from '@/assets/common/footer/img-gzh.png';
import CodeImgXzs from '@/assets/common/footer/code-xzs.png';
import CodeImgZgz from '@/assets/common/footer/code-zgz.png';

const { lang, frontmatter } = useData();
const i18n = useI18n();
const router = useRouter();
const isQrTipVisible = ref(false);

// 友情链接
const linksData = {
  zh: [
    {
      path: 'https://my.oschina.net/openeuler',
      logo: LogoOschina,
      id: 'oschina',
    },
    {
      path: 'https://blog.csdn.net/openEuler_?spm=1000.2115.3001.5343',
      logo: LogoCsdn,
      id: 'csdn',
    },
    {
      path: 'https://juejin.cn/user/3183782863845454',
      logo: LogoJuejin,
      id: 'juejin',
    },
    {
      path: 'https://space.bilibili.com/527064077/channel/series',
      logo: LogoBilibili,
      id: 'bilibili',
    },
    {
      path: 'https://www.infoq.cn/profile/6E6CE3E2316F28/publish',
      logo: LogoInfoq,
      id: 'infoq',
    },
    {
      path: 'https://blog.51cto.com/u_14948868',
      logo: Logo51cto,
      id: '51cto',
    },
  ],
  en: [
    {
      path: 'https://www.reddit.com/r/openEuler/',
      logo: LogoRedditSquare,
      id: 'reddit-square',
    },
    {
      path: 'https://www.linkedin.com/company/openeuler',
      logo: LogoLinkedin,
      id: 'linkedin',
    },
    {
      path: 'https://twitter.com/openEuler',
      logo: LogoTwitter,
      id: 'twitter',
    },
    {
      path: 'https://space.bilibili.com/527064077/channel/series',
      logo: LogoBilibili2,
      id: 'bilibili',
    },
    {
      path: 'https://www.youtube.com/channel/UCPzSqXqCgmJmdIicbY7GAeA',
      logo: LogoYoutube,
      id: 'youtube',
    },
  ],
};
const footerLinks = computed(() => {
  if (lang.value === 'en') {
    return linksData.en;
  } else {
    return linksData.zh;
  }
});

// 公众号、小助手
const footerCodeList = [
  {
    img: CodeTitleXzs,
    code: CodeImgXzs,
    label: i18n.value.common.FOOTER.QR_CODE,
  },
  {
    img: CodeTitleGzh,
    code: CodeImgZgz,
    label: i18n.value.common.FOOTER.QR_ASSISTANT,
  },
];

// 背景
const footBg = {
  pc: `url(${FooterBg})`,
  mo: `url(${FooterBgMo})`,
};

// 迁移专区
const isMigration = computed(() => {
  return (
    frontmatter.value.category === 'migration' ||
    router.route.path.split('/')[2] === 'migration'
  );
});
const isAbout = computed(() => {
  return frontmatter.value.category === 'about-us';
});

const isWiki = computed(() => {
  return frontmatter.value.category === 'wiki';
});

onMounted(() => {
  isQrTipVisible.value = localStorage.getItem('euler-feedback') ? false : true;
});
</script>

<template>
  <footer
    class="footer"
    :class="{ 'is-doc': isMigration || isAbout || isWiki }"
  >
    <AppContent :pc-top="0" :mobile-top="0">
      <div class="atom">
        <p class="atom-text">{{ i18n.common.FOOTER.ATOM_TEXT }}</p>
        <a href="https://openatom.cn" rel="noopener noreferrer" target="_blank">
          <img :src="LogoAtom" class="atom-logo" alt="openEuler" />
        </a>
      </div>
    </AppContent>
    <div class="footer-content">
      <AppContent :pc-top="0" :mobile-top="0">
        <div class="inner">
          <div class="footer-logo">
            <img class="show-pc" :src="LogoFooter" alt="openEuler" />
            <img class="show-mo" :src="LogoFooter1" alt="openEuler" />
            <a class="email" :href="'mailto:' + i18n.common.FOOTER.MAIL">
              {{ i18n.common.FOOTER.MAIL }}
            </a>
          </div>
          <div class="footer-option">
            <div class="footer-option-item">
              <a
                v-for="link in i18n.common.FOOTER.RIGHT_LIST"
                :key="link.URL"
                :href="`/${lang}${link.URL}`"
                class="link"
                >{{ link.NAME }}</a
              >
            </div>
            <p class="copy-right">{{ i18n.common.FOOTER.COPY_RIGHT }}</p>
            <p class="license">
              <span>{{ i18n.common.FOOTER.LICENSED_1 }}</span>
              {{ i18n.common.FOOTER.LICENSED_2 }}
            </p>
          </div>
          <div class="footer-right">
            <div v-if="lang === 'zh'" class="code-box">
              <div
                v-for="(item, index) in footerCodeList"
                :key="index"
                class="code-pop"
              >
                <img :src="item.img" class="code-img" alt="openEuler" />
                <div class="code-layer">
                  <img :src="item.code" alt="openEuler" />
                  <p class="txt">{{ item.label }}</p>
                </div>
              </div>
            </div>
            <div class="footer-links" :class="{ iszh: lang === 'zh' }">
              <a
                v-for="item in footerLinks"
                :key="item.id"
                :href="item.path"
                class="links-logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img :src="item.logo" alt="openEuler" />
              </a>
            </div>
          </div>
        </div>
      </AppContent>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$color: #fff;
.footer {
  background: var(--e-color-greyblack1);
  &.is-doc {
    margin-left: 300px;
    @media (max-width: 1100px) {
      margin-left: 0;
    }
  }
  :deep(.app-content) {
    padding-bottom: 0;
  }
  .cookie-privacy {
    line-height: 48px;
    width: 100%;
    height: 48px;
    background-color: var(--e-color-bg1);
    color: var(--e-color-text3);
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    box-shadow: var(--e-shadow-l1);
    text-align: center;
    @media screen and (max-width: 1000px) {
      font-size: 12px;
      line-height: 20px;
    }
    @media screen and (max-width: 760px) {
      display: block;
      padding-left: 12px;
      padding-right: 36px;
      padding-top: 4px;
      height: auto;
    }
    .link {
      cursor: pointer;
      text-decoration: solid;
      white-space: pre;
      @media screen and (max-width: 760px) {
        display: block;
      }
    }
    .icon {
      cursor: pointer;
      vertical-align: middle;
      margin-left: 16px;
      width: 24px;
      height: 24px;
      background: var(--e-color-greyblack3);
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 20px;
        color: var(--el-color-white);
      }
      @media screen and (max-width: 760px) {
        width: 20px;
        height: 20px;
        margin-left: 12px;
        position: absolute;
        top: 12px;
        right: 12px;
      }
    }
  }
  .atom {
    text-align: center;
    padding: var(--e-spacing-h3) 0 var(--e-spacing-h4);
    position: relative;
    border-bottom: 1px solid rgba(229, 229, 229, 0.12);
    @media (max-width: 1440px) {
      padding: var(--e-spacing-h4) 0;
    }

    &-text {
      font-size: var(--e-font-size-h6);
      font-weight: 400;
      color: $color;
      line-height: var(--e-line-height-h6);
      @media (max-width: 1440px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }
    &-logo {
      height: 48px;
      margin-top: 16px;
      @media (max-width: 1100px) {
        height: 38px;
      }
    }
  }

  &-content {
    background: v-bind('footBg.pc') no-repeat bottom center;
    @media (max-width: 767px) {
      background: v-bind('footBg.mo') no-repeat bottom center;
    }
    .inner {
      display: flex;
      align-items: end;
      justify-content: space-between;
      padding: 18px 0 32px;
      position: relative;
      min-height: 118px;
      @media (max-width: 1400px) {
        padding: var(--e-spacing-h4) 0;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  &-logo {
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
    @media (max-width: 1400px) {
      text-align: center;
      margin: 16px 0;
      .show-pc {
        display: none;
      }
      .show-mo {
        display: inline-block;
        height: 20px;
      }
    }
  }

  .copy-right {
    font-size: var(--e-font-size-text);
    color: $color;
    margin-top: var(--e-spacing-h5);
    @media (max-width: 1400px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h8);
    }
  }
  .license {
    font-size: var(--e-font-size-text);
    color: $color;
    margin-top: var(--e-spacing-h5);
    span {
      color: var(--e-color-text-secondary);
    }
    @media (max-width: 1400px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h8);
    }
  }

  .footer-option {
    text-align: center;
    .link {
      color: $color;
      font-size: var(--e-font-size-text);
      display: inline-block;
      padding: 0 var(--e-spacing-h6);
      border-right: 1px solid $color;
      &:last-child {
        border-right: 0;
      }
      @media (max-width: 1400px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        padding: 0 var(--e-spacing-h9);
      }
    }
    @media (max-width: 1400px) {
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
            font-size: 12px;
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
          @media (max-width: 800px) {
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
        @media (max-width: 800px) {
          height: auto;
          > img {
            display: none;
          }
        }
      }
      @media (max-width: 1400px) {
        justify-content: center;
      }
      @media (max-width: 1100px) {
        margin-top: 24px;
      }
    }
    .footer-links {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 16px;
      .links-logo {
        height: 16px;
        img {
          height: 100%;
          object-fit: cover;
        }
      }
      @media (max-width: 1100px) {
        justify-content: center;
      }
      @media (max-width: 800px) {
        display: flex;
        text-align: center;
        .img {
          height: 16px;
        }
      }
      &.iszh {
        gap: 10px;
        .links-logo {
          height: 14px;

          &:first-child {
            height: 18px;
          }
        }
        @media (max-width: 800px) {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          text-align: center;
          margin-top: 40px;
          .img {
            height: 16px;
          }
        }
      }
    }

    p {
      color: $color;
      font-size: var(--e-font-size-tip);
      margin-top: var(--e-spacing-h8);
    }
  }

  .email {
    display: block;
    margin-top: 4px;
    color: $color;
    font-size: var(--e-font-size-text);
    @media (max-width: 1400px) {
      font-size: var(--e-font-size-tip);
    }
  }
  .float-right {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 70vh;
    right: 50px;
    z-index: 10;
    box-shadow: var(--e-shadow-l1);
    .nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 50px;
      height: 50px;
      background-color: var(--e-color-bg2);
      background-size: cover;
      font-size: 12px;
      line-height: 18px;
      color: var(--e-color-text1);
      .text {
        word-spacing: 100vw;
        display: none;
      }
      .o-icon {
        font-size: 24px;
      }
      &:hover {
        color: var(--e-color-white);
        background-color: var(--e-color-black);
        .o-icon {
          display: none;
        }
        .text {
          display: block;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  .float-left {
    left: 40px;
    right: inherit;
    box-shadow: none;
    .close {
      cursor: pointer;
      position: absolute;
      width: 25px;
      height: 25px;
      top: 0;
      right: 0;
      z-index: 11;
    }
    img {
      width: 150px;
    }
  }
  .dark-nav {
    .nav-item {
      &:hover {
        background-color: var(--e-color-white);
        color: var(--e-color-black);
      }
    }
  }
  .investigation {
    left: 50px;
    right: inherit;
    @media screen and (max-width: 1430px) {
      display: block;
      bottom: 50px;
      // left: 50%;
      // transform: translateX(-50%);
    }
    .icon {
      cursor: pointer;
      position: absolute;
      right: -10px;
      top: -10px;
      width: 20px;
      color: var(--e-color-text1);
    }
  }
}
</style>
