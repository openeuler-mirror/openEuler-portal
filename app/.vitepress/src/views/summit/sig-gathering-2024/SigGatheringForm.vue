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
  '文字长度超出限制',
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
    { min: 1, max: 50, message: placeholderList[8], trigger: 'blur' },
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
onMounted(() => {
  getSigGroup();
  if (guardAuthClient.value.username) {
    getPersonalInfo();
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
  await formEl.validate((valid) => {
    if (valid) {
      const query = { ...formData.value };
      query.acceptPrivacyVersion = formData.value.acceptPrivacyVersion[0];
      query.sigs = query.sigs?.length ? query.sigs : null;
      query.attend = query.attend ? query.attend : null;
      query.others = query.others ? query.others : null;

      console.log(query);

      try {
        applySigGathering(query).then((res) => {
          if (res?.code === 200) {
            ElMessage({
              type: 'success',
              message: '申请成功！',
            });
            ruleFormRef.value?.resetFields();

            router.go(
              `/${lang.value}` + '/interaction/summit-list/sig-gathering-2024/'
            );
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
    <div
      v-if="loginStatus === 'LOGINiNG'"
      v-loading="loginStatus === 'LOGINiNG'"
      class="loading-page"
    ></div>
    <div class="form" v-else="loginStatus === 'LOGINED'">
      <h2>openEuler SIG Gathering 2024 活动报名</h2>
      <template v-if="loginStatus === 'LOGINED'">
        <el-form
          ref="ruleFormRef"
          :model="formData"
          :rules="rules"
          label-width="222px"
          class="demo-ruleForm"
          :label-position="labelPosition"
          status-icon
        >
          <el-form-item label="姓名" prop="name">
            <OInput
              v-model="formData.name"
              :placeholder="placeholderList[0]"
              clearable
            />
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <OInput
              v-model="formData.phone"
              :placeholder="placeholderList[1]"
              clearable
            />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <OInput
              v-model="formData.email"
              :placeholder="placeholderList[2]"
              clearable
            />
          </el-form-item>

          <el-form-item label="openEuler ID" prop="userId">
            <el-input
              v-model="formData.userId"
              :placeholder="placeholderList[3]"
              disabled
              class="input-disabled"
            />
          </el-form-item>

          <el-form-item label="工作单位" prop="company">
            <OInput
              v-model="formData.company"
              :placeholder="placeholderList[4]"
              clearable
            />
          </el-form-item>

          <el-form-item
            label="您在openeuler社区的哪个SIG组参与贡献"
            prop="sigs"
          >
            <OSelect
              v-model="formData.sigs"
              multiple
              clearable
              filterable
              :placeholder="placeholderList[5]"
              style="width: 100%"
            >
              <OOption
                v-for="item in sigGroupLists"
                :key="item"
                :label="item"
                :value="item"
              >
                <OCheckbox
                  :value="item"
                  :class="{
                    'o-checkbox-checked': formData.sigs?.includes(item),
                  }"
                  class="sig-option"
                >
                  <OIcon><IconDone /></OIcon>
                  {{ item }}
                </OCheckbox>
              </OOption>
            </OSelect>
          </el-form-item>

          <el-form-item
            label="您计划参与的技术研讨专场"
            prop="technicalSeminars"
          >
            <OCheckboxGroup v-model="formData.technicalSeminars" class="column">
              <OCheckbox value="专题一：多样性算力">
                专题一：多样性算力
              </OCheckbox>
              <OCheckbox value="专题二：全场景应用">
                专题二：全场景应用
              </OCheckbox>
              <OCheckbox value="专题三：AI原生支持">
                专题三：AI原生支持
              </OCheckbox>
              <OCheckbox value="专题四：openEuler原生开发">
                专题四：openEuler原生开发
              </OCheckbox>
              <OCheckbox value="专题五：上游原生支持">
                专题五：上游原生支持
              </OCheckbox>
              <OCheckbox value="专题六：用户体验研究">
                专题六：用户体验研究
              </OCheckbox>
            </OCheckboxGroup>
          </el-form-item>

          <el-form-item label="您是否参与开发者之夜" prop="attend">
            <ORadioGroup v-model="formData.attend">
              <ORadio value="agree">是</ORadio>
              <ORadio value="refuse">否</ORadio>
            </ORadioGroup>
          </el-form-item>

          <el-form-item label="其他" prop="others">
            <OInput
              v-model="formData.others"
              :rows="5"
              type="textarea"
              max-length="1000"
              placeholder="请输入您的建议"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item class="private-item">
            <OCheckboxGroup v-model="formData.acceptPrivacyVersion">
              <OCheckbox value="agree">
                您理解并同意，请填写并提交的内容，即视为您已充分阅读并理解openEuler的
                <a
                  href="/zh/other/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >《隐私声明》
                </a>
              </OCheckbox>
            </OCheckboxGroup>
          </el-form-item>

          <el-form-item class="submit-item">
            <div>
              <OButton type="primary" @click="submitMeetupForm(ruleFormRef)">
                提交报名
              </OButton>
            </div>
          </el-form-item>
        </el-form>
      </template>

      <template v-else-if="loginStatus === 'NOT_LOGIN'">
        <div class="auth-box">
          <OButton type="primary" @click="showGuard()"
            >请先登录后，再填写</OButton
          >
        </div>
      </template>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.loading-page {
  width: 100%;
  height: 1000px;
  @media screen and (max-width: 867px) {
    height: 600px;
  }
}
:deep(.el-loading-mask) {
  background: var(--o-color-bg2);
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
      margin-bottom: 12px;
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
}

.el-select-dropdown__item {
  display: flex;
  padding: 0;
  &.selected .o-checkbox {
    font-weight: 500;
    .o-checkbox-label {
      color: #002fa7;
    }
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
</style>
