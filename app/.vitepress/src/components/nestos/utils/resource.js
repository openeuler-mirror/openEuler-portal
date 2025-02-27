import IllustrationFile from '@/assets/nestos/resource/illustration-file.png';
import CardsWork from '@/assets/nestos/cards/cards-work.png';
import CardsDownload from '@/assets/nestos/cards/cards-download.png';
import CardsLetter from '@/assets/nestos/cards/cards-letter.png';
import architecture from '@/assets/nestos/architecture.png';
import cloud from '@/assets/nestos/arch/cloud.svg';
import image from '@/assets/nestos/arch/image.svg';
import kernel from '@/assets/nestos/arch/kernel.svg';
import pitgo from '@/assets/nestos/arch/pitgo.svg';
import rubik from '@/assets/nestos/arch/rubik.svg';
import tool from '@/assets/nestos/arch/tool.svg';

// 后期资源维护处
/*
 * 镜像资源
 */
export const docList = [
  {
    dateTitle: '【24.03-LTS】',
    x86List: [
      {
        name: 'NestOS 双模式-24.03-LTS ISO下载',
        path: 'https://nestos.org.cn/nestos20240904/nestos-for-all/x86_64/NestOS-24.03-LTS.20240904.0.x86_64.iso',
      },
      {
        name: 'NestOS For Virt-24.03-LTS ISO下载',
        path: 'https://nestos.org.cn/nestos20240904/nestos-for-virt/x86_64/NestOS-For-Virt-24.03-LTS.20240904.0.x86_64.iso',
      },
      {
        name: 'NestOS For Container-24.03-LTS ISO下载',
        path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/x86_64/nestos-24.03-LTS.20240904.0-live.x86_64.iso',
      },
      {
        name: 'NestOS For Container-24.03-LTS QCOW2下载',
        path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/x86_64/nestos-24.03-LTS.20240904.0-qemu.x86_64.qcow2',
      },
      {
        name: 'NestOS For Container-24.03-LTS openStack版本下载',
        path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/x86_64/nestos-24.03-LTS.20240904.0-openstack.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS 双模式-24.03-LTS ISO下载',
        path: 'https://nestos.org.cn/nestos20240904/nestos-for-all/aarch64/NestOS-24.03-LTS.20240904.0.aarch64.iso',
      },
      {
        name: 'NestOS For Virt-24.03-LTS ISO下载',
        path: 'https://nestos.org.cn/nestos20240904/nestos-for-virt/aarch64/NestOS-For-Virt-24.03-LTS.20240904.0.aarch64.iso',
      },
      {
        name: 'NestOS For Container-24.03-LTS ISO下载',
        path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/aarch64/nestos-24.03-LTS.20240904.0-live.aarch64.iso',
      },
      {
        name: 'NestOS For Container-24.03-LTS QCOW2下载',
        path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/aarch64/nestos-24.03-LTS.20240904.0-qemu.aarch64.qcow2',
      },
      {
        name: 'NestOS For Container-24.03-LTS openStack版本下载',
        path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/aarch64/nestos-24.03-LTS.20240904.0-openstack.aarch64.qcow2',
      },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP4】',
    x86List: [
      {
        name: 'NestOS 双模式-22.03-LTS-SP4 ISO下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-all/x86_64/NestOS-22.03-LTS-SP4.20240628.0.x86_64.iso',
      },
      {
        name: 'NestOS For Virt-22.03-LTS-SP4 ISO下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-virt/x86_64/NestOS-For-Virt-22.03-LTS-SP4.20240628.0.x86_64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP4 ISO下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-live.x86_64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP4 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-qemu.x86_64.qcow2',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP4 openStack版本下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-openstack.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS 双模式-22.03-LTS-SP4 ISO下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-all/aarch64/NestOS-22.03-LTS-SP4.20240628.0.aarch64.iso',
      },
      {
        name: 'NestOS For Virt-22.03-LTS-SP4 ISO下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-virt/aarch64/NestOS-For-Virt-22.03-LTS-SP4.20240628.0.aarch64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP4 ISO下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-live.aarch64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP4 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-qemu.aarch64.qcow2',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP4 openStack版本下载',
        path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-openstack.aarch64.qcow2',
      },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP3】',
    x86List: [
      {
        name: 'NestOS 双模式-22.03-LTS-SP3 ISO下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-all/x86_64/NestOS-22.03-LTS-SP3.20240110.0.x86_64.iso',
      },
      {
        name: 'NestOS For Virt-22.03-LTS-SP3 ISO下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-virt/x86_64/NestOS-For-Virt-22.03-LTS-SP3.20240110.0.x86_64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP3 ISO下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-live.x86_64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP3 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-qemu.x86_64.qcow2',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP3 openStack版本下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-openstack.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS 双模式-22.03-LTS-SP3 ISO下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-all/aarch64/NestOS-22.03-LTS-SP3.20240110.0.aarch64.iso',
      },
      {
        name: 'NestOS For Virt-22.03-LTS-SP3 ISO下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-virt/aarch64/NestOS-For-Virt-22.03-LTS-SP3.20240110.0.aarch64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP3 ISO下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-live.aarch64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP3 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-qemu.aarch64.qcow2',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP3 openStack版本下载',
        path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-openstack.aarch64.qcow2',
      },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP2.20230928】',
    x86List: [
      {
        name: 'NestOS 双模式-22.03-LTS-SP2.20230928 ISO下载',
        path: 'https://nestos.org.cn/nestos20230928/nestos-for-all/x86_64/NestOS-22.03-LTS-SP2.20230928.0.x86_64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP2.20230928 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20230928/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP2.20230928.0-qemu.x86_64.qcow2',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP2.20230928 openStack版本下载',
        path: 'https://nestos.org.cn/nestos20230928/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP2.20230928.0-openstack.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS 双模式-22.03-LTS-SP2.20230928 ISO下载',
        path: 'https://nestos.org.cn/nestos20230928/nestos-for-all/aarch64/NestOS-22.03-LTS-SP2.20230928.0.aarch64.iso',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP2.20230928 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20230928/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP2.20230928.0-qemu.aarch64.qcow2',
      },
      {
        name: 'NestOS For Container-22.03-LTS-SP2.20230928 openStack版本下载',
        path: 'https://nestos.org.cn/nestos20230928/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP2.20230928.0-openstack.aarch64.qcow2',
      },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP2】',
    x86List: [
      {
        name: 'NestOS-22.03-LTS-SP2 ISO下载',
        path: 'https://nestos.org.cn/nestos20230630/x86_64/nestos-22.03-LTS-SP2.20230704.0-live.x86_64.iso',
      },
      {
        name: 'NestOS-22.03-LTS-SP2 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20230630/x86_64/nestos-22.03-LTS-SP2.20230704.0-qemu.x86_64.qcow2',
      },
      {
        name: 'NestOS-22.03-LTS-SP2 openStack版本下载',
        path: 'https://nestos.org.cn/nestos20230630/x86_64/nestos-22.03-LTS-SP2.20230704.0-openstack.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS-22.03-LTS-SP2 ISO下载',
        path: 'https://nestos.org.cn/nestos20230630/aarch64/nestos-22.03-LTS-SP2.20230704.0-live.aarch64.iso',
      },
      {
        name: 'NestOS-22.03-LTS-SP2 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20230630/aarch64/nestos-22.03-LTS-SP2.20230704.0-qemu.aarch64.qcow2',
      },
      {
        name: 'NestOS-22.03-LTS-SP2 openStack版本下载',
        path: 'https://nestos.org.cn/nestos20230630/aarch64/nestos-22.03-LTS-SP2.20230704.0-openstack.aarch64.qcow2',
      },
    ],
  },
  {
    dateTitle: '【23.03】',
    x86List: [
      {
        name: 'NestOS-23.03 ISO下载',
        path: 'https://nestos.org.cn/nestos20230330/x86_64/nestos-23.03.20230403.0-live.x86_64.iso',
      },
      {
        name: 'NestOS-23.03 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20230330/x86_64/nestos-23.03.20230403.0-qemu.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS-23.03 ISO下载',
        path: 'https://nestos.org.cn/nestos20230330/aarch64/nestos-23.03.20230403.0-live.aarch64.iso',
      },
      {
        name: 'NestOS-23.03 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20230330/aarch64/nestos-23.03.20230403.0-qemu.aarch64.qcow2',
      },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP1】',
    x86List: [
      {
        name: 'NestOS-22.03-LTS-SP1 ISO下载',
        path: 'https://nestos.org.cn/nestos20221230/x86_64/nestos-22.03-LTS-SP1.20221229.0-live.x86_64.iso',
      },
      {
        name: 'NestOS-22.03-LTS-SP1 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20221230/x86_64/nestos-22.03-LTS-SP1.20221229.0-qemu.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS-22.03-LTS-SP1 ISO下载',
        path: 'https://nestos.org.cn/nestos20221230/aarch64/nestos-22.03-LTS-SP1.20221229.0-live.aarch64.iso',
      },
      {
        name: 'NestOS-22.03-LTS-SP1 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20221230/aarch64/nestos-22.03-LTS-SP1.20221229.0-qemu.aarch64.qcow2',
      },
    ],
  },
  {
    dateTitle: '【22.09】',
    x86List: [
      {
        name: 'NestOS-22.09 ISO下载',
        path: 'https://nestos.org.cn/nestos20220930/x86_64/nestos-22.09.20220928.0-live.x86_64.iso',
      },
      {
        name: 'NestOS-22.09 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20220930/x86_64/nestos-22.09.20220928.0-qemu.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS-22.09 ISO下载',
        path: 'https://nestos.org.cn/nestos20220930/aarch64/nestos-22.09.20220928.0-live.aarch64.iso',
      },
      {
        name: 'NestOS-22.09 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20220930/aarch64/nestos-22.09.20220928.0-qemu.aarch64.qcow2',
      },
    ],
  },
  {
    dateTitle: '【22.03-LTS】',
    x86List: [
      {
        name: 'NestOS-22.03 ISO下载',
        path: 'https://nestos.org.cn/nestos20220330/x86_64/nestos-22.03.20220329.dev.0-live.x86_64.iso',
      },
      {
        name: 'NestOS-22.03 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20220330/x86_64/nestos-22.03.20220329.dev.0-qemu.x86_64.qcow2',
      },
    ],
    armList: [
      {
        name: 'NestOS-22.03 ISO下载',
        path: 'https://nestos.org.cn/nestos20220330/aarch64/nestos-22.03.20220329.dev.0-live.aarch64.iso',
      },
      {
        name: 'NestOS-22.03 QCOW2下载',
        path: 'https://nestos.org.cn/nestos20220330/aarch64/nestos-22.03.20220329.dev.0-qemu.aarch64.qcow2',
      },
    ],
  },
];

/*
 * 文档资源
 */
export const docFile = [
  {
    title: 'doc', // 界面文字
    path: 'https://nestos.org.cn/PublicResources/NestOS用户使用指南.md', //下载链接
    IMG: IllustrationFile, //背景图小图
  },
];

/*
 * 其他资源
 */
export const fireFile = [
  {
    title: 'other1',
    path: 'https://nestos.org.cn/nestos-ign/config.ign',
    IMG: IllustrationFile,
  },
];

/*
 * 开头卡片点击跳转nestos、issue地址
 */
export const cardsLink = [
  {
    HREF: true,
    IMG: CardsWork,
    TITLE: `card.nestosTitle`,
    LINK: 'https://gitee.com/openeuler/NestOS',
  },
  {
    HREF: false,
    IMG: CardsDownload,
    TITLE: `card.downloadTitle`,
  },
  {
    HREF: true,
    IMG: CardsLetter,
    TITLE: `card.issueTitle`,
    LINK: 'https://gitee.com/openeuler/NestOS/issues',
  },
];

/*
 * 版本介绍内容
 */
export const verLink = [
  {
    BTN: 'container',
    IMG: architecture,
    TITLE: 'conTitle',
    DESC: 'conDesc',
  },
  {
    BTN: 'virt',
    IMG: architecture,
    TITLE: 'virtTitle',
    DESC: 'virtDesc',
  },
];

/*
 * 性能测试对比地址
 */
export const comparision_url =
  'https://gitee.com/openeuler/NestOS/blob/master/docs/zh/usr_manual/%E6%80%A7%E8%83%BD%E5%AF%B9%E6%AF%94%E6%B5%8B%E8%AF%95.md';

export const features = [kernel, pitgo, cloud, rubik, image, tool];
