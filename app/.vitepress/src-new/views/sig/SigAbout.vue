<script lang="ts" setup>
import { ref, computed } from 'vue';

import { aboutSig, applicationProcess } from '~@/data/sig';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { OIcon, OCard, OCollapse, OCollapseItem } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import sigProcess from '~icons/sig/sig-process.svg';
import processImg from '~@/assets/category/sig/process.png';

const { locale } = useLocale();
const { lePadV } = useScreen();

const activeStep = ref(0);

const processDetail = computed(() => {
  return applicationProcess[activeStep.value].detail[locale.value];
});
</script>
<template>
  <AppSection :title="$t('sig.aboutSig')" class="sig-about">
    <div class="sig-about-card-box">
      <OCard
        v-for="(card, idx) in aboutSig"
        :key="idx"
        cursor="pointer"
        class="sig-about-card"
        hoverable
        :title="card.title[locale]"
        :detail="card.subtitle[locale]"
        :title-max-row="2"
        :detail-max-row="2"
        :detail-row="lePadV ? 1 : 2"
        :href="card.path[locale]"
      >
        <template #title>
          <OIcon class="icon">
            <component :is="card.icon"></component>
          </OIcon>
          <div class="title">
            {{ card.title[locale] }}
          </div>
        </template>
        <img :src="card.backgroud" alt="" />
      </OCard>
      <OCard
        v-if="!lePadV"
        :title="$t('sig.applicationProcess')"
        class="application-process"
      >
        <template #title>
          <OIcon class="icon"><sigProcess /> </OIcon>
          <div class="title-box">
            <div class="title">
              {{ $t('sig.applicationProcess') }}
            </div>
            <div class="subtitle">
              {{ $t('sig.applicationProcessSubTitle') }}
            </div>
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
              :class="{ active: index === activeStep }"
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
        <p class="process-detail">{{ processDetail }}</p>
      </OCard>
      <div v-else class="application-process-mo">
        <div class="title">{{ $t('sig.applicationProcess') }}</div>
        <OCollapse
          v-model="activeStep"
          accordion
          :style="{ '--collapse-padding': '0' }"
        >
          <OCollapseItem
            v-for="(step, index) in applicationProcess"
            :key="step.process[locale]"
            :value="index"
          >
            <template #title>
              <div class="process-title">
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
.sig-about {
  .sig-about-card-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    @include respond-to('<=pad_v') {
      grid-template-columns: repeat(1, 1fr);
      gap: 12px;
    }
    .o-card {
      :deep(.o-card-title) {
        display: flex;
        align-items: center;
        .o-icon {
          font-size: var(--o-icon_size-2xl);
        }
        .title {
          margin-left: 12px;
          @include h4;
          font-weight: 500;
        }
      }
    }
    .sig-about-card {
      :deep(.o-card-main) {
        padding-bottom: 0;
      }
      img {
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
          @include tip1;
          color: var(--o-color-info2);
          @include text-truncate(3);
        }
      }
      :deep(.o-card-content) {
        margin-top: 24px;
        .process-box {
          display: flex;
          align-items: center;
          padding: 0 100px;
          justify-content: space-evenly;
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
            margin-left: 2px;
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
              @include tip1;
              color: var(--o-color-info1);
              width: 100%;
              text-align: center;
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
            border-bottom: 18px solid #e9f5fe;
            border-left: 18px solid transparent;
            border-right: 18px solid transparent;
            left: 50%;
            bottom: -24px;
            transform: translateX(-50%);
            margin-top: 24px;
          }
        }
        .process-detail {
          margin-top: 24px;
          padding: 22px 38px;
          background-image: linear-gradient(
            265deg,
            #f6f9ff 0%,
            #e7efff 100%,
            #e9f5fe 100%
          );
          border-radius: var(--o-radius_control-xs);
        }
      }
    }
    .application-process-mo {
      border-radius: var(--o-radius-xs);
      background-color: var(--o-color-fill2);
      padding: 12px 16px;
      .title {
        @include h1;
        font-weight: 500;
      }
      .process-title {
        display: flex;
        @include h4;
        .num {
          margin-right: 12px;
        }
      }
      :deep(.o-collapse-item-body) {
        @include text1;
        margin-bottom: 0;
        padding-bottom: 12px;
      }
    }
  }
  .o-divider {
    --o-divider-label-gap: 0 40px;
    height: auto;
  }
}
</style>
