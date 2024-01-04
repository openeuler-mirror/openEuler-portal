<script setup lang="ts">
import { computed, watch, ref, onMounted, reactive, nextTick } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import {
  getSearchData,
  getSearchCount,
  getSearchRpm,
  getRelevant,
  getTagsData,
  getChatapi,
} from '@/api/api-search';
import { useCookieStatus } from '@/stores/common';

import IconSearch from '~icons/app/icon-search.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconLike from '~icons/app/icon-like.svg';
import IconUnlike from '~icons/app/icon-unlike.svg';
import IconStomp from '~icons/app/icon-stomp.svg';
import IconUnstomp from '~icons/app/icon-unstomp.svg';

import NotFound from '@/NotFound.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import SearchSevice from './SearchSevice.vue';
import ViewAgreeModal from './ViewAgreeModal.vue';
import MatterTip from './MatterTip.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import { ElMessage } from 'element-plus';
import { addSearchBuriedData } from '@/shared/utils';
import { AigcPrivacyAccepted } from '@/shared/privacy-accepted.const';
import { useStoreData, isLogined, showGuard } from '@/shared/login';
import type { SearchDrowdownArrT } from '@/shared/@types/type-search';

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const { guardAuthClient } = useStoreData();
const { lang, site } = useData();
const i18n = useI18n();
// 隐私弹窗
const viewAgreeVisible = ref(false);
// 当前选择类型
const currentIndex = ref(0);
// 当前显示的页码
const currentPage = ref(1);
// 每页数据
const pageSize = ref(12);
// 控制分页器显示的时机
const pageShow = ref(false);
// 搜索内容
const searchInput = ref<string>('');
const searchValue = computed(() => {
  return i18n.value.common.SEARCH;
});
const serviceData = ref<SearchDrowdownArrT[]>([]);
// 接收搜索数量的数据
const searchNumber: any = ref([]);
// 显示的数据类型
const searchType = ref('');
// service tag
const serviceParams = computed(() => {
  return {
    keyword: searchInput.value,
    page: currentPage.value,
    pageSize: pageSize.value,
    lang: lang.value,
    type: 'service',
  };
});
const searchData = computed(() => {
  return {
    keyword: searchInput.value,
    page: currentPage.value,
    pageSize: pageSize.value,
    lang: lang.value,
    type: searchType.value,
    limit: [
      {
        type: 'docs',
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
  return searchNumber.value[currentIndex.value]
    ? searchNumber.value[currentIndex.value].doc_count
    : 0;
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
const cookieStatus = useCookieStatus();

async function getVersionTag() {
  await getTagsData(tagsParams).then((res) => {
    if (res.obj?.totalNum.length) {
      activeVersion.value = res.obj?.totalNum[0].key;
    }
    versionList.value.push(...res.obj?.totalNum);
  });
}

function getServiceData() {
  getSearchData(serviceParams.value).then((res) => {
    if (res?.obj?.records) {
      serviceData.value = res.obj.records;
    } else {
      serviceData.value = [];
    }
  });
}

// 点击搜索框的删除图标
function clearSearchInput() {
  searchResultList.value = '';
  searchInput.value = '';
  searchRpmList.value = '';
  searchChatRes.value = '';
  like.value = false;
  stomp.value = false;
  showChatRes.value = false;
  searchNumber.value.map((item: any) => {
    item.doc_count = 0;
  });
}
// 点击数据的类型导航
function setCurrentType(index: number, type: string) {
  currentIndex.value = index;
  if (type === 'all') {
    searchType.value = '';
  } else {
    searchType.value = type;
  }
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
  try {
    getSearchRpm({ keyword: searchInput.value }).then((res) => {
      if (res.status === 200) {
        searchRpmList.value = res.data.records;
      } else {
        searchRpmList.value = [];
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}
// 获取搜索结果各类型的数量
async function searchCountAll(key?: string) {
  if (activeVersion.value === i18n.value.search.tagList.all) {
    searchCount.value.limit = [];
  }
  try {
    await getSearchCount(searchCount.value).then((res) => {
      if (res.status === 200 && res.obj.total[0]) {
        res.obj.total.some((item: { key: string }, index: number) => {
          if (item.key === key) {
            currentIndex.value = index;
            return true;
          }
        });
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
function searchDataAll() {
  try {
    // 全部时 limit 不传
    if (activeVersion.value === i18n.value.search.tagList.all) {
      searchData.value.limit = [];
    }

    getSearchData(searchData.value).then((res) => {
      if (res.status === 200 && res.obj.records[0]) {
        searchResultList.value = res.obj.records;
        pageShow.value = true;
      } else {
        if (searchType.value === 'docs') {
          searchType.value = '';
          searchAll();
        }
        searchResultList.value = [];
        pageShow.value = false;
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}
// 获取搜索结果的所有内容
function searchAll(current?: string) {
  if (searchInput.value) {
    if (!current) {
      currentIndex.value = 0;
    }
    currentPage.value = 1;

    if (cookieStatus.isAllAgreed) {
      addSearchBuriedData(searchInput.value);
    }

    searchType.value = current || '';

    getServiceData();
    searchChat();
    searchCountAll(current);
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
  searchAll();
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
  } else if (data.type === 'gitee') {
    search_result_url = path;
  } else {
    data.type === 'news' || data.type === 'blog'
      ? (search_result_url = `${search_result_url}.html`)
      : '';
    search_result_url = location.origin + search_result_url;
  }
  if (cookieStatus.isAllAgreed) {
    setAdvertisedData(data, index, search_result_url);
  }
  window.open(encodeURI(search_result_url));
}

const setAdvertisedData = (data: any, index: number, path: string) => {
  const searchKeyObj = {
    search_tag: data.type,
    search_rank_num: pageSize.value * (currentPage.value - 1) + (index + 1),
    search_result_total_num: total.value,
    search_result_url: path,
  };
  const sensors = (window as any)['sensorsDataAnalytic201505'];
  const sensorObj = {
    profileType: 'selectSearchResult',
    ...(data || {}),
    ...((window as any)['sensorsCustomBuriedData'] || {}),
    ...((window as any)['addSearchBuriedData'] || {}),
    ...searchKeyObj,
  };
  sensors.setProfile(sensorObj);
};

// 移动端上下翻页事件
function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    searchDataAll();
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
    searchDataAll();
  }
}
// 移动端跳转翻页事件
function jumpPage(page: number) {
  currentPage.value = page;
  searchDataAll();
}
onMounted(async () => {
  await getVersionTag();
  if (location.href.split('=')[1]) {
    searchInput.value = decodeURIComponent(window.location.href.split('=')[1]);
  }
  searchAll();
});

watch(
  () => activeVersion.value,
  () => {
    searchAll('docs');
  }
);
function clipTxt(text: string) {
  navigator.clipboard.writeText(text).then((data) => {
    ElMessage({
      message: i18n.value.download.COPY_SUCCESS,
      type: 'success',
    });
  });
}
</script>
<template>
  <div class="search">
    <div class="search-left">
      <OSearch
        v-model="searchInput"
        :placeholder="searchValue.PLEACHOLDER"
        :maxlength="50"
        @change="() => searchAll()"
      >
        <template #suffix>
          <OIcon class="close" @click="clearSearchInput"><IconCancel /></OIcon>
        </template>
      </OSearch>
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
      <div
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
      </div>
      <div class="search-content">
        <div class="select-options">
          <ul class="type">
            <template v-for="(item, index) in searchNumber" :key="item">
              <li
                v-if="i18n.search.tagList[item.key]"
                :class="currentIndex === index ? 'active' : ''"
                @click="setCurrentType(index, item.key)"
              >
                {{ i18n.search.tagList[item.key] }}
                <span>({{ item.doc_count }})</span>
              </li>
            </template>
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
              />
            </OSelect>
          </ClientOnly>
        </div>

        <div class="content-box">
          <ul v-if="searchResultList.length" class="content-list">
            <li v-for="(item, index) in searchResultList" :key="item.id">
              <template v-if="i18n.search.tagList[item.type]">
                <h3
                  v-dompurify-html="item.title"
                  @click="goLink(item, index)"
                ></h3>
                <p
                  v-dompurify-html="item.textContent"
                  class="detail"
                  @click="goLink(item, index)"
                ></p>
                <p class="from">
                  <span>{{ i18n.search.form }}</span>
                  <span>{{ i18n.search.tagList[item.type] }}</span>
                </p>
                <p v-if="item.version" class="from version">
                  <span>{{ i18n.search.version }}</span>
                  <span>{{ item.version }}</span>
                </p>
              </template>
            </li>
          </ul>
          <NotFound v-else />
        </div>
        <div v-if="totalPage > 1 && pageShow" class="page-box">
          <ClientOnly>
            <OPagination
              v-if="!isMobile"
              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              class="pagination-pc"
              :hide-on-single-page="true"
              :page-sizes="[pageSize]"
              :background="true"
              layout="sizes, prev, pager, next, slot, jumper"
              :total="total"
              @current-change="searchDataAll"
            >
              <span class="pagination-slot"
                >{{ currentPage }}/{{ totalPage }}</span
              >
            </OPagination>
          </ClientOnly>
          <AppPaginationMo
            :current-page="currentPage"
            :total-page="totalPage"
            @turn-page="turnPage"
            @jump-page="jumpPage"
          />
        </div>
      </div>
    </div>
    <div
      class="search-right"
      :class="suggestList.length ? 'exist-suggest-1' : ''"
    >
      <SearchSevice v-if="serviceData.length" :services="serviceData" />
      <div class="rpm-list">
        <h3>{{ i18n.search.relative }}</h3>
        <el-scrollbar height="1915px">
          <ul>
            <li v-for="item in searchRpmList" :key="item.filename">
              <a :href="item.path" target="_blank" rel="noopener noreferrer">{{
                item.filename
              }}</a>
              <p>{{ item.version }}</p>
            </li>
            <li v-show="!searchRpmList[0]">
              {{ i18n.search.no }}{{ i18n.search.relative }}
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search {
  max-width: 1504px;
  padding: var(--o-spacing-h2) 44px var(--o-spacing-h1);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr minmax(150px, 320px);
  grid-gap: 32px;
  .suggest-list-box {
    display: flex;
    margin: 16px 0 32px;
    color: var(--o-color-text1);
    font-size: var(--o-font-size-text);
    @media (max-width: 768px) {
      padding: 0 16px;
      margin: 12px 0 24px;
    }
    .suggest-list {
      display: flex;
      .suggest {
        margin-right: 8px;
        cursor: pointer;
        :deep(em) {
          color: var(--o-color-brand1);
          font-style: normal;
        }
      }
    }
  }
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
  @media (max-width: 1439px) {
    padding-left: 24px;
  }
  @media (max-width: 1160px) {
    grid-gap: 12px;
  }
  @media (max-width: 1200px) {
    padding: 0 16px var(--o-spacing-h2);
    padding-top: var(--o-spacing-h2);
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    padding: 0 0 var(--o-spacing-h2) 0;
    padding-top: var(--o-spacing-h5);
  }
  .search-left {
    max-width: 1072px;

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
      margin-top: var(--o-spacing-h2);
      @media (max-width: 768px) {
        margin-top: var(--o-spacing-h5);
      }
      .gpt-content {
        box-shadow: var(--o-shadow-l1);
        background-color: var(--o-color-bg2);
        padding: var(--o-spacing-h5) var(--o-spacing-h4);
        white-space: pre-wrap;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        @media (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          padding: var(--o-spacing-h8);
          margin-left: var(--o-spacing-h5);
          margin-right: var(--o-spacing-h5);
        }
        :deep(.el-loading-mask) {
          background-color: var(--o-color-fill5);
        }
        .gpt-text {
          padding: var(--o-spacing-h5);
          background-color: var(--o-color-bg1);
          @media (max-width: 768px) {
            padding: var(--o-spacing-h8);
          }
          .gpt-text-content {
            color: var(--o-color-text1);
            max-height: 300px;
            overflow-y: auto;
            &::-webkit-scrollbar-track {
              border-radius: 4px;
              background-color: var(--o-color-bg2);
            }

            &::-webkit-scrollbar {
              width: 6px;
              background-color: var(--o-color-bg2);
            }

            &::-webkit-scrollbar-thumb {
              border-radius: 4px;
              background: var(--o-color-division1);
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
              font-size: var(--o-font-size-h8);
              font-weight: 900;
              animation: blink 1s infinite;
            }
          }
        }
        .gtp-copy {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--o-spacing-h5);
          .icons {
            margin-right: var(--o-spacing-h3);
            color: var(--o-color-text1);
          }
          .like-icon {
            font-size: var(--o-font-size-h7);
            cursor: pointer;
          }
          .stomp-icon {
            margin-left: var(--o-spacing-h6);
          }
        }
      }
      .gpt-content-before {
        padding: var(--o-spacing-h5) var(--o-spacing-h3);
        display: flex;
        justify-content: space-between;
        .btn {
          margin-left: 84px;
          margin-top: var(--o-spacing-h5);
          margin-bottom: var(--o-spacing-h5);
        }
        @media (max-width: 768px) {
          padding: var(--o-spacing-h5) var(--o-spacing-h10);
        }
      }
    }
    .search-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: var(--o-spacing-h2);

      @media (max-width: 768px) {
        margin-top: var(--o-spacing-h5);
      }
      .select-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        width: 100%;
        background-color: var(--o-color-bg2);
        border-bottom: 1px solid var(--o-color-division1);
        @media screen and (max-width: 1620px) {
          padding: 0 24px;
        }
        @media screen and (max-width: 768px) {
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          padding: 0;
          width: calc(100% - 32px);
          background-color: var(--o-color-bg1);
          border: none;
        }
        .type {
          display: flex;
          flex-shrink: 0;
          background-color: var(--o-color-bg2);
          @media (max-width: 768px) {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 0 16px;
            white-space: nowrap;
            margin-bottom: 16px;
            box-shadow: var(--o-shadow-l1);
          }
          li {
            position: relative;
            display: flex;
            align-items: center;
            height: 63px;
            min-width: 56px;
            margin-right: var(--o-spacing-h3);
            color: var(--o-color-text1);
            font-size: var(--o-font-size-h8);
            cursor: pointer;
            @media screen and (max-width: 1620px) {
              margin-right: 24px;
            }
            @media (max-width: 768px) {
              height: 34px;
              line-height: 34px;
              min-width: auto;
              font-size: var(--o-font-size-text);
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
          }
          .active {
            color: var(--o-color-brand1);
            &::after {
              background-color: var(--o-color-brand1);
            }
          }
        }
        :deep(.el-select) {
          @media screen and (max-width: 768px) {
            width: 100%;
            padding-bottom: 8px;
          }
          &:hover {
            box-shadow: none;
          }
          .el-input__wrapper {
            padding: 0 8px;
            box-shadow: 0 0 1px var(--o-color-border1);
          }
        }
      }

      .content-box {
        min-height: 1948px;
        width: 100%;
        box-shadow: var(--o-shadow-l1);
        background-color: var(--o-color-bg2);
        @media (max-width: 768px) {
          width: 100vw;
          padding: var(--o-spacing-h5) var(--o-spacing-h5) 0 var(--o-spacing-h5);
          min-height: 0;
          background-color: var(--o-color-bg1);
          box-shadow: none;
        }
        .content-list {
          padding: 0 var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2);
          @media (max-width: 768px) {
            padding: 0;
            background-color: var(--o-color-bg2);
          }
          li {
            padding-top: var(--o-spacing-h2);
            &:empty {
              padding: 0;
            }
            @media (max-width: 768px) {
              padding-top: var(--o-spacing-h5);
              margin: 0 var(--o-spacing-h5);
              &::after {
                display: block;
                content: '';
                width: 100%;
                height: 1px;
                background-color: var(--o-color-division1);
                margin-top: 16px;
              }
              &:nth-last-of-type(1)::after {
                background-color: transparent;
              }
            }
            h3 {
              font-size: var(--o-font-size-h5);
              color: var(--o-color-text1);
              line-height: var(--o-line-height-h5);
              font-weight: 500;
              cursor: pointer;
              :deep(span) {
                color: var(--o-color-brand1);
              }
              @media (max-width: 768px) {
                font-size: var(--o-font-size-text);
                line-height: var(--o-line-height-text);
              }
            }
            .detail {
              cursor: pointer;
              margin-top: 16px;
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-text1);
              max-height: 110px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-overflow: -webkit-ellipsis-lastline;
              display: -webkit-box;
              -webkit-line-clamp: 5;
              line-clamp: 5;
              -webkit-box-orient: vertical;

              :deep(span) {
                color: var(--o-color-brand1);
              }
              @media (max-width: 768px) {
                margin-top: 4px;
                -webkit-line-clamp: 6;
                line-clamp: 6;
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-tip);
                color: var(--o-color-text4);
              }
            }
            .from {
              margin-top: 15px;
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-text1);
              @media (max-width: 768px) {
                margin-top: 8px;
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-tip);
                color: var(--o-color-text4);
              }
            }
            .version {
              margin-top: var(--o-spacing-h8);
            }
          }
        }
      }

      .page-box {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: var(--o-spacing-h4);
        @media (max-width: 768px) {
          width: 100vw;
        }

        .pagination-pc {
          @media (max-width: 768px) {
            display: none;
          }
        }
      }
    }
    .exist-suggest {
      margin-top: 0;
    }
  }
  .search-right {
    width: 320px;
    height: 2005px;
    margin-top: 78px;
    .rpm-list {
      background-color: var(--o-color-bg2);
      box-shadow: var(--o-shadow-l1);
    }
    @media (max-width: 1200px) {
      display: none;
    }
    h3 {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      padding: var(--o-spacing-h2);
      padding-bottom: 0;
      color: var(--o-color-text1);
    }
    ul {
      padding: 0 var(--o-spacing-h2);
      li {
        padding-top: var(--o-spacing-h4);
        color: var(--o-color-text1);
        a {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--o-color-brand1);
        }
        p {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          margin-top: var(--o-spacing-h8);
          color: var(--o-color-text4);
        }
      }
    }
    :deep(.is-horizontal) {
      display: none;
    }
  }
  .exist-suggest-1 {
    margin-top: 103px;
  }
}
</style>
