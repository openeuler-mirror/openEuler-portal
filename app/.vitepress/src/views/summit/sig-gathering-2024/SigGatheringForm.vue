<script setup lang="ts">
import { computed, ref, reactive, onMounted, watch } from 'vue';
import { useRouter, useData } from 'vitepress';

import useWindowResize from '@/components/hooks/useWindowResize';
import { showGuard } from '@/shared/login';

import AppContent from '@/components/AppContent.vue';
import OSelect from 'opendesign/select/OSelect.vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

import { isTestEmail, isTestPhone } from '@/shared/utils';

import { queryPersonalInfo } from '@/api/api-login';
import { usePrivacyVersion } from '@/stores/common';
import { querySigGroup, applySigGathering } from '@/api/api-sig';
import { useStoreData } from '@/shared/login';
import { useLogin } from '@/stores/login';

import IconDone from '~icons/app/icon-done.svg';

const { guardAuthClient } = useStoreData();

const { lang } = useData();
const router = useRouter();
const versionStore = usePrivacyVersion();
const ruleFormRef = ref<FormInstance>();
const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 1080 ? true : false));
const labelPosition = ref(isMobile.value ? 'top' : 'left');

const loginStatus = computed(() => {
  return useLogin().loginStatus;
});

const formData = ref({
  name: '',
  phone: '',
  email: '',
  userId: '',
  company: '',
  sigs: [] as string[] | null,
  technicalSeminars: [],
  attend: '',
  acceptPrivacyVersion: [],
  privacyVersion: versionStore.version,
  others: '',
});

const placeholderList = [
  '请填写您的真实姓名',
  '请填写您的真实手机号以便接收活动通知',
  '请填写您的真实邮箱信息以便接收活动通知',
  '请填写您的openEuler ID',
  '请填写您的真实工作单位名称',
  '',
  '请您至少选择一个专题',
  '',
  '姓名长度超出限制',
  '工作单位长度超出限制',
];

// 表单校验规则
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: placeholderList[0],
      trigger: 'blur',
    },
    { min: 1, max: 50, message: placeholderList[8], trigger: 'blur' },
  ],
  phone: [
    {
      required: true,
      message: placeholderList[1],
      validator: (rule: any, value: any, callback: any) => {
        if (!value || !isTestPhone(formData.value.phone)) {
          return callback(new Error(value.message));
        }
        return callback();
      },
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: placeholderList[2],
      validator: (rule: any, value: any, callback: any) => {
        if (!value || !isTestEmail(formData.value.email)) {
          return callback(new Error(value.message));
        }
        return callback();
      },
      trigger: 'blur',
    },
  ],
  userId: [
    {
      required: true,
      message: placeholderList[3],
      trigger: 'blur',
    },
  ],
  company: [
    {
      required: true,
      message: placeholderList[4],
      trigger: 'blur',
    },
    { min: 1, max: 50, message: placeholderList[9], trigger: 'blur' },
  ],
  technicalSeminars: [
    {
      required: true,
      message: placeholderList[6],
      trigger: 'blur',
    },
  ],
  others: [{ min: 0, max: 1000, message: placeholderList[8], trigger: 'blur' }],
});

// 获取sig group name list
const sigGroupLists = ref<Array<string>>([]);

const getSigGroup = () => {
  try {
    querySigGroup().then((res) => {
      sigGroupLists.value = res.data?.openeuler
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .filter((item) => item !== 'Private');
    });
  } catch (error: any) {
    console.error(error);
  }
};

// 获取用户信息
const userInfo = ref([]);
async function getPersonalInfo() {
  try {
    await queryPersonalInfo().then((res) => {
      userInfo.value = res.data;
      const { username, email, phone } = res.data;
      formData.value.email = email;
      formData.value.phone = phone;
      formData.value.userId = username;
    });
  } catch (error: any) {
    console.error(error);
  }
}

const showPage = ref(false);
onMounted(() => {
  getSigGroup();
  if (loginStatus.value === 'LOGINED') {
    getPersonalInfo();
    showPage.value = false;
  } else {
    setTimeout(() => {
      showPage.value = true;
    }, 300);
  }
});

watch(
  () => guardAuthClient.value.username,
  () => {
    if (guardAuthClient.value.username) {
      getPersonalInfo();
    }
  }
);

const submitMeetupForm = async (formEl: FormInstance | undefined) => {
  if (formData.value.acceptPrivacyVersion.length < 1) {
    ElMessage({
      type: 'error',
      message: '请勾选隐私声明',
    });
    return;
  }
  if (!formEl) return;

  window.scrollTo(0, 0);

  await formEl.validate((valid) => {
    if (valid) {
      const query = { ...formData.value };
      query.acceptPrivacyVersion = formData.value.acceptPrivacyVersion[0];
      query.sigs = query.sigs?.length ? query.sigs : null;
      query.attend = query.attend ? query.attend : null;
      query.others = query.others ? query.others : null;

      try {
        applySigGathering(query).then((res) => {
          if (res?.code === 200) {
            ElMessage({
              type: 'success',
              message: '报名提交成功，请留意查收短信通知',
            });
            ruleFormRef.value?.resetFields();

            router.go(
              `/${lang.value}` + '/interaction/summit-list/sig-gathering-2024/'
            );
          } else if (res?.code === 400) {
            ElMessage({
              type: 'error',
              message: '报名已提交成功，请勿重复提交',
            });
          }
        });
      } catch (error: any) {
        console.error(error);
      }
    }
  });
};
</script>
<template>
  <AppContent :pc-top="40" :mobile-top="12">
    <div class="form">
      <h2>openEuler SIG Gathering 2024 活动报名</h2>
      <div class="auth-box">
        <OButton type="primary">
          您好，活动报名已截止
        </OButton>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.loading-page {
  width: 100%;
  min-height: calc(100vh - 80px - 282px - 80px);
  @media screen and (max-width: 867px) {
    min-height: calc(100vh - 259px - 48px - 52px);
  }
}
:deep(.el-loading-mask) {
  background: var(--o-color-bg2);
  z-index: 3;
}
:deep(.el-textarea) {
  box-shadow: 0 0 0 1px var(--o-color-border1) inset;
  .el-textarea__inner {
    border-radius: 0;
    box-shadow: 0 0 0 1px var(--o-color-border1) inset;
    &:focus {
      box-shadow: 0 0 0 1px var(--o-color-border1) inset;
    }
  }
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: var(--o-color-bg2);
  &::after {
    display: none;
  }
}

:deep(.o-checkbox) {
  .o-checkbox-icon {
    min-width: 16px;
    border: 1px solid var(--o-color-border1);
  }
  .o-checkbox-label {
    color: var(--o-color-text1);
    opacity: 0.8;
  }
  &.o-checkbox-checked {
    .o-checkbox-label {
      color: var(--o-color-text1);
      opacity: 1;
      & .o-icon {
        display: block;
      }
    }
  }
  &.sig-option {
    width: 100%;
    padding: 0 32px 0 20px;
    position: relative;
    .o-icon {
      font-size: 14px;
      position: absolute;
      left: 21px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      display: none;
    }
  }
}
:deep(.o-radio-group) {
  @media screen and (max-width: 867px) {
    flex-direction: column;
    .o-radio {
      margin-left: 0;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
:deep(.o-radio) {
  .o-radio-label {
    color: var(--o-color-text1);
    opacity: 0.8;
  }
  &.o-radio-checked {
    .o-radio-label {
      color: var(--o-color-text1);
      opacity: 1;
    }
  }
}

:deep(.o-select) {
  &:hover {
    box-shadow: 0 0 0 1px var(--o-color-border1) inset !important;
    .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--o-color-border1) inset;
    }
  }

  & .el-input.is-focus .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--o-color-border1) inset !important;
  }
  .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--o-color-border1) inset;
  }
  @media screen and (max-width: 867px) {
    & .el-input {
      height: auto;
      min-height: 34px;
      .el-input__wrapper {
        padding: 2px 11px;
      }
    }
  }
}

.form {
  background: var(--o-color-bg2);
  box-shadow: var(--o-shadow-l1);
  padding: 40px;
  @media (max-width: 1100px) {
    padding: 16px;
  }

  h2 {
    font-size: 32px;
    font-weight: 500;
    margin: 0 0 40px;
    text-align: center;
    color: var(--o-color-text1);
    @media (max-width: 1100px) {
      font-size: 24px;
      margin: 24px 0;
    }
  }
}
:deep(.input-disabled) {
  .el-input__wrapper {
    border-radius: 0;
    padding: 1px 15px;
    .el-input__inner {
      height: 36px;
    }
  }
}
.column {
  flex-direction: column;
  align-items: baseline;
  gap: 8px;
  .o-checkbox-group {
    flex-direction: column;
    align-items: baseline;
    gap: 8px;
  }
  .o-checkbox {
    margin-left: 0 !important;
  }
}
:deep(.el-form) {
  max-width: 764px;
  margin: 0 auto;
  .el-form-item__error {
    left: 16px;
    top: 102%;
  }

  .el-form-item {
    margin-bottom: 24px;
    @media screen and (max-width: 867px) {
      margin-bottom: 16px;
    }
    &:last-child {
      margin-bottom: 0;
    }

    &:nth-child(6),
    &:nth-child(8),
    &:nth-child(9) {
      padding-left: 11px;
      @media screen and (max-width: 867px) {
        padding-left: 0px;
      }
      .el-form-item__label {
        width: 211px !important;
        @media screen and (max-width: 867px) {
          width: 100% !important;
          padding-left: 11px;
        }
      }
    }
    .el-form-item__content {
      flex: 1;
    }

    .el-form-item__label {
      height: auto;
      padding-right: 0;
      margin-right: 32px;
      color: var(--o-color-text1);
      &::before {
        margin-top: 4px;
        width: 7px;
      }
    }

    &:nth-child(6) {
      .el-form-item__label {
        line-height: 24px;
      }
    }
  }

  .private-item,
  .submit-item {
    justify-content: center;
    .el-form-item__content {
      margin-left: 0 !important;
      max-width: max-content;
      width: 100%;
    }
  }
  .private-item {
    margin-top: 8px;
    .o-checkbox-checked {
      .o-checkbox-label {
        color: var(--o-color-text1);
        & .o-icon {
          display: block;
        }
      }
    }
    @media screen and (max-width: 867px) {
      .o-checkbox {
        align-items: start;
        .o-checkbox-icon {
          margin-top: 4px;
        }
      }
    }
  }
  @media screen and (max-width: 867px) {
    .submit-item {
      display: flex;
    }
  }
}
.wrap-item {
  .el-form-item__label {
    height: auto;
    padding-right: 32px;
  }
  &:nth-child(6) {
    .el-form-item__label {
      line-height: 24px;
    }
  }
}
:deep(.el-select) {
  .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--o-color-border1) inset;
  }
  .el-select__input {
    margin-left: 18px !important;
  }
}

.el-select-dropdown__item {
  display: flex;
  padding: 0;

  &.selected .o-checkbox {
    font-weight: 500;
  }
}

.auth-box {
  padding: 64px 0;
  display: grid;
  place-items: center;
}

:deep(.el-input) {
  .el-input__validateIcon {
    display: none;
  }
}

.o-button {
  --o-button-bg-color-primary_hover: var(--o-color-brand1);
  --o-button-bg-color-primary_active: var(--o-color-brand1);
  --o-button-border-primary_hover: 1px solid var(--o-color-brand1);
  --o-button-border-primary_active: 1px solid var(--o-color-brand1);
  cursor: default;
}
</style>

<style lang="scss">
.el-popper.o-select-dropdown .o-option.hover {
  .o-checkbox-icon {
    border-color: var(--o-color-brand2) !important;
  }
}
</style>
