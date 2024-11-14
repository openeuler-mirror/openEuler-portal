<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vitepress';
import { useCommon } from '@/stores/common';
import AOS from 'aos';

import AppContext from '@/components/AppContent.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import LinkPanel from '@/components/LinkPanel.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitLive from './components/SummitLive.vue';
import SummitGuests from './components/SummitGuests.vue';

import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';
import atom from '@/assets/category/summit/summit2022/logo/atom.png';
import atomDark from '@/assets/category/summit/summit2022/logo/atom-dark.png';
import csia from '@/assets/category/summit/summit2022/logo/csia.png';
import csiaDark from '@/assets/category/summit/summit2022/logo/csia-dark.png';
import euler from '@/assets/category/summit/summit2022/logo/euler.png';
import eulerDark from '@/assets/category/summit/summit2022/logo/euler-dark.png';
import fusion from '@/assets/category/summit/summit2022/logo/fusion.png';
import fusionDark from '@/assets/category/summit/summit2022/logo/fusion-dark.png';
import huawei from '@/assets/category/summit/summit2022/logo/huawei.png';
import huaweiDark from '@/assets/category/summit/summit2022/logo/huawei-dark.png';
import iscas from '@/assets/category/summit/summit2022/logo/iscas.png';
import iscasDark from '@/assets/category/summit/summit2022/logo/iscas-dark.png';
import kylinsec from '@/assets/category/summit/summit2022/logo/kylinsec.png';
import kylinsecDark from '@/assets/category/summit/summit2022/logo/kylinsec-dark.png';
import qilin from '@/assets/category/summit/summit2022/logo/qilin.png';
import qilinDark from '@/assets/category/summit/summit2022/logo/qilin-dark.png';
import runhe from '@/assets/category/summit/summit2022/logo/runhe.png';
import runheDark from '@/assets/category/summit/summit2022/logo/runhe-dark.png';
import stone from '@/assets/category/summit/summit2022/logo/stone.png';
import stoneDark from '@/assets/category/summit/summit2022/logo/stone-dark.png';
import tongxin from '@/assets/category/summit/summit2022/logo/tongxin.png';
import tongxinDark from '@/assets/category/summit/summit2022/logo/tongxin-dark.png';
import zhongguan from '@/assets/category/summit/summit2022/logo/zhongguan.png';
import zhongguanDark from '@/assets/category/summit/summit2022/logo/zhongguan-dark.png';
import intel from '@/assets/category/summit/summit2022/logo/intel.png';
import intelDark from '@/assets/category/summit/summit2022/logo/intel-dark.png';
import celebratingEntryImg from '@/assets/category/summit/summit2022/celebrating-entry.png';

import bes from '@/assets/category/summit/summit2022/logo/bes.png';
import besDark from '@/assets/category/summit/summit2022/logo/bes-dark.png';
import ccf from '@/assets/category/summit/summit2022/logo/ccf.png';
import ccfDark from '@/assets/category/summit/summit2022/logo/ccf-dark.png';
import intewell from '@/assets/category/summit/summit2022/logo/intewell.png';
import intewellDark from '@/assets/category/summit/summit2022/logo/intewell-dark.png';
import lvse from '@/assets/category/summit/summit2022/logo/lvse.png';
import lvseDark from '@/assets/category/summit/summit2022/logo/lvse-dark.png';
import phytium from '@/assets/category/summit/summit2022/logo/phytium.png';
import phytiumDark from '@/assets/category/summit/summit2022/logo/phytium-dark.png';
import shopen from '@/assets/category/summit/summit2022/logo/shopen.png';
import shopenDark from '@/assets/category/summit/summit2022/logo/shopen-dark.png';
import tongtech from '@/assets/category/summit/summit2022/logo/tongtech.png';
import tongtechDark from '@/assets/category/summit/summit2022/logo/tongtech-dark.png';
import ysemi from '@/assets/category/summit/summit2022/logo/ysemi.png';
import ysemiDark from '@/assets/category/summit/summit2022/logo/ysemi-dark.png';
import ccb from '@/assets/category/summit/summit2022/logo/ccb.png';
import ccbDark from '@/assets/category/summit/summit2022/logo/ccb-dark.png';
import turbolinux from '@/assets/category/summit/summit2022/logo/turbolinux.png';
import turbolinuxDark from '@/assets/category/summit/summit2022/logo/turbolinux-dark.png';

import caopeiqing from '@/assets/category/summit/summit2022/guests/caopeiqing.png';
import chenyahan from '@/assets/category/summit/summit2022/guests/chenyahan.png';
import chenzhengsheng from '@/assets/category/summit/summit2022/guests/chenzhengsheng.png';
import danxiaoqiang from '@/assets/category/summit/summit2022/guests/danxiaoqiang.png';
import guohao from '@/assets/category/summit/summit2022/guests/guohao.png';
import huyadi from '@/assets/category/summit/summit2022/guests/huyadi.png';
import liaowei from '@/assets/category/summit/summit2022/guests/liaowei.png';
import liukuo from '@/assets/category/summit/summit2022/guests/liukuo.png';
import liweiwei from '@/assets/category/summit/summit2022/guests/liweiwei.png';
import luyan from '@/assets/category/summit/summit2022/guests/luyan.png';
import maoxianglin from '@/assets/category/summit/summit2022/guests/maoxianglin.png';
import qihao from '@/assets/category/summit/summit2022/guests/qihao.png';
import sunshouxin from '@/assets/category/summit/summit2022/guests/sunshouxin.png';
import qinyungao from '@/assets/category/summit/summit2022/guests/qinyungao.png';
import tanggeliang from '@/assets/category/summit/summit2022/guests/tanggeliang.png';
import tangzhongrui from '@/assets/category/summit/summit2022/guests/tangzhongrui.png';
import tianlijun from '@/assets/category/summit/summit2022/guests/tianlijun.png';
import wangkefeng from '@/assets/category/summit/summit2022/guests/wangkefeng.png';
import xiehaocheng from '@/assets/category/summit/summit2022/guests/xiehaocheng.png';
import xuxiaozhou from '@/assets/category/summit/summit2022/guests/xuxiaozhou.png';
import zengzhaorong from '@/assets/category/summit/summit2022/guests/zengzhaorong.png';
import zhangheng from '@/assets/category/summit/summit2022/guests/zhangheng.png';
import zhangxuzhou from '@/assets/category/summit/summit2022/guests/zhangxuzhou.png';
import zhangzhibo from '@/assets/category/summit/summit2022/guests/zhangzhibo.png';
import zhaolei from '@/assets/category/summit/summit2022/guests/zhaolei.png';
import shiaichun from '@/assets/category/summit/summit2022/guests/shiaichun.png';
import zhoutongqing from '@/assets/category/summit/summit2022/guests/zhoutongqing.png';
import zhukeqian from '@/assets/category/summit/summit2022/guests/zhukeqian.png';

import anchuanxu from '@/assets/category/summit/summit2022/guests/anchuanxu.png';
import dufan from '@/assets/category/summit/summit2022/guests/dufan.png';
import dukaitian from '@/assets/category/summit/summit2022/guests/dukaitian.png';
import guozhanxin from '@/assets/category/summit/summit2022/guests/guozhanxin.png';
import lichaoran from '@/assets/category/summit/summit2022/guests/lichaoran.png';
import liuheling from '@/assets/category/summit/summit2022/guests/liuheling.png';
import lixing from '@/assets/category/summit/summit2022/guests/lixing.png';
import niujianwei from '@/assets/category/summit/summit2022/guests/niujianwei.png';
import sunhailong from '@/assets/category/summit/summit2022/guests/sunhailong.png';
import tianjun from '@/assets/category/summit/summit2022/guests/tianjun.png';
import wangyujie from '@/assets/category/summit/summit2022/guests/wangyujie.png';
import weigang from '@/assets/category/summit/summit2022/guests/weigang.png';
import wumingchuan from '@/assets/category/summit/summit2022/guests/wumingchuan.png';
import wuzhangjin from '@/assets/category/summit/summit2022/guests/wuzhangjin.png';
import xuyuanchong from '@/assets/category/summit/summit2022/guests/xuyuanchong.png';
import yangzhao from '@/assets/category/summit/summit2022/guests/yangzhao.png';
import yuanlinsi from '@/assets/category/summit/summit2022/guests/yuanlinsi.png';
import zhanghailiang from '@/assets/category/summit/summit2022/guests/zhanghailiang.png';
import zhangxianyi from '@/assets/category/summit/summit2022/guests/zhangxianyi.png';
import zhaolichao from '@/assets/category/summit/summit2022/guests/zhaolichao.png';
import zhoulei from '@/assets/category/summit/summit2022/guests/zhoulei.png';
import zhengzhipeng from '@/assets/category/summit/summit2022/guests/zhengzhipeng.png';
import zhangxiang from '@/assets/category/summit/summit2022/guests/zhangxiang.png';
import fengguanlin from '@/assets/category/summit/summit2022/guests/fengguanlin.png';
import hannaiping from '@/assets/category/summit/summit2022/guests/hannaiping.png';
import jiangdayong from '@/assets/category/summit/summit2022/guests/jiangdayong.png';
import jiangzhenhua from '@/assets/category/summit/summit2022/guests/jiangzhenhua.png';
import liushuyuan from '@/assets/category/summit/summit2022/guests/liushuyuan.png';
import lizhenglin from '@/assets/category/summit/summit2022/guests/lizhenglin.png';
import qiuchengfeng from '@/assets/category/summit/summit2022/guests/qiuchengfeng.png';
import sunwenlong from '@/assets/category/summit/summit2022/guests/sunwenlong.png';
import wanglin from '@/assets/category/summit/summit2022/guests/wanglin.png';
import wufengguang from '@/assets/category/summit/summit2022/guests/wufengguang.png';
import xiongwei from '@/assets/category/summit/summit2022/guests/xiongwei.png';
import yangxiaocheng from '@/assets/category/summit/summit2022/guests/yangxiaocheng.png';
import zhangshuai from '@/assets/category/summit/summit2022/guests/zhangshuai.png';
import zhouyi from '@/assets/category/summit/summit2022/guests/zhouyi.png';

import baoyungang from '@/assets/category/summit/summit2022/guests/baoyungang.png';
import christophersimmons from '@/assets/category/summit/summit2022/guests/christophersimmons.png';
import fengguanlin01 from '@/assets/category/summit/summit2022/guests/fengguanlin01.png';
import gaotongqing from '@/assets/category/summit/summit2022/guests/gaotongqing.png';
import jiangdayong01 from '@/assets/category/summit/summit2022/guests/jiangdayong01.png';
import jimzemlin from '@/assets/category/summit/summit2022/guests/jimzemlin.png';
import jonathanbryce from '@/assets/category/summit/summit2022/guests/jonathanbryce.png';
import liangbaojun from '@/assets/category/summit/summit2022/guests/liangbaojun.png';
import liaoxiangke from '@/assets/category/summit/summit2022/guests/liaoxiangke.png';
import lijun from '@/assets/category/summit/summit2022/guests/lijun.png';
import liujingjuan from '@/assets/category/summit/summit2022/guests/liujingjuan.png';
import meihong from '@/assets/category/summit/summit2022/guests/meihong.png';
import mengjianyi from '@/assets/category/summit/summit2022/guests/mengjianyi.png';
import niguangnan from '@/assets/category/summit/summit2022/guests/niguangnan.png';
import panyan from '@/assets/category/summit/summit2022/guests/panyan.png';
import pengjianying from '@/assets/category/summit/summit2022/guests/pengjianying.png';
import priyankasharma from '@/assets/category/summit/summit2022/guests/priyankasharma.png';
import qiuchengfeng01 from '@/assets/category/summit/summit2022/guests/qiuchengfeng01.png';
import sunwenlong01 from '@/assets/category/summit/summit2022/guests/sunwenlong01.png';
import wanghuaimin from '@/assets/category/summit/summit2022/guests/wanghuaimin.png';
import wangtao from '@/assets/category/summit/summit2022/guests/wangtao.png';
import wuyanjun from '@/assets/category/summit/summit2022/guests/wuyanjun.png';
import xiongwei01 from '@/assets/category/summit/summit2022/guests/xiongwei01.png';
import xutao from '@/assets/category/summit/summit2022/guests/xutao.png';
import zhangxianyi01 from '@/assets/category/summit/summit2022/guests/zhangxianyi01.png';
import zhanglei from '@/assets/category/summit/summit2022/guests/zhanglei.png';
import caizhimin from '@/assets/category/summit/summit2022/guests/caizhimin.png';
import gaopei from '@/assets/category/summit/summit2022/guests/gaopei.png';
import lipeiyuan from '@/assets/category/summit/summit2022/guests/lipeiyuan.png';
import zhangshenju from '@/assets/category/summit/summit2022/guests/zhangshenju.png';
import zhongxin from '@/assets/category/summit/summit2022/guests/zhongxin.png';
import liuwenqing from '@/assets/category/summit/summit2022/guests/liuwenqing.png';

import exhibitionImg from '@/assets/category/summit/summit2022/exhibition.png';

import IconTime from '~icons/app/icon-time.svg';

const commonStore = useCommon();
const router = useRouter();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
const summitData: any = {
  detail: [
    '数字经济成为全球经济增长的主引擎，数字经济的快速发展，带来数字化、智能化的巨大发展机遇。操作系统作为数字基础设施的底座，已经成为推动产业数字化、智能化发展的核心力量。操作系统产业峰会2022旨在聚集全产业链力量，聚焦基础软件核心能力构建，引领基础软件持续创新，加快实现高水平科技自立自强。',
    'openEuler Summit 是由欧拉开源社区发起并举办的年度开源操作系统峰会。openEuler专注核心技术和全场景能力创新，构建多样性计算支持最佳的基础软件能力。充分释放开源协作的创新活力，通过开源开放，不断探索科技创新的边界，驱动物理世界与数字世界的深度融合。openEuler与社区伙伴持续构建自循环、自发展的上下游产业链。通过商业验证，提升市场占有率，成为数字基础设施的坚实底座。社区贡献者、行业用户、合作伙伴在 openEuler Summit 汇聚，驱动无止境的创新与拓展，闪耀数字时代星辰大海。',
  ],
  live: {
    title: '精彩回顾',
    date: ['12月28日', '12月29日'],
    liveData1: [
      {
        liveId: 12257,
        liveTestId: 12260,
        id: 0,
        name: '操作系统产业峰会2022',
      },
      {
        liveId: 12263,
        liveTestId: 12271,
        id: 1,
        name: '麒麟软件',
      },
      {
        liveId: 12264,
        liveTestId: 12272,
        id: 2,
        name: '麒麟信安',
      },
      {
        liveId: 12286,
        liveTestId: 12279,
        id: 3,
        name: '统信软件',
      },
      {
        liveId: 12287,
        liveTestId: 12280,
        id: 4,
        name: '软通动力',
      },
      {
        liveId: 12265,
        liveTestId: 12273,
        id: 5,
        name: '中科创达',
      },
    ],
    liveData2: [
      {
        liveId: 12258,
        liveTestId: 12261,
        id: 0,
        name: 'openEuler Summit 2022',
      },
      {
        liveId: 12266,
        liveTestId: 12274,
        id: 1,
        name: 'Linux 内核',
      },
      {
        liveId: 12288,
        liveTestId: 12281,
        id: 2,
        name: '多样性计算&编译器',
      },
      {
        liveId: 12267,
        liveTestId: 12275,
        id: 3,
        name: '虚拟化&云原生',
      },
      {
        liveId: 12289,
        liveTestId: 12282,
        id: 4,
        name: '嵌入式&ROS',
      },
      {
        liveId: 12291,
        liveTestId: 12284,
        id: 5,
        name: 'RISC-V',
      },
      {
        liveId: 12290,
        liveTestId: 12283,
        id: 6,
        name: '迁移&运维',
      },
      {
        liveId: 12268,
        liveTestId: 12276,
        id: 7,
        name: '用户&开发者体验',
      },
    ],
  },
  agenda: {
    title: '会议日程',
    meetingList: [
      {
        daytime: '12月28日 操作系统产业峰会 2022',
        list: [
          {
            type: '上午：主论坛',
            id: 'main',
            children: [
              {
                time: '9:30 - 9:35',
                desc: '工信部领导致辞',
                name: ['王江平'],
                post: ['工业和信息化部党组成员、副部长'],
              },
              {
                time: '9:35 - 9:40',
                desc: '华为领导致辞',
                name: ['汪涛'],
                post: ['华为常务董事、ICT基础设施业务管理委员会主任'],
              },
              {
                time: '9:40 - 9:45',
                desc: '基金会领导致辞',
                name: ['孙文龙'],
                post: ['开放原子开源基金会理事长'],
              },
              {
                time: '9:45 - 9:50',
                desc: '2022年度openEuler领先商业实践颁奖',
                name: ['潘妍'],
                post: ['国家工业信息安全发展研究中心软件所所长'],
              },
              {
                time: '9:50 - 10:00',
                desc: '引领多样性计算的未来',
                name: ['倪光南'],
                post: ['中国工程院院士、openEuler开源社区顾问专家委员会委员'],
              },
              {
                time: '10:00 - 10:10',
                desc: '操作系统发展之未来',
                name: ['梅宏'],
                post: ['中国科学院院士'],
              },
              {
                time: '10:10 - 10:20',
                desc: '强根铸魂，加速中国操作系统发展',
                name: ['廖湘科'],
                post: ['中国工程院院士'],
              },
              {
                time: '10:20 - 10:30',
                desc: '中国开源的崛起',
                name: ['王怀民'],
                post: ['中国科学院院士'],
              },
              {
                time: '10:30 - 10:40',
                desc: '立根铸魂 崛起数智时代',
                name: ['江大勇'],
                post: ['openEuler社区理事长'],
              },
              {
                time: '10:40 - 10:50',
                desc: '天元操作系统，共筑移动云新一代算网基座',
                name: ['高同庆'],
                post: ['中国移动通信集团有限公司副总经理'],
              },
              {
                time: '10:50 - 11:00',
                desc: '引领云计算科技创新 共筑天翼云数字底座',
                name: ['李峻'],
                post: ['中国电信集团有限公司副总经理'],
              },
              {
                time: '11:00 - 11:10',
                desc: '共筑算力发展新生态 共建数字经济强引擎',
                name: ['梁宝俊'],
                post: ['中国联合网络通信集团有限公司副总经理'],
              },
              {
                time: '11:10 - 11:15',
                desc: 'openEuler&openGauss人才发展加速计划2022年度颁奖',
                name: [''],
                post: [''],
              },
            ],
          },
          {
            type: '下午：分论坛',
            id: 'other',
            duration: '14:00 - 17:00',
            time: '28',
            children: [
              {
                id: 0,
                name: '麒麟软件',
                detail: '',
                children: [
                  {
                    time: '14:00 - 14:10',
                    desc: '欧拉社区领导致辞',
                    name: ['冯冠霖'],
                    post: ['开放原子开源基金会秘书长'],
                    detail: '',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '夯实算力底座，赋能产业升级',
                    name: ['杨汇成'],
                    post: ['麒麟软件有限公司产品与社区发展中心副总经理'],
                    detail: '',
                  },
                  {
                    time: '14:30 - 14:45',
                    desc: '强强联合，共筑开源产业根基',
                    name: ['熊伟'],
                    post: [
                      'openEuler社区技术委员会委员、开放原子开源基金会TOC委员',
                    ],
                    detail: '',
                  },
                  {
                    time: '14:45 - 15:00',
                    desc: '价值替代，生态共融，共铸数智化转型新未来',
                    name: ['李绍文'],
                    post: [
                      '用友网络科技股份有限公司集团信创技术管理委员会组长',
                    ],
                    detail: '',
                  },
                  {
                    time: '15:00 - 15:15',
                    desc: '携手麒麟，筑牢网信安全根基',
                    name: ['周华涛'],
                    post: ['奇安信科技集团股份有限公司保密信创总体部总经理'],
                    detail: '',
                  },
                  {
                    time: '15:15 - 15:30',
                    desc: '承上启下，共建网信新生态——FlyingServer，打造网信精品应用中间件',
                    name: ['刘海平'],
                    post: ['亚信科技（中国）有限公司研发中心平台产品线总经理'],
                    detail: '',
                  },
                  {
                    time: '15:30 - 15:45',
                    desc: '星环大数据 & 麒麟操作系统联合解决方案',
                    name: ['张雷'],
                    post: ['星环信息科技（上海）股份有限公司生态合作总监'],
                    detail: '',
                  },
                  {
                    time: '15:45 - 16:00',
                    desc: '夯实安全基础，共创保险数字化未来',
                    name: ['张正'],
                    post: ['中科软科技股份有限公司技术总监'],
                    detail: '',
                  },
                ],
              },
              {
                id: 1,
                name: '麒麟信安',
                detail: '',
                children: [
                  {
                    time: '14:00 - 14:10',
                    desc: '致辞',
                    name: ['任启'],
                    post: ['麒麟信安高级副总裁'],
                    detail: '',
                  },
                  {
                    time: '14:10 - 14:15',
                    desc: '欧拉社区领导致辞',
                    name: ['邱成峰'],
                    post: ['openEuler社区秘书长'],
                    detail: '',
                  },
                  {
                    time: '14:15 - 14:35',
                    desc: '麒麟信安操作系统发展现状与路线规划',
                    name: ['石勇'],
                    post: ['麒麟信安操作系统产品总监、openEuler技术委员会委员'],
                    detail: '',
                  },
                  {
                    time: '14:35 - 14:55',
                    desc: '共建欧拉开源根技术 打造操作系统新生态',
                    name: ['管延杰'],
                    post: ['openEuler兼容性SIG maintainer'],
                    detail: '',
                  },
                  {
                    time: '14:55 - 15:15',
                    desc: '湖南欧拉生态建设概况与发展规划',
                    name: ['刘华杰'],
                    post: ['湖南欧拉生态创新中心BD负责人'],
                    detail: '',
                  },
                  {
                    time: '15:15 - 15:35',
                    desc: '创新不止 云化提速——麒麟信安云技术创新与应用实践',
                    name: ['徐鹏'],
                    post: ['麒麟信安售前方案总监'],
                    detail: '',
                  },
                  {
                    time: '15:35 - 15:55',
                    desc: '原地替换 应用透明——麒麟信安操作系统CentOS迁移方案技术实践',
                    name: ['高洪鹤'],
                    post: ['麒麟信安技术专家、openEuler用户委员会委员'],
                    detail: '',
                  },
                ],
              },
              {
                id: 2,
                name: '统信软件',
                detail: '',
                children: [
                  {
                    time: '14:00 - 14:05',
                    desc: '欢迎致辞',
                    name: ['张木梁'],
                    post: ['统信软件生态中心副总经理'],
                    detail: '',
                  },
                  {
                    time: '14:05 - 14:10',
                    desc: '欧拉社区领导致辞',
                    name: ['江大勇'],
                    post: ['欧拉社区董事长'],
                    detail: '',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '统信基于Cent OS停服的迁移实践',
                    name: ['李小平'],
                    post: ['统信软件服务器产线产品市场总监'],
                    detail: '',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '共建欧拉开源根技术 打造操作系统新生态',
                    name: ['管延杰'],
                    post: ['欧拉社区技术专家'],
                    detail: '',
                  },
                  {
                    time: '14:50 - 15:05',
                    desc: '打造数智化算力底座，合作共赢算力新时代',
                    name: ['邓忠良'],
                    post: ['同方计算机有限公司副总经理'],
                    detail: '',
                  },
                  {
                    time: '15:05 - 15:20',
                    desc: 'GBase 8c多模多态分布式数据库基于国产生态的创新实践分享',
                    name: ['李凯'],
                    post: ['南大通用GBase 8c产品总监'],
                    detail: '',
                  },
                  {
                    time: '15:20 - 15:35',
                    desc: '共享共建基础软件生态，开源协作夯实数字化底座',
                    name: ['李洪巍'],
                    post: ['北京宝兰德软件股份有限公司副总经理'],
                    detail: '',
                  },
                  {
                    time: '15:35 - 15:50',
                    desc: '基于UOS的网信银行网点渠道建设探索',
                    name: ['李思佳'],
                    post: ['赞同科技渠道产品总监'],
                    detail: '',
                  },
                  {
                    time: '15:50 - 16:05',
                    desc: '软通动力携手统信，共荣基础软件生态',
                    name: ['刘合领'],
                    post: ['软通动力欧拉服务经理'],
                    detail: '',
                  },
                ],
              },
              {
                id: 3,
                name: '软通动力',
                detail: '',
                title: '',
                children: [
                  {
                    time: '14:00 - 14:05',
                    desc: '欧拉社区领导致辞',
                    name: ['冯冠霖'],
                    post: ['开放原子开源基金会秘书长'],
                    detail: '',
                  },
                  {
                    time: '14:05 - 14:10',
                    desc: '欢迎致辞',
                    name: ['高培'],
                    post: ['软通动力副总裁'],
                    detail: '',
                  },
                  {
                    time: '14:10 - 14:25',
                    desc: '基于欧拉开源根技术，打造操作系统新生态',
                    name: ['熊伟'],
                    post: ['openEuler社区技术委员会委员'],
                    detail: '',
                  },
                  {
                    time: '14:25 - 14:40',
                    desc: '躬身入局，共创欧拉未来',
                    name: ['马骏'],
                    post: ['软通动力openEuler研究中心主任'],
                    detail: '',
                  },
                  {
                    time: '14:40 - 14:45',
                    desc: '软通动力携手客户与伙伴共建欧拉生态，加速产品和服务推广',
                    name: ['软通动力、客户、伙伴'],
                    post: [''],
                    detail: '',
                  },
                  {
                    time: '14:45 - 15:00',
                    desc: '携手openEuler，为中国数字时代提供更多可能',
                    name: ['杨宗伟'],
                    post: ['软通动力openEuler研究中心专家'],
                    detail: '',
                  },
                  {
                    time: '15:00 - 15:15',
                    desc: '欧拉一站式服务解决方案，助力行业根深叶茂',
                    name: ['王军'],
                    post: ['软通动力助理副总裁'],
                    detail: '',
                  },
                  {
                    time: '15:15 - 15:30',
                    desc: '软通动力&海量数据，加速基础软件创新',
                    name: ['杨敦峰', '李成鹏'],
                    post: [
                      '海量数据生态发展部总经理',
                      '软通动力欧拉生态技术总监',
                    ],
                    detail: '',
                  },
                  {
                    time: '15:30 - 15:45',
                    desc: '统信携手软通动力，共建生态繁荣',
                    name: ['李小平'],
                    post: ['统信软件服务器产线产品市场总监'],
                    detail: '',
                  },
                  {
                    time: '15:45 - 15:50',
                    desc: '软通动力与统信战略合作签署仪式',
                    name: ['石丰', '王军'],
                    post: ['统信软件服务中心总经理', '软通动力助理副总裁'],
                    detail: '',
                  },
                  {
                    time: '15:50 - 16:05',
                    desc: '欧拉服务工具链iTools实践分享',
                    name: ['刘刚'],
                    post: ['软通动力欧拉生态经理'],
                    detail: '',
                  },
                  {
                    time: '16:05 - 16:20',
                    desc: '基于openEuler的医疗HIS系统迁移案例',
                    name: ['侯纪伟'],
                    post: ['陕西远鑫销售总监'],
                    detail: '',
                  },
                  {
                    time: '16:20 - 16:35',
                    desc: '基于openEuler的客户数据中心解决方案迁移案例',
                    name: ['贺莉娜'],
                    post: ['异次元售前解决方案总监'],
                    detail: '',
                  },
                ],
              },
              {
                id: 4,
                name: '中科创达',
                detail: '',
                title: '开放融合创新 崛起数智行业',
                children: [
                  {
                    time: '14:00 - 14:05',
                    desc: '欧拉社区领导致辞',
                    name: ['熊伟'],
                    post: ['开放原子开源基金会TOC委员'],
                    detail: '',
                  },
                  {
                    time: '14:05 - 14:20',
                    desc: 'KubeEdge SIG Networking的进展与未来规划',
                    name: ['王杰章'],
                    post: ['华为云高级工程师'],
                    detail: '',
                  },
                  {
                    time: '14:20 - 14:40',
                    desc: '边缘计算助力企业数字化转型',
                    name: ['张硕'],
                    post: ['中科创达新业务战略产品总监'],
                    detail: '',
                  },
                  {
                    time: '14:40 - 15:00',
                    desc: '多云边缘协同计算',
                    name: ['路广'],
                    post: ['VMware研发总监'],
                    detail: '',
                  },
                  {
                    time: '15:00 - 15:20',
                    desc: '地平线机器人与生态构建',
                    name: ['程飞'],
                    post: ['地平线机器人事业部方案交付负责人'],
                    detail: '',
                  },
                  {
                    time: '15:20 - 15:40',
                    desc: 'EMQ 基于分布式云的 IIoT 解决方案',
                    name: ['金发华'],
                    post: ['EMQ 联合创始人兼CPO'],
                    detail: '',
                  },
                  {
                    time: '15:40 - 16:00',
                    desc: '欧拉与机器人应用',
                    name: ['李建华'],
                    post: ['中科创达机器人资深架构师'],
                    detail: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        daytime: '12月29日 openEuler Summit 2022',
        list: [
          {
            type: '上午：主论坛',
            id: 'main',
            // time: '上午',
            children: [
              {
                time: '09:30 - 09:35',
                desc: '基金会领导致辞',
                name: ['冯冠霖'],
                post: ['开放原子开源基金会秘书长'],
              },
              {
                time: '09:35 - 09:45',
                desc: 'openEuler项目群成立暨 新一届openEuler委员会亮相',
                name: ['孙文龙', '邱成锋'],
                post: ['开放原子开源基金会理事长', 'openEuler社区秘书长'],
              },
              {
                time: '09:45 - 09:55',
                desc: '激发原创力量 逐梦数智未来',
                name: ['江大勇'],
                post: ['openEuler社区理事长'],
              },
              {
                time: '09:55 - 10:10',
                desc: '纵深创新 走向世界 openEuler技术发展前瞻',
                name: ['熊伟'],
                post: ['openEuler技术委员会委员、开放原子开源基金会TOC委员'],
              },
              {
                time: '10:10 - 10:30',
                desc: 'openEuler&Friends 3.0 全场景联合创新展示',
                name: [''],
                post: [''],
              },
              {
                time: '10:30 - 10:40',
                desc: '面向全场景的操作系统构建服务发布',
                name: ['吴峰光'],
                post: ['openEuler技术委员会委员'],
              },
              {
                time: '10:40 - 10:50',
                desc: '中国服务器操作系统行业市场调研报告',
                name: ['杨晓骋'],
                post: ['沙利文咨询合伙人兼董事总经理'],
              },
              {
                time: '10:50 - 11:00',
                desc: '大型国有银行与麒麟软件联合创新实践',
                name: ['李震宁'],
                post: ['麒麟软件有限公司副总裁'],
              },
              {
                time: '11:00 - 11:10',
                desc: '统信助力天翼云打造创新云服务产品与方案',
                name: ['王麟'],
                post: ['天翼云基础架构事业部操作系统方向研发专家'],
              },
              {
                time: '11:10 - 11:20',
                desc: '国产操作系统在新一代新能源集控系统应用实践',
                name: ['周毅', '刘曙元'],
                post: [
                  '湖南麒麟信安科技股份有限公司副总裁',
                  '国能信控互联网技术有限公司副总经理',
                ],
              },
              {
                time: '11:20 - 11:30',
                desc: '超聚变助力联通云在算力网络的创新与实践',
                name: ['姜振华'],
                post: ['超聚变操作系统总经理'],
              },
              {
                time: '11:30 - 11:40',
                desc: '新浪微博基于openEuler在离线混部方案实践',
                name: ['张帅'],
                post: ['新浪微博技术专家'],
              },
              {
                time: '11:40 - 11:45',
                desc: '“欧拉之星”颁奖典礼 年度最佳openEuler开发者贡献奖',
                name: ['韩乃平'],
                post: ['openEuler社区副理事长、麒麟软件有限公司高级副总经理'],
              },
            ],
          },
          {
            type: '下午：分论坛',
            id: 'other',
            time: '29',
            duration: '14:00 - 17:00',
            children: [
              {
                id: 0,
                name: 'Linux 内核',
                desc: 'openEuler Summit 2022',
                detail: 'exit',
                children: [
                  {
                    time: '13:30 - 13:50',
                    desc: '数据中心服务器以太网链路聚合与高可用',
                    name: ['胡亚弟', '孙守鑫'],
                    post: [
                      '天翼云科技有限公司技术专家',
                      '天翼云科技有限公司高级后端开发工程师',
                    ],
                    detail:
                      '本议题讲述各种linux bonding的基本工作原理，实现。 对于多种bond模式在DC场景下进行比较，分析。同时，介绍工作中遇到的相关问题及针对问题所做的一些优化。其中优化工作分为两部分，一个是开发bond6针对ipv6报文接收方向的负载均衡功能。另一个是修复bond6的vlan子接口加入Linux bridge之后丢包的问题。最后根据bond口的应用经验，提出一些应用建议。',
                  },
                  {
                    time: '13:50 - 14:10',
                    desc: '移动云高性能远程调用框架eRPC在Gazelle上的最佳实践与应用',
                    name: ['薛传宇'],
                    post: ['中移（苏州）软件技术有限公司 软件开发工程师'],
                    detail:
                      'eRPC作为一款高性能远程调用框架，目前主要落地应用于移动云极速云盘产品。在eRPC技术选型阶段，RDMA虽然有更好的时延和iops性能，但是存在的大规模组网难，成本高等难题。故我们选择用户态TCP作为下一步主攻方向。凭借Gazelle提供的用户态TCP传输能力，eRPC已达到TCP翻倍的iops与时延性能。将更好助力移动云算力网络进一步发展。',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '云环境下欧拉开源操作系统的无缝内核热升级',
                    name: ['曾昭荣'],
                    post: ['Intel Cloud Software Engineer'],
                    detail:
                      '云环境中经常因为安全性等原因需要更新或升级系统的内核，目前的一些方案比如热补丁，热迁移等等都有一些局限性。我们这里基于openEuler操作系统提出一套新的技术方案，即利用kexec快速重启内核，同时将虚拟机状态维持在内存中，所有的直通设备也保持活跃的状态，重启后从内存中直接恢复虚拟机，并直接连接活跃的原有直通设备，以期达到更好的服务中断时间以及成功率。',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: 'eBPF-Linux内核安全的双刃剑',
                    name: ['曹佩庆'],
                    post: ['统信软件研发经理'],
                    detail:
                      '结合当前ebpf技术在linux内核中的应用分析说明不当的ebpf应用会引入的安全风险和危害举例说明合适的ebpf技术给linux平台下内核开发和系统/容器安全带来的益处探讨如何更好的用好ebpf这把“双刃剑”',
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: 'MPTCP BPF包调度器的实现',
                    name: ['唐葛亮'],
                    post: ['SUSE Euler OS专家'],
                    detail:
                      '本人实现的MPTCP BPF包调度器是今年Linux内核中MPTCP协议栈上的一个新特性，允许用户通过BPF来为MPTCP提供自定义的包调度器。该实现包含20多个内核代码补丁。本议题向大家展示该特性是如何一步一步实现的。',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: 'ARM64 内存可靠性增强',
                    name: ['王克锋'],
                    post: ['华为高级软件工程师'],
                    detail:
                      '内存容量越来越大，多样化的内存介质引入，单机下内存故障随之增加，同时，arm64服务器广泛在云&数据中心的应用，内存的故障处理在arm64架构下越来越重要，本次Topic介绍arm64 RAS处理及华为在arm64可靠性里面的相关工作，包括arm64 内存镜像，arm64 machine check safe等。内存镜像相当于一份内存中的数据有两份拷贝，如果系统检测到不可恢复的内存错误，那么内存控制器会从镜像区域同步一份，避免数据丢失。Linux内核一般会将内核以及驱动使用的数据做内存镜像，避免因为内存错误导致内核panic，该特性已成功推社区。machine check safe在uaccess等场景下内核态触发不可恢复内存错误时，通过杀死受影响的用户态进程同时隔离错误页面的处理机制，避免内核panic，该特性目前正在推送社区中。',
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: '探秘 Intel Trust Domain Extensions(TDX) 技术',
                    name: ['杜凡'],
                    post: ['Intel系统软件架构师'],
                    detail:
                      'Intel Trust Domain Extensions(TDX) 作为硬件辅助TEE的技术，提供虚拟机层面的内存及CPU状态的机密性和完整性的保障。Intel TDX 技术巧妙得扩展MKTME和VMX 两大基础技术底座，引入SEAM 模式，以SEAM模式的软件载体TDX Module 作为安全防护的关键支点，同时有增加的方便升级的优势。Intel TDX 作为机密计算领域的主要方向之一，在云环境中，阻断恶意攻击，保护终端用户数据的安全性，对敏感业务向云端迁移提供支撑。本议题阐述Intel TDX整体的架构，探寻其底层技术逻辑。',
                  },
                  {
                    time: '15:50 - 16:10',
                    desc: '基于eBPF技术的网络会话监控技术与实践',
                    name: ['秦云高'],
                    post: ['湖南麒麟信安科技股份有限公司资深内核开发工程师'],
                    detail: `"简单介绍eBPF技术的背景，并基于openEuler 20.03 LTS版本进行网络会话监控、数据采集、统计和审计。
                            主要分享：
                            1、 简单介绍eBPF技术的背景
                            2、	介绍当前网络监控的一些缺点和不足
                            3、	介绍该监控审计技术的特性，包括：协议类型TCP或UDP、本地IP地址、本地端口、对端IP地址、对端端口、进程和网络会话字节数等。"`,
                  },
                  {
                    time: '16:10 - 16:30',
                    desc: '数据完整性在openEuler上的实现',
                    name: ['赵磊'],
                    post: ['江苏润和软件股份有限公司专家级工程师'],
                    detail: `讲述了Linux内核安全性模块的起源、发展和未来趋势，列举了openEuler在内核安全性上的增强和加固，并以openEuler为对象，介绍了在openEuler实现数据完整性的设计与方法
                            主题包含:
                            1: 介绍Linux内核安全性模块(LSM)的设计、历史和发展
                            2: openEuler在对内核安全性方面的增强与加固
                            3: 在openEuler实现数据完整性的一种实现设计方法`,
                  },
                  {
                    time: '16:30 - 16:50',
                    desc: '下一代互联标准Compute Express Link(CXL)简介',
                    name: ['施爱春'],
                    post: ['Intel软件工程师'],
                    detail: `Compute Express Link(CXL)是下一代高带宽低延迟的开放互联标准，为高性能异构计算在不同场景的应用而量身打造。本议题主要介绍CXL规范，Linux内核实现及应用场景。`,
                  },
                ],
              },
              {
                id: 1,
                name: '多样性计算&编译器',
                desc: 'openEuler Summit 2022',
                detail: 'exit',
                children: [
                  {
                    time: '13:30 - 13:50',
                    desc: '毕昇JDK新特性分享',
                    name: ['周磊'],
                    post: ['华为技术有限公司毕昇JDK高级技术专家'],
                    detail:
                      '毕昇JDK是华为内部OpenJDK定制版Huawei JDK的开源版本，是一款高性能、可用于生产环境的OpenJDK发行版；毕昇JDK团队基于鲲鹏架构持续优化，不断给客户带来更有竞争力的JDK软件竞争力，本期主要介绍两个新特性：Dynamic CDS特性和ZGC TBI优化，在springboot场景收益明显。',
                  },
                  {
                    time: '13:50 - 14:10',
                    desc: '英特尔第四代至强可扩展处理器赋能openEuler领先技术发展',
                    name: ['田俊'],
                    post: ['Intel Arch SIG Maintainer'],
                    detail:
                      'Intel在下一代Sapphire Rapids平台上引入了众多业界领先的技术和特性，同时Intel也正在参与和大力推进openEuler对多样性计算生态的支持。本话题将总体为大家更新openEuler平台在对Intel下一代平台和新技术支持上的进展，同时也会重点介绍未来平台的一些主要功能和特性，包括AMX，DSA, IAA，Scalable IOV，CXL 1.1等新技术以及应用场景等。',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '全场景全流程的自动反馈优化',
                    name: ['李彦成'],
                    post: ['华为技术有限公司软件工程师'],
                    detail:
                      '随着计算继续向云上移动，微小的数据中心应用性能优化也能够带来大量经济效益。通常，单个数据中心计算节点执行的任务类型相对固定，作为底座的操作系统和基础库并未考虑特定应用场景，存在优化空间。通过从业务开发至部署阶段全流程，从用户态应用、内核到运行时库全场景的反馈优化，实现结合具体业务场景，深度释放数据中心算力。同时，提供多种优化特性和工具，实现不同场景下打造极致性能和极简应用的优化能力。帮助开发者了解谷歌、Meta等世界一流云服务企业如何利用反馈编译优化实现场景化优化目标，也为相关开发者系统性介绍openEuler系统上反馈编译优化现状、能力和未来规划。',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '欧拉开源操作系统上LoongArch架构支持',
                    name: ['李星'],
                    post: ['龙芯中科技术股份有限公司软件工程师'],
                    detail:
                      '介绍欧拉支持LoongArch架构的工作，主要从底层来介绍，如我们的指令集、ABI、内核、GCC、LLVM等在欧拉开源操作系统上的支持。',
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '芯突破 新领域 - AMD 第四代EPYC处理器全面支持openEuler',
                    name: ['谢昊成'],
                    post: ['amd工程师'],
                    detail: '介绍openEuler对AMD第四代EPYC平台的支持',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '基于LLVM编译openEuler嵌入式软件包的探索与实践',
                    name: ['赵川峰'],
                    post: ['华为技术有限公司主任工程师'],
                    detail:
                      'LLVM项目凭借其良好的架构、友好的Licence，近年来社区活跃度增加明显，越来越多的软件项目迁移到LLVM编译器构建。本议题首先简单介绍LLVM编译器项目架构特点和业界OS采用LLVM编译的已有实践，然后介绍编译openEuler嵌入式镜像软件包上的探索及最新进展，最后介绍一下这项工作的后续工作思路。',
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: '基于 DPU 的异构编程解决方案',
                    name: ['袁林思'],
                    post: ['深圳云豹智能有限公司软件总监'],
                    detail:
                      '传统的编程以面向 CPU 通用处理器和主存为主，基于 x86/arm 指令集完成编程；而面向 DPU 编程时，将面对一个全新的硬件架构。DPU 引入更多的硬件加速引擎，甚至集成不同指令集的多个处理器，如何高效利用 DPU 的硬件能力的同时，降低用户的开发门槛及复杂度，本 topic 分享一种解决思路并通过一个实例来做一个演示',
                  },
                  {
                    time: '15:50 - 16:10',
                    desc: '编译器插件框架',
                    name: ['伍明川'],
                    post: ['华为技术有限公司高级工程师'],
                    detail: `作为当前主流的两种编译器框架，GCC使用面广，稳健发展性能较好；LLVM开拓创新，发展迅速。市场上大量的编译工具和编译扩展能力，均是基于这两类编译器完成的。这导致任何编译工具需要选择两种编译框架之一或者重复进行开发，拉高了工具的开发和维护成本。
                            GCC和LLVM各自提供自己的插件式开发能力，但是缺少面向插件工具的维护性和兼容性等公共能力。同时，面对各种不同算力，用户需要一种便捷的面向算力的编译优化配置方法，并为多样算力的优化配置提供除开源之外的第二种选择。本议题帮助开发者了解编译器插件工具开发的行业现状，为基于编译能力的相关工具开发者介绍一种新的便捷开发方法。`,
                  },
                  {
                    time: '16:10 - 16:30',
                    desc: '开源指令集RISC架构处理器与开源生态共生共荣',
                    name: ['刘德启'],
                    post: ['合芯科技有限公司CTO & 研发副总裁'],
                    detail: `合芯科技有限公司成立于2014年，专注于高端服务器中央处理器、定制化服务器整机方案、处理器周边芯片研发及设计服务，在广州、上海、北京、苏州及深圳设有研发中心。公司推出了第一代基于开源指令集架构的处理器芯片，以及以此为基础的服务器整机和相关整体解决方案。
                            公司和openEuler社区开展合作，参与相关sig工作组，全力打造基于开源指令集RISC架构处理器，推进以openEuler为基础的全栈国产化高端服务器解决方案。`,
                  },
                  {
                    time: '16:30 - 16:50',
                    desc: '编译器视角的DSA架构可编程性',
                    name: ['淡孝强'],
                    post: ['希姆计算编译工具链团队总监'],
                    detail:
                      '从编译器视角展开，从ISA设计，内存，带宽设计，并行并发设计等维度，探讨DSA架构与可编程性，AI编译的紧密关系。',
                  },
                  {
                    time: '16:50 - 17:10',
                    desc: '基于新一代ARMv9 N2核和欧拉OS的软硬件协同优化',
                    name: ['陈争胜'],
                    post: ['深圳市遇贤微电子有限公司首席架构师'],
                    detail:
                      'ARM服务器CPU在数字基础设施中的部署越来越多，新一代ARMv9 N2实现了针对大数据处理的SVE2、I8MM等指令，如何通过编译器和手工优化，发挥这些新指令的计算效能优势是一个值得关注的问题。另外随着工艺与架构持续的演进，单处理器多核芯片（CMP）已经接近200核，未来甚至会达到500~1000核规模，平均系统Cache大小从512K到12MB，如何在这么大规模的CMP和复杂的系统Cache上部署和优化软件，具有非常大的挑战。本议题针对上述问题给出一些分析介绍和实践案例。',
                  },
                ],
              },
              {
                id: 2,
                name: '虚拟化&云原生',
                desc: 'openEuler Summit 2022',
                detail: 'exit',
                children: [
                  {
                    time: '13:30 - 13:50',
                    desc: '移动云天元轻量级Hypervisor与StratoVirt最佳实践',
                    name: ['汤中睿'],
                    post: ['中国移动云能力中心软件开发工程师'],
                    detail: `（1）相关产品及平台简介 a）移动云BC-EV虚拟化产品简介。 b）StratoVirt虚拟化平台简介。（2）基于StratoVirt的移动云天元轻量级Hypervisor内存底噪、启动时间以及其它功能、兼容性等数据展示及情况介绍。（3）StratoVirt支持自由时钟特性开发及功能展示。`,
                  },
                  {
                    time: '13:50 - 14:10',
                    desc: '推动容器网络发展 创造数据计算价值',
                    name: ['李冬'],
                    post: ['中科驭数HADOS软件开发平台产品总监'],
                    detail: `随着云原生技术的发展以及市场需求的演进，Serverless架构以及FaaS、BaaS领域蓬勃发展，对云原生的网络、存储解决方案提出了更加苛刻的性能需求。中科驭数依托深厚的技术积累、打造出基于DPU底座的云原生网络与服务网格加速卸载方案，助力多行业的基础设施架构转型。`,
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '使用Rancher管理面向openEuler的Kubernetes发行版',
                    name: ['张智博'],
                    post: ['SUSE'],
                    detail: `Rancher是一款专注于Kubernetes多集群管理的开源产品，且一直深耕Kubernetes发行版领域，向业内输出了RKE、RKE2、K3s等产品，并兼容多种操作系统和云环境。openEuler作为一支飞速发展的生态力量，亦在Rancher的产品兼容范围内。同时，基于openEuler打造的一套Kubernetes发行版，也进入了Rancher的产品矩阵。依托Rancher的产品基本能力，结合openEuler的生态，给企业客户提供面向多云部署多样性Kubernetes集群的能力。`,
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '基于openEuler的可信虚拟化技术探索和实践',
                    name: ['祁浩'],
                    post: ['中国移动云能力中心软件开发工程师'],
                    detail: `在国家大力推动网络安全、商用密码技术的背景和趋势下，国内各行业纷纷开始加强信息安全建设，探索改造原有IT系统，对软硬件产品自主可控与安全的需求日益增强。我们基于openEuler的可信虚拟化技术探索和实践，构建国产化全栈云能力，为用户提供更加安全可信的云主机。`,
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '容器云业务与云底座操作系统运维一致性实践',
                    name: ['刘阔'],
                    post: ['麒麟软件有限公司高级研发工程师'],
                    detail: `云原生领域主要采用容器技术与容器编排技术实现业务发布、运维，与底层环境高度解耦，但同时带来了运维技术栈不统一，运维平台重复建设等问题。NestOS作为云底座操作系统，实现业务与底座操作系统运维的一致性，本议题将对其进行简要介绍和演示。`,
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '基于openEuler的云桌面性能问题定位提升实践',
                    name: ['周同庆'],
                    post: ['湖南麒麟信安科技股份有限公司测试工程师'],
                    detail: `简介：针对基于openEuler构建的云桌面的性能问题，通过性能瓶颈检测诊断工具准确定位，解决性能瓶颈，
                            主要分享：
                            1、 真实用户使用性能瓶颈检测
                            2、 云产品版本迭代性能优化验证
                            3、云桌面使用卡顿级别评测`,
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: '基于openEuler构建全栈云原生中间件服务平台',
                    name: ['刘大全'],
                    post: ['北京东方通科技股份有限公司技术咨询专家'],
                    detail: `中间件技术和产品随着IT技术和架构的发展而演进。当前云原生技术发展迅速并已被逐渐应用在多个行业领域的生产系统，对于云原生中间件的需求也与日俱增。东方通凭借多年中间件领域的技术积累，以及云原生业务场景下对于中间件的需求，基于openEuler系统打造了面向云原生的中间件服务平台，提供微服务应用运行时支撑、文件传输服务等多类中间件服务能力，助力客户构建云原生模式的业务系统。`,
                  },
                  {
                    time: '15:50 - 16:10',
                    desc: 'openEuler虚机混部基于移动苏研大云的最佳实践',
                    name: ['朱科潜'],
                    post: ['华为企业通信技术有限公司软件研发工程师'],
                    detail: `虚拟化技术作为当前云计算的技术底座，硬件资源利用率低是行业普遍存在的问题。随着云计算规模大幅增长，提高资源利用率是实现降本增效、绿色低碳的重要途径。
                            本议题主要针对通用计算场景CPU利用率提升问题，通过集群调度混部感知、单机协同调度、内核基础资源隔离等全栈技术，实现CPU利用率成倍增加，可大幅降低数据中心硬件成本。
                            相关成果已经联合中移动苏研完成技术验证，包含详细的数据和演示视频，可在大会联合展示。`,
                  },
                  {
                    time: '16:10 - 16:30',
                    desc: '基于openEuler的OKD移植和应用实践',
                    name: ['田利军'],
                    post: ['统信软件高级研发工程师'],
                    detail: `OKD是OpenShift上游和社区版本，在金融，智能制造等行业有较多的使用场景，我们基于openEuler完成了对OKD的移植并提供DevOps实践和CI/CD，构建安全可靠的全栈容器云。`,
                  },
                  {
                    time: '16:30 - 16:50',
                    desc: 'Qemu Dirty Limit Feature',
                    name: ['黄勇'],
                    post: ['天翼云科技有限公司高级后端开发工程师'],
                    detail: `DirtyLimit是天翼云在虚拟机迁移加速技术上的创新尝试，使用户迁移速度与计算性能兼得，大幅提升用户系统迁移体验，议题主要介绍DirtyLimit的实现原理和测试结果。`,
                  },
                ],
              },
              {
                id: 3,
                name: '嵌入式&ROS',
                desc: 'openEuler Summit 2022',
                detail: 'exit',
                children: [
                  {
                    time: '13:30 - 13:50',
                    desc: '2022 sig-ROS发展图鉴',
                    name: ['安传旭'],
                    post: ['中科院软件所sig-ROS maintainer'],
                    detail: '2022年sig-ROS所做工作的汇报，以及后续的展望。',
                  },
                  {
                    time: '13:50 - 14:10',
                    desc: 'openEuler ROS 发展的技术展望',
                    name: ['张珩'],
                    post: ['中国科学院软件研究所副研究员'],
                    detail:
                      '通过对openEuler ROS的发展历程以及应用领域的梳理，研讨ROS发展的核心技术发展；并围绕各类核心组件技术（含ROS分布式通信、定位导航以及可视化）分析openEuler ROS的技术发展前景，展望openEuler ROS发展。',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '小而美的嵌入式操作系统 RT-Thread',
                    name: ['郭占鑫'],
                    post: ['上海睿赛德电子科技有限公司RT-Thread 社区负责人'],
                    detail:
                      '先简单介绍嵌入式操作系统 RT-Thread 的情况，包括基础特性和发展现状，然后分享 RT-Thread 5.0 的最新进展，包括 Arduino 兼容层的支持，以及 RT-Thread 和 openEuler Embedded 混合部署。',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '基于openEuler系统的Jailhouse研究、实践及创新',
                    name: ['郭皓'],
                    post: ['麒麟软件技术专家'],
                    detail:
                      '首先介绍jailhouse是什么、优势及适用场景；其次介绍jailhouse虚拟化原理；最后再介绍麒麟软件基于欧拉开源操作系统对Jailhouse软件目前的研究及创新。',
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '科东Intewell自主嵌入式实时操作系统，助力智能制造',
                    name: ['毛响林'],
                    post: ['科东（广州）软件科技有限公司副总经理'],
                    detail:
                      'Intewell是科东软件自主研发的工业实时操作系统，源于20年以上行业应用“道系统”，采用微内核架构，支持虚拟化技术，有高实时特性。科东Intewell操作系统拥有丰富的行业应用经验，荣获首届工信部工业互联网大赛一等奖，世界人工智能大会“湛卢奖”技术创新奖等多项业界权威大奖。',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '基于openEuler Embedded的嵌入式系统特性和电网应用',
                    name: ['廖卫'],
                    post: [
                      '湖南麒麟信安科技股份有限公司操作系统产品线版本经理',
                    ],
                    detail: `"简介： 介绍基于openEuler Embedded 的麒麟信安嵌入式系统的特性,并且在电网安全运维网关项目上的应用。
                            主要分享：
                            1、介绍嵌入式系统的特性,主要包括以openEuer为供应链、支持wayland、支持双系统升级、安全特性等
                            2、介绍嵌入式系统版本定制系统
                            3、介绍在电网安全运维网关项目上的挑战和解决方案"`,
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: '基于 openEuler 的工业机器人操作系统及探索应用',
                    name: ['牛建伟'],
                    post: ['北京航空航天大学教授/博士生导师'],
                    detail: `研发一套自主可控、实时性高、稳定性强的智能机器人操作系统开放平台，对我国机器人产品生态建设具有重要意义。北京航空航天大学基于openEuler embeded操作系统探索建立一套稳定性强、跨平台的工业机器人智能机器人操作系统，适配相关工业协议，同时配备机器人控制、调试、模拟仿真等环境工具，降低机器人应用研发难度。`,
                  },
                ],
              },
              {
                id: 4,
                name: 'RISC-V',
                desc: 'openEuler Summit 2022',
                detail: 'exit',
                children: [
                  {
                    time: '13:30 - 13:50',
                    desc: 'openEuler RISC-V的进展和展望',
                    name: ['张旭舟'],
                    post: ['openEuler RISC-V SIG maintainer'],
                    detail:
                      'openEuler 在RISC-V上已经快速持续迭代了两年时间并且已经进行了多次版本发布，随着RISC-V生态的快速发展，openEuler RISC-V 所支持的软件包、特性不断丰富，此次议题对于当前的进展和展望进行介绍。',
                  },
                  {
                    time: '13:50 - 14:10',
                    desc: 'openEuler的参考发行版',
                    name: ['王弈桥'],
                    post: ['学生'],
                    detail:
                      'Eulaceura 是将 RISC-V 架构纳入第一级支持范围的 openEuler 发行版。在这里我将分享因何原因而产生了这样一个新的发行，介绍 RISC-V 架构下的运作状况，和开发过程中的一些经验和思考。',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: 'RISC-V计算软件栈介绍',
                    name: ['张先轶'],
                    post: ['澎峰科技CEO'],
                    detail:
                      '高性能的异构计算软件栈作为底层硬件和上层应用的桥梁，可以扩展芯片的应用范围，提升计算性能。国际主流芯片公司都投入大量资源建设异构计算软件栈，例如Intel oneAPI，NVIDIA CUDA等。本报告将介绍澎峰的PerfXAPI异构计算软件栈在RISC-V的适配和优化工作，特别是底层计算库RVCL项目。',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: 'Backporting for OpenJDK8',
                    name: ['章翔'],
                    post: ['中科院软件所工程师'],
                    detail:
                      '此次分享主要介绍OpenJDK8移植RISC64的过程，包括移植的进展和产出，对于接触移植工作的新人来说，更为实际的是分享移植工作所带来的经验，希望能为新人做移植工作带来一些帮助。',
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '移植SpiderMonkey到RISC64',
                    name: ['陆亚涵'],
                    post: ['软件所智能软件研究中心工程师'],
                    detail: '关于移植SpiderMonkey到RISC64上的心得',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '即时开展 RISC-V openEuler Linux 内核开发',
                    name: ['吴章金'],
                    post: ['儒码科技CEO'],
                    detail:
                      '泰晓社区近期为 Linux Lab 开源项目新增了 openEuler Linux 内核开发支持，可以极速开展这块的开发，本次分享对此进行介绍。',
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: '2022年QEMU和Spike开源进展',
                    name: ['刘阳'],
                    post: ['中科院软件研究所软件工程师'],
                    detail:
                      '对2022年RISC-V QEMU和Spike社区的开源进展进行介绍。',
                  },
                  {
                    time: '15:50 - 16:10',
                    desc: 'RISC-V 如何迈向高性能计算',
                    name: ['陆言'],
                    post: ['同济大学学生'],
                    detail:
                      'RISC-V 作为一个新的开源指令集，因其高度可定制的 ISA 和架构设计受到了广泛关注，也向人们揭示了一种潜在的新的高性能计算的可能性。本议题讨论了 RISC-V 如何改造自己适合高性能计算，有什么样的案例，软件栈与工具链的发展情况，以及 openEuler RISC-V port 对此能起到何种帮助。',
                  },
                ],
              },
              {
                id: 5,
                name: '迁移&运维',
                desc: 'openEuler Summit 2022',
                detail: 'exit',
                children: [
                  {
                    time: '13:30 - 13:50',
                    desc: 'openEuler社区安全漏洞治理',
                    name: ['魏刚'],
                    post: ['openEuler社区安全委员会主席'],
                    detail: 'openEuler社区安全漏洞治理框架、运作方式等',
                  },
                  {
                    time: '13:50 - 14:10',
                    desc: 'sysMaster：重新定义服务管理，秒级启动、保障系统24小时在线',
                    name: ['徐小舟'],
                    post: ['华为软件工程师'],
                    detail:
                      '一套超轻量、高可靠性的服务管理程序集合，旨在改进传统的init守护进程。使用Rust语言编写，引入1+1+N架构和可靠性框架，支持自身故障快速检测和自愈，从而提升OS稳定性和业务可靠性。',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '超聚变知识引擎，为智能运维提供核心动能',
                    name: ['吴江涛'],
                    post: ['超聚变数字技术有限公司操作系统架构师'],
                    detail:
                      '超聚变知识引擎（以下简称“知识引擎”）是一个智能化的知识管理系统，将专家知识经验的体系化和数字化，提供面向人和面向机器两种模式的知识应用服务，实现多领域、综合知识在系统中的高效分析和执行闭环。',
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: 'PilotGo ：openEuler社区原生插件式运维平台',
                    name: ['杨昭'],
                    post: ['麒麟软件有限公司高级软件工程师'],
                    detail:
                      'PilotGo是openEuler社区原生孵化的运维管理平台，提供大规模集群的主机监控告警、软件包安装升级管理及批量运维操作等功能，保障业务系统安全、稳定运行。同时提供插件机制，对接多种业务场景集群，提供无感知的运维平台切换。',
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '软通动力openEuler迁移实践分享',
                    name: ['刘合领'],
                    post: ['软通动力基础软件服务经理'],
                    detail: `软通动力openEuler一站式服务能力介绍
                            软通动力openEuler一站式服务工具介绍
                            案例分享`,
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: '超聚变操作系统迁移思考及实践介绍',
                    name: ['张海亮'],
                    post: ['超聚变数字技术有限公司操作系统架构师'],
                    detail: `操作系统迁移是一个复杂的系统性工程，在迁移过程中会涉及多个方面的挑战，如何处理迁移过程中的软硬件兼容问题，系统配置兼容问题，迁移效率，保障迁移后平稳运行等一系列问题，超聚变提供了一站式高效工具辅助迁移过程，同时提供了端到端迁移服务，本议题将分享超聚变操作系统迁移能力和一些实际案例。`,
                  },
                ],
              },
              {
                id: 6,
                name: '用户&开发者体验',
                desc: 'openEuler Summit 2022',
                detail: 'exit',
                children: [
                  {
                    time: '13:30 - 13:50',
                    desc: 'openEuler社区基础设施上新分享',
                    name: ['李超然'],
                    post: ['openEuler Infra SIG开发者'],
                    detail:
                      '社区基础设施是支撑openEuler社区开发工作正常开展的重要基石，openEuler社区基础设施团队通过收集社区诉求，不断革新改进，在确保社区开发工作稳定的同时上线了众多方便、好用的全新开发者服务，包括欧拉统一账号系统、QuickIssue、Forum等社区支撑系统，同时完成了openEuler WSL移植，openEuler lxc移植等相关工作，可以很好的提升开发者的开发效率；本议题将为开发者介绍这些新服务的具体情况以及基础设施团队未来的规划。',
                  },
                  {
                    time: '13:50 - 14:10',
                    desc: 'openEuler开发体验-开发工具链',
                    name: ['杜开田'],
                    post: ['openEuler 兼容性 SIG Maintainer'],
                    detail:
                      '介绍openEuler开发者工具链最新进展和规划，为openEuler开发者提供高效、便捷的开发体验。',
                  },
                  {
                    time: '14:10 - 14:30',
                    desc: '统一构建功能及使用介绍',
                    name: ['段鹏杰'],
                    post: ['统一构建系统工程师'],
                    detail: `统一构建是openEuler社区在2022年主力打造的构建系统，其承担着 提升构建效率，支持软件包定制，镜像定制，面向全场景的使命。本次主要对统一构建系统的基本功能及使用进行讲解，并对后续正在开发的特性进行介绍。`,
                  },
                  {
                    time: '14:30 - 14:50',
                    desc: '基础软件人才与服务发展规划',
                    name: ['赵立超'],
                    post: ['华为技术有限公司人才与服务 sig maintainer'],
                    detail: `1.	人才发展规划：a)	高校人才播种；b)	社区人才培育和评定
                            2.	服务能力构建规划：a)	服务能力；b)	服务工具；c)社区服务论坛`,
                  },
                  {
                    time: '14:50 - 15:10',
                    desc: '北京航空航天大学openEuler合作实践',
                    name: ['孙海龙', '王域杰'],
                    post: ['北京航空航天大学教授', '北京航空航天大学学生'],
                    detail:
                      '"开源软件在软件技术生态体系中发挥着举足轻重的作用，围绕开源软件的科研和教学工作得到越来越广泛的关注。近年来，openEuler在技术研发、市场推广和开源生态建设方面取得了巨大成功，已成为国内外广泛关注的开源基础软件之一。本报告主要介绍结合openEuler所开展的开源软件方面的科研与教学工作的思路与实践，主要包括泛在操作系统开源生态相关研究以及面向北航本科生的《开源软件开发导论》课程实践。同时，来自北航的学生将结合自身经验为大家分享从认识开源到参与openEuler社区syscare项目进行开源实践的经历和收获。"',
                  },
                  {
                    time: '15:10 - 15:30',
                    desc: 'openEuler合规风险的治理实践',
                    name: ['郑志鹏'],
                    post: [
                      'openEuler合规sig maintainer/开源管理中心高级工程师',
                    ],
                    detail: 'openEuler合规风险的治理实践。',
                  },
                  {
                    time: '15:30 - 15:50',
                    desc: 'openEuler社区License准入体系在维信金科开源合规治理中的应用',
                    name: ['许渊聪'],
                    post: ['openEuler合规sig maintainer/维信金科合规负责人'],
                    detail:
                      'openEuler社区License准入体系在维信金科开源合规治理中的应用。',
                  },
                  {
                    time: '15:50 - 16:10',
                    desc: '欧拉Talk · 开发者面对面',
                    name: ['社区开发者/TC'],
                    post: [''],
                    detail:
                      '社区开发者是openEuler社区长期发展的基石，开发者体验的提升一直是openEuler社区最为重视的一环，本议题为在线的开放讨论，社区开发者基于自身参与社区贡献的感受与建议，线上对话TC委员与社区Maintainer零距离交流。通过了解社区开发者的需求，让社区更贴近开发者，联接更加紧密，让开发者的开发体验更佳，繁荣欧拉生态。',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  exhibition: {
    title: '线上展厅',
    linkList: [
      {
        name: 'openEule开源操作系统整体介绍',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/1-openEule开源操作系统整体介绍.mp4',
      },
      {
        name: '完备的嵌入式生态',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/02-创新技术-完备的嵌入式生态.mp4',
      },
      {
        name: '混合关键性系统',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/03-创新技术-混合关键性系统.mp4',
      },
      {
        name: '高精度智能地理巡检',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/04-创新技术-高精度智能地理巡检.mp4',
      },
      {
        name: '极致可靠的系统服务管理方案',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/05-创新技术-极致可靠的系统服务管理方案.mp4',
      },
      {
        name: '业务无感的系统热修复',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/06-创新技术-业务无感的系统热修复.mp4',
      },
      {
        name: '安全高效的可信云主机',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/07-创新技术-安全高效的可信云主机.mp4',
      },
      {
        name: '高效迁移方案',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/08-创新技术-高效迁移方案.mp4',
      },
      {
        name: '云上资源利用率倍增',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/09-创新技术-云上资源利用率倍增.mp4',
      },
      {
        name: '原生CICD解决方案',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/10-创新技术-原生CICD解决方案.mp4',
      },
      {
        name: 'openEuler开源社区',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/12-openEuler开源社区.mp4',
      },
      {
        name: '麒麟软件',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/13-麒麟软件-银河麒麟高级服务器操作系统V10高性能高安全高可用.mp4',
      },
      {
        name: '统信软件',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/14-统信软件-统信服务器操作系统创新生态.mp4',
      },
      {
        name: '麒麟信安',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/15-麒麟信安-openEuler生态多场景应用的优选.mp4',
      },
      {
        name: '超聚变',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/16-超聚变-可信多样性算力操作系统.mp4',
      },
      {
        name: '中科院软件所',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/17-中科院软件所-傲空间 一个真正属于您的数字空间.mp4',
      },
      {
        name: '软通动力',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/18-软通动力-欧拉一站式服务解决方案.mp4',
      },
      {
        name: '润和软件',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/19-润和软件-企业级安全操作系统服务器版.mp4',
      },
      {
        name: '中科创达',
        link: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com:443/openeuler/obsi-openeuler-onlineVideo/20-中科创达-工业分布式软总线智能管理系统.mp4',
      },
    ],
  },
  guest: {
    title: '演讲嘉宾',
    guestListKv: {
      title: '操作系统产业峰会嘉宾',
      guestList: [
        {
          img: niguangnan,
          name: '倪光南 ',
          position: ['中国工程院院士'],
        },
        {
          img: meihong,
          name: '梅宏',
          position: ['中国科学院院士'],
        },
        {
          img: liaoxiangke,
          name: '廖湘科',
          position: ['中国工程院院士'],
        },
        {
          img: wanghuaimin,
          name: '王怀民',
          position: ['中国科学院院士'],
        },
        {
          img: wangtao,
          name: '汪涛',
          position: ['华为常务董事', 'ICT基础设施业务管理委员会主任'],
        },
        {
          img: sunwenlong01,
          name: '孙文龙',
          position: ['开放原子开源基金会', '理事长'],
        },
        {
          img: gaotongqing,
          name: '高同庆',
          position: ['中国移动通信集团', '有限公司副总经理'],
        },
        {
          img: liangbaojun,
          name: '梁宝俊',
          position: ['中国联合网络通信集团有限公司', '副总经理'],
        },
        {
          img: lijun,
          name: '李峻',
          position: ['中国电信集团有限公司', '副总经理'],
        },
        {
          img: jiangdayong01,
          name: '江大勇',
          position: ['openEuler社区', '理事长'],
        },
        {
          img: panyan,
          name: '潘妍',
          position: ['国家工业信息安全发展研究中心', '软件所所长'],
        },
        {
          img: wuyanjun,
          name: '武延军',
          position: ['openEuler社区副理事长', '中国科学院软件研究所副所长'],
        },
        {
          img: baoyungang,
          name: '包云岗',
          position: ['中国科学院', '计算所副所长'],
        },
        {
          img: jimzemlin,
          name: 'Jim Zemlin',
          position: ['Executive Director Linux Foundation'],
        },
        {
          img: priyankasharma,
          name: 'Priyanka Sharma',
          position: ['CNCF General Manager'],
        },
        {
          img: jonathanbryce,
          name: 'Jonathan Bryce',
          position: ['Executive Director, OpenInfra Foundation'],
        },
        {
          img: christophersimmons,
          name: 'Christopher  S. Simmons 博士',
          position: ['OpenHPC TSC Chair'],
        },
        {
          img: mengjianyi,
          name: '孟建熠',
          position: ['平头哥半导体有限公司', '副总裁'],
        },
        {
          img: pengjianying,
          name: '彭剑英',
          position: ['芯来科技', 'CEO'],
        },
        {
          img: xutao,
          name: '徐滔',
          position: ['赛昉科技', '创始人兼CEO'],
        },
        {
          img: zhangxianyi01,
          name: '张先轶',
          position: ['澎峰(北京)科技有限公司', '创始人&CEO'],
        },
        {
          img: fengguanlin01,
          name: '冯冠霖',
          position: ['开放原子开源', '基金会秘书长'],
        },
        {
          img: liujingjuan,
          name: '刘京娟',
          position: ['开放原子开源', '基金会副秘书长'],
        },
        {
          img: qiuchengfeng01,
          name: '邱成锋',
          position: ['openEuler社区', '秘书长'],
        },
        {
          img: xiongwei01,
          name: '熊伟',
          position: ['openEuler社区', '技术委员会委员'],
        },
      ],
    },
    guestListMain: {
      title: 'openEuler Summit 2022主论坛嘉宾',
      guestList: [
        {
          img: sunwenlong,
          name: '孙文龙',
          position: ['开放原子开源基金会', '理事长'],
        },
        {
          img: fengguanlin,
          name: '冯冠霖',
          position: ['开放原子开源基金会', '秘书长'],
        },
        {
          img: jiangdayong,
          name: '江大勇',
          position: ['openEuler社区', '理事长'],
        },
        {
          img: hannaiping,
          name: '韩乃平',
          position: ['openEuler社区副理事长', '麒麟软件有限公司高级副总经理'],
        },
        {
          img: liuwenqing,
          name: '刘文清',
          position: ['湖南麒麟信安科技股份有限公司', '总裁'],
        },
        {
          img: wuyanjun,
          name: '武延军',
          position: ['openEuler社区副理事长', '中国科学院软件研究所副所长'],
        },
        {
          img: zhanglei,
          name: '张磊',
          position: ['统信软件', '高级副总经理、CTO'],
        },
        {
          img: caizhimin,
          name: '蔡志旻',
          position: ['润和软件云计算', '事业部总经理'],
        },
        {
          img: gaopei,
          name: '高培',
          position: ['软通动力信息技术（集团）股份有限公司', '副总裁'],
        },
        {
          img: jiangzhenhua,
          name: '姜振华',
          position: ['超聚变操作系统', '总经理'],
        },
        {
          img: lipeiyuan,
          name: '李培源',
          position: ['中国电信云计算分公司', '产品管理专家'],
        },
        {
          img: zhangshenju,
          name: '张胜举',
          position: ['中国移动云能力中心', 'IaaS产品部副总经理'],
        },
        {
          img: zhongxin,
          name: '钟忻',
          position: ['联通数科云计算', '事业部基础研发部总监'],
        },
        {
          img: yangxiaocheng,
          name: '杨晓骋',
          position: ['沙利文咨询', '合伙人兼董事总经理'],
        },
        {
          img: lizhenglin,
          name: '李震宁',
          position: ['麒麟软件有限公司', '副总裁'],
        },
        {
          img: wanglin,
          name: '王麟',
          position: ['天翼云基础架构事业部', '操作系统方向研发专家'],
        },
        {
          img: zhouyi,
          name: '周毅',
          position: ['湖南麒麟信安科技股份有限公司', '副总裁'],
        },
        {
          img: liushuyuan,
          name: '刘曙元',
          position: ['国能信控互联网技术有限公司', '副总经理'],
        },
        {
          img: zhangshuai,
          name: '张帅',
          position: ['新浪微博', '技术专家'],
        },
        {
          img: qiuchengfeng,
          name: '邱成锋',
          position: ['openEuler社区', '秘书长'],
        },
        {
          img: xiongwei,
          name: '熊伟',
          position: ['openEuler技术委员会委员', '开放原子开源基金会TOC委员'],
        },
        {
          img: wufengguang,
          name: '吴峰光',
          position: ['openEuler技术委员会', '委员'],
        },
      ],
    },
    guestListSub: {
      title: 'openEuler Summit 2022分论坛嘉宾',
      guestList: [
        {
          img: huyadi,
          name: '胡亚弟',
          position: ['天翼云科技有限公司', '技术专家'],
        },
        {
          img: sunshouxin,
          name: '孙守鑫',
          position: ['天翼云科技有限公司', '高级后端开发工程师'],
        },
        {
          img: zengzhaorong,
          name: '曾昭荣',
          position: ['Intel Cloud Software Engineer'],
        },
        {
          img: caopeiqing,
          name: '曹佩庆',
          position: ['统信软件', '研发经理'],
        },
        {
          img: tanggeliang,
          name: '唐葛亮',
          position: ['SUSE Euler OS专家'],
        },
        {
          img: wangkefeng,
          name: '王克锋',
          position: ['华为高级软件工程师'],
        },
        {
          img: qinyungao,
          name: '秦云高',
          position: ['湖南麒麟信安科技股份有限公司', '资深内核开发工程师'],
        },
        {
          img: zhaolei,
          name: '赵磊',
          position: ['江苏润和软件股份有限公司', '专家级工程师'],
        },
        {
          img: shiaichun,
          name: '施爱春',
          position: ['Intel软件工程师'],
        },
        {
          img: xiehaocheng,
          name: '谢昊成',
          position: ['amd工程师'],
        },
        {
          img: danxiaoqiang,
          name: '淡孝强',
          position: ['希姆计算编译工具链', '团队总监'],
        },
        {
          img: chenzhengsheng,
          name: '陈争胜',
          position: ['深圳市遇贤微电子有限公司', '首席架构师'],
        },
        {
          img: tangzhongrui,
          name: '汤中睿',
          position: ['中国移动云能力中心', '软件开发工程师'],
        },
        {
          img: zhangzhibo,
          name: '张智博',
          position: ['SUSE'],
        },
        {
          img: qihao,
          name: '祁浩',
          position: ['中国移动云能力中心', '软件开发工程师'],
        },
        {
          img: liukuo,
          name: '刘阔',
          position: ['麒麟软件有限公司', '高级研发工程师'],
        },
        {
          img: zhoutongqing,
          name: '周同庆',
          position: ['湖南麒麟信安科技股份有限公司', '测试工程师'],
        },
        {
          img: zhukeqian,
          name: '朱科潜',
          position: ['华为企业通信技术有限公司', '软件研发工程师'],
        },
        {
          img: tianlijun,
          name: '田利军',
          position: ['统信软件', '高级研发工程师'],
        },
        {
          img: zhangheng,
          name: '张珩',
          position: ['中国科学院软件研究所', '副研究员'],
        },
        {
          img: guohao,
          name: '郭皓',
          position: ['麒麟软件', '技术专家'],
        },
        {
          img: maoxianglin,
          name: '毛响林',
          position: ['科东（广州）软件科技有限公司', '副总经理'],
        },
        {
          img: liaowei,
          name: '廖卫',
          position: ['湖南麒麟信安科技股份有限公司', '操作系统产品线版本经理'],
        },
        {
          img: zhangxuzhou,
          name: '张旭舟',
          position: ['openEuler', 'RISC-V SIG maintainer'],
        },
        {
          img: chenyahan,
          name: '陆亚涵',
          position: ['软件所智能软件', '研究中心工程师'],
        },
        {
          img: liweiwei,
          name: '李威威',
          position: ['中科院软件研究所', '软件工程师'],
        },
        {
          img: luyan,
          name: '陆言',
          position: ['同济大学', '学生'],
        },
        {
          img: weigang,
          name: '魏刚',
          position: ['openEuler社区', '安全委员会主席'],
        },
        {
          img: xuxiaozhou,
          name: '徐小舟',
          position: ['华为软件工程师'],
        },
        {
          img: dufan,
          name: '杜凡',
          position: ['Intel系统软件架构师'],
        },
        {
          img: zhoulei,
          name: '周磊',
          position: ['华为技术有限公司', '毕昇JDK高级技术专家'],
        },
        {
          img: tianjun,
          name: '田俊',
          position: ['Intel Arch SIG Maintainer'],
        },
        {
          img: lixing,
          name: '李星',
          position: ['龙芯中科技术股份有限公司', '软件工程师'],
        },
        {
          img: yuanlinsi,
          name: '袁林思',
          position: ['深圳云豹智能有限公司', '软件总监'],
        },
        {
          img: wumingchuan,
          name: '伍明川',
          position: ['华为技术有限公司', '高级工程师'],
        },
        {
          img: anchuanxu,
          name: '安传旭',
          position: ['中科院软件所', 'sig-ROS maintainer'],
        },
        {
          img: guozhanxin,
          name: '郭占鑫',
          position: ['上海睿赛德电子科技有限公司', 'RT-Thread 社区负责人'],
        },
        {
          img: niujianwei,
          name: '牛建伟',
          position: ['北京航空航天大学', '教授/博士生导师'],
        },
        {
          img: zhangxianyi,
          name: '张先轶',
          position: ['澎峰科技', 'CEO'],
        },
        {
          img: zhangxiang,
          name: '章翔',
          position: ['中科院软件所工程师'],
        },
        {
          img: wuzhangjin,
          name: '吴章金',
          position: ['儒码科技', 'CEO'],
        },
        {
          img: yangzhao,
          name: '杨昭',
          position: ['麒麟软件有限公司', '高级软件工程师'],
        },
        {
          img: liuheling,
          name: '刘合领',
          position: ['软通动力', '基础软件服务经理'],
        },
        {
          img: zhanghailiang,
          name: '张海亮',
          position: ['超聚变数字技术有限公司', '操作系统架构师'],
        },
        {
          img: lichaoran,
          name: '李超然',
          position: ['openEuler', 'Infra SIG开发者'],
        },
        {
          img: dukaitian,
          name: '杜开田',
          position: ['openEuler兼容性', 'SIG Maintainer'],
        },
        {
          img: zhaolichao,
          name: '赵立超',
          position: ['华为技术有限公司', '人才与服务 sig maintainer'],
        },
        {
          img: sunhailong,
          name: '孙海龙',
          position: ['北京航空航天大学', '教授'],
        },
        {
          img: wangyujie,
          name: '王域杰',
          position: ['北京航空航天大学', '学生'],
        },
        {
          img: zhengzhipeng,
          name: '郑志鹏',
          position: ['openEuler合规', 'sig maintainer/开源管理中心高级工程师'],
        },
        {
          img: xuyuanchong,
          name: '许渊聪',
          position: ['openEuler合规', 'sig maintainer/维信金科合规负责人'],
        },
      ],
    },
  },
  partner: {
    title: '共建单位',
    partnerList: [
      {
        subTitle: '操作系统产业峰会 2022 主办单位',
        logoList: [
          {
            IMG: atom,
            IMG_DARK: atomDark,
          },
          {
            IMG: csia,
            IMG_DARK: csiaDark,
          },
          {
            IMG: ccf,
            IMG_DARK: ccfDark,
          },
          {
            IMG: lvse,
            IMG_DARK: lvseDark,
          },
          {
            IMG: zhongguan,
            IMG_DARK: zhongguanDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 主办单位',
        logoList: [
          {
            IMG: atom,
            IMG_DARK: atomDark,
          },
          {
            IMG: euler,
            IMG_DARK: eulerDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 战略共建单位',
        logoList: [
          {
            IMG: huawei,
            IMG_DARK: huaweiDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 联合共建单位',
        logoList: [
          {
            IMG: qilin,
            IMG_DARK: qilinDark,
          },
          {
            IMG: tongxin,
            IMG_DARK: tongxinDark,
          },
          {
            IMG: kylinsec,
            IMG_DARK: kylinsecDark,
          },
          {
            IMG: fusion,
            IMG_DARK: fusionDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 协办共建单位',
        logoList: [
          {
            IMG: iscas,
            IMG_DARK: iscasDark,
          },
          {
            IMG: stone,
            IMG_DARK: stoneDark,
          },
          {
            IMG: runhe,
            IMG_DARK: runheDark,
          },
          {
            IMG: intel,
            IMG_DARK: intelDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 支持共建单位',
        logoList: [
          {
            IMG: phytium,
            IMG_DARK: phytiumDark,
          },
          {
            IMG: bes,
            IMG_DARK: besDark,
          },
          {
            IMG: intewell,
            IMG_DARK: intewellDark,
          },
          {
            IMG: ysemi,
            IMG_DARK: ysemiDark,
          },
          {
            IMG: tongtech,
            IMG_DARK: tongtechDark,
          },
          {
            IMG: ccb,
            IMG_DARK: ccbDark,
          },
          {
            IMG: shopen,
            IMG_DARK: shopenDark,
          },
          {
            IMG: turbolinux,
            IMG_DARK: turbolinuxDark,
          },
        ],
      },
    ],
  },
  previous: {
    title: '精彩回顾',
    list: [
      {
        name: '湖南欧拉操作系统生态大会',
        link: '/zh/interaction/summit-list/summit2022-changsha/',
        target: '_blank',
      },
      {
        name: 'openEuler Developer Day 2022',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2022/',
        target: '_blank',
      },
      {
        name: 'openEuler Summit 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/summit2021/',
        target: '_blank',
      },
      {
        name: 'openEuler Developer Day 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2021/',
        target: '_blank',
      },
      {
        name: 'openEuler Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/',
        target: '_blank',
      },
      {
        name: 'openEuler Virtual Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/list/',
        target: '_blank',
      },
    ],
  },
};
const tabType = ref(['main', 'main']);
const isLiverShown = ref(0);
const otherTabType = ref([0, 0]);
// 点击周年浮窗
function onEntryClick() {
  router.go('/zh/celebrating/');
}
// 展厅的video 事件
const videoDialog = ref(false);
const videoLink = ref('');
const handleCloseVideo = () => {
  videoDialog.value = false;
  videoLink.value = '';
};
const videoClickBtn = (path: string) => {
  videoLink.value = path;
  videoDialog.value = true;
};
onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
});
</script>
<template>
  <SummitBanner />
  <AppContext>
    <div class="detail">
      <p v-for="item in summitData.detail" :key="item">{{ item }}</p>
    </div>
    <div class="live">
      <h3>{{ summitData.live.title }}</h3>
      <div>
        <OTabs v-model="isLiverShown" class="schedule-tabs">
          <el-tab-pane
            v-for="(item, index) in summitData.live.date"
            :key="index"
            :name="index"
          >
            <template #label>
              <div class="time-tabs">{{ item }}</div>
            </template>
          </el-tab-pane>
        </OTabs>
        <OContainer :level-index="1">
          <ClientOnly>
            <SummitLive
              v-if="isLiverShown === 0"
              :live-data="summitData.live.liveData1"
              class-name="odd2022"
              class="summit-kv-box"
            />
            <SummitLive
              v-if="isLiverShown === 1"
              :live-data="summitData.live.liveData2"
              class-name="odd2022"
              class="summit-box"
            />
          </ClientOnly>
        </OContainer>
      </div>
    </div>
    <div class="agenda">
      <h3>{{ summitData.agenda.title }}</h3>
      <div class="agenda-content">
        <div
          v-for="(item, index) in summitData.agenda.meetingList"
          :key="item.daytime"
          class="agenda-item"
          data-aos="fade-up"
        >
          <h4 class="meeting-title">
            {{ item.daytime }}
          </h4>
          <OTabs v-model="tabType[index]" class="schedule-tabs">
            <el-tab-pane
              v-for="itemList in summitData.agenda.meetingList[0].list"
              :key="itemList.id"
              :name="itemList.id"
            >
              <template #label>
                <div class="time-tabs">
                  {{ itemList.type }}
                </div>
              </template>
            </el-tab-pane>
          </OTabs>
          <OContainer :level-index="1">
            <div
              class="schedule-item"
              :class="{ isShow: tabType[index] === 'main' }"
            >
              <SummitSchedule
                :options="summitData.agenda.meetingList[index].list[0].children"
              />
            </div>
            <div
              class="schedule-item other"
              :class="{ isShow: tabType[index] === 'other' }"
            >
              <OTabs v-model="otherTabType[index]" class="other-tabs">
                <OTabPane
                  v-for="itemList in summitData.agenda.meetingList[index]
                    .list[1].children"
                  :key="itemList.id"
                  :label="itemList.name"
                  :name="itemList.id"
                >
                  <p
                    v-if="index === 0 && !itemList.children"
                    class="other-text"
                  >
                    <IconTime />{{
                      summitData.agenda.meetingList[index].list[1].duration
                    }}
                  </p>
                  <!-- <h4 v-if="index === 0 && itemList.title" class="other-title">
                  主题： {{ itemList.title }}
                </h4> -->
                  <SummitSchedule
                    :options="itemList.children"
                    :detail="itemList.detail"
                  />
                </OTabPane>
              </OTabs>
            </div>
          </OContainer>
        </div>
      </div>
    </div>
    <div class="exhibition">
      <h3>{{ summitData.exhibition.title }}</h3>
      <div class="exhibition-img">
        <img :src="exhibitionImg" alt="" />
        <a
          v-for="item in summitData.exhibition.linkList"
          :key="item.name"
          href="#"
          :name="item.name"
          @click="videoClickBtn(item.link)"
        ></a>
        <div v-if="videoDialog" class="video-box">
          <ODialog
            v-model="videoDialog"
            :before-close="handleCloseVideo"
            :show-close="false"
            lock-scroll
            close-on-press-escape
            close-on-click-modal
            destroy-on-close
            width="800px"
          >
            <div class="video-center">
              <video class="exhibition-video" width="100%" controls autoplay>
                <source :src="videoLink" />
              </video>
            </div>
          </ODialog>
        </div>
      </div>
    </div>
    <div class="guest">
      <h3 class="guest-title">{{ summitData.guest.title }}</h3>
      <h4>{{ summitData.guest.guestListKv.title }}</h4>
      <SummitGuests
        :lecturer-list="summitData.guest.guestListKv.guestList"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
      <h4>{{ summitData.guest.guestListMain.title }}</h4>
      <SummitGuests
        :lecturer-list="summitData.guest.guestListMain.guestList"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
      <h4>{{ summitData.guest.guestListSub.title }}</h4>
      <SummitGuests
        :lecturer-list="summitData.guest.guestListSub.guestList"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
    </div>
    <div class="partner">
      <h3 class="partner-title">
        {{ summitData.partner.title }}
      </h3>
      <div
        v-for="item in summitData.partner.partnerList"
        :key="item.subTitle"
        class="partner-item"
      >
        <h4>{{ item.subTitle }}</h4>
        <LinkPanel
          :link-list="item.logoList"
          :theme="commonStore.theme === 'light' ? 'light' : 'dark'"
        ></LinkPanel>
      </div>
    </div>
    <div class="previous" data-aos="fade-up">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in summitData.previous.list"
          :key="item.link"
          :href="item.link"
          :target="item.target"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="celebrating-img" @click="onEntryClick">
      <img
        :src="celebratingEntryImg"
        alt=""
        title="下载体验openEuler&#10;赢开源三周年纪念礼包！"
      />
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.dark img,
.dark .banner {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.detail {
  p {
    font-size: var(--e-font-size-h6);
    line-height: var(--e-line-height-h6);
    color: var(--e-color-text1);
    font-weight: 300;
    text-align: justify;
    text-indent: 2em;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
    & + p {
      margin-top: var(--e-spacing-h6);
    }
  }
}
.live {
  margin-top: var(--e-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h2);
  }
  h3 {
    text-align: center;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    font-weight: 300;
    margin-bottom: var(--e-spacing-h2);
    @media (max-width: 767px) {
      margin-bottom: var(--e-spacing-h4);
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  .live-room {
    margin-top: var(--e-spacing-h2);
    @media (max-width: 767px) {
      margin-top: var(--e-spacing-h4);
    }
  }
  :deep(.o-container-level1) {
    background-color: transparent;
    box-shadow: none;
  }
  :deep(.el-tabs__item) {
    padding: 0 !important;
  }
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;
  }
  :deep(.el-tabs__nav) {
    margin: 0 auto;
  }
  :deep(.el-tabs__active-bar) {
    display: none;
  }
  .time-tabs {
    display: inline-block;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--e-color-border2);
    color: var(--e-color-text1);
    width: 120px;
    text-align: center;
    background: var(--e-color-bg2);
    font-size: var(--e-font-size-text);
    line-height: 38px;
    padding: 0 var(--e-spacing-h5);
  }
  .is-active .time-tabs {
    color: #fff;
    background: var(--e-color-brand1);
    border-color: var(--e-color-brand2);
  }
  .summit-kv-box {
    :deep(.live-room-web-itembox.odd2022) {
      grid-template-columns: repeat(5, 1fr);
      .link-main {
        grid-column: 1/6;
      }
      .link + .link {
        &.link-active {
          background: url(@/assets/category/summit/summit2022/middle-active-bg.png)
            no-repeat center/cover;
        }
      }
    }
  }
  .summit-box {
    :deep(.live-room-web-itembox.odd2022) {
      grid-template-columns: repeat(7, 1fr);
      .link-main {
        grid-column: 1/8;
      }
      .link + .link {
        &.link-active {
          background: url(@/assets/category/summit/summit2022/small-active-bg.png)
            no-repeat center/cover;
        }
      }
    }
  }
}
.agenda {
  margin-top: var(--e-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h2);
  }
  h3 {
    text-align: center;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  .agenda-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .agenda-item {
      margin-top: var(--e-spacing-h2);
      width: 100%;
      @media (max-width: 767px) {
        margin-top: var(--e-spacing-h4);
      }
      &:nth-of-type(1) {
        .el-tabs__active-bar {
          display: none;
        }
      }
      .meeting-title {
        font-weight: 400;
        color: var(--e-color-text1);
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
        text-align: center;
        margin-bottom: 24px;
        @media (max-width: 767px) {
          margin-bottom: 12px;
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      .schedule-tabs {
        text-align: center;
        margin-top: 24px;
        :deep(.el-tabs__nav-wrap) {
          display: flex;
          justify-content: center;

          .el-tabs__nav {
            display: inline-flex;
            .el-tabs__active-bar {
              display: none;
            }
            .el-tabs__item {
              padding: 0;
            }
          }
        }
        .time-tabs {
          display: inline-block;
          margin: 0 0 24px;
          cursor: pointer;
          border: 1px solid var(--e-color-border2);
          color: var(--e-color-text1);
          width: 120px;
          text-align: center;
          background: var(--e-color-bg2);
          font-size: var(--e-font-size-text);
          line-height: 38px;
          padding: 0 var(--e-spacing-h5);
          @media (max-width: 1100px) {
            font-size: var(--e-font-size-tip);
            padding: 0 var(--e-spacing-h6);
          }
        }

        .is-active .time-tabs {
          color: #fff;
          background: var(--e-color-brand1);
          border-color: var(--e-color-brand2);
        }
        .other-tabs {
          margin-bottom: 24px;
          :deep(.el-tabs__nav) {
            @media (max-width: 1100px) {
              line-height: 44px;
            }
          }
          :deep(.el-tabs__header) {
            text-align: center;
            .el-tabs__item {
              @media (max-width: 1100px) {
                font-size: var(--e-font-size-tip);
                line-height: var(--e-line-height-tip);
              }
            }
          }
        }
      }
      .schedule-item {
        display: none;
        padding: 24px;
        @media (max-width: 1100px) {
          padding: 16px;
        }
        &.isShow {
          display: block;
        }
        &.other {
          :deep(.el-tabs__nav-scroll) {
            display: flex;
            justify-content: center;
          }
          :deep(.el-tabs__content) {
            overflow: visible;
          }
          :deep(.el-tabs__nav) {
            @media (max-width: 1100px) {
              line-height: 44px;
            }
          }
          .other-text {
            margin: 24px auto 0 auto;
            color: var(--e-color-text1);
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h7);
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            @media (max-width: 1100px) {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              margin: 16px 0;
            }
            svg {
              margin-right: var(--e-spacing-h8);
            }
          }
          .other-title {
            margin: 24px auto;
            color: var(--e-color-text1);
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h7);
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: normal;
            @media (max-width: 1100px) {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              margin: 16px 0;
            }
          }
          :deep(.data-list) {
            .detail {
              display: none;
            }
            .show-detail {
              .detail {
                display: block;
              }
            }
          }
          :deep(.desc) {
            cursor: pointer;
          }

          // 消除分论坛分类的选中状态 start
          // :deep(.o-tabs) {
          //   &.el-tabs .el-tabs__nav-wrap .el-tabs__item {
          //     &.is-active {
          //       color: var(--e-color-text1);
          //     }
          //     &.is-top {
          //       &:hover {
          //         color: var(--e-color-text1);
          //         cursor: default;
          //       }
          //     }
          //   }

          // }
          // 消除分论坛分类的选中状态 end
        }
        :deep(.detail) {
          display: none;
        }
      }
    }
  }
}
.exhibition {
  width: 100%;
  margin-top: var(--e-spacing-h1);
  position: relative;
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h2);
  }
  h3 {
    margin-bottom: 40px;
    text-align: center;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      margin-bottom: 24px;
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  .exhibition-img {
    position: relative;
    img {
      width: 100%;
      @media (max-width: 1416px) {
        height: 52.2vw;
      }
    }
    a {
      position: absolute;
      &:nth-of-type(1) {
        top: 0;
        width: 15%;
        height: 7%;
        left: 10%;
        @media screen and (max-width: 1416px) {
          top: 0.5vw;
          width: 14%;
          height: 2.5vw;
          left: 10%;
        }
      }
      &:nth-of-type(2) {
        top: 46%;
        width: 11%;
        height: 4%;
        left: 29%;
        @media screen and (max-width: 1416px) {
          top: 24.1vw;
          width: 11%;
          height: 2vw;
          left: 29%;
        }
      }
      &:nth-of-type(3) {
        top: 35%;
        width: 10%;
        height: 4%;
        left: 49%;
        @media screen and (max-width: 1416px) {
          top: 18.1vw;
          width: 10%;
          height: 2vw;
          left: 49%;
        }
      }
      &:nth-of-type(4) {
        top: 22%;
        width: 12%;
        height: 4%;
        left: 75.6%;
        @media screen and (max-width: 1416px) {
          top: 11.5vw;
          width: 11%;
          height: 2vw;
          left: 76%;
        }
      }
      &:nth-of-type(5) {
        top: 22%;
        width: 16%;
        height: 4%;
        left: 58.2%;
        @media screen and (max-width: 1416px) {
          top: 11.5vw;
          width: 16%;
          height: 2vw;
          left: 58%;
        }
      }
      &:nth-of-type(6) {
        top: 41%;
        width: 12%;
        height: 4%;
        left: 8%;
        @media screen and (max-width: 1416px) {
          top: 21.4vw;
          width: 12%;
          height: 2vw;
          left: 8%;
        }
      }
      &:nth-of-type(7) {
        top: 25%;
        width: 12%;
        height: 4%;
        left: 30%;
        @media screen and (max-width: 1416px) {
          top: 13.1vw;
          width: 12%;
          height: 2vw;
          left: 30%;
        }
      }
      &:nth-of-type(8) {
        top: 0.6%;
        width: 10%;
        height: 4%;
        left: 51%;
        @media screen and (max-width: 1416px) {
          top: 0.1vw;
          width: 9%;
          height: 2.4vw;
          left: 51.6%;
        }
      }
      &:nth-of-type(9) {
        top: 0.6%;
        width: 11%;
        height: 4%;
        left: 32.6%;
        @media screen and (max-width: 1416px) {
          top: 0.1vw;
          width: 12%;
          height: 2.4vw;
          left: 31.6%;
        }
      }
      &:nth-of-type(10) {
        top: 0.6%;
        width: 13%;
        height: 4%;
        left: 67.6%;
        @media screen and (max-width: 1416px) {
          top: 0.1vw;
          width: 13%;
          height: 2.4vw;
          left: 67.6%;
        }
      }
      &:nth-of-type(11) {
        top: 58.6%;
        width: 13%;
        height: 4%;
        left: 73.6%;
        @media screen and (max-width: 1416px) {
          top: 30.6vw;
          width: 12%;
          height: 2vw;
          left: 74%;
        }
      }
      &:nth-of-type(12) {
        top: 66.6%;
        width: 17%;
        height: 9%;
        left: 17.6%;
        @media screen and (max-width: 1416px) {
          top: 35.1vw;
          width: 15%;
          height: 4vw;
          left: 18.4%;
        }
      }
      &:nth-of-type(13) {
        top: 66.6%;
        width: 17%;
        height: 9%;
        left: 37.6%;
        @media screen and (max-width: 1416px) {
          top: 35.1vw;
          width: 16%;
          height: 4vw;
          left: 38%;
        }
      }
      &:nth-of-type(14) {
        top: 66.6%;
        width: 17%;
        height: 9%;
        left: 57.6%;
        @media screen and (max-width: 1416px) {
          top: 35.1vw;
          width: 16%;
          height: 4vw;
          left: 58.4%;
        }
      }
      &:nth-of-type(15) {
        top: 66.6%;
        width: 17%;
        height: 9%;
        left: 77.6%;
        @media screen and (max-width: 1416px) {
          top: 35.1vw;
          width: 16%;
          height: 4vw;
          left: 78.4%;
        }
      }
      &:nth-of-type(16) {
        top: 82.6%;
        width: 17%;
        height: 9%;
        left: 16.6%;
        @media screen and (max-width: 1416px) {
          top: 43.3vw;
          width: 16%;
          height: 4vw;
          left: 17.4%;
        }
      }
      &:nth-of-type(17) {
        top: 82.6%;
        width: 17%;
        height: 9%;
        left: 37.6%;
        @media screen and (max-width: 1416px) {
          top: 43.3vw;
          width: 16%;
          height: 4vw;
          left: 38%;
        }
      }
      &:nth-of-type(18) {
        top: 82.6%;
        width: 17%;
        height: 9%;
        left: 57.6%;
        @media screen and (max-width: 1416px) {
          top: 43.3vw;
          width: 16%;
          height: 4vw;
          left: 58.4%;
        }
      }
      &:nth-of-type(19) {
        top: 82.6%;
        width: 17%;
        height: 9%;
        left: 77.6%;
        @media screen and (max-width: 1416px) {
          top: 43.3vw;
          width: 16%;
          height: 4vw;
          left: 78.4%;
        }
      }
    }
    .video-box {
      :deep(.el-dialog__header) {
        display: none;
      }
      :deep(.el-dialog__body) {
        padding: 0;
      }
      .exhibition-video {
        display: block;
        margin: 0 auto;
        width: 100%;
      }
      :deep(.el-dialog) {
        @media screen and (max-width: 875px) {
          width: 90% !important;
        }
      }
    }
  }
}
.guest {
  margin-top: var(--e-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h2);
  }
  h3 {
    text-align: center;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  h4 {
    margin-top: 20px;
    font-size: var(--e-font-size-h5);
    line-height: var(--e-line-height-h5);
    color: var(--e-color-text1);
    font-weight: 400;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      margin-top: var(--e-spacing-h5);
    }
  }
}
.partner {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }
  h3 {
    text-align: center;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  .partner-item {
    margin-top: var(--e-spacing-h2);
    @media screen and (max-width: 768px) {
      margin-top: var(--e-spacing-h4);
    }
    &:nth-of-type(1) {
      margin-top: 20px;
      @media screen and (max-width: 768px) {
        margin-top: var(--e-spacing-h5);
      }
    }
    &:nth-of-type(2) {
      .picture-panel {
        max-width: 702px;
        grid-template-columns: repeat(2, minmax(82px, 1fr));
      }
    }
    &:nth-of-type(3) {
      .picture-panel {
        max-width: 351px;
        grid-template-columns: repeat(1, minmax(82px, 1fr));
        @media screen and (max-width: 650px) {
          max-width: 100%;
        }
        :deep(a) {
          @media screen and (max-width: 650px) {
            width: 50%;
            margin: 0 auto;
          }
        }
      }
    }
    &:nth-of-type(1),
    &:nth-of-type(4),
    &:nth-of-type(5),
    &:nth-of-type(6) {
      .picture-panel {
        @media screen and (max-width: 1416px) {
          max-width: 1053px;
          grid-template-columns: repeat(3, minmax(82px, 1fr));
        }
        @media screen and (max-width: 768px) {
          grid-template-columns: repeat(2, minmax(82px, 1fr));
        }
      }
    }
    h4 {
      font-size: var(--e-font-size-h5);
      line-height: var(--e-line-height-h5);
      color: var(--e-color-text1);
      font-weight: 400;
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }
    .picture-panel {
      margin-top: var(--e-spacing-h4);
      margin-left: auto;
      margin-right: auto;
      @media screen and (max-width: 768px) {
        margin-top: var(--e-spacing-h5);
      }
      :deep(a) {
        cursor: default;
      }
    }
  }
}
.previous {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--e-color-text1);
      margin-right: var(--e-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        margin-right: var(--e-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--e-spacing-h3);
    display: flex;
    width: 318px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      width: 172px;
      margin-top: var(--e-spacing-h6);
    }
    a {
      font-size: var(--e-font-size-h6);
      line-height: var(--e-line-height-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
      & + a {
        margin-top: var(--e-spacing-h4);
        @media screen and (max-width: 768px) {
          margin-top: var(--e-spacing-h8);
        }
      }
    }
  }
}
.celebrating-img {
  position: fixed;
  left: 12px;
  bottom: 120px;
  cursor: pointer;
  z-index: 10;
  img {
    height: 79px;
    @media screen and (max-width: 768px) {
      height: 59px;
    }
  }
}
</style>
