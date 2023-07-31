<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useCommon } from '@/stores/common';

import AppContent from '@/components/AppContent.vue';
import InternshipBanner from './InternshipBanner.vue';
import InternshipStep from './InternshipStep.vue';
import InternshipTask from './InternshipTask.vue';
import InternshipRank from './InternshipRank.vue';
import InternshipTitleNav from './InternshipTitleNav.vue';

import qrCode from '@/assets/category/internship/qrCode.png';
import gitee_light from '@/assets/category/internship/logo/gitee_light.png';
import iscas_light from '@/assets/category/internship/logo/iscas_light.png';
import mindSpore_light from '@/assets/category/internship/logo/mindspore_light.png';
import openEuler_light from '@/assets/category/internship/logo/openeuler_light.png';
import openGauss_light from '@/assets/category/internship/logo/opengauss_light.png';
import openLookeng_light from '@/assets/category/internship/logo/openlookeng_light.png';
import qiLin_light from '@/assets/category/internship/logo/qilin_light.png';
import tongXin_light from '@/assets/category/internship/logo/tongxin_light.png';
import xinAn_light from '@/assets/category/internship/logo/xinan_light.png';
import gitee_dark from '@/assets/category/internship/logo/gitee_dark.png';
import iscas_dark from '@/assets/category/internship/logo/iscas_dark.png';
import mindSpore_dark from '@/assets/category/internship/logo/mindspore_dark.png';
import openEuler_dark from '@/assets/category/internship/logo/openeuler_dark.png';
import openGauss_dark from '@/assets/category/internship/logo/opengauss_dark.png';
import openLookeng_dark from '@/assets/category/internship/logo/openlookeng_dark.png';
import qiLin_dark from '@/assets/category/internship/logo/qilin_dark.png';
import tongXin_dark from '@/assets/category/internship/logo/tongxin_dark.png';
import xinAn_dark from '@/assets/category/internship/logo/xinan_dark.png';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
const commonStore = useCommon();
const INTEGRAL_DATA = [
  {
    HEAD: '1、实习工资',
    TEXT: [
      '实习有效期6个月内满20分以上，可获得不同级别的实习工资。具体见以上“申请步骤4”里的工资说明。',
    ],
    SUPPLEMENT: '',
  },
  {
    HEAD: '2、实习证明',
    TEXT: [
      '实习有效期6个月内积分满60分',
      '至少找一位导师写',
      '实习评语',
      '提交实习报告',
    ],
    SUPPLEMENT: '满足以上3条，实习评语与实习报告经评审合格后发放实习证明。',
  },
  {
    HEAD: '3、优秀实习生证书',
    TEXT: [
      '实习有效期6个月内积分满100分。（需包含有20及以上分值的任务）',
      '至少找一位导师写优秀推荐评语。',
      '完成优秀实习生线上公开答辩（直播形式）。',
    ],
    SUPPLEMENT:
      '满足以上3条，公开答辩获得评委打分80分以上后，发放优秀实习生证书。',
  },
  {
    HEAD: '4、欧拉&高斯人才发展加速计划',
    TEXT: [
      '欧拉&高斯社区在线实习进步奖（仅针对openEuler与openGauss社区）',
      '2023年内独在openEuler社区（或openGauss社区）积分满150分。',
      '2023年内独在openEuler社区（或openGauss社区）满120分并在openEuler（或openGauss）公众号发布3篇以上实习项目相关文章及参与过一次实习直播主讲。',
    ],
    SUPPLEMENT: [
      '加入',
      '“欧拉&高斯人才发展加速计划”',
      '，满足以上一项条件，可参与2023年年底“欧拉&高斯社区在线实习进步奖”评选，评选上后将获得相应证书和奖金。',
    ],
    SUPPLEMENT_LINK:
      'https://edu.hicomputing.huawei.com/openeuler-opengauss-talent',
  },
];
const RULE = {
  RULE_DATA: [
    {
      QUESTION: '1、哪些人可以报名？',
      ANSWER:
        'A：开源实习面向全国范围内年满18周岁的在校学生招募，无专业年级限制，欢迎感兴趣的同学踊跃报名。',
    },
    {
      QUESTION: '2、实习有效期6个月是如何计算的？',
      ANSWER:
        'A：在申请实习时需签署实习劳务合同，实习有效期即劳务合同上填写的实习有效期，为6个月期限，6个月期限内未满60积分则不能获得实习证明。线上实习时间管理相对自由，可根据自身情况安排时间，可提前结束实习。',
    },
    {
      QUESTION: '3、超过了6个月或者完成了100积分还能继续在社区做任务吗？',
      ANSWER:
        'A：可以，但积分不能再用于领取证明和奖金，一年内累计到150积分可获得openEuler社区高校“开源之星”荣誉。',
    },
  ],
  MORE: ['更多问题，请移步', '本帖', '评论区提问。'],
};

const PARTNER_DATA = computed(() => {
  if (commonStore.theme === 'light') {
    return [
      {
        IMG: iscas_light,
        LINK: '',
      },
      {
        IMG: qiLin_light,
        LINK: '',
      },
      {
        IMG: tongXin_light,
        LINK: '',
      },
      {
        IMG: xinAn_light,
        LINK: '',
      },
      {
        IMG: gitee_light,
        LINK: '',
      },
      {
        IMG: mindSpore_light,
        LINK: '',
      },
      {
        IMG: openEuler_light,
        LINK: '',
      },
      {
        IMG: openGauss_light,
        LINK: '',
      },
      {
        IMG: openLookeng_light,
        LINK: '',
      },
    ];
  } else {
    return [
      {
        IMG: iscas_dark,
        LINK: '',
      },
      {
        IMG: qiLin_dark,
        LINK: '',
      },
      {
        IMG: tongXin_dark,
        LINK: '',
      },
      {
        IMG: xinAn_dark,
        LINK: '',
      },
      {
        IMG: gitee_dark,
        LINK: '',
      },
      {
        IMG: mindSpore_dark,
        LINK: '',
      },
      {
        IMG: openEuler_dark,
        LINK: '',
      },
      {
        IMG: openGauss_dark,
        LINK: '',
      },
      {
        IMG: openLookeng_dark,
        LINK: '',
      },
    ];
  }
});

const HELP = {
  INFO: [
    '联系邮箱:',
    'intern@openeuler.sh',
    '扫码加入“开源实习”学生QQ群，备注高校及年级，更多问题群内咨询。',
    '群号：526089131',
  ],
  ITEM: {
    IMG: qrCode,
  },
};
const openGaussTask = {
  title: 'openGauss',
  intriduce: '一款高性能、高安全、高可靠的企业级开源关系型数据库',
};
const mindSporeTask = {
  title: 'MindSpore开源实习招聘要求（公开）',
  intriduce: [
    '1、全日制大三大四本科生或在读研究生，计算机、软件、人工智能、电子信息、数学、计算物理、计算生物、计算化学等相关专业；',
    '2、熟悉C++/Python编程，编码能力优秀，具有扎实的计算机基础；',
    '3、至少熟悉一种主流深度学习框架，如MindSpore、Tensorflow、PyTorch等；',
    '4、优选条件',
    ' （1）熟悉以下任一技术方向：分布式系统、并行计算、异构计算、深度学习编译优化、模型压缩、推理部署、算子开发、模型开发等；',
    ' （2）在高水平国际会议和学术期刊发表过相关论文或有高水平竞赛获奖经历；',
    ' （3）MindSpore社区优秀开发者、资深开发者、优秀布道师、资深布道师。',
    '注：申请MindSpore 社区实习的同学，在申请材料初选通过后，需参加机考，择优录取。',
  ],
};
// 右侧导航
const isNavShow = ref(false);
const activeIndex = ref(0);
const navList = [
  {
    key: '#introduce',
    name: '活动介绍',
  },
  {
    key: '#step',
    name: '申请步骤',
  },
  {
    key: '#task',
    name: '实习任务',
  },
  {
    key: '#integral ',
    name: '激励规则',
  },
  {
    key: '#rule',
    name: '实习规则',
  },
  {
    key: '#partner',
    name: '合作伙伴',
  },
  {
    key: '#help',
    name: '帮助咨询',
  },
];
const tabList = ['openEuler', 'openGauss', '昇思'];
const tabIndex = ref(0);
function changeTabIndex(index: number) {
  tabIndex.value = index;
}

const navRef: any = ref([]);
const handleScrollEvent = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const activeList: Array<number> = [];
  navRef.value.forEach((item: any, index: number) => {
    if (scrollTop + 100 > item.offsetTop) {
      activeList.push(index);
    }
  });
  if (scrollTop < 270) {
    isNavShow.value = false;
  } else {
    isNavShow.value = true;
  }
  activeIndex.value = activeList[activeList.length - 1];
};

onMounted(() => {
  navRef.value = document.querySelectorAll('.nav');
  window.addEventListener('scroll', handleScrollEvent);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollEvent);
});
</script>

<template>
  <InternshipTitleNav
    v-show="isNavShow"
    class="titlenav"
    :current-index="activeIndex"
    :data-list="navList"
    :internship="true"
  ></InternshipTitleNav>
  <InternshipBanner />
  <AppContent>
    <div class="intership-wrap">
      <section id="introduce" class="panel introduce-card nav">
        <p class="text">
          openEuler开源实习是openEuler社区和社区合作单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力，在社区中成长为优秀的开源人才。由社区提供实习任务，并提供导师辅导，学生通过实习申请后，可在社区领取任务，每完成一个任务可获得相应积分，积分累计达规定量后，可获得实习证明和实习工资。
        </p>
        <p class="text">
          盛情邀请社区各位资深开发者成为本次活动导师，点击导师报名通道填写报名表。
        </p>
        <p class="text">
          <a
            href="https://docs.qq.com/form/page/DUlZIaGFGZ0JGQmZs"
            target="_blank"
            rel="noopener noreferrer"
            >导师报名通道</a
          >
        </p>
      </section>
      <section id="step" class="panel nav">
        <div class="step-title title">
          <div class="title-img">申请步骤</div>
        </div>
        <InternshipStep />
      </section>
      <section id="task" class="panel nav">
        <div class="task-title title">
          <div class="title-img">实习任务</div>
          <ul class="tab-list">
            <li
              v-for="(item, index) in tabList"
              :key="item"
              :class="{ active: tabIndex === index }"
              @click="changeTabIndex(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <InternshipTask v-show="tabIndex === 0" />
        <div v-show="tabIndex === 1" class="opengauss-task task-wrap">
          <p class="title">
            <a
              href="https://opengauss.org/"
              target="_blank"
              rel="noopener noreferrer"
              >{{ openGaussTask.title }}</a
            >
          </p>
          <p class="intriduce">{{ openGaussTask.intriduce }}</p>
          <div class="btn">
            <a
              href="https://gitee.com/opengauss/opensource-intership/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openlookeng-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=newest&state=open&target_project&skip_mobile=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton type="primary" class="task-btn"
                >实习任务
                <OIcon><IconArrowRight /></OIcon>
              </OButton>
            </a>
            <a
              href="https://opengauss.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton class="detail-btn">
                <span>官网详情</span>
                <OIcon><IconArrowRight /></OIcon>
              </OButton>
            </a>
          </div>
        </div>
        <div v-show="tabIndex === 2" class="mindspore-task task-wrap">
          <p class="title">
            <a
              href="https://www.mindspore.cn/"
              target="_blank"
              rel="noopener noreferrer"
              >{{ mindSporeTask.title }}</a
            >
          </p>
          <div>
            <p
              v-for="item in mindSporeTask.intriduce"
              :key="item"
              class="intriduce"
            >
              {{ item }}
            </p>
          </div>

          <div class="btn">
            <a
              href="https://gitee.com/mindspore/community/issues/I55QGD?from=project-issue&skip_mobile=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton class="task-btn">
                <span>实习任务</span>
                <OIcon><IconArrowRight /></OIcon>
              </OButton>
            </a>
            <a
              href="https://www.mindspore.cn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton class="detail-btn">
                <span>官网详情</span>
                <OIcon><IconArrowRight /></OIcon>
              </OButton>
            </a>
          </div>
        </div>
      </section>
      <section id="integral" class="panel nav">
        <div class="integral-title title">
          <div class="title-img">积分与激励规则</div>
        </div>
        <div class="integral-border">
          <div class="integral-content">
            <div
              v-for="(item, index) in INTEGRAL_DATA"
              :key="item.HEAD"
              class="integral-item circular"
            >
              <h3>{{ item.HEAD }}</h3>
              <div v-if="index === 1">
                <p>
                  <span>{{ item.TEXT[0] }}</span>
                </p>
                <p>
                  <span>{{ item.TEXT[1] }}</span>
                  <a
                    href="/category/internship/导师实习评语.txt"
                    download
                    title="下载实习评语"
                    >{{ item.TEXT[2] }}</a
                  >
                </p>
                <p>
                  <a
                    href="/category/internship/实习报告模板.docx"
                    download
                    title="下载报告模板"
                    >{{ item.TEXT[3] }}</a
                  >
                </p>
              </div>
              <div v-else>
                <p
                  v-for="(item1, index1) in item.TEXT"
                  :key="item1"
                  class="star"
                >
                  <slot v-if="index === 1 && index1 === 3">
                    <a
                      href="/category/internship/实习报告模板.docx"
                      download
                      title="下载报告模板"
                      >{{ item1 }}</a
                    >
                  </slot>
                  <span v-else>{{ item1 }}</span>
                </p>
              </div>
              <div v-if="item.SUPPLEMENT_LINK" class="supplement">
                {{ item.SUPPLEMENT[0] }}
                <a
                  :href="item.SUPPLEMENT_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ item.SUPPLEMENT[1] }}</a
                >
                {{ item.SUPPLEMENT[2] }}
              </div>
              <div v-else class="supplement">
                {{ item.SUPPLEMENT }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="rank" class="panel">
        <div class="rank-title">
          <img
            class="web"
            src="@/assets/category/internship/rank-title.png"
            alt=""
          />
          <img
            class="mobile"
            src="@/assets/category/internship/rank-title-mo.png"
            alt=""
          />
        </div>
        <InternshipRank />
      </section>
      <section id="rule" class="panel nav">
        <div class="rule-title title">
          <div class="title-img">实习规则</div>
        </div>
        <div class="rule-border">
          <div class="rule-content">
            <div class="wrapper">
              <div
                v-for="(item, index) in RULE.RULE_DATA"
                :key="index"
                class="rule-item"
              >
                <div class="question">{{ item.QUESTION }}</div>
                <div class="answer">{{ item.ANSWER }}</div>
              </div>
              <div class="more-question orange">
                {{ RULE.MORE[0] }}
                <a
                  class="this-post"
                  href="https://gitee.com/openeuler-competition/opensource-internship/issues/I4AJIR?from=project-issue"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ RULE.MORE[1] }}</a
                >
                {{ RULE.MORE[2] }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="partner" class="panel nav">
        <div class="warper">
          <div class="partner-title title">
            <div class="title-img">合作伙伴</div>
          </div>
          <div class="img-list">
            <div
              v-for="(item, index) in PARTNER_DATA"
              :key="index"
              class="img-cover"
            >
              <img alt="" :src="item.IMG" />
            </div>
          </div>
        </div>
      </section>
      <section id="help" class="panel nav">
        <div class="help-title title">
          <div class="title-img">帮助咨询</div>
        </div>
        <div class="help-wrap">
          <section class="panel">
            <div class="wrapper help-content">
              <div class="help-left">
                <p>
                  {{ HELP.INFO[0] }}
                  <a href="mailto:intern@openeuler.sh">{{ HELP.INFO[1] }}</a>
                </p>
                <p>{{ HELP.INFO[2] }}</p>
                <p class="pc-number">{{ HELP.INFO[3] }}</p>
              </div>
              <div class="help-right">
                <img :src="HELP.ITEM.IMG" alt="" />
                <p class="mo-number">{{ HELP.INFO[3] }}</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.intership-wrap {
  width: 100%;
  margin: 0 auto;
}
.panel {
  margin-top: 64px;
  @media (max-width: 1000px) {
    margin-top: 40px;
    .text {
      font-size: 14px;
      line-height: 22px;
      color: var(--o-color-text4) !important;
    }
    .title {
      margin-bottom: 16px;
      img {
        width: auto !important;
        height: 24px;
      }
    }
  }
  .text {
    font-size: 20px;
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: 40px;
    @media (max-width: 1000px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .title {
    text-align: center;
    margin-bottom: 60px;
    @media (max-width: 1000px) {
      margin-bottom: 15px;
    }
    img {
      width: 180px;
    }
    .tab-list {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 28px;
      font-weight: 400;
      line-height: 60px;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      @media (max-width: 1000px) {
        font-size: 14px;
        line-height: 22px;
      }
      li {
        cursor: pointer;
        white-space: nowrap;
        color: var(--o-color-text1);
        position: relative;
        font-size: var(--o-font-size-h5);
        @media (max-width: 1000px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
        &:nth-of-type(1) {
          @media (max-width: 1000px) {
            margin-left: 24px;
          }
        }

        & ~ li {
          margin-left: 20px;
        }
      }
      .active {
        color: var(--o-color-brand1);
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background-color: var(--o-color-brand1);
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
  .task-wrap {
    background-image: url('@/assets/category/internship/other-community-bg.png');
    background-color: var(--o-color-bg2);
    background-repeat: no-repeat;
    background-size: 120%;
    background-position: 50%;
    margin: 0 0 25px;
    padding: 24px;
    height: 312px;
    @media (max-width: 1100px) {
      background-image: none;
      height: auto;
    }
  }
  .openlookeng-task,
  .opengauss-task {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    box-shadow: 0 6px 30px 0 rgb(0 0 0 / 10%);
    .title {
      a {
        font-size: 20px;
        line-height: 20px;
        color: var(--o-color-brand1);
        text-align: center;
        @media (max-width: 1000px) {
          font-size: 16px;
        }
      }
    }
    .intriduce {
      color: var(--o-color-text4);
      font-size: 18px;
      line-height: 22px;
      height: 88px;
      padding-top: 10px;
      @media (max-width: 1000px) {
        font-size: 14px;
      }
    }
    .btn {
      .task-btn {
        margin-right: 24px;
        border: 1px solid var(--o-color-brand1);
        color: #fff;
        background-color: var(--o-color-brand1);
        padding: 8px 12px;
        font-size: 16px;
        @media (max-width: 1000px) {
          font-size: 12px;
          padding: 3px 16px;
        }
        &:hover {
          background-color: var(--o-color-brand2);
          border: 1px solid var(--o-color-brand2);
          :deep(.o-icon) {
            transform: translateX(5px);
          }
        }
        :deep(.o-icon) {
          transition: all 0.2s;
          margin-left: 6px;
        }
      }
      .detail-btn {
        color: var(--o-color-brand1);
        padding: 8px 12px;
        border: 1px solid transparent;
        @media (max-width: 1000px) {
          font-size: 12px;
          padding: 3px 16px;
        }
        &:hover {
          border: 1px solid var(--o-color-brand2);
          color: var(--o-color-brand2);
          :deep(.o-icon) {
            transform: translateX(5px);
          }
        }
        :deep(.o-icon) {
          transition: all 0.2s;
          margin-left: 6px;
        }
      }
    }
  }
  .mindspore-task {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 6px 30px 0 rgb(0 0 0 / 10%);
    text-align: left;
    .title {
      margin-bottom: 0;
      text-align: left;
      font-size: 20px;
      @media (max-width: 1000px) {
        font-size: 16px;
      }
    }
    .intriduce {
      font-size: 14px;
      line-height: 22px;
      color: var(--o-color-text4);
    }
    .btn {
      text-align: center;
      margin-top: 5px;
      .task-btn {
        margin-right: 24px;
        border: 1px solid var(--o-color-brand1);
        color: #fff;
        background-color: var(--o-color-brand1);
        padding: 8px 12px;
        font-size: 16px;
        :deep(.o-icon) {
          margin-left: 6px;
          transition: all 0.2s;
        }
        @media (max-width: 1000px) {
          font-size: 12px;
          padding: 3px 16px;
        }
        &:hover {
          background-color: var(--o-color-brand2);
          border: 1px solid var(--o-color-brand2);
          :deep(.o-icon) {
            transform: translateX(5px);
          }
        }
      }
      .detail-btn {
        color: var(--o-color-brand1);
        border: 1px solid transparent;
        font-size: 16px;
        padding: 8px 12px;
        @media (max-width: 1000px) {
          font-size: 12px;
          padding: 3px 16px;
        }
        &:hover {
          border: 1px solid var(--o-color-brand2);
          color: var(--o-color-brand2);
          :deep(.o-icon) {
            transform: translateX(5px);
          }
        }
        :deep(.o-icon) {
          transition: all 0.2s;
          margin-left: 6px;
        }
      }
    }
  }
}
.introduce-card {
  @media (max-width: 1000px) {
    margin-top: 0;
    background-color: var(--o-color-bg2);
    padding: var(--o-font-size-h5);
  }
}
#task {
  .task-title {
    .title-img {
      width: 183px;
      height: 48px;
      margin: 0 auto;
      font-size: var(--o-font-size-h3);
      color: var(--o-color-text1);
      line-height: 48px;
      background-image: url(@/assets/category/internship/title.png);
      background-repeat: no-repeat;
      margin-bottom: 40px;
      font-weight: 300;
      @media (max-width: 1000px) {
        font-size: var(--o-font-size-h8);
        line-height: 24px;
        width: 83px;
        height: 24px;
        background-size: 100% 100%;
        margin-bottom: var(--o-spacing-h5);
      }
    }
  }
}
.title .title-img {
  min-width: 183px;
  padding: 0 16px;
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  font-size: var(--o-font-size-h3);
  color: var(--o-color-text1);
  font-weight: 300;
  line-height: 48px;
  background-image: url(@/assets/category/internship/title.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @media (max-width: 1000px) {
    padding: 0 8px;
    font-size: var(--o-font-size-h8);
    line-height: 34px;
    min-width: 83px;
    height: 24px;
    // background-size: 100% 100%;
  }
}
#integral {
  .integral-title {
    img {
      width: 270px;
      @media (max-width: 1000px) {
        width: 155px;
        height: 34px;
      }
    }
    .title-img {
      background-image: url(@/assets/category/internship/integral-title-bg.png);
      background-size: 100% 100%;
    }
  }
  .integral-border {
    border: 5px solid var(--o-color-brand1);
    border-top: 16px solid var(--o-color-brand1);
    // background-color: var(--o-color-brand1);
    .integral-content {
      padding: 32px 30px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      line-height: 24px;
      @media (max-width: 1000px) {
        padding: 6px 12px 12px;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      h3,
      h4 {
        margin: 10px 0;
        font-size: 18px;
        color: var(--o-color-text1);
        @media (max-width: 1000px) {
          margin: 6px 0;
          font-size: 16px;
          line-height: 22px;
        }
      }
      h4 {
        margin-top: 10px;
        font-size: 14px;
      }
      p {
        position: relative;
        padding-left: 12px;
        color: var(--o-color-text4);
      }
      .supplement {
        color: var(--o-color-text4);
      }
      .circular {
        p::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--o-color-brand1);
        }
      }
      .star {
        position: relative;
        img {
          position: absolute;
          left: 0;
          top: 8px;
          height: 8px;
        }
      }
      .download-color {
        cursor: pointer;
        color: #002fa7;
      }
    }
  }
  @media (max-width: 1000px) {
    .integral-border {
      border: 5px solid var(--o-color-brand1);
      border-top: 16px solid var(--o-color-brand1);
      border-radius: 8px;
      background-color: var(--o-color-brand1);
    }
    .integral-content {
      padding-bottom: 41px;
      height: 100%;
      background: none;
      border-radius: 8px;
      background-color: #eef1ff;
      h3,
      h4 {
        margin-bottom: 6px;
        font-size: 16px;
        color: #000000;
      }
      h4 {
        margin-top: 8px;
        margin-bottom: 0;
        font-size: 12px;
      }
    }
  }
}

#rank {
  padding-top: 30px;
  .rank-title {
    position: relative;
    height: 80px;
    text-align: center;
    img {
      border-radius: 8px 8px 0 0;
      width: 374px;
    }
    .mobile {
      display: none;
    }
  }
  .rank-title::before {
    position: absolute;
    content: '积分排行';
    width: 374px;
    color: #fff;
    text-align: center;
    font-size: 28px;
    line-height: 80px;
  }
  @media (max-width: 1000px) {
    .rank-title {
      height: 48px;
      img {
        width: 109px;
      }
      .web {
        display: none;
      }
      .mobile {
        display: inline-block;
      }
    }
    .rank-title::before {
      content: '';
    }
  }
}

#rule {
  .rule-title {
    img {
      width: 250px;
    }
  }
  .rule-border {
    border-radius: 8px;
    border: 5px solid var(--o-color-brand1);
    border-top: 16px solid var(--o-color-brand1);
    background-color: var(--o-color-brand1);
  }
  .rule-content {
    padding: 32px 30px;
    background: rgba(255, 255, 255, 0.9);
    .question {
      margin-bottom: 10px;
      font-size: 18px;
      color: #000000;
      line-height: 24px;
    }
    .answer {
      margin-bottom: 10px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      line-height: 24px;
    }
    .more-question {
      padding-top: 25px;
      font-size: 14px;
      color: #ff7c56;
      .this-post {
        font-size: 16px;
      }
    }
  }
  @media (max-width: 1000px) {
    .rule-title {
      img {
        width: 155px;
      }
    }

    .rule-content {
      border-radius: 8px;
      padding: 12px;
      height: 100%;
      background: none;
      background-color: #eff9ff;
      .warper {
        padding: 0;
      }
      .question {
        margin-bottom: 6px;
        font-size: 16px;
        line-height: 22px;
      }
      .answer {
        margin-bottom: 6px;
        font-size: 12px;
        line-height: 22px;
      }
      .more-question {
        padding-top: 6px;
        font-size: 12px;
        .this-post {
          font-size: 14px;
        }
      }
    }
  }
}

#partner {
  .img-list {
    display: grid;
    grid-template-columns: repeat(4, minmax(82px, 1fr));
    column-gap: 0;
    row-gap: 0;
    .img-cover {
      display: flex;
      margin: 0px -2px -2px 0px;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--o-color-division1);
      background-color: var(--o-color-bg2);
      max-height: 120px;
      overflow: hidden;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    @media (min-width: 768px) and (max-width: 1440px) {
      .img-cover {
        width: 100%;
        height: auto;
      }
    }
  }

  @media (max-width: 1000px) {
    .img-list {
      margin-bottom: 0;
      grid-template-columns: repeat(2, 1fr);
      gap: 0;
      .img-cover {
        width: auto;
        flex: 1;
        height: auto;
      }
    }
  }
}
.help-wrap {
  background: var(--o-color-bg2);
  padding: 40px 0;
  @media (max-width: 1000px) {
    padding: 24px 16px;
    .help-content {
      flex-direction: column;
      .help-left {
        padding-right: 0;
        p {
          font-size: 14px;
          line-height: 24px;
          margin-bottom: 16px;
          text-align: center;
        }
        .pc-number {
          display: none;
        }
      }
      .help-right {
        display: block;
        width: 100%;
        text-align: center;
        p {
          margin: 24px auto 0;
        }
        img {
          width: 172px;
          margin: 0 auto;
        }
        .mo-number {
          display: block;
          color: var(--o-color-text4);
          font-size: var(--o-font-size-text);
          line-height: var(--o-font-size-text);
        }
      }
    }
  }
  .panel {
    margin-top: 0;
  }
}
.help-title {
  text-align: center;
  img {
    width: 180px;
  }
  @media (max-width: 1000px) {
    img {
      width: auto;
      height: 24px;
    }
  }
}
.help-content {
  display: flex;
  justify-content: center;
  padding-top: 0 !important;
  .help-left {
    padding-right: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      font-size: 20px;
      color: var(--o-color-text1);
      display: block;
      @media (max-width: 1000px) {
        font-size: 16px;
        line-height: 32px;
      }
      a {
        font-size: 20px;
        color: var(--o-color-link1);
        @media (max-width: 1000px) {
          font-size: 16px;
          line-height: 32px;
        }
      }
    }
  }
  .help-right {
    width: 172px;
    text-align: center;
    img {
      width: 100%;
      display: block;
    }
    .mo-number {
      display: none;
    }
  }
}
</style>
