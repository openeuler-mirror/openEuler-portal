<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
  OBreadcrumb,
  OBreadcrumbItem,
  OTag,
  OIcon,
  ODivider,
  OTable,
  OButton,
  OLink,
  ODialog,
  OPopover,
  OScroller,
} from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import IconSecurityLevel from '~icons/security/icon-security-level.svg';
import IconFile from '~icons/app-new/icon-file.svg';

import { getCveDetail, getAffectedProduct } from '~@/api/api-security';
import type {
  CveDetailCvssT,
  AffectProductT,
} from '@/shared/@types/type-support';

import safetyContent from '#content/security/safety-bulletin';

const typeMap = new Map(
  safetyContent.zh.type_map.map((item) => {
    const en = safetyContent.en.type_map.find((e) => e.key === item.key);
    return [item.key, { value: item.value, label: { zh: item.label, en: en?.label ?? item.label }, score: item.score }];
  })
);
import cveContent from '#content/security/cve';

import { changeTimeStamp } from '~@/utils/common';

import { useRoute } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

interface CvssItem {
  cate?: string;
  // 括号内的限定语（如 Vulnerable System），展示时独立成行
  cateSub?: string;
  NVD?: string;
  openEuler?: string;
}

const route = useRoute();
const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const cveData = computed(() => cveContent[locale.value]);
const statusMap = computed(() => {
  const map = new Map();
  cveData.value.status_map.forEach((item) => {
    map.set(item.key, {
      value: item.value,
      label: { zh: item.label, en: item.label },
      tag: { zh: item.tag, en: item.tag },
    });
  });
  return map;
});
const glossaryList = computed(() =>
  cveData.value.glossary.map((item) => ({
    status: item.status,
    description: { zh: item.description, en: item.description },
    listZh: item.list,
    listEn: item.list,
  }))
);

const cveId = ref('');
const packageName = ref('');

const cveDetailData = ref<CveDetailCvssT>();
const affectedProductList = ref<AffectProductT[]>([]);
const cvssList = ref<CvssItem[]>([]);
// openEuler 侧评分：按 CVSS 展示版本取值（见 buildCvssData），页头评分展示与安全等级分级共用，
// 保证与指标表「CVSS评分」行一致，而非只读 v3 字段 cvsssCoreOE
const oeScore = ref('');

// -------------------- CVSS 指标表头 --------------------
const columns = [
  { label: '', key: 'cate' },
  { label: 'NVD', key: 'NVD' },
  { label: 'openEuler', key: 'openEuler' },
];

// CVSS v3.1 向量取值映射（缩写 → 全称，依据 FIRST.org CVSS v3.1 规范）
const V3_VALUE_MAP: Record<string, Record<string, string>> = {
  AV: { N: 'Network', A: 'Adjacent', L: 'Local', P: 'Physical' },
  AC: { L: 'Low', H: 'High' },
  PR: { N: 'None', L: 'Low', H: 'High' },
  UI: { N: 'None', R: 'Required' },
  S: { U: 'Unchanged', C: 'Changed' },
  C: { H: 'High', L: 'Low', N: 'None' },
  I: { H: 'High', L: 'Low', N: 'None' },
  A: { H: 'High', L: 'Low', N: 'None' },
};

// CVSS v4.0 向量取值映射（依据 FIRST.org CVSS v4.0 规范）
// 与 v3 的差异：新增 AT（None/Present）；UI 扩展为 None/Passive/Active；
// 以 VC/VI/VA + SC/SI/SA 取代 v3 的 C/I/A 与 Scope
const V4_VALUE_MAP: Record<string, Record<string, string>> = {
  AV: { N: 'Network', A: 'Adjacent', L: 'Local', P: 'Physical' },
  AC: { L: 'Low', H: 'High' },
  AT: { N: 'None', P: 'Present' },
  PR: { N: 'None', L: 'Low', H: 'High' },
  UI: { N: 'None', P: 'Passive', A: 'Active' },
  VC: { H: 'High', L: 'Low', N: 'None' },
  VI: { H: 'High', L: 'Low', N: 'None' },
  VA: { H: 'High', L: 'Low', N: 'None' },
  SC: { H: 'High', L: 'Low', N: 'None' },
  SI: { H: 'High', L: 'Low', N: 'None' },
  SA: { H: 'High', L: 'Low', N: 'None' },
};

// CVSS v4 指标行定义（按官方 CVSS v4.0 标准，key 为向量串中的指标缩写）
const V4_ROWS: Array<{ label: string; key: string }> = [
  { label: 'Attack Vector', key: 'AV' },
  { label: 'Attack Complexity', key: 'AC' },
  { label: 'Attack Requirements', key: 'AT' },
  { label: 'Privileges Required', key: 'PR' },
  { label: 'User Interaction', key: 'UI' },
  { label: 'Confidentiality (Vulnerable System)', key: 'VC' },
  { label: 'Integrity (Vulnerable System)', key: 'VI' },
  { label: 'Availability (Vulnerable System)', key: 'VA' },
  { label: 'Confidentiality (Subsequent System)', key: 'SC' },
  { label: 'Integrity (Subsequent System)', key: 'SI' },
  { label: 'Availability (Subsequent System)', key: 'SA' },
];

// CVSS v3 指标行定义
const V3_ROWS: Array<{ label: string; key: string }> = [
  { label: 'Attack Vector', key: 'AV' },
  { label: 'Attack Complexity', key: 'AC' },
  { label: 'Privileges Required', key: 'PR' },
  { label: 'User Interaction', key: 'UI' },
  { label: 'Scope', key: 'S' },
  { label: 'Confidentiality', key: 'C' },
  { label: 'Integrity', key: 'I' },
  { label: 'Availability', key: 'A' },
];

// 各版本行集包含的指标键，用于判断某列 CVSS 版本是否具备该指标
// （如 v4 列没有 Scope——v4 向量中的 S 是 Safety，不能当作 Scope 展示）
const V3_ROW_KEYS = new Set(V3_ROWS.map(({ key }) => key));
const V4_ROW_KEYS = new Set(V4_ROWS.map(({ key }) => key));

// 判断字段是否有有效值（非空且非 N/A）
const isValidVal = (val?: string | null) =>
  !!val && val.trim() !== '' && val.trim().toUpperCase() !== 'N/A';

// 去掉向量串开头的评分前缀（"9.8 CVSS:4.0/..." → "CVSS:4.0/..."）
const stripScore = (vector?: string) =>
  (vector ?? '').trim().replace(/^\d+(?:\.\d+)?\s+/, '');

// 解析向量串为指标键值对，兼容 "7.5 CVSS:4.0/AV:N/..."、"CVSS:4.0/AV:N/..."、"AV:N/..." 格式
const parseVector = (vector?: string) => {
  const metrics: Record<string, string> = {};
  const str = stripScore(vector).replace(/^CVSS:\d+(?:\.\d)?\//, '');
  if (!str) return metrics;
  str.split('/').forEach((part) => {
    const idx = part.indexOf(':');
    if (idx > 0) {
      const key = part.slice(0, idx).trim();
      const value = part.slice(idx + 1).trim();
      if (/^[A-Z]{1,2}$/.test(key) && value) {
        metrics[key] = value;
      }
    }
  });
  return metrics;
};

// 提取向量串开头的分数（如 "7.5 AV:N/..." 中的 7.5）
const extractScore = (vector?: string) => {
  if (!vector) return '';
  const match = vector.trim().match(/^(\d+(?:\.\d+)?)\s/);
  return match ? match[1] : '';
};

// 指标单元格取值：该列 CVSS 版本不包含的指标留空（由表格渲染为占位符），
// 映射不到全称时回退显示原始缩写
const metricCell = (
  metrics: Record<string, string>,
  key: string,
  valueMap: Record<string, Record<string, string>>,
  rowKeys: Set<string>
) => {
  if (!rowKeys.has(key)) return '';
  const abbr = metrics[key];
  if (!abbr) return '';
  return valueMap[key]?.[abbr] ?? abbr;
};

// 评分取值：优先取接口分数字段，缺失时回退解析向量串前缀
const scoreOf = (useV4: boolean, v4Score?: string, v3Score?: string, vector?: string) =>
  useV4
    ? isValidVal(v4Score)
      ? v4Score
      : extractScore(vector)
    : isValidVal(v3Score)
      ? v3Score
      : extractScore(vector);

// 拆分指标行标签：主标签与括号限定语分字段存放，
// 由模板将限定语渲染为固定的第二行，避免在括号内随意断行（如 Integrity (Vulnerable / System)）
const splitMetricLabel = (label: string): Pick<CvssItem, 'cate' | 'cateSub'> => {
  const idx = label.lastIndexOf(' (');
  return idx === -1
    ? { cate: label }
    : { cate: label.slice(0, idx), cateSub: label.slice(idx + 2, -1) };
};

// -------------------- 组装 CVSS 指标数据（表格行 + 页头评分） --------------------
// 全部指标值均由 CVSSResult 向量串映射得到（v3/v4 各自的官方取值映射表）；
// 展示版本优先级：1. 双方都有 v3 → 统一取 v3；2. 否则双方都有 v4 → 统一取 v4；
// 3. 其余情况各列优先 v3、没有 v3 再取 v4；
// v4 与 v3 数据同表展示时追加 v3 特有行（Scope/C/I/A，不区分脆弱/后续系统），
// 各列严格按自身 CVSS 版本填充，对侧无法回答的行显示占位符，不做任何跨版本语义换算；
// openEuler 侧选定评分同时返回给页头（评分展示与安全等级分级共用），
// 避免页头只读 v3 字段 cvsssCoreOE、在仅有 v4 数据时与表格评分互相矛盾
const buildCvssData = (detail?: CveDetailCvssT): { rows: CvssItem[]; oeScore: string } => {
  if (!detail) return { rows: [], oeScore: '' };
  const cvssResult = detail.CVSSResult ?? { NVDV3: '', NVDV4: '', OEV3: '', OEV4: '' };
  // 各数据源版本可用性：该版本的向量串或评分字段任一有效即视为有该版本数据
  const hasNvdV3 = isValidVal(cvssResult.NVDV3) || isValidVal(detail.cvsssCoreNVD);
  const hasOeV3 = isValidVal(cvssResult.OEV3) || isValidVal(detail.cvsssCoreOE);
  const hasNvdV4 =
    isValidVal(cvssResult.NVDV4) || isValidVal(detail.v4VectorNVD) || isValidVal(detail.v4_scorenvd);
  const hasOeV4 =
    isValidVal(cvssResult.OEV4) || isValidVal(detail.v4VectorOE) || isValidVal(detail.v4_scoreoe);

  // 两列展示版本按优先级统一（见上方注释），任一列可能为此放弃自己更全的版本
  const bothV3 = hasNvdV3 && hasOeV3;
  const bothV4 = hasNvdV4 && hasOeV4;
  const nvdUseV4 = !bothV3 && (bothV4 || (!hasNvdV3 && hasNvdV4));
  const oeUseV4 = !bothV3 && (bothV4 || (!hasOeV3 && hasOeV4));

  // 各列展示的向量串
  const nvdVector = nvdUseV4 ? cvssResult.NVDV4 || detail.v4VectorNVD : cvssResult.NVDV3;
  const oeVector = oeUseV4 ? cvssResult.OEV4 || detail.v4VectorOE : cvssResult.OEV3;

  // 各列按自身 CVSS 版本选择取值映射与可填充行键，不做跨版本语义换算
  const nvdMetrics = parseVector(nvdVector);
  const oeMetrics = parseVector(oeVector);
  const nvdValueMap = nvdUseV4 ? V4_VALUE_MAP : V3_VALUE_MAP;
  const oeValueMap = oeUseV4 ? V4_VALUE_MAP : V3_VALUE_MAP;
  const nvdRowKeys = nvdUseV4 ? V4_ROW_KEYS : V3_ROW_KEYS;
  const oeRowKeys = oeUseV4 ? V4_ROW_KEYS : V3_ROW_KEYS;

  // 行集：任一列展示 v4 时以 v4 行集为主，仍有列展示 v3 数据时追加 v3 特有行（Scope/C/I/A）；
  // v3 列只填 v3 行、v4 列只填 v4 行，其余行由表格渲染占位符
  const nvdShowsV3 = !nvdUseV4 && hasNvdV3;
  const oeShowsV3 = !oeUseV4 && hasOeV3;
  const v3OnlyRows = V3_ROWS.filter(({ key }) => !V4_ROW_KEYS.has(key));
  const metricRows = !(nvdUseV4 || oeUseV4)
    ? V3_ROWS
    : nvdShowsV3 || oeShowsV3
      ? [...V4_ROWS, ...v3OnlyRows]
      : V4_ROWS;

  const nvdScore = scoreOf(nvdUseV4, detail.v4_scorenvd, detail.cvsssCoreNVD, nvdVector);
  const oeScore = scoreOf(oeUseV4, detail.v4_scoreoe, detail.cvsssCoreOE, oeVector);
  const rows: CvssItem[] = [
    {
      cate: t('cve.cvssScore'),
      NVD: nvdScore,
      openEuler: oeScore,
    },
    {
      cate: t('cve.vector'),
      NVD: stripScore(nvdVector),
      openEuler: stripScore(oeVector),
    },
  ];

  metricRows.forEach(({ label, key }) => {
    rows.push({
      ...splitMetricLabel(label),
      NVD: metricCell(nvdMetrics, key, nvdValueMap, nvdRowKeys),
      openEuler: metricCell(oeMetrics, key, oeValueMap, oeRowKeys),
    });
  });
  return { rows, oeScore };
};

// -------------------- 获取CVSS 指标数据 --------------------
const getCveDetailInfo = (cveId: string, packageName: string) => {
  getCveDetail(cveId, packageName).then((res: any) => {
    cveDetailData.value = res.result;
    const cvssData = buildCvssData(res.result);
    cvssList.value = cvssData.rows;
    oeScore.value = cvssData.oeScore;
  });
};

// 严重级别列表显示（入参为按展示版本选定的评分，见 oeScore）
const levelShow = (score: string) => {
  const val = parseFloat(score);
  if (val >= 9.0) {
    return {
      label: typeMap.get('Critical')?.label[locale.value],
      calss: 'critical',
    };
  } else if (val >= 7.0) {
    return {
      label: typeMap.get('High')?.label[locale.value],
      calss: 'high',
    };
  } else if (val >= 4.0) {
    return {
      label: typeMap.get('Medium')?.label[locale.value],
      calss: 'medium',
    };
  } else if (val > 0) {
    return {
      label: typeMap.get('Low')?.label[locale.value],
      calss: 'low',
    };
  }
  return {
    label: locale.value === 'zh' ? '无' : 'N/A',
    calss: 'norating',
  };
};

// -------------------- 影响产品表头 --------------------
const columnsProduct = [
  { label: t('cve.product'), key: 'productName' },
  { label: t('cve.package'), key: 'packageName' },
  { label: t('cve.status'), key: 'status' },
  { label: t('cve.analysis'), key: 'reason' },
  { label: t('cve.securityBulletin'), key: 'securityNoticeNo' },
  { label: t('cve.releaseDate'), key: 'releaseTime' },
  { label: t('cve.update'), key: 'updateTime' },
];

// -------------------- 获取影响产品的数据--------------------
const getAffectedProductInfo = (cveId: string, packageName: string) => {
  getAffectedProduct(cveId, packageName).then((res: any) => {
    affectedProductList.value = res.result;
  });
};

// -------------------- CVE术语说明弹窗--------------------
const glossaryVisible = ref(false);
const columnsGlossary = [
  { label: t('cve.bugStatus'), key: 'status' },
  { label: t('cve.bugDesc'), key: 'description' },
];

// -------------------- hover显示详细信息--------------------
const reasonHover = (val: string) => {
  const item = glossaryList.value.find((e) => {
    return (
      e.status.replace(/[-_\s]/g, ' ').toLowerCase() ===
      val.replace(/[-_\s]/g, ' ').toLowerCase()
    );
  });
  return item?.description[locale.value];
};

onMounted(() => {
  const i1 = window.location.href.indexOf('=');
  const i2 = window.location.href.lastIndexOf('&');
  const i3 = window.location.href.lastIndexOf('=');
  cveId.value = window.location.href.substring(i1 + 1, i2);
  packageName.value = window.location.href.substring(i3 + 1);
  getCveDetailInfo(cveId.value, packageName.value);
  getAffectedProductInfo(cveId.value, packageName.value);
});
</script>

<template>
  <div class="cve-detail">
    <ContentWrapper>
      <OBreadcrumb v-if="!lePadV">
        <OBreadcrumbItem :href="route.path.replace('detail/', '')">{{
          t('cve.cve')
        }}</OBreadcrumbItem>
        <OBreadcrumbItem>{{ cveDetailData?.cveId }}</OBreadcrumbItem>
      </OBreadcrumb>
      <div class="banner">
        <div v-if="cveDetailData?.cveId" class="title-box">
          <span class="title">{{ cveDetailData?.cveId }}</span>
          <OTag
            class="type-tag"
            :class="[levelShow(oeScore).calss]"
            :style="{ '--tag-radius': '4px' }"
          >
            <OIcon> <IconSecurityLevel /></OIcon>
            {{ levelShow(oeScore).label }}
          </OTag>
        </div>
        <div class="text-box">
          <span class="gray">{{ t('cve.cvssScore') }}:</span>
          <span>{{ oeScore || 'N/A' }}</span>
        </div>
        <div class="time text-box">
          <span>
            {{ changeTimeStamp(new Date(cveDetailData?.createTime).getTime()) }}
            {{ t('safetyBulletin.release') }}
          </span>
          <ODivider direction="v" />
          <span>
            {{ changeTimeStamp(new Date(cveDetailData?.updateTime).getTime()) }}
            {{ t('safetyBulletin.update') }}
          </span>
        </div>
      </div>
      <div class="content">
        <div class="info-item info-overview">
          <p class="label">{{ t('cve.synopsis') }}</p>
          <p class="desc">{{ cveDetailData?.summary }}</p>
        </div>
        <div class="info-item">
          <p class="label">{{ t('cve.metrics') }}</p>
          <OScroller
            class="norm-scroller"
            show-type="always"
            size="small"
            disabled-y
          >
            <OTable
              :columns="columns"
              :data="cvssList"
              border="row-frame"
              class="cvss-table"
            >
              <template #td_cate="{ row }">
                <span class="metric-label">{{ row.cate }}</span>
                <span v-if="row.cateSub" class="metric-label-sub"
                  >({{ row.cateSub }})</span
                >
              </template>
            </OTable>
          </OScroller>
        </div>
        <div class="info-item">
          <div class="label-box">
            <p class="label">{{ t('cve.affectedProduct') }}</p>
            <OButton
              variant="outline"
              color="normal"
              size="medium"
              class="glossary-btn"
              @click="glossaryVisible = true"
            >
              <template #icon>
                <OIcon><IconFile /></OIcon>
              </template>
              <span>{{ t('cve.glossary') }}</span>
            </OButton>
          </div>
          <OScroller
            class="product-scroller"
            show-type="always"
            size="small"
            disabled-y
          >
            <OTable
              :columns="columnsProduct"
              :data="affectedProductList"
              border="row-frame"
              class="product-table"
            >
              <template #td_securityNoticeNo="{ row }">
                <OLink
                  color="primary"
                  variant="text"
                  :href="`/${locale}/security/security-bulletins/detail/?id=${row.securityNoticeNo}`"
                  >{{ row.securityNoticeNo }}</OLink
                >
              </template>
              <template #td_status="{ row }">
                <OPopover
                  v-if="!lePadV"
                  position="top"
                  :wrap-class="
                    isDark ? 'status-popover-dark' : 'status-popover'
                  "
                >
                  <template #target>
                    <OTag class="status-tag" :style="{ '--tag-radius': '4px' }">
                      {{ row.status }}
                    </OTag>
                  </template>
                  <div>
                    <p class="tag-title">{{ row.status }}</p>
                    <p class="tag-desc">
                      {{ statusMap.get(row.status)?.tag[locale] }}
                    </p>
                  </div>
                </OPopover>
                <p v-else>{{ row.status }}</p>
              </template>
              <template #td_reason="{ row }">
                <OPopover
                  v-if="!lePadV && reasonHover(row.reason)"
                  position="top"
                  :wrap-class="
                    isDark ? 'status-popover-dark' : 'status-popover'
                  "
                >
                  <template #target>
                    <span>{{ row.reason }}</span>
                  </template>
                  <div>
                    <p class="tag-title">{{ row.reason }}</p>
                    <p class="tag-desc">{{ reasonHover(row.reason) }}</p>
                  </div>
                </OPopover>
                <p v-if="lePadV">{{ row.reason }}</p>
              </template>
              <template #td_releaseTime="{ row }">
                {{ changeTimeStamp(new Date(row?.releaseTime).getTime()) }}
              </template>
              <template #td_updateTime="{ row }">
                {{ changeTimeStamp(new Date(row?.updateTime).getTime()) }}
              </template>
            </OTable>
          </OScroller>
          <div class="maintenance-tip">{{ t('cve.maintenanceTip') }}</div>
        </div>
      </div>
    </ContentWrapper>
    <ODialog
      v-model:visible="glossaryVisible"
      :phone-half-full="lePadV"
      class="glossary-body"
      :class="isDark ? 'glossary-body-dark' : ''"
      :size="lePadV ? 'medium' : 'large'"
    >
      <template #header>
        <span class="del-title">{{ t('cve.glossary') }}</span>
      </template>
      <div class="dlg-body">
        <OTable
          :columns="columnsGlossary"
          :data="glossaryList"
          border="all"
          class="glossary-table"
        >
          <template #td_description="{ row }">
            <p v-dompurify-html="row.description[locale]"></p>
            <ul v-if="locale === 'zh' && row.listZh">
              <li v-for="(item, i) in row.listZh" :key="i">{{ item }}</li>
            </ul>
            <ul v-if="locale === 'en' && row.listEn">
              <li v-for="(item, i) in row.listEn" :key="i">{{ item }}</li>
            </ul>
          </template>
        </OTable>
      </div>
    </ODialog>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  padding-top: 32px;
  padding-bottom: 72px;
}
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
  --breadcrumb-seperator-size: 16px;
}

.banner {
  background-color: var(--o-color-fill2);
  padding: 24px 40px;
  border-radius: var(--o-radius-xs);
  margin-top: 24px;
}

.title-box {
  display: flex;
  align-items: center;
}
.title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include h2;
}
.type-tag {
  margin-left: 16px;
  --tag-bg-color: transparent;
  --tag-padding: 2px 4px;
  :deep(.o-tag-label) {
    display: flex;
    align-items: center;
    .o-icon {
      margin-right: 4px;
      @include text1;
    }
  }
}
.high {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-warning1);
    }
  }
}
.medium {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-warning2);
    }
  }
}
.critical {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-danger1);
    }
  }
}
.norating {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-info4);
    }
  }
}
.text-box {
  color: var(--o-color-info1);
  margin-top: 16px;
  @include tip1;
}
.gray {
  color: var(--o-color-info3);
  margin-right: 8px;
}
.time {
  margin-top: 8px;
}

.status-tag {
  --tag-bg-color: var(--o-color-control2-light);
  --tag-bd-color: var(--o-color-control3-light);
  cursor: pointer;
}

.content {
  background-color: var(--o-color-fill2);
  padding: 40px;
  border-radius: var(--o-radius-xs);
  margin-top: 24px;
}

.info-item {
  margin-top: 40px;
  .label {
    color: var(--o-color-info1);
    font-weight: 500;
    @include h3;
  }
  .desc {
    color: var(--o-color-info2);
    margin-top: 16px;
    white-space: pre-wrap;
    text-align: justify;
    @include text1;
  }
}
.label-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.glossary-btn {
  --btn-bd-color: var(--o-color-control4);
  --btn-bg-color-hover: var(--o-color-control2-light);
  --btn-bd-color-hover: var(--o-color-control4);
  --btn-color-hover: var(--o-color-info1);
  --btn-bg-color-active: var(--o-color-control2-light);
  --btn-bd-color-active: var(--o-color-control4);
  --btn-color-active: var(--o-color-info1);
}
.o-btn {
  --btn-radius: var(--o-radius-xs);
}

.info-overview {
  margin-top: 0;
}

:deep(.o-table) {
  margin-top: 24px;
  --table-head-cell-padding: 9px 16px;
  --table-head-cell-height: auto;
  --table-cell-padding: 9px 16px;
  --table-edge-padding: 24px;
  --table-cell-height: auto;
  th,
  td {
    color: var(--o-color-info1);
    @include tip1;
  }
}
// CVSS 指标表：占满可用宽度并采用固定布局精确控列宽，
// 指标名列定宽、NVD / openEuler 两列平分剩余宽度（避免两列宽窄不一）；
// 屏幕足够宽时向量串单行展示，列宽不足时才在列内换行
.cvss-table {
  width: 100%;
  :deep(table) {
    table-layout: fixed;
  }
  :deep(col:nth-of-type(1)) {
    width: 176px;
  }
  // 括号限定语固定为第二行且不断行，保证标签换行位置统一在括号前
  .metric-label-sub {
    display: block;
    white-space: nowrap;
    @include tip1;
  }
}
.product-table {
  margin-top: 7px;
}
.maintenance-tip {
  margin-top: 16px;
  color: var(--o-color-info2);
  white-space: pre-line;
  text-align: justify;
  @include text1;
}
.glossary-table {
  --table-head-cell-padding: 9px 24px;
  --table-head-cell-height: auto;
  --table-cell-padding: 9px 24px;
  --table-edge-padding: 24px;
  --table-cell-height: auto;
  :deep(th) {
    color: var(--o-color-info1);
    @include tip1;
  }
  :deep(tr) {
    td {
      vertical-align: top;
      @include tip1;
      &:nth-of-type(1) {
        color: var(--o-color-info2);
        padding-left: 32px;
      }
    }
    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(8) {
      td {
        color: var(--o-color-info1);
        padding-left: 24px;
        &:nth-of-type(1) {
          font-weight: 500;
        }
      }
    }
  }
  :deep(th) {
    &:nth-of-type(1) {
      width: 30%;
    }
    &:nth-of-type(2) {
      width: 70%;
    }
  }
}
ul {
  list-style-type: disc;
  padding-left: 16px;
}

@include respond('<=laptop') {
  .content-wrapper {
    padding-bottom: 56px;
  }
  .banner {
    padding: 24px 32px;
  }
  .content {
    padding: 40px 32px;
  }
}
@include respond('<=pad') {
  .content-wrapper {
    padding-bottom: 40px;
  }
  .banner {
    padding: 24px;
  }
  .content {
    padding: 32px;
  }
}
@include respond('<=pad_v') {
  .content-wrapper {
    padding-top: 24px;
    padding-bottom: 32px;
  }
  .banner {
    padding: 24px 12px;
    margin-top: 0;
  }
  .text-box {
    @include text1;
  }
  .info-item {
    margin-top: 24px;
    .desc {
      margin-top: 12px;
    }
  }
  .content {
    padding: 12px;
    margin-top: 16px;
  }
  :deep(.o-table) {
    margin-top: 12px;
    --table-head-cell-padding: 8px 16px;
    --table-cell-padding: 8px 16px;
    --table-edge-padding: 24px;
  }
  .cvss-table {
    min-width: 400px;
    :deep(col:nth-of-type(1)) {
      width: 152px;
    }
  }
  :deep(.o-scrollbar) {
    --scrollbar-x-bottom: -12px;
  }
  :deep(.o-scrollbar-rail) {
    margin: 0;
  }
  .product-table {
    min-width: 745px;
  }
  .glossary-btn {
    --btn-padding: 0 4px;
    @include tip1;
  }
  .glossary-table {
    --table-head-cell-padding: 7px 12px;
    --table-cell-padding: 7px 12px;
    --table-edge-padding: 12px;
    :deep(tr) {
      td {
        &:nth-of-type(1) {
          padding-left: 12px;
        }
      }
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(8) {
        td {
          padding-left: 12px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.status-popover,
.status-popover-dark {
  width: 326px;
  .o-popup-body {
    border-radius: var(--o-radius-xs);
    padding: 16px;
  }
  .tag-title {
    color: var(--o-color-info1);
    font-weight: 500;
    @include text1;
  }
  .tag-desc {
    color: var(--o-color-info2);
    margin-top: 4px;
    @include tip1;
  }
}
.status-popover-dark {
  --popup-bg-color: #3f3f43;
}
.glossary-body {
  --dlg-radius: var(--o-radius-xs);
  --dlg-width: 1170px;
}
.glossary-body-dark {
  --dlg-bg-color: #3f3f43;
}
</style>
