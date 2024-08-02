<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-download.png';
import illustration from '@/assets/illustrations/brand.png';
import IconPronunciation from '~icons/app/icon-pronunciation.svg';

const { lang } = useData();
const i18n = useI18n();

const list: Ref<any[]> = ref([]);

const initList = () => {
  const result = [];
  const cndata = i18n.value.brand;
  const nameList = [
    'HORIZONTAL_LEFT_IMAGE',
    'VERTICAL_LEFT_IMAGE',
    'HORIZONTAL_CENTER_IMAGE',
    'VERTICAL_CENTER_IMAGE',
    'HORIZONTAL_RIGHT_IMAGE',
    'VERTICAL_RIGHT_IMAGE',
  ];
  const imageList = [
    '/img/other/brand/horizontal-poster.png',
    '/img/other/brand/standard-poster.png',
    '/img/other/brand/white-poster.png',
    '/img/other/brand/mono-poster.png',
    '/img/other/brand/black-hor-poster.png',
    '/img/other/brand/black-poster.png',
  ];

  for (let i = 0; i < imageList.length; i++) {
    const temp = {
      id: i,
      name: cndata.PICTURE_TITLE[i],
      url: imageList[i],
      image: cndata[nameList[i]],
      isBlack: imageList[i].includes('black'),
    };
    result.push(temp);
  }
  return result;
};

list.value = initList();

const audioRef1 = ref(null);
const audioRef2 = ref(null);

function handleMaleClick() {
  audioRef1.value?.play();
}

function handleFamaleClick() {
  audioRef2.value?.play();
}
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONTENT"
    :title="i18n.brand.BRAND"
    :illustration="illustration"
  />
  <div class="brand">
    <h3 class="brand-title">{{ i18n.brand.PRONUNCIARTION }}</h3>

    <audio ref="audioRef1" src="/mp3/openEuler-man.m4a"></audio>
    <audio ref="audioRef2" src="/mp3/openEuler-woman.m4a"></audio>

    <div class="brand-pronunciation">
      <p class="brand-name">{{ i18n.brand.BRAND_NAME }}</p>

      <p class="phonetic-transcription">
        {{ i18n.brand.PHONETIC_TRANSCRIPTION }}
      </p>

      <div class="gender-box">
        <p class="gender-box-item">{{ i18n.brand.MAN }}</p>
        <OIcon @click="handleMaleClick"
          ><IconPronunciation></IconPronunciation
        ></OIcon>
      </div>
      <div class="gender-box">
        <p class="gender-box-item">{{ i18n.brand.WOMAN }}</p>
        <OIcon @click="handleFamaleClick"
          ><IconPronunciation></IconPronunciation
        ></OIcon>
      </div>
    </div>

    <div class="brand-all-word">
      <h3 class="brand-title">{{ i18n.brand.MOBILETITLE }}</h3>
      <div class="brand-word">
        {{ i18n.brand.WORDS[0] }}
        <a
          :href="i18n.brand.WORDS_LINK[0]"
          target="_blank"
          rel="noopener noreferrer"
          >{{ i18n.brand.WORDS[1] }}</a
        >
        {{ i18n.brand.WORDS[2] }}
        <br />
        {{ i18n.brand.WORDS[3] }}
        <a :href="i18n.brand.WORDS_LINK[1]">{{ i18n.brand.WORDS[4] }}</a>
        {{ i18n.brand.WORDS[5] }}
        <a :href="i18n.brand.WORDS_LINK[2]" download>{{
          i18n.brand.WORDS[6]
        }}</a>
        <br />
        {{ i18n.brand.WORDS[7] }}
        <a
          :href="
            lang === 'zh'
              ? `/zh/other/brand/specification/`
              : i18n.brand.WORDS_LINK[3]
          "
          >{{ i18n.brand.WORDS[8] }}</a
        >
      </div>
    </div>
    <div class="brand-list">
      <OCard
        v-for="item in list"
        :key="item.id"
        class="brand-item"
        shadow="hover"
      >
        <div class="brand-item-title">{{ item.name }}</div>
        <div class="brand-item-img" :class="{ black: item.isBlack }">
          <img :src="item.url" />
        </div>
        <div class="button-group">
          <a
            v-for="item2 in item.image"
            :key="item2.STYLE"
            :href="item2.URL"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <OButton size="mini" class="button-item"
              >{{ item2.STYLE }}
            </OButton>
          </a>
        </div>
      </OCard>
    </div>
    <div class="brand-other-word">
      <h3 class="brand-title">{{ i18n.brand.PROJECT_TITLE }}</h3>
    </div>
    <div class="brand-list">
      <OCard
        v-for="item in i18n.brand.PROJECT_LIST"
        :key="item.TITLE"
        shadow="hover"
        class="brand-item"
      >
        <div class="brand-item-title">{{ item.TITLE }}</div>
        <div class="brand-item-img">
          <img :src="item.URL" />
        </div>
        <div class="button-group">
          <a
            v-for="item2 in item.DOWNLOAD_LINK"
            :key="item2.STYLE"
            :href="item2.URL"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <OButton size="mini" class="button-item"
              >{{ item2.STYLE }}
            </OButton>
          </a>
        </div>
      </OCard>
    </div>

    <div class="brand-ppt">
      <h3>{{ i18n.brand.PPT_TEXT }}</h3>
      <div class="ppt-list">
        <OCard
          v-for="(ppt, index) in i18n.brand.PPT_LIST"
          :key="ppt.LINK"
          shadow="hover"
          class="ppt-item"
          :style="{ padding: '0px' }"
        >
          <a
            :href="ppt.LINK"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <img :src="ppt.URL" alt="" />
            <div class="ppt-word">
              {{ i18n.brand.PPT_TEMPLATES[index] }}
            </div>
          </a>
        </OCard>
      </div>
    </div>
    <div class="brand-other-word">
      <div class="brand-faq">
        {{ i18n.brand.WORDS_FAQ[0] }}
        <a :href="i18n.brand.FAQ_LINK">{{ i18n.brand.WORDS_FAQ[1] }}</a>
        {{ i18n.brand.WORDS_FAQ[2] }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.black {
  background-color: var(--e-color-black) !important;
}
.button-group {
  display: grid;
  width: 100%;
  margin-top: var(--e-spacing-h5);
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--e-spacing-h8);
  a {
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  .button-item {
    // padding: var(--e-spacing-h10) 0;
    max-width: 70px;
    // width: 100%;
    // font-size: var(--e-font-size-text);
    // font-weight: 400;
    // line-height: var(--e-line-height-text);
    // display: flex;
    // flex-flow: row;
    // justify-content: center;
    // align-items: center;
    @media (max-width: 768px) {
      max-width: 80px;
    }
  }
  .button-item:hover {
    background-color: var(--e-color-brand1);
    color: var(--e-color-text2);
  }
}
.brand {
  margin: var(--e-spacing-h1) auto;
  padding: 0 var(--e-spacing-h2);
  max-width: 1504px;
  @media (max-width: 1100px) {
    padding: 0 var(--e-spacing-h5);
    margin: var(--e-spacing-h2) auto;
  }
  .brand-pronunciation {
    margin-top: 40px;
    padding: 24px;
    background-color: var(--e-color-bg2);
    box-shadow: var(--e-shadow-l2);
    display: flex;
    @media (max-width: 768px) {
      padding: 16px 12px;
      margin-top: 16px;
    }
    .brand-name {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
      font-weight: 400;
      color: var(--e-color-text1);
      margin-right: 20px;
      @media (max-width: 768px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        font-weight: 500;
        margin-right: 12px;
      }
    }
    .phonetic-transcription {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h7);
      color: var(--e-color-text1);
      font-weight: 400;
      margin-right: 32px;
      @media (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-text);
        margin-right: 24px;
      }
    }
    .gender-box {
      display: inline-flex;
      align-items: center;
      margin-right: 20px;
      @media (max-width: 768px) {
        margin-right: 16px;
      }
      .gender-box-item {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h7);
        color: var(--e-color-text1);
        font-weight: 400;
        margin-right: var(--e-spacing-h10);
        @media (max-width: 768px) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-text);
        }
      }
      .o-icon {
        font-size: 16px;
        color: var(--e-color-text1);
        cursor: pointer;
        @media (max-width: 768px) {
          font-size: 12px;
        }
        &:hover {
          color: var(--e-color-brand1);
          @media (max-width: 768px) {
            color: var(--e-color-text1);
          }
        }
      }
    }
  }
  .brand-all-word {
    margin-top: 64px;
    @media (max-width: 768px) {
      margin-top: 40px;
    }
  }
  .brand-title {
    font-size: var(--e-font-size-h3);
    font-weight: 300;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h3);
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }

  .brand-faq {
    font-size: var(--e-font-size-h7);
    font-weight: 500;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h7);
    margin-top: var(--e-spacing-h10);
    a {
      color: var(--e-color-brand1);
    }
    @media (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h5);
    }
  }

  .brand-other-word {
    margin-top: var(--e-spacing-h2);
  }

  .brand-word {
    font-size: var(--e-font-size-h7);
    font-weight: 300;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h7);
    margin-top: var(--e-spacing-h10);
    a {
      color: var(--e-color-brand1);
    }
    @media (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h5);
    }
  }

  .brand-list {
    display: grid;
    width: 100%;
    margin-top: var(--e-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--e-spacing-h4);
  }

  .brand-item {
    width: 100%;
    padding: 0;
    @media (max-width: 768px) {
    }
    :deep(.el-card__body) {
      padding: var(--e-spacing-h4);
      @media (max-width: 768px) {
        padding: var(--e-spacing-h5) var(--e-spacing-h6);
      }
    }

    &-title {
      font-size: var(--e-font-size-h7);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-h7);
      margin-top: var(--e-spacing-h10);
      @media (max-width: 768px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }
    &-img {
      height: 120px;
      width: 100%;
      margin-top: var(--e-spacing-h5);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--e-color-white);
      img {
        object-fit: contain;
        height: 50%;
        width: 50%;
        @media (max-width: 768px) {
          max-width: 240px;
        }
      }
      @media (max-width: 768px) {
        height: 80px;
      }
    }
  }

  .brand-ppt {
    margin-top: var(--e-spacing-h2);
    width: 100%;

    h3 {
      font-size: var(--e-font-size-h3);
      font-weight: 300;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-h3);
      width: 100%;
      text-align: center;
      @media (max-width: 768px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
    }
    .ppt-list {
      display: grid;
      width: 100%;
      margin-top: var(--e-spacing-h2);
      justify-items: center;
      align-items: center;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: var(--e-spacing-h4);
      @media (max-width: 768px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
      .ppt-item {
        width: 100%;

        a {
          width: 100%;
          img {
            width: 100%;
          }
          .ppt-word {
            padding: var(--e-spacing-h4);
            color: var(--e-color-text1);
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h7);
            @media (max-width: 768px) {
              padding: var(--e-spacing-h6);
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              font-weight: 500;
            }
          }
        }
        :deep(.el-card__body) {
          padding: 0;
        }
      }
    }
  }
}

@media (max-width: 1280px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 880px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}
</style>
