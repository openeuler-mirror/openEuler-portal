<script setup lang="ts">
import { computed } from 'vue';
import { OLink, OButton, OIcon } from '@opensig/opendesign';

import { OEventsCalendar, OEventsApply } from '@opendesign-plus/components';

import AppSection from '~@/components/AppSection.vue';

import IconDone from '~icons/app-new/icon-done.svg';
import IconDownload from '~icons/app-new/icon-download.svg';
import IconOpensource from '~icons/event/icon-opensource.svg';
import IconDeveloper from '~icons/event/icon-developer.svg';
import IconCollege from '~icons/event/icon-college.svg';
import IconRelease from '~icons/event/icon-release.svg';

import activityContent from '#content/activity';
import { foldI18n } from '~@/shared/content';
import { applyData } from '~@/data/event/apply';

const ICON_MAP: Record<string, unknown> = {
  opensource: IconOpensource,
  developer: IconDeveloper,
  college: IconCollege,
  release: IconRelease,
};
const ICON_COLOR: Record<string, unknown> = {
  opensource: '--o-orange-6',
  ecology: '--o-orange-6',
  developer: '--o-cyan-6',
  college: '--o-blue-6',
  release: '--o-kleinblue-6',
};

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { t, locale } = useLocale();
const { leLaptop } = useScreen();

const yearPlan = computed(() => {
  const plan = foldI18n(activityContent.plan, locale.value);
  return plan.map((cat) => {
    let desc = '';
    let list = [];
    if (cat.email) {
      desc = `${cat?.desc}<a href="mailto:${cat.email}">${cat.email}</a>`
    }
    if (cat.id !== 'college' && cat.events) {
      list = cat.events.map(v => {
        const date = ('0' + v.month).slice(-2)
        return {
          ...v,
          date: `2026/${date}/01`,
        }
      })
    } else {
      list = cat.events.map(v => {
        const startDate = ('0' + v.start_month).slice(-2)
        const endDate = ('0' + (v.start_month + v.duration - 1)).slice(-2)
        return {
          ...v,
          date: [`2026/${startDate}/01`, `2026/${endDate}/31`],
          align: 'center',
        }
      })
    }
    return {
      ...cat,
      name: cat?.title,
      desc: desc,
      icon: ICON_MAP[cat.icon] ?? cat.icon,
      color: ICON_COLOR[cat.id],
      data: list,
      isSpanMonth: cat.id === 'college',
    };
  });
});

const applySteps = computed(() => (applyData[locale.value] ?? []) as any[]);

const applySep1 = computed(() => applySteps.value[0]);
const applySep3 = computed(() => applySteps.value[2]);

const btnSize = computed(() => {
  if (leLaptop.value) {
    return 'medium';
  }
  return 'large';
});
</script>

<template>
  <AppSection :title="t('eventOverview.yearplan')">
    <OEventsCalendar :data="yearPlan" />
  </AppSection>
  <AppSection
    v-if="locale === 'zh'"
    :title="t('eventOverview.applyTitle')"
    :subtitle="t('eventOverview.appltDesc')"
    id="activity-apply"
  >
    <OEventsApply :steps="applySteps">
      <template #step1>
        <OButton :href="applySep1.href" class="step1-btn" color="primary" :size="btnSize" round="pill" variant="solid">{{ applySep1.btn }}
        </OButton>
      </template>
      <template #step3>
        <div class="step3">
          <div v-for="(item, i) in applySep3.listData" :key="i" class="item-text">
            <OIcon><IconDone /></OIcon>
            <div v-if="item.href" class="text-link">
              <span>{{ item.title }}</span>
              <OLink
                :href="item.href"
                color="primary"
                variant="text"
                hoverUnderline
              >
                <OIcon><IconDownload /></OIcon
                >{{ t('eventOverview.downloadText') }}
              </OLink>
            </div>
            <div v-else class="text-box">
              <p>{{ item.title }}</p>
              <p class="tips">{{ item.desc }}</p>
            </div>
          </div>
          <div class="img">
            <img class="material2" :src="applySep3.material2" alt="" />
            <img class="material1" :src="applySep3.material1" alt="" />
          </div>
        </div>
      </template>
    </OEventsApply>
  </AppSection>
</template>

<style lang="scss" scoped>
.app-section {
  --o-gap-section: 40px;
  padding-bottom: 32px;

  @include respond('<=laptop') {
    --o-gap-section: 32px;
    padding-bottom: 24px;
  }
  @include respond('pad_h') {
    padding-bottom: 8px;
  }
  @include respond('<=pad_v') {
    --o-gap-section: 32px;
    padding-bottom: 0;
  }

  :deep(.section-subtitle) {
    text-align: center;
  }
}

.step1-btn {
  margin-top: var(--o-gap-4);
}

:deep(.step-3) {
  position: relative;
}
.item-text {
  display: flex;
  align-items: flex-start;
  color: var(--o-color-white);
  margin-top: 8px;
  @include tip1;
  .o-icon {
    margin-top: 3px;
    @include text1;
  }
}
.text-box {
  margin-left: 16px;
}
.text-link {
  margin-left: 16px;
  display: flex;
  align-items: center;
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
    .o-icon {
      margin-top: 0;
    }
  }
  .o-link {
    flex-shrink: 0;
    --link-color-hover: var(--o-color-white);
  }
}
.tips {
  color: var(--o-color-white);
}
.material2 {
  width: 52%;
  position: absolute;
  right: 24px;
  bottom: 146px;
  z-index: 2;
  border-radius: var(--o-radius-xs);
  box-shadow: var(--o-shadow-2);
}
.material1 {
  position: absolute;
  width: 72%;
  left: 24px;
  bottom: 24px;
  z-index: 1;
  border-radius: var(--o-radius-xs);
  box-shadow: var(--o-shadow-2);
}

:deep(.o-link) {
  flex-shrink: 0;
  --link-color: var(--o-color-white);
  --link-color-hover: var(--o-color-white);
}

@include respond('<=pad_v') {
  .img {
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 0 12px;
    margin-top: 12px;
    img {
      width: 50%;
      border-radius: var(--o-radius-xs);
      border: 1px solid var(--o-color-control4);
      position: relative;
      right: auto;
      bottom: auto;
      left: auto;
    }
    img + img {
      margin-left: 8px;
    }
  }
}
</style>
