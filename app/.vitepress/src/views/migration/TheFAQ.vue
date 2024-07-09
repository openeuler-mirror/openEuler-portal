<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import faqInfoData from '@/data/migration/migration-faq';
import IconBook from '~icons/app/icon-book.svg';

const { lang } = useData();

const faqInfo = computed(() => {
  return faqInfoData[lang.value as 'zh' | 'en'];
});
</script>

<template>
  <div class="migration-faq">
    <!-- <div class="instruction">
      <div class="content">
        <div class="title">
          <o-icon><icon-book></icon-book></o-icon>
          <p>{{ faqInfo.instruction.title }}</p>
        </div>
        <div class="description">
          <span>{{ faqInfo.instruction.text_1 }}</span>
          <a
            :href="faqInfo.instruction.link"
            target="_blank"
            rel="noopener noreferrer"
            >{{ faqInfo.instruction.link_text }}</a
          >
          <span>{{ faqInfo.instruction.text_2 }}</span>
        </div>
      </div>
    </div> -->

    <div
      v-for="item in faqInfo.chats"
      :key="item.question"
      class="question-answer"
    >
      <p class="question">{{ item.question }}</p>
      <div class="answer">
        <div class="answer-text">
          <span v-for="it in item.answers" :key="it.text">
            {{ !it.isLink ? it.text : '' }}
            <a
              v-if="it.isLink"
              :href="it.link"
              target="_blank"
              rel="noopener noreferrer"
              >{{ it.text }}</a
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.migration-faq {
  .instruction {
    display: flex;
    background: rgba(254, 229, 184, 0.2);
    width: 85%;
    border-left: 6px solid var(--o-color-yellow5);
    border-radius: 8px 0px 0px 8px;

    .content {
      padding: 20px;
      @media screen and (max-width: 768px) {
        padding: 12px;
      }
      .title {
        display: flex;
        align-items: center;
        @media screen and (max-width: 768px) {
          margin-bottom: var(--o-spacing-h8);
        }
        .o-icon {
          font-size: var(--o-font-size-h5);
          margin-right: var(--o-spacing-h8);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-h7);
          }
        }
        p {
          font-size: var(--o-font-size-h8);
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h6);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            margin: 0;
          }
        }
      }

      .description {
        font-size: var(--o-font-size-text);
        color: var(--o-color-text4);
        line-height: var(--o-line-height-text);
        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
    }
  }

  .question-answer {
    margin-top: 20px;
    .question {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text4);
      line-height: var(--o-line-height-text);
    }

    .answer {
      display: flex;
      align-items: center;
      background: var(--o-color-bg2);
      border-left: 2px solid var(--o-color-border3);
      .answer-text {
        font-size: var(--o-font-size-text);
        font-weight: 400;
        color: var(--o-color-text4);
        line-height: var(--o-line-height-text);
        padding: 16px;
        display: inline;
      }
    }
  }
}
</style>
