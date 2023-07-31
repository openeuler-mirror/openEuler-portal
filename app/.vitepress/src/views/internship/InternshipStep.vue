<script lang="ts" setup>
import { ref } from 'vue';
import step_1 from '@/assets/category/internship/step_1.png';
import step_2 from '@/assets/category/internship/step_2.png';
import step_3 from '@/assets/category/internship/step_3.png';
import step_4 from '@/assets/category/internship/step_4.png';
const activeStepIndex = ref(0);
function setActiveStep(index: number) {
  activeStepIndex.value = index;
}

const STEP = {
  STEPNAV: [
    {
      IMG: step_1,
      TEXT: '申请实习',
    },
    {
      IMG: step_2,
      TEXT: '领取任务',
    },
    {
      IMG: step_3,
      TEXT: '提交成果',
    },
    {
      IMG: step_4,
      TEXT: '工资与证书发放',
    },
  ],
  STEP_ONE: {
    TITLE: '申请实习',
    TEXT1: '（1）阅读并签署活动声明。(见申请材料模板里)',
    TEXT2: '（2）完成',
    LINK1: '实习测试任务',
    TEXT3: '并提供PR链接。',
    TEXT4: '（3）填写报名资料表。',
    ATTENTION1: '在申请材料模板下载里仔细阅读实习报名流程，在线表单填写完毕后等待审核，组织方将以邮件反馈审核结果，审核通过后，签订劳务协议，用所分配的账号开始实习。',
    ATTENTION2:
      '。发送后等待审核，组织方将以邮件反馈审核结果，审核通过后，签订劳务协议，用所分配的账号开始实习。',
    DONWLOAD: '申请材料模板下载',
    TIP: '（注：组织方会根据所提交的资料对报名学生进行一定的审核筛选）',
  },
  ATTENTION: '注意',
  STEP_TOW: {
    TITLE: '领取任务',
    P_TEXT: [
      '（1）在Gitee查看任务，找到你想做的任务issue。',
      '（2）在任务issue下方评论区输入',
      '/intern-assign',
      '命令，认领该任务，然后发送邮件给任务导师请求审核。邮件需包括你的简历和该任务的开发方案。',
      '（3）导师收到邮件后对申请人进行评审，在该任务issue评论下通过输入命令反馈结果，',
      '/intern-approve',
      '代表审核通过，学生成功领取任务,可以开始进行任务处理；',
      '/intern-unapprove',
      '代表领取失败，该学生可再去领取其他任务。',
      '（4）如果领取后无法完成，可通过在issue下输入',
      '/intern-unassign',
      '放弃任务。',
      '放弃超过3次，账号被限制一个月不能领取任务。',
    ],
    ATTENTION_TEXT: [
      '每个任务只能有一个人认领，每人一次最多只能有2个认领中的任务。',
      '输入',
      '/intern-assign',
      '命令后两周内没有发简历和方案给导师的，认领自动失效，任务被释放。',
    ],
    DONWLOAD: '任务认领邮件模板下载',
  },
  STEP_ThREE: {
    TITLE: '提交成果',
    P_TEXT: [
      '（1）任务处理完成后，提交pr，在pr描述里添加 ',
      '#issue',
      ' 编号。',
      '（2）提交pr后在任务issue评论区输入',
      '/intern-completed',
      '命令，表示当前任务已提交，然后等待审核。',
      '（3）跟进导师和相关SIG maintainer审核PR，PR被合入后，导师确认任务完成即在issue下输入',
      '/intern-done',
      '命令，issue关闭，学生获得积分。',
    ],
    ATTENTION_TEXT: [
      '导师有不通过任务成果的权利，如学生提交的PR离实际所需太远，或未按时提交PR，可选择输入命令',
      '/intern-fail',
      '，不通过该任务，则无积分。',
    ],
  },
  STEP_FOUR: {
    TITLE: '工资与证书发放',
    P_TEXT1: [
      '（1）在实习合同里约定的6个月期限内，学生可凭积分获得实习工资。',
      '（2）证明申请：在实习有效期6个月内满60分即可开具实习证明，如需开具实习证明，发送邮件给实习官方邮箱',
      'intern@openeuler.sh',
      '提出申请。',
    ],
    P_TEXT: [
      '满20分可获得工资总计1000元；',
      '满40分可获得工资总计2500元；',
      '满60分可获得工资总计4000元；',
      '满80分可获得工资总计6000元；',
      '满100分可获得工资总计8000元；',
    ],
    ATTENTION_TEXT: [
      '以上工资金额为总计金额，每月月初按上月积分结算一次应发工资，在月底发放到实习生账户。应发工资为达到相应积分标准的总计工资金额减去已结算金额。',
      '总计100分为工资结算上限。超过100分不再计算工资。可选择加入',
      '“欧拉&高斯人才发展加速计划”',
      '继续在社区贡献，2022年度累计积分≥120分有机会获得“欧拉&高斯社区在线实习进步奖”，2022年度共计200个名额，奖金10000元。',
      '证明开具后视为实习结束，不再计算实习工资。',
    ],
    ATTENTION_LINK:
      'https://edu.hicomputing.huawei.com/openeuler-opengauss-talent',
    DONWLOAD: '证明申请材料和邮件模板下载',
  },
};
</script>

<template>
  <div class="step-content">
    <div class="step-nav">
      <div
        v-for="(item, index) in STEP.STEPNAV"
        :key="item.IMG"
        class="step-bar"
        :class="{ 'step-active': index === activeStepIndex }"
        @click="setActiveStep(index)"
      >
        <img :src="item.IMG" alt="" />
        <p class="tit">{{ item.TEXT }}</p>
      </div>
    </div>
    <div class="step-body">
      <div v-show="activeStepIndex === 0" class="step-text">
        <img
          class="number"
          src="@/assets/category/internship/step_1.png"
          alt=""
        />
        <h4>{{ STEP.STEP_ONE.TITLE }}</h4>
        <div class="main-text">
          <p>{{ STEP.STEP_ONE.TEXT1 }}</p>
          <p>
            {{ STEP.STEP_ONE.TEXT2 }}
            <a
              href="https://gitee.com/openeuler-competition/opensource-internship/issues/I4A68T?from=project-issue"
              target="_blank"
              rel="noopener noreferrer"
              >{{ STEP.STEP_ONE.LINK1 }}</a
            >
            {{ STEP.STEP_ONE.TEXT3 }}
          </p>
          <p>{{ STEP.STEP_ONE.TEXT4 }}</p>
          <div class="attention">
            <p>
              {{ STEP.STEP_ONE.ATTENTION1 }}
              <span class="orange">{{ STEP.STEP_ONE.TIP }}</span>
            </p>
            <a
              href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/%E5%AE%9E%E4%B9%A0%E7%94%B3%E8%AF%B7%E6%9D%90%E6%96%99%E6%A8%A1%E6%9D%BF%20.rar"
              download
              class="download download-module"
              >{{ STEP.STEP_ONE.DONWLOAD }}</a
            >
          </div>
        </div>
      </div>
      <div v-show="activeStepIndex === 1" class="step-text">
        <img
          class="number"
          src="@/assets/category/internship/step_2.png"
          alt=""
        />
        <h4>{{ STEP.STEP_TOW.TITLE }}</h4>
        <div class="main-text">
          <p>{{ STEP.STEP_TOW.P_TEXT[0] }}</p>
          <p>
            {{ STEP.STEP_TOW.P_TEXT[1] }}
            <span class="orange">{{ STEP.STEP_TOW.P_TEXT[2] }}</span>
            {{ STEP.STEP_TOW.P_TEXT[3] }}
          </p>
          <p>
            {{ STEP.STEP_TOW.P_TEXT[4] }}
            <span class="orange">{{ STEP.STEP_TOW.P_TEXT[5] }}</span>
            {{ STEP.STEP_TOW.P_TEXT[6] }}
            <span class="orange">{{ STEP.STEP_TOW.P_TEXT[7] }}</span>
            {{ STEP.STEP_TOW.P_TEXT[8] }}
          </p>
          <p>
            {{ STEP.STEP_TOW.P_TEXT[9] }}
            <span class="orange">{{ STEP.STEP_TOW.P_TEXT[10] }}</span>
            {{ STEP.STEP_TOW.P_TEXT[11] }}
            <span class="orange">{{ STEP.STEP_TOW.P_TEXT[12] }}</span>
          </p>
          <div class="attention black">
            <div class="attention-title">{{ STEP.ATTENTION }}</div>
            <p>{{ STEP.STEP_TOW.ATTENTION_TEXT[0] }}</p>
            <p>
              {{ STEP.STEP_TOW.ATTENTION_TEXT[1] }}
              <span class="orange">{{ STEP.STEP_TOW.ATTENTION_TEXT[2] }}</span>
              {{ STEP.STEP_TOW.ATTENTION_TEXT[3] }}
            </p>
            <a
              href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/02%20%E4%BB%BB%E5%8A%A1%E8%AE%A4%E9%A2%86%E9%82%AE%E4%BB%B6%E6%A8%A1%E6%9D%BF.rar"
              download
              class="download"
              >{{ STEP.STEP_TOW.DONWLOAD }}</a
            >
          </div>
        </div>
      </div>
      <div v-show="activeStepIndex === 2" class="step-text">
        <img
          class="number"
          src="@/assets/category/internship/step_3.png"
          alt=""
        />
        <h4>{{ STEP.STEP_ThREE.TITLE }}</h4>
        <div class="main-text">
          <p>
            {{ STEP.STEP_ThREE.P_TEXT[0] }}
            <span class="orange">{{ STEP.STEP_ThREE.P_TEXT[1] }}</span>
            {{ STEP.STEP_ThREE.P_TEXT[2] }}
          </p>
          <p>
            {{ STEP.STEP_ThREE.P_TEXT[3] }}
            <span class="orange">{{ STEP.STEP_ThREE.P_TEXT[4] }}</span>
            {{ STEP.STEP_ThREE.P_TEXT[5] }}
          </p>
          <p>
            {{ STEP.STEP_ThREE.P_TEXT[6] }}
            <span class="orange">{{ STEP.STEP_ThREE.P_TEXT[7] }}</span>
            {{ STEP.STEP_ThREE.P_TEXT[8] }}
          </p>
          <div class="attention black">
            <div class="attention-title">{{ STEP.ATTENTION }}</div>
            <p>
              {{ STEP.STEP_ThREE.ATTENTION_TEXT[0] }}
              <span class="orange">
                {{ STEP.STEP_ThREE.ATTENTION_TEXT[1] }}
              </span>
              {{ STEP.STEP_ThREE.ATTENTION_TEXT[2] }}
            </p>
          </div>
          <div class="flow-chart">
            <img
              class="chart-pc"
              src="@/assets/category/internship/step-3.png"
              alt=""
            />
            <img
              class="chart-mo"
              src="@/assets/category/internship/step-3-mo.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-show="activeStepIndex === 3" class="step-text">
        <img
          class="number"
          src="@/assets/category/internship/step_4.png"
          alt=""
        />
        <div class="main-text">
          <h4>{{ STEP.STEP_FOUR.TITLE }}</h4>
          <p>{{ STEP.STEP_FOUR.P_TEXT1[0] }}</p>
          <div class="attention first-attention">
            <p v-for="item in STEP.STEP_FOUR.P_TEXT" :key="item">{{ item }}</p>
          </div>
          <p>
            {{ STEP.STEP_FOUR.P_TEXT1[1] }}
            <a class="blue" href="mailto:intern@openeuler.sh">
              {{ STEP.STEP_FOUR.P_TEXT1[2] }}
            </a>
            {{ STEP.STEP_FOUR.P_TEXT1[3] }}
          </p>
          <div class="attention black">
            <div class="attention-title">{{ STEP.ATTENTION }}</div>
            <p>
              {{ STEP.STEP_FOUR.ATTENTION_TEXT[0] }}
            </p>
            <p>
              {{ STEP.STEP_FOUR.ATTENTION_TEXT[1] }}
              <a
                :href="STEP.STEP_FOUR.ATTENTION_LINK"
                target="_blank"
                rel="noopener noreferrer"
                >{{ STEP.STEP_FOUR.ATTENTION_TEXT[2] }}</a
              >
              {{ STEP.STEP_FOUR.ATTENTION_TEXT[3] }}
            </p>
            <p>{{ STEP.STEP_FOUR.ATTENTION_TEXT[4] }}</p>
            <a
              href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/03%20%E8%AF%81%E4%B9%A6%E7%94%B3%E8%AF%B7%E6%9D%90%E6%96%99%E5%92%8C%E9%82%AE%E4%BB%B6%E6%A8%A1%E6%9D%BF.rar"
              download
              class="download"
              >{{ STEP.STEP_FOUR.DONWLOAD }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#step {
  .step-title {
    text-align: center;
    padding: 60px 0 70px 0;
    @media (max-width: 1000px) {
      padding: 30px 0;
    }
  }
  .step-content {
    border-radius: 8px 8px 8px 8px;
    background-color: rgb(93, 200, 255);
    @media (max-width: 1000px) {
      background: none;
    }
    .step-nav {
      display: flex;
      @media (max-width: 1000px) {
        display: none;
      }
      .step-bar {
        cursor: pointer;
        width: 354px;
        height: 160px;
        background-size: 100% 100% !important;
        text-align: center;
        padding-top: 16px;
        img {
          display: inline-block;
          width: 90px;
          height: 80px;
        }
        .tit {
          font-size: 30px;
          font-weight: normal;
          color: #ffffff;
          line-height: 32px;
          margin-top: 16px;
        }
        @media (max-width: 1400px) {
          width: 100%;
          .tit {
            font-size: 24px;
          }
        }
      }
      .step-active {
        height: 180px;
        margin-top: -20px;
        padding-top: 26px;
        background: url(@/assets/category/internship/step-active.png) no-repeat;
        .tit {
          font-size: 30px;
          @media (max-width: 1400px) {
            font-size: 26px;
          }
        }
      }
    }
    .step-body {
      margin-top: -1px;
      padding: 32px 30px 37px;
      height: 410px;
      background: url(@/assets/category/internship/step-background.png)
        no-repeat;
      background-size: 100% 100%;
      @media (max-width: 1000px) {
        background: none;
        height: 100%;
        font-size: 12px;
        padding: 0;
        .step-text:nth-child(2) {
          .download {
            padding-bottom: 44px;
          }
        }
        .step-text:nth-child(4) {
          margin-bottom: 0;
        }
        .step-text {
          display: block !important;
          position: relative;
          margin-bottom: 20px;
          padding: 50px 5px 5px;
          background-color: #2e9afe;
          .main-text {
            padding: 10px;
            background-color: #eaf5fe;
            .download {
              margin-top: 6px;
              font-size: 12px;
              padding-left: 12px;
            }
            .download-module {
              padding-left: 0;
            }
          }
          .number {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            width: 60px;
          }
          h4 {
            position: absolute;
            top: 15px;
            left: 60px;
            font-size: 16px;
            color: #fff;
          }
          p {
            line-height: 22px;
          }
          .attention {
            margin: 6px 0 0 30px;
          }
          .black {
            margin-left: 0;
            p::before {
              content: '';
              display: block;
              position: absolute;
              top: 10px;
              left: 0;
              height: 4px;
              width: 4px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 50%;
            }
          }
        }
        .flow-chart {
          padding: 0;
          text-align: center;
          .chart-pc {
            display: none;
          }
          .chart-mo {
            display: inline-block;
            width: 268px;
          }
        }
      }
      .number {
        display: none;
      }
      .suspend {
        padding: 10px 0 0 10px;
      }

      h4 {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: normal;
        color: #000000;
        line-height: 24px;
      }
      p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
        @media (max-width: 1000px) {
          font-size: 12px;
          a {
            font-size: 12px;
          }
        }
      }
      .blue {
        color: #0d8dff;
      }
      .orange {
        color: #ff7f0d;
      }
      .attention {
        margin: 10px 14px 0 35px;
        .attention-title {
          font-size: 14px;
          color: #000000;
          line-height: 24px;
        }
        .download {
          display: inline-block;
          margin-top: 10px;
        }
      }
      .first-attention {
        margin-top: 0;
      }
      .black {
        p {
          position: relative;
          padding-left: 12px;
        }
        p::before {
          position: absolute;
          top: 10px;
          left: 0;
          content: '';
          height: 4px;
          width: 4px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
        }
      }
      .flow-chart {
        margin-top: 8px;
        padding-left: 35px;
        .chart-mo {
          display: none;
        }
        img {
          width: 960px;
        }
      }
    }
    .step-body-en {
      height: 485px;
    }
  }
}
</style>
