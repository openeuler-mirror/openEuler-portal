<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import { OIcon, OIconChevronDown, OLink, OOption, OSelect } from '@opensig/opendesign';

import IconOutlink from '~icons/app-new/icon-outlink.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const props = withDefaults(
  defineProps<{
    columns: { label: string; key: string; width: number }[];
    data: any[];
    mobileFilterKey?: string;
  }>(),
  {
    columns: () => [],
    data: () => [],
  }
);

const { lePadV } = useScreen();
const { t } = useLocale();

const urlPrefix = 'https://atomgit.com';

const titleKey = computed(() => props.columns?.[0]?.key);
const arraySpanMethod = ({ row, column }) => {
  const key = column.property;
  if (row[`${key}Rows`] !== undefined) {
    return [row[`${key}Rows`], 1];
  }
};

const getRowClassName = ({ row }) => {
  return row[`${titleKey.value}Rows`] ? 'origin-row' : '';
};

const getCellClassName = ({ row, rowIndex, column, columnIndex }) => {
  if (column.property === row.rowKey && row[`${row.rowKey}Rows`] && tableList.value.length === rowIndex + row[`${row.rowKey}Rows`]) {
    return 'last-row-cell';
  }
  return `last-cell-${props.columns.length - columnIndex}`;
};

const flattenWithHierarchy = (list) => {
  const result = [];
  list.forEach((item1) => {
    if (item1.children?.length) {
      item1.children.forEach((item2, item2Idx) => {
        if (item1.rowKey) {
          item2[`${item1.rowKey}Rows`] =
            item2Idx === 0
              ? item1.children.reduce((prev, cur) => {
                  if (cur.children?.length) {
                    return prev + cur.children.length;
                  } else {
                    return prev + 1;
                  }
                }, 0)
              : 0;
        }
        if (item2.children?.length) {
          item2.children.forEach((item3, item3Idx) => {
            if (item2.rowKey) {
              item3[`${item2.rowKey}Rows`] = item3Idx === 0 ? item2.children.length : 0;
            }
            if (item2[`${item1.rowKey}Rows`] !== undefined) {
              item2[`${item1.rowKey}Rows`] = item3Idx === 0 ? item2[`${item1.rowKey}Rows`] : 0;
            }
            result.push({
              ...item1,
              ...item2,
              ...item3,
            });
          });
        } else {
          result.push({
            ...item1,
            ...item2,
          });
        }
      });
    } else {
      result.push({
        ...item1,
      });
    }
  });
  return result;
};

const tableList = computed(() => flattenWithHierarchy(props.data));

const handleBr = (str: string) => {
  return str?.replace('<br>', '');
};

const list = computed(() => {
  let id = 1;
  return props.data.map((v) => {
    return {
      ...v,
      children: !v.children?.length
        ? [v]
        : v.children
            .map((t) => {
              if (t.children?.length) {
                return t.children.map((z) => {
                  return {
                    id: id++,
                    ...t,
                    ...z,
                  };
                });
              } else {
                return {
                  id: id++,
                  ...t,
                };
              }
            })
            .flat(2),
    };
  });
});

const maxId = computed(() => {
  const ids = list.value.map((v) => [v.id, v.children?.map((t) => [t.id, t.children?.map((z) => z.id)])]);
  return ids.flat(4).filter((v) => v !== undefined).length;
});

const size = ref(10);
const loadNext = () => {
  size.value = size.value + 10;
};
// -------------------- 本地筛选 --------------------
const removeBr = (str: string) => {
  return str?.replace('<br>', '');
};
const filterValue = ref('');
const filterOptions = computed(() => {
  return [
    {
      label: t('common.all'),
      value: '',
    },
    ...props.data.map((v) => {
      const value = removeBr(v[props.mobileFilterKey]);
      return {
        label: value,
        value,
      };
    }),
  ];
});
const filteredList = computed(() => {
  if (filterValue.value === '') {
    return list.value;
  }
  return list.value.filter((v) => removeBr(v[props.mobileFilterKey]) === filterValue.value);
});

watch(
  () => filterValue.value,
  (val) => {
    size.value = val ? maxId.value : 10;
  }
);
</script>

<template>
  <div class="repo-list-wrapper">
    <ElTable v-if="!lePadV" :data="tableList" border :span-method="arraySpanMethod" :row-class-name="getRowClassName" :cell-class-name="getCellClassName">
      <ElTableColumn v-for="col in columns" :key="col.key" :width="col.width" :label="col.label" :prop="col.key">
        <template #default="{ row }">
          <template v-if="col.key === 'project'">
            <div class="link-wrapper">
              <span v-dompurify-html="row.project"></span>
              <OLink v-if="row.projectLink" color="primary" :href="row.projectLink" hover-underline target="_blank" rel="noopener noreferrer">
                <span>{{ t('repos.overview') }}</span>
                <template #suffix>
                  <OIcon>
                    <IconOutlink></IconOutlink>
                  </OIcon>
                </template>
              </OLink>
            </div>
          </template>
          <template v-if="col.key === 'name'">
            <div class="link-wrapper">
              <span v-dompurify-html="row.name"></span>
              <OLink v-if="row.nameLink" color="primary" :href="row.nameLink" hover-underline target="_blank" rel="noopener noreferrer">
                <span>{{ t('repos.overview') }}</span>
                <template #suffix>
                  <OIcon>
                    <IconOutlink></IconOutlink>
                  </OIcon>
                </template>
              </OLink>
            </div>
          </template>
          <span v-if="col.key === 'desc'" v-dompurify-html="row.desc"></span>
          <template v-if="col.key === 'repo'">
            <template v-if="Array.isArray(row.repo)">
              <div v-for="(repo, idx) in row.repo" :key="repo">
                <OLink color="primary" hover-underline :href="`${urlPrefix}/${row.repoLink[idx] || repo}`" target="_blank" rel="noopener noreferrer">
                  {{ repo }}
                </OLink>
              </div>
            </template>
            <template v-else>
              <OLink color="primary" hover-underline :href="`${urlPrefix}/${row.repoLink || row.repo}`" target="_blank" rel="noopener noreferrer">
                {{ row.repo }}
              </OLink>
            </template>
          </template>
        </template>
      </ElTableColumn>
    </ElTable>
    <div class="repo-list" v-if="lePadV">
      <div class="mobile-filter" v-if="mobileFilterKey">
        <OSelect size="large" v-model="filterValue">
          <OOption v-for="t in filterOptions" :key="t.value" :value="t.value" :label="t.label"></OOption>
        </OSelect>
      </div>
      <div class="repo-item-list" v-for="(row, idx) in filteredList" :key="idx">
        <template v-if="row.children?.[0].id <= size">
          <div class="repo-item-title">{{ handleBr(row[titleKey]) }}</div>
          <template v-for="(t, tIdx) in row.children" :key="tIdx">
            <div class="repo-t-list" v-if="t.id <= size">
              <div class="repo-t-row" v-for="col in columns.slice(1)" :key="col.key">
                <div class="repo-label">{{ col.label }}</div>
                <div class="repo-value">
                  <template v-if="col.key === 'repo'">
                    <template v-if="Array.isArray(t[col.key])">
                      <div v-for="(repo, idx) in t[col.key]" :key="repo">
                        <OLink color="primary" :href="`${urlPrefix}/${t.repoLink[idx] || repo}`" hover-underline target="_blank" rel="noopener noreferrer">
                          {{ repo }}
                        </OLink>
                      </div>
                    </template>
                    <OLink v-else color="primary" :href="`${urlPrefix}/${t.repoLink || t.repo}`" hover-underline target="_blank" rel="noopener noreferrer">
                      {{ t[col.key] }}
                    </OLink>
                  </template>
                  <span v-else>
                    {{ t[col.key] }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="load-more" v-if="lePadV && maxId > size" @click="loadNext">
      <span>{{ t('ubOsComponent.viewMore') }}</span>
      <OIcon>
        <OIconChevronDown></OIconChevronDown>
      </OIcon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.repo-list-wrapper {
  :deep(.el-table) {
    --el-table-header-text-color: var(--o-color-info1);
    --el-table-text-color: var(--o-color-info1);
    --expand--icon-size: 24px;
    --el-table-header-bg-color: var(--o-color-primary1-light);
    --el-table-row-hover-bg-color: var(--o-normal-bg-hover);
    border-radius: var(--o-radius_control-xs);
    --el-table-row-hover-bg-color: transparent;

    .el-table__cell {
      padding: 12px 0;
    }
    .el-scrollbar {
      padding: 0;
    }
    thead {
      .el-table__cell {
        border-right: none;
      }
    }

    .link-wrapper {
      display: flex;
      flex-direction: column;
      .o-link {
        margin-top: var(--o-gap-2);
      }
    }
    .cell {
      padding-left: 16px !important;
      padding-right: 16px !important;
      word-break: break-word;
    }
    tr {
      th {
        &:first-child {
          .cell {
            padding-left: 40px !important;
          }
        }
      }
      &.origin-row {
        td {
          &:first-child {
            .cell {
              padding-left: 40px !important;
            }
          }
        }
      }
      .last-row-cell {
        border-bottom: none;
      }
      .last-cell-2,
      .last-cell-3 {
        border-right: none;
      }
    }
  }
  .repo-list {
    .mobile-filter {
      margin-bottom: 12px;
      .o-select {
        width: 100%;
      }
    }
    .repo-item-list + .repo-item-list {
      margin-top: 12px;
    }
    .repo-item-list {
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);

      .repo-item-title {
        padding: 16px 12px 0 12px;
        @include h3;
      }
      .repo-t-list + .repo-t-list {
        border-top: 1px solid var(--o-color-control4);
      }
      .repo-t-list {
        padding: 16px 12px;
        font-weight: 400;
        @include text1;
        .repo-t-row + .repo-t-row {
          margin-top: 8px;
        }
        .repo-t-row {
          display: flex;
          align-items: flex-start;
        }
        .repo-label {
          color: var(--o-color-info2);
          width: 4em;
          flex-shrink: 0;
        }
        .repo-value {
          color: var(--o-color-info1);
          margin-left: 16px;
          a {
            word-break: break-word;
          }
        }
      }
    }
  }
  .load-more {
    color: var(--o-color-info2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    .o-icon {
      margin-left: var(--o-gap-1);
      font-size: 16px;
    }
  }
}
</style>
  