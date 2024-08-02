<script lang="ts" setup>
import { ref } from 'vue';
import MiniTitle from './MiniTitle.vue';
import DocsList from './DocsList.vue';
const props = defineProps({
  docsObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
});

const docsActive = ref(props.docsObj.TAB && props.docsObj.TAB[0]?.VALUE);
</script>
<template>
  <div class="docs">
    <MiniTitle
      :inside-title="docsObj.TITLE_INSIDE"
      :outside-title="docsObj.TITLE_OUTSIDE"
      :special-component="!!docsObj.TAB"
    />
    <div class="docs-tab">
      <template v-if="docsObj.TAB">
        <OTabs>
          <OTabPane
            v-for="item in docsObj.TAB"
            :key="item.VALUE"
            :label="item.VALUE"
          >
            <DocsList :data-list="docsObj[item.KEY].DATA_LIST" />
          </OTabPane>
        </OTabs>
      </template>
      <template v-else>
        <DocsList :data-list="docsObj.DATA_LIST" />
      </template>
    </div>
    <div class="docs-mobile-tab">
      <template v-if="docsObj.TAB">
        <OCollapse
          v-for="item in docsObj.TAB"
          :key="item.VALUE"
          v-model="docsActive"
          class="collapse"
        >
          <OCollapseItem
            :title="item.VALUE"
            :name="item.VALUE"
            class="collapse-item"
          >
            <DocsList :data-list="docsObj[item.KEY].DATA_LIST" />
          </OCollapseItem>
        </OCollapse>
      </template>
      <template v-else>
        <DocsList :data-list="docsObj.DATA_LIST" />
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.docs {
  &-tab {
    max-width: 1416px;
    margin: 0 auto;
    @media screen and (min-width: 768px) {
      display: block;
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
    .el-tabs {
      :deep(.el-tabs__header) {
        margin-bottom: var(--e-spacing-h4);
      }
      :deep(.el-tabs__nav) {
        .is-active {
          color: var(--e-color-brand1);
        }
      }
      :deep(.el-tabs__content) {
        overflow: inherit;
      }
    }
  }
  &-mobile-tab {
    margin-top: 16px;
    @media screen and (min-width: 768px) {
      display: none;
    }
    @media screen and (max-width: 768px) {
      display: block;
    }
    .collapse {
      border: 0 none;
      padding: 0;
      &-item {
        --e-collapse-color-border: none;
        padding: 0;
        :deep(.el-collapse-item__header) {
          height: 34px;
          font-size: var(--e-font-size-tip);
          padding: var(--e-spacing-h8) 0 var(--e-spacing-h8) var(--e-spacing-h8);
          position: relative;
          &:after {
            content: '';
            left: var(--e-spacing-h8);
            right: var(--e-spacing-h8);
            position: absolute;
            background: var(--e-color-border2);
            height: 1px;
            font-size: 0;
            bottom: 0;
          }
          &.is-active {
            &:after {
              display: none;
            }
          }
        }
        :deep(.el-collapse-item__wrap) {
          background-color: var(--e-color-bg1);
          .el-collapse-item__content {
            padding: 0;
          }
        }
      }
      &:last-child {
        :deep(.el-collapse-item__header) {
          &:after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
