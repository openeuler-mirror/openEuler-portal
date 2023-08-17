<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vitepress';

import { useI18n } from '@/i18n';

import { DetailQuery } from '@/shared/@types/type-support';
import { getOsvOne } from '@/api/api-security';

import AppContent from '@/components/AppContent.vue';

const i18n = useI18n();
const router = useRouter();

const queryData: DetailQuery = reactive({
  id: '',
});

const approveList: any = ref({});
const toolList = ref([
  {
    key: 'core_pkg',
    name: i18n.value.approve.TOOL_NAME.CORE_PKG,
    desc: i18n.value.approve.TOOL_DESCRIBE.CORE_PKG,
    result: '',
  },
  {
    key: 'soft_pkg',
    name: i18n.value.approve.TOOL_NAME.SOFT_PKG,
    desc: i18n.value.approve.TOOL_DESCRIBE.SOFT_PKG,
    result: '',
  },
  {
    key: 'KABI',
    name: i18n.value.approve.TOOL_NAME.KABI,
    desc: i18n.value.approve.TOOL_DESCRIBE.KABI,
    result: '',
  },
  {
    key: 'ABI',
    name: i18n.value.approve.TOOL_NAME.ABI,
    desc: i18n.value.approve.TOOL_DESCRIBE.ABI,
    result: '',
  },
  {
    key: 'service_config',
    name: i18n.value.approve.TOOL_NAME.SERVICE,
    desc: i18n.value.approve.TOOL_DESCRIBE.SERVICE,
    result: '',
  },
  {
    key: 'soft_config',
    name: i18n.value.approve.TOOL_NAME.SOFT_CONFIG,
    desc: i18n.value.approve.TOOL_DESCRIBE.SOFT_CONFIG,
    result: '',
  },
  {
    key: 'kernel_config',
    name: i18n.value.approve.TOOL_NAME.KARNEL_CONFIG,
    desc: i18n.value.approve.TOOL_DESCRIBE.KARNEL_CONFIG,
    result: '',
  },
]);

const platformList = ref([
  {
    key: 'repo',
    name: i18n.value.approve.PLATFORM_NAME.REPO,
    desc: i18n.value.approve.PLATFORM_DESCRIBE.REPO,
    result: '',
  },
  {
    key: 'base_test',
    name: i18n.value.approve.PLATFORM_NAME.BASE,
    desc: i18n.value.approve.PLATFORM_DESCRIBE.BASE,
    result: '',
  },
  {
    key: 'performance_test',
    name: i18n.value.approve.PLATFORM_NAME.PERFORMANCE,
    desc: i18n.value.approve.PLATFORM_DESCRIBE.PERFORMANCE,
    result: '',
  },
  {
    key: 'running_config',
    name: i18n.value.approve.PLATFORM_NAME.RUNNING,
    desc: i18n.value.approve.PLATFORM_DESCRIBE.RUNNING,
    result: '',
  },
]);

function goBackPage() {
  const i = router.route.path.lastIndexOf('a');
  router.go(`${router.route.path.substring(0, i)}`);
}

onMounted(() => {
  const index1 = decodeURIComponent(window.location.href).indexOf('=');
  queryData.id = decodeURIComponent(window.location.href).substring(index1 + 1);
  getOsvOne(queryData).then((res: any) => {
    approveList.value = res.result;
    res.result.toolsResult.forEach((item: any) => {
      toolList.value.forEach((it: any) => {
        if (item.name === it.key) {
          it.result = item.result === 'pass' ? '通过' : '未通过';
        }
      });
    });
    res.result.platformResult.forEach((item: any) => {
      platformList.value.forEach((val: any) => {
        if (item.name === val.key) {
          val.result = item.result === 'pass' ? '通过' : '未通过';
        }
      });
    });
  });
});
</script>
<template>
  <AppContent :mobile-top="16">
    <div class="banner">
      <div class="breadcrumb" @click="goBackPage">
        {{ i18n.approve.TITLE }} \
      </div>
      <div class="banner-title">
        {{ i18n.approve.SUBTITLE_REPORT }}
      </div>
    </div>

    <div class="assess-content">
      <div class="common-title">
        {{ i18n.approve.ASSESS_LIST.ASSESS_INFO }}
      </div>
      <div class="assess-content-box">
        <div class="left">
          <ul>
            <li>
              <p class="item-name">{{ i18n.approve.ASSESS_LIST.OSV }}</p>
              <p>{{ approveList.osVersion }}</p>
            </li>
            <li>
              <p class="item-name">
                {{ i18n.approve.ASSESS_LIST.ARCHITECTURE }}
              </p>
              <p>{{ approveList.arch }}</p>
            </li>
            <li>
              <p class="item-name">
                {{ i18n.approve.ASSESS_LIST.PUBLISH_ADDRESS }}
              </p>
              <a
                :href="approveList.friendlyLink"
                target="_blank"
                rel="noopener noreferrer"
                >{{ approveList.friendlyLink }}</a
              >
            </li>
            <li>
              <p class="item-name">{{ i18n.approve.ASSESS_LIST.CHECKSUM }}</p>
              <p>{{ approveList.checksum }}</p>
            </li>
            <li>
              <p class="item-name">
                {{ i18n.approve.ASSESS_LIST.OPENEULER_EDITION }}
              </p>
              <p>{{ approveList.baseOpeneulerVersion }}</p>
            </li>
          </ul>
        </div>
        <div class="right">
          <div v-show="approveList.totalResult" class="top">
            <div v-if="approveList.totalResult == 'pass'" class="title-claim">
              <img src="@/assets/category/support/osv/adopt.png" alt="" />
              <div class="claim-text">{{ i18n.approve.ADOPT }}</div>
            </div>
            <div v-else class="title-claim">
              <img src="@/assets/category/support/osv/fail.png" alt="" />
              <div class="claim-text">{{ i18n.approve.FAIL }}</div>
            </div>
            <div class="subtitle-claim">
              {{ i18n.approve.ASSESS_LIST.COMPATIBLE }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tool-content">
      <div class="common-title">
        {{ i18n.approve.TOOL_LIST.TOOL_DETECT }}
      </div>
      <OTable :data="toolList" class="pc-list">
        <OTableColumn
          :label="i18n.approve.TOOL_LIST.TEST_ITEM"
          prop="name"
          width="300"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.approve.TOOL_LIST.DETECTION_DESC"
          prop="desc"
        ></OTableColumn>

        <el-table-column :label="i18n.approve.TOOL_LIST.CONCLUSION" width="300">
          <template #default="scope">
            <div class="pass-box">
              <img src="@/assets/category/support/osv/adopt.png" alt="" />
              <p>
                {{ scope.row.result }}
              </p>
            </div>
          </template>
        </el-table-column>
      </OTable>
      <ul class="mobile-list">
        <li v-for="item in toolList" :key="item.id" class="item">
          <ul>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.TEST_ITEM }}:</span>
              <div>{{ item.name }}</div>
            </li>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.DETECTION_DESC }}:</span>
              <div>{{ item.desc }}</div>
            </li>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.DETECTION_DESC }}:</span>
              <div>
                <img src="@/assets/category/support/osv/adopt.png" alt="" />
                <span>{{ item.result }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="platform-content">
      <div class="common-title">
        {{ i18n.approve.PLATFORM_LIST.PLATFORM_VERIFY }}
      </div>
      <OTable :data="platformList" class="pc-list">
        <OTableColumn
          :label="i18n.approve.TOOL_LIST.TEST_ITEM"
          prop="name"
          width="300"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.approve.TOOL_LIST.DETECTION_DESC"
          prop="desc"
        ></OTableColumn>
        <el-table-column :label="i18n.approve.TOOL_LIST.CONCLUSION" width="300">
          <template #default="scope">
            <div class="pass-box">
              <img src="@/assets/category/support/osv/adopt.png" alt="" />
              <p>
                {{ scope.row.result }}
              </p>
            </div>
          </template>
        </el-table-column>
      </OTable>
      <ul class="mobile-list">
        <li v-for="item in platformList" :key="item.id" class="item">
          <ul>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.TEST_ITEM }}:</span>
              <div>{{ item.name }}</div>
            </li>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.DETECTION_DESC }}:</span>
              <div>{{ item.desc }}</div>
            </li>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.DETECTION_DESC }}:</span>
              <div>
                <img src="@/assets/category/support/osv/adopt.png" alt="" />
                <span>{{ item.result }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.banner {
  margin: 0 auto;
  .breadcrumb {
    margin-bottom: var(--o-spacing-h5);
    font-size: var(--o-font-size-h6);
    color: var(--o-color-link1);
    line-height: var(--o-line-height-h5);
    cursor: pointer;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h7);
      font-size: var(--o-font-size-h7);
    }
  }
  .banner-title {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    margin-bottom: var(--o-spacing-h1);
    color: var(--o-color-text1);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      margin-bottom: var(--o-spacing-h2);
    }
  }
}
.common-title {
  font-size: var(--o-font-size-h5);
  font-weight: 500;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h5);
  margin-bottom: var(--o-spacing-h4);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-h7);
    margin-bottom: var(--o-spacing-h5);
  }
}
.assess-content {
  padding-bottom: var(--o-spacing-h4);
  &-box {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-text);
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
    .left ul li {
      display: flex;
      padding-bottom: var(--o-spacing-h5);
      a {
        color: var(--o-color-link1);
      }
      p {
        color: var(--o-color-text4);
      }
      .item-name {
        width: 180px;
        color: var(--o-color-text1);
      }
    }
    .left {
      flex: 1;
    }
    .right {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 768px) {
        justify-content: flex-start;
      }
      .top {
        .title-claim {
          display: flex;
          align-items: center;
          img {
            margin-right: var(--o-spacing-h9);
            width: 32px;
            height: 32px;
            align-self: center;
            @media screen and (max-width: 768px) {
              width: 18px;
              height: 18px;
            }
          }
          .claim-text {
            font-size: var(--o-font-size-h4);
            color: var(--o-color-text1);
            line-height: var(--o-line-height-h3);
            font-weight: 800;
            @media screen and (max-width: 768px) {
              font-size: var(--o-font-size-h7);
              line-height: var(--o-line-height-h7);
            }
          }
        }
        .subtitle-claim {
          width: 100px;
          font-size: var(--o-font-size-text);
          color: var(--o-color-text4);
          text-align: center;
          line-height: var(--o-spacing-h4);
          margin-top: var(--o-spacing-h5);
        }
      }
    }
  }
}
.pc-list {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.mobile-list {
  display: none;
  margin-bottom: var(--o-spacing-h5);
  box-shadow: var(--o-shadow1);
  @media screen and (max-width: 768px) {
    display: block;
  }
  .item {
    padding: var(--o-spacing-h5) var(--o-spacing-h5) var(--o-spacing-h8);
    font-size: var(--o-font-size-tip);
    font-weight: 400;
    color: var(--o-color-neutral8);
    line-height: var(--o-line-height-tip);
    background-color: var(--o-color-bg2);
    &:nth-child(odd) {
      background: var(--o-color-bg4);
    }
    & li {
      margin-bottom: var(--o-spacing-h8);
      display: flex;
      span {
        width: 64px;
      }
      div {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          width: 12px;
          height: 12px;
          margin-right: var(--o-spacing-h10);
        }
      }
    }
    li:nth-child(4) {
      display: flex;
      span {
        min-width: 52px;
      }
    }
    span {
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h8);
    }
  }
}
.tool-content {
  margin-bottom: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-bottom: var(--o-spacing-h4);
  }
}
.pass-box {
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin-right: var(--o-spacing-h9);
  }
}
</style>
