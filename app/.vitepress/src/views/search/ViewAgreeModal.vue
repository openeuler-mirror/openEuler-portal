<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { FormInstance, FormItemRule } from 'element-plus';
import showMd from 'markdown-it';
import { modifyUser } from '@/api/api-login';
import { AigcPrivacyAccepted } from '@/shared/privacy-accepted.const';
import agree from './agree.md?raw'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const { modelValue } = toRefs(props);
const emit = defineEmits(['update:modelValue', 'submit']);
// 转换md语法
function convertMd(data: string) {
  return showMd().render(data);
}

const formRef = ref<FormInstance>();

const close = () => {
  emit('update:modelValue', false);
  formRef.value?.resetFields();
};
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const param = {
        aigcPrivacyAccepted: AigcPrivacyAccepted,
      }
      modifyUser(param).then(() => {
        close();
        emit('submit');
      })
    };
  });
};
// 表单值
const form = reactive({
  policy: [],
} as any);
// checkbox校验
const validatorCheckbox = (rule: any, value: any, callback: any) => {
  if (!value || !value.length) {
    callback('请勾选用户协议');
  } else {
    callback();
  }
};

// 隐私声明校验
const policyRules = reactive<FormItemRule[]>([
  {
    validator: validatorCheckbox,
    trigger: 'change',
  },
]);

// 手动触发校验
const doValidatorForm = (
  formEl: FormInstance | undefined,
  field: string
) => {
  formEl?.validateField(field);
}
</script>
<template>
  <div class="dialog">
    <o-dialog
      v-model="modelValue"
      :before-close="close"
      :draggable="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      align-center
    >
      <template #header><div class="header">用户协议</div></template>
      <el-scrollbar height="400px">
          <div v-dompurify-html="convertMd(agree)" class="markdown"></div>
        </el-scrollbar>
      <el-form
        ref="formRef"
        label-width="0"
        :model="form"
        class="form"
        @submit.prevent=""
      >
        <el-form-item prop="policy" :rules="policyRules">
          <div class="checkbox">
            <OCheckboxGroup
              v-model="form.policy"
              @change="doValidatorForm(formRef, 'policy')"
            >
              <OCheckbox value="1">我已阅读并同意用户协议</OCheckbox>
            </OCheckboxGroup>
          </div>
        </el-form-item>
      </el-form>
      <div class="footer">
        <OButton size="small" :disabled="!form.policy.length" @click="submit(formRef)">{{
          '确定'
        }}</OButton>
        <OButton size="small" @click="close">{{ '取消' }}</OButton>
      </div>
    </o-dialog>
  </div>
</template>
<style lang="scss" scoped>
.header {
  text-align: center;
  color: var(--e-color-text1);
}
.form {
  padding-top: 16px;
}
.footer {
  display: flex;
  justify-content: center;
  column-gap: var(--e-spacing-h5);
}
.checkbox {
  color: var(--e-color-text1);
  font-size: var(--e-font-size-text);
  line-height: var(--e-line-height-text);
  .o-checkbox-group {
    padding-top: 3px;
  }
}
.markdown {
  width: 100%;
  box-shadow: none;
  margin: 0;
  padding: 0;
}
.dialog {
  :deep(.is-draggable) {
    background-color: var(--e-color-fill2);
  }
}
</style>
