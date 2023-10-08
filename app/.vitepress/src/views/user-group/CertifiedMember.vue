<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from '@/i18n';

import certifiedData from '@/data/user-group';

const i18n = useI18n();
const certifiedI18n = computed(() => {
  return i18n.value.group;
});
const dialogVisible = ref(false);
</script>
<template>
  <div class="certified">
    <div class="title">{{ certifiedI18n.CERTIFIED }}</div>
    <p class="word-style">
      {{ certifiedI18n.CERTIFIED_INTRODUCTION }}
      <a @click="dialogVisible = true">{{ certifiedI18n.CERTIFIED_TEXT }}</a>
    </p>
    <div class="certified-main">
      <OContainer
        v-for="local in certifiedData"
        :key="local.groupLocal"
        class="certified-card"
      >
        <div class="certified-title">
          {{ local.groupLocal }}
        </div>
        <ul class="certified-list">
          <li v-for="item in local.members" :key="item.name" class="item">
            <img :src="item.img" alt="" />
            <span class="name">{{ item.name }}</span>
            <p class="titles">
              <span v-for="title in item.titles" :key="title">{{ title }}</span>
            </p>
            <a v-if="item.forum" :href="item.forum">论坛主页</a>
          </li>
        </ul>
      </OContainer>
    </div>
    <p class="tip">注：按提交展示信息时间顺序排列</p>
    <ClientOnly>
      <ODialog
        v-model="dialogVisible"
        :show-close="false"
        lock-scroll
        close-on-press-escape
        close-on-click-modal
        destroy-on-close
        width="70%"
      >
        <h3>成为认证成员条件说明：</h3>
        <h4>
          只有认证成员才能获得成员证书及正式上官网展示，成为用户组认证成员需满足对应角色的任一条件：
        </h4>
        <h4>Member（满足以下任一条件）</h4>
        <ul>
          <li>
            1、openEuler用户，提交至少1个 <a href="/zh/showcase/">用户案例</a>
          </li>
          <li>
            2、每一年<a href="https://forum.openeuler.org/" target="_blank"
              >openEuler论坛</a
            >贡献值达到200
          </li>
          <li>3、邀请3家企业/单位成员加入用户组</li>
        </ul>
        <h4>Ambassador（满足以下任一条件）</h4>
        <ul>
          <li>
            1、至少一年 1 次在公开 Meetup 或峰会分享 openEuler 内容相关的议题
          </li>
          <li>
            2、每一年<a href="https://forum.openeuler.org/" target="_blank"
              >openEuler论坛</a
            >贡献值达到1000
          </li>
          <li>
            3、输出 openEuler 相关有质量的技术博客文章 20+篇（发表在 openEuler
            论坛或 其他平台）
          </li>
          <li>4、邀请 10 家企业/单位成员加入用户组</li>
        </ul>
        <h4>Organizer</h4>
        <ul>
          <li>1、输出所在区域用户组年度运作规划</li>
          <li>2、成功组织过至少1次用户组线下活动</li>
        </ul>
        <h4>
          满足相应条件后，请填写<a
            target="_blank"
            href="https://docs.qq.com/form/page/DZURUQmpMVW5qdGRB"
            >认证申请表</a
          >，审核通过后将安排发放证书和上线官网。
        </h4>
      </ODialog>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.certified-main {
  display: grid;
  margin-top: 40px;
  grid-template-columns: 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  @media screen and(max-width:768px) {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  .certified-card {
    padding: 40px;
    .certified-title {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      text-align: center;
      color: var(--o-color-text1);
    }
    @media screen and(max-width:768px) {
      padding: 16px;
      justify-content: space-around;
      .certified-title {
        font-weight: 300;
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
    .certified-list {
      display: grid;
      margin-top: 32px;
      grid-template-columns: repeat(6, 1fr);
      grid-row-gap: 24px;
      grid-column-gap: 24px;

      @media screen and (max-width: 1416px) {
        grid-template-columns: repeat(6, 1fr);
      }
      @media screen and (max-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media screen and(max-width:768px) {
        margin-top: 24px;
        font-size: var(--o-font-size-tip);
        grid-template-columns: repeat(2, 1fr);
      }
      .item {
        display: flex;
        flex-direction: column;
        text-align: center;
        color: var(--o-color-text4);
        align-items: center;
        line-height: var(--o-line-height-text);
        font-size: var(--o-font-size-text);
        margin-top: 8px;
        img {
          max-width: 120px;
        }
        .name {
          margin-top: 16px;
        }
        .titles {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
.tip {
  margin-top: 24px;
  color: var(--o-color-text1);
  @media screen and (max-width:768px) {
    margin-top: 12px;
    font-size: var(--o-font-size-tip);
  }
}
:deep(.el-dialog) {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    background-color: var(--o-color-bg1);
    padding: 40px;
    color: var(--o-color-text1);
    h3 {
      font-weight: 500;
      font-size: var(--o-font-size-h5);
    }
    h4 {
      font-weight: 500;
      margin-top: 16px;
      font-size: var(--o-font-size-h7);
    }
    li,
    p {
      margin-top: 8px;
      font-size: var(--o-font-size-text);
    }
    @media screen and (max-width: 768px) {
      padding: 16px;
      h3 {
        font-size: var(--o-font-size-h7);
      }
      h4 {
        margin-top: 8px;
        font-size: var(--o-font-size-text);
      }
      li,
      p {
        margin-top: 4px;
        font-size: var(--o-font-size-tip);
      }
    }
  }
}
</style>
