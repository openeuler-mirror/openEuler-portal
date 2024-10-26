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
              <a href="mailto:oecxonline@openeuler.sh"
                >mailto:oecxonline@openeuler.sh</a
              >
            </template>
          </i18n-t>
        </div>
        <div class="query-template-title">
          {{ $t('talent.templateTitle') }}
        </div>
        <div class="query-template">
          <div class="row">
            <span class="label">{{ $t('talent.addressee') }}</span>
            <span class="content">
              <a href="mailto:oecxonline@openeuler.sh"
                >oecxonline@openeuler.sh</a
              >
            </span>
          </div>
          <div class="row">
            <span class="label">{{ $t('talent.theme') }}</span>
            <span class="content">{{ $t('talent.themeContent') }}</span>
          </div>
          <div class="row">
            <span class="label">{{ $t('talent.text') }}</span>
            <span class="content">
              <div>
                {{ $t('talent.name') }}
                <span class="gray">{{ $t('talent.nameExp') }}</span>
              </div>
              <div>
                {{ $t('talent.certificationLevel') }}
                <span class="gray">{{
                  $t('talent.certificationLevelExp')
                }}</span>
              </div>
              <div>
                {{ $t('talent.date')
                }}<span class="gray">{{ $t('talent.dateExp') }}</span>
              </div>
              <div>
                {{ $t('talent.location') }}
                <span class="gray">{{ $t('talent.locationExp') }}</span>
              </div>
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
      @include text1;
      .query-intro {
        color: var(--o-color-info2);
      }
      .query-template-title {
        margin-top: 16px;
        color: var(--o-color-info1);
        font-weight: 500;
      }
      .query-template {
        margin-top: 12px;
        border-radius: var(--o-radius-xs);
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.15);
        .row {
          display: flex;
          &:not(:last-child) {
            .content {
              border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            }
          }
        }
        .label {
          padding: 12px;
          background-color: #c7d4ed;
          background-color: var(--o-color-control3-light);
          font-weight: 500;
          width: 150px;
          text-align: center;
        }
        .content {
          display: inline-block;
          padding: 12px;
          width: 100%;
          color: var(--o-color-info1);
          .gray {
            color: var(--o-color-info3);
          }
        }
      }
    }
  }
}
</style>
