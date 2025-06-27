<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';
import {
  OBreadcrumb,
  OBreadcrumbItem,
  OLink,
  OIconFile,
  OIcon,
} from '@opensig/opendesign';

import BannerLevel3 from '~@/components/BannerLevel3.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import AppSection from '~@/components/AppSection.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import { useHeaderTitle } from '~@/stores/common';

import banner from '~@/assets/category/sig/sig-role-banner.jpg';
import IconRight from '~icons/sig/icon-right.svg';

import {
  communityMember,
  contributor,
  committer,
  maintainer,
} from '~@/data/sig/role-description';

const { locale, t } = useLocale();
const { lePadV } = useScreen();
const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

const verticalPadding = computed(() => {
  if (lePadV.value) {
    return ['16px', '0'];
  } else {
    return ['32px', '16px'];
  }
});

const sections = [contributor, committer, maintainer];
const getSectionBg = (item: any) => {
  if (lePadV.value) {
    return isDark.value ? item.bgMbDark : item.bgMb;
  } else {
    return isDark.value ? item.bgDark : item.bg;
  }
};

onMounted(() => {
  useHeaderTitle().$patch({ headerTitle: t('sig.roleDescription') });
});
onUnmounted(() => {
  useHeaderTitle().$patch({ headerTitle: '' });
});
</script>

<template>
  <div class="sig-role-description">
    <BannerLevel3
      :background-image="banner"
      :title="t('sig.roleDescription')"
    />

    <ContentWrapper :vertical-padding="verticalPadding">
      <OBreadcrumb class="breadcrumb">
        <OBreadcrumbItem :href="`/${locale}/sig/sig-list/`">{{
          t('sig.sigCenter')
        }}</OBreadcrumbItem>
        <OBreadcrumbItem>{{ t('sig.roleDescription') }}</OBreadcrumbItem>
      </OBreadcrumb>
    </ContentWrapper>

    <!-- 社区成员 -->
    <AppSection
      class="community-member"
      :title="communityMember.title[locale]"
    >
      <template #subtitle>
        <div v-dompurify-html="communityMember.subtitle[locale]"></div>
      </template>
      <div class="member-type-list">
        <div
          v-for="(item, i) in communityMember.types"
          :key="i"
          class="member-type-item"
          :style="{ backgroundImage: `url(${lePadV ? item.bgMb : item.bg})` }"
        >
          <img :src="lePadV ? item.imgTitleMb : item.imgTitle" class="title-img" />
          <div class="member-type-item-title">{{ item.name[locale] }}</div>
          <div class="member-type-item-desc">
            <div>{{ item.responsibilitiy[locale] }}</div>
            <div v-if="item.requirement">{{ item.requirement[locale] }}</div>
          </div>

          <OLink
            class="detail-link"
            :href="`#${item.href}`"
            :icon="OIconFile"
            >{{ communityMember.viewDetail[locale] }}</OLink
          >
        </div>
      </div>

      <div class="member-card-list">
        <div v-for="item in communityMember.cards" class="member-card-item">
          <OIcon class="item-icon"> <component :is="item.icon" /></OIcon>
          <div class="item-right">
            <div class="item-title">{{ item.name[locale] }}</div>
            <div class="item-desc" v-dompurify-html="item.desc[locale]"></div>
          </div>
        </div>
      </div>
    </AppSection>

    <AppSection
      v-for="section in sections"
      class="common-section"
      :id="section.id"
      :title="section.title[locale]"
      :subtitle="section.subtitle[locale]"
    >
      <template #subtitle>
        <div v-for="(item, i) in section.subtitle[locale]" :key="i" v-dompurify-html="item"></div>
      </template>
      <div :class="`common-section-list section-${section.id}`">
        <div
          v-for="(item, i) in section.cards"
          :key="i"
          class="common-section-list-item"
          :style="{ backgroundImage: `url(${getSectionBg(item)})` }"
        >
          <div class="title-wrap">
            <img class="icon-requrement" :src="section.cardPointBg" />
            <div class="title">{{ item.title[locale] }}</div>
          </div>
          <div v-if="item.desc[locale]" class="title-wrap">
            <img class="icon-requrement" style="visibility: hidden" />
            <div class="desc">{{ item.desc[locale] }}</div>
          </div>

          <div class="point-list">
            <div
              v-for="(subItem, subIndex) in item.points[locale]"
              :key="subIndex"
              class="point-list-item"
            >
              <OIcon :class="`icon-right icon-right-${section.id} icon-right-${commonStore.theme}`">
                <IconRight />
              </OIcon>
              <span v-dompurify-html="subItem"></span>
            </div>
            <div v-if="item?.notice">{{ item.notice[locale] }}</div>
          </div>
        </div>
      </div>
    </AppSection>
  </div>
</template>

<style scoped lang="scss">
:deep(.banner-level3 .wrap) {
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

.sig-role-description {
  :deep(.o-breadcrumb-item-separator) {
    font-size: 20px;
  }

  .breadcrumb {
    --breadcrumb-color-hover: var(--o-color-primary1);
    --breadcrumb-color-active: var(--o-color-primary1);
    --breadcrumb-color-selected: var(--o-color-primary1);
    @include respond-to('<=pad_v') {
      display: none;
    }
  }

  :deep(.banner-level3) {
    @include respond-to('<=pad_v') {
      display: none;
    }
  }

  :deep(.section-subtitle) {
    text-align: center;
    white-space: pre-wrap;
  }

  .community-member {
    :deep(.section-wrapper) {
      margin: 0 auto;
    }

    :deep(.section-subtitle) {
      max-width: 1305px;
      @include respond-to('<=pad') {
        white-space: normal;
        text-align: left;
        @include text2;
      }
    }

    .member-type-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 32px;
      color: rgba(var(--o-black));

      @include respond-to('<=laptop') {
        grid-gap: 24px;
      }

      @include respond-to('<=pad') {
        grid-gap: 16px;
      }

      @include respond-to('<=pad_v') {
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 12px;
      }

      .member-type-item {
        display: flex;
        flex-direction: column;
        padding: 24px 32px;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 4px;
        position: relative;

        @include respond-to('<=laptop') {
          padding: 24px;
        }

        @include respond-to('<=pad') {
          padding: 16px;
        }

        @include respond-to('<=pad_v') {
          padding: 16px;
          min-height: 152px;
        }

        .title-img {
          position: absolute;
          width: 54%;
          top: 20px;
          @include respond-to('<=pad') {
            top: 14px;
          }
          @include respond-to('<=pad_v') {
            width: 182px;
          }
        }

        .member-type-item-title {
          font-weight: 500;
          @include h2;
        }

        .member-type-item-desc {
          flex: 1;
          color: rgba(var(--o-black), 0.8);
          @include text1;

          div {
            padding-top: 8px;

            @include respond-to('<=laptop') {
              padding-top: 6px;
            }

            @include respond-to('<=pad') {
              padding-top: 4px;
            }
          }
        }

        .detail-link {
          --link-color: rgba(var(--o-black), 0.8);

          margin-top: 20px;
          @include text1;

          @include respond-to('<=laptop') {
            margin-top: 18px;
          }

          @include respond-to('<=pad') {
            margin-top: 16px;
          }

          @include respond-to('<=pad_v') {
            font-size: var(--e-font-size-text);
          }

          .o-link-prefix {
            @include h2;
          }
        }
      }
    }

    .member-card-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 32px;
      margin-top: 32px;

      @include respond-to('<=laptop') {
        grid-gap: 24px;
        margin-top: 24px;
      }

      @include respond-to('<=pad') {
        grid-gap: 16px;
        margin-top: 16px;
      }

      @include respond-to('<=pad_v') {
        grid-template-columns: repeat(1, 1fr);
        margin-top: 12px;
        grid-gap: 16px;
      }

      .member-card-item {
        display: flex;
        align-items: start;
        padding: 24px 32px;
        background-color: var(--o-color-fill2);
        border-radius: 4px;

        @include respond-to('<=laptop') {
          padding: 20px 28px;
        }

        @include respond-to('<=pad') {
          padding: 16px 24px;
        }

        @include respond-to('<=pad_v') {
          padding: 12px;
        }

        .item-icon {
          font-size: 48px;

          @include respond-to('<=laptop') {
            font-size: 42px;
          }

          @include respond-to('<=pad') {
            font-size: 38px;
          }

          @include respond-to('<=pad_v') {
            font-size: 32px;
          }
        }

        .item-right {
          margin-left: 16px;

          @include respond-to('<=pad_v') {
            margin-left: 12px;
          }

          .item-title {
            font-weight: 500;
            @include h3;
          }

          .item-desc {
            margin-top: 18px;
            @include text1;

            @include respond-to('<=laptop') {
              margin-top: 16px;
            }

            @include respond-to('<=pad') {
              margin-top: 12px;
            }

            @include respond-to('<=pad_v') {
              margin-top: 8px;
            }
          }
        }
      }
    }
  }

  .common-section {
    :deep(.section-subtitle) {
      max-width: 1305px;
      flex-direction: column;
      div + div {
        margin-top: 8px;
      }
      @include respond-to('<=pad') {
        white-space: normal;
      }
    }
    .common-section-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 32px;

      @include respond-to('<=laptop') {
        grid-gap: 24px;
      }

      @include respond-to('<=pad') {
        grid-gap: 16px;
      }

      @include respond-to('<=pad_v') {
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 12px;
      }

      .common-section-list-item {
        padding: 32px 24px;
        background-size: cover;
        background-position: right bottom;
        background-repeat: no-repeat;
        border-radius: 4px;
        background-color: var(--o-color-fill2);

        @include respond-to('<=pad_v') {
          padding: 16px;
        }

        .title-wrap {
          display: flex;
          align-items: center;

          .icon-requrement {
            margin-right: 8px;
            width: 32px;
            @include respond-to('laptop') {
              width: 20px;
            }
            @include respond-to('pad_h') {
              width: 20px;
            }
            @include respond-to('pad_v') {
              width: 18px;
            }
            @include respond-to('phone') {
              width: 16px;
            }
          }

          .title {
            font-weight: 500;
            @include h4;
          }

          .desc {
            margin-top: 16px;
            color: var(--o-color-info2);
            font-weight: 500;
            @include text1;

            @include respond-to('<=pad_v') {
              margin-top: 4px;
            }
          }
        }

        .point-list {
          padding-top: 16px;
          color: var(--o-color-info2);
          @include tip1;

          @include respond-to('<=pad_v') {
            padding-top: 6px;
          }

          .point-list-item {
            display: flex;
            align-items: start;
            padding-bottom: 16px;

            @include respond-to('<=pad_v') {
              padding-bottom: 6px;
            }

            .icon-right {
              margin: 0 8px;
              @include h2;

              @include respond-to('<=laptop') {
                margin: 0 4px;
              }

              @include respond-to('<=pad_v') {
                margin-right: 4px;
              }
            }

            .icon-right-contributor {
              color: #3d14bf;
              &.icon-right-dark {
                color: #5a3acc;
              }
            }

            .icon-right-committer {
              color: #002fa7;
              &.icon-right-dark {
                color: #497af8;
              }
            }

            .icon-right-maintainer {
              color: #f0bc00;
            }
          }
        }
      }
    }

    .section-committer {
      grid-template-columns: 3fr 7fr;

      @include respond-to('<=pad_v') {
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 12px;
      }
    }
  }
}

:deep(.underline-link) {
  --link-color-hover: var(--o-color-primary1);
  --link-underline-x: 100%;

  color: var(--o-color-primary1);
  background: linear-gradient(0deg, var(--link-color-hover), var(--link-color-hover)) no-repeat var(--link-underline-x) bottom;
  background-size: 0 1px;
  transition: background-size var(--o-easing-standard) var(--o-duration-m2);

  @include hover {
    background-size: var(--link-underline-x) 1px;
    background-position-x: left;
  }
}

@include in-dark {
  .sig-role-description .community-member .member-type-list .member-type-item {
    @include img-in-dark;
  }
}
</style>
