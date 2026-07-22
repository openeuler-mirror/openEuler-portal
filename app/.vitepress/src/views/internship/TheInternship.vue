<script setup lang="ts">
import ContentWrapper from '~@/components/ContentWrapper.vue';
import TheActivityIntro from './components/TheActivityIntro.vue';
import TheInternshipReward from './components/TheInternshipReward.vue';
import TheInternshipFaq from './components/TheInternshipFaq.vue';
import TheInternshipPartners from './components/TheInternshipPartners.vue';
import TheInternshipHelp from './components/TheInternshipHelp.vue';
import { useScreen } from '~@/composables/useScreen';
import { useI18n } from '@/i18n';
import banner from '@/assets/category/internship/banner.png';
import IconOutlink from '~icons/app/icon-outlink.svg';
import BannerLevel2 from '~@/components/BannerLevel2.vue';
const i18n = useI18n();
const { lePadV } = useScreen();

const bannerData = {
  bannerImg: banner,
  bannerTitle: i18n.value.internship.internship,
};
</script>

<template>
  <BannerLevel2
    class="banner-container"
    :background-image="bannerData.bannerImg"
    :background-text="bannerData.bannerTitle"
    :title="bannerData.bannerTitle"
    v-if="!lePadV"
  >
    <div class="action">
      <a href="https://gitcode.com/openeuler/opensource-intern/issues" target="_blank">
        <OButton size="large" type="primary">
          <span>{{ i18n.internship.receiveTask }}</span>
          <OIcon class="jump-out-icon"><IconOutlink /></OIcon>
        </OButton>
      </a>
    </div>
  </BannerLevel2>
  <div class="internship-wrapper">
    <ContentWrapper>
      <div v-if="lePadV">
        <div class="internship-title">{{ i18n.internship.internship }}</div>
        <div class="action">
          <a href="https://gitcode.com/openeuler/opensource-intern/issues" target="_blank">
            <OButton size="large" type="primary">
              <span>{{ i18n.internship.receiveTask }}</span>
              <OIcon class="jump-out-icon"><IconOutlink /></OIcon>
            </OButton>
          </a>
        </div>
      </div>
      <!-- 活动介绍 -->
      <div id="activity-intro">
        <div class="activity-intro-title">{{ i18n.internship.activity }}</div>
        <TheActivityIntro></TheActivityIntro>
      </div>
      <!-- 实习规则 -->
      <div id="internship-faq">
        <div class="internship-faq-title">{{ i18n.internship.internshipFAQ }}</div>
        <TheInternshipFaq></TheInternshipFaq>
      </div>
      <!-- 积分与激励规则 -->
      <div id="internship-reward">
        <div class="internship-reward-title">{{ i18n.internship.internshipReward }}</div>
        <TheInternshipReward></TheInternshipReward>
      </div>
      <!-- 合作伙伴 -->
      <div id="internship-partners">
        <div class="internship-partners-title">{{ i18n.internship.internshipPartners }}</div>
        <TheInternshipPartners></TheInternshipPartners>
      </div>
      <!-- 帮助资讯 -->
      <div id="internship-help">
        <div class="internship-help-title">{{ i18n.internship.internshipHelp }}</div>
        <TheInternshipHelp></TheInternshipHelp>
      </div>
    </ContentWrapper>
  </div>
</template>

<style lang="scss" scoped>
.banner-container {
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
        .banner-operation {
          margin-top: var(--o-gap-4);

          .o-btn {
            --btn-height: 32px;
          }
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
      }
    }
  }
}

.internship-wrapper {
  position: relative
}

.internship-title {
  padding-top: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  @include display1;
}

.action {
  .o-icon {
    margin-left: 8px;
  }

  .o-button {
    width: 128px;
    height: 32px;
    border-radius: 16px;
    padding: 8px 16px;
    margin-top: 12px;
  }
}

.internship-desc {
  @include text1;
  color: var(--o-color-info2);
  margin-bottom: 28px;
}

.internship-reward-title,
.internship-faq-title,
.internship-partners-title,
.internship-help-title {
  text-align: center;
  font-weight: 600;
  @include display3;
  @include title-margin-bottom;
  @include title-margin-top;
}

.activity-intro-title {
  text-align: center;
  font-weight: 600;
  @include display3;
  @include title-margin-bottom;
  @include title-margin-top2;
}

.content-wrapper {
  padding-top: 0 !important;
  @include title-padding-bottom;
}

@include respond('>pc_b') {
  .internship-reward-title,
  .internship-faq-title {
    margin-top: 72px;
  }
}

@include respond('<=pad_v') {
  .internship-reward-title,
  .internship-faq-title,
  .internship-partners-title,
  .internship-help-title {
    margin-top: 32px !important;
    margin-bottom: 16px !important;
  }

  .activity-intro-title {
    margin-bottom: 16px !important;
  }
}
</style>