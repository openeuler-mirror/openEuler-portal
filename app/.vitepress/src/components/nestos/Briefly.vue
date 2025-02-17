<template>
  <div class="introduce">
    <div class="introduce-left">
      <p>
        <img src="@/assets/nestos/cards/cards-work.png" alt="" />
      </p>
      <el-button @click="goLink('https://gitee.com/openeuler/NestOS')">{{
        i18n.nestos.card.nestosTitle
      }}</el-button>
    </div>
    <div class="introduce-right">
      <p class="introduce-right-normal">
        {{ i18n.nestos.card.description1 }}
        <b>{{ i18n.nestos.card.description2 }}</b>
        {{ i18n.nestos.card.description3 }}
      </p>
      <p class="introduce-right-main">
        {{ i18n.nestos.card.mainDesc1
        }}<span class="text-style" @click="scrollLink()">{{
          i18n.nestos.card.dltext
        }}</span
        ><span
          >{{ i18n.nestos.card.mainDesc2
          }}<span
            class="text-style"
            @click="goLink('https://gitee.com/openeuler/NestOS/issues')"
            >{{ i18n.nestos.card.linksText }}</span
          >。</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '@/i18n';
const i18n = useI18n();
const emit = defineEmits(['handleScroll']);
const goLink = (path) => {
  if (path.startsWith('https:')) {
    window.open(path, '_blank');
  }
};
const scrollLink = () => {
  emit('handleScroll');
};
</script>

<style lang="scss" scoped>
.introduce {
  font-size: 18px;
  background-color: var(--o-color-fill2);
  box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  align-items: center;

  @include respond-to('<=pad_v') {
    flex-direction: column;
    text-align: center;
  }

  &-left {
    text-align: center;
    img {
      height: 240px;
    }
    .el-button {
      width: 168px;
    }
  }

  &-right {
    padding: 24px 24px;
    @include text2;

    display: flex;
    flex-direction: column;
    gap: 24px;

    &-main {
      font-weight: bold;

      .text-style {
        color: var(--o-color-primary1);

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
