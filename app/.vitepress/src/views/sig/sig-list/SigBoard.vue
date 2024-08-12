<script setup lang="ts">
import { onMounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import AOS from 'aos';
import { useI18n } from '@/i18n';

import IconHome from '~icons/app/icon-home.svg';
import IconMail from '~icons/app/icon-mail.svg';
import IconVideo from '~icons/app/icon-video.svg';
import IconUser from '~icons/app/icon-user.svg';

const configData = useData();
const i18n = useI18n();
const router = useRouter();
const language = configData.lang;

defineProps({
  sigList: {
    type: Array,
    default: () => [],
  },
});

interface SIG_LIST {
  group_name: string;
  home_page: string;
  id: number;
  irc: string;
  maillist: string;
  owners: string;
}

const toSigDetail = (value: SIG_LIST) => {
  router.go(`/${language.value}/sig/sig-detail/?name=${value.group_name}`);
};
onMounted(() => {
  AOS.init({
    offset: 200,
    duration: 800,
    delay: 100,
  });
});
</script>

<template>
  <ul class="sig-board">
    <li
      v-for="(item,index) in (sigList as any)"
      :key="index"
      data-aos="fade-zoom-in"
      data-aos-once="true"
      class="sig-board-item"
    >
      <h2 @click="toSigDetail(item)">{{ item.group_name }}</h2>
      <ul class="item-info">
        <li class="item-info-page">
          <IconHome class="sig-board-icon" />
          <span>
            <a target="_black" :href="item.home_page">
              {{ i18n.sig.SIG_LIST.HOME_PAGE }}
            </a>
          </span>
        </li>
        <li class="item-info-mail">
          <IconMail class="sig-board-icon" />
          <span
            >{{ i18n.sig.SIG_LIST.MAIL }} :
            <a :href="'mailto:' + item.maillist">
              {{ item.maillist }}
            </a>
          </span>
        </li>
        <li class="item-info-video">
          <IconVideo class="sig-board-icon" />
          <span> {{ i18n.sig.SIG_LIST.IRC }} : {{ item.irc }} </span>
        </li>
        <li class="item-info-user">
          <IconUser class="sig-board-icon" />
          <span>{{ i18n.sig.SIG_LIST.MANAGER }} :</span>
        </li>
      </ul>
      <ul class="item-admin">
        <li
          v-for="subItem in JSON.parse(item.owners).slice(0, 4)"
          :key="subItem.gitee_id"
        >
          <img :src="subItem.avatar_url" />
          <span>{{ subItem.gitee_id }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.sig-board {
  column-count: 2;
  max-width: 1504px;
  margin: 0 auto;
  margin-top: var(--e-spacing-h2);
  @media (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }
  @media (max-width: 1080px) {
    column-count: 1;
    padding: 0 var(--e-spacing-h5);
  }
  &-item {
    max-width: 696px;
    box-shadow: var(--e-shadow-l1);
    margin-bottom: var(--e-spacing-h4);
    break-inside: avoid;
    padding: var(--e-spacing-h2);
    background-color: var(--e-color-bg2);
    &:hover {
      box-shadow: var(--e-shadow-l2_hover);
    }
    @media (max-width: 1080px) {
      width: 100%;
      padding: var(--e-spacing-h3) var(--e-spacing-h3);
    }
    h2 {
      padding-bottom: var(--e-spacing-h7);
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: var(--e-font-size-h4);
      line-height: var(--e-line-height-h4);
      cursor: pointer;
      color: var(--e-color-text1);
      &:hover {
        color: var(--e-color-kleinblue6);
      }

      @media (max-width: 768px) {
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
      }
    }
    .item-info {
      color: var(--e-color-text1);
      @media (max-width: 1080px) {
        margin-top: var(--e-spacing-h7);
      }
      &-page {
        a {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      &-mail {
        word-break: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
        a {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      &-video {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
      &-user {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
      .sig-board-icon {
        width: var(--e-line-height-h6);
        height: var(--e-line-height-h6);
        margin-right: var(--e-spacing-h8);
        transform: translateY(-1px);
      }
      li {
        margin-top: var(--e-spacing-h7);
        display: flex;
        align-items: center;
      }
    }
    .item-admin {
      display: grid;
      margin-top: var(--e-spacing-h6);
      grid-template-columns: repeat(4, 1fr);
      @media (max-width: 780px) {
        grid-template-columns: repeat(2, 1fr);
      }
      li {
        text-align: center;
        margin-top: var(--e-spacing-h5);
        margin-right: var(--e-spacing-h4);
        @media (max-width: 1280px) {
          margin-right: var(--e-spacing-h3);
        }
        img {
          width: 120px;
          height: 120px;
          display: block;
          border-radius: 50%;
          @media (max-width: 1280px) {
            width: 90px;
            height: 90px;
          }
          @media (max-width: 1120px) {
            width: 80px;
            height: 80px;
            margin-bottom: var(--e-spacing-h4);
            margin: 0 auto;
          }
        }
        span {
          display: inline-block;
          margin-top: var(--e-spacing-h5);
          color: var(--e-color-text1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
