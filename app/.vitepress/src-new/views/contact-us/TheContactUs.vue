<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OIcon, OCol, OCard, OLink, ODivider } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';
import { useI18n } from '~@/i18n';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';

import illustration from '~@/assets/category/contact/illustration.png';
import banner from '~@/assets/category/contact/banner-bg.jpg';

import IconContact1 from '~icons/app-new/icon-contact1.svg';
import IconContact2 from '~icons/app-new/icon-contact2.svg';
import IconContact3 from '~icons/app-new/icon-contact3.svg';
import IconContact4 from '~icons/app-new/icon-contact4.svg';
import IconContact5 from '~icons/app-new/icon-contact5.svg';
import IconContact6 from '~icons/app-new/icon-contact6.svg';
import IconContact7 from '~icons/app-new/icon-contact7.svg';

import CodeImgXzs from '~@/assets/category/footer/code-xzs.png';
import CodeImgZgz from '~@/assets/category/footer/code-zgz.png';

// follow us
import followCoverZh from '~@/assets/category/contact/follow-zh.jpg';
import followCoverEn from '~@/assets/category/contact/follow-en.jpg';
import ImgX from '~@/assets/category/contact/light/x.png';
import ImgYoutube from '~@/assets/category/contact/light/youtube.png';
import ImgBilibili from '~@/assets/category/contact/light/bilibili.png';
import ImgLinkedin from '~@/assets/category/contact/light/LinkedIn.png';
import ImgXDark from '~@/assets/category/contact/dark/x.png';
import ImgYoutubeDark from '~@/assets/category/contact/dark/youtube.png';
import ImgBilibiliDark from '~@/assets/category/contact/dark/bilibili.png';
import ImgLinkedinDark from '~@/assets/category/contact/dark/LinkedIn.png';
import ImgXPrimary from '~@/assets/category/contact/primary/x.png';
import ImgYoutubePrimary from '~@/assets/category/contact/primary/youtube.png';
import ImgBilibiliPrimary from '~@/assets/category/contact/primary/bilibili.png';
import ImgLinkedinPrimary from '~@/assets/category/contact/primary/LinkedIn.png';

const { isPhone, lePad, lePadV } = useScreen();
const { t, isZh } = useLocale();
const i18n = useI18n();
const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

// 社区联系
const contactData = [
  {
    title: t('contact.communityItem1'),
    email: 'liyang@openatom.org',
    icon: IconContact1,
  },
  {
    title: t('contact.communityItem2'),
    email: 'events@openeuler.sh',
    icon: IconContact2,
  },
  {
    title: t('contact.communityItem3'),
    email: 'marketing@openeuler.org',
    icon: IconContact3,
  },
  {
    title: t('contact.communityItem4'),
    email: 'dev@openeuler.org',
    icon: IconContact4,
  },
];

const flexGap = computed(() =>
  isPhone.value ? '12px 12px' : lePad.value ? '16px 16px' : '32px 32px'
);

// 公众号、小助手
const footerCodeList = [
  {
    code: CodeImgZgz,
    label: '微信公众号',
  },
  {
    code: CodeImgXzs,
    label: '小助手',
  },
];

const followLinks = [
  {
    icon: ImgX,
    iconDark: ImgXDark,
    iconPrimary: ImgXPrimary,
    href: 'https://x.com/openeuler',
    label: 'X',
  },
  {
    icon: ImgLinkedin,
    iconDark: ImgLinkedinDark,
    iconPrimary: ImgLinkedinPrimary,
    href: 'https://www.linkedin.com/company/openeuler',
    label: 'LinkedIn',
  },
  {
    icon: ImgYoutube,
    iconDark: ImgYoutubeDark,
    iconPrimary: ImgYoutubePrimary,
    href: 'https://www.youtube.com/@openeuler',
    label: 'YouTube',
  },
  {
    icon: ImgBilibili,
    iconDark: ImgBilibiliDark,
    iconPrimary: ImgBilibiliPrimary,
    href: 'https://space.bilibili.com/527064077',
    label: 'Bilibili',
  },
];

// 资源推荐
const handyMaterialsList = computed(
  () => i18n.value.contact.handyMaterialsList
);
const handyMaterialsListIcon = [IconContact5, IconContact6, IconContact7];
</script>
<template>
  <BannerLevel2
    :title="$t('contact.bannerTitle')"
    :background-image="banner"
    :illustration="illustration"
  />

  <AppSection
    :title="$t('contact.communityContact')"
    :subtitle="$t('contact.communityContactDesc')"
  >
    <ORow :gap="flexGap" flex-wrap="wrap">
      <OCol
        v-for="(item, index) in contactData"
        :key="item.title"
        :flex="`0 1 ${index === 3 ? '100%' : '33.33%'}`"
        :laptop="{ flex: `0 1 ${index === 3 ? '100%' : '33.33%'}` }"
        :pad="{ flex: '0 1 50%' }"
        :pad-v="{ flex: '0 1 100%' }"
        :phone="{ flex: '0 1 100%' }"
      >
        <OCard
          :title="item.title"
          :icon="item.icon"
          hoverable
          :layout="lePad ? 'h' : 'v'"
          class="community-contact"
          :class="{ other: index === 3 }"
        >
          <template #detail>
            <template v-if="index === 3">
              <i18n-t
                keypath="contact.communityItem4Desc1"
                tag="p"
                class="other-text"
              >
                <template #email>
                  <a :href="`mailto:${item.email}`" class="">{{
                    item.email
                  }}</a>
                </template>
              </i18n-t>
              <i18n-t
                class="other-text"
                keypath="contact.communityItem4Desc2"
                tag="p"
              >
                <template #forum>
                  <span v-if="isZh" class="wx">微信号 openeuler123</span>
                  <span v-else>
                    <a
                      href="https://forum.openeuler.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      >forum.</a
                    >
                  </span>
                </template>
              </i18n-t>
            </template>
            <a v-else :href="`mailto:${item.email}`">{{ item.email }}</a>
          </template>
        </OCard>
      </OCol>
    </ORow>
  </AppSection>

  <!-- 欢迎关注我们 -->
  <AppSection :title="$t('contact.followUs')">
    <div class="follow-us" :class="isZh ? 'zh' : 'en'">
      <div class="follow-us-cover">
        <img
          :src="isZh ? (lePadV ? followCoverEn : followCoverZh) : followCoverEn"
          class="cover"
        />
      </div>
      <div class="follow-us-content">
        <h3>{{ $t('contact.followUsDesc') }}</h3>
        <div v-if="isZh" class="follow-us-box">
          <div class="code-box">
            <div
              v-for="item in footerCodeList"
              :key="item.label"
              class="code-img"
            >
              <img :src="item.code" />
              <p>{{ item.label }}</p>
            </div>
          </div>
          <ODivider :direction="isPhone ? 'h' : 'v'" class="line" />
          <div class="follow-link">
            <div
              v-for="item in followLinks"
              :key="item.href"
              class="follow-link-item"
            >
              <img :src="isDark ? item.iconDark : item.icon" />
              <OLink
                hoverUnderline
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                >{{ item.label }}
              </OLink>
            </div>
          </div>
        </div>
        <!-- 英文内容 -->
        <div v-else class="follow-us-box">
          <ODivider :direction="lePadV ? 'h' : 'v'" class="line" />
          <div class="follow-link">
            <OLink
              hoverUnderline
              v-for="item in followLinks"
              :key="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="follow-link-item"
            >
              <img class="default" :src="item.iconDark" />
              <img class="hover" :src="item.iconPrimary" />
              {{ item.label }}
            </OLink>
          </div>
        </div>
      </div>
    </div>
  </AppSection>

  <!-- 资源推荐 -->
  <AppSection :title="$t('contact.handyMaterials')">
    <ORow :gap="flexGap" flex-wrap="wrap">
      <OCol
        v-for="(item, index) in handyMaterialsList"
        :key="item.title"
        flex="0 1 33.33%"
        :laptop="{ flex: '0 1 33.33%' }"
        :pad="{ flex: '0 1 50%' }"
        :pad-v="{ flex: '0 1 100%' }"
        :phone="{ flex: '0 1 100%' }"
      >
        <OCard
          :title="item.title"
          :detail="lePadV ? '' : item.desc"
          :detail-row="lePadV ? '' : 3"
          layout="h"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          hoverable
          :icon="handyMaterialsListIcon[index]"
          class="handy-materials"
        >
        </OCard>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.follow-us {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 370px;
  border-radius: 4px;
  overflow: hidden;
  &.zh {
    background: var(--o-color-fill2);
    .follow-us-cover {
      img {
        @include respond-to('pad_h') {
          height: 100%;
        }
        @include respond-to('phone') {
          height: 84px;
        }
      }
    }
  }
  &.en {
    height: 225px;
    @include respond-to('<=pad') {
      padding: 0;
      height: 124px;
    }
    @include respond-to('<=pad_v') {
      height: 150px;
    }

    .follow-us-cover {
      position: absolute;
      inset: 0;
      width: 100%;
      img {
        @include respond-to('<=pad') {
          height: auto;
        }
        @include respond-to('<=pad_v') {
          height: 100%;
        }
      }
    }
    .follow-us-content {
      position: relative;
      z-index: 2;
      flex-direction: inherit;
      align-items: center;
      @include respond-to('<=pad_v') {
        padding: 16px;
        align-items: flex-start;
        flex-direction: column;
      }
      h3 {
        color: #fff;
        width: 225px;
        @include respond-to('laptop') {
          width: 150px;
          @include h1;
        }
        @include respond-to('<=pad') {
          width: 123px;
          @include h2;
        }
        @include respond-to('<=pad_v') {
          width: 100%;
          text-align: left;
        }
      }
      .follow-us-box {
        flex: 1;
        align-items: center;
        width: 100%;
        @include respond-to('<=pad') {
          margin: 0;
        }
        @include respond-to('<=pad_v') {
          margin-top: 20px;
        }
        .line {
          margin-top: 0;
          --o-divider-bd-color: rgba(255, 255, 255, 0.25);

          @include respond-to('<=pad_v') {
            display: none;
          }
        }
        .follow-link {
          width: 100%;
          display: flex;
          justify-content: space-around;
          padding: 0;
          .follow-link-item {
            @include h3;
            text-align: center;
            color: #fff;
            @include respond-to('phone') {
              @include text2;
            }
            img {
              height: 56px;
              margin: 0 auto 8px;
              display: block;

              @include respond-to('<=pad') {
                height: 32px;
              }
              &.hover {
                display: none;
              }
            }
            &:hover {
              color: var(--link-color-hover);
              .default {
                display: none;
              }
              .hover {
                display: block;
              }
            }
          }
        }
      }
    }
  }
  @include respond-to('laptop') {
    height: 314px;
  }
  @include respond-to('pad_h') {
    height: 203px;
  }
  @include respond-to('<=pad_v') {
    flex-direction: column;
    padding: 8px;
    height: auto;
  }

  .follow-us-cover {
    order: 2;
    width: 657px;
    height: 100%;
    @include respond-to('laptop') {
      width: 557px;
    }
    @include respond-to('pad_h') {
      width: 360px;
    }
    @include respond-to('<=pad_v') {
      display: none;
    }
    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;

      @include respond-to('<=pad') {
        border-radius: 4px;
      }
    }
  }
  .follow-us-content {
    padding: 48px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;

    @include respond-to('laptop') {
      padding: 48px 40px;
    }
    @include respond-to('<=pad') {
      padding: 28px;
    }
    @include respond-to('<=pad_v') {
      padding: 12px 8px;
    }
    h3 {
      color: var(--o-color-info1);
      font-weight: 500;
      @include h1;
      @include respond-to('phone') {
        text-align: center;
      }
    }
    .follow-us-box {
      display: flex;
      align-items: center;
      @include respond-to('<=pad') {
        margin-top: 24px;
        justify-content: space-between;
      }
      @include respond-to('<=pad_v') {
        margin-top: 16px;
      }
      @include respond-to('phone') {
        flex-direction: column;
        margin-top: 12px;
      }

      .code-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        .code-img + .code-img {
          margin-left: 24px;
          @include respond-to('pad_h') {
            margin-left: 12px;
          }
          @include respond-to('phone') {
            margin-left: 0;
          }
        }

        @include respond-to('<=pad_v') {
          justify-content: flex-start;
        }
        @include respond-to('phone') {
          width: 100%;
          justify-content: space-evenly;
        }
        p {
          color: var(--o-color-info1);
          margin-top: 8px;
          @include text1;
          @include respond-to('pad_h') {
            @include tip1;
          }
        }
        img {
          width: 124px;
          height: 124px;
          border-radius: 4px;
          border: 1px solid var(--o-color-control4);

          @include respond-to('pad_h') {
            width: 68px;
            height: 68px;
          }

          @include respond-to('<=pad_v') {
            width: 114px;
            height: 114px;
          }
        }
      }
      .line {
        height: 85px;
        margin: 0 48px;
        @include respond-to('pad') {
          height: 55px;
          margin: 0 16px;
        }

        @include respond-to('phone') {
          height: auto;
          margin: 12px 0;
        }
      }
      .follow-link {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        @include respond-to('<=pad') {
          width: 50%;
        }
        @include respond-to('pad_h') {
          gap: 16px;
        }
        @include respond-to('<=pad_v') {
          padding: 0;
          gap: 16px;
        }
        @include respond-to('phone') {
          width: 100%;
        }

        .follow-link-item {
          display: flex;
          align-items: center;
          @include text1;
          @include respond-to('phone') {
            justify-content: center;
          }
          img {
            height: 24px;
            margin-right: 16px;
            @include respond-to('pad_h') {
              height: 16px;
            }
          }
        }
      }
    }
  }
}
:deep(.o-card) {
  --card-radius: 4px;
  height: 100%;

  &.community-contact {
    @include respond-to('<=pad_v') {
      --card-main-padding: 16px;
    }

    .o-card-icon {
      --card-icon-size: 48px;
      @include respond-to('<=pad') {
        --card-icon-size: 40px;
      }
      @include respond-to('<=pad_v') {
        --card-icon-size: 32px;
      }
      svg {
        width: var(--card-icon-size);
        height: var(--card-icon-size);
      }
    }
    .o-card-header {
      @include respond-to('<=pad_v') {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
  &.handy-materials {
    &:hover {
      .o-card-title {
        color: var(--o-color-primary1);
      }
    }
    .o-card-icon {
      --card-icon-size: 40px;
      height: var(--card-icon-size);
      @include respond-to('<=pad') {
        --card-icon-size: 32px;
      }
      svg {
        width: var(--card-icon-size);
        height: var(--card-icon-size);
      }
    }
    .o-card-main-wrap {
      @include respond-to('<=pad_v') {
        height: 32px;
        .o-card-header {
          line-height: 32px;
        }
      }
    }
  }
  &.other {
    .o-card-main {
      position: relative;
      .o-card-header {
        position: absolute;
        top: 24px;
        left: calc(32px + 48px + 16px);
        height: 48px;
        display: flex;
        align-items: center;
        @include respond-to('<=laptop') {
          top: 16px;
          left: calc(24px + 32px + 16px);
          height: 32px;
        }
        @include respond-to('<=pad') {
          position: inherit;
          height: auto;
        }
      }
      .o-card-content {
        @include respond-to('>pad') {
          margin-top: 0;
        }
      }
      .other-text {
        color: var(--o-color-info2);
        a,
        span {
          @include respond-to('<=pad_v') {
            display: block;
            margin-top: 4px;
          }
        }
        .wx {
          color: var(--o-color-info1);
        }
      }
      .other-text + .other-text {
        margin-top: 12px;
        @include respond-to('<=pad') {
          margin-top: 4px;
        }
      }
      .o-card-icon {
        @include respond-to('<=pad_v') {
          display: none;
        }
      }
    }
  }
}
</style>
