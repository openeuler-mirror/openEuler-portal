<script lang="ts" setup>
import { OIcon } from '@opensig/opendesign';

import iconOrgSig from '~icons/sig/org-sig.svg';

</script>
<template>
  <div class="sig-meeting-org">
    <div class="sig-meeting-content">
      <div class="content-title">
        <OIcon>
          <iconOrgSig />
        </OIcon>
        需求收集
      </div>
      <div class="sig-meeting-org-card">
        各 SIG 应择时启动针对后续版本的需求收集，各 SIG 组 Maintainer 在
        openEuler Etherpad 平台
        <a
          href="https://etherpad.openeuler.org/"
          target="_blank"
          rel="noopener noreferrer"
          >https://etherpad.openeuler.org/</a
        >
        创建相应的会议收集目录(建议命名方式为: sig 名-版本名(例如
        22.09)-Planning)用于收集该版本规划工作会议的需求收集及计划，并将该会议目录反馈至
        openEuler 开源社区 SIG 版本规划会议组织者。(参考模板：
        <a
          href="https://etherpad.openeuler.org/p/planning-template"
          target="_blank"
          rel="noopener noreferrer"
          >https://etherpad.openeuler.org/p/planning-template</a
        >
        )
        <ol>
          <li>
            任何人均可以在 SIG 版本工作会议中提出需求，通过在各 SIG
            版本工作会议指定的 Etherpad 共享文件中的 Topics
            环节根据要求进行填写，通常需要包含以下内容：
            <span>需求发起人</span>
            <span>需求的具体描述</span>
            <span>Issue 反馈的在线地址</span>
            <span>已有的技术方案或 PR</span>
            <span>已有的讨论纪要</span>
          </li>
          <li>
            需求收集完成后由 SIG 组 Maintainers
            按照所有收集到的需求的具体情况(类型、技术难度、工作量等)，根据会议时间安排指定会议议程，会议安排在工作会议召开前
            3 天在 Etherpad 共享文件及社区邮件列表 Maillist
            中公开发布，方便与会者了解会议议程
          </li>
        </ol>
      </div>
    </div>
    <div class="sig-meeting-content">
      <div class="content-title">
        <OIcon>
          <iconOrgSig />
        </OIcon>
        召开会议
      </div>
      <div class="sig-meeting-org-card">
        会议由各 SIG
        组版本规划负责人主持召开，按照预先制定的会议议程进行会议，会议过程中需要注意时间控制，确保所有已经在会议议程中的需求都能得到相应的讨论时间。各与会者需要在
        Etherpad 的 Attendees 环节根据要求填写自己的名字和
        Gitee_ID，若未到场且未指定代参加人员则该需求视为自动放弃。
        <ol>
          <li>
            各议题讨论可以分为下面几个阶段：
            <p>
              <span>1.需求陈述：</span
              >由需求发起人对需求进行陈述，包括需求目标、需求来源、提议的技术方案及既往的讨论及结果等，需求陈述阶段其余听众不允许打断。
            </p>
            <p>
              <span>2.讨论：</span
              >由各参会者针对该需求进行相应的讨论，所有与会者均可参与讨论，主持人负责记录各方观点及重点意见。
            </p>
            <p>
              <span>3.总结：</span
              >在达成共识后，由主持人根据共识输出该议题的结论。若现场没有达成共识，则应商议再次讨论的具体时间。
            </p>
          </li>
          <li>
            所有议题讨论完成后，由 SIG Maintainer 团队根 据各议题讨论情况及 SIG
            组实际情况对各需求进行优先级排序及分工，“任务分工”靠贡献者“认领任务”的方式完成。
          </li>
        </ol>
      </div>
    </div>
    <div class="sig-meeting-content">
      <div class="content-title">
        <OIcon>
          <iconOrgSig />
        </OIcon>
        会议纪要
      </div>
      <div class="sig-meeting-org-card">
        各 SIG 组版本规划负责人在工作会议结束后一周内整理完成会议纪要，并在
        Etherpad 及 SIG 组、dev, tc, release sig 邮件列表 Maillist
        上公开发布该会议纪要，以便开发者、用户了解未来版本各 SIG
        的工作计划，会议纪要需要包含以下内容：
        <ol class="no-line">
          <li>
            <span>所有参与讨论的议题及该议题的结论</span>
          </li>
          <li>
            <span>下一版本各工作的负责人</span>
          </li>
          <li>
            <span
              >下一版本的工作优先级 会议纪要内容参考链接：
              <a
                href="https://mailweb.openeuler.org/hyperkitty/list/openstack@openeuler.org/thread/NR3O2ZUUNE46XFBTV4CND4HEYDCBPW33/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://mailweb.openeuler.org/hyperkitty/list/openstack@openeuler.org/thread/NR3O2ZUUNE46XFBTV4CND4HEYDCBPW33/
              </a>
            </span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-meeting-org {
  position: relative;
  overflow: hidden;

  .sig-meeting-content {
    position: relative;
    padding-left: 76px;
    @include respond-to('<=pad_v') {
      padding: 16px;
      border-radius: var(--o-radius-xs);
      background-color: var(--o-color-fill2);
    }

    &:not(:first-child) {
      margin-top: 26px;
      @include respond-to('<=pad_v') {
        margin-top: 12px;
      }
    }

    &:not(:last-child) {
      .sig-meeting-org-card {
        &::after {
          opacity: 0.6;
          background-image: radial-gradient(
            circle at 50% 1e2%,
            #77a1f1 0%,
            #a4c5ff 117%
          );
          bottom: 1px;
          content: '';
          left: -55px;
          position: absolute;
          top: 0;
          width: 6px;
          height: 100%;
          border-radius: var(--o-radius-xs);
        }
      }
    }

    .content-title {
      display: flex;
      align-items: center;
      @include h1;

      .o-icon {
        position: absolute;
        left: 0;
        top: 0;
        font-size: var(--o-icon_size-2xl);
        @include respond-to('<=pad_v') {
          position: relative;
          margin-right: 8px;
        }
      }
    }

    .sig-meeting-org-card {
      position: relative;
      margin-top: 18px;
      padding: 24px;
      border-radius: var(--o-radius-xs);
      background-color: var(--o-color-fill2);
      color: var(--o-color-info2);
      @include text1;
      @include respond-to('<=pad_v') {
        margin-top: 12px;
        padding: 0;
      }

      ol > li::before {
        background-color: var(--o-color-info1);
        border-radius: 50%;
        content: '';
        display: inline-flex;
        height: 6px;
        justify-content: center;
        left: 0;
        position: absolute;
        top: 8px;
        width: 6px;
        z-index: 1;
      }

      ol > li:not(:last-child)::after {
        background-color: rgba($color: #000000, $alpha: 0.25);
        bottom: 1px;
        content: '';
        left: 3px;
        position: absolute;
        top: 20px;
        width: 1px;
        height: calc(100% - 8px);
      }

      .no-line > li::after {
        background-color: transparent !important;
      }

      ol {
        padding-left: 0;
        list-style: none !important;
        counter-reset: num;

        & > li {
          counter-increment: num;
          padding-left: 22px;
          position: relative;
          margin-top: 8px;

          &:first-child {
            margin-top: 16px;
          }

          span {
            display: block;
            flex-wrap: wrap;
            margin-top: 8px;
            color: var(--o-color-info1);
            font-weight: 500;
            word-break: break-all;

            a {
              word-break: break-all;
            }
          }
        }
      }

      .no-line {
        & > li {
          &:first-child {
            margin-top: 12px;
          }
        }
      }
    }
  }
}
</style>
