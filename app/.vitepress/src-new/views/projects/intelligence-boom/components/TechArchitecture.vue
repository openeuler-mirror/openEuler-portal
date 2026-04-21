<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { OLink, OFigure } from '@opensig/opendesign';
import { useData } from 'vitepress';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import { ARCHITECTURE_DATA } from '~@/data/project';

import IconOutLink from '~icons/app-new/icon-outlink-arrow.svg';
import first_arch from '~@/assets/category/intelligence-boom/first_arch.jpg';
import second_arch from '~@/assets/category/intelligence-boom/second_arch.jpg';
import first_arch_en from '~@/assets/category/intelligence-boom/first_arch_en.jpg';
import second_arch_en from '~@/assets/category/intelligence-boom/second_arch_en.jpg';

const { lang } = useData();
const { lePadV } = useScreen();
enum VersionType {
  FIRST = 'first',
  SECOND = 'second'
}

const props = defineProps({
  version: {
    type: String as PropType<VersionType>,
    default: VersionType.SECOND,
    validator: (value: any) => {
      return Object.values(VersionType).includes(value)
    }
  }
});

const filterByVersion = (item: any, version: VersionType): any => {
  if (Array.isArray(item)) {
    return item
      .map(child => filterByVersion(child, version))
      .filter(Boolean);
  }

  if (typeof item === 'object' && item !== null) {
    if (item.version && !item.version.includes(version)) {
      return null;
    }

    const filteredItem = { ...item };

    const currentLang = lang.value === 'zh' ? 'zh' : 'en';
    if ('name_zh' in filteredItem && 'name_en' in filteredItem) {
      filteredItem.name = filteredItem[`name_${currentLang}`];
    }

    if (filteredItem.children) {
      filteredItem.children = filteredItem.children
        .map(child => filterByVersion(child, version))
        .filter(Boolean);
    }

    return filteredItem;
  }

  return item;
};

// 根据传入的version动态生成architectureData
const architectureData = computed(() => {
  return {
    ...ARCHITECTURE_DATA,
    layers: ARCHITECTURE_DATA.layers
      .map(layer => filterByVersion(layer, props.version))
      .filter(Boolean),
  };
});

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
</script>

<template>
  <div v-if="!lePadV">
    <div class="architecture-container">
      <!-- 左侧边栏 -->
      <div class="left-sidebar">
        <div class="sidebar-title">{{ lang === 'zh' ? architectureData.leftSidebar.name_zh : architectureData.leftSidebar.name_en }}</div>
      </div>

      <!-- 主体部分 -->
      <div class="layers-container">
        <div 
          v-for="(layer, layerIndex) in architectureData.layers" 
          :key="layerIndex"
          class="layer-row"
        >
          <!-- 层标题 - 文本形式在左侧 -->
          <div class="layer-title-text">{{ layer.name }}</div>
          
          <!-- 层内容: 有文件夹-->
          <div v-if="layer.children.some(item => 'name' in item)" class="folder">
            <!-- 文件夹 -->
            <div 
              v-for="(item, itemIndex) in layer.children"
              :class="`layer-content-area folder-${item.labelPosition}`"
              :key="itemIndex"
            >
              <div v-if="item.name && item.url" :class="{'folder-item': true, 'folder-item-center': item.labelPosition === 'center'}">
                <OLink class="folder-name" hover-underline :href="item.url" target="_blank">
                  {{ item.name }}
                  <template #suffix><IconOutLink /></template>
                </OLink>
              </div>

              <p v-if="item.name && !item.url" class="folder-name">{{ item.name }}</p>

              <div 
                v-if="layer.children" 
                class="layer-items-container"
              >
                <div class="flex-grid">
                  <div 
                    v-for="(component, compIndex) in item.children" 
                    :key="compIndex"
                    :class="{'grid-item': true, 'grid-item-array': component.children}"
                  >
                    <div v-if="component.children" class="component-group" >
                      <a
                        v-for="componentItem in component.children"
                        :key="componentItem.name"
                        :class="`component-box component-${componentItem.color}`"
                        :href="componentItem.url"
                        target="_blank"
                      >
                        <div class="component-content">
                          <OLink v-if="componentItem.url" :href="componentItem.url" target="_blank" class="component-name" hover-underline>
                            <div v-if="Array.isArray(componentItem.name)">
                              <p v-for="itemName in componentItem.name" :key="itemName">{{itemName }}</p>
                            </div>
                            <p v-else>{{ componentItem.name}}</p>
                            <template #suffix><IconOutLink /></template>
                          </OLink>
                          <p v-else class="component-name">{{ componentItem.name }}</p>
                        </div>
                      </a>
                    </div>
                    <a
                      v-else 
                      :class="`component-box component-${component.color}`"
                      :href="component.url"
                      target="_blank"
                    >
                      <div class="component-content">
                        <OLink v-if="component.url" :href="component.url" target="_blank" class="component-name" hover-underline>
                          {{ component.name }}
                          <template #suffix><IconOutLink /></template>
                        </OLink>
                        <p v-else class="component-name">{{ component.name }}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 层内容: 无文件夹-->
          <div v-else class="layer-content-area">
            <div 
              v-if="layer.children" 
              class="layer-items-container"
            >
              <!-- 遍历层内项目 -->
              <div 
                v-for="(item, itemIndex) in layer.children" 
                :key="itemIndex"
              >
                <div class="flex-grid">
                  <div 
                    v-for="(component, compIndex) in item.children" 
                    :key="compIndex"
                    class="grid-item"
                  >
                    <a 
                      :class="`component-box component-${component.color}`"
                      :href="component.url"
                      target="_blank"
                    >
                      <div class="component-content">
                        <OLink v-if="component.url" :href="component.url" target="_blank" class="component-name" hover-underline>
                          {{ component.name }}
                          <template #suffix><IconOutLink /></template>
                        </OLink>
                        <p v-else class="component-name">{{ component.name }}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- 底部硬件栏 -->
    <div class="bottom-hardware">
      <div class="bottom-block"></div>
      <div class="hardware-list">
        <div 
          v-for="(hardware, index) in architectureData.bottomBar" 
          :key="index"
          class="hardware-item"
        >
          <span class="hardware-name">{{ hardware.name }}</span>
          <div class="hardware-icon">
            <component :is="hardware.icon"></component>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else="lePadV" :class="{'image-container': isDark}">
    <OFigure
      :src="version === 'first' 
      ? lang === 'zh' ? first_arch : first_arch_en 
      : lang === 'zh' ? second_arch : second_arch_en"
    ></OFigure>
  </div>
</template>if

<style scoped lang="scss">
@mixin layer-border {
  border: 2px solid var(--o-color-control3-light);
  border-radius: 4px;
}

.architecture-container {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 8px;
}

.left-sidebar {
  max-width: 124px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @include layer-border;
  
  .sidebar-title {
    margin-bottom: 10px;
    @include text1;
  }
}

.layers-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.layer-row {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 8px;
  @include layer-border;
}

.layer-title-text {
  width: 116px;
  padding: 10px;
  @include text1;
}

.layer-content-area {
  flex: 1;
  background-color: var(--o-color-control2-light);
  border-radius: 4px;
  padding: 12px;

  & .folder-item-center {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 12px 0 24px 0;
    box-sizing: border-box;

    .folder-name {
      font-weight: 600;
    }
  }

  :deep(.o-link-suffix) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
}

.folder {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;

  .folder-name {
    &.clickable {
      font-weight: 600;
      text-align: center;
      cursor: pointer;
      @include text1;
    }
  }

  .folder-left {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    .folder-name {
      padding: 10px;
      font-weight: unset;
      width: 140px;
      padding: unset;
      text-align: center;
      @include tip1;
    }
  }
}

.component-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.layer-items-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.single-component-wrapper {
  margin-bottom: 20px;
}

.flex-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}

.grid-item {
  flex: 1;

  &.grid-item-array {
    flex: 0 0 168px;
  }
}

.component-box {
  padding: 12px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  height: 100%;
  color: var(--o-color-info1);
  
  &.component-dark {
    background-color: var(--o-color-control3-light);
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      box-shadow: var(--o-shadow-2);
    }
  }
  
  &.component-light {
    background-color: var(--o-color-fill2);
    @include layer-border;

    & .component-name {
      color: var(--o-color-info3);
      font-weight: 400;
    }
  }
  
  .component-content {
    display: flex;
    align-items: center;
  }
  
  .component-name {
    text-align: center;
    font-weight: 600;
    word-break: normal;
    word-wrap: break-word;
    hyphens: none;
    @include text1;
  }
}

.bottom-hardware {
  display: flex;

  .bottom-block {
    flex: 0 0 124px;

    @include respond-to('pad_h') {
      flex: 0 0 114px;
    }
  }

  .hardware-list {
    display: flex;
    flex: 1;
    justify-content: center;
    gap: 72px;
    margin-top: 20px;
    
    .hardware-item {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .hardware-icon {
        width: 32px;
        height: 32px;
      }
      
      .hardware-name {
        @include h4;
      }
    }
  }
}

.image-container {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
</style>