<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vitepress';

import { useI18n } from '@/i18n';

import { getOsvOne } from '@/api/api-security';

import AppContent from '@/components/AppContent.vue';

import templatData from '@/data/osv';
import { OsvListT } from '@/shared/@types/type-support';

const i18n = useI18n();
const router = useRouter();

const queryId = ref('');

const approveList: any = ref({});

function goBackPage() {
  const i = router.route.path.lastIndexOf('a');
  router.go(`${router.route.path.substring(0, i)}`);
}

const isTemplate = ref(true); // 是否是Osv默认详情模板
const OSV_TYPE = '嵌入式';
onMounted(() => {
  // 获取osv id请求详情数据
  const match = window.location.href.match(/\?id=([0-9a-zA-Z]+)$/);
  if (match) {
    queryId.value = match[1];
    getOsvOne(queryId.value).then(
      (res: {
        code: number;
        msg: string;
        result: OsvListT;
        success: boolean;
      }) => {
        if (res.success) {
          approveList.value = res.result;
          // 不同type显示不同的页面模板
          if (res.result.type === OSV_TYPE) {
            isTemplate.value = false;
          }
        }
      }
    );
  }
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

    <div
      v-for="item in isTemplate
        ? templatData.zh.template
        : templatData.zh.flushbonading"
      :key="item.title"
      class="tool-content"
    >
      <div class="common-title">
        {{ item.title }}
      </div>
      <OTable :data="item.lists" class="pc-list">
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
        <li v-for="child in item.lists" :key="child.name" class="item">
          <ul>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.TEST_ITEM }}:</span>
              <div>{{ child.name }}</div>
            </li>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.DETECTION_DESC }}:</span>
              <div>{{ child.desc }}</div>
            </li>
            <li>
              <span>{{ i18n.approve.TOOL_LIST.CONCLUSION }}:</span>
              <div>
                <img src="@/assets/category/support/osv/adopt.png" alt="" />
                <span>{{ child.result }}</span>
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
    margin-bottom: var(--e-spacing-h5);
    font-size: var(--e-font-size-h6);
    color: var(--e-color-link1);
    line-height: var(--e-line-height-h5);
    cursor: pointer;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-h7);
      font-size: var(--e-font-size-h7);
    }
  }
  .banner-title {
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    margin-bottom: var(--e-spacing-h1);
    color: var(--e-color-text1);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-h5);
      line-height: var(--e-line-height-h5);
      margin-bottom: var(--e-spacing-h2);
    }
  }
}
.common-title {
  font-size: var(--e-font-size-h5);
  font-weight: 500;
  color: var(--e-color-text1);
  line-height: var(--e-line-height-h5);
  margin-bottom: var(--e-spacing-h4);
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-h7);
    margin-bottom: var(--e-spacing-h5);
  }
}
.assess-content {
  padding-bottom: var(--e-spacing-h4);
  &-box {
    font-size: var(--e-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-text);
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
    .left ul li {
      display: flex;
      padding-bottom: var(--e-spacing-h5);
      a {
        color: var(--e-color-link1);
      }
      p {
        color: var(--e-color-text4);
        &:nth-child(2) {
          flex: 1;
        }
      }
      .item-name {
        width: 180px;
        color: var(--e-color-text1);
        @media screen and (max-width: 767px) {
          width: 100px;
          margin-right: 8px;
        }
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
            margin-right: var(--e-spacing-h9);
            width: 32px;
            height: 32px;
            align-self: center;
            @media screen and (max-width: 768px) {
              width: 18px;
              height: 18px;
            }
          }
          .claim-text {
            font-size: var(--e-font-size-h4);
            color: var(--e-color-text1);
            line-height: var(--e-line-height-h3);
            font-weight: 800;
            @media screen and (max-width: 768px) {
              font-size: var(--e-font-size-h7);
              line-height: var(--e-line-height-h7);
            }
          }
        }
        .subtitle-claim {
          width: 100px;
          font-size: var(--e-font-size-text);
          color: var(--e-color-text4);
          text-align: center;
          line-height: var(--e-spacing-h4);
          margin-top: var(--e-spacing-h5);
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
  box-shadow: var(--e-shadow1);
  @media screen and (max-width: 768px) {
    display: block;
  }
  .item {
    padding: var(--e-spacing-h5) var(--e-spacing-h5) var(--e-spacing-h8);
    font-size: var(--e-font-size-tip);
    font-weight: 400;
    color: var(--e-color-neutral8);
    line-height: var(--e-line-height-tip);
    background-color: var(--e-color-bg2);
    &:nth-child(odd) {
      background: var(--e-color-bg4);
    }
    & li {
      margin-bottom: var(--e-spacing-h8);
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
          margin-right: var(--e-spacing-h10);
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
      color: var(--e-color-text1);
      margin-right: var(--e-spacing-h8);
    }
  }
}
.tool-content {
  margin-bottom: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-bottom: var(--e-spacing-h4);
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.pass-box {
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin-right: var(--e-spacing-h9);
  }
}
</style>
