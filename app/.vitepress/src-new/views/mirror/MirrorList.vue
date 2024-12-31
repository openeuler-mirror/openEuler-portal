<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getAllMirror } from '@/api/api-mirror';

import {
  OIcon,
  ORadioGroup,
  ORadio,
  ODivider,
  OToggle,
  OTable,
  OPagination,
  useMessage,
  DialogActionT,
  ODialog,
} from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import AppFilterMo from '~@/components/AppFilterMo.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useClipboard } from '~@/composables/useClipboard';

import IconCopy from '~icons/app-new/icon-copy.svg';
import iconChevronRight from '~icons/app-new/icon-chevron-right.svg';

const { locale, t } = useLocale();
const { isPhone } = useScreen();
const message = useMessage();

// 定义接口
interface MirrorMsg {
  name: string;
  location: string;
  sponsor: string;
  sponsorLogo: string;
  http: string;
  rsnc: string;
  ftp: string;
  continentCode: string;
  netband: string;
  area?: boolean;
}

// 响应式变量
const mirrors = ref<MirrorMsg[]>([]);

// 初始化表格数据
const initTableData = (data: any[]): MirrorMsg[] => {
  const transformedData = data.map((item) => ({
    name: item.Name,
    location: item.Country,
    sponsor: item.SponsorURL,
    sponsorLogo: item.SponsorLogoURL,
    http: item.HttpURL,
    rsnc: item.RsyncURL,
    ftp: item.FtpURL,
    continentCode: item.ContinentCode,
    netband: item.NetworkBandwidth,
  }));
  transformedData.sort((a, b) => a.name.localeCompare(b.name));
  return transformedData;
};

const areaArr = ref([
  {
    value: 'AS',
    label: 'Asia',
  },
  {
    value: 'EU',
    label: 'Europe',
  },
  {
    value: 'NA',
    label: 'North America',
  },
]);

// 复制文本到剪贴板
const handleCopyText = async (value: string, e: MouseEvent) => {
  useClipboard({
    text: value,
    target: e,
    success: () => {
      message.success({
        content: t('download.COPY_SUCCESSFULLY'),
      });
    },
  });
};

// 获取镜像数据
onMounted(async () => {
  try {
    const response = await getAllMirror();
    mirrors.value = initTableData(response);
  } catch {
    mirrors.value = [];
  }
});
// 分页
const currentPage = ref(1);
const pageSize = ref(12);

const activeArea = ref('');

// 计算筛选之后剩下的版本
const filterMirrorList = computed(() => {
  // 初始化页数
  currentPage.value = 1;
  if (!activeArea.value) {
    return mirrors.value;
  }
  return mirrors.value.filter((item: MirrorMsg) => {
    if (!(activeArea.value === item.continentCode)) {
      return false;
    }
    return true; // 满足条件，保留此项
  });
});
// 分页后渲染数据
const renderData = computed(() => {
  if (!isPhone.value) {
    return filterMirrorList.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return filterMirrorList.value.slice(0, currentPage.value * pageSize.value);
  }
});

//移动端筛选弹框
const isShownDialog = ref(false);
const handleToggleDrawer = () => {
  isShownDialog.value = !isShownDialog.value;
};
const dlgAction: DialogActionT[] = [
  {
    id: 'reset',
    label: t('common.reset'),
    variant: 'text',
    size: 'small',
    onClick: () => {
      activeArea.value = '';
    },
  },
  {
    id: 'confirm',
    variant: 'text',
    label: t('common.confirm'),
    size: 'small',
    onClick: () => {
      handleToggleDrawer();
    },
  },
];
// 表格配置
const columns = [
  { label: t('download.MIRROR_ALL_NAME'), key: 'name', style: 'width: 30%' },
  {
    label: t('download.MIRROR_ALL_LOCATION'),
    key: 'location',
    style: 'width: 15%',
  },
  {
    label: t('download.MIRROR_ALL_SPONSOR'),
    key: 'sponsor',
    style: 'width: 15%',
  },
  { label: t('download.protocol'), key: 'rsnc', style: 'width: 20%' },
  { label: t('download.MIRROR_ALL_Mbs'), key: 'netband', style: 'width: 20%' },
];
const COUNT_PER_PAGE = [12, 18, 24, 36];
const rsyncCode =
  'rsync -av --partial --progress --delete rsync://root@repo.openeuler.openatom.cn/openeuler/***(localDirectory)';
</script>

<template>
  <AppSection :title="$t('download.MIRROR_ALL_TITLE')" class="mirror-list">
    <div class="mirror-text">
      <i18n-t
        keypath="download.MIRROR_ALL_CONTENT_0"
        tag="p"
        class="mirror-text"
      >
        <template #email>
          <a href="mailto:mirrors@openeuler.sh">{{
            $t('download.MIRROR_ALL_CONTENT_1')
          }}</a>
        </template>
      </i18n-t>
      <div class="rsync-box">
        <i18n-t
          keypath="download.MIRROR_ALL_CONTENT_2"
          tag="p"
          class="rsync-tip"
        >
          <template #rsync>
            <span class="rsync-code"
              >{{ rsyncCode }}
              <OIcon
                class="icon-copy"
                @click="handleCopyText(rsyncCode, $event)"
              >
                <IconCopy />
              </OIcon>
            </span>
          </template>
        </i18n-t>
        <i18n-t keypath="download.changeImage" tag="p" class="mirror-text">
          <template #click>
            <a :href="$t('download.faqLink')">{{ $t('download.click') }}</a>
          </template>
        </i18n-t>
      </div>
    </div>
    <!-- 筛选 -->
    <div class="filter-box">
      <div class="filter-card">
        <div class="label">{{ $t('download.area') }}</div>
        <ORadioGroup v-model="activeArea">
          <ORadio value="">
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ $t('common.all') }}</OToggle>
            </template>
          </ORadio>
          <ORadio
            v-for="option in areaArr"
            :key="option.value"
            :value="option.value"
          >
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ option.label }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
    </div>
    <!-- 筛选移动端 -->
    <AppFilterMo
      @click="isShownDialog = true"
      :label="t('download.areaFilter')"
    />
    <!-- 镜像仓列表pc -->
    <OTable class="mirror-pc" :data="renderData" :columns="columns">
      <template #td_name="{ row }">
        <div>
          <a :href="row.http" target="_blank" rel="noopener noreferrer">{{
            row.name
          }}</a>
        </div>
      </template>
      <template #td_sponsor="{ row }">
        <a
          :href="row.sponsor"
          target="_blank"
          rel="noopener noreferrer"
          class="mirror-list-img"
          ><img :src="row.sponsorLogo"
        /></a>
      </template>
      <template #td_rsnc="{ row }">
        <div v-if="row.rsnc" class="rsync">
          RSYNC
          <OIcon class="icon-copy" @click="handleCopyText(row.rsnc, $event)">
            <IconCopy class="mirror-list-rsnc" />
          </OIcon>
        </div>
        <div v-else>-</div>
      </template>
    </OTable>
    <!-- 镜像仓列表移动 -->
    <div class="mirror-mo">
      <div
        v-for="mirror in renderData"
        :key="mirror.sponsor"
        class="mirror-card"
      >
        <div class="name">{{ mirror.name }}</div>
        <div class="info-line">
          <div class="label">{{ t('download.MIRROR_ALL_LOCATION') }}</div>
          <div class="value">{{ mirror.location }}</div>
        </div>
        <div class="info-line">
          <div class="label">{{ t('download.MIRROR_ALL_SPONSOR') }}</div>
          <div class="value sponsor">
            <a :href="mirror.sponsor" class="mirror-list-img"
              ><img :src="mirror.sponsorLogo"
            /></a>
          </div>
        </div>
        <div class="info-line">
          <div class="label">{{ t('download.protocol') }}</div>
          <div class="value protocol">
            <div v-if="mirror.rsnc" class="rsync">
              RSYNC
              <OIcon
                class="icon-copy"
                @click="handleCopyText(mirror.rsnc, $event)"
              >
                <IconCopy class="mirror-list-rsnc" />
              </OIcon>
            </div>
            <div v-else>-</div>
          </div>
        </div>
        <ODivider />
        <a
          class="view-detail"
          :href="mirror.http"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="label">{{ t('download.view') }}</div>
          <OIcon><iconChevronRight /> </OIcon>
        </a>
      </div>
    </div>
    <!-- 页码 -->
    <div v-if="filterMirrorList.length > COUNT_PER_PAGE[0]" class="pagination">
      <OPagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :layout="['total', 'pagesize', 'pager', 'jumper']"
        :total="filterMirrorList.length"
        :page-sizes="COUNT_PER_PAGE"
        :show-more="true"
      />
    </div>
  </AppSection>
  <ClientOnly>
    <ODialog
      v-model:visible="isShownDialog"
      :show-close="true"
      size="medium"
      :actions="dlgAction"
      :style="{
        '--dlg-radius': 'var(--o-radius-s)',
      }"
      custom-class="filter-drawer"
    >
      <template #header>
        {{ t('download.areaFilter') }}
      </template>
      <div class="filter-drawer-title">
        {{ t('download.area') }}
      </div>
      <ORadioGroup v-model="activeArea">
        <ORadio value="">
          <template #radio="{ checked }">
            <OToggle :checked="checked">{{ $t('common.all') }}</OToggle>
          </template>
        </ORadio>
        <ORadio
          v-for="option in areaArr"
          :key="option.value"
          :value="option.value"
        >
          <template #radio="{ checked }">
            <OToggle :checked="checked">{{ option.label }}</OToggle>
          </template>
        </ORadio>
      </ORadioGroup>
    </ODialog>
  </ClientOnly>
</template>
<style lang="scss" scoped>
.app-section {
  --o-gap-section: 40px;
  --o-gap-t2c: 16px;
  @include respond-to('<=pad_v') {
    --o-gap-section: 16px;
  }
}
.app-filter-mo {
  display: none;
  @include respond-to('<=pad_v') {
    display: flex;
    margin-top: 24px;
  }
}
.o-dlg-body-content {
  .filter-drawer-title {
    font-weight: 500;
    @include h4;
  }
  .o-radio-group {
    margin-top: 12px;
    .o-radio {
      margin: 8px 8px 0 0;
    }
  }
}
.mirror-text {
  @include text1;
  color: var(--o-color-info1);
  text-align: center;
  .rsync-box {
    display: flex;
    align-items: center;
    margin-top: 12px;
    justify-content: center;
    @include respond-to('<=pad') {
      flex-direction: column;
    }
  }
  .rsync-tip {
    display: flex;
    align-items: center;
    @include respond-to('<=pad') {
      flex-direction: column;
    }
    .rsync-code {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      background-color: var(--o-color-control2-light);
      border-radius: var(--o-radius-xs);
      margin: 0 12px;
      @include respond-to('<=pad') {
        margin-top: 8px;
        padding: 6px 8px;
        align-items: flex-start;
        text-align: left;
        word-break: break-word;
      }
      .o-icon {
        margin-left: 16px;
      }
    }
  }
}
.filter-box {
  margin-top: 40px;
  background-color: var(--o-color-fill2);
  padding: 16px 32px;
  border-radius: var(--o-radius-xs);
  @include respond-to('<=pad_v') {
    display: none;
  }
  .filter-card {
    display: flex;
    align-items: center;
    .label {
      @include text1;
      color: var(--o-color-info1);
      min-width: 32px;
      margin-right: 32px;
    }
    .o-radio-group .o-radio + .o-radio {
      margin-left: 8px;
    }
  }
  .filter-card:not(:first-child) {
    margin-top: 8px;
  }
}
html[lang='en'] {
  .filter-box {
    .filter-card {
      .label {
        min-width: 86px;
      }
    }
  }
}
.o-table {
  margin-top: 24px;
  @include respond-to('<=pad_v') {
    display: none;
  }

  .mirror-list-img {
    img {
      width: 38px;
    }
  }
  .rsync {
    display: flex;
    align-items: center;
  }
}
.mirror-mo {
  display: none;
  margin-top: 12px;
  grid-template-columns: 1fr;
  gap: 12px;
  @include respond-to('<=pad_v') {
    display: grid;
  }
  .mirror-card {
    border-radius: var(--o-radius-xs);
    padding: 16px;
    background-color: var(--o-color-fill2);
    .name {
      @include h3;
      font-weight: 500;
    }
    .info-line {
      display: flex;
      margin-top: 8px;
      &:first-of-type {
        margin-top: 16px;
      }
      .label,
      .value {
        font-weight: 500;
        @include tip1;
      }
      .label {
        min-width: 100px;
        margin-right: 16px;
      }
      .mirror-list-img {
        display: block;
        width: 24px;
        img {
          width: 100%;
        }
      }
      .protocol {
        .rsync {
          display: flex;
          align-items: center;
        }
        .o-icon {
          font-size: var(--o-icon_size-xs);
        }
      }
    }
    .view-detail {
      display: flex;
      @include text2;
      color: var(--o-color-info1);
      justify-content: space-between;
      .o-icon {
        font-size: var(--o-icon_size-xs);
      }
    }
  }
}

.pagination {
  @include respond-to('<=pad_v') {
    display: none;
  }
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
}
.icon-copy {
  cursor: pointer;
  color: var(--o-color-primary1);
  font-size: var(--o-icon_size-m);
  margin-left: 8px;
  @include hover {
    color: var(--o-color-primary2);
  }
}
</style>
