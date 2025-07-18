<script lang="ts" setup>
import { ref, onMounted, computed, watch, onUnmounted, nextTick } from 'vue';

import { useRouter } from 'vitepress';

import { useDebounceFn, useThrottleFn, onClickOutside } from '@vueuse/core';

import { useCommon } from '@/stores/common';

import {
  OIcon,
  OTag,
  OButton,
  OPopover,
  ODivider,
  OPagination,
  ORadioGroup,
  ORadio,
  OToggle,
  ORow,
  OCol,
  OLink,
  OScroller,
  OSelect,
  OOption,
  OInput,
  ODialog,
} from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import type { SigCompleteItemT, GroupInfoT } from '~@/@types/type-sig';

import { getSigLandscape, getSigList, getSigFilter } from '~@/api/api-sig';

import IconGitee from '~icons/app-new/icon-gitee.svg';
import IconSearch from '~icons/app-new/icon-search.svg';
import IconUser from '~icons/sig/icon-user.svg';
import IconSigSpace from '~icons/sig/sig-space.svg';
import IconNotice from '~icons/sig/icon-notice.svg';
import IconFilter from '~icons/sig/icon-filter.svg';

const { locale, t } = useLocale();
const { isLaptop, isPadH, lePadV } = useScreen();

const COUNT_PER_PAGE = [10, 20, 30];
const commonStore = useCommon();

const router = useRouter();

const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

interface TagOptionT {
  value: string;
  label: {
    zh: string;
    en: string;
  };
}
interface SearchItemT {
  name: string;
  path: string;
  socre: number;
}

const sigQuery = ref({
  pageSize: 10,
  page: 1,
});

// 筛选相关
const allSigInfo = ref<SigCompleteItemT[]>([]);
const activeRepo = ref('');

const sigVisible = ref(false);
const queryGetSigList = () => {
  getSigList().then((res) => {
    allSigInfo.value = res.data.sort((a, b) =>
      a.sig_name.localeCompare(b.sig_name)
    );
    sigVisible.value = true;
  });
};

// -------------------- 搜索筛选分类 ---------------------
const searchType = ref('all');
const placeholderType = ref(t('sig.searchSig'));

const sigOptions = [
  { label: t('sig.all'), value: 'all', placeholder: t('sig.searchSig') },
  {
    label: t('sig.sigGroup'),
    value: 'sig',
    placeholder: t('sig.searchSigName'),
  },
  {
    label: t('sig.repo'),
    value: 'repos',
    placeholder: t('sig.searchSigRepo'),
  },
  {
    label: 'Maintainer',
    value: 'maintainer',
    placeholder: t('sig.searchSigMaintainer'),
  },
];

const getSearchType = (val: string) => {
  const item = sigOptions.find((e) => e.value === val);
  placeholderType.value = item?.placeholder as string;
  enterSearchType.value = val;
  sigSearch()
};

// -------------------- 筛选分类 ---------------------
const featureType = ref('all');
const featureArr = ref<TagOptionT[]>([]);

const landscapeVisible = ref(false);
const landscapeList = ref<GroupInfoT[]>([]);

const constructLandscapeMap = () => {
  getSigLandscape().then((res) => {
    landscapeList.value = [];
    res.data.forEach((sig) => {
      delete sig.created_at;
      landscapeList.value.push(sig);
    });
    landscapeVisible.value = true;

    const arr = res.data.reduce((result: GroupInfoT[], item: GroupInfoT) => {
      const existItem = result.find((i) => i.feature === item.feature);
      if (!existItem && item.feature) {
        result.push(item);
      }
      return result;
    }, []);

    arr.forEach((item) => {
      featureArr.value.push({
        value: item.en_feature,
        label: {
          zh: item.feature,
          en: item.en_feature,
        },
      });
    });
    featureArr.value.push({
      value: '',
      label: {
        zh: '其他',
        en: 'Other',
      },
    });
    featureArr.value.unshift({
      value: 'all',
      label: {
        zh: '全部',
        en: 'All',
      },
    });
  });
};

const clearChecked = (val: boolean) => {
  sigQuery.value.page = 1;
  sigQuery.value.pageSize = 10;
  filterVisible.value = false;
  if (val) {
    setTimeout(() => {
      featureType.value = 'all';
    });
  }
};

const sigList = ref([]);
const sigDataVisible = ref();
const mergedArray = () => {
  const mergedArray = allSigInfo.value.reduce((acc, item) => {
    const match = landscapeList.value.find(
      (subItem) => subItem.sig_names === item.sig_name
    );
    if (match) {
      acc.push({ ...item, ...match });
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
  sigList.value = mergedArray;
  sigDataVisible.value = true;
};

watch(
  () => [sigVisible.value, landscapeVisible.value],
  (val) => {
    if (val[0] && val[1]) {
      mergedArray();
    }
  }
);

// 去重
const uniqueArray = (array: SearchItemT[]) => {
  return array?.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.name === item.name
    ))
  );
}

// -------------------- 搜索 input字段做防抖处理，不统一使用useVModels  --------------------
const sigInput = ref('');
const showPanel = ref(false);
const hasSearchData = ref();

const sigSearch = () => {
  hasSearchData.value = [];
  const params = {
    keyword: sigInput.value,
    keywordType: searchType.value,
  }
  getSigFilter(params).then((res) => {
    const list = [
      {
        id: 'sig',
        label: t('sig.sigGroup'),
        list: uniqueArray(res['name.keyword'])?.sort((a, b) => b.socre - a.socre)?.splice(0, 3) || [],
      },
      {
        id: 'repos',
        label: t('sig.repo'),
        list: uniqueArray(res['repos'])?.sort((a, b) => b.socre - a.socre)?.splice(0, 3) || [],
      },
      {
        id: 'maintainer',
        label: 'Maintainer',
        list: uniqueArray(res['giteeIds'])?.sort((a, b) => b.socre - a.socre)?.splice(0, 3) || [],
      },
    ];
    if (searchType.value === 'all') {
      hasSearchData.value = list;
    } else {
      const arr = list.find((item) => item.id === searchType.value);
      hasSearchData.value = [arr];
    }

    for (let i = 0; i < hasSearchData.value.length; i++) {
      const arr = hasSearchData.value[i].list;
      arr.forEach(item => {
        const regex = new RegExp(`(${sigInput.value})`, 'gi');
        const text = item.name.replace(/<[^>]+>/g, '');
        item.name = text.replace(regex, '<span class="highlight-text">$1</span>');
      })
    }
  }).catch(() => {
    hasSearchData.value = [
      {
        id: 'sig',
        label: t('sig.sigGroup'),
        list: [],
      },
      {
        id: 'repos',
        label: t('sig.repo'),
        list: [],
      },
      {
        id: 'maintainer',
        label: 'Maintainer',
        list: [],
      },
    ];
  });
}

const updataSig = (val: string) => {
  sigInput.value = val;
  sigQuery.value.page = 1;
  sigQuery.value.pageSize = 10;
  sigSearch()
};
const debounceFn = useDebounceFn(updataSig, 300);
const debounceSig = computed({
  get() {
    return sigInput.value.trim();
  },
  set(val) {
    debounceFn(val as string);
  },
});

const showSearchData = computed(() => {
  return hasSearchData.value?.some((item) => item.list.length);
});

const enterSearchType = ref();
const enterSearchInput = ref();
const changeSearchInput = (v: string) => {
  if (v === '') {
    return;
  }

  showPanel.value = false;
  enterSearchType.value = searchType.value;
  enterSearchInput.value = sigInput.value;
};

const nameRegex = (val: string) => {
  return val?.replace(/<[^>]+>/g, '') || val;
}

const clickItem = (val: string) => {
  sigInput.value = val?.replace(/<[^>]+>/g, '');

  showPanel.value = false;
  enterSearchType.value = searchType.value;
  enterSearchInput.value = sigInput.value;
};

const clearInput = () => {
  sigInput.value = '';
  enterSearchInput.value = '';
}

const panelRef = ref()
onClickOutside(panelRef, () => {
  showPanel.value = false;
});

const toSigDetail = (sigName: string) => {
  router.go(`/${locale.value}/sig/${sigName}`);
};

watch(
  () => sigInput.value,
  (val) => {
    showPanel.value = true;
    if (!val) {
      showPanel.value = false;
      enterSearchInput.value = val;
    }
  }
);

const filterSigData = ref([]);
const filterSearchData = ref([]);
const filterDataMb = ref([]);
watch(
  () => [
    featureType.value,
    enterSearchType.value,
    enterSearchInput.value,
    sigQuery.value.page,
    sigQuery.value.pageSize,
    sigDataVisible.value,
  ],
  (val) => {
    if (!val[5]) {
      return true;
    }
    // 分类
    const filterFeatureType =
      val[0] !== 'all'
        ? sigList.value.filter((item) => item.en_feature === val[0])
        : sigList.value;
    // 筛选
    if (val[1] === 'sig' && val[2]) {
      // 匹配sig name 和 sig description
      filterSearchData.value = filterFeatureType.filter(
        (item) => {
          const name = item.sig_name.toLowerCase().includes(val[2].toLowerCase())
          const desc = item?.description?.toLowerCase().includes(val[2].toLowerCase())

          return name || desc
        });
    }
    if (val[1] === 'repos' && val[2]) {
      filterSearchData.value = filterFeatureType.filter((item) => {
        const index = item.repos.findIndex(text => text.includes(val[2]))
        return index > -1
      });
    }
    if (val[1] === 'maintainer' && val[2]) {
      // maintainer name 和 maintainer giteeId
      filterSearchData.value = filterFeatureType.filter(
        (item) => {
          const nameIndex = item.maintainer_info.findIndex(text => text?.name?.includes(val[2]))
          const giteeIdIndex = item.maintainer_info.findIndex(text => text?.gitee_id?.includes(val[2]))
          return nameIndex > -1 || giteeIdIndex > -1
        });
    }
    if (val[1] === 'all' && val[2]) {
      filterSearchData.value = filterFeatureType.filter(
        (item) => {
          const name = item.sig_name.toLowerCase().includes(val[2].toLowerCase())
          const desc = item?.description?.toLowerCase().includes(val[2].toLowerCase())
          const repoIndex = item.repos.findIndex(text => text.includes(val[2]))
          const maintainerNameIndex = item.maintainer_info.findIndex(text => text?.name?.includes(val[2]))
          const maintainerGiteeIdIndex = item.maintainer_info.findIndex(text => text?.gitee_id?.includes(val[2]))
          return name || desc || repoIndex > -1 || maintainerNameIndex > -1 || maintainerGiteeIdIndex > -1
        });
    }
    if (!val[2]) {
      filterSearchData.value = filterFeatureType;
    }

    if (!lePadV.value) {
      filterSigData.value = filterSearchData.value.slice(
        (val[3] - 1) * val[4],
        val[3] * val[4]
      );
    } else {
      filterSigData.value = filterSearchData.value.slice(0, val[3] * val[4]);
    }
    filterSigData.value.sort((a, b) => {
      let aHasSearchTerm = a.sig_name.toLowerCase().includes(val[2]?.toLowerCase());
      let bHasSearchTerm = b.sig_name.toLowerCase().includes(val[2]?.toLowerCase());
      
      if (aHasSearchTerm && !bHasSearchTerm) return -1;
      if (!aHasSearchTerm && bHasSearchTerm) return 1;
      return 0;
    });
  },
  { immediate: true }
);

const gap = computed(() => {
  if (isLaptop.value) {
    return '24px 24px';
  } else if (isPadH.value) {
    return '16px 16px';
  } else if (lePadV.value) {
    return '0 12px';
  } else {
    return '32px 32px';
  }
});

// 移动端翻页
// 移动端滑动加载事件

const filterVisible = ref(false);

const getMoreDataMo = () => {
  filterDataMb.value = filterSearchData.value.slice(
    0,
    sigQuery.value.page * sigQuery.value.pageSize
  );
  sigQuery.value.page++;
};

// 移动端筛选
const featureTypeMb = ref('all');
const resetVersion = () => {
  featureType.value = 'all';
  filterVisible.value = false;
}
const confirmVersion = () => {
  sigQuery.value.page = 1;
  sigQuery.value.pageSize = 10;
  filterVisible.value = false;
  featureType.value = featureTypeMb.value;
}

const footer = ref();

const listenScroll = () => {
  if (!lePadV.value) {
    return;
  }
  nextTick(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    footer.value = document.querySelector('#app > .footer');

    const scroll = scrollTop + clientHeight + footer.value.clientHeight;

    if (
      scroll >= scrollHeight &&
      filterDataMb.value.length < filterSearchData.value.length
    ) {
      getMoreDataMo();
    }
  });
};

// 使用 lodash 限制滚动事件触发频率
const throttleEvent = useThrottleFn(listenScroll, 300);

onMounted(() => {
  queryGetSigList();
  constructLandscapeMap();
  window.addEventListener('scroll', throttleEvent);
});

onUnmounted(() => {
  window.removeEventListener('scroll', throttleEvent);
});
</script>
<template>
  <AppSection :title="$t('sig.sigList')" class="sig-list">
    <div class="filter-box" :class="`filter-box-${locale}`">
      <div v-if="!lePadV" class="filter-type">
        <p class="filter-title">{{ t('sig.type') }}</p>
        <ORadioGroup
          v-model="featureType"
          :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }"
        >
          <ORadio
            v-for="option in featureArr"
            :key="option.value"
            :value="option.value"
          >
            <template #radio="{ checked }">
              <OToggle
                :class="['tag-normal', { active: checked }]"
                :style="{
                  '--toggle-size': '32px',
                  '--toggle-padding': '4px 16px',
                  '--toggle-radius': '4px',
                }"
                :checked="checked"
                @click="clearChecked(checked)"
              >
                {{ option.label[locale] }}
              </OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
      <ODivider
        v-if="!lePadV"
        direction="h"
        :style="{ '--o-divider-gap': '16px' }"
      />
      <div class="filter-select-box">
        <div ref="panelRef" class="filter-select"  :class="{'filter-select-focus': showPanel}">
          <OSelect
            v-model="searchType"
            size="large"
            trigger="click"
            variant="outline"
            @change="getSearchType"
          >
            <OOption
              v-for="item in sigOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </OSelect>
          <OInput
            v-model="debounceSig"
            @focus.capture="showPanel = true"
            size="large"
            clearable
            :placeholder="placeholderType"
            @press-enter="(v) => changeSearchInput(v)"
            @clear="clearInput"
          >
            <template #prefix>
              <OIcon><IconSearch /></OIcon>
            </template>
          </OInput>
          <div v-if="showPanel">
            <div v-if="sigInput" class="search-data">
              <div v-for="item in hasSearchData" :key="item.id" class="item-data">
                <p v-if="searchType === 'all'" class="label">{{ item.label }}</p>
                <template v-if="item.list.length">
                  <template v-for="it in item.list" :key="it || it.gitee_id">
                    <div @click.stop="clickItem(it?.name)" class="panel-item">
                      <span
                        v-dompurify-html="it?.name"
                        :title="nameRegex(it?.name)"
                        class="title"
                      ></span>
                    </div>
                  </template>
                </template>
                <p class="no-item-result" v-else>{{ t('sig.noResult') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="lePadV" class="filter-btn">
        <OButton
          variant="text"
          color="normal"
          class="select-btn"
          @click="filterVisible = true"
        >
          <OIcon><IconFilter /></OIcon>
          <span class="text">{{ t('sig.filter') }}</span>
        </OButton>
      </div>
    </div>
    <div v-if="featureType !== 'all' || enterSearchInput" class="filter-result-tip">
      <div v-if="sigInput">
        <span>{{t('sig.filterResultTip1')}}</span>
        <span class="num">{{filterSearchData.length}}</span>
        <span>{{t('sig.filterResultTip2')}}</span>
        <span v-if="locale === 'zh'" class="num">{{sigInput}}</span>
        <span>{{t('sig.filterResultTip3')}}</span>
      </div>
      <div v-else>
        <span>{{t('sig.filterResultTip4')}}</span>
        <span class="num">{{filterSearchData.length}}</span>
        <span>{{t('sig.filterResultTip5')}}</span>
      </div>
    </div>
    <ORow
      v-if="filterSigData.length"
      :gap="gap"
      wrap="wrap"
      class="sig-card-list"
      :class="{'sig-card-list-tip': featureType !== 'all' || enterSearchInput}"
    >
      <OCol
        :flex="lePadV ? '0 0 100%' : '0 0 50%'"
        v-for="sig in filterSigData"
        :key="sig.sig_name"
      >
        <div v-if="!lePadV" class="sig-card">
          <div class="title-top">
            <span class="sig-name" @click="toSigDetail(sig.sig_name)">{{
              sig.sig_name
            }}</span>
            <OTag variant="outline" class="type-tag">
              {{ (locale === 'zh' ? sig.feature : sig.en_feature) || t('sig.other') }}
            </OTag>
          </div>
          <div class="sig-link">
            <OLink
              :href="`https://gitee.com/openeuler/community/tree/master/sig/${sig.sig_name}`"
              target="_blank"
            >
              <OIcon class="gitee-icon">
                <IconGitee />
              </OIcon>
            </OLink>
            <ODivider
              direction="v"
              :style="{ '--o-divider-label-gap': '0 8px' }"
            />
            <OLink
              color="primary"
              :href="`mailto:${sig.mailing_list}`"
              target="_blank"
            >
              {{ sig.mailing_list }}
            </OLink>
            <OButton
              v-if="
                sig.mailing_list?.split('@').length &&
                sig.mailing_list?.split('@')[1] === 'openeuler.org'
              "
              size="medium"
              color="primary"
              :href="`https://mailweb.openeuler.org/postorius/lists/${sig.mailing_list}/`"
              target="_blank"
            >
              {{ $t('sig.subscribe') }}
            </OButton>
          </div>
          <div
            :title="activeRepo ? '' : sig.description"
            class="sig-description"
          >
            <div v-if="!activeRepo">
              {{ sig.description }}
            </div>
            <div v-else class="repo">
              <div class="lebal">{{ $t('sig.repo') }}:</div>
              <OLink
                color="primary"
                :href="`https://gitee.com/${activeRepo}`"
                target="_blank"
              >
                {{ activeRepo }}
              </OLink>
            </div>
          </div>
          <div class="sig-bottom">
            <div class="item-bottom">
              <OIcon><IconSigSpace /></OIcon>
              <OPopover
                position="top"
                trigger="hover"
                wrap-class="sig-popup-repos"
              >
                <template #target>
                  <p class="text">{{t('sig.repo')}} {{ sig.repos?.length }}</p>
                </template>
                <div class="popup-content">
                  <OScroller showType="always" size="small">
                    <OLink
                      v-for="(item, i) in sig.repos"
                      :key="item"
                      class="repo-item"
                      color="primary"
                      :href="`https://gitee.com/${item}`"
                      target="_blank"
                    >
                      {{ item + (i === sig.repos.length - 1 ? '' : '、') }}
                    </OLink>
                  </OScroller>
                </div>
              </OPopover>
            </div>
            <ODivider
              direction="v"
              :style="{ '--o-divider-label-gap': '0 8px', 'height': '12px' }"
            />
            <div class="item-bottom">
              <OIcon><IconUser /></OIcon>
              <OPopover
                position="top"
                trigger="hover"
                wrap-class="sig-popup-maintainers"
              >
                <template #target>
                  <p class="text">Maintainer {{ sig.maintainers?.length }}</p>
                </template>
                <div class="popup-content">
                  <OScroller showType="always" size="small">
                    <OLink
                      v-for="(item, i) in sig.maintainers"
                      :key="item"
                      class="repo-item"
                      color="primary"
                      :href="`https://gitee.com/${item}`"
                      target="_blank"
                    >
                      {{
                        item + (i === sig.maintainers.length - 1 ? '' : '、')
                      }}
                    </OLink>
                  </OScroller>
                </div>
              </OPopover>
            </div>
          </div>
        </div>
        <div v-else class="sig-card">
          <div class="title-top">
            <span class="sig-name" @click="toSigDetail(sig.sig_name)">{{
              sig.sig_name
            }}</span>
            <OTag variant="outline" class="type-tag">
              {{ (locale === 'zh' ? sig.feature : sig.en_feature) || t('sig.other') }}
            </OTag>
          </div>
          <div
            :title="activeRepo ? '' : sig.description"
            class="sig-description"
          >
            <div v-if="!activeRepo">
              {{ sig.description }}
            </div>
            <div v-else class="repo">
              <div class="lebal">{{ $t('sig.repo') }}:</div>
              <OLink
                color="primary"
                :href="`https://gitee.com/${activeRepo}`"
                target="_blank"
              >
                {{ activeRepo }}
              </OLink>
            </div>
          </div>
          <ODivider direction="h" :style="{ '--o-divider-gap': '8px' }" />
          <div class="sig-link">
            <OIcon class="gitee-icon">
              <IconGitee />
            </OIcon>
            <OLink
              color="primary"
              :href="`https://gitee.com/openeuler/community/tree/master/sig/${sig.sig_name}`"
              target="_blank"
              class="icon-link"
            >
              {{ `https://gitee.com...sig/${sig.sig_name}` }}
            </OLink>
          </div>
          <div class="sig-link">
            <OIcon class="gitee-icon">
              <IconNotice />
            </OIcon>
            <OLink
              color="primary"
              :href="`mailto:${sig.mailing_list}`"
              target="_blank"
              class="icon-link"
            >
              {{ sig.mailing_list }}
            </OLink>
            <OLink
              v-if="
                sig.mailing_list?.split('@').length &&
                sig.mailing_list?.split('@')[1] === 'openeuler.org'
              "
              color="primary"
              :href="`https://mailweb.openeuler.org/postorius/lists/${sig.mailing_list}/`"
              target="_blank"
              class="subscribe"
            >
              {{ $t('sig.subscribe') }}
            </OLink>
          </div>
          <div class="sig-bottom">
            <div class="item-bottom">
              <OIcon><IconSigSpace /></OIcon>
              <OPopover
                position="top"
                trigger="hover"
                wrap-class="sig-popup-repos"
              >
                <template #target>
                  <p class="text">{{t('sig.repo')}} {{ sig.repos?.length }}</p>
                </template>
                <div class="popup-content">
                  <OScroller showType="always" size="small">
                    <OLink
                      v-for="(item, i) in sig.repos"
                      :key="item"
                      class="repo-item"
                      color="primary"
                      :href="`https://gitee.com/${item}`"
                      target="_blank"
                    >
                      {{ item + (i === sig.repos.length - 1 ? '' : '、') }}
                    </OLink>
                  </OScroller>
                </div>
              </OPopover>
            </div>
            <ODivider
              direction="v"
              :style="{ '--o-divider-label-gap': '0 8px' }"
            />
            <div class="item-bottom">
              <OIcon><IconUser /></OIcon>
              <OPopover
                position="top"
                trigger="hover"
                wrap-class="sig-popup-maintainers"
              >
                <template #target>
                  <p class="text">Maintainer {{ sig.maintainers?.length }}</p>
                </template>
                <div class="popup-content">
                  <OScroller showType="always" size="small">
                    <OLink
                      v-for="(item, i) in sig.maintainers"
                      :key="item"
                      class="repo-item"
                      color="primary"
                      :href="`https://gitee.com/${item}`"
                      target="_blank"
                    >
                      {{
                        item + (i === sig.maintainers.length - 1 ? '' : '、')
                      }}
                    </OLink>
                  </OScroller>
                </div>
              </OPopover>
            </div>
          </div>
        </div>
      </OCol>
    </ORow>
    <ResultEmpty
      v-else
      :style="{
        'margin-top': '40px',
        '--result-image-width': '140px',
        '--result-image-height': '170px',
      }"
    />
    <p
      v-if="
        lePadV &&
        filterDataMb.length &&
        filterDataMb.length < filterSearchData.length
      "
      class="loading"
    >
      {{ t('sig.loading') }}
    </p>
    <!-- 页码 -->
    <div v-if="filterSearchData.length > COUNT_PER_PAGE[0]" class="pagination">
      <OPagination
        v-model:page="sigQuery.page"
        v-model:page-size="sigQuery.pageSize"
        :layout="['total', 'pagesize', 'pager', 'jumper']"
        :total="filterSearchData.length"
        :page-sizes="COUNT_PER_PAGE"
        :show-more="true"
      />
    </div>
  </AppSection>
  <ODialog
    v-model:visible="filterVisible"
    :phone-half-full="lePadV"
    :scrollbar="{ showType: 'always', size: 'small' }"
    size="medium"
    :style="{ '--dlg-radius': '4px 4px 0 0' }"
    class="filter-body"
  >
    <template #header>
      <span class="del-title">{{ t('sig.type') }}</span>
    </template>
    <div class="dlg-body">
      <p class="filter-title">{{ t('sig.type') }}</p>
      <ORadioGroup v-model="featureTypeMb" :style="{ gap: '8px 8px' }">
        <ORadio
          v-for="option in featureArr"
          :key="option.value"
          :value="option.value"
        >
          <template #radio="{ checked }">
            <OToggle
              :class="{ active: checked }"
              :checked="checked"
              :style="{ '--toggle-size': '28px', '--toggle-padding': '6px 16px', '--toggle-radius': '4px' }"
            >
              {{ option.label[locale] }}
            </OToggle>
          </template>
        </ORadio>
      </ORadioGroup>
    </div>
    <div class="btn">
      <OButton color="normal" variant="text" size="large" @click="resetVersion">{{ t('common.reset') }}</OButton>
      <ODivider class="divider-btn" direction="v" />
      <OButton color="normal" variant="text" size="large" @click="confirmVersion">{{ t('common.confirm') }}</OButton>
    </div>
  </ODialog>
</template>

<style scoped lang="scss">
.sig-list {
  .filter-box {
    background-color: var(--o-color-fill2);
    padding: 24px 32px;
    border-radius: var(--o-radius-xs);

    .filter-type {
      display: flex;
      align-items: flex-start;
    }

    .filter-title {
      flex-shrink: 0;
      color: var(--o-color-info1);
      font-weight: 500;
      margin-right: 40px;
      margin-top: 4px;
      @include text1;
    }

    .o-toggle {
      --toggle-size: 32px;
      --toggle-padding: 3px 15px;
      --toggle-radius: 4px;
      max-height: 32px;
      color: var(--o-color-info1);
      border: 1px solid var(--o-color-control2-light);
      --toggle-bg-color: var(--o-color-control2-light);
      --toggle-bg-color-hover: var(--o-color-control3-light);
      @include text1;
    }
    .o-radio + .o-radio {
      margin-left: 0;
    }

    .active {
      background-color: transparent;
      color: var(--o-color-primary1);
      border: 1px solid var(--o-color-primary1);
    }

    .filter-select-box {
      display: flex;
      justify-content: flex-end;
    }
    .filter-select {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      z-index: 9;
      border: 1px solid var(--o-color-control1);
      border-radius: var(--o-radius-xs);
      @include hover {
        border: 1px solid var(--o-color-primary2);
      }
    }
    .filter-select-focus {
      border: 1px solid var(--o-color-primary3);
    }
    :deep(.o-select) {
      --select-height: 40px;
      --select-icon-size: 24px;
      max-width: 135px;
      border-radius: var(--o-radius-xs) 0 0 var(--o-radius-xs);
      border: none;
      border-right: 1px solid var(--o-color-control1);
    }

    .o-input {
      :deep(.o_box) {
        width: 320px;
        --box-height: 40px;
        --box-bd-color-hover: var(--o-color-control1);
        --box-bd-color-focus: var(--o-color-control1);
        .o_box-main {
          border: none;
        }
        .o_input {
          width: 100%;
        }
        .o-icon {
          --icon-size: 24px;
        }
      }
    }

    .search-data {
      position: absolute;
      top: 44px;
      right: 0;
      width: 320px;
      background-color: var(--o-color-fill2);
      padding: 4px;
      border-radius: var(--o-radius-xs);
      box-shadow: var(--o-shadow-2);
    }
    .item-data + .item-data {
      margin-top: 4px;
    }
    .label {
      color: var(--o-color-info3);
      padding: 4px 8px;
      @include tip2;
    }
    .panel-item {
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border-radius: var(--o-radius-xs);

      @include hover {
        background-color: var(--o-color-control2-light);
      }

      :deep(.highlight-text) {
        color: var(--o-color-link1);
      }
    }
    .title {
      color: var(--o-color-info1);
      @include text1;
      @include text-truncate(1);
    }
    .name {
      color: var(--o-color-info3);
      @include tip1;
    }
    .o-scroller {
      max-height: 120px;
    }
    .no-item-result {
      padding: 8px 12px;
      color: var(--o-color-info3);
      @include tip1;
    }
  }
  .filter-box-en {
    :deep(.o-select) {
      max-width: 150px;
    }

    .o-input {
      :deep(.o_box) {
        width: 380px;
      }
    }

    .search-data {
      width: 380px;
    }
  }

  @include respond-to('<=pad_v') {
    .filter-box {
      background-color: transparent;
      padding: 0;

      .filter-select-box,
      .filter-select {
        width: 100%;
      }

      :deep(.o-select) {
        --select-height: 38px;
        max-width: 100%;
        width: 40%;
      }
      .o-input {
        width: 60%;
        :deep(.o_box) {
          width: 100%;
          --box-height: 38px;
        }
      }

      .filter-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 8px;
        position: relative;
        .o-icon {
          --icon-size: 16px;
        }
        .text {
          margin-left: 8px;
        }
      }
    }
  }

  .filter-result-tip {
    margin-top: 24px;
    color: var(--o-color-info3);
    font-weight: 400;
    @include tip1;
    .num {
      color: var(--o-color-info1);
    }
    @include respond-to('<=pad_v') {
      margin-top: 16px;
      @include text2;
    }
  }
  .sig-card-list {
    margin-top: 24px;
    .sig-card {
      height: 100%;
      background-color: var(--o-color-fill2);
      padding: 24px 32px;
      border-radius: var(--o-radius-xs);
    }
    .title-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sig-name {
      cursor: pointer;
      color: var(--o-color-info1);
      font-weight: 500;
      @include h3;
      @include hover {
        color: var(--o-color-primary1);
      }
    }
    .type-tag {
      --tag-bd-color: var(--o-color-control4);
    }
    .sig-link {
      display: flex;
      align-items: center;
      margin-top: 8px;
    }
    .o-link {
      padding: 0;
      @include text1;
      :deep(.o-link-label) {
        display: flex;
      }
      @include respond-to('<=pad_v') {
        @include text2;
      }
    }
    .gitee-icon {
      --icon-size: 24px;
    }
    .o-btn {
      margin-left: 12px;
    }
    .sig-description {
      margin-top: 12px;
      color: var(--o-color-info2);
      height: 44px;
      @include text-truncate(2);
      @include tip1;
      @include respond-to('<=laptop') {
        height: 36px;
      }
      @include respond-to('<=pad_v') {
        margin-top: 6px;
        order: 1;
        height: auto;
        @include text1;
      }
      .repo {
        display: flex;
        .lebal {
          color: var(--o-color-info1);
          font-weight: 500;
          margin-right: 8px;
        }
      }
    }
    .sig-bottom {
      display: flex;
      align-items: center;
      margin-top: 16px;
      color: var(--o-color-info3);
      @include tip2;
      .o-icon {
        --icon-size: 16px;
        margin-right: 4px;
      }
      .text {
        cursor: pointer;
      }
      @include respond-to('<=pad_v') {
        @include text1;
      }
    }
    .item-bottom {
      display: flex;
      align-items: center;
    }
  }
  .sig-card-list-tip {
    margin-top: 16px;
  }
  .o-col {
    min-width: 0;
  }

  .pagination {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
    @include respond-to('<=pad_v') {
      display: none;
    }
  }

  @include respond-to('laptop') {
    .sig-card-list {
      .sig-card {
        padding: 16px 24px;
      }
    }
  }
  @include respond-to('pad_h') {
    .sig-card-list {
      .sig-card {
        padding: 16px;
      }
    }
  }
  @include respond-to('<=pad_v') {
    .sig-card-list {
      .sig-card {
        padding: 20px 16px 16px;
        position: relative;
      }
      .type-tag {
        position: absolute;
        top: 8px;
        right: 4px;
      }
      .sig-link {
        margin-top: 8px;
      }
      .icon-link {
        margin-left: 8px;
      }
      .subscribe {
        margin-left: auto;
      }
    }
    .loading {
      text-align: center;
      margin-top: 16px;
      color: var(--o-color-info3);
      @include text1;
    }
  }
}

.dlg-body {
  .filter-title {
    margin-bottom: 12px;
    font-weight: 500;
    @include text2;
  }
  .o-radio + .o-radio {
    margin-left: 0;
  }
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  .o-btn {
    --btn-bg-color-hover: none;
    --btn-bg-color-active: none;
    --btn-padding: 0 50px;
    --btn-color: var(--o-color-info1);
    font-weight: 500;
  }
}
</style>

<style lang="scss">
.sig-popup-repos {
  width: 272px;
  --popup-padding: 9px 0;
  .popup-content {
    height: 176px;
  }
  .o-scroller {
    max-height: 100%;
    padding: 0 16px;
  }
  @include respond-to('<=pad_v') {
    width: 200px;
  }
}
.sig-popup-maintainers {
  width: 168px;
  --popup-padding: 9px 0;
  .popup-content {
    height: 112px;
  }
  .o-scroller {
    max-height: 100%;
    padding: 0 16px;
  }
}
</style>
