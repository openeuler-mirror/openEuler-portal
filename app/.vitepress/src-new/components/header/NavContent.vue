<script setup lang="ts">
import { ref } from 'vue';
import { OTag, OIcon } from '@opensig/opendesign';

import NavLink from './NavLink.vue';

const props = defineProps({
  navContent: {
    type: Array,
    default() {
      return [];
    },
  },
  isMobile : {
    type: Boolean,
    default() {
      return false;
    }
  }
});


const emits = defineEmits(['link-click']);
const linkClick = () => {
  emits('link-click');
}

const showDesc = ref(false);
const descMouseenter = (e: MouseEvent) => {
  if (!e || !e.target) return;
  showDesc.value = e.target.clientHeight < e.target.scrollHeight;
} 
</script>

<template>
  <div v-if="isMobile">
    <div v-for="subItem in navContent" :key="subItem.NAME" class="content-container-mobile">
      <NavLink :url="subItem.URL" class="content-subtitle" @link-click="linkClick">
        {{ subItem.NAME }}
        <OIcon v-if="subItem.ICON">
          <component :is="subItem.ICON" class="icon" />
        </OIcon>
        <OTag v-if="subItem.TAG" round="pill" color="danger" class="content-tag">{{ subItem.TAG }}</OTag>
      </NavLink>
      <div class="desc-container">
        <p class="item-desc">{{ subItem.DESCRIPTION }}</p>
      </div>
      <div v-if="subItem.MOBILE_SHOW_CHILD" class="system-container">
        <NavLink v-for="system in subItem.CHILDREN" :url="system.URL" class="system" @link-click="linkClick">
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
      :class="{ 'content-item': navContent.length > 1 }">
        <div class="item-title">
          <NavLink :url="subItem.URL" class="item-name" @link-click="linkClick">
            {{ subItem.NAME }}
            <OIcon v-if="subItem.ICON">
              <component :is="subItem.ICON" class="icon" />
            </OIcon>
            <OTag v-if="subItem.TAG" round="pill" color="danger" size="small" class="content-tag">{{ subItem.TAG }}</OTag>
          </NavLink>
        </div>
        <div class="desc-container">
          <p
            class="item-desc"
            :title="showDesc? subItem.DESCRIPTION : null"
            @mouseenter="descMouseenter($event)"
          >
            {{ subItem.DESCRIPTION }}
          </p>
        </div>
        <div class="system-container">
          <NavLink v-for="system in subItem.CHILDREN" :url="system.URL" class="system" @link-click="linkClick">
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
    color:var(--o-color-primary1);
  }
}

.icon {
  font-size: var(--o-icon_size-xs);
  margin-left: var(--o-gap-2);
}

@mixin hidden {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content-container {
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;

  @include respond-to('>laptop') {
    column-gap: var(--o-gap-8);
    row-gap: var(--o-gap-5);
  }

  @include respond-to('laptop') {
    column-gap: var(--o-gap-5);
    row-gap: var(--o-gap-5);
  }

  @include respond-to('pad_h') {
    column-gap: var(--o-gap-5);
    row-gap: var(--o-gap-5);
  }

  .content-item {
    @include respond-to('>laptop') {
      width: calc((100% - 96px) / 3);
      min-width: 230px;
    }

    @include respond-to('laptop') {
      width: calc((100% - 48px) / 3);
      min-width: 184px;
    }

    @include respond-to('pad_h') {
      width: calc((100% - 24px) / 2);
    }
  }

  .item-title {
    margin-bottom: var(--o-gap-1);
    display: flex;
    align-items: center;

    .item-name {
      font-family: PingFangSC;
      font-weight: 500;
      white-space: nowrap;
      @include text1;
    }
    .content-tag {
      margin-left: var(--o-gap-2);
    }
  }
  .desc-container {
    overflow: hidden;
    position: relative;
    padding-bottom: var(--o-gap-3);

    .item-desc {
      color: var(--o-color-info2);
      margin: 0;
      white-space: pre-line;
      @include tip2;
      @include hidden;
    }
  }

  .system-container {
    display: flex;
    flex-wrap: wrap;

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

.content-container-mobile {
    & + .content-container-mobile {
    margin-top: var(--o-gap-3);
    }

  .content-subtitle {
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
      margin-bottom: var(--o-gap-1);
      text-align: justify;
      @include text1;
      @include hidden;
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