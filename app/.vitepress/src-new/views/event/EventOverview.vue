<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  ORow,
  OCol,
  OLink,
  OCard,
  OButton,
  OIcon,
  ODivider,
} from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';

import { yearPlanData, months, applyData } from '~@/data/activity/plan';

import IconDone from '~icons/app-new/icon-done.svg';
import IconDownload from '~icons/app-new/icon-download.svg';
import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const activeNames = ref([
  'opensource',
  'ecology',
  'developer',
  'college',
  'release',
]);

const yearPlan = computed(() => {
  return yearPlanData[locale.value];
});

const applySep1 = computed(() => {
  return [applyData[locale.value][0], applyData[locale.value][1]];
});
const applySep2 = computed(() => {
  return [applyData[locale.value][3], applyData[locale.value][4]];
});
const applySep3 = computed(() => {
  return applyData[locale.value][2];
});

const applyMb = computed(() => {
  return applyData[locale.value];
});

watch(
  () => lePadV.value,
  (val) => {
    if (val) {
      activeNames.value = ['opensource'];
    }
  }
);
</script>

<template>
  <AppSection :title="t('eventOverview.yearplan')">
    <div class="year-plan">
      <ORow
        v-if="!lePadV"
        wrap="nowrap"
        class="months-box"
        :class="[isDark ? 'months-box-dark' : '']"
      >
        <OCol v-for="month in months" :key="month" class="month">
          {{ month }}
        </OCol>
      </ORow>
      <el-collapse v-model="activeNames" class="collapse">
        <el-collapse-item
          v-for="(item, i) in yearPlan"
          :key="i"
          :name="item.id"
        >
          <template #title>
            <div class="header-title-box">
              <OIcon><component :is="item.icon"></component></OIcon>
              <p class="header-title">{{ item.title }}</p>
              <p v-if="!lePadV" class="header-desc">
                <span>{{ item.desc }}</span>
                <OLink
                  color="primary"
                  variant="text"
                  hoverUnderline
                  :href="`mailto:${item.email}`"
                  target="_blank"
                >
                  {{ item.email }}
                </OLink>
              </p>
              <OIcon class="header-right-icon"><IconChevronDown /></OIcon>
            </div>
          </template>
          <div
            v-if="item.id !== 'college' && item.events.length"
            class="content-box"
            :class="[`content-${item.id}`, isDark ? 'content-box-dark' : '']"
          >
            <div
              v-for="(event, e) in item.events"
              :key="e"
              class="item-month"
              :class="{ 'item-divider': e !== 0, 'item-none': !event.actives }"
            >
              <ODivider v-if="lePadV && event.actives" class="divider-mb" />
              <P v-if="lePadV && event.actives" class="month-mb">
                {{ months[e] }}
              </P>
              <div
                v-for="(it, j) in event.actives"
                :key="j"
                class="event-box"
                :class="{ 'event-hover': it.href }"
              >
                <template v-if="it.href">
                  <OLink
                    v-if="lePadV"
                    color="primary"
                    variant="text"
                    class="active-name"
                    :class="{ 'active-name-link': it.href }"
                    :href="it.href"
                    target="_blank"
                  >
                    {{ it.activeName }}
                  </OLink>
                  <p class="location">{{ it.location }}</p>
                  <OLink
                    v-if="!lePadV"
                    color="primary"
                    variant="text"
                    class="active-name"
                    :href="it.href"
                    target="_blank"
                  >
                    {{ it.activeName }}
                  </OLink>
                </template>
                <template v-else>
                  <p v-if="lePadV" class="active-name">{{ it.activeName }}</p>
                  <p class="location">{{ it.location }}</p>
                  <p v-if="!lePadV" class="active-name">{{ it.activeName }}</p>
                </template>
              </div>
            </div>
          </div>
          <div
            v-if="item.id === 'college'"
            class="college-box"
            :class="[`content-${item.id}`, isDark ? 'content-box-dark' : '']"
          >
            <div
              v-for="(colact, c) in item.actives"
              :key="c"
              class="collegee-item"
            >
              <div
                class="item-content"
                :class="[`start${colact.startTime}`, `end${colact.endTime}`]"
              >
                <p>{{ colact.activeName }}</p>
              </div>
            </div>
            <div class="collegee-line">
              <ODivider v-for="num in 11" :key="num" direction="v" />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </AppSection>
  <AppSection
    v-if="!lePadV && locale === 'zh'"
    :title="t('eventOverview.applyTitle')"
    :subtitle="t('eventOverview.appltDesc')"
    id="activity-apply"
  >
    <ORow gap="32px 0" wrap="nowrap">
      <OCol flex="0 0 66%">
        <div>
          <div class="top-card">
            <OCard
              v-for="(item, i) in applySep1"
              :key="i"
              :style="{
                backgroundImage: `url(${isDark ? item.imgDark : item.img})`,
              }"
              class="apply-card"
            >
              <div class="title-box">
                <p class="step">{{ i + 1 }}</p>
                <p class="title">{{ item.title }}</p>
              </div>
              <p v-if="item.desc" class="desc">{{ item.desc }}</p>
              <div v-if="item.email" class="desc">
                {{ item.emailtext1 }}
                <OLink
                  color="primary"
                  variant="text"
                  hoverUnderline
                  :href="`mailto:${item.email}`"
                  target="_blank"
                >
                  {{ item.email }}
                </OLink>
                {{ item.emailtext2 }}
              </div>
              <OButton
                v-if="item.href"
                variant="solid"
                color="primary"
                size="large"
                :href="item.href"
              >
                {{ item.btn }}
              </OButton>
            </OCard>
          </div>
          <OCard
            v-for="(item, i) in applySep2"
            :key="i"
            class="hold-card"
            :style="{
              backgroundImage: `url(${isDark ? item.imgDark : item.img})`,
            }"
            :class="{ 'feedback-card': i === 1 }"
          >
            <div class="title-box">
              <p class="step">{{ i + 4 }}</p>
              <p class="title">{{ item.title }}</p>
            </div>
            <p v-if="item.desc" class="desc">{{ item.desc }}</p>
            <div v-if="item.email" class="desc">
              {{ item.emailtext1 }}
              <OLink
                color="primary"
                variant="text"
                hoverUnderline
                :href="`mailto:${item.email}`"
                target="_blank"
              >
                {{ item.email }}
              </OLink>
              {{ item.emailtext2 }}
            </div>
          </OCard>
        </div>
      </OCol>
      <OCol flex="0 0 33%">
        <OCard
          class="support-card"
          :class="[isDark ? 'support-card-dark' : '']"
        >
          <div class="title-box">
            <p class="step">3</p>
            <p class="title">{{ applySep3.title }}</p>
          </div>
          <p class="text">{{ applySep3.desc }}</p>
          <div v-for="(item, i) in applySep3.list" :key="i" class="item-text">
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
              <p class="tips">{{ item.text }}</p>
            </div>
          </div>
          <img class="material2" :src="applySep3.material2" alt="" />
          <img class="material1" :src="applySep3.material1" alt="" />
        </OCard>
      </OCol>
    </ORow>
  </AppSection>
  <div v-if="lePadV && locale === 'zh'" id="activity-apply" class="section-mb">
    <p class="section-title-mb">{{ t('eventOverview.applyTitle') }}</p>
    <p class="section-desc-mb">
      {{ t('eventOverview.appltDesc') }}
    </p>
    <ORow gap="12px 0" wrap="wrap">
      <OCol flex="0 0 100%" v-for="(item, i) in applyMb" :key="i">
        <div class="apply-col">
          <p class="step">{{ i + 1 }}</p>
          <OCard class="item-card">
            <p class="card-title">{{ item.title }}</p>
            <ODivider />
            <p v-if="item.desc" class="card-desc">{{ item.desc }}</p>
            <div v-if="item.email" class="card-desc">
              {{ item.emailtext1 }}
              <OLink
                color="primary"
                variant="text"
                :href="`mailto:${item.email}`"
                target="_blank"
              >
                {{ item.email }}
              </OLink>
              {{ item.emailtext2 }}
            </div>
            <OButton
              v-if="item.href"
              variant="solid"
              color="primary"
              size="medium"
              :href="item.href"
            >
              {{ item.btn }}
            </OButton>
            <div v-for="(val, j) in item.list" :key="j" class="item-text">
              <OIcon><IconDone /></OIcon>
              <OLink
                v-if="val.href"
                color="primary"
                variant="text"
                class="text-link"
                :href="val.href"
              >
                <OIcon><IconDownload /></OIcon>{{ val.title }}
              </OLink>

              <div v-else class="text-box">
                <p>{{ val.title }}</p>
                <p class="tips">{{ val.text }}</p>
              </div>
            </div>
            <div v-if="item.material2" class="img-mb">
              <img :src="item.material2" alt="" />
              <img :src="item.material1" alt="" />
            </div>
          </OCard>
        </div>
      </OCol>
    </ORow>
  </div>
</template>

<style lang="scss" scoped>
.app-section {
  --o-gap-section: 40px;

  @include respond-to('<=laptop') {
    --o-gap-section: 32px;
  }
  @include respond-to('phone') {
    --o-gap-section: 16px;
  }
}
.months-box {
  background-image: linear-gradient(
    130deg,
    rgba(153, 195, 247, 0.32) 0%,
    rgba(120, 166, 244, 0.32) 49%,
    rgba(127, 148, 251, 0.32) 100%
  );
  color: var(--o-color-info1);
  padding: 12px 0;
  border-radius: var(--o-radius-xs) var(--o-radius-xs) 0 0;
  @include text2;
}
.months-box-dark {
  background: #353539;
}
.month {
  text-align: center;
  flex: 1;
}

:deep(.el-collapse) {
  --el-collapse-content-bg-color: var(--o-color-fill2);
}
:deep(.el-collapse-item__header) {
  height: auto;
  line-height: normal;
  padding: 16px 32px;
  background-color: var(--o-color-fill2);
  @include text2;
  &.is-active {
    border-bottom-color: var(--el-collapse-border-color);
    .header-title-box {
      color: var(--o-color-info1);
    }
    .header-right-icon {
      transform: rotate(180deg);
    }
  }
  .header-title-box {
    display: flex;
    align-items: center;
    width: 100%;
    color: var(--o-color-info2);
  }
  .header-title {
    margin-right: auto;
    @include text-truncate(1);
  }
  .o-icon {
    margin-right: 16px;
    @include h2;
  }
  .header-desc {
    color: var(--o-color-info3);
    margin-right: 16px;
    font-weight: normal;
    @include text1;
  }
  .header-right-icon {
    margin-right: 0;
  }
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
:deep(.el-collapse-item__arrow) {
  display: none;
}

.content-box {
  display: flex;
}
.item-month {
  flex: 1;
  padding: 12px 4px 40px;
}
.item-divider {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background: var(--o-color-control4);
    left: 0;
    top: 0;
  }
}
.event-hover {
  cursor: pointer;
  @include hover {
    .location,
    .active-name {
      color: var(--o-color-link1);
    }
  }
}
.location {
  color: var(--o-color-info3);
  @include tip2;
}
.active-name {
  margin-top: 4px;
  padding: 2px 8px;
  color: var(--o-color-info1);
  background-image: linear-gradient(
    90deg,
    rgba(var(--o-violet-6), 0.09) 0%,
    rgba(var(--o-violet-6), 0.2) 100%,
    rgba(var(--o-mixedgray-1), 1) 100%
  );
  filter: blur(0px);
  border-radius: var(--o-radius-xs);
  @include tip1;
}
.event-box + .event-box {
  margin-top: 12px;
}

.content-developer {
  .active-name {
    background-image: linear-gradient(
      90deg,
      rgba(255, 161, 34, 0.09) 0%,
      rgba(255, 161, 34, 0.2) 100%,
      rgba(var(--o-mixedgray-1), 1) 100%
    );
  }
}
.content-college {
  .item-content {
    background-image: linear-gradient(
      90deg,
      rgba(0, 167, 179, 0.09) 0%,
      rgba(0, 167, 179, 0.2) 100%,
      rgba(var(--o-mixedgray-1), 1) 100%
    );
  }
}
.content-release {
  .active-name {
    background-image: linear-gradient(
      90deg,
      rgba(var(--o-kleinblue-6), 0.09) 0%,
      rgba(var(--o-kleinblue-6), 0.2) 100%,
      rgba(var(--o-mixedgray-1), 1) 100%
    );
  }
}

.college-box {
  padding: 12px 0;
  position: relative;
}
.collegee-item {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  position: relative;
  z-index: 2;
}
.collegee-item + .collegee-item {
  margin-top: 12px;
}
.item-content {
  background-image: linear-gradient(
    90deg,
    rgba(var(--o-cyan-6), 0.47) 0%,
    rgba(var(--o-cyan-6), 1) 100%
  );
  border-radius: var(--o-radius-xs);
  text-align: center;
  color: var(--o-color-info1);
  padding: 6px 0;
  background-color: #fff;
  margin: 0 4px;
  @include tip1;
}

@for $i from 1 through 12 {
  .start#{$i} {
    grid-column-start: $i;
  }
  .end#{$i} {
    grid-column-end: span $i;
  }
}

.collegee-line {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: calc(100% / 24);
  display: flex;
  z-index: 1;
  justify-content: space-around;
  width: calc(100% - 100% / 12);
  .o-divider {
    height: 100%;
  }
}

.top-card {
  display: flex;
  align-items: center;
}
.o-card {
  --card-main-padding: 24px 32px;
}
.apply-card {
  width: calc(50% - 16px);
  height: 320px;
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 474px auto;
}
.apply-card + .apply-card {
  margin-left: 32px;
}
.hold-card {
  margin-top: 32px;
  height: 148px;
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 269px auto;
}
.feedback-card {
  margin-top: 32px;
  height: 171px;
}
.title-box {
  display: flex;
  align-items: flex-start;
}
.step {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--o-color-link1);
  color: var(--o-color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 6px;
  @include tip1;
}
.title {
  color: var(--o-color-info1);
  font-weight: 500;
  margin-left: 12px;
  @include h2;
}
.desc {
  color: var(--o-color-info2);
  margin-top: 16px;
  @include tip1;
}
.o-btn {
  margin-top: 16px;
}

.support-card {
  background-image: linear-gradient(135deg, #351bee 0%, #aad7ff 100%);
  position: relative;
  .step {
    background-color: var(--o-color-white);
    color: var(--o-color-link1);
  }
  .title {
    color: var(--o-color-white);
  }
  .text {
    margin: 16px 0 0 32px;
    color: var(--o-color-white);
    @include tip1;
  }
  .o-link {
    color: var(--o-color-white);
  }
}
.support-card-dark {
  background-color: rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    135deg,
    rgb(53, 27, 238) 0%,
    rgb(170, 215, 255) 100%
  );
  background-blend-mode: color;
}

.item-text {
  display: flex;
  align-items: flex-start;
  color: var(--o-color-white);
  margin-top: 8px;
  @include tip1;
  .o-icon {
    @include text1;
    margin-top: 3px;
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
  width: 235px;
  position: absolute;
  right: 24px;
  bottom: 146px;
  z-index: 2;
  border-radius: var(--o-radius-xs);
  box-shadow: var(--o-shadow-2);
}
.material1 {
  position: absolute;
  width: 327px;
  left: 24px;
  bottom: 24px;
  z-index: 1;
  border-radius: var(--o-radius-xs);
  box-shadow: var(--o-shadow-2);
}

.content-box-dark {
  .active-name,
  .item-content {
    background-image: linear-gradient(
      90deg,
      rgb(63, 63, 67) 0%,
      rgb(43, 43, 47) 100%
    );
  }
}

@include respond-to('laptop') {
  .apply-card {
    height: 270px;
    background-position: center bottom;
    background-size: 380px auto;
  }
  .hold-card {
    height: auto;
    background-size: 216px auto;
    .desc {
      width: 70%;
    }
  }
  .step {
    margin-top: 4px;
  }
  .feedback-card {
    height: auto;
    .desc {
      width: 100%;
    }
  }
  .material2 {
    width: 188px;
    bottom: 118px;
  }
  .material1 {
    width: 262px;
  }
}

@include respond-to('pad_h') {
  .apply-card {
    height: 270px;
    background-position: center bottom;
    background-size: 304px auto;
  }
  .hold-card {
    height: 120px;
    background-size: 172px auto;
    .desc {
      width: 70%;
    }
  }
  .step {
    margin-top: 3px;
  }
  .feedback-card {
    height: auto;
    .desc {
      width: 100%;
    }
  }
  .material2 {
    width: 150px;
    bottom: 95px;
  }
  .material1 {
    width: 210px;
  }
}

@media (min-width: 841px) and (max-width: 960px) {
  .apply-card {
    height: 320px;
  }
  .material2 {
    width: 120px;
    bottom: 95px;
  }
  .material1 {
    width: 180px;
  }
}

@include respond-to('<=pad_v') {
  :deep(.el-collapse-item__header) {
    padding: 12px 16px;
    border-bottom: none;
    border-radius: var(--o-radius-xs);
    &.is-active {
      border-bottom: none;
    }
  }
  :deep(.el-collapse-item__header) {
    .o-icon {
      margin-right: 8px;
    }
    .header-right-icon {
      margin-right: 0;
      font-size: 24px;
    }
  }
  :deep(.el-collapse-item__arrow) {
    margin-right: 0;
  }
  .el-collapse-item + .el-collapse-item {
    margin-top: 12px;
  }
  :deep(.el-collapse-item__wrap) {
    border-bottom: none;
    border-radius: var(--o-radius-xs);
  }
  .content-box {
    flex-direction: column;
    padding: 0 16px 8px;
  }
  .item-month {
    padding: 0;
  }
  .item-divider {
    &::after {
      display: none;
    }
  }
  .item-none {
    display: none;
  }
  .divider-mb {
    --o-divider-gap: 8px;
  }
  .month-mb {
    color: var(--o-color-info2);
    @include text2;
  }
  .event-box {
    margin-top: 8px;
    position: relative;
    margin-left: 12px;
    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 100%;
      background: #3422ff;
      left: -12px;
      top: 0;
    }
  }
  .event-box + .event-box {
    margin-top: 8px;
  }
  .active-name {
    margin-top: 0;
    padding: 0;
    color: var(--o-color-info1);
    background-image: none;
    @include text2;
  }
  .location {
    @include text1;
  }
  .active-name-link {
    color: var(--o-color-link1);
  }

  .content-developer,
  .content-release {
    .active-name {
      background-image: none;
    }
  }

  .content-box-dark {
    .active-name {
      background-image: none;
    }
  }

  .content-developer {
    .event-box {
      &::after {
        background: #ffa122;
      }
    }
  }
  .content-release {
    .event-box {
      &::after {
        background: var(--o-color-link1);
      }
    }
  }

  .section-mb {
    margin-top: 32px;
    padding: 0 24px 32px;
  }
  .section-title-mb {
    color: var(--o-color-info1);
    text-align: center;
    font-weight: 500;
    @include display3;
  }
  .section-desc-mb {
    color: var(--o-color-info2);
    margin-top: 12px;
    @include text1;
  }

  .apply-col {
    display: flex;
    align-items: flex-start;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: calc(100% - 36px);
      top: 48px;
      left: 9px;
      background-color: var(--o-color-control4);
      z-index: 2;
    }
  }
  .section-mb {
    .o-col {
      &:last-of-type {
        .apply-col {
          &::before {
            display: none;
          }
        }
      }
    }
  }
  .step {
    flex-shrink: 0;
    margin: 12px 12px 0 0;
  }
  .item-card {
    --card-main-padding: 0 0 12px;
    width: 100%;
  }
  .card-title {
    color: var(--o-color-info2);
    padding: 13px 16px 0;
    @include text2;
  }
  .card-desc {
    padding: 0 12px;
    @include text1;
  }
  .o-btn {
    margin: 12px 0 0 12px;
  }
  .o-col {
    margin-top: 12px;
  }
  .img-mb {
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 0 12px;
    margin-top: 12px;
    img {
      width: 50%;
      border-radius: var(--o-radius-xs);
      border: 1px solid var(--o-color-control4);
    }
    img + img {
      margin-left: 8px;
    }
  }
  .item-text {
    color: var(--o-color-info2);
    padding: 0 12px;
    @include text1;
    .o-icon {
      @include h2;
      margin-top: 0;
    }
    .o-link {
      :deep(.o-link-label) {
        display: flex;
        align-items: center;
      }
    }
  }
  .text-link {
    margin-left: 4px;
  }
  .tips {
    color: var(--o-color-info2);
  }
}
</style>
