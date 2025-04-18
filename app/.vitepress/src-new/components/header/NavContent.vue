<script setup lang="ts">
import { ref } from 'vue';
import { OTag, OIcon } from '@opensig/opendesign';

import NavLink from './NavLink.vue';
import { oaReport } from '@/shared/analytics';

const props = defineProps({
  navContent: {
    type: Array,
    default() {
      return [];
    },
  },
  isMobile: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const emits = defineEmits(['link-click', 'report-nav-click-path']);

const linkClick = () => {
  emits('link-click');
};

const showDesc = ref(false);
const descMouseenter = (e: MouseEvent) => {
  if (!e || !e.target) return;
  showDesc.value = e.target.clientHeight < e.target.scrollHeight;
};

const onClickNavLink = (item?: any) => {
  if (item?.ANALYTICSNAME) {
    oaReport('click', undefined, item.ANALYTICSNAME);
  }
  if (Array.isArray(item.NAV_PATH)) {
    emits('report-nav-click-path', item.NAV_PATH);
  }
};
</script>

<template>
  <div v-if="isMobile" class="container-mobile">
    <div
      v-for="subItem in navContent"
      :key="subItem.NAME"
      class="content-container-mobile"
    >
      <NavLink
        :url="subItem.URL"
        class="content-subtitle"
        @link-click="linkClick"
      >
        {{ subItem.NAME }}
        <OIcon v-if="subItem.ICON">
          <component :is="subItem.ICON" class="icon" />
        </OIcon>
        <OTag
          v-if="subItem.TAG"
          round="pill"
          color="danger"
          class="content-tag"
          >{{ subItem.TAG }}</OTag
        >
      </NavLink>
      <div class="desc-container">
        <p class="item-desc">{{ subItem.DESCRIPTION }}</p>
      </div>
      <div v-if="subItem.MOBILE_SHOW_CHILD" class="system-container">
        <NavLink
          v-for="system in subItem.CHILDREN"
          :url="system.URL"
          class="system"
          @link-click="linkClick"
        >
          {{ system.NAME }}
          <OIcon v-if="system.ICON">
            <component :is="system.ICON" class="icon" />
          </OIcon>
        </NavLink>
      </div>
    </div>
  </div>

  <div v-else class="content-container">
    <div
      v-for="subItem in navContent"
      :key="subItem.NAME"
      class="content-item"
      @click="onItemClick"
    >
      <div class="item-title">
        <NavLink
          :url="subItem.URL"
          class="item-name"
          @click="onClickNavLink(subItem)"
          @link-click="linkClick"
        >
          {{ subItem.NAME }}
          <OIcon v-if="subItem.ICON">
            <component :is="subItem.ICON" class="icon" />
          </OIcon>
          <OTag
            v-if="subItem.TAG"
            round="pill"
            color="danger"
            size="small"
            class="content-tag"
            >{{ subItem.TAG }}</OTag
          >
        </NavLink>
      </div>
      <div class="desc-container">
        <p
          class="item-desc"
          :title="showDesc ? subItem.DESCRIPTION : null"
          @mouseenter="descMouseenter($event)"
        >
          {{ subItem.DESCRIPTION }}
        </p>
      </div>
      <div v-if="subItem.CHILDREN" class="system-container">
        <NavLink
          v-for="system in subItem.CHILDREN"
          :url="system.URL"
          class="system"
          @click="onClickNavLink(system)"
          @link-click="linkClick"
        >
          {{ system.NAME }}
          <OIcon v-if="system.ICON">
            <component :is="system.ICON" class="icon" />
          </OIcon>
        </NavLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link {
  color: var(--o-color-info1);
  cursor: pointer;

  @include hover {
    color: var(--o-color-primary1);
  }
}

.icon {
  font-size: var(--o-icon_size-xs);
  margin-left: var(--o-gap-2);
}

.content-container {
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;

  .content-item {
    width: 200px;
    margin-top: 24px;
    &:nth-of-type(1) {
      margin-top: 0;
    }

    @include respond-to('laptop') {
      width: 170px;
      margin-top: 16px;
    }

    @include respond-to('pad_h') {
      width: 132px;
      margin-top: 16px;
    }
  }

  .item-title {
    margin-bottom: var(--o-gap-1);
    display: flex;
    align-items: center;

    .item-name {
      font-weight: 500;
      white-space: nowrap;
      @include text1;
    }
    .content-tag {
      margin-left: var(--o-gap-2);
      @include respond-to('<=laptop') {
        display: none;
      }
    }
  }
  .desc-container {
    overflow: hidden;
    position: relative;
    height: 36px;
    white-space: normal;

    .item-desc {
      color: var(--o-color-info2);
      margin: 0;
      @include tip2;
      @include text-truncate(2);
      word-break: normal;
    }
  }

  .system-container {
    display: flex;
    flex-wrap: wrap;
    padding-top: var(--o-gap-3);

    .system {
      font-weight: 500;
      margin: 0;
      display: flex;
      align-items: center;

      @include tip1;

      &:not(:last-child) {
        margin-right: var(--o-gap-5);

        @media screen and (max-width: 1780px) {
          margin-right: var(--o-gap-4);
        }
      }
    }
  }
}

.container-mobile .content-container-mobile:last-child {
  margin-bottom: 12px;
}

.content-container-mobile {
  margin-right: var(--o-gap-1);
  margin-top: var(--o-gap-3);

  .content-subtitle {
    @include text2;
    font-weight: 500;
    color: var(--o-color-primary1);
  }

  .content-tag {
    margin-left: var(--o-gap-2);
  }

  .desc-container {
    overflow: hidden;
    position: relative;

    .item-desc {
      color: var(--o-color-info2);
      margin-top: var(--o-gap-1);
      text-align: justify;
      @include text1;
      @include text-truncate(2);
      word-break: normal;
    }
  }

  .system-container {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--o-gap-5);
    row-gap: var(--o-gap-1);

    .system {
      font-weight: 500;
      margin: 0;
      display: flex;
      align-items: center;
      color: var(--o-color-primary1);
      @include text1;
    }
  }
}
</style>
