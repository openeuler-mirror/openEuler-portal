<script lang="ts" setup>
import { reactive, computed, ref, onMounted, onUpdated } from 'vue';
import { OCard, OButton, OIcon } from '@opensig/opendesign';
</script>
<template>
  <div class="talent-query">
    <h2 class="talent-title">{{ $t('talent.certificateQuery') }}</h2>
    <OCard class="talent-query-card">
      <div class="talent-query-main">
        <div class="query-intro">
          <i18n-t keypath="talent.certificateQueryIntro" :tag="'p'">
            <template #email>
              <a :href="`mailto:${$t('talent.email')}`">{{
                $t('talent.email')
              }}</a>
            </template>
          </i18n-t>
        </div>
        <div class="query-template-title">
          {{ $t('talent.templateTitle') }}
        </div>
        <div class="query-template">
          <div class="row">
            <span class="label">收件人</span>
            <span class="content">oecxonline@openeuler.sh</span>
          </div>
          <div class="row">
            <span class="label">主题</span>
            <span class="content">openEuler人才认证证书查询</span>
          </div>
          <div class="row">
            <span class="label">正文</span>
            <span class="content">
              <p>姓名： 例：张三</p>
              <p>认证等级： 例：OECA/OECP-M</p>
              <p>考试日期： 2022年8月15日</p>
              <p>考试单位： 例：麒麟信安/软通教育等</p>
            </span>
          </div>
        </div>
      </div>
    </OCard>
  </div>
</template>

<style scoped lang="scss">
.talent-query-card {
  margin-top: 40px;
  color: var(--o-color-info1);
  :deep(.o-card-content) {
    .talent-query-main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 32px;
      @include text1;
      .query-intro {
        @include text1;
      }
      .query-template-title {
        margin-top: 16px;
      }
      .query-template {
        margin-top: 12px;
        .row {
          margin-bottom: 15px;
        }
        .label {
          background-color: var(--o-color-primary2);
          font-weight: 500;
          width: 150px;
          display: inline-block;
          vertical-align: top;
        }
        .content {
          display: inline-block;
        }
      }
    }
  }
}
</style>
