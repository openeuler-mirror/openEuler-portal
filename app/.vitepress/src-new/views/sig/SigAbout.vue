<script lang="ts" setup>
import { ref, computed } from 'vue';

import { aboutSig, applicationProcess } from '~@/data/sig';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { OIcon, OCard, OCollapse, OCollapseItem } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import sigProcess from '~icons/sig/sig-process.svg';
import processImg from '~@/assets/category/sig/process.png';

import sigProcessDark from '~icons/sig/sig-process-dark.svg';

import { useCommon } from '@/stores/common';

const { locale } = useLocale();
const { lePadV } = useScreen();
const commonStore = useCommon();

const activeStep = ref(0);
const activeStepMb = ref([0]);

const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

const processDetail = computed(() => {
  return applicationProcess[activeStep.value].detail[locale.value];
});
</script>
<template>
  <AppSection :title="$t('sig.aboutSig')" class="sig-about">
    <div class="sig-about-card-box">
      <template v-for="(card, idx) in aboutSig" :key="idx">
        <OCard
          v-if="card.path[locale]"
          cursor="pointer"
          class="sig-about-card"
          hoverable
          :title="card.title[locale]"
          :detail="card.subtitle[locale]"
          :title-max-row="2"
          :detail-max-row="2"
          :detail-row="lePadV ? 1 : 2"
          :href="card.path[locale]"
          v-analytics="{
            properties: {
              level1: $t('sig.sigCenter'),
              level2: $t('sig.aboutSig'),
              target: card.title[locale]
            },
            service: 'sig',
          }"
          v-analytics:mouseenter="{
            properties: {
              level1: $t('sig.sigCenter'),
              level2: $t('sig.aboutSig'),
              target: card.title[locale]
            },
            service: 'sig',
          }"
        >
          <template #title>
            <OIcon class="icon">
              <component :is="isDark ? card.iconDark : card.icon"></component>
            </OIcon>
            <div class="title">
              {{ card.title[locale] }}
            </div>
          </template>
          <img :src="card.backgroud" alt="" />
        </OCard>
      </template>
      <OCard
        v-if="!lePadV"
        :title="$t('sig.applicationProcess')"
        class="application-process"
        :detail="$t('sig.applicationProcessSubTitle')"
      >
        <template #title>
          <OIcon class="icon">
            <component :is="isDark ? sigProcessDark : sigProcess"></component>
          </OIcon>
          <div class="title">
            {{ $t('sig.applicationProcess') }}
          </div>
        </template>
        <div class="process-box">
          <template
            v-for="(step, index) in applicationProcess"
            :key="step.process[locale]"
          >
            <div
              @click="activeStep = index"
              class="process-step"
              :class="{
                active: index === activeStep,
                [`step-${index}`]: true,
              }"
              v-analytics="{
                properties: {
                  level1: $t('sig.sigCenter'),
                  level2: $t('sig.aboutSig'),
                  level3: $t('sig.applicationProcess'),
                  target: step.process.zh,
                },
                service: 'sig',
              }"
            >
              <OIcon class="icon">
                <component :is="step.icon"></component>
              </OIcon>
              <div class="step-info">
                <div class="num">
                  {{ (index + 1).toString().padStart(2, '0') }}
                </div>
                <div class="process">{{ step.process[locale] }}</div>
              </div>
            </div>
            <img
              v-if="applicationProcess.length !== index + 1"
              class="process-icon"
              :src="processImg"
              alt=""
            />
          </template>
        </div>
        <p class="process-detail" v-dompurify-html="processDetail"></p>
      </OCard>
      <div v-else class="application-process-mo">
        <div class="title">{{ $t('sig.applicationProcess') }}</div>
        <OCollapse
          v-model="activeStepMb"
          accordion
          :style="{ '--collapse-padding': '0' }"
        >
          <OCollapseItem
            v-for="(step, index) in applicationProcess"
            :key="step.process[locale]"
            :value="index"
          >
            <template #title>
              <div class="process-title" 
              v-analytics="{
                properties: {
                  level1: $t('sig.sigCenter'),
                  level2: $t('sig.aboutSig'),
                  level3: $t('sig.applicationProcess'),
                  target: step.process[locale],
                },
                service: 'sig',
              }">
                <div class="num">
                  {{ (index + 1).toString().padStart(2, '0') }}
                </div>
                {{ step.process[locale] }}
              </div>
            </template>
            {{ step.detail[locale] }}
          </OCollapseItem>
        </OCollapse>
      </div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
@use "sass:color";

.sig-about {
  .sig-about-card-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    @include respond('<=pad_v') {
      grid-template-columns: repeat(1, 1fr);
      gap: 12px;
    }

    .o-card {
      :deep(.o-card-title) {
        display: flex;
        align-items: center;

        .o-icon {
          font-size: var(--o-icon_size-2xl);
          @include respond('<=pad_v') {
            display: none;
          }
        }

        .title {
          margin-left: 12px;
          font-weight: 500;
          @include h4;
          @include respond('<=pad_v') {
            margin-left: 0;
          }
          @include respond('phone') {
            @include h3;
          }
        }
      }
    }

    .sig-about-card {
      :deep(.o-card-main) {
        width: 100%;
        padding-bottom: 0;
        .o-card-main-wrap {
          height: 100%;
          & > div {
            display: flex;
            flex-direction: column;
            flex: 1;
          }
        }
        .o-card-content {
          display: flex;
          flex-direction: column;
          --card-content-text-size: 14px;
          height: 100%;
          @include respond('<=pad_v') {
            --card-content-text-size: 12px;
          }
        }
      }

      img {
        flex: 1;
        margin-top: 8px;
        width: 100%;
        border-radius: var(--o-radius-xs) var(--o-radius-xs) 0 0;
      }
    }

    .application-process {
      grid-column: 1 / -1;

      .title-box {
        margin-left: 12px;

        .title {
          margin: 0;
        }

        .subtitle {
          margin-top: 4px;
          color: var(--o-color-info2);
          @include tip1;
          @include text-truncate(3);
        }
      }

      :deep(.o-card-content) {
        .process-box {
          display: flex;
          align-items: center;
          padding: 0 100px;
          justify-content: space-evenly;
          margin-top: 24px;

          .process-icon {
            height: 4px;
            width: 34px;
          }
        }

        .process-step {
          cursor: pointer;
          display: flex;

          .step-info {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            align-items: center;
            margin-left: 6px;
            height: var(--o-icon_size-2xl);

            .num {
              font-weight: 500;
              font-size: 36px;
              line-height: 36px;
              margin-bottom: calc(-1 * 36px / 2);
              color: var(--o-color-primary4-light);
            }

            .process {
              padding-top: 6px;
              background-color: var(--o-color-fill2);
              color: var(--o-color-info1);
              width: 100%;
              text-align: center;
              @include tip1;
            }
          }

          .icon {
            font-size: var(--o-font_size-display2);
          }
        }

        .active.process-step {
          position: relative;

          .num {
            color: var(--o-color-primary2-light);
          }

          &::after {
            position: absolute;
            content: '';
            border-bottom: 18px solid black;
            border-left: 18px solid transparent;
            border-right: 18px solid transparent;
            left: 50%;
            bottom: -24px;
            transform: translateX(-50%);
            margin-top: 24px;
          }
        }
        // 三角底色与步骤条渐变保持一致
        @for $i from 0 through 5 {
          .step-#{$i} {
            &::after {
              border-bottom-color: color.mix(#f6f9ff, #e7efff, $i * 20%) !important;
            }
          }
        }

        .process-detail {
          margin-top: 24px;
          padding: 22px 32px;
          background-image: linear-gradient(
            265deg,
            #f6f9ff 0%,
            #e7efff 100%,
            #e9f5fe 100%
          );
          border-radius: var(--o-radius_control-xs);
        }
      }

      :deep(.o-card-detail) {
        @include tip1;
      }
    }

    .application-process-mo {
      border-radius: var(--o-radius-xs);
      background-color: var(--o-color-fill2);
      padding: 12px 16px;
      padding-bottom: 0;

      .title {
        font-weight: 500;
        @include h1;
      }

      .process-title {
        display: flex;
        @include h4;

        .num {
          margin-right: 12px;
        }
      }

      :deep(.o-collapse-item-body) {
        margin-bottom: 0;
        padding-bottom: 12px;
        @include text1;
      }
    }
  }

  .o-divider {
    --o-divider-label-gap: 0 40px;

    height: auto;
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

[lang='en'] {
  .sig-about {
    .sig-about-card-box {
      grid-template-columns: 484px auto;
      @include respond('<=laptop') {
        grid-template-columns: 1fr 1fr;
        .o-card {
          grid-column: 1 / -1;
        }
      }
      @include respond('<=pad_v') {
        grid-template-columns: 1fr 1fr;
      }
      .sig-about-card {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
      .application-process {
        grid-column: auto;
        @include respond('<=laptop') {
          grid-column: 1 / -1;
        }
        .process-detail {
          padding: 16px 24px;
          @include tip1;
        }

        .o-card-content {
          .process-box {
            padding: 0;
          }
        }
      }
      .application-process-mo {
        grid-column: 1 / -1;
      }
    }
  }
}

[data-o-theme='e.dark'] {
  .sig-about {
    .sig-about-card-box {
      .sig-about-card {
        img {
          @include img-in-dark;
        }
      }
      .application-process {
        .o-card-content {
          .process-step {
            .num {
              color: #2e3647;
            }
          }

          .active.process-step {
            .num {
              color: #497af8;
            }

            &::after {
              border-bottom: 18px solid #353539;
            }
          }
          @for $i from 0 through 5 {
            .step-#{$i} {
              &::after {
                border-bottom-color: color.mix(#2d2d31, #353539, $i * 20%) !important;
              }
            }
          }

          .process-detail {
            background-image: linear-gradient(
              212deg,
              #2d2d31 0%,
              #353539 100%,
              #e9f5fe 100%
            );
          }
        }
      }
    }
  }
}
</style>
