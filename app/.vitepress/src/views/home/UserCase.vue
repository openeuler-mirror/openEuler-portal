<script setup lang="ts">
import { onMounted, ref, nextTick, computed, onUnmounted } from 'vue';

import { useCommon } from '@/stores/common';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import { useI18n } from '@/i18n';

const i18n = useI18n();
const commonStore = useCommon();
const caseContent = ref<HTMLElement>();
const caseData: any = ref({});

const active = ref(0);
const activeMobile = ref(0);

const isShow = ref(false);

const props = defineProps({
  caseData: {
    type: Object,
    default: undefined,
  },
});

const jumpTo = (path: string, industry?: number) => {
  if (industry) {
    window.open(
      `${path}?industry=${industry}`.replace(/(index)$/g, ''),
      '_blank'
    );
  } else {
    window.open(path.replace(/(index)$/g, ''), '_blank');
  }
};

const timer = ref();

const handleChangeActive = (index: number) => {
  active.value = index;
  activeMobile.value = index;
};

const handleChangeActiveMobile = (activeNames: any) => {
  if (activeNames !== '') {
    active.value = activeNames;
  }
};

const initData = (res: any) => {
  const result: any = {};
  res?.obj?.records.forEach((item: { lang: string; industry: string }) => {
    if (typeof result[item.industry] === 'undefined') {
      result[item.industry] = [];
    }
    if (result[item.industry].length < 4) {
      result[item.industry].push(item);
    }
  });
  caseData.value = result;
};
const getImgUrl = computed(() => (item: { URL_DARK: string; URL: string }) => {
  return commonStore.theme === 'dark' ? item.URL_DARK : item.URL;
});

const getImgUrlHover = computed(
  () => (item: { ACTIVE_DARK_URL: string; ACTIVE_URL: string }) => {
    return commonStore.theme === 'dark'
      ? item.ACTIVE_DARK_URL
      : item.ACTIVE_URL;
  }
);

const changeCase = () => {
  active.value === i18n.value.home.USER_CASE.CASE_LIST.length - 1
    ? (active.value = 0)
    : active.value++;
};

const setCaseInterval = () => {
  timer.value = setInterval(changeCase, 5000);
};
const clearCaseInterval = () => {
  clearInterval(timer.value);
};

onMounted(() => {
  props.caseData && initData(props.caseData);

  try {
    if (caseContent.value) {
      const observer = new IntersectionObserver((res) => {
        isShow.value = false;
        if (res[0].intersectionRatio <= 0) return;
        nextTick(() => {
          isShow.value = true;
        });
      });
      caseContent.value && observer.observe(caseContent.value);
      setCaseInterval();
      caseContent.value.addEventListener('mouseover', clearCaseInterval);
      //鼠标移出继续
      caseContent.value.addEventListener('mouseout', setCaseInterval);
    }
  } catch (error: any) {
    console.error(error);
  }
});
onUnmounted(() => {
  timer.value.clearInterval;
  caseContent.value?.removeEventListener('mouseover', clearCaseInterval);
  caseContent.value?.removeEventListener('mouseout', setCaseInterval);
});
</script>

<template>
  <div class="home-user-case">
    <h3>{{ i18n.home.USER_CASE.TITLE }}</h3>
    <OContainer
      ref="userCase"
      :level-index="1"
      data-aos="fade-down"
      class="container"
    >
      <OCollapse
        v-model="activeMobile"
        accordion
        class="case-mobile"
        @change="handleChangeActiveMobile"
      >
        <OCollapseItem
          v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST"
          :key="item.TYPE"
          class="case-list-mobile"
          :name="index"
        >
          <template #title>
            <div class="case-card-content-mobile">
              <div class="case-title-mobile">
                <img
                  class="case-img-mobile"
                  :src="
                    commonStore.theme === 'dark'
                      ? index === activeMobile
                        ? item.ACTIVE_DARK_URL
                        : item.URL_DARK
                      : index === activeMobile
                      ? item.ACTIVE_URL
                      : item.URL
                  "
                  alt="openEuler"
                />
                <div class="case-word-mobile">
                  {{ item.TYPE }}
                </div>
              </div>
            </div>
          </template>
          <div class="user-mobile">
            <div
              v-for="user in caseData && caseData[item.TYPE]"
              :key="user.company"
              class="user-card"
              @click="jumpTo(user.path)"
            >
              <div class="user-title">{{ user.company }}</div>
              <div class="user-word">{{ user.summary }}</div>
            </div>
          </div>
        </OCollapseItem>
      </OCollapse>
      <div ref="caseContent" class="case" :class="isShow ? '' : 'pc-height'">
        <OCard class="case-card" shadow="never">
          <div class="case-tab">
            <div
              v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST"
              :key="item.TYPE"
              class="case-tab-item"
              @click="handleChangeActive(index)"
            >
              <div
                class="case-img-box"
                :class="active === index ? 'active' : ''"
              >
                <img
                  :src="getImgUrl(item)"
                  alt="openEuler"
                  class="nav-item-icon"
                />
                <img
                  :src="getImgUrlHover(item)"
                  alt="openEuler"
                  class="nav-item-icon-hover"
                />
              </div>
              <div :class="['case-word', active === index ? 'active' : '']">
                {{ item.TYPE }}
              </div>
            </div>
          </div>
          <div class="case-user">
            <a
              v-for="item2 in caseData &&
              caseData[i18n.home.USER_CASE.CASE_LIST[active].TYPE]"
              :key="item2.summary"
              :href="'/' + item2.path.replace(/(index)$/g, '')"
              target="_blank"
              rel="noopener noreferrer"
              class="user-card"
            >
              <div class="user-title">{{ item2.company }}</div>
              <div class="user-word">{{ item2.summary }}</div>
            </a>
          </div>
          <div class="case-more">
            <OButton
              animation
              type="text"
              class="case-more-item"
              @click="jumpTo(i18n.home.USER_CASE.VIEW_MORE_LINK, active + 1)"
            >
              {{ i18n.home.USER_CASE.VIEW_MORE }}
              <template #suffixIcon>
                <IconArrowRight class="case-more-icon"></IconArrowRight>
              </template>
            </OButton>
          </div>
        </OCard>
      </div>
    </OContainer>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  font-size: var(--e-font-size-h3);
  font-weight: 300;
  color: var(--e-color-text1);
  line-height: var(--e-line-height-h3);
  width: 100%;
  text-align: center;
  margin-top: var(--e-spacing-h1);
  @media (max-width: 768px) {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    margin-top: var(--e-spacing-h2);
  }
}
.container {
  @media screen and (max-width: 1100px) {
    box-shadow: none;
    .o-collapse-item {
      box-shadow: var(--e-shadow-l1);
    }
  }
}
.case-mobile {
  display: none;
  background-color: var(--e-color-bg1);
  @media (max-width: 1100px) {
    border-top: none;
    display: block;
    box-shadow: none;
  }

  .case-list-mobile {
    margin-top: var(--e-spacing-h4);
    @media (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }

    :deep(.el-collapse-item__header) {
      height: 100%;
      padding: var(--e-spacing-h5);
      @media (max-width: 768px) {
        padding: var(--e-spacing-h8);
      }
    }
  }

  .case-title-mobile {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  .case-word-mobile {
    margin-left: var(--e-spacing-h8);
    font-size: var(--e-font-size-h5);
    line-height: var(--e-line-height-h5);
    font-weight: 400;
    color: var(--e-color-text1);
    @media (max-width: 768px) {
      font-size: var(--e-font-size-text);
      font-weight: 400;
      line-height: var(--e-line-height-text);
    }
  }

  .case-img-mobile {
    width: 40px;
    height: 40px;
    color: var(--e-color-text1);
  }

  .case-card-mobile {
    margin-top: var(--e-spacing-h5);
    width: 100%;
    border-left: 2px solid var(--e-color-brand1);
    .case-card-content-mobile {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .case-icon-mobile {
    font-size: var(--e-font-size-h8);
    color: var(--e-color-text4);
  }
}
.user-mobile {
  background-color: var(--e-color-bg4);
  > :nth-child(1) {
    margin-top: 0px;
  }
}
.user-card {
  cursor: pointer;
  padding: var(--e-spacing-h5);
  width: 100%;
  height: 100%;
  background: var(--e-color-bg1);
  border: 1px solid rgba(0, 0, 0, 0);

  @media (max-width: 1100px) {
    background: var(--e-color-bg2);
    margin-top: var(--e-spacing-h8);
  }

  @media (max-width: 768px) {
    padding: var(--e-spacing-h8);
  }
}

.user-card:hover {
  @media (min-width: 1100px) {
    background-color: var(--e-color-bg2);
    border: 1px solid var(--e-color-brand1);
    transition: 0.3s all;
  }
}

.user-title {
  font-size: var(--e-font-size-h7);
  font-weight: 500;
  color: var(--e-color-text1);
  line-height: var(--e-line-height-h7);
  @media (max-width: 768px) {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
}

.user-word {
  font-size: var(--e-font-size-text);
  font-weight: 400;
  color: var(--e-color-text4);
  line-height: var(--e-line-height-text);
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2; // 设置两行文字溢出
  -webkit-box-orient: vertical;
  @media (max-width: 768px) {
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
  }
}
.case {
  display: block;
  @media (max-width: 1100px) {
    display: none;
  }

  .case-main {
    :deep(.el-collapse) {
      border: none;
    }

    :deep(.el-collapse-item__header) {
      border-left: 2px solid var(--e-color-brand1);
    }
  }

  .case-more {
    display: flex;
    padding-top: var(--e-spacing-h2);
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1000px) {
      padding: 20px 0;
      font-size: 12px;
    }

    :deep(.o-button) {
      padding: 0;
    }

    .case-more-icon {
      color: var(--e-color-brand1);
      width: var(--e-font-size-h8);
      height: var(--e-font-size-h8);
    }
  }

  .case-user {
    margin-top: var(--e-spacing-h2);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: var(--e-spacing-h2);
    grid-gap: var(--e-spacing-h4) var(--e-spacing-h2);
    border-bottom: 1px solid var(--e-color-division1);
  }

  .case-card {
    margin-top: var(--e-spacing-h2);
    width: 100%;
    padding: 20px;
    box-shadow: none !important;
  }

  .case-img {
    margin-top: var(--e-spacing-h5);
    width: 80px;
    height: 80px;
    color: var(--e-color-white);
  }

  .case-word {
    font-size: var(--e-font-size-h5);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h5);
    margin-top: 2px;
  }

  .case-tab {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    .case-tab-item {
      cursor: pointer;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin: 0px 28px;
      .nav-item-icon-hover {
        width: 80px;
        display: none;
      }
      .nav-item-icon {
        display: block;
      }
      &:hover {
        @media screen and (min-width: 1100px) {
          .nav-item-icon-hover {
            display: block;
          }
          .nav-item-icon {
            display: none;
          }
          .nav-text {
            .nav-title,
            .nav-descriptive {
              color: var(--e-color-brand1);
            }
          }
          .case-word {
            color: var(--e-color-brand1);
          }
        }
      }
      .active {
        .nav-item-icon-hover {
          display: block;
        }
        .nav-item-icon {
          display: none;
        }
      }
    }
  }
}
.pc-height {
  height: 500px;
}
.is-show {
  display: block;
}

.active {
  color: var(--e-color-brand1);
}
</style>
