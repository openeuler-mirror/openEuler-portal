<script setup lang="ts">
/**
 *@params [
  {
    title:string;
    select:string[]
  },
  ...
 ]
 @return [
  {
    title:string;
    sele:string[]
  },
  ...
 ]
 *@single = true 单选
 *
 *选择全部时，对应title的sele返回[]空数组
 */
import { useAttrs, ref, computed } from 'vue';
import { useI18n } from '@/i18n';

import IconFilter from '~icons/app/icon-filter.svg';
import IconCancel from '~icons/app/icon-cancel.svg';

const i18n = useI18n();
const userCaseData = computed(() => i18n.value.filter);

const props = defineProps<{
  data: any;
}>();

const emit = defineEmits(['filter']);

const tagitems = ref<string[]>([]); // 标签数组
const options = ref<any>([]); // 传给父组件

const attrs = useAttrs();
// 筛选抽屉
const isDrawerOpen = ref(false);
const toggleDrawerOpen = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
const handOptions = computed(() => {
  const temp = options;
  for (let i = 0; i < props.data.length; i++) {
    temp.value.push({ title: props.data[i].title, sele: [] });
  }
  return temp;
});
options.value = handOptions.value.value;
// 选择标签
const selectTag = (title: string, option: string) => {
  // 单选
  if (attrs.single) {
    options.value.forEach((item: any) => {
      if (title === item.title) {
        if (item.sele.length > 0) {
          if (item.sele[0] === option) {
            item.sele.splice(0, 1);
            tagitems.value.forEach((tag: any, index) => {
              if (tag === option) tagitems.value.splice(index, 1);
            });
          } else {
            tagitems.value.forEach((tag: any, index) => {
              if (tag === item.sele[0]) tagitems.value[index] = option;
            });
            item.sele[0] = option;
          }
          return;
        }
        item.sele[0] = option;
        tagitems.value.push(option);
      }
    });
  } else {
    // 多选
    for (let i = 0; i < props.data.length; i++) {
      if (title === props.data[i].title) {
        if (options.value[i].sele.length > 0) {
          for (let j = 0; j <= options.value[i].sele.length; j++) {
            if (options.value[i].sele[j] === option) {
              options.value[i].sele.splice(j, 1);
              for (let x = 0; x < tagitems.value.length; x++) {
                if (tagitems.value[x] === option) tagitems.value.splice(x, 1);
              }
              return;
            }
          }
        }
        options.value[i].sele.push(option);
        tagitems.value.push(option);
      }
    }
  }
};
// 确定
const onConfirmClick = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
  emit('filter', options.value);
};
// 删除标签
const delTag = (data: string) => {
  options.value.forEach((item: any) => {
    item.sele.forEach((betrag: any, index: number) => {
      if (betrag === data) {
        item.sele.splice(index, 1);
        emit('filter', options.value);
      }
    });
  });
  tagitems.value.forEach((item: string, index: number) => {
    if (item === data) tagitems.value.splice(index, 1);
  });
};
// 选择全部(sele数组返回空)
const selectAll = (val: any) => {
  for (let i = 0; i < options.value.length; i++) {
    if (options.value[i].title === val.title) options.value[i].sele.length = 0;
    for (let x = 0; x < tagitems.value.length; x++) {
      for (let y = 0; y < val.select.length; y++) {
        if (tagitems.value[x] === val.select[y]) tagitems.value.splice(x, 1);
      }
    }
  }
};
// 选中按钮高亮
const btnHighLight = (data: string) => {
  for (let i = 0; i < tagitems.value.length; i++) {
    if (tagitems.value[i] === data) return true;
  }
};
const btnCheck = (data: any, val: string) => {
  if (attrs.single === true) {
    return false;
  } else {
    for (let i = 0; i < options.value.length; i++) {
      if (
        data.title === options.value[i].title &&
        options.value[i].sele.length > 1
      ) {
        for (let j = 0; j < options.value[i].sele.length; j++) {
          if (options.value[i].sele[j] === val) return true;
        }
      }
    }
  }
};
// 全部
const allHighLight = (val: any) => {
  for (let i = 0; i < options.value.length; i++) {
    if (options.value[i].title === val.title) {
      if (options.value[i].sele.length === 0) return true;
    }
  }
};
</script>

<template>
  <div class="o-screen" v-bind="attrs">
    <div class="o-screen-header">
      <div class="o-screen-header-button" @click="toggleDrawerOpen">
        {{ userCaseData.FILTER }}
        <div class="o-screen-header-button-icon">
          <OIcon class="icon"><IconFilter /></OIcon>
        </div>
      </div>
    </div>
    <div class="o-screen-tags">
      <OTag
        v-for="item in tagitems"
        :key="item"
        type="text"
        checkable
        class="o-screen-tags-tag"
        >{{ item }}
        <OIcon class="o-screen-tags-tag-icon" @click="delTag(item)"
          ><IconCancel
        /></OIcon>
      </OTag>
    </div>
    <div class="o-screen-box">
      <ClientOnly>
        <ODrawer
          v-model="isDrawerOpen"
          direction="btt"
          custom-class="o-drawer"
          size="auto"
        >
          <template #header>
            <div class="o-screen-box-drawer-header">
              <p>{{ userCaseData.FILTER }}</p>
            </div>
          </template>
          <div
            v-for="item in props.data"
            :key="item"
            class="o-screen-box-drawer-content"
          >
            <p class="o-screen-box-drawer-content-title">{{ item.title }}</p>
            <div class="o-screen-box-drawer-content-options">
              <OTag
                class="o-screen-box-drawer-content-options-option"
                :class="{ active: allHighLight(item) }"
                type="primary"
                checkable
                @click="selectAll(item)"
                >{{ userCaseData.ALL }}</OTag
              >
              <OTag
                v-for="sele in item.select"
                :key="sele"
                class="o-screen-box-drawer-content-options-option"
                type="primary"
                checkable
                :checked="btnCheck(item, sele)"
                :class="{ active: btnHighLight(sele) }"
                @click="selectTag(item.title, sele)"
                >{{ sele }}</OTag
              >
            </div>
          </div>
          <template #footer>
            <div class="o-screen-box-drawer-footer">
              <OButton type="primary" @click="onConfirmClick">{{
                userCaseData.SURE
              }}</OButton>
            </div>
          </template>
        </ODrawer>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.o-tag) {
  font-size: var(--e-font-size-tip);
  line-height: var(--e-line-height-tip);
  padding-left: var(--e-spacing-h8);
  padding-right: 0;
  color: var(--e-color-text4);
}
:deep(.o-button) {
  width: 104px;
  height: 28px;
  font-size: var(--e-font-size-text);
  line-height: var(--e-line-height-text);
  justify-content: center;
}
.o-screen {
  padding: var(--e-spacing-h5) 0;

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    &-button {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      color: var(--e-color-text4);
      &-icon {
        display: inline-block;
        .icon {
          position: relative;
          bottom: -2px;
          color: var(--e-color-text1);
        }
      }
    }
  }
  &-tags {
    // padding: 0 var(--e-spacing-h5);
    &-tag {
      margin-right: var(--e-spacing-h8);
      margin-top: var(--e-spacing-h8);
      background-color: var(--e-color-bg4);
      &-icon {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-tip);
        // color: var(--e-color-text1);
        color: var(--e-color-text3);
        position: relative;
        top: 1px;
      }
    }
  }
  &-box {
    &-drawer {
      &-header {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        text-align: center;
        p {
          display: inline-block;
          color: var(--e-color-text1);
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      &-content {
        &-title {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          color: var(--e-color-text1);
        }
        &-options {
          &-option {
            display: inline-block;
            padding: 2px var(--e-spacing-h8);
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
            margin: var(--e-spacing-h8);
            border: 1px solid var(--e-color-transparent);
            color: var(--e-color-text1);
            &.active {
              border: 1px solid var(--e-color-brand1);
              color: var(--e-color-brand1);
            }
          }
        }
      }
      &-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
