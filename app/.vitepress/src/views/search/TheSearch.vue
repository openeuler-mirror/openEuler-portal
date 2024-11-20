<script setup lang="ts">
import { computed, watch, ref, onMounted, reactive, nextTick } from 'vue';
import { useData } from 'vitepress';
import { oa } from '@/shared/analytics';
import { useI18n } from '@/i18n';
import {
  getSearchData,
  getSearchCount,
  getSearchRpm,
  getRelevant,
  getTagsData,
  getChatapi,
} from '@/api/api-search';
import { useCookieStore } from '@/stores/common';

import IconSearch from '~icons/app/icon-search.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconLike from '~icons/app/icon-like.svg';
import IconUnlike from '~icons/app/icon-unlike.svg';
import IconStomp from '~icons/app/icon-stomp.svg';
import IconUnstomp from '~icons/app/icon-unstomp.svg';
import IconMore from '~icons/app/icon-more-dot.svg';

import OIcon from 'opendesign/icon/OIcon.vue';
import ODropdown from 'opendesign/dropdown/ODropdown.vue';
import NotFound from '@/NotFound.vue';
import ViewAgreeModal from './ViewAgreeModal.vue';
import MatterTip from './MatterTip.vue';
import SearchRecommend from './SearchRecommend.vue';

import { ElMessage } from 'element-plus';
import { AigcPrivacyAccepted } from '@/shared/privacy-accepted.const';
import { useStoreData, isLogined, showGuard } from '@/shared/login';
import { uniqueId } from '@/shared/utils';

import useClickOutside from '@/components/hooks/useClickOutside';

const searchRecommendRef = ref();
const searchRef = ref();
const isClickOutside = useClickOutside(searchRef) || false;

const { guardAuthClient } = useStoreData();
const { lang, site } = useData();
const i18n = useI18n();
// 隐私弹窗
const viewAgreeVisible = ref(false);
// 当前选择类型
const currentTab = ref('all');
// 当前显示的页码
const currentPage = ref(1);
// 每页数据
const pageSize = ref(12);
// 搜索内容
const searchInput = ref('');
const currentSearchVal = ref('');
const tips = computed(() => {
  return i18n.value.common.SEARCH;
});
// 接收搜索数量的数据
const searchNumber: any = ref([]);
// 搜索框是否获取焦点
const isFocus = ref(false);

const searchData = computed(() => {
  return {
    keyword:
      searchInput.value ||
      decodeURIComponent(window.location.href.split('=')[1]),
    page: currentPage.value,
    pageSize: pageSize.value,
    lang: lang.value,
    type: currentTab.value === 'all' ? '' : currentTab.value,
    limit: [
      {
        type: currentTab.value || 'docs',
        version:
          activeVersion.value === i18n.value.search.tagList.all
            ? ''
            : activeVersion.value,
      },
    ],
  };
});
const searchCount = computed(() => {
  return {
    keyword: searchInput.value,
    lang: lang.value,
    docsVersion:
      activeVersion.value === i18n.value.search.tagList.all
        ? ''
        : activeVersion.value,
    limit: [
      {
        type: 'docs',
        version:
          activeVersion.value === i18n.value.search.tagList.all
            ? ''
            : activeVersion.value,
      },
      {
        type: 'packages',
        version:
          activeVersion.value === i18n.value.search.tagList.all
            ? ''
            : activeVersion.value,
      },
    ],
  };
});

const tagsParams = reactive({
  lang: lang.value,
  category: 'docs',
  want: 'version',
});
const versionList = ref([
  {
    count: 0,
    key: i18n.value.search.tagList.all,
  },
]);
// 接收获取的搜索chat数据
const searchChatRes: any = ref('');
const ChatRef: any = ref();
const showChatRes: any = ref(false);
const showBlink: any = ref(false);
// 点赞
const like: any = ref(false);
const likeIcon = computed(() => (like.value ? IconUnlike : IconLike));
// 点踩
const stomp: any = ref(false);
const stompIcon = computed(() => (stomp.value ? IconUnstomp : IconStomp));
// 接收获取的搜索数据
const searchResultList: any = ref([]);
// 接收软件包数据
const searchRpmList: any = ref([]);
// 总数据数量
const total = computed(() => {
  return (
    searchNumber.value.find(
      (item: { key: string; doc_count: number }) =>
        item.key === currentTab.value
    )?.doc_count || 0
  );
});

// 分页器总页数
const totalPage = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});
// 关联词
const suggestList = ref([]);
//
const activeVersion = ref('');

// cookie
const cookieStore = useCookieStore();

async function getVersionTag() {
  await getTagsData(tagsParams).then((res) => {
    if (
      res.obj?.totalNum.length &&
      !res.obj?.totalNum.some((ver) => ver.key === activeVersion.value) &&
      activeVersion.value !== i18n.value.search.tagList.all
    ) {
      activeVersion.value = res.obj?.totalNum[0].key;
    }
    versionList.value = [
      {
        count: 0,
        key: i18n.value.search.tagList.all,
      },
    ];
    versionList.value.push(...res.obj?.totalNum);
  });
}

// 点击搜索框的删除图标
function clearSearchInput() {
  searchInput.value = '';
}
// 点击数据的类型导航
function setCurrentType(type: string) {
  activityData.value = {};
  if (type === 'packages') {
    tagsParams.category = 'packages';
  } else if (currentTab.value === 'packages') {
    tagsParams.category = 'docs';
  }
  getVersionTag();
  currentTab.value = type;
  currentPage.value = 1;
  searchDataAll();
}
const abortController = ref();
function searchChat() {
  // 仅支持中文
  if (lang.value !== 'zh') return;
  showChatRes.value = true;
  searchChatRes.value = '';
  like.value = false;
  stomp.value = false;
  if (abortController.value) {
    // 频繁搜索终止上一次请求
    abortController.value.abortController.abort();
  }
  isLogined()
    .then(() => {
      if (guardAuthClient.value.aigcPrivacyAccepted !== AigcPrivacyAccepted)
        return;
      abortController.value = getChatapi(searchInput.value, {
        open: () => {
          searchChatRes.value = '';
        },
        message: (res: string) => {
          showBlink.value = true;
          try {
            const data = JSON.parse(res);
            if (data?.answer) {
              searchChatRes.value += data?.answer;
            }
          } catch (e) {}
          nextTick(() => {
            ChatRef.value?.scrollTo({
              top: ChatRef.value?.scrollHeight,
              behavior: 'smooth',
            });
          });
        },
        close: () => {
          showBlink.value = false;
          if (!searchChatRes.value) {
            showChatRes.value = false;
          }
        },
        error: () => {
          showChatRes.value = false;
        },
      });
    })
    .catch((err) => {
      if (err === false) return;
      if (err?.code !== '401') {
        showChatRes.value = false;
      }
    });
}
function clickLike() {
  like.value = !like.value;
  stomp.value = false;
}
function clickStomp() {
  stomp.value = !stomp.value;
  like.value = false;
}
function searchRpm() {
  searchRpmList.value = [];
  isNotRpm.value = false;
  try {
    getSearchRpm({ keyword: searchInput.value }).then((res) => {
      if (res?.status === 200) {
        searchRpmList.value = res.data.records;
        isNotRpm.value = true;
      } else {
        searchRpmList.value = [];
        isNotRpm.value = false;
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}
// 获取搜索结果各类型的数量
async function searchCountAll() {
  if (activeVersion.value === i18n.value.search.tagList.all) {
    searchCount.value.limit = [];
  }
  try {
    await getSearchCount(searchCount.value).then((res) => {
      if (res.status === 200 && res.obj.total[0]) {
        searchNumber.value = res.obj.total;
        getSussageData();
      } else {
        searchNumber.value = [];
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}
// 联想搜索
function getSussageData() {
  getRelevant(searchData.value).then((res) => {
    suggestList.value = res?.obj?.suggestList || [];
  });
}
// 获取搜索结果的数据
const resultRef = ref<HTMLElement | null>(null);
const resultHeight = ref(400);
const isLoading = ref(false);
function searchDataAll() {
  try {
    searchResultList.value = [];
    resultHeight.value = 400;
    isLoading.value = true;
    // 版本为全部时 limit 不传
    if (activeVersion.value === i18n.value.search.tagList.all) {
      searchData.value.limit = [];
    }
    // tab 为全部时加下版本搜索限制
    if (currentTab.value === 'all') {
      searchData.value.limit = [
        {
          type: 'docs',
          version: activeVersion.value,
        },
        {
          type: 'packages',
          version: activeVersion.value,
        },
      ];
    }

    getSearchData(searchData.value).then((res) => {
      if (res.status === 200 && res.obj?.records[0]) {
        searchResultList.value = res.obj.records;
        isNotFound.value = false;
        window.scrollTo(0, 0);
        nextTick(() => {
          resultHeight.value = resultRef.value!.offsetHeight;
        });
      } else {
        searchResultList.value = [];
        isNotFound.value = true;
      }
      isLoading.value = false;
    });
  } catch (error: any) {
    isLoading.value = false;
  }
}
// 获取搜索结果的所有内容
function searchAll(valueChange?: boolean) {
  if (searchInput.value) {
    currentPage.value = 1;

    if (cookieStore.isAllAgreed) {
      reportSearch(searchInput.value);
    }
    if (valueChange) {
      currentTab.value = 'all';
    }
    searchRecommendRef.value(searchInput.value);
    // searchChat();
    searchCountAll();
    searchDataAll();
    searchRpm();
    handleSelectChange(searchInput.value);
  } else {
    clearSearchInput();
  }
}
function handleSelectChange(val: string) {
  history.pushState(null, '', `?search=${encodeURIComponent(val)}`);
}
function handleSelect(val: string) {
  searchInput.value = val.replace(/<[^>]+>/g, '');
  searchAll(true);
}

// 设置搜索结果的跳转路径
function goLink(data: any, index: number) {
  let { path } = data;
  let search_result_url = '/' + path;

  if (data.type === 'docs') {
    // hugo 编译 路由空格会被替换为 -
    path = path.replaceAll(' ', '-');
    search_result_url = site.value.themeConfig.docsUrl + '/' + path + '.html';
  } else if (data.type === 'forum') {
    search_result_url = `${site.value.themeConfig.forumUrl}${path}`;
  } else if (path.startsWith('https')) {
    search_result_url = path;
  } else {
    data.type === 'news' || data.type === 'blog'
      ? (search_result_url = `${search_result_url}.html`)
      : '';
    search_result_url = location.origin + search_result_url;
  }
  if (cookieStore.isAllAgreed) {
    reportSelectSearchResult(
      data,
      index,
      search_result_url,
      currentSearchVal.value
    );
  }
  window.open(search_result_url);
}
// ----------------------- 埋点相关 ----------------------------
let SEARCH_EVENT_ID = uniqueId();
const reportSearch = (keyword: string) => {
  SEARCH_EVENT_ID = uniqueId();
  oa.report('searchValue', () => {
    return {
      search_event_id: SEARCH_EVENT_ID,
      search_key: keyword,
    };
  });
};

const reportSelectSearchResult = (
  data: any,
  index: number,
  path: string,
  keyword: string
) => {
  const searchKeyObj = {
    search_tag: data.type,
    search_rank_num: pageSize.value * (currentPage.value - 1) + (index + 1),
    search_result_total_num: total.value,
    search_result_url: path,
  };

  oa.report('selectSearchResult', () => {
    return {
      search_event_id: SEARCH_EVENT_ID,
      search_key: keyword,
      ...(data || {}),
      ...searchKeyObj,
    };
  });
};

// 移动端跳转翻页事件
function jumpPage(page: number) {
  currentPage.value = page;
  searchDataAll();
}
onMounted(async () => {
  await getVersionTag();
  if (location.href.split('=')[1]) {
    searchInput.value = decodeURIComponent(window.location.href.split('=')[1]);
    currentSearchVal.value = searchInput.value;
  }
  window.addEventListener('click', () => {
    if (isClickOutside.value) {
      changeFocuseState(false);
    }
  });
  searchAll();
});

const activityData = ref();
const getActivityData = (val: { key: string; doc_count: number }) => {
  activityData.value = val;
};

const multipleCount = computed(() => {
  return (
    searchNumber.value.find(
      (item: { key: string; doc_count: number }) =>
        item.key === activityData.value.key
    )?.doc_count || 0
  );
});

watch(
  () => activeVersion.value,
  () => {
    searchAll();
  }
);
function clipTxt(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    ElMessage({
      message: i18n.value.download.COPY_SUCCESS,
      type: 'success',
    });
  });
}
const isShowMultiple = (list: Object) => {
  return searchNumber.value.find((item: { key: string }) => {
    return Object.keys(list).includes(item.key);
  });
};
const handleSearchHistory = (val: string) => {
  if (val === searchInput.value) return false;
  searchInput.value = val;
  changeFocuseState(false);
  searchAll();
};

const changeFocuseState = (state: boolean) => {
  isFocus.value = state;
};

// 控制无数据状态显示
const isNotFound = ref(false);
// 控制软件包的无数据状态显示
const isNotRpm = ref(false);
// ---------------- 处理回车搜索事件关联搜索显示 -------------------------
const searchInputRef = ref();
const enterEvent = () => {
  searchInputRef.value.inputRef.blur();
  changeFocuseState(false);
};
</script>
<template>
  <div class="search">
    <div class="search-input">
      <div ref="searchRef" class="input-box">
        <OSearch
          ref="searchInputRef"
          v-model="searchInput"
          :placeholder="tips.PLEACHOLDER"
          :maxlength="50"
          @focus="changeFocuseState(true)"
          @change="() => searchAll(true)"
          @keyup.enter="enterEvent"
        >
          <template #suffix>
            <OIcon class="close" @click="clearSearchInput"
              ><IconCancel
            /></OIcon>
          </template>
        </OSearch>
        <ClientOnly>
          <SearchRecommend
            class="search-recommend"
            v-show="isFocus"
            ref="searchRecommendRef"
            @search-click="handleSearchHistory"
            :val="searchInput"
          />
        </ClientOnly>
        <div v-show="suggestList.length" class="suggest-list-box">
          <span>{{ i18n.search.suggest }}</span>
          <ul class="suggest-list">
            <li
              v-for="suggest in suggestList"
              :key="suggest"
              v-dompurify-html="suggest"
              class="suggest"
              @click="handleSelect(suggest)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result">
      <div class="result-left">
        <!-- 搜索框 -->

        <!-- <div
          v-if="showChatRes && lang === 'zh'"
          class="gpt-block"
          :class="suggestList.length ? 'exist-suggest' : ''"
        >
          <div
            class="gpt-content gpt-content-before"
            v-if="!guardAuthClient.username"
          >
            <div></div>
            <OButton class="btn" type="primary" @click="showGuard" size="small"
              >登录查看智能搜索结果</OButton
            >
            <MatterTip></MatterTip>
          </div>
          <div
            class="gpt-content gpt-content-before"
            v-else-if="
              guardAuthClient.aigcPrivacyAccepted !== AigcPrivacyAccepted
            "
          >
            <div></div>
            <OButton
              class="btn"
              type="primary"
              @click="viewAgreeVisible = true"
              size="small"
              >获取用户协议同意</OButton
            >
            <MatterTip></MatterTip>
          </div>
          <div v-loading="!searchChatRes" class="gpt-content" v-else>
            <div class="gpt-text">
              <div class="gpt-text-content" ref="ChatRef">
                {{ searchChatRes }}
                <span v-if="showBlink" class="blinking">|</span>
              </div>
            </div>
            <div class="gtp-copy" v-if="!showBlink">
              <MatterTip></MatterTip>
              <div style="flex: 1"></div>
              <span class="icons">
                <OIcon class="like-icon" @click="clickLike">
                  <component :is="likeIcon"></component>
                </OIcon>
                <OIcon class="like-icon stomp-icon" @click="clickStomp">
                  <component :is="stompIcon"></component>
                </OIcon>
              </span>
              <OButton size="mini" @click="clipTxt(searchChatRes)">{{
                i18n.search.copy
              }}</OButton>
            </div>
          </div>
          <ViewAgreeModal
            v-model="viewAgreeVisible"
            @submit="searchChat"
          ></ViewAgreeModal>
        </div> -->
        <div class="search-content">
          <div class="select-options">
            <ul class="type">
              <template v-for="item in searchNumber" :key="item">
                <li
                  v-if="i18n.search.tagList[item.key]"
                  class="single-tab"
                  :class="currentTab === item.key ? 'active' : ''"
                  @click="setCurrentType(item.key)"
                >
                  {{ i18n.search.tagList[item.key] }}
                  <span>({{ item.doc_count }})</span>
                </li>
              </template>
              <li
                v-if="isShowMultiple(i18n.search.tagList.updates?.tags)"
                :class="{
                  active: Object.keys(
                    i18n.search.tagList.updates.tags
                  ).includes(currentTab),
                }"
              >
                <ODropdown @command="getActivityData">
                  <div class="multiple">
                    <OIcon class="filter-icon">
                      <IconMore></IconMore>
                    </OIcon>
                    {{ i18n.search.tagList.updates.val }}
                    <span
                      v-if="i18n.search.tagList.updates.tags[activityData?.key]"
                      >({{ i18n.search.tagList.updates.tags[activityData?.key]
                      }}{{ activityData?.doc_count }})</span
                    >
                  </div>
                  <template #dropdown>
                    <ClientOnly>
                      <template v-for="item in searchNumber" :key="item">
                        <ODropdownItem
                          v-if="
                            i18n.search.tagList.updates.tags[item.key] &&
                            item.doc_count
                          "
                          class="multiple-item"
                          @click="setCurrentType(item.key)"
                          :command="item"
                          >{{ i18n.search.tagList.updates.tags[item.key] }}
                          <span>({{ item.doc_count }})</span>
                        </ODropdownItem>
                      </template>
                    </ClientOnly>
                  </template>
                </ODropdown>
              </li>
              <li
                v-if="isShowMultiple(i18n.search.tagList.more?.tags)"
                :class="{
                  active: Object.keys(i18n.search.tagList.more.tags).includes(
                    currentTab
                  ),
                }"
              >
                <ODropdown @command="getActivityData">
                  <div class="multiple">
                    <OIcon class="filter-icon">
                      <IconMore></IconMore>
                    </OIcon>
                    {{ i18n.search.tagList.more.val }}
                    <span
                      v-if="i18n.search.tagList.more.tags[activityData?.key]"
                      >({{ i18n.search.tagList.more.tags[activityData?.key]
                      }}{{ multipleCount }})</span
                    >
                  </div>
                  <template #dropdown>
                    <ClientOnly>
                      <template v-for="item in searchNumber" :key="item">
                        <ODropdownItem
                          v-if="
                            i18n.search.tagList.more.tags[item.key] &&
                            item.doc_count
                          "
                          class="multiple-item"
                          @click="setCurrentType(item.key)"
                          :command="item"
                          >{{ i18n.search.tagList.more.tags[item.key] }}
                          <span>({{ item.doc_count }})</span>
                        </ODropdownItem>
                      </template>
                    </ClientOnly>
                  </template>
                </ODropdown>
              </li>
            </ul>

            <ClientOnly>
              <OSelect v-model="activeVersion" :placeholder="i18n.sig.SIG_ALL">
                <template #prefix>
                  <OIcon>
                    <IconSearch />
                  </OIcon>
                </template>
                <OOption
                  v-for="item in versionList"
                  :key="item.key"
                  :label="item.key"
                  :value="item.key"
                >
                  <!-- <div class="version" style="float: left">{{ item.key }}</div>
                <div class="count" style="float: right">
                  {{ item.count || '' }}
                </div> -->
                </OOption>
              </OSelect>
            </ClientOnly>
          </div>
          <!-- 搜索内容列表 -->
          <div
            ref="resultRef"
            class="content-box"
            v-loading="isLoading"
            element-loading-text="Loading..."
            element-loading-background="transparent"
          >
            <ul v-if="searchResultList.length" class="content-list">
              <li v-for="(item, index) in searchResultList" :key="item.id">
                <h3
                  v-dompurify-html="item.title"
                  @click="goLink(item, index)"
                ></h3>
                <p
                  v-dompurify-html="
                    item.type === 'service'
                      ? item.secondaryTitle || ''
                      : item.textContent
                  "
                  class="detail"
                  @click="goLink(item, index)"
                ></p>
                <p class="from">
                  <span>{{ i18n.search.from }}</span>
                  <span
                    >{{
                      i18n.search.tagList[item.type] ||
                      i18n.search.tagList.updates.tags[item.type] ||
                      i18n.search.tagList.more.tags[item.type]
                    }}
                  </span>
                </p>
                <p v-if="item.version" class="from version">
                  <span>{{ i18n.search.version }}</span>
                  <span>{{ item.version }}</span>
                </p>
              </li>
            </ul>
            <NotFound v-if="isNotFound" />
          </div>
        </div>
      </div>
      <div
        class="result-right"
        :class="suggestList.length ? 'exist-suggest-1' : ''"
      >
        <div class="rpm-list">
          <h3>{{ i18n.search.relative }}</h3>
          <el-scrollbar :height="resultHeight - 8">
            <ul>
              <li v-for="item in searchRpmList" :key="item.filename">
                <a
                  :href="item.path"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ item.filename }}</a
                >
                <p>{{ item.version }}</p>
              </li>
              <li v-show="!searchRpmList[0] && isNotRpm">
                {{ i18n.search.no }}{{ i18n.search.relative }}
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div v-if="totalPage > 1" class="search-pagination">
      <ClientOnly>
        <OPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :hide-on-single-page="true"
          :page-sizes="[pageSize]"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="total"
          @current-change="searchDataAll"
          @jump-page="jumpPage"
        >
          <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
        </OPagination>
      </ClientOnly>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search {
  max-width: 1504px;
  padding: var(--e-spacing-h2) 44px var(--e-spacing-h1);
  margin: 0 auto;
  .input-box {
    position: relative;
    .search-recommend {
      position: absolute;
      width: 100%;
      background-color: var(--e-color-bg2);
      box-shadow: var(--e-shadow-l1);
      z-index: 10;
    }
  }
  .search-pagination,
  .search-input,
  .search-result {
    display: grid;
    grid-template-columns: 1fr minmax(150px, 320px);
    grid-gap: 32px;
    @media (max-width: 1200px) {
      display: block;
    }
  }
  .search-input {
    @media (max-width: 768px) {
      padding: 0 16px;
    }
    :deep(.el-input__suffix-inner) {
      svg {
        cursor: pointer;
      }
    }
    .suggest-list-box {
      display: flex;
      margin: 16px 0 0;
      color: var(--e-color-text1);
      font-size: var(--e-font-size-text);
      flex-wrap: wrap;
      @media (max-width: 768px) {
        margin: 12px 0 0;
        span {
          margin-bottom: 8px;
        }
      }
      .suggest-list {
        display: flex;
        flex-wrap: wrap;
        .suggest {
          margin-right: 8px;
          cursor: pointer;
          :deep(em) {
            color: var(--e-color-brand1);
            font-style: normal;
          }
        }
      }
    }
  }

  .search-pagination {
    width: 100%;
    margin-top: var(--e-spacing-h2);
    @media (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }
  }
  .search-result {
    margin-top: 32px;
    @media (max-width: 768px) {
      margin-top: 12px;
    }
    .pagination-slot {
      font-size: var(--e-font-size-text);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--e-spacing-h4);
    }
    .result-left {
      overflow: hidden;

      @media (max-width: 768px) {
        :deep(.o-search) {
          height: 28px;
          font-size: 14px;
          width: 100vw;
          padding: 0 16px;
        }

        :deep(.el-input__inner) {
          font-size: 14px;
          height: 100%;
        }
        :deep(.el-input__prefix-inner) {
          font-size: 16px;
        }
      }
      .close {
        cursor: pointer;
      }
      .gpt-block {
        width: 100%;
        margin-top: var(--e-spacing-h2);
        @media (max-width: 768px) {
          margin-top: var(--e-spacing-h5);
        }
        .gpt-content {
          box-shadow: var(--e-shadow-l1);
          background-color: var(--e-color-bg2);
          padding: var(--e-spacing-h5) var(--e-spacing-h4);
          white-space: pre-wrap;
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          @media (max-width: 768px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
            padding: var(--e-spacing-h8);
            margin-left: var(--e-spacing-h5);
            margin-right: var(--e-spacing-h5);
          }
          :deep(.el-loading-mask) {
            background-color: var(--e-color-fill5);
          }
          .gpt-text {
            padding: var(--e-spacing-h5);
            background-color: var(--e-color-bg1);
            @media (max-width: 768px) {
              padding: var(--e-spacing-h8);
            }
            .gpt-text-content {
              color: var(--e-color-text1);
              max-height: 300px;
              overflow-y: auto;
              &::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: var(--e-color-bg2);
              }

              &::-webkit-scrollbar {
                width: 6px;
                background-color: var(--e-color-bg2);
              }

              &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background: var(--e-color-division1);
              }

              @keyframes blink {
                0% {
                  opacity: 1;
                }
                50% {
                  opacity: 0;
                }
                100% {
                  opacity: 1;
                }
              }

              .blinking {
                font-size: var(--e-font-size-h8);
                font-weight: 900;
                animation: blink 1s infinite;
              }
            }
          }
          .gtp-copy {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: var(--e-spacing-h5);
            .icons {
              margin-right: var(--e-spacing-h3);
              color: var(--e-color-text1);
            }
            .like-icon {
              font-size: var(--e-font-size-h7);
              cursor: pointer;
            }
            .stomp-icon {
              margin-left: var(--e-spacing-h6);
            }
          }
        }
        .gpt-content-before {
          padding: var(--e-spacing-h5) var(--e-spacing-h3);
          display: flex;
          justify-content: space-between;
          .btn {
            margin-left: 84px;
            margin-top: var(--e-spacing-h5);
            margin-bottom: var(--e-spacing-h5);
          }
          @media (max-width: 768px) {
            padding: var(--e-spacing-h5) var(--e-spacing-h10);
          }
        }
      }
      .search-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        .select-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 40px;
          width: 100%;
          background-color: var(--e-color-bg2);
          border-bottom: 1px solid var(--e-color-division1);
          @media screen and (max-width: 1620px) {
            padding: 0 24px;
          }
          @media screen and (max-width: 768px) {
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            padding: 0;
            width: calc(100% - 32px);
            background-color: var(--e-color-bg1);
            border: none;
          }
          .type {
            display: flex;
            flex-shrink: 0;
            background-color: var(--e-color-bg2);
            @include scrollbar;
            @media (max-width: 768px) {
              width: 100%;
              overflow-x: auto;
              overflow-y: hidden;
              padding: 0 16px;
              white-space: nowrap;
              margin-bottom: 16px;
              box-shadow: var(--e-shadow-l1);
            }
            li,
            .multiple {
              position: relative;
              display: flex;
              align-items: center;
              height: 63px;
              min-width: 56px;
              margin-right: 32px;
              color: var(--e-color-text1);
              font-size: var(--e-font-size-h8);
              @media screen and (max-width: 1620px) {
                margin-right: 24px;
              }
              @media (max-width: 768px) {
                height: 34px;
                line-height: 34px;
                min-width: auto;
                font-size: var(--e-font-size-text);
                margin-right: 0;
                text-align: center;
                & + li {
                  margin-left: 12px;
                }
                span {
                  display: none;
                }
              }
              &::after {
                content: '';
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 2px;
                background-color: transparent;
                @media (max-width: 768px) {
                  bottom: -1px;
                }
              }

              .multiple {
                cursor: pointer;
                margin: 0;
                height: max-content;
                .o-icon {
                  font-size: 20px;
                }
              }
            }
            .single-tab {
              cursor: pointer;
            }
            .active {
              color: var(--e-color-brand1);
              .multiple {
                color: var(--e-color-brand1);
              }
              &::after {
                background-color: var(--e-color-brand1);
              }
            }
          }
          :deep(.el-select) {
            margin: 8px 0;
            max-width: 170px;
            min-width: 100px;
            @media screen and (max-width: 768px) {
              width: 100%;
              max-width: 100%;
              margin: 0;
            }
            &:hover {
              box-shadow: var(--e-select-shadow);
            }
            .el-input__wrapper {
              padding: 0 8px;
            }
          }
        }

        .content-box {
          min-height: 400px;
          width: 100%;
          height: 100%;
          box-shadow: var(--e-shadow-l1);
          background-color: var(--e-color-bg2);
          @media (max-width: 768px) {
            width: 100vw;
            padding: var(--e-spacing-h5) var(--e-spacing-h5) 0
              var(--e-spacing-h5);
            min-height: 200px;
            background-color: var(--e-color-bg1);
            box-shadow: none;
          }
          .content-list {
            padding: 0 var(--e-spacing-h2) var(--e-spacing-h2)
              var(--e-spacing-h2);
            @media (max-width: 768px) {
              padding: 0;
              background-color: var(--e-color-bg2);
            }
            li {
              padding-top: var(--e-spacing-h2);
              &:empty {
                padding: 0;
              }
              @media (max-width: 768px) {
                padding-top: var(--e-spacing-h5);
                margin: 0 var(--e-spacing-h5);
                &::after {
                  display: block;
                  content: '';
                  width: 100%;
                  height: 1px;
                  background-color: var(--e-color-division1);
                  margin-top: 16px;
                }
                &:nth-last-of-type(1)::after {
                  background-color: transparent;
                }
              }
              h3 {
                font-size: var(--e-font-size-h5);
                color: var(--e-color-text1);
                line-height: var(--e-line-height-h5);
                font-weight: 500;
                cursor: pointer;
                :deep(span) {
                  color: var(--e-color-brand1);
                }
                @media (max-width: 768px) {
                  font-size: var(--e-font-size-text);
                  line-height: var(--e-line-height-text);
                }
              }
              .detail {
                cursor: pointer;
                margin-top: 16px;
                font-size: var(--e-font-size-text);
                line-height: var(--e-line-height-text);
                color: var(--e-color-text1);
                max-height: 110px;
                overflow: hidden;
                text-overflow: ellipsis;
                text-overflow: -webkit-ellipsis-lastline;
                display: -webkit-box;
                -webkit-line-clamp: 5;
                line-clamp: 5;
                -webkit-box-orient: vertical;

                :deep(span) {
                  color: var(--e-color-brand1);
                }
                @media (max-width: 768px) {
                  margin-top: 4px;
                  -webkit-line-clamp: 6;
                  line-clamp: 6;
                  font-size: var(--e-font-size-tip);
                  line-height: var(--e-line-height-tip);
                  color: var(--e-color-text4);
                }
              }
              .from {
                margin-top: 15px;
                font-size: var(--e-font-size-text);
                line-height: var(--e-line-height-text);
                color: var(--e-color-text1);
                @media (max-width: 768px) {
                  margin-top: 8px;
                  font-size: var(--e-font-size-tip);
                  line-height: var(--e-line-height-tip);
                  color: var(--e-color-text4);
                }
              }
              .version {
                margin-top: var(--e-spacing-h8);
              }
            }
          }
        }
      }
      .exist-suggest {
        margin-top: 0;
      }
    }
    .result-right {
      width: 320px;
      overflow: hidden;
      @include scrollbar;
      .rpm-list {
        background-color: var(--e-color-bg2);
        box-shadow: var(--e-shadow-l1);
        height: 100%;
      }
      @media (max-width: 1200px) {
        display: none;
      }
      h3 {
        font-size: var(--e-font-size-h5);
        line-height: var(--e-line-height-h5);
        padding: var(--e-spacing-h2);
        padding-bottom: 0;
        color: var(--e-color-text1);
      }
      ul {
        padding: 0 var(--e-spacing-h2);
        li {
          padding-top: var(--e-spacing-h4);
          color: var(--e-color-text1);
          a {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-brand1);
          }
          p {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            margin-top: var(--e-spacing-h8);
            color: var(--e-color-text4);
          }
        }
      }
      :deep(.is-horizontal) {
        display: none;
      }
    }
  }

  @media (max-width: 1439px) {
    padding-left: 24px;
  }
  @media (max-width: 1160px) {
    grid-gap: 12px;
  }
  @media (max-width: 1200px) {
    padding: 0 16px var(--e-spacing-h2);
    padding-top: var(--e-spacing-h2);
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    padding: 0 0 var(--e-spacing-h2) 0;
    padding-top: var(--e-spacing-h5);
  }
}

.multiple-item {
  font-size: 16px;
}
</style>
