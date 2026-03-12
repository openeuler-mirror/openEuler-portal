<script lang="ts" setup>
import { ref, computed, watch, reactive } from 'vue';
import { OIcon, OTable, OSelect, OOption, OTab, OTabPane, ORadioGroup, ORadio, OToggle, OButton, OLink } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import IconOutLink from '~icons/app-new/icon-outlink.svg';
import IconDownload from '~icons/app-new/icon-download.svg';

const { t } = useLocale();

type Tab = 'mirror' | 'document' | 'other';

type Arch = 'x86' | 'arm';
const activeArch = ref<Arch>('x86');

interface PkgItem {
  name: string;
  path: string;
}

interface VersionGroup {
  dateTitle: string;
  x86List: PkgItem[];
  armList: PkgItem[];
}

const mirrorVersions: VersionGroup[] = [
  {
    dateTitle: '【24.03-LTS】',
    x86List: [
      { name: 'NestOS 双模式-24.03-LTS ISO下载', path: 'https://nestos.org.cn/nestos20240904/nestos-for-all/x86_64/NestOS-24.03-LTS.20240904.0.x86_64.iso' },
      { name: 'NestOS For Virt-24.03-LTS ISO下载', path: 'https://nestos.org.cn/nestos20240904/nestos-for-virt/x86_64/NestOS-For-Virt-24.03-LTS.20240904.0.x86_64.iso' },
      { name: 'NestOS For Container-24.03-LTS ISO下载', path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/x86_64/nestos-24.03-LTS.20240904.0-live.x86_64.iso' },
      { name: 'NestOS For Container-24.03-LTS QCOW2下载', path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/x86_64/nestos-24.03-LTS.20240904.0-qemu.x86_64.qcow2' },
      { name: 'NestOS For Container-24.03-LTS openStack版本下载', path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/x86_64/nestos-24.03-LTS.20240904.0-openstack.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS 双模式-24.03-LTS ISO下载', path: 'https://nestos.org.cn/nestos20240904/nestos-for-all/aarch64/NestOS-24.03-LTS.20240904.0.aarch64.iso' },
      { name: 'NestOS For Virt-24.03-LTS ISO下载', path: 'https://nestos.org.cn/nestos20240904/nestos-for-virt/aarch64/NestOS-For-Virt-24.03-LTS.20240904.0.aarch64.iso' },
      { name: 'NestOS For Container-24.03-LTS ISO下载', path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/aarch64/nestos-24.03-LTS.20240904.0-live.aarch64.iso' },
      { name: 'NestOS For Container-24.03-LTS QCOW2下载', path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/aarch64/nestos-24.03-LTS.20240904.0-qemu.aarch64.qcow2' },
      { name: 'NestOS For Container-24.03-LTS openStack版本下载', path: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/aarch64/nestos-24.03-LTS.20240904.0-openstack.aarch64.qcow2' },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP4】',
    x86List: [
      { name: 'NestOS 双模式-22.03-LTS-SP4 ISO下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-all/x86_64/NestOS-22.03-LTS-SP4.20240628.0.x86_64.iso' },
      { name: 'NestOS For Virt-22.03-LTS-SP4 ISO下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-virt/x86_64/NestOS-For-Virt-22.03-LTS-SP4.20240628.0.x86_64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP4 ISO下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-live.x86_64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP4 QCOW2下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-qemu.x86_64.qcow2' },
      { name: 'NestOS For Container-22.03-LTS-SP4 openStack版本下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-openstack.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS 双模式-22.03-LTS-SP4 ISO下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-all/aarch64/NestOS-22.03-LTS-SP4.20240628.0.aarch64.iso' },
      { name: 'NestOS For Virt-22.03-LTS-SP4 ISO下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-virt/aarch64/NestOS-For-Virt-22.03-LTS-SP4.20240628.0.aarch64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP4 ISO下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-live.aarch64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP4 QCOW2下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-qemu.aarch64.qcow2' },
      { name: 'NestOS For Container-22.03-LTS-SP4 openStack版本下载', path: 'https://nestos.org.cn/nestos20240628/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP4.20240628.0-openstack.aarch64.qcow2' },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP3】',
    x86List: [
      { name: 'NestOS 双模式-22.03-LTS-SP3 ISO下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-all/x86_64/NestOS-22.03-LTS-SP3.20240110.0.x86_64.iso' },
      { name: 'NestOS For Virt-22.03-LTS-SP3 ISO下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-virt/x86_64/NestOS-For-Virt-22.03-LTS-SP3.20240110.0.x86_64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP3 ISO下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-live.x86_64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP3 QCOW2下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-qemu.x86_64.qcow2' },
      { name: 'NestOS For Container-22.03-LTS-SP3 openStack版本下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-openstack.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS 双模式-22.03-LTS-SP3 ISO下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-all/aarch64/NestOS-22.03-LTS-SP3.20240110.0.aarch64.iso' },
      { name: 'NestOS For Virt-22.03-LTS-SP3 ISO下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-virt/aarch64/NestOS-For-Virt-22.03-LTS-SP3.20240110.0.aarch64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP3 ISO下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-live.aarch64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP3 QCOW2下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-qemu.aarch64.qcow2' },
      { name: 'NestOS For Container-22.03-LTS-SP3 openStack版本下载', path: 'https://nestos.org.cn/nestos20231231/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP3.20240110.0-openstack.aarch64.qcow2' },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP2.20230928】',
    x86List: [
      { name: 'NestOS 双模式-22.03-LTS-SP2.20230928 ISO下载', path: 'https://nestos.org.cn/nestos20230928/nestos-for-all/x86_64/NestOS-22.03-LTS-SP2.20230928.0.x86_64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP2.20230928 QCOW2下载', path: 'https://nestos.org.cn/nestos20230928/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP2.20230928.0-qemu.x86_64.qcow2' },
      { name: 'NestOS For Container-22.03-LTS-SP2.20230928 openStack版本下载', path: 'https://nestos.org.cn/nestos20230928/nestos-for-container/x86_64/NestOS-For-Container-22.03-LTS-SP2.20230928.0-openstack.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS 双模式-22.03-LTS-SP2.20230928 ISO下载', path: 'https://nestos.org.cn/nestos20230928/nestos-for-all/aarch64/NestOS-22.03-LTS-SP2.20230928.0.aarch64.iso' },
      { name: 'NestOS For Container-22.03-LTS-SP2.20230928 QCOW2下载', path: 'https://nestos.org.cn/nestos20230928/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP2.20230928.0-qemu.aarch64.qcow2' },
      { name: 'NestOS For Container-22.03-LTS-SP2.20230928 openStack版本下载', path: 'https://nestos.org.cn/nestos20230928/nestos-for-container/aarch64/NestOS-For-Container-22.03-LTS-SP2.20230928.0-openstack.aarch64.qcow2' },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP2】',
    x86List: [
      { name: 'NestOS-22.03-LTS-SP2 ISO下载', path: 'https://nestos.org.cn/nestos20230630/x86_64/nestos-22.03-LTS-SP2.20230704.0-live.x86_64.iso' },
      { name: 'NestOS-22.03-LTS-SP2 QCOW2下载', path: 'https://nestos.org.cn/nestos20230630/x86_64/nestos-22.03-LTS-SP2.20230704.0-qemu.x86_64.qcow2' },
      { name: 'NestOS-22.03-LTS-SP2 openStack版本下载', path: 'https://nestos.org.cn/nestos20230630/x86_64/nestos-22.03-LTS-SP2.20230704.0-openstack.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS-22.03-LTS-SP2 ISO下载', path: 'https://nestos.org.cn/nestos20230630/aarch64/nestos-22.03-LTS-SP2.20230704.0-live.aarch64.iso' },
      { name: 'NestOS-22.03-LTS-SP2 QCOW2下载', path: 'https://nestos.org.cn/nestos20230630/aarch64/nestos-22.03-LTS-SP2.20230704.0-qemu.aarch64.qcow2' },
      { name: 'NestOS-22.03-LTS-SP2 openStack版本下载', path: 'https://nestos.org.cn/nestos20230630/aarch64/nestos-22.03-LTS-SP2.20230704.0-openstack.aarch64.qcow2' },
    ],
  },
  {
    dateTitle: '【23.03】',
    x86List: [
      { name: 'NestOS-23.03 ISO下载', path: 'https://nestos.org.cn/nestos20230330/x86_64/nestos-23.03.20230403.0-live.x86_64.iso' },
      { name: 'NestOS-23.03 QCOW2下载', path: 'https://nestos.org.cn/nestos20230330/x86_64/nestos-23.03.20230403.0-qemu.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS-23.03 ISO下载', path: 'https://nestos.org.cn/nestos20230330/aarch64/nestos-23.03.20230403.0-live.aarch64.iso' },
      { name: 'NestOS-23.03 QCOW2下载', path: 'https://nestos.org.cn/nestos20230330/aarch64/nestos-23.03.20230403.0-qemu.aarch64.qcow2' },
    ],
  },
  {
    dateTitle: '【22.03-LTS-SP1】',
    x86List: [
      { name: 'NestOS-22.03-LTS-SP1 ISO下载', path: 'https://nestos.org.cn/nestos20221230/x86_64/nestos-22.03-LTS-SP1.20221229.0-live.x86_64.iso' },
      { name: 'NestOS-22.03-LTS-SP1 QCOW2下载', path: 'https://nestos.org.cn/nestos20221230/x86_64/nestos-22.03-LTS-SP1.20221229.0-qemu.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS-22.03-LTS-SP1 ISO下载', path: 'https://nestos.org.cn/nestos20221230/aarch64/nestos-22.03-LTS-SP1.20221229.0-live.aarch64.iso' },
      { name: 'NestOS-22.03-LTS-SP1 QCOW2下载', path: 'https://nestos.org.cn/nestos20221230/aarch64/nestos-22.03-LTS-SP1.20221229.0-qemu.aarch64.qcow2' },
    ],
  },
  {
    dateTitle: '【22.09】',
    x86List: [
      { name: 'NestOS-22.09 ISO下载', path: 'https://nestos.org.cn/nestos20220930/x86_64/nestos-22.09.20220928.0-live.x86_64.iso' },
      { name: 'NestOS-22.09 QCOW2下载', path: 'https://nestos.org.cn/nestos20220930/x86_64/nestos-22.09.20220928.0-qemu.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS-22.09 ISO下载', path: 'https://nestos.org.cn/nestos20220930/aarch64/nestos-22.09.20220928.0-live.aarch64.iso' },
      { name: 'NestOS-22.09 QCOW2下载', path: 'https://nestos.org.cn/nestos20220930/aarch64/nestos-22.09.20220928.0-qemu.aarch64.qcow2' },
    ],
  },
  {
    dateTitle: '【22.03-LTS】',
    x86List: [
      { name: 'NestOS-22.03 ISO下载', path: 'https://nestos.org.cn/nestos20220330/x86_64/nestos-22.03.20220329.dev.0-live.x86_64.iso' },
      { name: 'NestOS-22.03 QCOW2下载', path: 'https://nestos.org.cn/nestos20220330/x86_64/nestos-22.03.20220329.dev.0-qemu.x86_64.qcow2' },
    ],
    armList: [
      { name: 'NestOS-22.03 ISO下载', path: 'https://nestos.org.cn/nestos20220330/aarch64/nestos-22.03.20220329.dev.0-live.aarch64.iso' },
      { name: 'NestOS-22.03 QCOW2下载', path: 'https://nestos.org.cn/nestos20220330/aarch64/nestos-22.03.20220329.dev.0-qemu.aarch64.qcow2' },
    ],
  },
];

// Per-row selected package index (reactive array for v-model compatibility)
const selectedIdx = reactive<number[]>(mirrorVersions.map(() => 0));

// Reset selections when arch changes
watch(activeArch, () => {
  mirrorVersions.forEach((_, i) => {
    selectedIdx[i] = 0;
  });
});

const getList = (v: VersionGroup) =>
  activeArch.value === 'x86' ? v.x86List : v.armList;

const tableColumns = computed(() => [
  { label: t('nestos.mirrorPackage'), key: 'version', style: { width: '20%' } },
  { label: t('nestos.mirrorRepo'), key: 'name', style: { width: '55%' } },
  { label: t('nestos.mirrorDownloadCol'), key: 'action', style: { width: '25%' } },
]);

// Table rows: one per version group (static — mirrorVersions never changes)
const tableData = mirrorVersions.map((v, i) => ({ vIdx: i, version: v.dateTitle }));

const docLinks = [
  { titleKey: 'nestos.nestosDoc', href: 'https://nestos.org.cn/' },
];

const otherLinks = [
  { titleKey: 'nestos.ignitionFile', href: 'https://nestos.org.cn/nestos-ign/config.ign' },
];
</script>

<template>
  <AppSection :title="t('nestos.resourcesTitle')">
    <OTab default-value="mirror" variant="text" :line="false" class="resource-tab">

      <!-- 镜像下载 -->
      <OTabPane value="mirror" :label="t('nestos.mirrorTab')">
        <div class="resource-card">
          <!-- 架构筛选 -->
          <div class="arch-filter">
            <span class="arch-label">{{ t('nestos.archTitle') }}</span>
            <ORadioGroup v-model="activeArch" class="arch-radio-group">
              <ORadio value="x86">
                <template #radio="{ checked }">
                  <OToggle :checked="checked">{{ t('nestos.archX86') }}</OToggle>
                </template>
              </ORadio>
              <ORadio value="arm">
                <template #radio="{ checked }">
                  <OToggle :checked="checked">{{ t('nestos.archArm') }}</OToggle>
                </template>
              </ORadio>
            </ORadioGroup>
          </div>

          <!-- OTable 下载表格 -->
          <OTable :data="tableData" :columns="tableColumns" class="mirror-table">
            <template #td_version="{ row }">
              <span class="version-tag">{{ row.version }}</span>
            </template>
            <template #td_name="{ row }">
              <OSelect
                v-model="selectedIdx[row.vIdx]"
                class="repo-select"
                size="small"
              >
                <OOption
                  v-for="(pkg, pIdx) in getList(mirrorVersions[row.vIdx])"
                  :key="pIdx"
                  :label="pkg.name"
                  :value="pIdx"
                />
              </OSelect>
            </template>
            <template #td_action="{ row }">
              <OButton
                variant="solid"
                color="primary"
                size="small"
                :href="getList(mirrorVersions[row.vIdx])[selectedIdx[row.vIdx]]?.path"
                target="_blank"
                class="download-btn"
              >
                <template #prefix><OIcon class="download-icon"><IconDownload /></OIcon></template>
                {{ t('nestos.immediateDownload') }}
              </OButton>
            </template>
          </OTable>
        </div>
      </OTabPane>

      <!-- 文档 -->
      <OTabPane value="document" :label="t('nestos.documentTab')">
        <div class="resource-card">
          <div
            v-for="(item, i) in docLinks"
            :key="i"
            class="link-item"
          >
            <p class="link-title">{{ t(item.titleKey) }}</p>
            <OLink
              :href="item.href"
              target="_blank"
              color="primary"
              hover-underline
            >
              {{ t('nestos.learnMore') }}
              <OIcon class="outlink-icon"><IconOutLink /></OIcon>
            </OLink>
          </div>
        </div>
      </OTabPane>

      <!-- 其他 -->
      <OTabPane value="other" :label="t('nestos.otherTab')">
        <div class="resource-card">
          <div
            v-for="(item, i) in otherLinks"
            :key="i"
            class="link-item"
          >
            <p class="link-title">{{ t(item.titleKey) }}</p>
            <OLink
              :href="item.href"
              target="_blank"
              color="primary"
              hover-underline
            >
              {{ t('nestos.learnMore') }}
              <OIcon class="outlink-icon"><IconOutLink /></OIcon>
            </OLink>
          </div>
        </div>
      </OTabPane>

    </OTab>
  </AppSection>
</template>

<style scoped lang="scss">
.resource-tab {
  :deep(.o-tab-navs) {
    --tab-nav-justify: center;
    margin-bottom: 24px;
  }
}

.resource-card {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: 4px;
  padding: 24px 32px;
}

.arch-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.arch-label {
  font-size: 16px;
  font-weight: 500;
  color: var(--o-color-info2);
  flex-shrink: 0;
}

.arch-radio-group {
  display: flex;
  gap: 8px;
}

.mirror-table {
  width: 100%;

  :deep(thead tr) {
    background-color: var(--o-color-primary4-light);
  }

  :deep(thead th) {
    padding: 0 16px;
    height: 48px;
    font-size: 14px;
    font-weight: 500;
    color: var(--o-color-info1);
    border-bottom: 1px solid var(--o-color-control4);
  }

  :deep(tbody tr) {
    border-bottom: 1px solid var(--o-color-control4);
    transition: background-color 0.15s;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: var(--o-color-fill2);
    }
  }

  :deep(tbody td) {
    padding: 10px 16px;
    height: 56px;
    font-size: 14px;
    color: var(--o-color-info2);
    vertical-align: middle;
  }
}

.version-tag {
  font-size: 14px;
  font-weight: 500;
  color: var(--o-color-info1);
}

.repo-select {
  width: 100%;
}

.download-btn {
  --btn-border-radius: 100px;
  white-space: nowrap;
}

.download-icon {
  --icon-size: 14px;
}

// 文档 / 其他 tab 样式
.link-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--o-color-control4);

  &:last-child {
    border-bottom: none;
  }
}

.link-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--o-color-info1);
  margin-bottom: 8px;
}

.outlink-icon {
  --icon-size: 14px;
}

@include respond-to('laptop') {
  .resource-card {
    padding: 20px 24px;
  }
}

@include respond-to('pad_h') {
  .resource-card {
    padding: 18px 20px;
  }
}

@include respond-to('<=pad_v') {
  .tab-btn {
    padding: 8px 16px;
    font-size: 16px;
  }

  .resource-card {
    padding: 16px;
  }

  .mirror-table {
    :deep(thead th),
    :deep(tbody td) {
      padding: 10px;
      font-size: 12px;
    }
  }

  .download-btn {
    padding: 5px 10px;
    font-size: 12px;
  }
}

@include respond-to('phone') {
  .mirror-table {
    overflow-x: auto;

    :deep(table) {
      min-width: 480px;
    }
  }
}
</style>
