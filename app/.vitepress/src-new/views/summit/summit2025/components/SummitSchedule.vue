<script lang="ts" setup>
import { computed } from 'vue';

import IconAddress from '~icons/app-new/icon-address.svg';
import IconTime from '~icons/app-new/icon-time.svg';

import { useCommon } from '@/stores/common';

defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
  dateIndex: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    default: '',
  },
  tableLayout: {
    type: Boolean,
    default: true,
  }
});

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div v-if="tableLayout">
    <div v-for="(item, i) in options" :key="i" class="item-row" :class="{'item-row-dark': isDark}">
      <div class="time-box">
        <IconTime v-show="item.time" />
        <span class="time">{{ item.time }}</span>
      </div>
      <div class="content">
        <div v-for="(text, t) in item.content" :key="t" class="item-content">
          <span v-if="text?.title" class="item-title">{{ text.title }}</span>
          <div v-if="text?.titles" class="item-title item-titles">
            <p v-for="txt in text?.titles" :key="txt" :class="text?.class">{{ txt }}</p>
          </div>
          <div class="guest-list">
            <template v-if="text?.guest">
              <div v-for="(guest, g) in text.guest" :key="g" class="item-guest">
                <span class="name">{{ guest.name }}</span>
                <span class="post">{{ guest.post }}</span>
              </div>
            </template>
            <div v-else class="item-guest">
              <span class="name">{{ text.name }}</span>
              <span class="post">{{ text.post }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!tableLayout">
    <div v-for="(item, i) in options" :key="i" class="item-agent">
      <div class="title-content">
        <p class="title">{{ item.title }}</p>
        <div class="subtitle-content">
          <p class="name">{{ item.name }}</p>
          <p class="post">{{ item.post }}</p>
        </div>
      </div>
      <div class="bottom">
        <div v-if="address" class="item-bottom">
          <span class="item-date"><IconAddress /><span>{{ address }}</span></span>
        </div>
        <div class="item-bottom">
          <span class="item-date"><IconTime /><span>{{ dateIndex === 0 ? '2025/11/14' : '2025/11/15' }}</span></span>
          <span class="time">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-row {
  display: flex;
  align-items: flex-start;
  color: var(--o-color-info1);
  padding: 24px;
  border-bottom: 1px solid rgba(0, 47, 167, 0.1);
  @include text1;
  &:last-child {
    border-bottom: none;
  }
  .time-box {
    width: 156px;
    display: flex;
    align-items: center;
  }
  .time {
    width: 120px;
    margin-left: 12px;
  }
  .content {
    flex: 1;
    margin-left: 32px;
  }
  .item-content {
    display: flex;
  }
  .item-title {
    width: 50%;
    padding-right: 32px;
    font-weight: 500;
    flex-shrink: 0;
  }
  .item-titles {
    .desc-indent + .desc-indent {
      text-indent: 3em;
    }
  }
  .post {
    color: var(--o-color-info3);
    margin-left: 12px;
  }
  .item-guest + .item-guest {
    margin-top: 12px;
  }
  .item-content + .item-content {
    margin-top: 32px;
  }
}
.item-agent {
  width: 100%;
  padding: var(--o-gap-5);
  background-color: var(--o-color-fill2);
  border-bottom: 1px solid rgba(0, 47, 167, 0.1);
  &:last-of-type {
    border-bottom: none;
  }
  .title-content {
    display: flex;
    align-items: flex-end;
    .title {
      color: var(--o-color-info1);
      font-weight: 500;
      margin-left: 14px;
      position: relative;
      @include h3;
      &::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 22px;
        border-radius: 3px;
        top: 3px;
        left: -14px;
        background-color: var(--o-color-primary1);
      }
    }

    .subtitle-content {
      display: flex;
      .name,
      .post {
        margin-left: var(--o-gap-2);
        @include text1;
      }
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    font-weight: 400;
    margin-top: var(--o-gap-5);
    @include text1;
    .item-bottom {
      display: flex;
      align-items: center;
    }
    .item-bottom + .item-bottom {
      margin-left: 16px;
    }
    .item-date {
      display: flex;
      align-items: flex-start;
      svg {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
    }
    .time {
      margin-left: var(--o-gap-4);
    }
  }
}

.item-row-dark {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

@include respond-to('laptop') {
  .item-row {
    padding: 16px;
    .item-content + .item-content {
      margin-top: 24px;
    }
  }
}
@include respond-to('pad_h') {
  .item-row {
    padding: 12px;
    .content {
      margin-left: 24px;
    }
    .item-title {
      padding-right: 24px;
    }
    .item-content + .item-content {
      margin-top: 16px;
    }
  }
  .item-agent {
    padding: var(--o-gap-4);
    .bottom {
      margin-top: var(--o-gap-4);
    }
  }
}
@include respond-to('<=pad_v') {
  .item-row {
    padding: 8px 0;
    flex-direction: column;
    @include text1;
    .time-box {
      svg {
        width: 16px;
        height: 16px;
      }
    }
    .time {
      margin-left: 8px;
    }
    .content {
      margin-left: 0;
      margin-top: 12px;
    }
    .item-content {
      flex-direction: column;
    }
    .item-title {
      width: 100%;
      padding-right: 0;
    }
    .guest-list {
      margin-top: 8px;
    }
    .post {
      margin-left: 8px;
    }
    .item-guest + .item-guest {
      margin-top: 4px;
    }
    .item-content + .item-content {
      margin-top: 12px;
    }
  }
  .item-agent {
    padding: var(--o-gap-3) 0;
    .title-content {
      flex-direction: column;
      align-items: flex-start;
      .title {
        margin-left: 8px;
        &::before {
          content: '';
          width: 3px;
          height: 16px;
          border-radius: 3px;
          top: 4px;
          left: -8px;
        }
      }

      .subtitle-content {
        margin-top: var(--o-gap-3);
        margin-left: 8px;
        .name {
          margin-left: 0;
        }

        @media screen and (max-width: 400px) {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
    .bottom {
      flex-direction: column;
      align-items: flex-start;
      margin-top: var(--o-gap-2);
      margin-left: 8px;
      .item-bottom + .item-bottom {
        margin-left: 0;
        margin-top: 8px;
      }
      .item-date {
        align-items: center;
        svg {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
      }
      .time {
        margin-left: var(--o-gap-4);
      }
    }
  }
}
</style>
