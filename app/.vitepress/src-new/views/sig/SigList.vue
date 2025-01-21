<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';

import {
  OIcon,
  OTag,
  OSelect,
  OOption,
  OButton,
  OPopover,
  OPagination,
} from '@opensig/opendesign';

import WordAvatar from '~@/components/WordAvatar.vue';
import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import type { SigCompleteItemT } from '~@/@types/type-sig';

import { welcomeJoin, landscapeIconMap } from '~@/data/sig';
import { COUNT_PER_PAGE } from '~@/shared/config';
import { getSigLandscape, getSigList, getRepoList } from '~@/api/api-sig';

import IconGitee from '~icons/app-new/icon-gitee.svg';

const { locale } = useLocale();

const repoQuery = ref({
  community: 'openeuler',
  search: 'fuzzy',
  // pageSize: 12,
  // page: 1,
});

const sigQuery = ref({
  pageSize: 12,
  page: 1,
});

// 筛选相关
const allSigInfo = ref<SigCompleteItemT[]>([]);
const sigNameList = ref<string[]>([]);
const activeSig = ref('');
const activeRepo = ref('');
const activeMaintainer = ref('');

// 计算筛选之后剩下的版本
const filterSigInfo = computed(() => {
  // 初始化页数
  sigQuery.value.page = 1;

  return allSigInfo.value.filter((item: SigCompleteItemT) => {
    console.log(activeSig.value);
    // 按 sig 名称 筛选
    if (activeSig.value && item.sig_name !== activeSig.value) {
      return false;
    }
    // 仓库
    if (activeRepo.value && !item.repos.includes(activeRepo.value)) {
      return false;
    }
    if (
      activeMaintainer.value &&
      !item.maintainers.includes(activeMaintainer.value)
    ) {
      return false;
    }
    return true; // 满足条件，保留此项
  });
});

const renderSigInfo = computed(() => {
  return filterSigInfo.value.slice(
    (sigQuery.value.page - 1) * sigQuery.value.pageSize,
    sigQuery.value.page * sigQuery.value.pageSize
  );
});

const allRepos = ref<string[]>([]);

const queryGetRepoList = () => {
  getRepoList(repoQuery.value).then((res) => {
    allRepos.value = res.data;
  });
};

const allMaintainers = ref<string[]>([]);
const queryGetSigList = () => {
  getSigList().then((res) => {
    allSigInfo.value = res.data.sort((a, b) =>
      a.sig_name.localeCompare(b.sig_name)
    );
    allMaintainers.value = allSigInfo.value
      .flatMap((sigInfo) => sigInfo.maintainers)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
  });
};

const landscapeMap = new Map();
const constructLandscapeMap = () => {
  getSigLandscape().then((res) => {
    sigNameList.value = [];
    res.data.forEach((sig) => {
      sigNameList.value.push(sig.sig_names);
      landscapeMap.set(sig.sig_names, {
        feature: {
          zh: sig.feature,
          en: sig.en_feature,
        },
        icon: sig.en_feature,
      });
    });
  });
};

onMounted(() => {
  console.time()
  queryGetRepoList();
  queryGetSigList();
  constructLandscapeMap();
});
</script>
<template>
  <AppSection :title="$t('sig.sigList')" class="sig-list">
    <div class="filter-line">
      <div class="select-box">
        <OSelect v-model="activeSig" :placeholder="$t('sig.allSig')">
          <OOption value="" :label="$t('sig.allSig')" />
          <OOption
            v-for="sigName in sigNameList"
            :key="sigName"
            :value="sigName"
          />
        </OSelect>
        <OSelect v-model="activeRepo" :placeholder="$t('sig.allRepo')">
          <OOption value="" :label="$t('sig.allRepo')" />
          <OOption v-for="repo in allRepos" :key="repo" :value="repo" />
        </OSelect>
        <OSelect
          v-model="activeMaintainer"
          :placeholder="$t('sig.allMaintainer')"
        >
          <OOption value="" :label="$t('sig.allMaintainer')" />
          <OOption
            v-for="maintainer in allMaintainers"
            :key="maintainer"
            :value="maintainer"
          />
        </OSelect>
      </div>
      <div class="tip">
        {{ $t('sig.sigTip') }}
      </div>
    </div>
    <div class="sig-card-list">
      <div v-for="sig in renderSigInfo" :key="sig.sig_name" class="sig-card">
        <div class="sig-info">
          <div class="sig-info-left">
            <a
              :href="`/${locale}/sig/${sig.sig_name}`"
              rel="noopener noreferrer"
              class="sig-name"
            >
              {{ sig.sig_name }}
            </a>
            <a
              :href="`https://gitee.com/openeuler/community/tree/master/sig/${sig.sig_name}`"
              target="_blank"
              rel="noopener noreferrer"
              class="gitee-icon"
            >
              <OIcon class="icon">
                <IconGitee />
              </OIcon>
            </a>
          </div>
          <div
            v-if="
              landscapeIconMap.get(
                landscapeMap.get(sig.sig_name)?.feature?.en || ''
              )
            "
            class="sig-info-right"
          >
            <OTag>
              <OIcon class="icon">
                <component
                  :is="
                    landscapeIconMap.get(
                      landscapeMap.get(sig.sig_name)?.feature?.en || ''
                    )
                  "
                ></component>
              </OIcon>
              {{ landscapeMap.get(sig.sig_name)?.feature[locale] }}
            </OTag>
          </div>
        </div>
        <div class="sig-mail">
          <a :href="`mailto:${sig.mailing_list}`">
            {{ sig.mailing_list }}
          </a>
          <!--  是openeuler，mailweb服务的邮箱展示  -->
          <a
            v-if="
              sig.mailing_list?.split('@').length &&
              sig.mailing_list?.split('@')[1] === 'openeuler.org'
            "
            class="subscribe-sig"
            :href="`https://mailweb.openeuler.org/postorius/lists/${sig.mailing_list}/`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OButton size="medium" color="primary">
              {{ $t('sig.subscribe') }}
            </OButton>
          </a>
        </div>
        <div :title="sig.description" class="sig-description">
          {{ sig.description }}
        </div>
        <div class="sig-member">
          <a
            v-for="member in sig.maintainers.slice(0, 9)"
            :key="member"
            :href="`https://gitee.com/${member}`"
            target="_blank"
            rel="noopener noreferrer"
            class="member"
          >
            <WordAvatar size="small" :title="member" :name="member">
            </WordAvatar>
          </a>
          <OPopover
            v-if="sig.maintainers.length > 9"
            position="top"
            trigger="click"
            wrap-class="sig-popup-tip"
          >
            <template #target>
              <div class="show-more">...</div>
            </template>
            <a
              v-for="member in sig.maintainers.slice(9)"
              :key="member"
              :href="`https://gitee.com/${member}`"
              target="_blank"
              rel="noopener noreferrer"
              class="member"
            >
              <WordAvatar size="small" :title="member" :name="member">
              </WordAvatar>
            </a>
          </OPopover>
          <div class="contributor-num">
            {{ $t('sig.contributor', { num: sig.maintainers?.length }) }}
          </div>
        </div>
      </div>
    </div>
    <!-- 页码 -->
    <div v-if="filterSigInfo.length > COUNT_PER_PAGE[0]" class="pagination">
      <OPagination
        v-model:page="sigQuery.page"
        v-model:page-size="sigQuery.pageSize"
        :layout="['total', 'pagesize', 'pager', 'jumper']"
        :total="filterSigInfo.length"
        :page-sizes="COUNT_PER_PAGE"
        :show-more="true"
      />
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.sig-list {
  .filter-line {
    display: flex;
    justify-content: space-between;
    .select-box {
      @include respond-to('<=pad_v') {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      .o-select {
        & + .o-select {
          margin-left: 16px;
          @include respond-to('<=pad_v') {
            margin: 0;
          }
        }
      }
    }
    .tip {
      @include text1;
      color: var(--o-color-info3);
      @include respond-to('<=pad_v') {
        display: none;
      }
    }
  }
  .sig-card-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    margin-top: 24px;
    @include respond-to('<=pad_v') {
      margin-top: 12px;
      grid-template-columns: repeat(1, 1fr);
      gap: 12px;
    }
    .sig-card {
      position: relative;
      padding: 24px 32px;
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);
      @include respond-to('<=pad_v') {
        padding: 16px;
      }
      .o-tag {
        position: absolute;
        top: 8px;
        right: 8px;
        --tag-bg-color: var(--o-color-fill2);
      }
    }
    .sig-info {
      display: flex;
      justify-content: space-between;
      .sig-info-left {
        display: flex;
        align-items: center;
        .sig-name {
          @include h3;
          color: var(--o-color-info1);
          font-weight: 500;
        }
        .gitee-icon {
          font-size: var(--o-icon_size-m);
          margin-left: 8px;
        }
      }
      :deep(.o-tag-label) {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 4px;
          font-size: var(--o-icon_size-xs);
        }
      }
    }
    .sig-mail {
      margin-top: 8px;
      .subscribe-sig {
        margin-left: 8px;
      }
    }
    .sig-description {
      @include text-truncate(2);
      @include text1;
      margin-top: 12px;
      min-height: calc(2 * var(--o-line_height-text1));
      color: var(--o-color-info2);
    }
    .sig-member {
      display: flex;
      margin-top: 16px;
      align-items: center;
      .member {
        margin-left: -4px;
      }
      .contributor-num {
        margin-left: 6px;
        @include tip1;
        color: var(--o-color-info3);
      }
      .show-more {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: -4px;
        width: 24px;
        height: 24px;
        font-size: 12px;
        border-radius: 50%;
        border: 1px solid #f7f8fa;
        color: rgba($color: var(--o-black), $alpha: 1);
        background-color: rgba($color: var(--o-white), $alpha: 1);
      }
    }
  }
  .pagination {
    @include respond-to('<=pad_v') {
      display: none;
    }
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<style lang="scss">
.sig-popup-tip {
  display: flex;
  .o-popup-body {
    & > div {
      display: flex;
      & > * {
        margin-left: -4px;
      }
    }
  }
}
</style>
