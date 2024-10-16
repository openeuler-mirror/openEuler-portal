<script lang="ts" setup>

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => {
      return {
        title: '',
        content: [],
      };
    },
  },
});
</script>

<template>
  <div class="summit-subforum">
    <div v-for="cardInfo in agendaData.content" class="subforum-card">
      <p class="subforum-name">{{ cardInfo.name }}</p>
      <p class="subforum-topic" v-for="title in cardInfo.content">
        {{ title.desc }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summit-subforum {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(5, minmax(82px, 1fr));
  @media screen and (max-width: 1439px) {
    grid-template-columns: repeat(3, minmax(82px, 1fr));
  }
  @media screen and (max-width: 768px) {
    gap: 16px;
    grid-template-columns: repeat(2, minmax(82px, 1fr));
  }
  .subforum-card {
    display: flex;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 192px;
    text-align: center;
    box-shadow: 0 1px 16px rgba($color: #000000, $alpha: 0.1);
    background-image: url(../img/subforum-bg.png);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    @media screen and (max-width: 768px) {
      height: 113px;
    }
    .subforum-name {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: var(--e-color-black);
    }
    .subforum-topic {
      color: rgba(0, 0, 0, 0.7);
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
    @media screen and (max-width: 768px) {
      .subforum-name {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
      .subforum-topic {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
    }
  }
}
.dark .subforum-card {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
// 英文移动端适配
html[lang='en'] {
  .summit-subforum {
    .subforum-card {
      @media screen and (max-width: 768px) {
        height: 192px;
      }
    }
  }
}
</style>
