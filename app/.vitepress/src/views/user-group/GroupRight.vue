<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import GroupRightItem from './GroupRightItem.vue';
const i18n = useI18n();
const rightI18n = computed(() => {
  return i18n.value.group;
});

const commonStore = useCommon();
const theme = computed(() =>
  commonStore.theme === 'light' ? 'light' : 'dark'
);
</script>
<template>
  <div class="group-right">
    <div class="title">{{ rightI18n.RIGHT }}</div>
    <p class="text">
      申请加入用户组审核通过后即为用户组Member角色，通过在用户组积极活跃与贡献，可晋升为Ambassador、
      Co-organizer、 Organizer、OEVP等荣誉角色，并颁发相关证书。
    </p>
    <OContainer class="right-main" :class="theme">
      <ul class="right-title">
        <li v-for="item in rightI18n.RIGHT_TITLE" :key="item">
          <span>{{ item }}</span>
        </li>
      </ul>
      <div class="item organizer">
        <div class="item ambassador">
          <div class="item member">
            <GroupRightItem
              :options="rightI18n.RIGHT_DATA[0]"
              class="member-item"
            />
          </div>
          <GroupRightItem
            :options="rightI18n.RIGHT_DATA[1]"
            class="ambassador-item"
          />
        </div>
        <div class="organizer-item">
          <GroupRightItem :options="rightI18n.RIGHT_DATA[2]" />
        </div>
      </div>
    </OContainer>
  </div>
</template>

<style scoped lang="scss">
.text {
  font-size: var(--e-font-size-text);
  line-height: var(--e-line-height-text);
  color: var(--e-color-text1);
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
  }
}
.right-main {
  --right-bg: rgba(230, 231, 234, 0.3);
  &.dark {
    --right-bg: rgba(64, 111, 231, 0.05);
  }
  padding: 40px;
  margin-top: 40px;
  @media screen and (max-width: 1100px) {
    padding: 24px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 16px;
    padding: 16px;
  }
  .right-title {
    display: flex;
    padding: 0 48px 24px;
    li {
      flex: 1;
      font-size: var(--e-font-size-h6);
      line-height: var(--e-line-height-h6);
      color: var(--e-color-text1);
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -4px;
        height: 2px;
        width: 20px;
        background-color: var(--e-color-brand2);
      }
    }
  }
  .item {
    background-color: var(--right-bg);
    margin-bottom: 16px;
    &.organizer {
      padding: 16px;
      .organizer-item {
        padding: 0 30px;
        @media screen and (max-width: 768px) {
          padding: 0 16px;
        }
      }
    }
    &.ambassador {
      padding: 30px;
      @media screen and (max-width: 768px) {
        padding: 16px;
      }
    }
    &.member {
      padding: 16px 0;
      @media screen and (max-width: 768px) {
        padding: 0;
      }
    }
  }
}
</style>
