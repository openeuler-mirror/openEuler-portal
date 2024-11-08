<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '~@/i18n';
import { OIcon, ODropdown, ODropdownItem } from '@opensig/opendesign';

import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';
import IconOutLink from '~icons/app/icon-out-link.svg';

const i18n = useI18n();
const sourceCode = computed(() => i18n.value.header.SOURCE_CODE);

const itemChange = (data: any) => {
  window.open(data.PATH, '_blank');
}
</script>

<template>
<div class="header-code">
  <ODropdown trigger="hover" optionPosition="bottom" option-wrap-class="dropdown">
    <div class="info-wrap hover-icon-rotate">
      <span class="title">{{ $t('header.CODE') }}</span>
      <OIcon class="icon"><IconChevronDown /></OIcon>
    </div>

    <template #dropdown>
      <ODropdownItem
        v-for="item in sourceCode"
        @click="itemChange(item)"
        :key="item.PATH"
        class="list">
        {{ item.NAME }}
        <OIcon>
          <IconOutLink class="icon" />
        </OIcon>
      </ODropdownItem>
    </template>
  </ODropdown>
</div>
</template>

<style lang="scss" scoped>
.icon {
  font-size: var(--o-icon_size_control-xs);
  margin-left: var(--o-gap-1);
}

.header-code {
  height: 100%;
  display: flex;
  align-items: center;

  .info-wrap {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    .title {
      display: flex;
      align-items: center;
      color: var(--o-color-info1);
      cursor: pointer;
      height: 100%;
      @include tip1;
    }
  }
  .list {
    background: var(--o-color-fill2);
    cursor: pointer;
    box-shadow: var(--o-shadow-1);
    border-radius: var(--o-radius_control-xs);
    padding: var(--o-gap-1);
    width: 144px;
  } 
}

.hover-icon-rotate {
  .o-icon {
    transition: all var(--o-duration-m1) var(--o-easing-standard-in);
  }

  @include hover {
    .o-icon {
      transform: rotate(-180deg);
    }
  }
}
.o-dropdown {
  height: 100%;
}
.o-dropdown-item {
  background: var(--o-color-fill2);
  cursor: pointer;
  border-radius: var(--o-radius_control-xs);
  padding: var(--o-gap-1);
  min-width: 144px;
  height: 40px;

  @include hover {
    color: var(--o-color-primary1);
    background: var(--o-color-control2-light);
  }
}
.dropdown {
  --dropdown-list-radius: var(--o-radius-xs);
}
</style>