import { computed, ref, toValue, watch, type MaybeRefOrGetter } from 'vue';

export const useCheckbox = <T>(datasource: MaybeRefOrGetter<T[]>, cbValueExtractor: (item: T) => string | number) => {
  const checkboxes = ref<(string | number)[]>([]);
  const indeterminate = ref<boolean>(false);
  const parentCheckbox = ref<(string | number)[]>([]);
  const isCheckedAll = computed(() => parentCheckbox.value.length > 0);
  const ONE = [1];
  const EMPTY: any[] = [];

  const checkAll = () => {
    indeterminate.value = false;
    parentCheckbox.value = ONE;
  };

  const clearCheckboxes = () => {
    indeterminate.value = false;
    parentCheckbox.value = EMPTY;
    checkboxes.value = EMPTY;
  };

  watch(
    () => parentCheckbox.value.length,
    (length) => {
      const ds = toValue(datasource);
      if (ds.length === 0) {
        return;
      }
      if (length) {
        if (checkboxes.value.length < ds.length) {
          checkboxes.value = ds.map(cbValueExtractor);
        }
      } else {
        if (!indeterminate.value && checkboxes.value.length > 0) {
          checkboxes.value = EMPTY;
        }
      }
    }
  );

  watch(
    () => checkboxes.value.length,
    (length) => {
      const ds = toValue(datasource);
      if (ds.length === 0) {
        return;
      }
      if (length === ds.length) {
        if (!isCheckedAll.value) {
          parentCheckbox.value = ONE;
        }
        indeterminate.value = false;
      } else if (length === 0) {
        if (isCheckedAll.value) {
          parentCheckbox.value = EMPTY;
        }
        indeterminate.value = false;
      } else {
        if (isCheckedAll.value) {
          parentCheckbox.value = EMPTY;
        }
        indeterminate.value = true;
      }
    }
  );

  return {
    checkboxes,
    indeterminate,
    parentCheckbox,
    isCheckedAll,
    clearCheckboxes,
    checkAll,
  };
};
