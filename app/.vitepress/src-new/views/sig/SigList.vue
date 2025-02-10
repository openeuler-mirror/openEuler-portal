<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';

import {
  OIcon,
  OTag,
  OButton,
  OPopover,
  OPagination,
} from '@opensig/opendesign';

import WordAvatar from '~@/components/WordAvatar.vue';
import AppSection from '~@/components/AppSection.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import type { SigCompleteItemT } from '~@/@types/type-sig';

import { landscapeIconMap } from '~@/data/sig';
import { getSigLandscape, getSigList, getRepoList } from '~@/api/api-sig';

import IconGitee from '~icons/app-new/icon-gitee.svg';
import IconMore from '~icons/sig/more.svg';

const { locale } = useLocale();
const { lePadV } = useScreen();

const COUNT_PER_PAGE = [10, 20, 30];

const repoQuery = ref({
  community: 'openeuler',
  search: 'fuzzy',
});

const sigQuery = ref({
  pageSize: 10,
  page: 1,
});

// 筛选相关
const allSigInfo = ref<SigCompleteItemT[]>([]);
const activeSig = ref('');
const activeRepo = ref('');
const activeMaintainer = ref('');

// 计算筛选之后剩下的版本
const filterSigInfo = computed(() => {
  // 初始化页数
  sigQuery.value.page = 1;
  return allSigInfo.value.filter((item: SigCompleteItemT) => {
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
  if (!lePadV.value) {
    return filterSigInfo.value.slice(
      (sigQuery.value.page - 1) * sigQuery.value.pageSize,
      sigQuery.value.page * sigQuery.value.pageSize
    );
  } else {
    return filterSigInfo.value.slice(0, sigQuery.value.page * sigQuery.value.pageSize);
  }
});

const queryGetSigList = () => {
  getSigList().then((res) => {
    allSigInfo.value = res.data.sort((a, b) =>
      a.sig_name.localeCompare(b.sig_name)
    );
  });
};

const landscapeMap = new Map();
const constructLandscapeMap = () => {
  getSigLandscape().then((res) => {
    res.data.forEach((sig) => {
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
  queryGetSigList();
  constructLandscapeMap();
});

// option 渲染的 maintainers
const renderMaintainers = computed(() => {
  return filterSigInfo.value
    .flatMap((sigInfo) => sigInfo.maintainers)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a.localeCompare(b));
});

// option 渲染的 sigs
const renderRepos = computed(() => {
  return allSigInfo.value.flatMap((sigInfo) => sigInfo.repos);
});
// 构建 v2 select 需要的数据结构
const transformedRepos = computed(() => {
  return renderRepos.value.map((item) => ({ value: item, label: item }));
});

// option 渲染的 sigs
const renderSigs = computed(() => {
  return allSigInfo.value.map((sigInfo) => sigInfo.sig_name);
});

// 移动端翻页
// 移动端滑动加载事件
const getMoreDataMo = () => {
  if (
    lePadV.value &&
    sigQuery.value.page <
      Math.ceil(filterSigInfo.value.length / sigQuery.value.pageSize)
  ) {
    sigQuery.value.page++;
  }
};
</script>
<template>
  <AppSection :title="$t('sig.sigList')" class="sig-list">
    <div class="filter-line">
      <div class="select-box">
        <el-select
          v-model="activeSig"
          :size="lePadV ? 'small' : 'large'"
          filterable
          clearable
          :placeholder="$t('sig.allSig')"
        >
          <el-option
            v-for="sigName in renderSigs"
            :key="sigName"
            :value="sigName"
          />
        </el-select>
        <el-select-v2
          v-model="activeRepo"
          clearable
          filterable
          :size="lePadV ? 'small' : 'large'"
          :fit-input-width="240"
          :options="transformedRepos"
          :placeholder="$t('sig.allRepo')"
        >
        </el-select-v2>
        <el-select
          v-model="activeMaintainer"
          :size="lePadV ? 'small' : 'large'"
          clearable
          filterable
          :placeholder="$t('sig.allMaintainer')"
        >
          <el-option
            v-for="maintainer in renderMaintainers"
            :key="maintainer"
            :value="maintainer"
          />
        </el-select>
      </div>
      <div class="tip">
        {{ $t('sig.sigTip') }}
      </div>
    </div>
    <div
      v-if="renderSigInfo.length"
      v-scroll-bottom="getMoreDataMo"
      class="sig-card-list"
    >
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
            trigger="hover"
            wrap-class="sig-popup-tip"
          >
            <template #target>
              <OIcon class="show-more"><IconMore /></OIcon>
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
    <ResultEmpty
      v-else
      :style="{
        'margin-top': '40px',
        '--result-image-width': '140px',
        '--result-image-height': '170px',
      }"
    />
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
      display: flex;
      @include respond-to('<=pad_v') {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .el-select {
        min-width: 160px;
        border-radius: var(--o-radius-xs);
        overflow: hidden;
        box-shadow: none;
        @include respond-to('<=pad_v') {
          min-width: auto;
          width: 100%;
        }

        &:last-child {
          min-width: 200px;
        }

        :deep(.el-select__caret) {
          color: var(--o-color-info1);
        }

        :deep(.el-select__wrapper) {
          height: 40px;
          border: 1px solid var(--o-color-control1);
          box-shadow: none;
          @include respond-to('<=pad_v') {
            height: fit-content;
          }

          &.is-hovering,
          &.is-focused {
            border: 1px solid var(--o-color-primary1);
          }
        }

        & + .el-select {
          margin-left: 16px;
          @include respond-to('<=pad_v') {
            margin: 0;
          }
        }
      }
    }

    .tip {
      margin-left: 12px;
      color: var(--o-color-info3);
      @include text1;
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
        --tag-bg-color: var(--o-color-fill2);

        position: absolute;
        top: 8px;
        right: 8px;
      }
    }

    .sig-info {
      display: flex;
      justify-content: space-between;

      .sig-info-left {
        display: flex;
        align-items: center;

        .sig-name {
          color: var(--o-color-info1);
          font-weight: 500;
          @include h3;
          @include hover {
            color: var(--o-color-primary1);
          }
        }

        .gitee-icon {
          display: flex;
          align-items: center;
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
          @include respond-to('<=pad_v') {
            display: none;
          }
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

      margin-top: 12px;
      min-height: calc(2 * var(--o-line_height-text1));
      color: var(--o-color-info2);
      @include text1;
      @include respond-to('<=pad_v') {
        min-height: auto;
      }
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
        color: var(--o-color-info3);
        @include tip1;
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
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
    @include respond-to('<=pad_v') {
      display: none;
    }
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
