export const hardWareInfo = {
  zh: [
    {
      title: '简介',
      desc: [
        'openEuler为用户测试openEuler与硬件的兼容性提供了两条路径，分别是社区认证和创新中心认证。社区认证能使用户在短期内完成兼容性测试并将测试结果展示于兼容性列表上。如果您需要在兼容性测试认证完成后获取相应证书，请走 <a href="https://atomgit.com/openeuler/technical-certification/blob/master/README.md" target="_blank" rel="noopener noreferrer" class="underline-link">创新中心认证</a> / <a href="https://atomgit.com/openeuler/technical-certification/issues/9?from=project-issue" target="_blank" rel="noopener noreferrer" class="underline-link">测评联系</a>',
        '下文提供了社区兼容性认证流程，并且每个阶段提供了预计需要的时间供参考。'
      ]
    },
    {
      title: '兼容性测试流程',
      list: [
        {
          title: '成为openEuler社区开发者（0.5天）',
          desc: '通过社区进行硬件兼容性测试需要使用AtomGit平台进行流程处理，因此需要 <a href="https://atomgit.com/" target="_blank" rel="noopener noreferrer" class="underline-link">注册AtomGit平台账号</a> 。 在AtomGit平台使用相同账号申请加入openEuler社区，成为组织成员（<a href="https://atomgit.com/openeuler/infrastructure/blob/master/docs/openEuler-Infra-FAQ.md" target="_blank" rel="noopener noreferrer" class="underline-link">怎么成为openEuler组织成员</a>）。 为了后续能够在openEuler社区进行社区贡献，需要签署社区CLA（贡献者许可协议：Contributor License Agreement）。 <a href="https://clasign.osinfra.cn/sign/6946817fe1b3f3e542b4e2d9" target="_blank" rel="noopener noreferrer" class="underline-link">CLA签署页面</a>'
        },
        {
          title: '申请兼容性测试（0.5天）',
          desc: '使用您已经签署过CLA的邮箱订阅兼容性组公共邮箱，<a href="https://www.openeuler.org/zh/community/mailing-list/" target="_blank" rel="noopener noreferrer" class="underline-link">openEuler邮箱列表</a>，名称选择Oecompatibility，点击邮件地址右侧的【订阅邮件】； tips:只有订阅了此邮箱后，您向公共邮箱发送的邮件才不会被搁置； 向公共邮箱发送<a href="mailto:oecompatibility@openeuler.org?subject=申请硬件兼容性测试" target="_blank" rel="noopener noreferrer" class="underline-link">兼容性测试申请</a>，openEuler兼容性SIG（特别兴趣小组：Special Interest Group）团队成员在收到邮件后会与您进行沟通，收集兼容性认证必要的部分信息。'
        },
        {
          title: '了解兼容性策略（0.5天）',
          desc: '兼容性测试包括了服务器整机测试与板卡测试，在展开兼容性测试前，您需要了解针对不同硬件openEuler的兼容性策略，<a href="https://www.openeuler.org/category/support/compatibility/openEuler-compatibility.pdf" target="_blank" rel="noopener noreferrer" class="underline-link">点击此处获取文档</a>。'
        },
        {
          title: '创建issue（0.5天）',
          desc: '在第一步完成，成为openEuler社区开发者并完成协议签署后，您便可以在openEuler社区的<a href="https://atomgit.com/openeuler/oec-hardware" target="_blank" rel="noopener noreferrer" class="underline-link">oec-hardware项目</a>下创建issue(<a href="https://atomgit.com/openeuler/community/blob/master/zh/contributors/issue-submit.md" target="_blank" rel="noopener noreferrer" class="underline-link">issue提交指南</a>)您需要将所需要认证的硬件信息在issue中明确，以xx硬件与openEuler xx版本适配为标题，并在正文中描述清楚问题背景及诉求。openEuler团队会第一时间了解您的issue的信息，并提出建议。<a href="https://atomgit.com/openeuler/oec-hardware/issues/IACFVK?from=project-issue" target="_blank" rel="noopener noreferrer" class="underline-link">整机issue模板参考</a> / <a href="https://atomgit.com/openeuler/oec-hardware/issues/IACFTN?from=project-issue" target="_blank" rel="noopener noreferrer" class="underline-link">板卡issue模板参考</a>'
        },
        {
          title: '测试兼容性（10天）',
          desc: '完成issue创建后，您即可开展兼容性测试。openEuler团队提供了兼容性测试框架以及测试工具使用指南，您可以根据提供的资料自助完成兼容性测试。<a href="https://atomgit.com/openeuler/oec-hardware/blob/master/README.md" target="_blank" rel="noopener noreferrer" class="underline-link">oec-hardware工具说明</a>'
        },
        {
          title: '提交测试结果审核（2天）',
          desc: '完成兼容性测试并通过后，需要您将测试结果添加到对应issue的附件中，同时向公共邮箱（oecompatibility@openeuler.org ）发送兼容性结果审核申请，邮件标题需要注明“xxx硬件兼容性测试结果信息”（其中xxx为社区issue ID） 如何获取issue ID： issue链接格式如下（https://atomgit.com/openeuler/oec-hardware/issues/XXXXXX） 此处**“XXXXXX”**就是我们需要的issue ID）',
          tips: 'tips：您提交的测试结果应包含以下内容',
          columns: ['内容', '描述'],
          data: [
            {
              content: '测试日志',
              info: '使用oec-hardware工具测试完成后会自动生成测试日志tar包并保存在/usr/share/oech/logs/目录下'
            },
            {
              content: '整机/板卡 兼容性信息发布清单',
              info: '您需要按照信息模板正确填写您的硬件兼容性信息，这里是模板链接：<a href="https://atomgit.com/openeuler/oec-hardware/blob/master/templates/%E6%95%B4%E6%9C%BA%E5%85%BC%E5%AE%B9%E6%80%A7%E5%8F%91%E5%B8%83%E4%BF%A1%E6%81%AF%E6%A8%A1%E6%9D%BF.xlsx" target="_blank" rel="noopener noreferrer" class="underline-link">整机兼容性发布信息模板</a> / <a href="https://atomgit.com/openeuler/oec-hardware/blob/master/templates/%E6%9D%BF%E5%8D%A1%E5%85%BC%E5%AE%B9%E6%80%A7%E5%8F%91%E5%B8%83%E6%B8%85%E5%8D%95%E6%A8%A1%E6%9D%BF.xlsx" target="_blank" rel="noopener noreferrer" class="underline-link">板卡兼容性发布信息模板</a>'
            }
          ]
        },
        {
          title: '结果发布（2天）',
          desc: 'openEuler团队会针对提交的测试结果进行审核，如果通过，会将硬件添加到 <a href="https://www.openeuler.org/zh/compatibility/" target="_blank" rel="noopener noreferrer" class="underline-link">兼容性列表</a> 中。如未通过，则需要您与openEuler团队针对测试未通过的原因进行后续跟进。'
        }
      ]
    }
  ],
  en: [
    {
      title: 'Introduction',
      desc: [
        'openEuler provides a series of tools, documents, and operation procedures to help you test the compatibility between openEuler and hardware. If you need to perform compatibility tests on hardware such as servers, perform the following process:'
      ]
    },
    {
      title: 'Compatibility Test Process',
      list: [
        {
          title: 'Apply to join the openEuler community (0.5 days).',
          desc: 'You need to apply to join the openEuler community on the AtomGit platform to become a member of the organization. Application address: <a href="https://atomgit.com/openeuler/infrastructure/blob/master/docs/openEuler-Infra-FAQ-en.md" target="_blank" rel="noopener noreferrer" class="underline-link">https://atomgit.com/openeuler/infrastructure/blob/master/docs/openEuler-Infra-FAQ-en.md</a>'
        },
        {
          title: 'Apply for a compatibility test (0.5 days).',
          desc: 'Send a compatibility test application to the public mailbox (<a href="mailto:oecompatibility@openeuler.org" target="_blank" rel="noopener noreferrer" class="underline-link">oecompatibility@openeuler.org</a>). The email subject must contain "Apply for a Hardware Compatibility Test". After receiving the email, the SIG will contact you and sign an agreement with you. Before submit an application, sign the CLA first: <a href="https://clasign.osinfra.cn/sign/6946817fe1b3f3e542b4e2d9" target="_blank" rel="noopener noreferrer" class="underline-link">https://clasign.osinfra.cn/sign/6946817fe1b3f3e542b4e2d9</a>'
        },
        {
          title: 'Understand the compatibility policies. (0.5 days)',
          desc: 'Before performing the compatibility test, understand the openEuler hardware compatibility policies. <a href="/category/support/compatibility/openEuler-compatibility-en.pdf" target="_blank" download="openEuler Compatibility Policies.pdf" rel="noopener noreferrer" class="underline-link">Click here to obtain the document.</a>。'
        },
        {
          title: 'Create an issue (0.5 days).',
          desc: 'After signing the agreement, create an issue under the oec-hardware project (<a href="https://atomgit.com/openeuler/oec-hardware" target="_blank" rel="noopener noreferrer" class="underline-link">https://atomgit.com/openeuler/oec-hardware</a>) in the openEuler community and specify the hardware information in the issue. The SIG will give feedback on the issue in a timely manner.'
        },
        {
          title: 'Perform the compatibility test (10 days).',
          desc: 'After the issue is created, perform the compatibility test. openEuler provides the compatibility test framework and user guide to help you complete the test. <a href="https://atomgit.com/openeuler/oec-hardware/blob/master/README.en.md" target="_blank" rel="noopener noreferrer" class="underline-link">Click here to obtain the user guide.</a>'
        },
        {
          title: 'Submit the result for review (2 days).',
          desc: 'After the compatibility test is completed and passed, update the test result to the issue. Send the test result to the public mailbox as instructed by the user guide. Send the application for reviewing the compatibility result to <a href="mailto:oecompatibility@openeuler.org" target="_blank" rel="noopener noreferrer" class="underline-link">oecompatibility@openeuler.org.</a> The email subject must contain "xxx Hardware Compatibility Test Result", where xxx indicates the community issue ID.',
        },
        {
          title: 'Release the result (2 days).',
          desc: 'The SIG will review the submitted result and add the hardware to the <a href="/en/compatibility/" target="_blank" rel="noopener noreferrer" class="underline-link">Compatibility List</a> after it is approved.'
        }
      ]
    }
  ]
};
