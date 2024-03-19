<script setup lang="ts">
import AOS from 'aos';
import { onMounted } from 'vue';
import IconEmailFill from '~icons/app/icon-email-fill.svg';

defineProps({
  lecturerList: {
    type: Object,
    required: true,
    default: () => null,
  },
});
onMounted(() => {
  AOS.init({
    offset: 200,
    duration: 800,
    delay: 100,
  });
});
</script>

<template>
  <ul class="council-lis list-technologyt">
    <li v-for="(item, index) in lecturerList" :key="index" data-aos="fade-up">
      <img class="avatar" loading="lazy" :src="item.img" :alt="item.name" />
      <p class="personal-name">{{ item.name }}</p>
      <p
        v-for="itemPost in item.position"
        :key="itemPost"
        class="personal-post"
      >
        {{ itemPost }}
      </p>
      <span v-if="item.email" class="mail">
        <a :href="'mailto:' + item.email"
          ><OIcon><IconEmailFill /></OIcon
        ></a>
      </span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.lecturer-list {
  margin: var(--o-spacing-h2) auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
  @media (max-width: 1796px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1645px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1465px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1175px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1068px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 780px) {
    display: grid;
    gap: 16px;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
  &-item {
    width: 100%;
    @media (max-width: 780px) {
      width: 100%;
      margin: 0 auto;
    }
    &-square {
      display: block;
      height: 130px;
      width: 130px;
      overflow: hidden;
      position: relative;
      left: 10%;
      img {
        width: 190px;
        height: 190px;
        position: relative;
        bottom: 20%;
        right: 25%;
      }
    }
    &-circle {
      img {
        width: 100px;
        margin: 0 auto;
        display: block;
      }
    }
    p {
      font-size: var(--o-spacing-h5);
      color: var(--o-color-text1);
      text-align: center;
      margin-top: 8px;
      @media (max-width: 780px) {
        margin-top: 10px;
      }
    }
    &-title {
      p {
        color: var(--o-color-text4);
        font-size: var(--o-font-size-tip);
        font-weight: 400;
        @media (max-width: 780px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      @media (max-width: 780px) {
        margin-bottom: 0;
      }
    }
  }
}
.council-lis {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 32px;
  @media screen and (max-width: 1830px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 1696px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 1520px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 1348px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1099px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 816px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }
  li {
    text-align: center;
    img {
      width: 100px;
      margin-bottom: 8px;
      border-radius: 50%;
    }
    .mail {
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: var(--o-color-brand1);
    }
    .personal-name {
      font-size: var(--o-font-size-h8);
      color: var(--o-color-text1);
      text-align: center;
      margin-bottom: 4px;
    }
    .personal-post {
      margin-top: 4px;
      font-size: var(--o-font-size-tip);
      color: var(--o-color-text4);
      text-align: center;
      line-height: var(--o-line-height-tip);
      + .personal-post {
        margin-top: 0;
      }
    }
  }
}
</style>
