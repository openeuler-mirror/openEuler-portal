<script setup lang="ts">
import { useLocale } from '~@/composables/useLocale';

defineProps({
  guestData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

// 英文模式：职称行显示在单位行上方
const { isEn } = useLocale();
</script>
<template>
  <div class="guest">
    <p class="section-title">{{ guestData.title }}</p>
    <div v-for="(group, g) in guestData.list" :key="g" class="guest-group">
      <p class="group-title">{{ group.title }}</p>
      <div class="guest-list">
        <div v-for="(item, i) in group.children" :key="i" class="guest-item">
          <img v-if="item.img" class="avatar" :src="item.img" :alt="item.name" loading="lazy" />
          <span v-else class="avatar avatar-empty"></span>
          <p class="name">{{ item.name }}</p>
          <div class="texts">
            <template v-if="!isEn">
              <p v-if="item.org" class="org">{{ item.org }}</p>
              <p v-if="item.post" class="post">{{ item.post }}</p>
            </template>
            <template v-else>
              <p v-if="item.post" class="post">{{ item.post }}</p>
              <p v-if="item.org" class="org">{{ item.org }}</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.guest {
  margin-top: 72px;
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }

  .section-title {
    text-align: center;
    @include display3;
  }
  .guest-group {
    margin-top: 40px;
  }
  .group-title {
    text-align: center;
    color: var(--o-color-info1);
    font-weight: 500;
    @include h3;
  }
  .guest-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 32px;
    margin-top: 32px;
  }
  .guest-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    .avatar {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      object-fit: cover;
      &.avatar-empty {
        display: inline-block;
        background-color: var(--o-color-fill3);
      }
    }
    .name {
      margin-top: 12px;
      color: var(--o-color-info1);
      font-weight: 500;
      @include text1;
    }
    // 单位/职称两行：间距与顺序无关（英文模式职称在上）
    .texts {
      margin-top: 6px;
    }
    .org,
    .post {
      color: var(--o-color-info3);
      @include tip1;
    }
    .texts p + p {
      margin-top: 2px;
    }
  }
}
@include respond('<=pad_v') {
  .guest {
    .guest-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px 16px;
    }
  }
}
</style>
