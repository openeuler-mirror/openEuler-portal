<script lang="ts" setup>
import { computed } from 'vue';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';
import IconAddress from '~icons/app-new/icon-address.svg';
import IconTime from '~icons/app-new/icon-time.svg';

import { useCommon } from '@/stores/common';

defineProps({
  topicData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div class="topic">
    <div class="title-img">
      <p class="title-text">{{ topicData.title }}</p>
      <img :src="isDark ? topicData.titleImDark : topicData.titleImg" />
    </div>
    <p class="topic-desc">{{ topicData.desc }}</p>
    <ul class="list">
      <li
        v-for="(item, i) in topicData.list"
        :key="i"
        :style="{
          backgroundImage: `url(${item.bg})`,
        }"
        class="item-topic"
      >
        <div class="item-title">
          <p class="title">{{ item.title }}</p>
          <div class="title-desc">
            <OIcon class="icon"><IconAddress /></OIcon>
            <p class="tips">{{ item.position }}</p>
            <OIcon class="icon"><IconTime /></OIcon>
            <p class="tips">{{ item.time }}</p>
          </div>
        </div>
        <p v-for="(desc, j) in item.desc" :key="j" class="desc">{{ desc }}</p>
        <div class="link">
          <a :href="item.href" target="_blank">
            <span class="text">{{ topicData.text }}</span>
            <OIcon><IconChevronRight /></OIcon>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.topic {
  margin-top: 72px;
  @include respond-to('<=pad_v') {
    margin-top: 40px;
  }
}
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item-topic {
  width: calc(50% - 20px);
  background-color: var(--o-color-fill2);
  background-repeat: no-repeat;
  background-size: 525px 138px;
  padding: 32px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  border-radius: var(--o-radius-xs);
  min-height: 304px;

  .item-title {
    margin-bottom: 16px;
    .title {
      @include h2;
      font-weight: 500;
      color: var(--o-color-info1);
      margin-right: var(--o-gap-4);
    }

    .title-desc {
      display: flex;
      align-items: flex-end;
      margin-top: var(--o-gap-3);
      .icon {
        font-size: var(--o-icon_size-m);
        margin-right: var(--o-gap-1);

        @include respond-to('<=laptop') {
          font-size: var(--o-icon_size-xs);
        }
      }

      .tips {
        @include tip1;
        font-weight: 400;
        margin-right: var(--o-gap-4);
      }
    }
  }

  .desc {
    @include text1;
    text-align: justify;
    font-weight: 400;
    color: var(--o-color-info2);
    &:last-of-type {
      margin-bottom: 16px;
    }
  }
  .link {
    margin-top: auto;
    a {
      display: inline-flex;
      align-items: center;
      color: var(--o-color-info2);
      @media (hover: hover) {
        &:hover {
          color: var(--o-color-link1);
        }
      }
    }
    .text {
      @include text1;
      margin-right: 4px;
    }
    .o-icon {
      font-size: var(--o-icon_size-m);
    }
  }
  &:nth-child(2n) {
    margin-left: 40px;
  }
  &:nth-of-type(1),
  &:nth-of-type(2) {
    margin-top: 0;
  }
}

.item-topic:nth-child(2),
.item-topic:nth-child(5) {
  background-size: 471px 146px;
  background-position: top right;
}

.item-topic:nth-child(1),
.item-topic:nth-child(6) {
  background-position: bottom right;
}

.item-topic:nth-child(4n) {
  background-position: top left;
}

@include respond-to('<=laptop') {
  .item-topic {
    width: calc(50% - 12px);
    min-height: 196px;
    padding: 24px;
    margin-top: 24px;
    &:nth-child(2n) {
      margin-left: 24px;
    }
  }
}

@include respond-to('<=pad') {
  .item-topic {
    width: 100%;
    height: auto !important;
    &:nth-child(2n) {
      margin-left: 0;
    }
    &:nth-of-type(2) {
      margin-top: 24px;
    }
  }
}

@include respond-to('<=pad_v') {
  .item-topic {
    width: 100%;
    min-height: 132px;
    padding: 16px;
    margin-top: 16px;
    background-size: 100%;
    background-position: right bottom;
    &:nth-child(2n) {
      margin-left: 0;
    }
  }
}

.topic-desc {
  @include h4;
  color: var(--o-color-info2);
  text-align: justify;
  margin-bottom: 40px;

  @include respond-to('<=pad_v') {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 16px;
  }
}
</style>
