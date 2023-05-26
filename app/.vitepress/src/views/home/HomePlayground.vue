<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useI18n } from '@/i18n';
import letsPlay from '../../assets/category/home/letsPlay.png';
const playground = ref(null);
const codingData = [
  'Last metadata expiration check: 0:02:16 ago ',
  'on Wed Dec 22 09:00:02 2021.',
  'Dependencies resolved.',
  'Nothing to do.',
  'Complete!',
  '➜ / ',
];
const i18n = useI18n();
const textBlock = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver((res) => {
    if (res[0].intersectionRatio <= 0) return;
    textBlock.value = false;
    nextTick(() => {
      textBlock.value = true;
    });
  });
  playground.value && observer.observe(playground.value);
});
</script>
<template>
  <div class="home-playground">
    <h3>{{ i18n.home.HOME_INTRODUCE.INTRO_HEAD }}</h3>
    <div ref="playground" class="playground" data-aos="fade-up">
      <div v-if="textBlock" class="left-code">
        <div class="first">
          ➜ /
          <span
            v-if="textBlock"
            class="first-span"
            :class="{ typing: textBlock }"
            >sudo yum -y update</span
          >
        </div>
        <div v-show="textBlock">
          <div
            v-for="(item, index) in codingData"
            :key="item"
            :class="[
              `block${index + 1}`,
              { 'fast-hide': textBlock },
              { 'typing last': index == codingData.length - 1 },
            ]"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="right-text">
        <div class="first-code">
          <p>Your first</p>
          <p>coding experience</p>
          <p>in openEuler</p>
        </div>
        <a
          class="lets-play"
          :href="i18n.home.HOME_INTRODUCE.MOOC_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="letsPlay" alt="openEuler" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  margin-top: var(--o-spacing-h1);
  margin-bottom: var(--o-spacing-h2);
  font-size: var(--o-font-size-h3);
  font-weight: 300;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h3);
  width: 100%;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-top: var(--o-spacing-h2);
    margin-bottom: var(--o-spacing-h5);
  }
}

.playground {
  margin: 0 auto;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 74px 156px;
  background-repeat: no-repeat;
  background-color: #1e2633;
  background-image: url('../../assets/category/home/bg-code-pc.png');
  background-size: 100% 100%;
  .left-code {
    padding: 14px 0 31px 30px;
    width: 690px;
    height: 227px;
    text-align: left;
    font-size: var(--o-font-size-h8);
    color: #d0f2ff;
    line-height: var(--o-line-height-h8);
    background: rgba(11, 22, 45, 0.55);
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    border: 2px solid #022ea6;
    .first {
      display: flex;
      align-items: center;
    }
    .first-span {
      position: relative;
      margin-left: var(--o-spacing-h10);
    }
    .typing {
      position: relative;
      display: inline-block;
      visibility: hidden;
      width: 19ch;
      animation: typing 3s forwards steps(19);
      white-space: nowrap;
      overflow: hidden;
    }
    .typing::before,
    .first-span::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 10px;
      height: 16px;
      animation: blink 1s infinite steps(1);
    }
    .first-span::before {
      animation: blink 0.5s 6 steps(1);
    }
    .fast-hide {
      visibility: hidden;
      animation: block 0.3s forwards;
    }
    @for $i from 0 through 6 {
      .block#{ $i} {
        animation-delay: $i * 0.3 + 3s;
      }
    }

    .block6 {
      width: 5ch;
    }
    @keyframes block {
      to {
        visibility: visible;
      }
    }
  }
  .right-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 227px;
    margin-left: var(--o-spacing-h5);
    img {
      width: 100%;
    }
    .first-code {
      color: #fff;
      p {
        word-wrap: nowrap;
        font-size: var(--o-font-size-h3);
      }
    }
    .lets-play {
      cursor: pointer;
      width: 248px;
    }
  }
  @media screen and (max-width: 1416px) {
    .first-code {
      p {
      }
    }
  }
  @media screen and (max-width: 1080px) {
    flex-direction: column-reverse;
    justify-content: start;
    margin: 0;
    padding: 42px 18px 55px;
    width: 100%;
    height: 451px;
    background-image: url('../../assets/category/home/bg-code-mo.png');
    background-size: 100%, 100%;
    background-repeat: no-repeat;
    .left-code {
      margin-top: 25px;
      padding: 18px 10px 15px;
      width: 100%;
      height: 200px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    .right-text {
      margin: 0;
      height: 156px;
      .first-code {
        text-align: center;
        p {
          font-size: var(--o-font-size-h4);
          font-size: var(--o-line-height-h7);
        }
      }
      .lets-play {
        margin: 28px 0 34px;
        width: 100%;
        text-align: center;
        img {
          width: 152px;
        }
      }
    }
  }
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes blink {
    50% {
      background: #ff9933;
    }
  }
}
</style>
